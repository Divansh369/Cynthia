import React from 'react';
import ThemeToggle from './ThemeToggle';
import { Theme } from '../hooks/useTheme';

interface HeaderProps {
    theme: Theme;
    toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => (
    <header className="py-4 px-6 bg-white/80 dark:bg-black/50 border-b border-gray-200 dark:border-yellow-500/30 shadow-lg backdrop-blur-sm relative">
        <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-yellow-400 tracking-wider">CYNTHIA</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">AI Battle Champion</p>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
    </header>
);

export default Header;