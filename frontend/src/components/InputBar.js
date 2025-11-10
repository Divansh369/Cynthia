// frontend/nextjs-chatbot/src/components/InputBar.js
import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const InputBar = ({ onSendMessage, isWaiting }) => {
    const [input, setInput] = useState('');
    const inputRef = useRef(null);

    // Auto-focus the input bar on load or when waiting stops
    useEffect(() => {
        if (!isWaiting && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isWaiting]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === '' || isWaiting) return;

        onSendMessage(input);
        setInput(''); // Clear the input after sending
    };

    const isDisabled = isWaiting || input.trim() === '';

    return (
        <div className="p-4 bg-white border-t border-gray-200 shadow-xl">
            <form onSubmit={handleSubmit} className="flex items-center max-w-4xl mx-auto">
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isWaiting ? "Cynthia is thinking..." : "Ask Cynthia a question..."}
                    disabled={isWaiting}
                    className="flex-grow p-4 text-base border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 disabled:bg-gray-50"
                />
                <button
                    type="submit"
                    disabled={isDisabled}
                    className={`ml-3 p-3 rounded-full flex items-center justify-center transition duration-200 ease-in-out
                                ${isDisabled
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                                }`}
                >
                    <PaperAirplaneIcon className={`h-6 w-6 transform ${isDisabled ? 'rotate-0' : 'rotate-45'}`} />
                </button>
            </form>
        </div>
    );
};

export default InputBar;