import React, { useState } from 'react';
import { Globe, Truck, Package, Monitor, Zap, Shield, CheckCircle, XCircle, BookOpen, FileText } from 'lucide-react';

interface TCPIPSuiteProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const TCPIPSuite: React.FC<TCPIPSuiteProps> = ({ learningMode, isDarkMode }) => {
  const [selectedProtocol, setSelectedProtocol] = useState<'tcp' | 'udp' | null>(null);
  const [battleScenario, setBattleScenario] = useState<string | null>(null);
  const [showBattleResult, setShowBattleResult] = useState(false);

  const tcpipLayers = [
    {
      number: 4,
      name: 'Application',
      description: learningMode === 'visualize'
        ? 'Your apps and websites - like WhatsApp, Chrome, Netflix'
        : 'Provides network services to applications and end-users. Combines OSI layers 5, 6, and 7 functionality including session management, data presentation, and application services.',
      protocols: ['HTTP/HTTPS', 'FTP', 'SMTP', 'DNS', 'SSH', 'Telnet', 'SNMP'],
      icon: Monitor,
      color: 'blue',
      examples: 'Web browsing, Email, File transfer',
      examDetails: {
        functions: ['Application services', 'Data formatting', 'Session management', 'User interface'],
        dataUnit: 'Data/Message',
        osiEquivalent: 'Application + Presentation + Session (Layers 7, 6, 5)'
      }
    },
    {
      number: 3,
      name: 'Transport',
      description: learningMode === 'visualize'
        ? 'Delivery service - makes sure data arrives safely and in order'
        : 'Provides reliable or unreliable delivery, error recovery, flow control, and end-to-end communication. Handles segmentation and reassembly of data.',
      protocols: ['TCP', 'UDP', 'SCTP'],
      icon: Truck,
      color: 'green',
      examples: 'Reliable delivery (TCP) vs Fast delivery (UDP)',
      examDetails: {
        functions: ['Segmentation/Reassembly', 'Error recovery', 'Flow control', 'Connection management'],
        dataUnit: 'Segment (TCP) / Datagram (UDP)',
        osiEquivalent: 'Transport (Layer 4)'
      }
    },
    {
      number: 2,
      name: 'Internet',
      description: learningMode === 'visualize'
        ? 'GPS for data - finds the best route across the internet'
        : 'Handles routing, logical addressing, and path determination across networks. Responsible for packet forwarding and internetworking using IP addresses.',
      protocols: ['IP (IPv4/IPv6)', 'ICMP', 'ARP', 'RARP'],
      icon: Globe,
      color: 'purple',
      examples: 'Routing data across the internet',
      examDetails: {
        functions: ['Routing', 'Logical addressing', 'Path determination', 'Packet forwarding'],
        dataUnit: 'Packet',
        osiEquivalent: 'Network (Layer 3)'
      }
    },
    {
      number: 1,
      name: 'Network Access',
      description: learningMode === 'visualize'
        ? 'Physical connection - WiFi, Ethernet cables, cellular'
        : 'Combines physical transmission and data link functions. Defines how data is physically transmitted and handles local network delivery.',
      protocols: ['Ethernet', 'WiFi (802.11)', 'PPP', 'Frame Relay', 'ATM'],
      icon: Zap,
      color: 'orange',
      examples: 'WiFi, Ethernet, Cellular connections',
      examDetails: {
        functions: ['Physical transmission', 'Frame formatting', 'Error detection', 'Media access control'],
        dataUnit: 'Frame/Bits',
        osiEquivalent: 'Data Link + Physical (Layers 2, 1)'
      }
    }
  ];

  const battleScenarios = [
    {
      id: 'video-call',
      title: 'Video Call with Friends',
      description: 'Real-time video chat where some dropped frames are okay',
      correct: 'udp',
      explanation: 'UDP is better for video calls because speed matters more than perfect delivery. A few dropped video frames won\'t ruin the conversation!'
    },
    {
      id: 'bank-transfer',
      title: 'Online Banking Transaction',
      description: 'Transferring money - every bit of data must be perfect',
      correct: 'tcp',
      explanation: 'TCP is essential for banking because every piece of data must arrive correctly. You can\'t afford to lose any part of a financial transaction!'
    },
    {
      id: 'online-gaming',
      title: 'Fast-Paced Online Gaming',
      description: 'Real-time multiplayer game where quick response matters',
      correct: 'udp',
      explanation: 'UDP is better for gaming because low latency is crucial. It\'s better to have a slightly glitchy game than a laggy one!'
    },
    {
      id: 'file-download',
      title: 'Downloading Important Documents',
      description: 'Downloading a PDF file that must be complete and error-free',
      correct: 'tcp',
      explanation: 'TCP ensures the entire file downloads correctly. You need every byte of that document to be perfect!'
    }
  ];

