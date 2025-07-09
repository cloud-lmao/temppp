import React, { useState, useEffect } from 'react';
import { Wifi, AlertTriangle, Users, Zap, Play, Pause, RotateCcw, BookOpen, FileText } from 'lucide-react';

interface HubDetailsProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const HubDetails: React.FC<HubDetailsProps> = ({ learningMode, isDarkMode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [collisionOccurred, setCollisionOccurred] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const hubSteps = [
    {
      id: 1,
      name: "Data Arrives",
      description: "Device sends data to hub",
      detail: "Hub receives electrical signal from one connected device",
      visual: "📨 Signal In",
      color: "blue",
      collision: false
    },
    {
      id: 2,
      name: "Signal Regeneration",
      description: "Hub amplifies the signal",
      detail: "Hub boosts signal strength to prevent degradation",
      visual: "🔊 Amplify",
      color: "green",
      collision: false
    },
    {
      id: 3,
      name: "Broadcast to All",
      description: "Send to every connected device",
      detail: "Hub sends the same signal to ALL ports simultaneously",
      visual: "📢 Broadcast",
      color: "purple",
      collision: false
    },
    {
      id: 4,
      name: "Collision Risk",
      description: "Multiple devices may transmit",
      detail: "If two devices send at once, signals collide and corrupt",
      visual: "💥 Collision!",
      color: "red",
      collision: true
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const next = (prev + 1) % hubSteps.length;
          
          // Simulate collision
          if (next === 3) {
            setCollisionOccurred(true);
          } else if (next === 0) {
            setCollisionOccurred(false);
          }
          
          return next;
        });
      }, 2500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const resetAnimation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setCollisionOccurred(false);
  };

  const getColorClasses = (color: string, isActive: boolean = false) => {
    if (isActive) {
      const colors = {
        blue: 'bg-blue-200 dark:bg-blue-300 text-gray-900 border-blue-400',
        green: 'bg-green-200 dark:bg-green-300 text-gray-900 border-green-400',
        purple: 'bg-purple-200 dark:bg-purple-300 text-gray-900 border-purple-400',
        red: 'bg-red-200 dark:bg-red-300 text-gray-900 border-red-400'
      };
      return colors[color as keyof typeof colors];
    } else {
      const colors = {
        blue: 'bg-blue-50 dark:bg-blue-900/20 text-gray-700 dark:text-gray-300 border-blue-200 dark:border-blue-700',
        green: 'bg-green-50 dark:bg-green-900/20 text-gray-700 dark:text-gray-300 border-green-200 dark:border-green-700',
        purple: 'bg-purple-50 dark:bg-purple-900/20 text-gray-700 dark:text-gray-300 border-purple-200 dark:border-purple-700',
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
        Hubs - The Old Network Bridge
      </h2>

      {/* Definition Panel */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        {learningMode === 'exam' && (
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-6 h-6 text-orange-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Network Hubs - Study Guide
            </h3>
          </div>
        )}

        {learningMode === 'visualize' ? (
          <div>
            <div className="text-center mb-6 sm:mb-8">
              <img 
                src="https://images.pexels.com/photos/2449452/pexels-photo-2449452.jpeg" 
                alt="Network hub concept"
                className="w-full h-32 sm:h-48 md:h-64 object-cover rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-lg"
              />
            </div>
            <h3 className="text-xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
              Like a Simple Megaphone
            </h3>
            <p className="text-base sm:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 text-center leading-relaxed px-2">
              A <Tooltip term="Network Hub" definition="Layer 1 device that repeats signals to all connected ports, creating a single collision domain" /> is like a simple megaphone that repeats everything to everyone. 
              When one person speaks into it, everyone connected hears the message - even if it wasn't meant for them!
            </p>
            
            {/* Hub Operation Animation */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h4 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                📢 Hub Broadcasting Process
              </h4>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause' : 'Start'} Hub Demo</span>
                </button>
                <button
                  onClick={resetAnimation}
                  className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                {hubSteps.map((step, index) => {
                  const isActive = currentStep === index;
                  
                  return (
                    <div
                      key={step.id}
                      className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-500 ${
                        isActive 
                          ? `${getColorClasses(step.color, true)} scale-105 shadow-lg ${step.collision ? 'animate-pulse' : ''}` 
                          : `${getColorClasses(step.color, false)}`
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg sm:text-2xl mb-2">{step.visual}</div>
                        <h5 className={`font-semibold mb-1 sm:mb-2 text-xs sm:text-sm ${
                          isActive ? 'text-gray-900' : 'text-gray-900 dark:text-white'
                        }`}>
                          {step.name}
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

              {/* Collision Warning */}
              {collisionOccurred && (
                <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-600 rounded-xl p-4 sm:p-6">
                  <div className="flex items-center justify-center mb-4">
                    <AlertTriangle className="w-8 h-8 sm:w-12 sm:h-12 text-red-600 animate-bounce" />
                  </div>
                  <h5 className="font-semibold text-red-900 dark:text-red-200 mb-2 text-center text-sm sm:text-base">
                    ⚠️ Collision Detected!
                  </h5>
                  <p className="text-xs sm:text-sm text-red-800 dark:text-red-300 text-center">
                    When multiple devices transmit simultaneously through a hub, their signals collide and become corrupted. 
                    This is why hubs are largely obsolete in modern networks.
                  </p>
                </div>
              )}
            </div>

            {/* Key Characteristics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Wifi className="w-8 h-8 sm:w-12 sm:h-12 text-orange-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Simple Repeater</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Just amplifies and repeats signals to all ports
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <AlertTriangle className="w-8 h-8 sm:w-12 sm:h-12 text-red-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Collision Domain</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  All ports share single collision domain
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Users className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Shared Bandwidth</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  All devices share total available bandwidth
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Zap className="w-8 h-8 sm:w-12 sm:h-12 text-gray-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Half Duplex</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Can only send OR receive at one time
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* EXAM MODE - Comprehensive Study Content */
          <div className="space-y-6 sm:space-y-8">
            {/* Core Definition */}
            <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-4 sm:p-6 border border-orange-200 dark:border-orange-700">
              <h4 className="text-lg sm:text-xl font-semibold text-orange-900 dark:text-orange-200 mb-3">
                📚 Technical Definition
              </h4>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                <strong>Network Hub:</strong> A Layer 1 (Physical) device that operates as a multiport repeater, 
                regenerating and broadcasting incoming signals to all connected ports. It creates a single collision 
                domain and broadcast domain for all connected devices, operating in half-duplex mode.
              </p>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <strong>Key Characteristic:</strong> Hubs are "dumb" devices with no intelligence - they simply 
                  repeat electrical signals without any processing or decision-making.
                </p>
              </div>
            </div>

            {/* Hub Operation */}
            <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 sm:p-6 border border-red-200 dark:border-red-700">
              <h4 className="text-lg sm:text-xl font-semibold text-red-900 dark:text-red-200 mb-4">
                ⚙️ Hub Operation and Limitations
              </h4>
              <div className="space-y-4">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    Signal Processing
                  </h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Receives electrical signal on one port</li>
                    <li>• Regenerates (amplifies) the signal</li>
                    <li>• Broadcasts to ALL other ports simultaneously</li>
                    <li>• No address learning or filtering</li>
                  </ul>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    Collision Domain Issues
                  </h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• All ports form single collision domain</li>
                    <li>• CSMA/CD required for media access control</li>
                    <li>• Collisions increase with more devices</li>
                    <li>• Performance degrades significantly under load</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Hub vs Modern Devices */}
            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-4 sm:p-6 border border-yellow-200 dark:border-yellow-700">
              <h4 className="text-lg sm:text-xl font-semibold text-yellow-900 dark:text-yellow-200 mb-4">
                📊 Why Hubs Became Obsolete
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Problems with Hubs:</h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>Security:</strong> All data visible to all devices</li>
                    <li>• <strong>Collisions:</strong> Performance degrades with usage</li>
                    <li>• <strong>Shared bandwidth:</strong> Total bandwidth divided among users</li>
                    <li>• <strong>Half-duplex:</strong> Cannot send and receive simultaneously</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Switch Advantages:</h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>Security:</strong> Unicast frames sent only to destination</li>
                    <li>• <strong>No collisions:</strong> Each port = separate collision domain</li>
                    <li>• <strong>Dedicated bandwidth:</strong> Full bandwidth per port</li>
                    <li>• <strong>Full-duplex:</strong> Simultaneous send/receive capability</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Historical Context */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="text-lg sm:text-xl font-semibold text-blue-900 dark:text-blue-200 mb-4">
                📜 Historical Context and Legacy
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">When Used</h6>
                  <p className="text-xs text-gray-600 dark:text-gray-400">1980s-1990s, early Ethernet networks</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">Replacement</h6>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Switches became affordable in late 1990s</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">Current Use</h6>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Mostly obsolete, some legacy systems</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">Learning Value</h6>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Understanding collision domains, CSMA/CD</p>
                </div>
              </div>
            </div>

            {/* Important Exam Points */}
            <div className="bg-gray-50 dark:bg-gray-900/30 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
                🎯 Important Exam Points
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Layer 1 operation:</strong> Physical layer device, no intelligence
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Single collision domain:</strong> All ports share one collision domain
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>CSMA/CD required:</strong> Carrier Sense Multiple Access with Collision Detection
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Obsolete technology:</strong> Replaced by switches for better performance and security
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
            <FileText className="w-6 h-6 text-orange-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Network Hubs - Exam Questions
            </h3>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-4 sm:p-6 border border-orange-200 dark:border-orange-700">
              <h4 className="font-semibold text-orange-900 dark:text-orange-200 mb-3 text-sm sm:text-base">
                Q1: Explain why hubs create collision domains and how this affects network performance.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Answer:</strong> Hubs operate at Layer 1 and simply repeat signals to all ports, creating 
                  a single collision domain. When multiple devices transmit simultaneously, their signals collide 
                  and become corrupted. This requires CSMA/CD protocol, increases retransmissions, and degrades 
                  performance as more devices are added. Bandwidth is shared among all connected devices.
                </p>
              </div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 sm:p-6 border border-red-200 dark:border-red-700">
              <h4 className="font-semibold text-red-900 dark:text-red-200 mb-3 text-sm sm:text-base">
                Q2: What are the security implications of using hubs in a network?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Answer:</strong> Hubs broadcast all data to every connected port, making all network 
                  traffic visible to all devices. This creates security vulnerabilities as any device can 
                  potentially intercept and read data intended for other devices. There's no traffic isolation 
                  or filtering, making network sniffing and eavesdropping trivial.
                </p>
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-4 sm:p-6 border border-yellow-200 dark:border-yellow-700">
              <h4 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-3 text-sm sm:text-base">
                Q3: Why were hubs replaced by switches in modern networks?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Answer:</strong> Switches provide: (1) <strong>Collision elimination</strong> - each port 
                  creates separate collision domain, (2) <strong>Security</strong> - unicast traffic sent only to 
                  intended recipient, (3) <strong>Full bandwidth</strong> - dedicated bandwidth per port, 
                  (4) <strong>Full-duplex</strong> - simultaneous send/receive, (5) <strong>Intelligence</strong> - 
                  MAC learning and filtering capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HubDetails;