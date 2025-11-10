import React, { useState, useRef, useEffect } from 'react';
import { SendIcon } from './Icons';

interface InputBarProps {
    onSendMessage: (text: string) => void;
    isWaiting: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ onSendMessage, isWaiting }) => {
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isWaiting) {
            inputRef.current?.focus();
        }
    }, [isWaiting]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === '' || isWaiting) return;
        onSendMessage(input);
        setInput('');
    };

    const isDisabled = isWaiting || input.trim() === '';

    return (
        <footer className="p-4 bg-white/80 dark:bg-black/50 border-t border-gray-200 dark:border-yellow-500/30 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto">
                <form onSubmit={handleSubmit} className="flex items-center gap-3">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isWaiting ? "Analyzing the situation..." : "Challenge Cynthia..."}
                        disabled={isWaiting}
                        className="flex-grow p-4 text-base bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200 text-gray-800 dark:text-gray-200 placeholder-gray-500 disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                    />
                    <button
                        type="submit"
                        disabled={isDisabled}
                        className={`p-4 rounded-lg flex items-center justify-center transition-all duration-200 ease-in-out transform
                                    ${isDisabled
                                        ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                                        : 'bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400 shadow-lg hover:shadow-yellow-500/40 hover:scale-105'
                                    }`}
                    >
                        <SendIcon />
                    </button>
                </form>
            </div>
        </footer>
    );
};

export default InputBar;