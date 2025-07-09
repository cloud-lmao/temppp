import React, { useState, useEffect } from 'react';
import { Mail, Package, Truck, CheckCircle, XCircle, Play, Pause, RotateCcw, BookOpen, FileText } from 'lucide-react';

interface ProtocolIntroProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const ProtocolIntro: React.FC<ProtocolIntroProps> = ({ learningMode, isDarkMode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const postalSteps = [
    {
      id: 1,
      title: "Write Your Letter",
      description: "You write a message to your friend",
      analogy: "Application Layer - Creating your data",
      icon: Mail,
      color: "blue"
    },
    {
      id: 2,
      title: "Put in Envelope",
      description: "Add recipient address and your return address",
      analogy: "Transport Layer - Adding delivery information",
      icon: Package,
      color: "green"
    },
    {
      id: 3,
      title: "Postal Service Routes",
      description: "Post office determines the best path to destination",
      analogy: "Network Layer - Finding the route",
      icon: Truck,
      color: "purple"
    },
    {
      id: 4,
      title: "Physical Delivery",
      description: "Mail truck physically carries your letter",
      analogy: "Physical Layer - Actual transmission",
      icon: CheckCircle,
      color: "orange"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % postalSteps.length);
      }, 2500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const handleQuizAnswer = (answer: string) => {
    setQuizAnswer(answer);
    setShowQuizResult(true);
  };

  const resetAnimation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-600',
      green: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-600',
      purple: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700 text-purple-600',
      orange: 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700 text-orange-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="mb-12 sm:mb-20">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12 text-center px-4">
        What are Network Protocols?
      </h2>

      {/* Definition Panel */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        {learningMode === 'visualize' ? (
          <div>
            <div className="text-center mb-6 sm:mb-8">
              <img 
                src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg" 
                alt="Communication protocols"
                className="w-full h-32 sm:h-48 md:h-64 object-cover rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-lg"
              />
            </div>
            <h3 className="text-xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
              Simple Definition
            </h3>
            <p className="text-base sm:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 text-center leading-relaxed px-2">
              Network protocols are like rules of conversation. Just as people follow social rules when talking 
              (like taking turns, speaking clearly), computers follow protocols to communicate effectively.
            </p>
            
            {/* Postal System Analogy */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h4 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                📮 Think of it like the Postal System
              </h4>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause' : 'Play'} Animation</span>
                </button>
                <button
                  onClick={resetAnimation}
                  className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {postalSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === index;
                  
                  return (
                    <div
                      key={step.id}
                      className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-500 ${
                        isActive 
                          ? `${getColorClasses(step.color)} scale-105 shadow-lg` 
                          : 'bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      <div className="text-center">
                        <Icon className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 ${
                          isActive ? step.color === 'blue' ? 'text-blue-600' : 
                                   step.color === 'green' ? 'text-green-600' :
                                   step.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                                   : 'text-gray-400'
                        }`} />
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 text-xs sm:text-sm">
                          {step.title}
                        </h5>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                          {step.description}
                        </p>
                        <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                          {step.analogy}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* EXAM MODE - Comprehensive Study Content */
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              <h3 className="text-xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
                Network Protocols - Study Guide
              </h3>
            </div>

            {/* Core Definition */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="text-lg sm:text-xl font-semibold text-blue-900 dark:text-blue-200 mb-3">
                📚 Definition
              </h4>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                <strong>Network Protocol:</strong> A set of rules and conventions that govern how data is transmitted, 
                formatted, and processed across a network. Protocols define syntax, semantics, and synchronization 
                of communication between network devices.
              </p>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 italic">
                  <strong>Key Point:</strong> Without protocols, different devices couldn't understand each other - 
                  like people speaking different languages without a translator.
                </p>
              </div>
            </div>

            {/* Protocol Elements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
                <h4 className="text-base sm:text-lg font-semibold text-green-900 dark:text-green-200 mb-3">
                  🔤 Syntax
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <li>• Data format and structure</li>
                  <li>• Field sizes and order</li>
                  <li>• Encoding methods</li>
                  <li>• Message boundaries</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
                <h4 className="text-base sm:text-lg font-semibold text-purple-900 dark:text-purple-200 mb-3">
                  🧠 Semantics
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <li>• Meaning of each field</li>
                  <li>• Actions to be taken</li>
                  <li>• Error handling rules</li>
                  <li>• Response requirements</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-4 sm:p-6 border border-orange-200 dark:border-orange-700">
                <h4 className="text-base sm:text-lg font-semibold text-orange-900 dark:text-orange-200 mb-3">
                  ⏰ Timing
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <li>• When to send data</li>
                  <li>• How fast to send</li>
                  <li>• Timeout values</li>
                  <li>• Synchronization rules</li>
                </ul>
              </div>
            </div>

            {/* Why Layering is Essential */}
            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-4 sm:p-6 border border-yellow-200 dark:border-yellow-700">
              <h4 className="text-lg sm:text-xl font-semibold text-yellow-900 dark:text-yellow-200 mb-4">
                🏗️ Why Protocol Layering?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Benefits:</h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>Modularity:</strong> Each layer has specific function</li>
                    <li>• <strong>Abstraction:</strong> Hide complexity from upper layers</li>
                    <li>• <strong>Interoperability:</strong> Standard interfaces</li>
                    <li>• <strong>Maintainability:</strong> Easy to update individual layers</li>
                    <li>• <strong>Scalability:</strong> Add new protocols easily</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Real-world Analogy:</h5>
                  <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Like a company with departments: HR doesn't need to know how IT manages servers, 
                      but they can still communicate through standard procedures.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Primitives */}
            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-4 sm:p-6 border border-indigo-200 dark:border-indigo-700">
              <h4 className="text-lg sm:text-xl font-semibold text-indigo-900 dark:text-indigo-200 mb-4">
                🔧 Service Primitives (Advanced)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">REQUEST</h6>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Service user asks for service</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">INDICATION</h6>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Service provider signals event</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">RESPONSE</h6>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Service user responds to indication</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">CONFIRM</h6>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Service provider confirms completion</p>
                </div>
              </div>
            </div>

            {/* Key Exam Points */}
            <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 sm:p-6 border border-red-200 dark:border-red-700">
              <h4 className="text-lg sm:text-xl font-semibold text-red-900 dark:text-red-200 mb-4">
                🎯 Important Exam Points
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Protocol vs Service:</strong> Protocol defines how peers communicate; Service defines what functionality is provided to upper layer
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Encapsulation:</strong> Each layer adds its header to data from upper layer (like nested envelopes)
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Layer Independence:</strong> Changes in one layer don't affect other layers (as long as interface remains same)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Quiz - Simplified for Exam Mode */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        {learningMode === 'visualize' ? (
          <>
            <h3 className="text-xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-8 text-center">
              🎯 Quick Understanding Check
            </h3>
            
            {!showQuizResult ? (
              <div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 text-center leading-relaxed">
                    "When you send a WhatsApp message, which layer is responsible for making sure 
                    the message reaches the correct person?"
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <button
                    onClick={() => handleQuizAnswer('application')}
                    className="p-3 sm:p-4 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-xl transition-colors text-sm sm:text-base"
                  >
                    Application Layer (WhatsApp app)
                  </button>
                  <button
                    onClick={() => handleQuizAnswer('transport')}
                    className="p-3 sm:p-4 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-800 dark:text-green-200 rounded-xl transition-colors text-sm sm:text-base"
                  >
                    Transport Layer (Delivery system)
                  </button>
                  <button
                    onClick={() => handleQuizAnswer('network')}
                    className="p-3 sm:p-4 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-xl transition-colors text-sm sm:text-base"
                  >
                    Network Layer (Routing)
                  </button>
                  <button
                    onClick={() => handleQuizAnswer('physical')}
                    className="p-3 sm:p-4 bg-orange-100 dark:bg-orange-900/30 hover:bg-orange-200 dark:hover:bg-orange-900/50 text-orange-800 dark:text-orange-200 rounded-xl transition-colors text-sm sm:text-base"
                  >
                    Physical Layer (WiFi/Data)
                  </button>
                </div>
              </div>
            ) : (
              <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
                quizAnswer === 'application' 
                  ? 'bg-green-50 dark:bg-green-900/30 border-2 border-green-300' 
                  : 'bg-red-50 dark:bg-red-900/30 border-2 border-red-300'
              }`}>
                <div className="flex items-center justify-center mb-4">
                  {quizAnswer === 'application' ? (
                    <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-600" />
                  ) : (
                    <XCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-600" />
                  )}
                </div>
                
                <h4 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white text-center mb-3 sm:mb-4">
                  {quizAnswer === 'application' ? 'Correct! 🎉' : 'Not quite right! 🤔'}
                </h4>
                
                <p className="text-center text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                  The correct answer is: <strong>Application Layer</strong>
                </p>
                
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                  <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                    The Application Layer (WhatsApp) handles user identification and message formatting. 
                    It knows who you want to send the message to and formats it properly before passing 
                    it down to lower layers for delivery.
                  </p>
                </div>
                
                <div className="text-center mt-4 sm:mt-6">
                  <button
                    onClick={() => {
                      setShowQuizResult(false);
                      setQuizAnswer(null);
                    }}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 text-sm sm:text-base"
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
                Practice Questions
              </h3>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
                <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 text-sm sm:text-base">
                  Question 1: Define network protocol and explain its three main components.
                </h4>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Answer:</strong> A network protocol is a set of rules governing data communication. 
                    Three components: (1) <strong>Syntax</strong> - data format and structure, 
                    (2) <strong>Semantics</strong> - meaning of each field and actions to take, 
                    (3) <strong>Timing</strong> - when and how fast to send data.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
                <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 text-sm sm:text-base">
                  Question 2: Why is protocol layering important in network architecture?
                </h4>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Answer:</strong> Layering provides: (1) <strong>Modularity</strong> - separate functions, 
                    (2) <strong>Abstraction</strong> - hide complexity, (3) <strong>Interoperability</strong> - standard interfaces, 
                    (4) <strong>Maintainability</strong> - easy updates, (5) <strong>Scalability</strong> - add new protocols easily.
                  </p>
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
                <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3 text-sm sm:text-base">
                  Question 3: Explain the difference between a protocol and a service.
                </h4>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Answer:</strong> A <strong>protocol</strong> defines how peer entities communicate 
                    (rules and message formats). A <strong>service</strong> defines what functionality 
                    a layer provides to the layer above it (interface and capabilities).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProtocolIntro;