import React, { useState, useEffect } from 'react';
import { Send, Package, Route, Wifi, Monitor, Play, Pause, RotateCcw, MessageCircle, BookOpen, FileText } from 'lucide-react';

interface CommunicationLabProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const CommunicationLab: React.FC<CommunicationLabProps> = ({ learningMode, isDarkMode }) => {
  const [message, setMessage] = useState('Hello, World!');
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [packetData, setPacketData] = useState<{[key: number]: string}>({});

  const communicationSteps = [
    {
      layer: 4,
      name: 'Application Layer',
      icon: Monitor,
      color: 'blue',
      action: 'Create Message',
      description: 'User types message in WhatsApp',
      header: 'WhatsApp Header',
      data: message,
      visual: '📱 User Interface',
      examDetails: {
        process: 'Data creation and formatting',
        protocols: 'HTTP, SMTP, FTP',
        dataUnit: 'Data/Message'
      }
    },
    {
      layer: 3,
      name: 'Transport Layer',
      icon: Package,
      color: 'green',
      action: 'Add Reliability',
      description: 'TCP ensures reliable delivery',
      header: 'TCP Header (Port, Sequence)',
      data: `TCP: ${message}`,
      visual: '📦 Packaging for Delivery',
      examDetails: {
        process: 'Segmentation and reliability',
        protocols: 'TCP, UDP',
        dataUnit: 'Segment/Datagram'
      }
    },
    {
      layer: 2,
      name: 'Internet Layer',
      icon: Route,
      color: 'purple',
      action: 'Add Addressing',
      description: 'IP adds source and destination addresses',
      header: 'IP Header (Source IP, Dest IP)',
      data: `IP: TCP: ${message}`,
      visual: '🗺️ Adding Address Labels',
      examDetails: {
        process: 'Routing and logical addressing',
        protocols: 'IP, ICMP, ARP',
        dataUnit: 'Packet'
      }
    },
    {
      layer: 1,
      name: 'Network Access',
      icon: Wifi,
      color: 'orange',
      action: 'Physical Transmission',
      description: 'WiFi converts to radio waves',
      header: 'WiFi Header (MAC addresses)',
      data: `WiFi: IP: TCP: ${message}`,
      visual: '📡 Radio Wave Transmission',
      examDetails: {
        process: 'Frame formatting and physical transmission',
        protocols: 'Ethernet, WiFi, PPP',
        dataUnit: 'Frame/Bits'
      }
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const next = (prev + 1) % communicationSteps.length;
          return next;
        });
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const startSimulation = () => {
    setCurrentStep(0);
    setIsPlaying(true);
    // Initialize packet data
    const initialData: {[key: number]: string} = {};
    communicationSteps.forEach((step, index) => {
      initialData[step.layer] = step.data;
    });
    setPacketData(initialData);
  };

  const pauseSimulation = () => {
    setIsPlaying(false);
  };

