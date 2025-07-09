import React, { useState } from 'react';
import { Users, Phone, MessageCircle, Car, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface NetworkIntroProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const NetworkIntro: React.FC<NetworkIntroProps> = ({ learningMode, isDarkMode }) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const quizScenarios = [
    { 
      id: 1, 
      text: "Your smartwatch syncing with your phone", 
      isNetwork: true, 
      explanation: "Yes! This is a Personal Area Network (PAN) using Bluetooth technology. Two devices are communicating wirelessly.",
      missingComponent: null
    },
    { 
      id: 2, 
      text: "A single computer running a calculator app", 
      isNetwork: false, 
      explanation: "No network here! This is just one device working alone. No communication with other devices is happening.",
      missingComponent: "Other devices to communicate with"
    },
    { 
      id: 3, 
      text: "Video calling your friend on WhatsApp", 
      isNetwork: true, 
      explanation: "Absolutely! This uses the internet (WAN) to connect your device to your friend's device through WhatsApp servers.",
      missingComponent: null
    },
    { 
      id: 4, 
      text: "Playing an offline single-player game", 
      isNetwork: false, 
      explanation: "Not a network! Offline games don't need to communicate with other devices or servers.",
      missingComponent: "Connection to other devices or internet"
    },
    { 
      id: 5, 
      text: "Smart TV streaming Netflix", 
      isNetwork: true, 
      explanation: "Yes! Your TV connects to Netflix servers through your home WiFi and the internet.",
      missingComponent: null
    }
  ];

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    if (answer === quizScenarios[currentQuizIndex].isNetwork) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuizIndex < quizScenarios.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <section className="mb-20">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
        What is a Network?
      </h2>

      {/* Definition Panel */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-12 border border-gray-200 dark:border-gray-600">
        {learningMode === 'visualize' ? (
          <div>
            <div className="text-center mb-8">
              <img 
                src="https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg" 
                alt="Network cables"
                className="w-full h-64 object-cover rounded-2xl mb-6 shadow-lg"
              />
            </div>
            <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Simple Definition
            </h3>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 text-center leading-relaxed">
              A computer network is like a group of friends who can talk to each other and share things. 
              Instead of people, we have computers, phones, and other devices that can communicate and share information.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl shadow-lg">
                <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Devices Connect</h4>
                <p className="text-gray-600 dark:text-gray-300">Like friends in a group chat</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl shadow-lg">
                <MessageCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Share Information</h4>
                <p className="text-gray-600 dark:text-gray-300">Send messages and files</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl shadow-lg">
                <Car className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Follow Rules</h4>
                <p className="text-gray-600 dark:text-gray-300">Like traffic rules for data</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Technical Definition</h3>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Computer Network:</strong> A collection of interconnected devices that can communicate and share resources using standardized protocols.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Components:</h4>
                  <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span><strong>Nodes:</strong> Devices (computers, phones, servers)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span><strong>Links:</strong> Physical or wireless connections</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span><strong>Protocols:</strong> Communication rules (TCP/IP, HTTP)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span><strong>Hardware:</strong> Routers, switches, cables</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Network Services:</h4>
                  <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span><strong>Data sharing:</strong> File transfers, databases</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span><strong>Resource sharing:</strong> Printers, storage</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span><strong>Communication:</strong> Email, messaging, calls</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span><strong>Remote access:</strong> Cloud services, VPN</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Real-life Analogies */}
      {learningMode === 'visualize' && (
        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 mb-12 shadow-xl border border-indigo-200 dark:border-indigo-700">
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            📡 Think of Networks Like...
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <Phone className="w-20 h-20 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Telephone System</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Just like you dial a number to call someone, computers use addresses (IP addresses) to find each other
              </p>
            </div>
            <div className="text-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <MessageCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Group Chat</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Multiple people can share messages and files in one place, just like network devices
              </p>
            </div>
            <div className="text-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <Car className="w-20 h-20 text-purple-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Road System</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Cars follow traffic rules to reach destinations, like data following network protocols
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Quiz */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-600">
        <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
          🎯 Network or Not? Interactive Quiz
        </h3>
        
        {!quizCompleted ? (
          <div>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Question {currentQuizIndex + 1} of {quizScenarios.length}
                </span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Score: {score}/{quizScenarios.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuizIndex + 1) / quizScenarios.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-8 mb-6">
                <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Scenario {currentQuizIndex + 1}
                </h4>
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  "{quizScenarios[currentQuizIndex].text}"
                </p>
              </div>
              
              {!showExplanation ? (
                <div className="flex flex-col sm:flex-row justify-center sm:space-x-6 space-y-4 sm:space-y-0">
                  <button
                    onClick={() => handleAnswer(true)}
                    className="flex items-center justify-center space-x-2 w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg text-base sm:text-lg font-semibold"
                  >
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Network</span>
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className="flex items-center justify-center space-x-2 w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg text-base sm:text-lg font-semibold"
                  >
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Not Network</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className={`p-6 rounded-2xl ${
                    selectedAnswer === quizScenarios[currentQuizIndex].isNetwork 
                      ? 'bg-green-50 dark:bg-green-900/30 border-2 border-green-300' 
                      : 'bg-red-50 dark:bg-red-900/30 border-2 border-red-300'
                  }`}>
                    <div className="flex items-center justify-center mb-4">
                      {selectedAnswer === quizScenarios[currentQuizIndex].isNetwork ? (
                        <CheckCircle className="w-16 h-16 text-green-600" />
                      ) : (
                        <XCircle className="w-16 h-16 text-red-600" />
                      )}
                    </div>
                    
                    <h4 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-4">
                      {selectedAnswer === quizScenarios[currentQuizIndex].isNetwork ? 'Correct! 🎉' : 'Not quite right! 🤔'}
                    </h4>
                    
                    <p className="text-lg text-gray-700 dark:text-gray-300 text-center leading-relaxed">
                      {quizScenarios[currentQuizIndex].explanation}
                    </p>
                    
                    {quizScenarios[currentQuizIndex].missingComponent && (
                      <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl border border-yellow-200 dark:border-yellow-700">
                        <p className="text-gray-700 dark:text-gray-300 text-center">
                          <strong>Missing component:</strong> {quizScenarios[currentQuizIndex].missingComponent}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={nextQuestion}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg font-semibold"
                  >
                    {currentQuizIndex < quizScenarios.length - 1 ? 'Next Question →' : 'See Results 🏆'}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🏆</span>
              </div>
              <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Quiz Complete!</h4>
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {score}/{quizScenarios.length}
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {score === quizScenarios.length ? "Perfect! You're a network expert! 🌟" :
                 score >= 4 ? "Excellent! You understand networks well! 👍" :
                 score >= 3 ? "Good job! Keep practicing! 📚" :
                 "Keep learning! You'll get it! 💪"}
              </p>
            </div>
            <button
              onClick={resetQuiz}
              className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg mx-auto text-lg font-semibold"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NetworkIntro;