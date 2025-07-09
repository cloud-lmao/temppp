import React, { useState } from 'react';
import { Moon, Sun, Eye, BookOpen, Trophy } from 'lucide-react';
import Leaderboard from './Leaderboard';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  learningMode: 'visualize' | 'exam';
  toggleLearningMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, learningMode, toggleLearningMode }) => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                <span className="text-sm sm:text-lg md:text-2xl">Network Devices Day 5</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
              {/* Leaderboard Button */}
              <button
                onClick={toggleLeaderboard}
                className="flex items-center space-x-1 px-2 sm:px-3 md:px-4 py-2 rounded-lg transition-all duration-300 border text-xs sm:text-sm bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/50 dark:to-orange-900/50 text-yellow-700 dark:text-yellow-300 hover:from-yellow-200 hover:to-orange-200 dark:hover:from-yellow-800/50 dark:hover:to-orange-800/50 border-yellow-200 dark:border-yellow-700"
              >
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline font-semibold">Board</span>
              </button>

              {/* Learning Mode Toggle */}
              <button
                onClick={toggleLearningMode}
                className="flex items-center space-x-1 px-2 sm:px-3 md:px-4 py-2 rounded-lg transition-all duration-300 border text-xs sm:text-sm bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-700 dark:text-blue-300 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-800/50 dark:hover:to-purple-800/50 border-blue-200 dark:border-blue-700"
              >
                {learningMode === 'visualize' ? (
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                  <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                )}
                <span className="capitalize font-semibold hidden sm:inline">{learningMode}</span>
              </button>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg transition-all duration-300 border bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Leaderboard Modal */}
      <Leaderboard 
        isVisible={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
      />
    </>
  );
};

export default Header;