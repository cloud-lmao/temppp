import React, { useState } from 'react';
import { Layers, Network, ArrowRight, CheckCircle, XCircle, BookOpen, FileText } from 'lucide-react';

interface ProtocolComparisonProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const ProtocolComparison: React.FC<ProtocolComparisonProps> = ({ learningMode, isDarkMode }) => {
  const [selectedModel, setSelectedModel] = useState<'osi' | 'tcpip' | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const modelComparison = {
    osi: {
      name: 'OSI Model',
      layers: 7,
      purpose: 'Theoretical reference model',
      icon: Layers,
      color: 'blue',
      advantages: [
        'Clear separation of concerns',
        'Educational and theoretical value',
        'Detailed layer functions',
        'Universal reference standard',
        'Better for troubleshooting',
        'Protocol-independent'
      ],
      disadvantages: [
        'Complex with 7 layers',
        'Not widely implemented',
        'Some layers rarely used',
        'Theoretical rather than practical',
        'Overhead in implementation'
      ],
      realWorld: 'Used mainly for education and network troubleshooting',
      examDetails: {
        developedBy: 'ISO (International Organization for Standardization)',
        year: '1984',
        purpose: 'Reference model for network communication',
        implementation: 'Theoretical framework'
      }
    },
    tcpip: {
      name: 'TCP/IP Model',
      layers: 4,
      purpose: 'Practical implementation model',
      icon: Network,
      color: 'green',
      advantages: [
        'Simpler with 4 layers',
        'Actually used in practice',
        'Internet standard',
        'Proven and reliable',
        'Efficient implementation',
        'Industry standard'
      ],
      disadvantages: [
        'Less detailed separation',
        'Some functions overlap',
        'Not as educational',
        'Specific to TCP/IP protocols',
        'Less granular troubleshooting'
      ],
      realWorld: 'Powers the entire internet and most networks',
      examDetails: {
        developedBy: 'DARPA (US Department of Defense)',
        year: '1970s',
        purpose: 'Practical network implementation',
        implementation: 'Real-world internet protocols'
      }
    }
  };

  const layerMapping = [
    { 
      osi: ['Application', 'Presentation', 'Session'], 
      tcpip: 'Application', 
      description: 'User interface and services',
      details: 'Combines user interface, data formatting, and session management'
    },
    { 
      osi: ['Transport'], 
      tcpip: 'Transport', 
      description: 'End-to-end delivery',
      details: 'Direct mapping - handles reliable data transfer'
    },
    { 
      osi: ['Network'], 
      tcpip: 'Internet', 
      description: 'Routing and addressing',
      details: 'Direct mapping - handles packet routing and IP addressing'
    },
    { 
      osi: ['Data Link', 'Physical'], 
      tcpip: 'Network Access', 
      description: 'Physical transmission',
      details: 'Combines frame formatting and physical transmission'
    }
  ];

  const quizQuestions = [
    {
      question: "Which model is actually used to run the internet?",
      options: ["OSI Model", "TCP/IP Model", "Both equally", "Neither"],
      correct: "TCP/IP Model",
      explanation: "The TCP/IP model is the practical implementation that actually runs the internet. OSI is mainly used for education and reference."
    }
  ];

  const handleQuizAnswer = (answer: string) => {
    setQuizAnswer(answer);
    setShowQuizResult(true);
  };

  const resetQuiz = () => {
    setQuizAnswer(null);
    setShowQuizResult(false);
  };

