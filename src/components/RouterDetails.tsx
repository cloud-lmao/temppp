import React, { useState, useEffect } from 'react';
import { Router, Globe, Route, Shield, Play, Pause, RotateCcw, BookOpen, FileText, ArrowRight } from 'lucide-react';

interface RouterDetailsProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const RouterDetails: React.FC<RouterDetailsProps> = ({ learningMode, isDarkMode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [routingTable, setRoutingTable] = useState<{[key: string]: string}>({});
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const routingSteps = [
    {
      id: 1,
      name: "Packet Arrives",
      description: "Data packet enters router",
      detail: "Router receives packet and examines destination IP address",
      visual: "📦 Packet In",
      color: "blue",
      routingAction: "Check destination IP"
    },
    {
      id: 2,
      name: "Routing Table Lookup",
      description: "Find best path to destination",
      detail: "Router searches routing table for best matching route",
      visual: "🗺️ Route Lookup",
      color: "green",
      routingAction: "Search routing table"
    },
    {
      id: 3,
      name: "Path Selection",
      description: "Choose optimal route",
      detail: "Router selects best path based on metrics like hop count, cost",
      visual: "🎯 Path Select",
      color: "purple",
      routingAction: "Select best route"
    },
    {
      id: 4,
      name: "Forward Packet",
      description: "Send to next hop",
      detail: "Packet forwarded to next router or destination network",
      visual: "📤 Forward",
      color: "orange",
      routingAction: "Send to next hop"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const next = (prev + 1) % routingSteps.length;
          
          // Simulate routing table
          if (next === 1) {
            setRoutingTable({
              '192.168.1.0/24': 'Interface 1',
              '10.0.0.0/8': 'Interface 2',
              '0.0.0.0/0': 'Gateway (Internet)'
            });
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
    setRoutingTable({});
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
        Routers - Network Gateways
      </h2>

      {/* Definition Panel */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        {learningMode === 'exam' && (
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Network Routers - Study Guide
            </h3>
          </div>
        )}

        {learningMode === 'visualize' ? (
          <div>
            <div className="text-center mb-6 sm:mb-8">
              <img 
                src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg" 
                alt="Network router"
                className="w-full h-32 sm:h-48 md:h-64 object-cover rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-lg"
              />
            </div>
            <h3 className="text-xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
              Like a GPS Navigator
            </h3>
            <p className="text-base sm:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 text-center leading-relaxed px-2">
              A <Tooltip term="Router" definition="Layer 3 device that forwards packets between different networks using IP addresses" /> is like a GPS navigator for data. 
              It knows about different networks (like different cities) and finds the best path to get your data to its destination across the internet.
            </p>
            
            {/* Router Operation Animation */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h4 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                🌐 Router Path Finding Process
              </h4>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause' : 'Start'} Routing</span>
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
                {routingSteps.map((step, index) => {
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

              {/* Routing Table */}
              {Object.keys(routingTable).length > 0 && (
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 sm:p-6">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-4 text-center text-sm sm:text-base">
                    🗺️ Routing Table
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-600">
                          <th className="text-left py-2 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">Network</th>
                          <th className="text-left py-2 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">Next Hop</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(routingTable).map(([network, nextHop]) => (
                          <tr key={network} className="border-b border-gray-100 dark:border-gray-700">
                            <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-mono">{network}</td>
                            <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{nextHop}</td>
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
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Globe className="w-8 h-8 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Network Connection</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Connects different networks together
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Route className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Path Finding</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Finds best route to destination networks
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-green-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Broadcast Control</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Each interface creates separate broadcast domain
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl sm:rounded-2xl shadow-lg">
                <Router className="w-8 h-8 sm:w-12 sm:h-12 text-orange-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Internet Access</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Provides gateway to the internet
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
                <strong>Router:</strong> A Layer 3 (Network) device that forwards packets between different networks 
                based on IP addresses. It maintains routing tables, determines optimal paths, and creates separate 
                broadcast domains for each interface while providing internetwork connectivity.
              </p>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <strong>Key Characteristic:</strong> Routers operate at Layer 3, making forwarding decisions 
                  based on destination IP addresses and network topology information.
                </p>
              </div>
            </div>

            {/* Router Functions */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="text-lg sm:text-xl font-semibold text-blue-900 dark:text-blue-200 mb-4">
                ⚙️ Primary Router Functions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    Routing Functions
                  </h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>Path determination:</strong> Find best route to destination</li>
                    <li>• <strong>Packet forwarding:</strong> Send packets to next hop</li>
                    <li>• <strong>Route learning:</strong> Build and maintain routing tables</li>
                    <li>• <strong>Load balancing:</strong> Distribute traffic across paths</li>
                  </ul>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    Network Functions
                  </h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>Internetwork connectivity:</strong> Connect different networks</li>
                    <li>• <strong>Broadcast domain separation:</strong> Control broadcast traffic</li>
                    <li>• <strong>Protocol conversion:</strong> Handle different network types</li>
                    <li>• <strong>Access control:</strong> Filter traffic between networks</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Routing Protocols */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="text-lg sm:text-xl font-semibold text-green-900 dark:text-green-200 mb-4">
                🗺️ Routing Protocols
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Interior Gateway Protocols (IGP):</h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>RIP:</strong> Distance vector, hop count metric</li>
                    <li>• <strong>OSPF:</strong> Link state, cost-based routing</li>
                    <li>• <strong>EIGRP:</strong> Hybrid, multiple metrics</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Exterior Gateway Protocols (EGP):</h5>
                  <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>BGP:</strong> Path vector, policy-based routing</li>
                    <li>• <strong>Used between:</strong> Different autonomous systems</li>
                    <li>• <strong>Internet backbone:</strong> Primary internet routing protocol</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Router Types */}
            <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-4 sm:p-6 border border-orange-200 dark:border-orange-700">
              <h4 className="text-lg sm:text-xl font-semibold text-orange-900 dark:text-orange-200 mb-4">
                🔧 Types of Routers
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">Home/SOHO</h6>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Basic routing, NAT, DHCP, WiFi</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">Enterprise</h6>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Advanced features, VPN, QoS</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">Core</h6>
                  <p className="text-xs text-gray-600 dark:text-gray-400">High-speed backbone routing</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">Edge</h6>
                  <p className="text-xs text-gray-600 dark:text-gray-400">ISP connection, security</p>
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
                    <strong>Layer 3 operation:</strong> Uses IP addresses for routing decisions
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Broadcast domains:</strong> Each interface creates separate broadcast domain
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Routing table:</strong> Contains network destinations and next hop information
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Default route:</strong> 0.0.0.0/0 used when no specific route exists
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
              Network Routers - Exam Questions
            </h3>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 text-sm sm:text-base">
                Q1: Explain the routing process and how routers make forwarding decisions.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Answer:</strong> Router receives packet, examines destination IP address, searches routing 
                  table for best matching route (longest prefix match), selects next hop based on routing metrics, 
                  decrements TTL, recalculates checksum, and forwards packet to next hop interface. If no route 
                  exists, packet is dropped or sent to default gateway.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 text-sm sm:text-base">
                Q2: Compare distance vector and link state routing protocols.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Distance Vector (RIP):</strong> Shares routing table with neighbors, uses hop count, 
                  slower convergence, routing by rumor. <strong>Link State (OSPF):</strong> Shares link state 
                  information, builds topology map, faster convergence, more CPU/memory intensive, 
                  hierarchical design with areas.
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3 text-sm sm:text-base">
                Q3: What is the difference between routers and Layer 3 switches?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Traditional Routers:</strong> Software-based routing, more features (NAT, VPN, firewall), 
                  higher latency, better for WAN connections. <strong>Layer 3 Switches:</strong> Hardware-based 
                  routing (ASIC), faster packet processing, optimized for LAN routing, limited WAN features, 
                  combines switching and routing in one device.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RouterDetails;