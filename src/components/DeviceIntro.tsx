import React, { useState, useEffect } from 'react';
import { Cpu, Router, Wifi, ArrowRight, Play, Pause, RotateCcw, BookOpen, FileText } from 'lucide-react';

interface DeviceIntroProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const DeviceIntro: React.FC<DeviceIntroProps> = ({ learningMode, isDarkMode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const dataFlowSteps = [
    {
      id: 1,
      device: "Source Device",
      description: "Computer wants to send data",
      detail: "Your laptop creates data that needs to reach another device",
      icon: "💻",
      color: "blue"
    },
    {
      id: 2,
      device: "Switch",
      description: "Smart traffic controller",
      detail: "Switch learns device locations and forwards data efficiently",
      icon: "🔀",
      color: "green"
    },
    {
      id: 3,
      device: "Router",
      description: "Network gateway",
      detail: "Router finds the best path to reach other networks",
      icon: "🌐",
      color: "purple"
    },
    {
      id: 4,
      device: "Destination",
      description: "Data reaches target",
      detail: "The intended device receives the data successfully",
      icon: "🎯",
      color: "orange"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % dataFlowSteps.length);
      }, 2500);
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
        Why Do We Need Network Devices?
      </h2>

      {/* Definition Panel */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        {learningMode === 'exam' && (
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Network Devices - Study Guide
            </h3>
          </div>
        )}

        {learningMode === 'visualize' ? (
          <div>
            <div className="text-center mb-6 sm:mb-8">
              <img 
                src="https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg" 
                alt="Network devices"
                className="w-full h-32 sm:h-48 md:h-64 object-cover rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-lg"
              />
            </div>
            <h3 className="text-xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
              Like Traffic Management System
            </h3>
            <p className="text-base sm:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 text-center leading-relaxed px-2">
              <Tooltip term="Network Devices" definition="Hardware components that connect, manage, and direct data flow in computer networks" /> are like traffic management systems in a city. 
              Just as traffic lights, road signs, and traffic controllers guide vehicles to their destinations, network devices guide data through the network efficiently.
            </p>
            
            {/* Data Flow Animation */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h4 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                🚦 Data Flow Through Network Devices
              </h4>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause' : 'Start'} Flow</span>
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
                {dataFlowSteps.map((step, index) => {
                  const isActive = currentStep === index;
                  
                  return (
                    <div key={step.id} className="relative">
                      <div
                        className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-500 ${
                          isActive 
                            ? `${getColorClasses(step.color, true)} scale-105 shadow-lg` 
                            : `${getColorClasses(step.color, false)}`
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-lg sm:text-2xl mb-2">{step.icon}</div>
                          <h5 className={`font-semibold mb-1 sm:mb-2 text-xs sm:text-sm ${
                            isActive ? 'text-gray-900' : 'text-gray-900 dark:text-white'
                          }`}>
                            {step.device}
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
                      
                      {/* Arrow between steps */}
                      {index < dataFlowSteps.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                          <ArrowRight className={`w-4 h-4 ${
                            isActive ? 'text-blue-600 animate-pulse' : 'text-gray-400'
                          }`} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Problems Network Devices Solve */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Cpu className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Smart Forwarding</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Devices learn where other devices are located and send data directly to them
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Router className="w-8 h-8 sm:w-12 sm:h-12 text-green-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Network Connection</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Connect different networks together, like your home network to the internet
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Wifi className="w-8 h-8 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Collision Prevention</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Prevent data collisions by creating separate communication channels
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
                <strong>Network Devices:</strong> Hardware components that facilitate communication, data transfer, 
                and network management in computer networks. They operate at different OSI layers and perform 
                specific functions like switching, routing, bridging, and signal regeneration.
              </p>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <strong>Key Point:</strong> Each device operates at specific OSI layers and has distinct 
                  functions in network communication and management.
                </p>
              </div>
            </div>

            {/* Device Categories */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="text-lg sm:text-xl font-semibold text-green-900 dark:text-green-200 mb-4">
                🔧 Device Categories by OSI Layer
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    Physical Layer (Layer 1)
                  </h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>Hubs:</strong> Signal regeneration and broadcasting</li>
                    <li>• <strong>Repeaters:</strong> Signal amplification</li>
                    <li>• <strong>Cables:</strong> Physical transmission medium</li>
                  </ul>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    Data Link Layer (Layer 2)
                  </h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>Switches:</strong> Frame forwarding and MAC learning</li>
                    <li>• <strong>Bridges:</strong> Network segmentation</li>
                    <li>• <strong>Access Points:</strong> Wireless connectivity</li>
                  </ul>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    Network Layer (Layer 3)
                  </h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>Routers:</strong> Packet routing between networks</li>
                    <li>• <strong>Layer 3 Switches:</strong> High-speed routing</li>
                    <li>• <strong>Multilayer Switches:</strong> Combined switching/routing</li>
                  </ul>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    Higher Layers (4-7)
                  </h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>Firewalls:</strong> Security and access control</li>
                    <li>• <strong>Load Balancers:</strong> Traffic distribution</li>
                    <li>• <strong>Gateways:</strong> Protocol conversion</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Key Functions */}
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="text-lg sm:text-xl font-semibold text-purple-900 dark:text-purple-200 mb-4">
                ⚙️ Primary Functions of Network Devices
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">Switching</h6>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Forward frames based on MAC addresses</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">Routing</h6>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Find best paths between networks</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">Bridging</h6>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Connect network segments</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">Filtering</h6>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Control traffic flow and access</p>
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
                    <strong>Layer Operation:</strong> Each device operates at specific OSI layers with distinct functions
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Collision vs Broadcast Domains:</strong> Different devices create different domain boundaries
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Addressing:</strong> Layer 2 uses MAC addresses, Layer 3 uses IP addresses
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Performance:</strong> Higher layer devices are more intelligent but have higher latency
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
              Network Devices Introduction - Exam Questions
            </h3>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3 text-sm sm:text-base">
                Q1: Classify network devices based on OSI layers and explain their primary functions.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Layer 1 (Physical):</strong> Hubs, repeaters - signal regeneration. 
                  <strong>Layer 2 (Data Link):</strong> Switches, bridges - frame forwarding. 
                  <strong>Layer 3 (Network):</strong> Routers - packet routing. 
                  <strong>Higher Layers:</strong> Firewalls, gateways - application-specific functions.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 text-sm sm:text-base">
                Q2: What is the difference between collision domains and broadcast domains?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Collision Domain:</strong> Network segment where collisions can occur. Hubs create single 
                  collision domain, switches create separate collision domain per port. <strong>Broadcast Domain:</strong> 
                  Network segment where broadcast frames are propagated. Switches maintain single broadcast domain, 
                  routers separate broadcast domains.
                </p>
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 text-sm sm:text-base">
                Q3: Why are network devices essential for modern computer networks?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  Network devices are essential for: (1) <strong>Scalability</strong> - connecting multiple devices 
                  efficiently, (2) <strong>Performance</strong> - reducing collisions and optimizing traffic flow, 
                  (3) <strong>Security</strong> - controlling access and filtering traffic, (4) <strong>Connectivity</strong> - 
                  linking different network types and protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DeviceIntro;