import React, { useState } from 'react';
import { Monitor, Shield, Route, Package, Wifi, Cable, Zap, ChevronDown, ChevronUp, BookOpen, FileText } from 'lucide-react';

interface OSIModelProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const OSIModel: React.FC<OSIModelProps> = ({ learningMode, isDarkMode }) => {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const [draggedProtocol, setDraggedProtocol] = useState<string | null>(null);
  const [droppedProtocols, setDroppedProtocols] = useState<{[key: number]: string[]}>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedProtocolForMobile, setSelectedProtocolForMobile] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const osiLayers = [
    {
      number: 7,
      name: 'Application',
      description: learningMode === 'visualize' 
        ? 'Where you interact - like opening WhatsApp or Chrome browser'
        : 'Provides network services directly to end-users and applications. Handles user interface, authentication, and data formatting for applications.',
      examples: ['HTTP', 'HTTPS', 'FTP', 'SMTP', 'DNS', 'Telnet', 'SSH'],
      protocols: ['HTTP', 'HTTPS', 'FTP', 'SMTP'],
      icon: Monitor,
      color: 'red',
      realWorld: 'Using apps on your phone',
      examDetails: {
        functions: ['User interface', 'Authentication', 'Data formatting', 'Application services'],
        devices: ['Web browsers', 'Email clients', 'FTP clients'],
        dataUnit: 'Data/Message'
      }
    },
    {
      number: 6,
      name: 'Presentation',
      description: learningMode === 'visualize'
        ? 'Translates and encrypts data - like converting languages'
        : 'Handles data encryption, compression, translation, and format conversion. Ensures data from sender application layer can be read by receiver application layer.',
      examples: ['SSL/TLS', 'JPEG', 'GIF', 'ASCII', 'MPEG'],
      protocols: ['SSL', 'TLS'],
      icon: Shield,
      color: 'orange',
      realWorld: 'Encrypting your passwords',
      examDetails: {
        functions: ['Encryption/Decryption', 'Compression', 'Data translation', 'Format conversion'],
        devices: ['Encryption devices', 'Compression software'],
        dataUnit: 'Data/Message'
      }
    },
    {
      number: 5,
      name: 'Session',
      description: learningMode === 'visualize'
        ? 'Manages conversations - like keeping track of your video call'
        : 'Establishes, manages, and terminates connections between applications. Controls dialogues and keeps track of whose turn it is to transmit.',
      examples: ['NetBIOS', 'RPC', 'SQL', 'NFS'],
      protocols: ['NetBIOS', 'RPC'],
      icon: Package,
      color: 'yellow',
      realWorld: 'Maintaining your login session',
      examDetails: {
        functions: ['Session establishment', 'Session management', 'Session termination', 'Dialogue control'],
        devices: ['Session management software'],
        dataUnit: 'Data/Message'
      }
    },
    {
      number: 4,
      name: 'Transport',
      description: learningMode === 'visualize'
        ? 'Ensures reliable delivery - like a postal service with tracking'
        : 'Provides reliable data transfer, error recovery, flow control, and segmentation. Ensures complete data transfer between end systems.',
      examples: ['TCP', 'UDP', 'SPX'],
      protocols: ['TCP', 'UDP'],
      icon: Package,
      color: 'green',
      realWorld: 'Making sure all your message parts arrive',
      examDetails: {
        functions: ['Segmentation', 'Error recovery', 'Flow control', 'Connection management'],
        devices: ['Gateways', 'Firewalls'],
        dataUnit: 'Segment (TCP) / Datagram (UDP)'
      }
    },
    {
      number: 3,
      name: 'Network',
      description: learningMode === 'visualize'
        ? 'Finds the best path - like GPS navigation for data'
        : 'Handles routing, logical addressing, and path determination across multiple networks. Responsible for packet forwarding and internetworking.',
      examples: ['IP', 'ICMP', 'OSPF', 'BGP', 'RIP'],
      protocols: ['IP', 'ICMP'],
      icon: Route,
      color: 'blue',
      realWorld: 'Finding route from your house to friend\'s house',
      examDetails: {
        functions: ['Routing', 'Logical addressing', 'Path determination', 'Packet forwarding'],
        devices: ['Routers', 'Layer 3 switches'],
        dataUnit: 'Packet'
      }
    },
    {
      number: 2,
      name: 'Data Link',
      description: learningMode === 'visualize'
        ? 'Local delivery - like your neighborhood postal worker'
        : 'Provides node-to-node delivery, error detection/correction, and frame synchronization. Handles physical addressing and media access control.',
      examples: ['Ethernet', 'WiFi', 'PPP', 'Frame Relay'],
      protocols: ['Ethernet', 'WiFi'],
      icon: Wifi,
      color: 'indigo',
      realWorld: 'Your WiFi connection to router',
      examDetails: {
        functions: ['Framing', 'Physical addressing', 'Error detection', 'Flow control'],
        devices: ['Switches', 'Bridges', 'NICs'],
        dataUnit: 'Frame'
      }
    },
    {
      number: 1,
      name: 'Physical',
      description: learningMode === 'visualize'
        ? 'The actual wires and signals - like roads and vehicles'
        : 'Defines electrical, mechanical, and procedural specifications for physical transmission. Handles bit transmission over physical medium.',
      examples: ['Cables', 'Radio waves', 'Fiber optic', 'Electrical signals'],
      protocols: ['Cables', 'Radio'],
      icon: Cable,
      color: 'purple',
      realWorld: 'The actual WiFi radio waves',
      examDetails: {
        functions: ['Bit transmission', 'Physical topology', 'Electrical specifications', 'Mechanical specifications'],
        devices: ['Hubs', 'Repeaters', 'Cables', 'Connectors'],
        dataUnit: 'Bits'
      }
    }
  ];

  const protocolsToMatch = ['HTTP', 'TCP', 'IP', 'Ethernet', 'SSL', 'UDP', 'WiFi', 'SMTP'];

  const getColorClasses = (color: string, isSelected: boolean = false) => {
    const intensity = isSelected ? '500' : '100';
    const darkIntensity = isSelected ? '400' : '900/30';
    
    const colors = {
      red: `bg-red-${intensity} dark:bg-red-${darkIntensity}`,
      orange: `bg-orange-${intensity} dark:bg-orange-${darkIntensity}`,
      yellow: `bg-yellow-${intensity} dark:bg-yellow-${darkIntensity}`,
      green: `bg-green-${intensity} dark:bg-green-${darkIntensity}`,
      blue: `bg-blue-${intensity} dark:bg-blue-${darkIntensity}`,
      indigo: `bg-indigo-${intensity} dark:bg-indigo-${darkIntensity}`,
      purple: `bg-purple-${intensity} dark:bg-purple-${darkIntensity}`
    };
    return colors[color as keyof typeof colors];
  };

  const handleDrop = (layerNumber: number, protocol: string) => {
    setDroppedProtocols(prev => ({
      ...prev,
      [layerNumber]: [...(prev[layerNumber] || []), protocol]
    }));
  };

  // Mobile-specific protocol selection
  const handleMobileProtocolSelect = (protocol: string) => {
    setSelectedProtocolForMobile(protocol);
  };

  // Mobile-specific layer selection for dropping
  const handleMobileLayerSelect = (layerNumber: number) => {
    if (selectedProtocolForMobile) {
      handleDrop(layerNumber, selectedProtocolForMobile);
      setSelectedProtocolForMobile(null);
    }
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const resetDragDrop = () => {
    setDroppedProtocols({});
    setShowResults(false);
    setSelectedProtocolForMobile(null);
  };

  const isCorrectProtocol = (layerNumber: number, protocol: string) => {
    const layer = osiLayers.find(l => l.number === layerNumber);
    return layer?.protocols.includes(protocol) || false;
  };

  return (
    <section className="mb-12 sm:mb-20">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12 text-center px-4">
        OSI Model - 7 Layers
      </h2>

      {/* OSI Layer Stack */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        {learningMode === 'exam' && (
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              OSI Reference Model - Complete Study Guide
            </h3>
          </div>
        )}

        <div className="space-y-2 sm:space-y-3">
          {osiLayers.map((layer) => {
            const Icon = layer.icon;
            const isSelected = selectedLayer === layer.number;
            
            return (
              <div key={layer.number} className="relative">
                <div
                  className={`p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? `${getColorClasses(layer.color, true)} border-gray-400 dark:border-gray-500 shadow-lg scale-102` 
                      : `${getColorClasses(layer.color)} border-gray-200 dark:border-gray-600 hover:shadow-md`
                  } ${
                    learningMode === 'visualize' && selectedProtocolForMobile && isMobile
                      ? 'ring-2 ring-blue-400 ring-opacity-50'
                      : ''
                  }`}
                  onClick={() => {
                    if (learningMode === 'visualize' && selectedProtocolForMobile && isMobile) {
                      handleMobileLayerSelect(layer.number);
                    } else {
                      setSelectedLayer(isSelected ? null : layer.number);
                    }
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (draggedProtocol && learningMode === 'visualize') {
                      handleDrop(layer.number, draggedProtocol);
                      setDraggedProtocol(null);
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <span className="font-bold text-gray-800 dark:text-white text-sm sm:text-base">
                            {layer.number}
                          </span>
                        </div>
                      </div>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-lg truncate">
                          {layer.name} Layer
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                          {layer.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-2">
                      {learningMode === 'visualize' && selectedProtocolForMobile && isMobile ? (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">+</span>
                        </div>
                      ) : isSelected ? (
                        <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
                      ) : (
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
                      )}
                    </div>
                  </div>

                  {/* Dropped Protocols Display - Only in Visualize Mode */}
                  {learningMode === 'visualize' && droppedProtocols[layer.number] && droppedProtocols[layer.number].length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {droppedProtocols[layer.number].map((protocol, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            showResults
                              ? isCorrectProtocol(layer.number, protocol)
                                ? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200'
                                : 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200'
                              : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                          }`}
                        >
                          {protocol}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Expanded Layer Details */}
                {isSelected && (
                  <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-600">
                    {learningMode === 'visualize' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                            Real-world Example:
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                            {layer.realWorld}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                            Common Protocols:
                          </h4>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {layer.examples.slice(0, 3).map((example, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded text-xs"
                              >
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* EXAM MODE - Detailed Information */
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                              Primary Functions:
                            </h4>
                            <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-1">
                              {layer.examDetails.functions.map((func, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                                  <span>{func}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                              Common Devices:
                            </h4>
                            <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-1">
                              {layer.examDetails.devices.map((device, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                                  <span>{device}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-3 border border-yellow-200 dark:border-yellow-700">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-yellow-900 dark:text-yellow-200 text-xs sm:text-sm">
                              Data Unit:
                            </span>
                            <span className="text-yellow-800 dark:text-yellow-300 text-xs sm:text-sm">
                              {layer.examDetails.dataUnit}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                            Protocols & Standards:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {layer.examples.map((example, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded text-xs"
                              >
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Drag and Drop Challenge - Only in Visualize Mode */}
      {learningMode === 'visualize' && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
          <h3 className="text-xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
            🎯 Drag & Drop Challenge
          </h3>
          
          {/* Mobile Instructions */}
          {isMobile && (
            <div className="mb-4 sm:mb-6 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
              <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
                📱 <strong>Mobile Mode:</strong> Tap a protocol below, then tap the correct layer to place it!
              </p>
              {selectedProtocolForMobile && (
                <p className="text-xs text-blue-600 dark:text-blue-300 text-center mt-2">
                  Selected: <strong>{selectedProtocolForMobile}</strong> - Now tap a layer above!
                </p>
              )}
            </div>
          )}
          
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center mb-4 sm:mb-6">
            {isMobile ? 'Tap each protocol and then tap its correct OSI layer!' : 'Drag each protocol to its correct OSI layer!'}
          </p>

          {/* Available Protocols */}
          <div className="mb-4 sm:mb-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">
              Available Protocols:
            </h4>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              {protocolsToMatch.filter(protocol => 
                !Object.values(droppedProtocols).flat().includes(protocol)
              ).map((protocol) => (
                <div
                  key={protocol}
                  draggable={!isMobile}
                  onDragStart={() => !isMobile && setDraggedProtocol(protocol)}
                  onClick={() => isMobile && handleMobileProtocolSelect(protocol)}
                  className={`px-3 sm:px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 text-xs sm:text-sm font-medium ${
                    selectedProtocolForMobile === protocol && isMobile
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white ring-2 ring-blue-400 scale-105'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                  } ${isMobile ? 'active:scale-95' : ''}`}
                >
                  {protocol}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={checkAnswers}
              disabled={Object.values(droppedProtocols).flat().length === 0}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors text-sm sm:text-base"
            >
              Check Answers
            </button>
            <button
              onClick={resetDragDrop}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm sm:text-base"
            >
              Reset
            </button>
          </div>

          {/* Results */}
          {showResults && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2 text-sm sm:text-base">
                Results:
              </h4>
              <div className="text-xs sm:text-sm text-blue-800 dark:text-blue-300">
                {Object.entries(droppedProtocols).map(([layerNum, protocols]) => {
                  const correctCount = protocols.filter(p => isCorrectProtocol(parseInt(layerNum), p)).length;
                  return (
                    <div key={layerNum} className="mb-1">
                      Layer {layerNum}: {correctCount}/{protocols.length} correct
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Exam Mode Study Questions */}
      {learningMode === 'exam' && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              OSI Model - Exam Questions
            </h3>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 text-sm sm:text-base">
                Q1: List all 7 OSI layers from top to bottom with their primary functions.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <p><strong>7. Application:</strong> User interface and network services</p>
                  <p><strong>6. Presentation:</strong> Data encryption, compression, translation</p>
                  <p><strong>5. Session:</strong> Session management and dialogue control</p>
                  <p><strong>4. Transport:</strong> Reliable data transfer and error recovery</p>
                  <p><strong>3. Network:</strong> Routing and logical addressing</p>
                  <p><strong>2. Data Link:</strong> Frame formatting and error detection</p>
                  <p><strong>1. Physical:</strong> Bit transmission over physical medium</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3 text-sm sm:text-base">
                Q2: What devices operate at Layer 3 (Network) and what is their primary function?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Devices:</strong> Routers and Layer 3 switches. <strong>Function:</strong> 
                  Route packets between different networks using logical addressing (IP addresses). 
                  They make forwarding decisions based on network layer information.
                </p>
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 text-sm sm:text-base">
                Q3: Explain the data encapsulation process as data moves down the OSI layers.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Encapsulation:</strong> Each layer adds its own header (and sometimes trailer) to the data 
                  from the layer above. Application data becomes segments (Layer 4), then packets (Layer 3), 
                  then frames (Layer 2), and finally bits (Layer 1). This process is reversed at the destination.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OSIModel;