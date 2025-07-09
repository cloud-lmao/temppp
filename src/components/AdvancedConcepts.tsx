import React, { useState } from 'react';
import { Network, Shield, Route, Layers, BookOpen, FileText, Users, Settings } from 'lucide-react';

interface AdvancedConceptsProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const AdvancedConcepts: React.FC<AdvancedConceptsProps> = ({ learningMode, isDarkMode }) => {
  const [selectedConcept, setSelectedConcept] = useState<'vlan' | 'routing' | null>(null);
  const [vlanSetup, setVlanSetup] = useState<{[key: string]: string}>({});
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const advancedConcepts = {
    vlan: {
      name: 'Virtual LANs (VLANs)',
      description: 'Logical network segmentation within a single switch',
      icon: Network,
      color: 'blue',
      benefits: [
        'Network segmentation without physical separation',
        'Improved security through traffic isolation',
        'Reduced broadcast domains',
        'Flexible network management'
      ],
      useCases: [
        'Departmental separation (HR, Finance, IT)',
        'Guest network isolation',
        'Voice and data traffic separation',
        'Security zone implementation'
      ],
      examDetails: {
        types: ['Port-based VLAN', 'MAC-based VLAN', 'Protocol-based VLAN'],
        standards: ['IEEE 802.1Q', 'ISL (Cisco proprietary)'],
        configuration: ['VLAN ID (1-4094)', 'Trunk ports', 'Access ports'],
        benefits: ['Broadcast domain control', 'Security', 'Flexibility', 'Cost reduction']
      }
    },
    routing: {
      name: 'Routing Protocols',
      description: 'Protocols that help routers learn and share network paths',
      icon: Route,
      color: 'purple',
      protocols: [
        {
          name: 'RIP (Routing Information Protocol)',
          type: 'Distance Vector',
          metric: 'Hop Count',
          maxHops: 15,
          convergence: 'Slow',
          use: 'Small networks'
        },
        {
          name: 'OSPF (Open Shortest Path First)',
          type: 'Link State',
          metric: 'Cost (Bandwidth)',
          maxHops: 'No limit',
          convergence: 'Fast',
          use: 'Enterprise networks'
        },
        {
          name: 'EIGRP (Enhanced Interior Gateway Routing Protocol)',
          type: 'Hybrid',
          metric: 'Composite (BW, Delay)',
          maxHops: 255,
          convergence: 'Very Fast',
          use: 'Cisco networks'
        }
      ],
      examDetails: {
        categories: ['Interior Gateway Protocol (IGP)', 'Exterior Gateway Protocol (EGP)'],
        algorithms: ['Distance Vector', 'Link State', 'Path Vector'],
        metrics: ['Hop count', 'Bandwidth', 'Delay', 'Cost', 'Load'],
        convergence: ['Time to adapt to network changes', 'Affects network stability']
      }
    }
  };

  const devices = ['PC-1', 'PC-2', 'PC-3', 'PC-4', 'Printer', 'Server'];
  const vlans = ['VLAN 10 (Sales)', 'VLAN 20 (IT)', 'VLAN 30 (Guest)'];

  const handleVlanAssignment = (device: string, vlan: string) => {
    setVlanSetup(prev => ({
      ...prev,
      [device]: vlan
    }));
  };