  return (
    <section className="mb-12 sm:mb-20">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12 text-center px-4">
        OSI vs TCP/IP Models
      </h2>

      {/* Model Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12 mx-2 sm:mx-0">
        {Object.entries(modelComparison).map(([key, model]) => {
          const Icon = model.icon;
          const isSelected = selectedModel === key;
          
          return (
            <div
              key={key}
              className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border-2 cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? 'border-blue-400 dark:border-blue-500 shadow-2xl scale-102' 
                  : 'border-gray-200 dark:border-gray-600 hover:shadow-xl'
              }`}
              onClick={() => setSelectedModel(isSelected ? null : key as 'osi' | 'tcpip')}
            >
              <div className="text-center mb-4 sm:mb-6">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl flex items-center justify-center ${
                  model.color === 'blue' 
                    ? 'bg-blue-100 dark:bg-blue-900/30' 
                    : 'bg-green-100 dark:bg-green-900/30'
                }`}>
                  <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${
                    model.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                  }`} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {model.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2">
                  {model.layers} Layers
                </p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {model.purpose}
                </p>
              </div>

              {learningMode === 'visualize' && (
                <div className="text-center mb-4 sm:mb-6">
                  <div className={`inline-block px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium ${
                    model.color === 'blue'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  }`}>
                    {model.realWorld}
                  </div>
                </div>
              )}

              {isSelected && (
                <div className="space-y-3 sm:space-y-4">
                  {learningMode === 'exam' && (
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 sm:p-4 mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                        Historical Context:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Developed by:</span>
                          <div className="text-gray-600 dark:text-gray-400">{model.examDetails.developedBy}</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Year:</span>
                          <div className="text-gray-600 dark:text-gray-400">{model.examDetails.year}</div>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Purpose:</span>
                          <div className="text-gray-600 dark:text-gray-400">{model.examDetails.purpose}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2 text-sm sm:text-base">
                      ✅ Advantages:
                    </h4>
                    <ul className="space-y-1">
                      {model.advantages.map((advantage, index) => (
                        <li key={index} className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                          <span>{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2 text-sm sm:text-base">
                      ❌ Disadvantages:
                    </h4>
                    <ul className="space-y-1">
                      {model.disadvantages.map((disadvantage, index) => (
                        <li key={index} className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                          <span>{disadvantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Layer Mapping Visualization */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
          🔄 How the Models Map Together
        </h3>
        
        <div className="space-y-3 sm:space-y-4">
          {layerMapping.map((mapping, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl">
              {/* OSI Layers */}
              <div className="flex-1 text-center sm:text-left">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-1 text-xs sm:text-sm">
                  OSI Model:
                </h4>
                <div className="flex flex-wrap justify-center sm:justify-start gap-1">
                  {mapping.osi.map((layer, layerIndex) => (
                    <span
                      key={layerIndex}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded text-xs"
                    >
                      {layer}
                    </span>
                  ))}
                </div>
                {learningMode === 'exam' && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {mapping.details}
                  </p>
                )}
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0">
                <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400 transform sm:transform-none rotate-90 sm:rotate-0" />
              </div>

              {/* TCP/IP Layer */}
              <div className="flex-1 text-center sm:text-right">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-1 text-xs sm:text-sm">
                  TCP/IP Model:
                </h4>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded text-xs sm:text-sm">
                  {mapping.tcpip}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl border border-yellow-200 dark:border-yellow-700">
          <p className="text-center text-yellow-800 dark:text-yellow-200 text-xs sm:text-sm">
            💡 <strong>Key Insight:</strong> TCP/IP combines multiple OSI layers into single layers for simplicity and practicality.
          </p>
        </div>
      </div>

      {/* Quiz Section */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        {learningMode === 'visualize' ? (
          <>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
              🎯 Quick Knowledge Check
            </h3>
            
            {!showQuizResult ? (
              <div>
                <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 text-center leading-relaxed">
                    {quizQuestions[0].question}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {quizQuestions[0].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(option)}
                      className="p-3 sm:p-4 bg-gray-100 dark:bg-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-green-100 dark:hover:from-blue-900/30 dark:hover:to-green-900/30 text-gray-900 dark:text-white rounded-xl transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 text-sm sm:text-base"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className={`p-4 sm:p-6 rounded-xl border-2 ${
                quizAnswer === quizQuestions[0].correct 
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-600' 
                  : 'bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-600'
              }`}>
                <div className="flex items-center justify-center mb-4">
                  {quizAnswer === quizQuestions[0].correct ? (
                    <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-600" />
                  ) : (
                    <XCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-600" />
                  )}
                </div>
                
                <h4 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white text-center mb-3 sm:mb-4">
                  {quizAnswer === quizQuestions[0].correct ? 'Correct! 🎉' : 'Not quite right! 🤔'}
                </h4>
                
                <p className="text-center text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                  The correct answer is: <strong>{quizQuestions[0].correct}</strong>
                </p>
                
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed text-xs sm:text-sm">
                    {quizQuestions[0].explanation}
                  </p>
                </div>
                
                <div className="text-center">
                  <button
                    onClick={resetQuiz}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-lg transition-all duration-300 text-sm sm:text-base"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* EXAM MODE - Study Questions */
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                Model Comparison - Exam Questions
              </h3>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
                <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 text-sm sm:text-base">
                  Q1: Why was the OSI model developed and why isn't it widely implemented?
                </h4>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Development:</strong> Created by ISO in 1984 as a universal reference model for network communication. 
                    <strong>Limited Implementation:</strong> Too complex for practical use, TCP/IP was already established, 
                    and some layers (like Session and Presentation) are rarely used independently.
                  </p>
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
                <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3 text-sm sm:text-base">
                  Q2: Explain how TCP/IP Application layer combines multiple OSI layers.
                </h4>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    TCP/IP Application layer combines OSI's Application (user interface), Presentation (data formatting/encryption), 
                    and Session (connection management) layers. This simplification makes implementation easier while maintaining 
                    all necessary functionality for real-world applications.
                  </p>
                </div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
                <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 text-sm sm:text-base">
                  Q3: When would you use OSI model vs TCP/IP model for network troubleshooting?
                </h4>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>OSI Model:</strong> Better for systematic troubleshooting due to granular layer separation. 
                    Helps isolate problems to specific functions (physical, data link, network, etc.). 
                    <strong>TCP/IP Model:</strong> Better for understanding actual protocol behavior and 
                    real-world network implementation issues.
                  </p>
                </div>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-4 sm:p-6 border border-orange-200 dark:border-orange-700">
                <h4 className="font-semibold text-orange-900 dark:text-orange-200 mb-3 text-sm sm:text-base">
                  Q4: List the advantages and disadvantages of each model.
                </h4>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <div>
                      <p className="font-semibold mb-2">OSI Advantages:</p>
                      <ul className="space-y-1">
                        <li>• Clear separation of functions</li>
                        <li>• Better for education/troubleshooting</li>
                        <li>• Protocol-independent</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">TCP/IP Advantages:</p>
                      <ul className="space-y-1">
                        <li>• Simpler implementation</li>
                        <li>• Industry standard</li>
                        <li>• Proven reliability</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProtocolComparison;