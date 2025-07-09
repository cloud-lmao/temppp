import React, { useState, useEffect } from 'react';
import { Phone, Clock, Shield, Zap, Play, Pause, RotateCcw, BookOpen, FileText, AlertCircle } from 'lucide-react';

interface CircuitSwitchingProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const CircuitSwitching: React.FC<CircuitSwitchingProps> = ({ learningMode, isDarkMode }) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [callDuration, setCallDuration] = useState(5);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const circuitPhases = [
    {
      id: 1,
      name: "Call Setup",
      description: "Establishing dedicated path",
      detail: "Reserve entire communication path from caller to receiver",
      visual: "📞 Dialing...",
      color: "blue",
      duration: "2-3 seconds"
    },
    {
      id: 2,
      name: "Path Reserved",
      description: "Dedicated circuit established",
      detail: "Entire bandwidth reserved exclusively for this call",
      visual: "🛤️ Path Ready",
      color: "green",
      duration: "Instant"
    },
    {
      id: 3,
      name: "Data Transfer",
      description: "Conversation in progress",
      detail: "Data flows through the reserved path with guaranteed bandwidth",
      visual: "💬 Talking...",
      color: "purple",
      duration: `${callDuration} minutes`
    },
    {
      id: 4,
      name: "Call Teardown",
      description: "Releasing the circuit",
      detail: "Path is freed for other users to use",
      visual: "📴 Hanging up",
      color: "orange",
      duration: "1 second"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentPhase((prev) => (prev + 1) % circuitPhases.length);
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const resetAnimation = () => {
    setCurrentPhase(0);
    setIsPlaying(false);
  };

  const getColorClasses = (color: string, isActive: boolean = false) => {
    if (isActive) {
      const colors = {
        blue: 'bg-blue-200 dark:bg-blue-300 text-gray-900 border-blue-400',
        green: 'bg-green-200 dark:bg-green-300 text-gray-900 border-green-400',
        purple: 'bg-purple-200 dark:bg-purple-300 text-gray-900 border-purple-400',
        orange: 'bg-orange-200 dark:bg-orange-300 text-gray-900 border-orange-400'
      };
      return colors[color as keyof typeof colors];
    } else {
      const colors = {
        blue: 'bg-blue-50 dark:bg-blue-900/20 text-gray-700 dark:text-gray-300 border-blue-200 dark:border-blue-700',
        green: 'bg-green-50 dark:bg-green-900/20 text-gray-700 dark:text-gray-300 border-green-200 dark:border-green-700',
        purple: 'bg-purple-50 dark:bg-purple-900/20 text-gray-700 dark:text-gray-300 border-purple-200 dark:border-purple-700',
        orange: 'bg-orange-50 dark:bg-orange-900/20 text-gray-700 dark:text-gray-300 border-orange-200 dark:border-orange-700'
      };
      return colors[color as keyof typeof colors];
    }
  };

  const Tooltip = ({ term, definition }: { term: string; definition: string }) => (
    <span
      className="relative cursor-help border-b border-dotted border-blue-500 text-blue-600 dark:text-blue-400"
      onMouseEnter={() => setShowTooltip(term)}
      onMouseLeave={() => setShowTooltip(null)}
      onClick={() => setShowTooltip(showTooltip === term ? null : term)}
    >
      {term}
      {showTooltip === term && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg shadow-lg z-10 w-48 text-center">
          {definition}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
        </div>
      )}
    </span>
  );

  return (
    <section className="mb-12 sm:mb-20">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12 text-center px-4">
        Circuit Switching
      </h2>

      {/* Definition Panel */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        {learningMode === 'exam' && (
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-6 h-6 text-green-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Circuit Switching - Study Guide
            </h3>
          </div>
        )}

        {learningMode === 'visualize' ? (
          <div>
            <div className="text-center mb-6 sm:mb-8">
              <img 
                src="https://images.pexels.com/photos/33999/man-person-cute-young.jpg" 
                alt="Phone call"
                className="w-full h-32 sm:h-48 md:h-64 object-cover rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-lg"
              />
            </div>
            <h3 className="text-xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
              Like Making a Phone Call
            </h3>
            <p className="text-base sm:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 text-center leading-relaxed px-2">
              <Tooltip term="Circuit Switching" definition="A switching method where a dedicated communication path is established between sender and receiver before data transmission begins" /> is like making a traditional phone call. 
              Before you can talk, the phone system reserves a complete path from your phone to your friend's phone.
            </p>
            
            {/* Phone Call Simulation */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h4 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                📞 Phone Call Simulation
              </h4>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause' : 'Start'} Call</span>
                </button>
                <button
                  onClick={resetAnimation}
                  className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-700 dark:text-gray-300">Call Duration:</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={callDuration}
                    onChange={(e) => setCallDuration(parseInt(e.target.value))}
                    className="w-16 sm:w-20"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{callDuration}m</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {circuitPhases.map((phase, index) => {
                  const isActive = currentPhase === index;
                  
                  return (
                    <div
                      key={phase.id}
                      className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-500 ${
                        isActive 
                          ? `${getColorClasses(phase.color, true)} scale-105 shadow-lg` 
                          : `${getColorClasses(phase.color, false)}`
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg sm:text-2xl mb-2">{phase.visual}</div>
                        <h5 className={`font-semibold mb-1 sm:mb-2 text-xs sm:text-sm ${
                          isActive ? 'text-gray-900' : 'text-gray-900 dark:text-white'
                        }`}>
                          {phase.name}
                        </h5>
                        <p className={`text-xs mb-2 ${
                          isActive ? 'text-gray-800' : 'text-gray-600 dark:text-gray-300'
                        }`}>
                          {phase.description}
                        </p>
                        <p className={`text-xs font-medium ${
                          isActive ? 'text-gray-700' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          Duration: {phase.duration}
                        </p>
                        {isActive && (
                          <p className="text-xs font-medium text-gray-800 mt-2">
                            {phase.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-green-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Guaranteed Path</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Dedicated path reserved for entire communication duration
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Clock className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Predictable Delay</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Consistent timing since path is pre-established
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Phone className="w-8 h-8 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Real-time Communication</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Perfect for voice calls and video conferences
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <AlertCircle className="w-8 h-8 sm:w-12 sm:h-12 text-orange-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Bandwidth Waste</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Reserved path unused during silence periods
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* EXAM MODE - Comprehensive Study Content */
          <div className="space-y-6 sm:space-y-8">
            {/* Core Definition */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="text-lg sm:text-xl font-semibold text-green-900 dark:text-green-200 mb-3">
                📚 Technical Definition
              </h4>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                <strong>Circuit Switching:</strong> A switching method where a dedicated communication path 
                (circuit) is established between the source and destination before data transmission begins. 
                The entire path remains reserved for the duration of the communication session.
              </p>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <strong>Key Characteristic:</strong> Connection-oriented service with three distinct phases: 
                  circuit establishment, data transfer, and circuit termination.
                </p>
              </div>
            </div>

            {/* Three Phases */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="text-lg sm:text-xl font-semibold text-blue-900 dark:text-blue-200 mb-4">
                🔄 Three Phases of Circuit Switching
              </h4>
              <div className="space-y-4">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    1. Circuit Establishment Phase
                  </h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• End-to-end path is determined and reserved</li>
                    <li>• Resources allocated at each intermediate node</li>
                    <li>• Setup time required before data transmission</li>
                    <li>• May involve signaling protocols (e.g., SS7 in telephony)</li>
                  </ul>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    2. Data Transfer Phase
                  </h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Data flows through the established circuit</li>
                    <li>• Guaranteed bandwidth and consistent delay</li>
                    <li>• No routing decisions needed during transfer</li>
                    <li>• Resources remain dedicated even during idle periods</li>
                  </ul>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    3. Circuit Termination Phase
                  </h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Circuit is torn down when communication ends</li>
                    <li>• Resources are deallocated and freed</li>
                    <li>• Path becomes available for other connections</li>
                    <li>• Signaling messages sent to release resources</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Advantages and Disadvantages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
                <h4 className="text-lg sm:text-xl font-semibold text-green-900 dark:text-green-200 mb-4">
                  ✅ Advantages
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Guaranteed QoS:</strong> Predictable bandwidth and delay</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>No packet loss:</strong> Dedicated path prevents congestion</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Simple data transfer:</strong> No routing during communication</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Suitable for real-time:</strong> Voice and video applications</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 sm:p-6 border border-red-200 dark:border-red-700">
                <h4 className="text-lg sm:text-xl font-semibold text-red-900 dark:text-red-200 mb-4">
                  ❌ Disadvantages
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Bandwidth waste:</strong> Resources reserved even when idle</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Setup delay:</strong> Time required to establish circuit</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Blocking:</strong> Limited number of circuits available</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Inflexible:</strong> Cannot adapt to varying traffic patterns</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Applications and Examples */}
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="text-lg sm:text-xl font-semibold text-purple-900 dark:text-purple-200 mb-4">
                🌐 Applications and Examples
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Traditional Applications:</h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>PSTN:</strong> Public Switched Telephone Network</li>
                    <li>• <strong>ISDN:</strong> Integrated Services Digital Network</li>
                    <li>• <strong>T1/E1 lines:</strong> Dedicated digital circuits</li>
                    <li>• <strong>Frame Relay:</strong> Virtual circuits</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Modern Applications:</h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>MPLS:</strong> Label-switched paths</li>
                    <li>• <strong>ATM:</strong> Asynchronous Transfer Mode</li>
                    <li>• <strong>Optical circuits:</strong> SONET/SDH</li>
                    <li>• <strong>VPN tunnels:</strong> Virtual private networks</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Important Exam Points */}
            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-4 sm:p-6 border border-yellow-200 dark:border-yellow-700">
              <h4 className="text-lg sm:text-xl font-semibold text-yellow-900 dark:text-yellow-200 mb-4">
                🎯 Important Exam Points
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Connection-oriented:</strong> Circuit must be established before data transfer
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Resource reservation:</strong> Bandwidth and buffers allocated for entire session
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Blocking probability:</strong> Calls may be rejected if no circuits available
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Efficiency:</strong> Low for bursty traffic, high for continuous traffic
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Exam Mode Study Questions */}
      {learningMode === 'exam' && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-6 h-6 text-green-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Circuit Switching - Exam Questions
            </h3>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3 text-sm sm:text-base">
                Q1: Explain the three phases of circuit switching with examples.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Answer:</strong> (1) <strong>Circuit Establishment:</strong> Path setup with resource allocation 
                  (e.g., dialing phase in phone call). (2) <strong>Data Transfer:</strong> Information flows through 
                  dedicated path (conversation phase). (3) <strong>Circuit Termination:</strong> Resources released 
                  when communication ends (hanging up phone).
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 text-sm sm:text-base">
                Q2: What are the main advantages and disadvantages of circuit switching?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Advantages:</strong> Guaranteed QoS, predictable delay, no packet loss, suitable for real-time. 
                  <strong>Disadvantages:</strong> Bandwidth waste during idle periods, setup delay, blocking when 
                  circuits unavailable, inflexible resource allocation.
                </p>
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 text-sm sm:text-base">
                Q3: Why is circuit switching suitable for voice communication but not for data networks?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Voice:</strong> Requires consistent delay and bandwidth, continuous traffic pattern, 
                  real-time requirements. <strong>Data:</strong> Bursty traffic patterns, varying bandwidth needs, 
                  can tolerate some delay, inefficient use of dedicated circuits during idle periods.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CircuitSwitching;