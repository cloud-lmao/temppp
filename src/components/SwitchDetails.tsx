import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Shield, Users, Play, Pause, RotateCcw, BookOpen, FileText, ArrowRight } from 'lucide-react';

interface SwitchDetailsProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const SwitchDetails: React.FC<SwitchDetailsProps> = ({ learningMode, isDarkMode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [macTable, setMacTable] = useState<{[key: string]: string}>({});
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const switchingSteps = [
    {
      id: 1,
      name: "Frame Arrives",
      description: "Data frame enters switch port",
      detail: "Switch receives frame and examines source MAC address",
      visual: "📨 Frame In",
      color: "blue",
      macAction: "Learn source MAC"
    },
    {
      id: 2,
      name: "MAC Learning",
      description: "Switch learns device location",
      detail: "Source MAC address is stored with port number in MAC table",
      visual: "🧠 Learning",
      color: "green",
      macAction: "Store in table"
    },
    {
      id: 3,
      name: "Destination Lookup",
      description: "Check destination MAC in table",
      detail: "Switch looks up destination MAC address in its table",
      visual: "🔍 Lookup",
      color: "purple",
      macAction: "Search table"
    },
    {
      id: 4,
      name: "Forward Decision",
      description: "Send frame to correct port",
      detail: "Frame forwarded to specific port or flooded if unknown",
      visual: "📤 Forward",
      color: "orange",
      macAction: "Send to port"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const next = (prev + 1) % switchingSteps.length;
          
          // Simulate MAC learning
          if (next === 1) {
            setMacTable(prev => ({
              ...prev,
              'AA:BB:CC:DD:EE:01': 'Port 1',
              'AA:BB:CC:DD:EE:02': 'Port 2'
            }));
          }
          
          return next;
        });
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const resetAnimation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setMacTable({});
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
        Switches - Smart Traffic Controllers
      </h2>

      {/* Definition Panel */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        {learningMode === 'exam' && (
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-6 h-6 text-green-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Network Switches - Study Guide
            </h3>
          </div>
        )}

        {learningMode === 'visualize' ? (
          <div>
            <div className="text-center mb-6 sm:mb-8">
              <img 
                src="https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg" 
                alt="Network switch"
                className="w-full h-32 sm:h-48 md:h-64 object-cover rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-lg"
              />
            </div>
            <h3 className="text-xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
              Like a Smart Postal Worker
            </h3>
            <p className="text-base sm:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 text-center leading-relaxed px-2">
              A <Tooltip term="Network Switch" definition="Layer 2 device that forwards frames based on MAC addresses and learns device locations" /> is like a smart postal worker who remembers where everyone lives. 
              Unlike a hub that sends mail to everyone, a switch learns addresses and delivers mail directly to the right person.
            </p>
            
            {/* Switch Operation Animation */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h4 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                🔀 Switch Learning Process
              </h4>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause' : 'Start'} Learning</span>
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
                {switchingSteps.map((step, index) => {
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

              {/* MAC Address Table */}
              {Object.keys(macTable).length > 0 && (
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 sm:p-6">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-4 text-center text-sm sm:text-base">
                    📋 MAC Address Table
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-600">
                          <th className="text-left py-2 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">MAC Address</th>
                          <th className="text-left py-2 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">Port</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(macTable).map(([mac, port]) => (
                          <tr key={mac} className="border-b border-gray-100 dark:border-gray-700">
                            <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-mono">{mac}</td>
                            <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{port}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Cpu className="w-8 h-8 sm:w-12 sm:h-12 text-green-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">MAC Learning</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Automatically learns and remembers device locations
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Zap className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Full Duplex</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Simultaneous sending and receiving on each port
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Collision Domains</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Each port creates separate collision domain
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Users className="w-8 h-8 sm:w-12 sm:h-12 text-orange-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Multiple Devices</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Connects many devices efficiently in a LAN
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
                <strong>Network Switch:</strong> A Layer 2 (Data Link) device that forwards Ethernet frames based on 
                MAC addresses. It maintains a MAC address table to learn device locations and creates separate 
                collision domains for each port while maintaining a single broadcast domain.
              </p>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <strong>Key Characteristic:</strong> Switches operate in store-and-forward mode, examining 
                  each frame completely before forwarding to eliminate collisions.
                </p>
              </div>
            </div>

            {/* Switch Operation Process */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="text-lg sm:text-xl font-semibold text-blue-900 dark:text-blue-200 mb-4">
                🔄 Switch Operation Process
              </h4>
              <div className="space-y-4">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    1. Frame Reception and Learning
                  </h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Frame arrives at switch port</li>
                    <li>• Source MAC address extracted and learned</li>
                    <li>• MAC address associated with incoming port</li>
                    <li>• Entry added/updated in MAC address table</li>
                  </ul>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    2. Destination Lookup and Forwarding
                  </h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Destination MAC address examined</li>
                    <li>• MAC table searched for destination</li>
                    <li>• If found: forward to specific port (unicast)</li>
                    <li>• If not found: flood to all ports except source (unknown unicast)</li>
                    <li>• Broadcast/multicast: flood to all ports except source</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Switch Types */}
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="text-lg sm:text-xl font-semibold text-purple-900 dark:text-purple-200 mb-4">
                🔧 Types of Switches
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">By Management:</h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>Unmanaged:</strong> Plug-and-play, no configuration</li>
                    <li>• <strong>Managed:</strong> Configurable, VLAN support, monitoring</li>
                    <li>• <strong>Smart/Web-managed:</strong> Basic management features</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">By Functionality:</h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>Layer 2:</strong> MAC-based switching only</li>
                    <li>• <strong>Layer 3:</strong> Routing + switching capabilities</li>
                    <li>• <strong>Multilayer:</strong> Layer 2-7 processing</li>
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
                    <span><strong>Collision elimination:</strong> Each port = separate collision domain</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Full bandwidth:</strong> Dedicated bandwidth per port</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Auto-learning:</strong> No manual configuration needed</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Full-duplex:</strong> Simultaneous send/receive</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 sm:p-6 border border-red-200 dark:border-red-700">
                <h4 className="text-lg sm:text-xl font-semibold text-red-900 dark:text-red-200 mb-4">
                  ❌ Limitations
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Single broadcast domain:</strong> Broadcasts flood entire network</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>No routing:</strong> Cannot connect different networks</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Switching loops:</strong> Can cause broadcast storms</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>MAC table limits:</strong> Finite learning capacity</span>
                  </li>
                </ul>
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
                    <strong>Layer 2 operation:</strong> Uses MAC addresses for forwarding decisions
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Learning process:</strong> Builds MAC table dynamically from source addresses
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Collision domains:</strong> Each port creates separate collision domain
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Forwarding modes:</strong> Store-and-forward, cut-through, fragment-free
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
              Network Switches - Exam Questions
            </h3>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3 text-sm sm:text-base">
                Q1: Explain the MAC address learning process in switches.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Answer:</strong> When a frame arrives, switch examines source MAC address and associates 
                  it with the incoming port in MAC address table. For forwarding, switch looks up destination MAC: 
                  if found, forwards to specific port (unicast); if not found, floods to all ports except source 
                  (unknown unicast). Broadcast/multicast frames are flooded to all ports except source.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 text-sm sm:text-base">
                Q2: How do switches eliminate collisions compared to hubs?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Answer:</strong> Hubs create single collision domain for all ports, causing collisions 
                  when multiple devices transmit simultaneously. Switches create separate collision domain for 
                  each port, enabling full-duplex communication and eliminating collisions. Each port gets 
                  dedicated bandwidth instead of shared bandwidth.
                </p>
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 text-sm sm:text-base">
                Q3: What are the different switch forwarding modes and their characteristics?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Store-and-forward:</strong> Receives entire frame, checks for errors, then forwards. 
                  Highest latency, best error detection. <strong>Cut-through:</strong> Forwards after reading 
                  destination MAC. Lowest latency, no error checking. <strong>Fragment-free:</strong> Forwards 
                  after 64 bytes. Compromise between latency and error detection.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SwitchDetails;