import React, { useState } from 'react';
import { Cpu, Router, Wifi, CheckCircle, XCircle, Trophy, BookOpen, FileText, ArrowRight } from 'lucide-react';

interface DeviceComparisonProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const DeviceComparison: React.FC<DeviceComparisonProps> = ({ learningMode, isDarkMode }) => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [userChoice, setUserChoice] = useState<'switch' | 'router' | 'hub' | null>(null);
  const [showResult, setShowResult] = useState(false);

  const comparisonData = [
    {
      aspect: 'OSI Layer',
      switch: 'Layer 2 (Data Link)',
      router: 'Layer 3 (Network)',
      hub: 'Layer 1 (Physical)',
      winner: 'context'
    },
    {
      aspect: 'Addressing',
      switch: 'MAC Addresses',
      router: 'IP Addresses',
      hub: 'No Addressing',
      winner: 'context'
    },
    {
      aspect: 'Intelligence',
      switch: 'MAC Learning',
      router: 'Routing Decisions',
      hub: 'No Intelligence',
      winner: 'router'
    },
    {
      aspect: 'Collision Domains',
      switch: 'Per Port',
      router: 'Per Port',
      hub: 'Single Domain',
      winner: 'switch'
    },
    {
      aspect: 'Broadcast Domains',
      switch: 'Single Domain',
      router: 'Per Interface',
      hub: 'Single Domain',
      winner: 'router'
    },
    {
      aspect: 'Bandwidth',
      switch: 'Dedicated per Port',
      router: 'Dedicated per Port',
      hub: 'Shared Among All',
      winner: 'switch'
    },
    {
      aspect: 'Security',
      switch: 'Good (Unicast)',
      router: 'Excellent (Filtering)',
      hub: 'Poor (Broadcast)',
      winner: 'router'
    },
    {
      aspect: 'Cost',
      switch: 'Medium',
      router: 'High',
      hub: 'Low',
      winner: 'hub'
    },
    {
      aspect: 'Performance',
      switch: 'High',
      router: 'Medium (Processing)',
      hub: 'Low (Collisions)',
      winner: 'switch'
    },
    {
      aspect: 'Use Case',
      switch: 'LAN Connectivity',
      router: 'Network Interconnection',
      hub: 'Legacy/Simple Networks',
      winner: 'context'
    }
  ];

  const scenarios = [
    {
      id: 'office-lan',
      title: 'Office LAN Setup',
      description: 'Connect 20 computers in an office for file sharing and internet access',
      requirements: ['Local network', 'Good performance', 'Security'],
      correct: 'switch',
      explanation: 'A switch is perfect for LAN connectivity - it provides dedicated bandwidth per port, eliminates collisions, and offers good security with unicast forwarding.'
    },
    {
      id: 'home-internet',
      title: 'Home Internet Connection',
      description: 'Connect home network to ISP and manage multiple devices',
      requirements: ['Internet access', 'Network separation', 'DHCP/NAT'],
      correct: 'router',
      explanation: 'A router is essential for connecting to the internet, providing NAT, DHCP, and separating your home network from the ISP network.'
    },
    {
      id: 'simple-lab',
      title: 'Simple Testing Lab',
      description: 'Connect 3 old computers for basic testing, budget is very limited',
      requirements: ['Very low cost', 'Simple setup', 'Basic connectivity'],
      correct: 'hub',
      explanation: 'For a simple, low-cost setup with just a few devices and no security concerns, a hub might still work, though switches are now preferred.'
    },
    {
      id: 'branch-office',
      title: 'Branch Office Connection',
      description: 'Connect branch office network to headquarters across the city',
      requirements: ['Long distance', 'Network interconnection', 'Routing'],
      correct: 'router',
      explanation: 'Routers are designed for connecting different networks across distances, providing routing capabilities and network interconnection.'
    }
  ];

  const handleScenarioChoice = (choice: 'switch' | 'router' | 'hub') => {
    setUserChoice(choice);
    setShowResult(true);
  };

  const resetScenario = () => {
    setSelectedScenario(null);
    setUserChoice(null);
    setShowResult(false);
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'switch': return Cpu;
      case 'router': return Router;
      case 'hub': return Wifi;
      default: return Cpu;
    }
  };

  const getDeviceColor = (device: string) => {
    switch (device) {
      case 'switch': return 'text-green-600';
      case 'router': return 'text-purple-600';
      case 'hub': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <section className="mb-12 sm:mb-20">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12 text-center px-4">
        Device Comparison
      </h2>

      {/* Comparison Table */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        {learningMode === 'exam' && (
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Device Comparison Study Guide
            </h3>
          </div>
        )}

        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
          📊 Switch vs Router vs Hub
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-600">
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Feature</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-green-700 dark:text-green-300 text-sm sm:text-base">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4" />
                    <span>Switch</span>
                  </div>
                </th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-purple-700 dark:text-purple-300 text-sm sm:text-base">
                  <div className="flex items-center space-x-2">
                    <Router className="w-4 h-4" />
                    <span>Router</span>
                  </div>
                </th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-orange-700 dark:text-orange-300 text-sm sm:text-base">
                  <div className="flex items-center space-x-2">
                    <Wifi className="w-4 h-4" />
                    <span>Hub</span>
                  </div>
                </th>
                {learningMode === 'visualize' && (
                  <th className="text-center py-3 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Best</th>
                )}
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-2 sm:px-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">
                    {row.aspect}
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                    {row.switch}
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                    {row.router}
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                    {row.hub}
                  </td>
                  {learningMode === 'visualize' && (
                    <td className="py-3 px-2 sm:px-4 text-center">
                      {row.winner !== 'context' && (
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          row.winner === 'switch' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                            : row.winner === 'router'
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200'
                            : 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200'
                        }`}>
                          <Trophy className="w-3 h-3 mr-1" />
                          {row.winner === 'switch' ? 'Switch' : row.winner === 'router' ? 'Router' : 'Hub'}
                        </div>
                      )}
                      {row.winner === 'context' && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">Depends</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {learningMode === 'exam' && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-700">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2 text-sm sm:text-base">
              📝 Key Selection Criteria:
            </h4>
            <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• <strong>Switch:</strong> Best for LAN connectivity, high performance, collision elimination</li>
              <li>• <strong>Router:</strong> Essential for network interconnection, internet access, broadcast control</li>
              <li>• <strong>Hub:</strong> Obsolete technology, only for legacy or very simple/cheap setups</li>
              <li>• <strong>Modern networks:</strong> Typically use switches for LAN and routers for WAN connectivity</li>
            </ul>
          </div>
        )}
      </div>

      {/* Interactive Scenario Game - Visualize Mode */}
      {learningMode === 'visualize' && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
          <div className="flex items-center space-x-3 mb-6">
            <Trophy className="w-6 h-6 text-yellow-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              🎯 Device Selection Challenge
            </h3>
          </div>

          {!selectedScenario ? (
            <div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center mb-6">
                Choose a scenario and select the best network device!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {scenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => setSelectedScenario(scenario.id)}
                    className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50 rounded-xl transition-all duration-300 text-left border border-blue-200 dark:border-blue-700"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                      {scenario.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {scenario.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {scenario.requirements.map((req, index) => (
                        <span key={index} className="px-2 py-1 bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded text-xs">
                          {req}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {!showResult ? (
                <div>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-4 sm:p-6 mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-lg">
                      Scenario: {scenarios.find(s => s.id === selectedScenario)?.title}
                    </h4>
                    <p className="text-xs sm:text-base text-gray-600 dark:text-gray-300 mb-3">
                      {scenarios.find(s => s.id === selectedScenario)?.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Requirements:</span>
                      {scenarios.find(s => s.id === selectedScenario)?.requirements.map((req, index) => (
                        <span key={index} className="px-2 py-1 bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded text-xs">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-center text-gray-700 dark:text-gray-300 mb-6 text-sm sm:text-base">
                    Which network device would be best for this scenario?
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { key: 'switch', name: 'Switch', icon: Cpu, color: 'green' },
                      { key: 'router', name: 'Router', icon: Router, color: 'purple' },
                      { key: 'hub', name: 'Hub', icon: Wifi, color: 'orange' }
                    ].map((device) => {
                      const Icon = device.icon;
                      return (
                        <button
                          key={device.key}
                          onClick={() => handleScenarioChoice(device.key as 'switch' | 'router' | 'hub')}
                          className={`p-4 sm:p-6 rounded-xl transition-all duration-300 border-2 ${
                            device.color === 'green' 
                              ? 'bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 border-green-200 dark:border-green-700'
                              : device.color === 'purple'
                              ? 'bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 border-purple-200 dark:border-purple-700'
                              : 'bg-orange-100 dark:bg-orange-900/30 hover:bg-orange-200 dark:hover:bg-orange-900/50 border-orange-200 dark:border-orange-700'
                          }`}
                        >
                          <Icon className={`w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 ${
                            device.color === 'green' ? 'text-green-600' : 
                            device.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                          }`} />
                          <h5 className={`font-semibold mb-2 text-sm sm:text-base ${
                            device.color === 'green' ? 'text-green-800 dark:text-green-200' : 
                            device.color === 'purple' ? 'text-purple-800 dark:text-purple-200' : 'text-orange-800 dark:text-orange-200'
                          }`}>
                            {device.name}
                          </h5>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  {(() => {
                    const scenario = scenarios.find(s => s.id === selectedScenario);
                    const isCorrect = userChoice === scenario?.correct;
                    
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
                        
                        <h4 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white text-center mb-4">
                          {isCorrect ? 'Excellent Choice! 🎉' : 'Not the best option! 🤔'}
                        </h4>
                        
                        <p className="text-center text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">
                          The best choice is: <strong className="capitalize">{scenario?.correct}</strong>
                        </p>
                        
                        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 sm:p-4 mb-6">
                          <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed text-xs sm:text-sm">
                            {scenario?.explanation}
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <button
                            onClick={resetScenario}
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
          )}
        </div>
      )}

      {/* Exam Mode Study Questions */}
      {learningMode === 'exam' && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Device Comparison - Exam Questions
            </h3>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 text-sm sm:text-base">
                Q1: Compare collision and broadcast domain characteristics of switches, routers, and hubs.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Hub:</strong> Single collision domain, single broadcast domain for all ports. 
                  <strong>Switch:</strong> Separate collision domain per port, single broadcast domain for all ports. 
                  <strong>Router:</strong> Separate collision domain per port, separate broadcast domain per interface.
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3 text-sm sm:text-base">
                Q2: When would you choose a switch over a router for network connectivity?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  Choose switches for: (1) <strong>LAN connectivity</strong> - connecting devices within same network, 
                  (2) <strong>High performance</strong> - hardware-based forwarding, (3) <strong>Cost efficiency</strong> - 
                  lower cost per port, (4) <strong>Simple setup</strong> - plug-and-play operation. Routers needed 
                  for internetwork connectivity and broadcast domain separation.
                </p>
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 text-sm sm:text-base">
                Q3: Explain why hubs are considered obsolete in modern networking.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  Hubs are obsolete because: (1) <strong>Security issues</strong> - all data broadcast to all ports, 
                  (2) <strong>Performance problems</strong> - shared bandwidth and collision domains, (3) <strong>Half-duplex</strong> - 
                  cannot send/receive simultaneously, (4) <strong>No intelligence</strong> - no learning or filtering. 
                  Switches provide all hub functionality plus intelligence, security, and performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DeviceComparison;