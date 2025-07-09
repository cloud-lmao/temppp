import React, { useState } from 'react';
import { Shield, Zap, Clock, DollarSign, CheckCircle, XCircle, Trophy, BookOpen, FileText } from 'lucide-react';

interface SwitchingComparisonProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const SwitchingComparison: React.FC<SwitchingComparisonProps> = ({ learningMode, isDarkMode }) => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [userChoice, setUserChoice] = useState<'circuit' | 'packet' | null>(null);
  const [showResult, setShowResult] = useState(false);

  const scenarios = [
    {
      id: 'voice-call',
      title: 'International Voice Call',
      description: 'Making a 30-minute phone call to another country',
      requirements: ['Real-time communication', 'Consistent quality', 'No interruptions'],
      correct: 'circuit',
      explanation: 'Circuit switching is perfect for voice calls because it guarantees consistent quality, no delays, and dedicated bandwidth throughout the conversation.',
      icon: '📞'
    },
    {
      id: 'web-browsing',
      title: 'Web Browsing Session',
      description: 'Browsing multiple websites, reading articles, watching short videos',
      requirements: ['Bursty traffic', 'Cost efficiency', 'Multiple destinations'],
      correct: 'packet',
      explanation: 'Packet switching is ideal for web browsing because traffic is bursty (periods of activity and inactivity), and you connect to many different servers.',
      icon: '🌐'
    },
    {
      id: 'file-download',
      title: 'Large File Download',
      description: 'Downloading a 5GB movie file from the internet',
      requirements: ['Large data transfer', 'Error tolerance', 'Cost effective'],
      correct: 'packet',
      explanation: 'Packet switching works better for file downloads because it can handle large amounts of data efficiently, and small delays are acceptable.',
      icon: '📁'
    },
    {
      id: 'video-conference',
      title: 'Business Video Conference',
      description: 'Important 2-hour business meeting with multiple participants',
      requirements: ['Real-time video/audio', 'High quality', 'Reliable connection'],
      correct: 'circuit',
      explanation: 'Circuit switching ensures consistent quality for the entire meeting duration, which is crucial for professional video conferences.',
      icon: '📹'
    }
  ];

  const comparisonData = [
    {
      aspect: 'Connection Setup',
      circuit: 'Required before transmission',
      packet: 'No setup needed',
      circuitIcon: Clock,
      packetIcon: Zap,
      winner: 'packet'
    },
    {
      aspect: 'Bandwidth Efficiency',
      circuit: 'Reserved even when idle',
      packet: 'Shared dynamically',
      circuitIcon: DollarSign,
      packetIcon: Zap,
      winner: 'packet'
    },
    {
      aspect: 'Delay Consistency',
      circuit: 'Predictable, constant',
      packet: 'Variable, unpredictable',
      circuitIcon: Shield,
      packetIcon: Clock,
      winner: 'circuit'
    },
    {
      aspect: 'Real-time Suitability',
      circuit: 'Excellent for voice/video',
      packet: 'May have quality issues',
      circuitIcon: Shield,
      packetIcon: XCircle,
      winner: 'circuit'
    },
    {
      aspect: 'Cost Effectiveness',
      circuit: 'Expensive, dedicated resources',
      packet: 'Cost-effective, shared',
      circuitIcon: DollarSign,
      packetIcon: CheckCircle,
      winner: 'packet'
    },
    {
      aspect: 'Fault Tolerance',
      circuit: 'Single point of failure',
      packet: 'Multiple path options',
      circuitIcon: XCircle,
      packetIcon: Shield,
      winner: 'packet'
    }
  ];

  const handleScenarioChoice = (choice: 'circuit' | 'packet') => {
    setUserChoice(choice);
    setShowResult(true);
  };

  const resetScenario = () => {
    setSelectedScenario(null);
    setUserChoice(null);
    setShowResult(false);
  };

  return (
    <section className="mb-12 sm:mb-20">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12 text-center px-4">
        Circuit vs Packet Switching
      </h2>

      {/* Comparison Table */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        {learningMode === 'exam' && (
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Detailed Comparison Study Guide
            </h3>
          </div>
        )}

        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
          📊 Side-by-Side Comparison
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-600">
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Aspect</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-green-700 dark:text-green-300 text-sm sm:text-base">Circuit Switching</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-purple-700 dark:text-purple-300 text-sm sm:text-base">Packet Switching</th>
                {learningMode === 'visualize' && (
                  <th className="text-center py-3 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Winner</th>
                )}
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => {
                const CircuitIcon = row.circuitIcon;
                const PacketIcon = row.packetIcon;
                
                return (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-2 sm:px-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">
                      {row.aspect}
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                      <div className="flex items-center space-x-2">
                        <CircuitIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>{row.circuit}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                      <div className="flex items-center space-x-2">
                        <PacketIcon className="w-4 h-4 text-purple-600 flex-shrink-0" />
                        <span>{row.packet}</span>
                      </div>
                    </td>
                    {learningMode === 'visualize' && (
                      <td className="py-3 px-2 sm:px-4 text-center">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          row.winner === 'circuit' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                            : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200'
                        }`}>
                          <Trophy className="w-3 h-3 mr-1" />
                          {row.winner === 'circuit' ? 'Circuit' : 'Packet'}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {learningMode === 'exam' && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-700">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2 text-sm sm:text-base">
              📝 Key Takeaways for Exams:
            </h4>
            <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• <strong>Circuit Switching:</strong> Best for real-time, continuous communication (voice, video)</li>
              <li>• <strong>Packet Switching:</strong> Best for bursty data traffic (web, email, file transfer)</li>
              <li>• <strong>Trade-off:</strong> Guaranteed QoS vs Efficient resource utilization</li>
              <li>• <strong>Modern trend:</strong> Packet switching dominates due to internet growth</li>
            </ul>
          </div>
        )}
      </div>

      {/* Interactive Scenario Game - Visualize Mode */}
      {learningMode === 'visualize' && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            🎯 Real-World Scenario Challenge
          </h3>

          {!selectedScenario ? (
            <div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center mb-6">
                Choose a scenario and decide which switching method works better!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {scenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => setSelectedScenario(scenario.id)}
                    className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50 rounded-xl transition-all duration-300 text-left border border-blue-200 dark:border-blue-700"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{scenario.icon}</span>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        {scenario.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {scenario.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {scenario.requirements.map((req, index) => (
                        <span key={index} className="px-2 py-1 bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded text-xs">
                          {req}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {!showResult ? (
                <div>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-4 sm:p-6 mb-6">
                    {(() => {
                      const scenario = scenarios.find(s => s.id === selectedScenario);
                      return (
                        <div>
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="text-2xl">{scenario?.icon}</span>
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-lg">
                              {scenario?.title}
                            </h4>
                          </div>
                          <p className="text-xs sm:text-base text-gray-600 dark:text-gray-300 mb-3">
                            {scenario?.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Requirements:</span>
                            {scenario?.requirements.map((req, index) => (
                              <span key={index} className="px-2 py-1 bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded text-xs">
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  <p className="text-center text-gray-700 dark:text-gray-300 mb-6 text-sm sm:text-base">
                    Which switching method would work better for this scenario?
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => handleScenarioChoice('circuit')}
                      className="p-4 sm:p-6 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 rounded-xl transition-all duration-300 border-2 border-green-200 dark:border-green-700"
                    >
                      <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-green-600 mx-auto mb-3 sm:mb-4" />
                      <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2 text-sm sm:text-base">
                        Circuit Switching
                      </h5>
                      <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                        Dedicated path, guaranteed quality, predictable performance
                      </p>
                    </button>
                    <button
                      onClick={() => handleScenarioChoice('packet')}
                      className="p-4 sm:p-6 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-xl transition-all duration-300 border-2 border-purple-200 dark:border-purple-700"
                    >
                      <Zap className="w-8 h-8 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
                      <h5 className="font-semibold text-purple-800 dark:text-purple-200 mb-2 text-sm sm:text-base">
                        Packet Switching
                      </h5>
                      <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300">
                        Efficient bandwidth use, cost-effective, flexible routing
                      </p>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {(() => {
                    const scenario = scenarios.find(s => s.id === selectedScenario);
                    const isCorrect = userChoice === scenario?.correct;
                    
                    return (
                      <div className={`p-4 sm:p-6 rounded-xl border-2 ${
                        isCorrect 
                          ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-600' 
                          : 'bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-600'
                      }`}>
                        <div className="flex items-center justify-center mb-4">
                          {isCorrect ? (
                            <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-600" />
                          ) : (
                            <XCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-600" />
                          )}
                        </div>
                        
                        <h4 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white text-center mb-4">
                          {isCorrect ? 'Excellent Choice! 🎉' : 'Not the best option! 🤔'}
                        </h4>
                        
                        <p className="text-center text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">
                          The better choice is: <strong>{scenario?.correct === 'circuit' ? 'Circuit Switching' : 'Packet Switching'}</strong>
                        </p>
                        
                        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 sm:p-4 mb-6">
                          <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed text-xs sm:text-sm">
                            {scenario?.explanation}
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <button
                            onClick={resetScenario}
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 text-sm sm:text-base"
                          >
                            Try Another Scenario
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Exam Mode Study Questions */}
      {learningMode === 'exam' && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Switching Comparison - Exam Questions
            </h3>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 text-sm sm:text-base">
                Q1: Compare circuit switching and packet switching in terms of efficiency and suitability.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Circuit Switching:</strong> Less efficient (bandwidth waste during idle), suitable for real-time 
                  applications requiring consistent QoS. <strong>Packet Switching:</strong> More efficient (statistical 
                  multiplexing), suitable for bursty data traffic with varying bandwidth requirements.
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3 text-sm sm:text-base">
                Q2: Explain why packet switching is preferred for modern data networks.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Reasons:</strong> (1) Efficient bandwidth utilization through sharing, (2) Cost-effective 
                  infrastructure, (3) Fault tolerance with multiple paths, (4) Scalability for varying traffic, 
                  (5) Better suited for bursty internet traffic patterns.
                </p>
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 text-sm sm:text-base">
                Q3: What are the trade-offs between guaranteed QoS and resource efficiency?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Circuit Switching:</strong> Guarantees QoS but wastes resources during idle periods. 
                  <strong>Packet Switching:</strong> Efficient resource use but variable QoS. Modern solutions 
                  use QoS mechanisms in packet networks to achieve both efficiency and quality guarantees.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SwitchingComparison;