  const resetSimulation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setPacketData({});
  };

  const getColorClasses = (color: string, isActive: boolean = false) => {
    const intensity = isActive ? '500' : '100';
    const darkIntensity = isActive ? '400' : '900/30';
    
    const colors = {
      blue: `bg-blue-${intensity} dark:bg-blue-${darkIntensity}`,
      green: `bg-green-${intensity} dark:bg-green-${darkIntensity}`,
      purple: `bg-purple-${intensity} dark:bg-purple-${darkIntensity}`,
      orange: `bg-orange-${intensity} dark:bg-orange-${darkIntensity}`
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="mb-12 sm:mb-20">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12 text-center px-4">
        {learningMode === 'visualize' ? '🧪 Communication Lab' : '📚 Data Encapsulation Process'}
      </h2>

      {/* Main Content */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        {learningMode === 'exam' && (
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Encapsulation & Decapsulation Study Guide
            </h3>
          </div>
        )}

        {learningMode === 'visualize' ? (
          <>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
              Send a Message Through the Network Stack
            </h3>
            
            <div className="max-w-md mx-auto mb-4 sm:mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Message:
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base"
                  placeholder="Type your message..."
                />
                <button
                  onClick={startSimulation}
                  disabled={!message.trim()}
                  className="px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-8">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={!packetData[4]}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors text-sm sm:text-base"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              <button
                onClick={resetSimulation}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm sm:text-base"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </>
        ) : (
          /* EXAM MODE - Theoretical Content */
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="text-lg sm:text-xl font-semibold text-blue-900 dark:text-blue-200 mb-4">
                📦 What is Encapsulation?
              </h4>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                <strong>Encapsulation</strong> is the process where each layer adds its own header (and sometimes trailer) 
                to the data received from the layer above. This creates a nested structure like Russian dolls, 
                where each layer wraps the data with its own control information.
              </p>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <strong>Key Point:</strong> Each layer only adds its header and passes the entire package down. 
                  It doesn't modify the data from upper layers.
                </p>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="text-lg sm:text-xl font-semibold text-green-900 dark:text-green-200 mb-4">
                📤 Decapsulation Process
              </h4>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                <strong>Decapsulation</strong> is the reverse process at the receiving end. Each layer removes its 
                own header and passes the remaining data up to the next layer. This continues until the original 
                data reaches the application layer.
              </p>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <strong>Important:</strong> Each layer only processes its own header and ignores headers 
                  from other layers.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Layer Visualization */}
        <div className="space-y-3 sm:space-y-4">
          {communicationSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === index && isPlaying;
            const hasData = packetData[step.layer];
            
            return (
              <div
                key={step.layer}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-500 ${
                  isActive 
                    ? `${getColorClasses(step.color, true)} border-gray-400 dark:border-gray-500 shadow-lg scale-102` 
                    : hasData || learningMode === 'exam'
                    ? `${getColorClasses(step.color)} border-gray-300 dark:border-gray-600 shadow-md`
                    : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
                }`}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-white/30' : hasData || learningMode === 'exam' ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-600'
                    }`}>
                      <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${
                        isActive || hasData || learningMode === 'exam' ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'
                      }`} />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="mb-2 sm:mb-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                          Layer {step.layer}: {step.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                          {step.description}
                        </p>
                      </div>
                      
                      {isActive && learningMode === 'visualize' && (
                        <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/20 px-2 py-1 rounded">
                          {step.visual}
                        </div>
                      )}
                    </div>
                    
                    {learningMode === 'exam' && (
                      <div className="mt-3 bg-white/50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">Process:</span>
                            <div className="text-gray-600 dark:text-gray-400">{step.examDetails.process}</div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">Protocols:</span>
                            <div className="text-gray-600 dark:text-gray-400">{step.examDetails.protocols}</div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">Data Unit:</span>
                            <div className="text-gray-600 dark:text-gray-400">{step.examDetails.dataUnit}</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {hasData && learningMode === 'visualize' && (
                      <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg">
                        <div className="text-xs sm:text-sm">
                          <div className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                            {step.header}
                          </div>
                          <div className="font-mono text-gray-600 dark:text-gray-400 break-all">
                            {packetData[step.layer]}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Current Step Indicator - Visualize Mode Only */}
        {isPlaying && learningMode === 'visualize' && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-700">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              <div>
                <p className="font-semibold text-blue-900 dark:text-blue-200 text-sm sm:text-base">
                  Current Action: {communicationSteps[currentStep]?.action}
                </p>
                <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                  {communicationSteps[currentStep]?.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-indigo-200 dark:border-indigo-700 mx-2 sm:mx-0">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
          {learningMode === 'visualize' ? '🔍 Key Insights' : '📋 Exam Key Points'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 sm:p-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">
              📦 Encapsulation Process
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {learningMode === 'visualize' 
                ? 'Each layer adds its own header to the data, like putting a letter in multiple envelopes. This process is called encapsulation.'
                : 'Data moves down the stack: Application data → Segments → Packets → Frames → Bits. Each layer adds control information without modifying upper layer data.'
              }
            </p>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 sm:p-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">
              🎯 Layer Independence
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {learningMode === 'visualize'
                ? 'Each layer only cares about its own job. The Application layer doesn\'t need to know about WiFi details - that\'s handled by lower layers.'
                : 'Each layer provides services to the layer above and uses services from the layer below. Changes in one layer don\'t affect others if interfaces remain constant.'
              }
            </p>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 sm:p-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">
              🔄 Reverse Process
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {learningMode === 'visualize'
                ? 'At the destination, the process reverses. Each layer removes its header and passes the data up. This is called decapsulation.'
                : 'Decapsulation occurs at the receiver: Bits → Frames → Packets → Segments → Data. Each layer processes only its own header and passes data upward.'
              }
            </p>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 sm:p-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">
              🌐 Universal Standard
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {learningMode === 'visualize'
                ? 'This layered approach works for all network communication - from simple text messages to complex video streams. It\'s the foundation of the internet!'
                : 'Layered architecture enables interoperability between different vendors and technologies. Standard interfaces allow mixing and matching of protocols and implementations.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Exam Mode Study Questions */}
      {learningMode === 'exam' && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0 mt-8">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Encapsulation - Exam Questions
            </h3>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 text-sm sm:text-base">
                Q1: Describe the encapsulation process as data moves down the TCP/IP stack.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Answer:</strong> Application layer creates data → Transport layer adds TCP/UDP header (creates segment/datagram) → 
                  Internet layer adds IP header (creates packet) → Network Access layer adds frame header and trailer (creates frame) → 
                  Physical transmission as bits.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 text-sm sm:text-base">
                Q2: What information is typically included in each layer's header?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Answer:</strong> Application: Application-specific data. Transport: Port numbers, sequence numbers, flags. 
                  Internet: Source/destination IP addresses, TTL, protocol type. Network Access: Source/destination MAC addresses, 
                  frame type, error detection codes.
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3 text-sm sm:text-base">
                Q3: Why is the layered approach with encapsulation beneficial for network design?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Answer:</strong> Enables modularity (each layer has specific function), abstraction (hides complexity), 
                  interoperability (standard interfaces), maintainability (easy to update individual layers), and scalability 
                  (add new protocols without affecting others).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CommunicationLab;