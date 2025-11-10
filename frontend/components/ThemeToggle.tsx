import React from 'react';
import { SunIcon, MoonIcon } from './Icons';
import { Theme } from '../hooks/useTheme';

interface ThemeToggleProps {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-200 text-gray-500 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:focus:ring-offset-black"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
    );
};

export default ThemeToggle;