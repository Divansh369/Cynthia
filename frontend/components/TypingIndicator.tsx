import React from 'react';
import { ChampionIcon } from './Icons';

const TypingIndicator: React.FC = () => (
    <div className="flex justify-start w-full my-4 animate-fade-in-up">
        <div className="flex items-end max-w-3xl gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-black border-2 border-yellow-400">
                <ChampionIcon />
            </div>
            <div className="p-4 rounded-xl shadow-md bg-gray-200 dark:bg-gray-800 flex space-x-1.5 items-center">
                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse delay-0"></div>
                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
            </div>
        </div>
    </div>
);

export default TypingIndicator;