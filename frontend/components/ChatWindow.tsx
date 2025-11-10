
import React, { useRef, useEffect } from 'react';
import type { Message } from '../types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface ChatWindowProps {
    messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <main className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="max-w-5xl mx-auto w-full">
                {messages.map((msg) =>
                    msg.isLoading ? (
                        <TypingIndicator key={msg.id} />
                    ) : (
                        <MessageBubble key={msg.id} message={msg} />
                    )
                )}
                <div ref={messagesEndRef} />
            </div>
        </main>
    );
};

export default ChatWindow;