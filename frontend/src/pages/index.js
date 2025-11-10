// frontend/nextjs-chatbot/src/pages/index.js
import React, { useState, useRef, useEffect } from 'react';
import Message, { TypingIndicator } from '../components/Message'; // Import TypingIndicator
import InputBar from '../components/InputBar';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8736/';

const ChatbotPage = () => {
    const [messages, setMessages] = useState([
        { text: "👋 Hello! I'm Cynthia, your Keras-powered chatbot. How can I assist you today?", sender: 'bot' }
    ]);
    const [isWaiting, setIsWaiting] = useState(false);
    const messagesEndRef = useRef(null);

    // Scroll to the latest message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages, isWaiting]); // Scroll also when waiting state changes

    const handleSendMessage = async (text) => {
        const newUserMessage = { text, sender: 'user' };
        setMessages((prev) => [...prev, newUserMessage]);
        
        setIsWaiting(true);

        try {
            const response = await fetch(`${API_URL}predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const botResponseText = data.bot_response || "Sorry, I had trouble processing that response.";

            const newBotMessage = { text: botResponseText, sender: 'bot' };
            setMessages((prev) => [...prev, newBotMessage]);

        } catch (error) {
            console.error("Failed to fetch response:", error);
            setMessages((prev) => [
                ...prev, 
                { text: "⚠️ Connection error. Could not reach the API. Check the console for details.", sender: 'bot' }
            ]);
        } finally {
            setIsWaiting(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header - Fixed and professional */}
            <header className="py-4 px-6 bg-white border-b border-gray-200 shadow-md">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-extrabold text-blue-600">Cynthia Chatbot</h1>
                    <p className="text-sm text-gray-500">MLOps Demo: Keras + FastAPI Backend</p>
                </div>
            </header>

            {/* Chat Window - Main scrolling area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4 max-w-4xl mx-auto w-full">
                {messages.map((msg, index) => (
                    <Message key={index} text={msg.text} sender={msg.sender} />
                ))}
                
                {/* Typing Indicator */}
                {isWaiting && <TypingIndicator />}

                <div ref={messagesEndRef} /> {/* Scroll target */}
            </div>

            {/* Input Bar - Fixed at the bottom */}
            <InputBar onSendMessage={handleSendMessage} isWaiting={isWaiting} />
        </div>
    );
};

export default ChatbotPage;