  const getVlanColor = (vlan: string) => {
    if (vlan.includes('10')) return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200';
    if (vlan.includes('20')) return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
    if (vlan.includes('30')) return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200';
    return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
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
        Advanced Device Concepts
      </h2>

      {/* Concept Selection */}
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8 sm:mb-12 px-4">
        {Object.entries(advancedConcepts).map(([key, concept]) => {
          const Icon = concept.icon;
          const isSelected = selectedConcept === key;
          
          return (
            <button
              key={key}
              onClick={() => setSelectedConcept(isSelected ? null : key as 'vlan' | 'routing')}
              className={`flex items-center space-x-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 border-2 ${
                isSelected 
                  ? concept.color === 'blue'
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600 shadow-lg scale-105'
                    : 'bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-600 shadow-lg scale-105'
                  : 'bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-600 hover:shadow-md'
              }`}
            >
              <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${
                isSelected 
                  ? concept.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                  : 'text-gray-600 dark:text-gray-300'
              }`} />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                  {concept.name}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {concept.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* VLAN Concept */}
      {selectedConcept === 'vlan' && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
          {learningMode === 'exam' && (
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                Virtual LANs (VLANs) - Study Guide
              </h3>
            </div>
          )}

          {learningMode === 'visualize' ? (
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                🏢 Virtual LANs (VLANs)
              </h3>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 text-center leading-relaxed px-2">
                <Tooltip term="VLANs" definition="Virtual Local Area Networks - logical network segments created within a single physical switch" /> let you create separate networks within one switch. 
                It's like having multiple virtual switches inside one physical switch!
              </p>

              {/* Interactive VLAN Setup */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                  🔧 Interactive VLAN Setup
                </h4>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
                  Drag devices to different VLANs to see how network segmentation works:
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Devices */}
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">
                      Network Devices:
                    </h5>
                    <div className="space-y-2">
                      {devices.map((device) => (
                        <div key={device} className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{device}</span>
                          </div>
                          <select
                            value={vlanSetup[device] || ''}
                            onChange={(e) => handleVlanAssignment(device, e.target.value)}
                            className="text-xs px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="">Select VLAN</option>
                            {vlans.map((vlan) => (
                              <option key={vlan} value={vlan}>{vlan}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* VLAN Groups */}
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">
                      VLAN Groups:
                    </h5>
                    <div className="space-y-3">
                      {vlans.map((vlan) => {
                        const assignedDevices = Object.entries(vlanSetup)
                          .filter(([_, assignedVlan]) => assignedVlan === vlan)
                          .map(([device, _]) => device);
                        
                        return (
                          <div key={vlan} className={`p-3 rounded-lg ${getVlanColor(vlan)}`}>
                            <h6 className="font-semibold mb-2 text-sm">{vlan}</h6>
                            <div className="flex flex-wrap gap-1">
                              {assignedDevices.length > 0 ? (
                                assignedDevices.map((device) => (
                                  <span key={device} className="px-2 py-1 bg-white/50 dark:bg-gray-800/50 rounded text-xs">
                                    {device}
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs opacity-60">No devices assigned</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {Object.keys(vlanSetup).length > 0 && (
                  <div className="mt-6 p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl">
                    <h6 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                      🔒 Security Benefit:
                    </h6>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Devices in different VLANs cannot communicate directly with each other, 
                      providing network segmentation and improved security.
                    </p>
                  </div>
                )}
              </div>

              {/* VLAN Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">Benefits:</h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    {advancedConcepts.vlan.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">Use Cases:</h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    {advancedConcepts.vlan.useCases.map((useCase, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            /* EXAM MODE - VLAN Study Content */
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
                <h4 className="text-lg sm:text-xl font-semibold text-blue-900 dark:text-blue-200 mb-3">
                  📚 VLAN Technical Overview
                </h4>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  <strong>Virtual LAN (VLAN):</strong> A logical network segment created within a physical switch 
                  infrastructure. VLANs allow network administrators to group devices logically rather than 
                  physically, creating separate broadcast domains and improving network security and management.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">VLAN Types:</h5>
                    <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                      {advancedConcepts.vlan.examDetails.types.map((type, index) => (
                        <li key={index}>• {type}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Standards:</h5>
                    <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                      {advancedConcepts.vlan.examDetails.standards.map((standard, index) => (
                        <li key={index}>• {standard}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
                <h4 className="text-lg sm:text-xl font-semibold text-green-900 dark:text-green-200 mb-4">
                  🔧 VLAN Configuration Concepts
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {advancedConcepts.vlan.examDetails.configuration.map((config, index) => (
                    <div key={index} className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                      <h6 className="font-semibold text-gray-900 dark:text-white mb-1 text-xs">{config}</h6>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {config.includes('ID') ? 'Unique identifier (1-4094)' :
                         config.includes('Trunk') ? 'Carries multiple VLANs' :
                         config.includes('Access') ? 'Single VLAN per port' : 'Configuration parameter'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Routing Protocols Concept */}
      {selectedConcept === 'routing' && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
          {learningMode === 'exam' && (
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                Routing Protocols - Study Guide
              </h3>
            </div>
          )}

          {learningMode === 'visualize' ? (
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                🗺️ Routing Protocols
              </h3>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 text-center leading-relaxed px-2">
                <Tooltip term="Routing Protocols" definition="Protocols that help routers automatically learn and share information about network paths" /> help routers automatically learn about networks and find the best paths. 
                It's like having GPS systems that share traffic information with each other!
              </p>

              {/* Protocol Comparison */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b-2 border-gray-200 dark:border-gray-600">
                      <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white text-sm">Protocol</th>
                      <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white text-sm">Type</th>
                      <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white text-sm">Metric</th>
                      <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white text-sm">Speed</th>
                      <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white text-sm">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {advancedConcepts.routing.protocols.map((protocol, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-3 px-2 sm:px-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">
                          {protocol.name}
                        </td>
                        <td className="py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                          {protocol.type}
                        </td>
                        <td className="py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                          {protocol.metric}
                        </td>
                        <td className="py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                          {protocol.convergence}
                        </td>
                        <td className="py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                          {protocol.use}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Protocol Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {advancedConcepts.routing.protocols.map((protocol, index) => (
                  <div key={index} className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-4 sm:p-6 shadow-lg">
                    <h5 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 text-sm sm:text-base">
                      {protocol.name}
                    </h5>
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Type:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{protocol.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Max Hops:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{protocol.maxHops}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Convergence:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{protocol.convergence}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* EXAM MODE - Routing Protocols Study Content */
            <div className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
                <h4 className="text-lg sm:text-xl font-semibold text-purple-900 dark:text-purple-200 mb-3">
                  📚 Routing Protocol Classification
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">By Scope:</h5>
                    <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                      {advancedConcepts.routing.examDetails.categories.map((category, index) => (
                        <li key={index}>• {category}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">By Algorithm:</h5>
                    <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                      {advancedConcepts.routing.examDetails.algorithms.map((algorithm, index) => (
                        <li key={index}>• {algorithm}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
                <h4 className="text-lg sm:text-xl font-semibold text-blue-900 dark:text-blue-200 mb-4">
                  📊 Detailed Protocol Comparison
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-600">
                        <th className="text-left py-2 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">Feature</th>
                        <th className="text-left py-2 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">RIP</th>
                        <th className="text-left py-2 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">OSPF</th>
                        <th className="text-left py-2 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">EIGRP</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-2 px-2 sm:px-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">Algorithm</td>
                        <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Distance Vector</td>
                        <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Link State</td>
                        <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Hybrid</td>
                      </tr>
                      <tr className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-2 px-2 sm:px-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">Metric</td>
                        <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Hop Count</td>
                        <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Cost (Bandwidth)</td>
                        <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Composite</td>
                      </tr>
                      <tr className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-2 px-2 sm:px-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">Convergence</td>
                        <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Slow (minutes)</td>
                        <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Fast (seconds)</td>
                        <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Very Fast</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 sm:px-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">Scalability</td>
                        <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Small networks</td>
                        <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Large networks</td>
                        <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Medium-Large</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Exam Mode Study Questions */}
      {learningMode === 'exam' && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-6 h-6 text-green-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Advanced Concepts - Exam Questions
            </h3>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 text-sm sm:text-base">
                Q1: Explain the benefits of VLANs and how they improve network security and management.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Benefits:</strong> (1) <strong>Security</strong> - logical separation prevents unauthorized access, 
                  (2) <strong>Broadcast control</strong> - reduces broadcast domains, (3) <strong>Flexibility</strong> - 
                  logical grouping independent of physical location, (4) <strong>Cost reduction</strong> - no need for 
                  separate physical switches. VLANs use 802.1Q tagging to identify traffic and maintain separation.
                </p>
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 text-sm sm:text-base">
                Q2: Compare distance vector and link state routing protocols with examples.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Distance Vector (RIP):</strong> Shares routing table with neighbors, uses hop count, 
                  slower convergence, "routing by rumor", simple but limited scalability. <strong>Link State (OSPF):</strong> 
                  Shares link state information, builds complete topology map, faster convergence, more CPU/memory 
                  intensive, better scalability with hierarchical design.
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3 text-sm sm:text-base">
                Q3: What is the difference between trunk and access ports in VLAN configuration?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Access Ports:</strong> Connect end devices (PCs, printers), carry traffic for single VLAN, 
                  untagged frames. <strong>Trunk Ports:</strong> Connect switches together, carry traffic for multiple 
                  VLANs simultaneously, use 802.1Q tagging to identify VLAN membership. Trunk ports enable VLAN 
                  communication across multiple switches.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdvancedConcepts;