import React from 'react';

export interface LeaderboardUser {
  rank: number;
  name: string;
  xp: number;
  isLegendary?: boolean;
}

export const leaderboardData: LeaderboardUser[] = [
  { rank: 1, name: 'Saran', xp: 100, isLegendary: true },
  { rank: 2, name: 'Prasanth', xp: 85 },
  { rank: 3, name: 'Naveen', xp: 15 },
  { rank: 4, name: 'Nithish', xp: 1 },
  { rank: 5, name: 'Siddarth', xp: 0 }
];

interface LeaderboardProps {
  isVisible: boolean;
  onClose: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-4 sm:p-6 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2L3 7v11h14V7l-7-5zM8 16H6v-4h2v4zm4 0h-2v-6h2v6zm4 0h-2v-8h2v8z"/>
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-bold">Leaderboard</h2>
            </div>
            <button
              onClick={onClose}
              className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Leaderboard Content */}
          <div className="p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4">
          {leaderboardData.map((user) => (
            <div
              key={user.rank}
              className={`relative p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${
                user.isLegendary
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-400 dark:border-yellow-500 shadow-lg legendary-glow'
                  : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}
            >
              {/* Legendary Border Animation for Saran */}
              {user.isLegendary && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-20 rainbow-border"></div>
              )}
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                  {/* Rank Badge */}
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0 ${
                    user.rank === 1
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg'
                      : user.rank === 2
                      ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800'
                      : user.rank === 3
                      ? 'bg-gradient-to-br from-orange-400 to-yellow-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {user.rank === 1 ? '👑' : user.rank}
                  </div>
                  
                  {/* User Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className={`font-semibold text-sm sm:text-base truncate ${
                      user.isLegendary 
                        ? 'text-orange-600 dark:text-orange-400' 
                        : 'text-gray-800 dark:text-gray-200'
                    }`}>
                      {user.name}
                      {user.isLegendary && (
                        <span className="ml-1 sm:ml-2 px-1 sm:px-2 py-1 text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-bold">
                          LEGENDARY
                        </span>
                      )}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Rank #{user.rank}
                    </p>
                  </div>
                </div>
                
                {/* XP Display */}
                <div className="text-right flex-shrink-0">
                  <p className={`font-bold text-sm sm:text-lg ${
                    user.isLegendary 
                      ? 'text-orange-600 dark:text-orange-400' 
                      : 'text-gray-800 dark:text-gray-200'
                  }`}>
                    {user.xp} XP
                  </p>
                  {user.rank === 1 && (
                    <div className="flex items-center justify-end space-x-1 mt-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full sparkle"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full sparkle animation-delay-150"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full sparkle animation-delay-300"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special Challenge Note */}
        <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-t border-green-200 dark:border-green-700">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs sm:text-sm">💰</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-semibold text-green-700 dark:text-green-300">
                Challenge Reward
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                Who beats Saran gets a ₹50 instant coupon! 🎯
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;