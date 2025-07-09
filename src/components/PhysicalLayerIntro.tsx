import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight, Play, Pause, RotateCcw, BookOpen, FileText, Info } from 'lucide-react';

interface PhysicalLayerIntroProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const PhysicalLayerIntro: React.FC<PhysicalLayerIntroProps> = ({ learningMode, isDarkMode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const transmissionSteps = [
    {
      id: 1,
      title: "Digital Data",
      description: "Computer has data: 1 0 1 0 1 1",
      detail: "Your computer stores everything as binary digits (bits) - just 1s and 0s",
      visual: "💻 Computer Memory",
      color: "blue"
    },
    {
      id: 2,
      title: "Signal Conversion",
      description: "Convert bits to electrical signals",
      detail: "Physical layer converts 1s and 0s into electrical voltages or light pulses",
      visual: "⚡ Signal Generator",
      color: "green"
    },
    {
      id: 3,
      title: "Transmission Medium",
      description: "Signals travel through cable/air",
      detail: "The actual path - copper wire, fiber optic cable, or radio waves",
      visual: "🔌 Cable/Wireless",
      color: "purple"
    },
    {
      id: 4,
      title: "Signal Reception",
      description: "Destination receives signals",
      detail: "Receiving device detects the electrical or light signals",
      visual: "📡 Receiver",
      color: "orange"
    },
    {
      id: 5,
      title: "Data Recovery",
      description: "Convert back to: 1 0 1 0 1 1",
      detail: "Signals are converted back to digital data that the computer understands",
      visual: "💻 Target Computer",
      color: "red"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % transmissionSteps.length);
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const resetAnimation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const getColorClasses = (color: string, isActive: boolean = false) => {
    if (isActive) {
      // Use light backgrounds with dark text for better readability during animation
      const colors = {
        blue: 'bg-blue-200 dark:bg-blue-300 text-gray-900 border-blue-400',
        green: 'bg-green-200 dark:bg-green-300 text-gray-900 border-green-400',
        purple: 'bg-purple-200 dark:bg-purple-300 text-gray-900 border-purple-400',
        orange: 'bg-orange-200 dark:bg-orange-300 text-gray-900 border-orange-400',
        red: 'bg-red-200 dark:bg-red-300 text-gray-900 border-red-400'
      };
      return colors[color as keyof typeof colors];
    } else {
      // Subtle colors for inactive states
      const colors = {
        blue: 'bg-blue-50 dark:bg-blue-900/20 text-gray-700 dark:text-gray-300 border-blue-200 dark:border-blue-700',
        green: 'bg-green-50 dark:bg-green-900/20 text-gray-700 dark:text-gray-300 border-green-200 dark:border-green-700',
        purple: 'bg-purple-50 dark:bg-purple-900/20 text-gray-700 dark:text-gray-300 border-purple-200 dark:border-purple-700',
        orange: 'bg-orange-50 dark:bg-orange-900/20 text-gray-700 dark:text-gray-300 border-orange-200 dark:border-orange-700',
        red: 'bg-red-50 dark:bg-red-900/20 text-gray-700 dark:text-gray-300 border-red-200 dark:border-red-700'
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
        What is the Physical Layer?
      </h2>

      {/* Definition Panel */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        {learningMode === 'exam' && (
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Physical Layer - Complete Study Guide
            </h3>
          </div>
        )}

        {learningMode === 'visualize' ? (
          <div>
            <div className="text-center mb-6 sm:mb-8">
              <img 
                src="https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg" 
                alt="Network cables"
                className="w-full h-32 sm:h-48 md:h-64 object-cover rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-lg"
              />
            </div>
            <h3 className="text-xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
              Simple Definition
            </h3>
            <p className="text-base sm:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 text-center leading-relaxed px-2">
              The <Tooltip term="Physical Layer" definition="The bottom layer of network models that handles actual transmission of raw bits over physical medium" /> is like the roads and vehicles for your data. 
              It's responsible for moving <Tooltip term="bits" definition="Binary digits - the smallest unit of data, either 1 or 0" /> (1s and 0s) from one device to another through cables, radio waves, or light.
            </p>
            
            {/* Transmission Animation */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h4 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                🔄 How Data Actually Travels
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

              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {transmissionSteps.map((step, index) => {
                  const isActive = currentStep === index;
                  
                  return (
                    <div
                      key={step.id}
                      className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-500 ${
                        isActive 
                          ? `${getColorClasses(step.color, true)} scale-105 shadow-lg` 
                          : `${getColorClasses(step.color, false)}`
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg sm:text-2xl mb-2">{step.visual}</div>
                        <h5 className={`font-semibold mb-1 sm:mb-2 text-xs sm:text-sm ${
                          isActive ? 'text-gray-900' : 'text-gray-900 dark:text-white'
                        }`}>
                          {step.title}
                        </h5>
                        <p className={`text-xs mb-2 ${
                          isActive ? 'text-gray-800' : 'text-gray-600 dark:text-gray-300'
                        }`}>
                          {step.description}
                        </p>
                        {isActive && (
                          <p className="text-xs font-medium text-gray-800">
                            {step.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Functions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Zap className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Bit Transmission</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Converts 1s and 0s into electrical signals, light pulses, or radio waves
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <ArrowRight className="w-8 h-8 sm:w-12 sm:h-12 text-green-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Signal Direction</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Controls how data flows - one way, both ways alternating, or both ways simultaneously
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Info className="w-8 h-8 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Physical Properties</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Defines voltage levels, cable types, connector shapes, and timing
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* EXAM MODE - Comprehensive Study Content */
          <div className="space-y-6 sm:space-y-8">
            {/* Core Definition */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="text-lg sm:text-xl font-semibold text-blue-900 dark:text-blue-200 mb-3">
                📚 Technical Definition
              </h4>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                <strong>Physical Layer (Layer 1):</strong> The lowest layer in both OSI and TCP/IP models responsible for 
                the actual transmission and reception of raw bit streams over a physical medium. It defines electrical, 
                mechanical, procedural, and functional specifications for activating, maintaining, and deactivating 
                physical links between network devices.
              </p>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <strong>Key Point:</strong> The physical layer deals with the transmission of raw bits, not data packets or frames. 
                  It doesn't understand the meaning of the bits - it just moves them from point A to point B.
                </p>
              </div>
            </div>

            {/* Primary Functions */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="text-lg sm:text-xl font-semibold text-green-900 dark:text-green-200 mb-4">
                🔧 Primary Functions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Transmission Functions:</h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>Bit transmission:</strong> Converting digital bits to physical signals</li>
                    <li>• <strong>Signal encoding:</strong> Representing 1s and 0s as voltage levels</li>
                    <li>• <strong>Synchronization:</strong> Timing coordination between sender and receiver</li>
                    <li>• <strong>Line configuration:</strong> Point-to-point or multipoint connections</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Physical Specifications:</h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>Electrical:</strong> Voltage levels, current, resistance</li>
                    <li>• <strong>Mechanical:</strong> Cable types, connector shapes, pin layouts</li>
                    <li>• <strong>Functional:</strong> Purpose of each circuit and pin</li>
                    <li>• <strong>Procedural:</strong> Sequence of events for transmission</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Transmission Modes */}
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="text-lg sm:text-xl font-semibold text-purple-900 dark:text-purple-200 mb-4">
                🔄 Transmission Modes
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Simplex</h6>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    One-way communication only. Data flows in only one direction.
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    <strong>Example:</strong> Radio broadcasting, TV transmission
                  </p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Half-Duplex</h6>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    Two-way communication, but only one direction at a time.
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    <strong>Example:</strong> Walkie-talkies, old Ethernet hubs
                  </p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Full-Duplex</h6>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    Simultaneous two-way communication in both directions.
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    <strong>Example:</strong> Telephone calls, modern Ethernet
                  </p>
                </div>
              </div>
            </div>

            {/* Important Exam Points */}
            <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 sm:p-6 border border-red-200 dark:border-red-700">
              <h4 className="text-lg sm:text-xl font-semibold text-red-900 dark:text-red-200 mb-4">
                🎯 Important Exam Points
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Data Unit:</strong> Physical layer works with individual bits, not frames or packets
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Devices:</strong> Hubs, repeaters, cables, connectors operate at physical layer
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>No Intelligence:</strong> Physical layer doesn't understand addresses, protocols, or error correction
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Standards:</strong> RS-232, RS-485, Ethernet physical standards (10BASE-T, 100BASE-TX)
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
            <FileText className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Physical Layer - Exam Questions
            </h3>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 text-sm sm:text-base">
                Q1: What are the four main specifications defined by the physical layer?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Answer:</strong> (1) <strong>Electrical:</strong> Voltage levels, current, power requirements. 
                  (2) <strong>Mechanical:</strong> Cable types, connector shapes, pin configurations. 
                  (3) <strong>Functional:</strong> Purpose and function of each circuit and pin. 
                  (4) <strong>Procedural:</strong> Sequence of events for establishing and maintaining connections.
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3 text-sm sm:text-base">
                Q2: Differentiate between simplex, half-duplex, and full-duplex transmission modes.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Simplex:</strong> Unidirectional communication (radio, TV). <strong>Half-duplex:</strong> 
                  Bidirectional but not simultaneous (walkie-talkie, old Ethernet). <strong>Full-duplex:</strong> 
                  Simultaneous bidirectional communication (telephone, modern Ethernet switches).
                </p>
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 text-sm sm:text-base">
                Q3: What devices operate at the physical layer and what are their functions?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Hubs:</strong> Multi-port repeaters that regenerate signals to all ports. 
                  <strong>Repeaters:</strong> Amplify and regenerate signals to extend transmission distance. 
                  <strong>Cables/Connectors:</strong> Physical medium for signal transmission. 
                  <strong>Transceivers:</strong> Convert between different signal types.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhysicalLayerIntro;