import React, { useState, useEffect } from 'react';
import { Package, Route, Shuffle, Zap, Play, Pause, RotateCcw, BookOpen, FileText, ArrowRight } from 'lucide-react';

interface PacketSwitchingProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const PacketSwitching: React.FC<PacketSwitchingProps> = ({ learningMode, isDarkMode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [packetData, setPacketData] = useState<{id: number, path: string, delay: number}[]>([]);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const packetSteps = [
    {
      id: 1,
      name: "Message Breakdown",
      description: "Split message into small packets",
      detail: "Each packet gets a sequence number and destination address",
      visual: "📄➡️📦📦📦",
      color: "blue"
    },
    {
      id: 2,
      name: "Independent Routing",
      description: "Each packet finds its own path",
      detail: "Packets may take different routes based on network conditions",
      visual: "📦🛤️📦🛣️📦🛤️",
      color: "green"
    },
    {
      id: 3,
      name: "Packet Forwarding",
      description: "Routers forward packets hop by hop",
      detail: "Each router makes independent routing decisions",
      visual: "🔄📦🔄📦🔄",
      color: "purple"
    },
    {
      id: 4,
      name: "Reassembly",
      description: "Packets reassembled at destination",
      detail: "Packets may arrive out of order and need reordering",
      visual: "📦📦📦➡️📄",
      color: "orange"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const next = (prev + 1) % packetSteps.length;
          
          // Generate packet data for visualization
          if (next === 1) {
            const packets = [
              { id: 1, path: "Route A", delay: Math.random() * 100 + 50 },
              { id: 2, path: "Route B", delay: Math.random() * 100 + 50 },
              { id: 3, path: "Route A", delay: Math.random() * 100 + 50 },
              { id: 4, path: "Route C", delay: Math.random() * 100 + 50 }
            ];
            setPacketData(packets);
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
    setPacketData([]);
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
        Packet Switching
      </h2>

      {/* Definition Panel */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        {learningMode === 'exam' && (
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Packet Switching - Study Guide
            </h3>
          </div>
        )}

        {learningMode === 'visualize' ? (
          <div>
            <div className="text-center mb-6 sm:mb-8">
              <img 
                src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg" 
                alt="Data packets"
                className="w-full h-32 sm:h-48 md:h-64 object-cover rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-lg"
              />
            </div>
            <h3 className="text-xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
              Like Sending a Puzzle by Mail
            </h3>
            <p className="text-base sm:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 text-center leading-relaxed px-2">
              <Tooltip term="Packet Switching" definition="A switching method where data is broken into small packets that are sent independently through the network" /> is like mailing a jigsaw puzzle. 
              You break the puzzle into pieces, mail each piece separately, and reassemble them at the destination.
            </p>
            
            {/* Packet Journey Simulation */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h4 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                📦 Packet Journey Simulation
              </h4>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause' : 'Start'} Transmission</span>
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
                {packetSteps.map((step, index) => {
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

              {/* Packet Race Visualization */}
              {packetData.length > 0 && currentStep >= 1 && (
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 sm:p-6">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-4 text-center text-sm sm:text-base">
                    📊 Packet Race - Different Routes, Different Delays
                  </h5>
                  <div className="space-y-3">
                    {packetData.map((packet) => (
                      <div key={packet.id} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {packet.id}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-700 dark:text-gray-300">{packet.path}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{packet.delay.toFixed(0)}ms</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${Math.min(100, (packet.delay / 150) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Package className="w-8 h-8 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Data Packets</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Message broken into small, independent packets
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Route className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Multiple Paths</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Each packet can take different routes to destination
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Zap className="w-8 h-8 sm:w-12 sm:h-12 text-green-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Efficient Use</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Network resources shared among multiple users
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Shuffle className="w-8 h-8 sm:w-12 sm:h-12 text-orange-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Reordering Needed</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Packets may arrive out of order and need reassembly
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* EXAM MODE - Comprehensive Study Content */
          <div className="space-y-6 sm:space-y-8">
            {/* Core Definition */}
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="text-lg sm:text-xl font-semibold text-purple-900 dark:text-purple-200 mb-3">
                📚 Technical Definition
              </h4>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                <strong>Packet Switching:</strong> A switching method where data is divided into small units called 
                packets, each containing addressing information. Packets are transmitted independently through the 
                network and may take different paths to reach the destination.
              </p>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <strong>Key Characteristic:</strong> Connectionless service where each packet is treated 
                  independently and routed based on current network conditions.
                </p>
              </div>
            </div>

            {/* Packet Structure */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="text-lg sm:text-xl font-semibold text-blue-900 dark:text-blue-200 mb-4">
                📦 Packet Structure and Components
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    Packet Header Information:
                  </h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>Source Address:</strong> Sender's network address</li>
                    <li>• <strong>Destination Address:</strong> Receiver's network address</li>
                    <li>• <strong>Sequence Number:</strong> For packet ordering</li>
                    <li>• <strong>Packet Length:</strong> Size of data payload</li>
                    <li>• <strong>Protocol Type:</strong> Upper layer protocol</li>
                    <li>• <strong>TTL/Hop Limit:</strong> Maximum hops allowed</li>
                  </ul>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    Packet Processing:
                  </h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>Fragmentation:</strong> Breaking large messages</li>
                    <li>• <strong>Routing:</strong> Path determination at each hop</li>
                    <li>• <strong>Queuing:</strong> Buffering at intermediate nodes</li>
                    <li>• <strong>Forwarding:</strong> Sending to next hop</li>
                    <li>• <strong>Reassembly:</strong> Reconstructing at destination</li>
                    <li>• <strong>Error Handling:</strong> Detecting and managing errors</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Types of Packet Switching */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="text-lg sm:text-xl font-semibold text-green-900 dark:text-green-200 mb-4">
                🔄 Types of Packet Switching
              </h4>
              <div className="space-y-4">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    1. Datagram Packet Switching
                  </h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Each packet treated independently (connectionless)</li>
                    <li>• Packets may take different routes</li>
                    <li>• No guaranteed delivery order</li>
                    <li>• Used in Internet Protocol (IP)</li>
                    <li>• More flexible but requires packet reordering</li>
                  </ul>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    2. Virtual Circuit Packet Switching
                  </h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Logical connection established before transmission</li>
                    <li>• All packets follow same path</li>
                    <li>• Guaranteed delivery order</li>
                    <li>• Used in ATM, Frame Relay, MPLS</li>
                    <li>• Combines benefits of circuit and packet switching</li>
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
                    <span><strong>Efficient bandwidth use:</strong> Resources shared dynamically</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>No setup delay:</strong> Immediate transmission possible</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Fault tolerance:</strong> Alternative paths available</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Scalable:</strong> Supports varying traffic patterns</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Cost effective:</strong> Shared infrastructure</span>
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
                    <span><strong>Variable delay:</strong> Unpredictable transmission time</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Packet loss:</strong> Possible during congestion</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Out-of-order delivery:</strong> Requires reordering</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Processing overhead:</strong> Header processing at each hop</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span><strong>Complex protocols:</strong> Error detection and correction needed</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Applications and Examples */}
            <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-4 sm:p-6 border border-orange-200 dark:border-orange-700">
              <h4 className="text-lg sm:text-xl font-semibold text-orange-900 dark:text-orange-200 mb-4">
                🌐 Applications and Examples
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Internet Applications:</h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>Web browsing:</strong> HTTP/HTTPS traffic</li>
                    <li>• <strong>Email:</strong> SMTP, POP3, IMAP</li>
                    <li>• <strong>File transfer:</strong> FTP, SFTP</li>
                    <li>• <strong>Video streaming:</strong> YouTube, Netflix</li>
                    <li>• <strong>Social media:</strong> Facebook, Twitter</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Network Technologies:</h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>Internet Protocol (IP):</strong> Datagram switching</li>
                    <li>• <strong>Ethernet:</strong> Frame switching</li>
                    <li>• <strong>MPLS:</strong> Label switching</li>
                    <li>• <strong>ATM:</strong> Cell switching</li>
                    <li>• <strong>Frame Relay:</strong> Virtual circuits</li>
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
                    <strong>Connectionless service:</strong> No circuit establishment required
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Statistical multiplexing:</strong> Bandwidth shared based on demand
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Store-and-forward:</strong> Packets buffered at intermediate nodes
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Best-effort delivery:</strong> No guarantees on delivery or timing
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
              Packet Switching - Exam Questions
            </h3>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 text-sm sm:text-base">
                Q1: Explain the packet switching process and its key characteristics.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Answer:</strong> Data is divided into packets with headers containing addressing information. 
                  Each packet is routed independently through the network using store-and-forward mechanism. 
                  Key characteristics: connectionless, statistical multiplexing, variable delay, efficient bandwidth use.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 text-sm sm:text-base">
                Q2: Compare datagram and virtual circuit packet switching.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Datagram:</strong> Connectionless, each packet routed independently, packets may arrive 
                  out of order, used in IP. <strong>Virtual Circuit:</strong> Connection-oriented, all packets 
                  follow same path, guaranteed order, used in ATM/Frame Relay.
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3 text-sm sm:text-base">
                Q3: What are the advantages of packet switching over circuit switching for data networks?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Advantages:</strong> Efficient bandwidth utilization through statistical multiplexing, 
                  no setup delay, fault tolerance with alternative paths, cost-effective shared infrastructure, 
                  better suited for bursty data traffic patterns.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PacketSwitching;