  const protocolComparison = {
    tcp: {
      name: 'TCP (Transmission Control Protocol)',
      icon: Shield,
      color: 'green',
      features: [
        'Connection-oriented protocol',
        'Reliable delivery guaranteed',
        'Data arrives in correct order',
        'Error checking and correction',
        'Flow control (prevents overwhelming)',
        'Congestion control'
      ],
      useCases: ['Web browsing (HTTP)', 'Email (SMTP)', 'File downloads (FTP)', 'Banking applications'],
      analogy: 'Like registered mail - slower but guaranteed delivery',
      examDetails: {
        headerSize: '20-60 bytes',
        connectionType: 'Connection-oriented',
        reliability: 'Reliable',
        ordering: 'Ordered delivery',
        flowControl: 'Yes',
        errorRecovery: 'Yes'
      }
    },
    udp: {
      name: 'UDP (User Datagram Protocol)',
      icon: Zap,
      color: 'blue',
      features: [
        'Connectionless protocol',
        'Fast transmission',
        'No delivery guarantee',
        'No error correction',
        'Lightweight protocol',
        'Minimal overhead'
      ],
      useCases: ['Video streaming', 'Online gaming', 'DNS queries', 'Live broadcasts', 'DHCP'],
      analogy: 'Like regular mail - faster but might get lost',
      examDetails: {
        headerSize: '8 bytes',
        connectionType: 'Connectionless',
        reliability: 'Unreliable',
        ordering: 'No ordering',
        flowControl: 'No',
        errorRecovery: 'No'
      }
    }
  };

  const handleBattleChoice = (choice: 'tcp' | 'udp') => {
    if (!battleScenario) return;
    
    const scenario = battleScenarios.find(s => s.id === battleScenario);
    setSelectedProtocol(choice);
    setShowBattleResult(true);
  };

