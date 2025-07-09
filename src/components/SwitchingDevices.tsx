import React, { useState } from 'react';
import { Cpu, Wifi, Router, Server, Layers, BookOpen, FileText, ArrowRight } from 'lucide-react';

interface SwitchingDevicesProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const SwitchingDevices: React.FC<SwitchingDevicesProps> = ({ learningMode, isDarkMode }) => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const networkDevices = [
    {
      id: 'hub',
      name: 'Hub',
      fullName: 'Network Hub (Repeater)',
      layer: 1,
      layerName: 'Physical Layer',
      icon: Wifi,
      color: 'red',
      description: learningMode === 'visualize' 
        ? 'Like a megaphone - repeats everything to everyone'
        : 'Physical layer device that regenerates and broadcasts signals to all connected devices',
      functions: [
        'Signal regeneration and amplification',
        'Collision domain extension',
        'No intelligence or filtering',
        'Half-duplex communication'
      ],
      characteristics: [
        'Operates at Physical Layer (Layer 1)',
        'Creates single collision domain',
        'No MAC address learning',
        'Broadcasts to all ports'
      ],
      advantages: ['Simple and cheap', 'Easy to install', 'No configuration needed'],
      disadvantages: ['Security issues', 'Collision problems', 'Bandwidth sharing', 'Largely obsolete'],
      useCases: ['Legacy networks', 'Simple connectivity', 'Signal extension'],
      examDetails: {
        operation: 'Receives signal on one port and retransmits to all other ports',
        collisionDomain: 'All connected devices share single collision domain',
        bandwidth: 'Shared among all connected devices',
        security: 'No security - all data visible to all devices'
      }
    },
    {
      id: 'switch',
      name: 'Switch',
      fullName: 'Network Switch (Bridge)',
      layer: 2,
      layerName: 'Data Link Layer',
      icon: Cpu,
      color: 'blue',
      description: learningMode === 'visualize'
        ? 'Like a smart postal worker - knows where everyone lives'
        : 'Data Link layer device that learns MAC addresses and forwards frames intelligently',
      functions: [
        'MAC address learning and storage',
        'Frame filtering and forwarding',
        'Collision domain separation',
        'Full-duplex communication'
      ],
      characteristics: [
        'Operates at Data Link Layer (Layer 2)',
        'Each port is separate collision domain',
        'Maintains MAC address table',
        'Intelligent frame forwarding'
      ],
      advantages: ['Eliminates collisions', 'Full bandwidth per port', 'Secure unicast', 'Plug and play'],
      disadvantages: ['More expensive than hubs', 'Single broadcast domain', 'Limited to same network'],
      useCases: ['LAN connectivity', 'Office networks', 'Data centers'],
      examDetails: {
        operation: 'Learns source MAC addresses and forwards frames based on destination MAC',
        collisionDomain: 'Each port creates separate collision domain',
        bandwidth: 'Dedicated bandwidth per port',
        security: 'Unicast frames sent only to intended recipient'
      }
    },
    {
      id: 'router',
      name: 'Router',
      fullName: 'Network Router',
      layer: 3,
      layerName: 'Network Layer',
      icon: Router,
      color: 'green',
      description: learningMode === 'visualize'
        ? 'Like a GPS navigator - finds the best path between cities'
        : 'Network layer device that routes packets between different networks using IP addresses',
      functions: [
        'Packet routing between networks',
        'IP address-based forwarding',
        'Broadcast domain separation',
        'Path determination and selection'
      ],
      characteristics: [
        'Operates at Network Layer (Layer 3)',
        'Each interface is separate broadcast domain',
        'Maintains routing table',
        'Connects different networks'
      ],
      advantages: ['Connects different networks', 'Broadcast control', 'Path optimization', 'Network segmentation'],
      disadvantages: ['More complex', 'Higher latency', 'More expensive', 'Requires configuration'],
      useCases: ['Internet connectivity', 'WAN connections', 'Network segmentation'],
      examDetails: {
        operation: 'Examines destination IP address and forwards packets based on routing table',
        collisionDomain: 'Each port is separate collision domain',
        broadcastDomain: 'Each interface is separate broadcast domain',
        routing: 'Uses routing protocols to learn network topology'
      }
    },
    {
      id: 'gateway',
      name: 'Gateway',
      fullName: 'Application Gateway',
      layer: 7,
      layerName: 'Application Layer',
      icon: Server,
      color: 'purple',
      description: learningMode === 'visualize'
        ? 'Like a translator - converts between different languages'
        : 'Application layer device that translates between different protocols and network architectures',
      functions: [
        'Protocol translation and conversion',
        'Application-level processing',
        'Data format transformation',
        'Network architecture bridging'
      ],
      characteristics: [
        'Operates at Application Layer (Layer 7)',
        'Protocol-specific processing',
        'Can modify data content',
        'Connects dissimilar networks'
      ],
      advantages: ['Protocol conversion', 'Application awareness', 'Content filtering', 'Security features'],
      disadvantages: ['High processing overhead', 'Protocol-specific', 'Complex configuration', 'Potential bottleneck'],
      useCases: ['Email gateways', 'Web proxies', 'Protocol converters'],
      examDetails: {
        operation: 'Processes data at application level and converts between different protocols',
        processing: 'Can examine and modify application data',
        translation: 'Converts between different network architectures',
        examples: 'Email gateway (SMTP to X.400), Web proxy, VoIP gateway'
      }
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      red: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700',
      blue: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700',
      green: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700',
      purple: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700'
    };
    return colors[color as keyof typeof colors];
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
        Switching Devices
      </h2>

      {/* OSI Layer Context */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        {learningMode === 'exam' && (
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-6 h-6 text-green-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Network Devices by OSI Layer - Study Guide
            </h3>
          </div>
        )}

        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
          🏗️ Devices by OSI Layer
        </h3>

        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center mb-6 px-2">
          Different network devices operate at different <Tooltip term="OSI Layers" definition="Open Systems Interconnection model - a 7-layer framework for network communication" />. 
          Understanding which layer a device works at helps you know what it can and cannot do.
        </p>

        {/* Layer Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {networkDevices.map((device) => {
            const Icon = device.icon;
            const isSelected = selectedDevice === device.id;
            
            return (
              <div
                key={device.id}
                className={`p-4 sm:p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? `${getColorClasses(device.color)} shadow-lg scale-105` 
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:shadow-md'
                }`}
                onClick={() => setSelectedDevice(isSelected ? null : device.id)}
              >
                <div className="text-center mb-4">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl flex items-center justify-center ${
                    device.color === 'red' ? 'bg-red-100 dark:bg-red-900/30' :
                    device.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    device.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                    'bg-purple-100 dark:bg-purple-900/30'
                  }`}>
                    <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${
                      device.color === 'red' ? 'text-red-600' :
                      device.color === 'blue' ? 'text-blue-600' :
                      device.color === 'green' ? 'text-green-600' :
                      'text-purple-600'
                    }`} />
                  </div>
                  
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {device.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Layer {device.layer}: {device.layerName}
                  </p>
                  
                  <div className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                    device.color === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' :
                    device.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' :
                    device.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' :
                    'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200'
                  }`}>
                    {device.fullName}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
                  {device.description}
                </p>

                {isSelected && (
                  <div className="space-y-4">
                    {learningMode === 'visualize' ? (
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Key Functions:</h5>
                          <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                            {device.functions.slice(0, 3).map((func, index) => (
                              <li key={index}>• {func}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <h6 className="font-medium text-green-700 dark:text-green-300 text-xs mb-1">Pros:</h6>
                            <ul className="text-xs text-gray-600 dark:text-gray-300">
                              {device.advantages.slice(0, 2).map((adv, index) => (
                                <li key={index}>• {adv}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h6 className="font-medium text-red-700 dark:text-red-300 text-xs mb-1">Cons:</h6>
                            <ul className="text-xs text-gray-600 dark:text-gray-300">
                              {device.disadvantages.slice(0, 2).map((dis, index) => (
                                <li key={index}>• {dis}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* EXAM MODE - Detailed Information */
                      <div className="space-y-4">
                        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Technical Details:</h5>
                          <div className="space-y-2 text-xs">
                            <div>
                              <span className="font-medium text-gray-900 dark:text-white">Operation:</span>
                              <p className="text-gray-600 dark:text-gray-400">{device.examDetails.operation}</p>
                            </div>
                            {device.examDetails.collisionDomain && (
                              <div>
                                <span className="font-medium text-gray-900 dark:text-white">Collision Domain:</span>
                                <p className="text-gray-600 dark:text-gray-400">{device.examDetails.collisionDomain}</p>
                              </div>
                            )}
                            {device.examDetails.broadcastDomain && (
                              <div>
                                <span className="font-medium text-gray-900 dark:text-white">Broadcast Domain:</span>
                                <p className="text-gray-600 dark:text-gray-400">{device.examDetails.broadcastDomain}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">All Functions:</h5>
                          <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                            {device.functions.map((func, index) => (
                              <li key={index}>• {func}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Use Cases:</h5>
                          <div className="flex flex-wrap gap-1">
                            {device.useCases.map((useCase, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                                {useCase}
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

      {/* Device Hierarchy Visualization */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
          📊 Intelligence & Capability Hierarchy
        </h3>

        <div className="space-y-4">
          {networkDevices.map((device, index) => {
            const Icon = device.icon;
            const intelligenceLevel = device.layer;
            
            return (
              <div key={device.id} className="flex items-center space-x-4 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                  device.color === 'red' ? 'bg-red-100 dark:bg-red-900/30' :
                  device.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                  device.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                  'bg-purple-100 dark:bg-purple-900/30'
                }`}>
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    device.color === 'red' ? 'text-red-600' :
                    device.color === 'blue' ? 'text-blue-600' :
                    device.color === 'green' ? 'text-green-600' :
                    'text-purple-600'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                      {device.name} (Layer {device.layer})
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Intelligence Level: {intelligenceLevel}/7
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full ${
                        device.color === 'red' ? 'bg-red-500' :
                        device.color === 'blue' ? 'bg-blue-500' :
                        device.color === 'green' ? 'bg-green-500' :
                        'bg-purple-500'
                      }`}
                      style={{ width: `${(intelligenceLevel / 7) * 100}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    {device.description}
                  </p>
                </div>
                
                {index < networkDevices.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-700">
          <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2 text-sm sm:text-base">
            💡 Key Insight:
          </h4>
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            Higher layer devices are more intelligent but also more complex and expensive. 
            Choose the right device based on your network requirements: Hubs for simple connectivity, 
            Switches for LAN segmentation, Routers for network interconnection, and Gateways for protocol conversion.
          </p>
        </div>
      </div>

      {/* Exam Mode Study Questions */}
      {learningMode === 'exam' && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0 mt-8">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-6 h-6 text-green-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Network Devices - Exam Questions
            </h3>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 text-sm sm:text-base">
                Q1: Compare the collision and broadcast domain characteristics of hubs, switches, and routers.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Hub:</strong> Single collision domain, single broadcast domain. <strong>Switch:</strong> 
                  Each port = separate collision domain, single broadcast domain. <strong>Router:</strong> 
                  Each port = separate collision domain, each interface = separate broadcast domain.
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3 text-sm sm:text-base">
                Q2: Explain how a switch learns MAC addresses and makes forwarding decisions.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Learning:</strong> Switch examines source MAC address of incoming frames and associates 
                  it with the receiving port in MAC address table. <strong>Forwarding:</strong> For outgoing frames, 
                  switch looks up destination MAC in table and forwards only to that port (unicast) or floods 
                  to all ports (unknown/broadcast).
                </p>
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 text-sm sm:text-base">
                Q3: What is the difference between a router and a gateway in terms of functionality?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Router:</strong> Operates at Network Layer (Layer 3), routes packets between networks 
                  using IP addresses, maintains routing tables. <strong>Gateway:</strong> Operates at Application 
                  Layer (Layer 7), translates between different protocols/architectures, can modify data content, 
                  provides protocol conversion services.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SwitchingDevices;