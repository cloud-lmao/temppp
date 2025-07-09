import React, { useState, useEffect } from 'react';
import { Moon, Sun, ArrowUp, Eye, BookOpen, Network, Router, Cpu } from 'lucide-react';
import Header from './components/Header';
import DeviceIntro from './components/DeviceIntro';
import SwitchDetails from './components/SwitchDetails';
import RouterDetails from './components/RouterDetails';
import HubDetails from './components/HubDetails';
import DeviceComparison from './components/DeviceComparison';
import AdvancedConcepts from './components/AdvancedConcepts';
import Footer from './components/Footer';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [learningMode, setLearningMode] = useState<'visualize' | 'exam'>('visualize');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLearningMode = () => {
    setLearningMode(learningMode === 'visualize' ? 'exam' : 'visualize');
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 transition-all duration-500">
        <Header 
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          learningMode={learningMode}
          toggleLearningMode={toggleLearningMode}
        />
        
        <main className="pt-16 sm:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            {/* Hero Section */}
            <div className="text-center mb-12 sm:mb-16">
              <div className="mb-6 sm:mb-8">
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
                  Network Devices
                </h1>
                <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
                <p className="text-lg sm:text-xl md:text-3xl text-gray-700 dark:text-gray-200 mb-3 sm:mb-4 font-medium px-4">
                  Day 5: Switches, Routers & Network Infrastructure
                </p>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                  Master the devices that make networks work - from simple hubs to intelligent switches and routers
                </p>
              </div>
              
              <div className="flex justify-center items-center space-x-3 sm:space-x-6 mb-8 sm:mb-12 px-4">
                <div className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-6 py-2 sm:py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-gray-600">
                  {learningMode === 'visualize' ? (
                    <Eye className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                  ) : (
                    <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
                  )}
                  <span className="capitalize font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                    {learningMode} Mode
                  </span>
                </div>
              </div>

              {/* Why Learn Network Devices Section */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 mb-12 sm:mb-16 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
                <h2 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                  🔧 Why Learn Network Devices?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl sm:rounded-2xl">
                    <Cpu className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Smart Traffic Control</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                      Learn how switches intelligently direct data to the right destination
                    </p>
                  </div>
                  <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl sm:rounded-2xl">
                    <Router className="w-8 h-8 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Network Connections</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                      Understand how routers connect different networks together
                    </p>
                  </div>
                  <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-xl sm:rounded-2xl">
                    <Network className="w-8 h-8 sm:w-12 sm:h-12 text-indigo-600 mx-auto mb-3 sm:mb-4" />
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Network Design</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                      Choose the right device for different network scenarios
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Device Introduction */}
            <DeviceIntro learningMode={learningMode} isDarkMode={isDarkMode} />

            {/* Switch Details */}
            <SwitchDetails learningMode={learningMode} isDarkMode={isDarkMode} />

            {/* Router Details */}
            <RouterDetails learningMode={learningMode} isDarkMode={isDarkMode} />

            {/* Hub Details */}
            <HubDetails learningMode={learningMode} isDarkMode={isDarkMode} />

            {/* Device Comparison */}
            <DeviceComparison learningMode={learningMode} isDarkMode={isDarkMode} />

            {/* Advanced Concepts */}
            <AdvancedConcepts learningMode={learningMode} isDarkMode={isDarkMode} />
          </div>
        </main>

        <Footer />

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 z-50 transform hover:scale-110"
          >
            <ArrowUp className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        )}
      </div>
    </div>
  );
}

export default App;