  const resetBattle = () => {
    setBattleScenario(null);
    setSelectedProtocol(null);
    setShowBattleResult(false);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700',
      green: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700',
      purple: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700',
      orange: 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="mb-12 sm:mb-20">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12 text-center px-4">
        TCP/IP Protocol Suite
      </h2>

      {/* TCP/IP Layers */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        {learningMode === 'exam' && (
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-6 h-6 text-green-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              TCP/IP Model - Study Guide
            </h3>
          </div>
        )}

        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
          4-Layer TCP/IP Model
        </h3>
        
        <div className="space-y-3 sm:space-y-4">
          {tcpipLayers.map((layer) => {
            const Icon = layer.icon;
            
            return (
              <div
                key={layer.number}
                className={`p-3 sm:p-4 rounded-xl border-2 ${getColorClasses(layer.color)} transition-all duration-300 hover:shadow-lg`}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-lg">
                      Layer {layer.number}: {layer.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {layer.description}
                    </p>
                    
                    {learningMode === 'exam' && (
                      <div className="mt-3 space-y-2">
                        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="font-semibold text-gray-900 dark:text-white">Data Unit:</span>
                              <span className="text-gray-600 dark:text-gray-300 ml-1">{layer.examDetails.dataUnit}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-900 dark:text-white">OSI Equivalent:</span>
                              <span className="text-gray-600 dark:text-gray-300 ml-1">{layer.examDetails.osiEquivalent}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                      {layer.protocols.slice(0, learningMode === 'exam' ? 5 : 3).map((protocol, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded text-xs"
                        >
                          {protocol}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TCP vs UDP Section */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        <h3 className="text-xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
          {learningMode === 'visualize' ? '⚔️ TCP vs UDP Battle' : '📊 TCP vs UDP Comparison'}
        </h3>

        {learningMode === 'visualize' ? (
          /* Visualize Mode - Interactive Battle */
          !battleScenario ? (
            <div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center mb-4 sm:mb-6">
                Choose a scenario to see which protocol wins!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {battleScenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => setBattleScenario(scenario.id)}
                    className="p-3 sm:p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50 rounded-xl transition-all duration-300 text-left border border-blue-200 dark:border-blue-700"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                      {scenario.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {scenario.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {!showBattleResult ? (
                <div>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-lg">
                      Scenario: {battleScenarios.find(s => s.id === battleScenario)?.title}
                    </h4>
                    <p className="text-xs sm:text-base text-gray-600 dark:text-gray-300">
                      {battleScenarios.find(s => s.id === battleScenario)?.description}
                    </p>
                  </div>

                  <p className="text-center text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                    Which protocol would work better for this scenario?
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <button
                      onClick={() => handleBattleChoice('tcp')}
                      className="p-4 sm:p-6 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 rounded-xl transition-all duration-300 border-2 border-green-200 dark:border-green-700"
                    >
                      <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-green-600 mx-auto mb-3 sm:mb-4" />
                      <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2 text-sm sm:text-base">
                        TCP - Reliable
                      </h5>
                      <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                        Guaranteed delivery, error-free
                      </p>
                    </button>
                    <button
                      onClick={() => handleBattleChoice('udp')}
                      className="p-4 sm:p-6 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-xl transition-all duration-300 border-2 border-blue-200 dark:border-blue-700"
                    >
                      <Zap className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                      <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 text-sm sm:text-base">
                        UDP - Fast
                      </h5>
                      <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                        Quick delivery, lightweight
                      </p>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {(() => {
                    const scenario = battleScenarios.find(s => s.id === battleScenario);
                    const isCorrect = selectedProtocol === scenario?.correct;
                    
                    return (
                      <div className={`p-4 sm:p-6 rounded-xl border-2 ${
                        isCorrect 
                          ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-600' 
                          : 'bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-600'
                      }`}>
                        <div className="flex items-center justify-center mb-4">
                          {isCorrect ? (
                            <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-600" />
                          ) : (
                            <XCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-600" />
                          )}
                        </div>
                        
                        <h4 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white text-center mb-3 sm:mb-4">
                          {isCorrect ? 'Correct! 🎉' : 'Not quite right! 🤔'}
                        </h4>
                        
                        <p className="text-center text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                          The better choice is: <strong>{scenario?.correct?.toUpperCase()}</strong>
                        </p>
                        
                        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                          <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed text-xs sm:text-sm">
                            {scenario?.explanation}
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <button
                            onClick={resetBattle}
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 text-sm sm:text-base"
                          >
                            Try Another Scenario
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )
        ) : (
          /* Exam Mode - Detailed Comparison */
          <div className="space-y-6">
            {/* Detailed Protocol Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(protocolComparison).map(([key, protocol]) => {
                const Icon = protocol.icon;
                return (
                  <div key={key} className={`p-4 sm:p-6 rounded-xl border-2 ${
                    protocol.color === 'green' 
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700'
                      : 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700'
                  }`}>
                    <div className="flex items-center space-x-3 mb-4">
                      <Icon className={`w-8 h-8 ${protocol.color === 'green' ? 'text-green-600' : 'text-blue-600'}`} />
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {protocol.name}
                      </h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Features:</h5>
                        <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                          {protocol.features.map((feature, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-1.5 flex-shrink-0"></span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Technical Details:</h5>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="font-medium">Header Size:</span>
                            <div className="text-gray-600 dark:text-gray-400">{protocol.examDetails.headerSize}</div>
                          </div>
                          <div>
                            <span className="font-medium">Connection:</span>
                            <div className="text-gray-600 dark:text-gray-400">{protocol.examDetails.connectionType}</div>
                          </div>
                          <div>
                            <span className="font-medium">Reliability:</span>
                            <div className="text-gray-600 dark:text-gray-400">{protocol.examDetails.reliability}</div>
                          </div>
                          <div>
                            <span className="font-medium">Flow Control:</span>
                            <div className="text-gray-600 dark:text-gray-400">{protocol.examDetails.flowControl}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Common Use Cases:</h5>
                        <div className="flex flex-wrap gap-1">
                          {protocol.useCases.map((useCase, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded text-xs"
                            >
                              {useCase}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Comparison Table */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 sm:p-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Comparison Table
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b-2 border-gray-200 dark:border-gray-600">
                      <th className="text-left py-2 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white text-sm">Feature</th>
                      <th className="text-left py-2 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white text-sm">TCP</th>
                      <th className="text-left py-2 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white text-sm">UDP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-2 px-2 sm:px-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">Connection Type</td>
                      <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Connection-oriented</td>
                      <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Connectionless</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-2 px-2 sm:px-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">Reliability</td>
                      <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Reliable</td>
                      <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Unreliable</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-2 px-2 sm:px-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">Speed</td>
                      <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Slower (overhead)</td>
                      <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Faster</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-2 px-2 sm:px-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">Header Size</td>
                      <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">20-60 bytes</td>
                      <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">8 bytes</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2 sm:px-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">Best For</td>
                      <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Web, Email, Files</td>
                      <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Gaming, Streaming, DNS</td>
                    </tr>
                  </tbody>
                </table>
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
              TCP/IP Model - Exam Questions
            </h3>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3 text-sm sm:text-base">
                Q1: Compare TCP/IP model with OSI model. How do the layers map?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>TCP/IP (4 layers) vs OSI (7 layers):</strong><br/>
                  • Application Layer = OSI Layers 7, 6, 5 (Application, Presentation, Session)<br/>
                  • Transport Layer = OSI Layer 4 (Transport)<br/>
                  • Internet Layer = OSI Layer 3 (Network)<br/>
                  • Network Access = OSI Layers 2, 1 (Data Link, Physical)
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 text-sm sm:text-base">
                Q2: Explain the key differences between TCP and UDP with examples.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>TCP:</strong> Connection-oriented, reliable, ordered delivery, error recovery. 
                  Examples: HTTP, SMTP, FTP. <strong>UDP:</strong> Connectionless, fast, no guarantees, 
                  minimal overhead. Examples: DNS, DHCP, video streaming, online gaming.
                </p>
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 text-sm sm:text-base">
                Q3: What protocols operate at the Internet layer and what are their functions?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>IP (Internet Protocol):</strong> Routing and logical addressing. 
                  <strong>ICMP:</strong> Error reporting and diagnostics (ping, traceroute). 
                  <strong>ARP:</strong> Maps IP addresses to MAC addresses. 
                  <strong>RARP:</strong> Maps MAC addresses to IP addresses.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TCPIPSuite;