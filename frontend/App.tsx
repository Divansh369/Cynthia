import React, { useState } from 'react';
import type { Message } from './types';
import { getBotResponse } from './services/apiService';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import { useTheme } from './hooks/useTheme';

const App: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [messages, setMessages] = useState<Message[]>([
        { 
            id: Date.now(),
            text: "The world is vast, and there is much to learn. I am Cynthia. It is a pleasure to meet you. What knowledge do you seek today?", 
            sender: 'bot' 
        }
    ]);
    const [error, setError] = useState<string | null>(null);

    const isBotLoading = messages.some(msg => msg.isLoading);

    const handleSendMessage = async (text: string) => {
        const userMessageId = Date.now();
        const botMessageId = userMessageId + 1;

        const newUserMessage: Message = { id: userMessageId, text, sender: 'user' };
        const loadingBotMessage: Message = { id: botMessageId, text: '', sender: 'bot', isLoading: true };
        
        setMessages(prev => [...prev, newUserMessage, loadingBotMessage]);
        setError(null);

        try {
            const botResponseText = await getBotResponse(text);
            setMessages(prev => prev.map(msg => 
                msg.id === botMessageId 
                    ? { ...msg, text: botResponseText, isLoading: false } 
                    : msg
            ));
        } catch (err) {
            console.error("Failed to get response from backend API:", err);
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred with the backend service.";
            setError(errorMessage);
            setMessages(prev => prev.map(msg => 
                msg.id === botMessageId 
                    ? { ...msg, text: errorMessage, sender: 'bot', isLoading: false } 
                    : msg
            ));
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 selection:bg-yellow-500 selection:text-black">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <ChatWindow messages={messages} />
            <InputBar onSendMessage={handleSendMessage} isWaiting={isBotLoading} />
        </div>
    );
};

export default App;