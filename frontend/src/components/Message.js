// frontend/nextjs-chatbot/src/components/Message.js
import React from 'react';
import { UserIcon, BoltIcon } from '@heroicons/react/24/solid'; // Assumes you install @heroicons/react

const Message = ({ text, sender }) => {
    const isBot = sender === 'bot';
    
    // Define styles and content based on sender
    const containerClass = isBot 
        ? 'self-start bg-gray-100 text-gray-800' 
        : 'self-end bg-blue-600 text-white';
    const wrapperClass = isBot ? 'justify-start' : 'justify-end';
    const icon = isBot 
        ? <BoltIcon className="h-6 w-6 text-blue-600" />
        : <UserIcon className="h-6 w-6 text-white" />;
    const iconWrapperClass = isBot 
        ? 'bg-white border border-gray-200' 
        : 'bg-blue-800';

    return (
        <div className={`flex w-full ${wrapperClass}`}>
            <div className={`flex items-start max-w-3xl space-x-3 ${isBot ? 'mr-10' : 'ml-10'}`}>
                {/* Icon/Avatar */}
                <div className={`p-2 rounded-full flex-shrink-0 ${iconWrapperClass}`}>
                    {icon}
                </div>
                
                {/* Message Bubble */}
                <div className={`p-4 rounded-xl shadow-md my-1 transition-all duration-300 whitespace-pre-wrap ${containerClass}`}>
                    <p className="text-sm md:text-base leading-relaxed">{text}</p>
                </div>
            </div>
        </div>
    );
};

// Simple typing indicator component
export const TypingIndicator = () => (
    <div className="flex justify-start w-full my-2">
        <div className="flex items-start max-w-3xl space-x-3">
            <div className="p-2 rounded-full flex-shrink-0 bg-white border border-gray-200">
                <BoltIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="p-4 rounded-xl shadow-md bg-gray-100 my-1 flex space-x-1 items-center">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-0"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></div>
            </div>
        </div>
    </div>
);

export default Message;