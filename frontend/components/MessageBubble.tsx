import React from 'react';
import type { Message } from '../types';
import { UserIcon, ChampionIcon } from './Icons';

interface MessageBubbleProps {
    message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isBot = message.sender === 'bot';

    const wrapperClass = isBot ? 'justify-start' : 'justify-end';
    const bubbleClass = isBot 
        ? 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none'
        : 'bg-yellow-400 dark:bg-yellow-500 text-black rounded-br-none';
    const iconContainerClass = isBot 
        ? 'bg-black border-2 border-yellow-400' 
        : 'bg-gray-300 dark:bg-gray-700';

    return (
        <div className={`flex w-full my-4 animate-fade-in-up ${wrapperClass}`}>
            <div className={`flex items-end max-w-3xl gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${iconContainerClass}`}>
                    {isBot ? <ChampionIcon /> : <UserIcon />}
                </div>
                <div className={`p-4 rounded-xl shadow-lg whitespace-pre-wrap ${bubbleClass}`}>
                    <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;