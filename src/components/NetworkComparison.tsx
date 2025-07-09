import React, { useState, useEffect } from 'react';
import { Users, Server, ArrowRight, Play, Pause, RotateCcw } from 'lucide-react';

interface NetworkComparisonProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const NetworkComparison: React.FC<NetworkComparisonProps> = ({ learningMode, isDarkMode }) => {
  const [activeDemo, setActiveDemo] = useState<'p2p' | 'client-server' | null>(null);
  const [animationStep, setAnimationStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [demoText, setDemoText] = useState('');

  const p2pSteps = [
    "Peer 1 wants to share a file with Peer 3",
    "Peer 1 sends the file directly to Peer 3",
    "Peer 3 receives the file successfully",
    "Now Peer 3 can share with others directly",
    "All peers can communicate with each other"
  ];

  const clientServerSteps = [
    "Client 1 wants to access a website",
    "Client 1 sends request to the server",
    "Server processes the request",
    "Server sends response back to Client 1",
    "All clients must go through the server"
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && activeDemo) {
      const steps = activeDemo === 'p2p' ? p2pSteps : clientServerSteps;
      interval = setInterval(() => {
        setAnimationStep((prev) => {
          const next = (prev + 1) % steps.length;
          setDemoText(steps[next]);
          return next;
        });
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, activeDemo]);

  const startDemo = (type: 'p2p' | 'client-server') => {
    setActiveDemo(type);
    setAnimationStep(0);
    setIsPlaying(true);
    const steps = type === 'p2p' ? p2pSteps : clientServerSteps;
    setDemoText(steps[0]);
  };

  const pauseDemo = () => {
    setIsPlaying(false);
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setAnimationStep(0);
    setDemoText('');
    setActiveDemo(null);
  };

  return (
    <section className="mb-20">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
        Network Architectures
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Peer-to-Peer */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
              Peer-to-Peer (P2P)
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => startDemo('p2p')}
                disabled={isPlaying && activeDemo === 'p2p'}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl transition-all duration-300 shadow-lg"
              >
                <Play className="w-4 h-4" />
                <span className="hidden sm:inline">Demo</span>
              </button>
              {activeDemo === 'p2p' && (
                <>
                  <button
                    onClick={pauseDemo}
                    className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl transition-colors"
                  >
                    <Pause className="w-4 h-4" />
                  </button>
                  <button
                    onClick={resetDemo}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {learningMode === 'visualize' ? (
            <div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                Like a group of friends sharing snacks - everyone can give and receive from anyone else directly!
              </p>
              
              <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-6 mb-6 min-h-[200px] flex flex-col justify-center">
                <div className="flex flex-wrap justify-center items-center gap-3 sm:flex-nowrap sm:space-x-8 max-w-xs sm:max-w-none mx-auto mb-4">
                  {[1, 2, 3, 4].map((node) => (
                    <div key={node} className="relative">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold transition-all duration-500 ${
                        activeDemo === 'p2p' && isPlaying && (
                          (animationStep === 0 && node === 1) ||
                          (animationStep === 1 && (node === 1 || node === 3)) ||
                          (animationStep === 2 && node === 3) ||
                          (animationStep === 3 && node === 3) ||
                          (animationStep === 4)
                        ) ? 'animate-pulse scale-110 ring-4 ring-blue-300' : ''
                      }`}>
                        {node}
                      </div>
                      {activeDemo === 'p2p' && isPlaying && animationStep === 1 && node === 1 && (
                        <ArrowRight className="absolute top-1/2 -right-4 sm:-right-6 transform -translate-y-1/2 w-4 h-4 sm:w-6 sm:h-6 text-blue-600 animate-bounce" />
                      )}
                    </div>
                  ))}
                </div>
                
                {activeDemo === 'p2p' && demoText && (
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 mx-4">
                    <p className="text-center text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                      {demoText}
                    </p>
                  </div>
                )}
                
                {!activeDemo && (
                  <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                    Each device can communicate directly with any other device
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">No central server needed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">Everyone shares resources</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-600 text-xl">×</span>
                  <span className="text-gray-600 dark:text-gray-300">Harder to manage security</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                All nodes have equal status and can act as both client and server.
              </p>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Characteristics:</h4>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Decentralized architecture</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Resource sharing between peers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span>Lower infrastructure cost</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span>Limited scalability</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Client-Server */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
              Client-Server
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => startDemo('client-server')}
                disabled={isPlaying && activeDemo === 'client-server'}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl transition-all duration-300 shadow-lg"
              >
                <Play className="w-4 h-4" />
                <span className="hidden sm:inline">Demo</span>
              </button>
              {activeDemo === 'client-server' && (
                <>
                  <button
                    onClick={pauseDemo}
                    className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl transition-colors"
                  >
                    <Pause className="w-4 h-4" />
                  </button>
                  <button
                    onClick={resetDemo}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {learningMode === 'visualize' ? (
            <div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                Like ordering from a restaurant - there's one kitchen (server) that serves many customers (clients)!
              </p>
              
              <div className="relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl p-6 mb-6 min-h-[200px] flex flex-col justify-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-green-600 rounded-2xl flex items-center justify-center text-white font-bold transition-all duration-500 ${
                    activeDemo === 'client-server' && isPlaying && (animationStep === 2 || animationStep === 3) ? 'animate-pulse scale-110 ring-4 ring-green-300' : ''
                  }`}>
                    <Server className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">SERVER</p>
                  
                  {activeDemo === 'client-server' && isPlaying && (animationStep === 1 || animationStep === 3) && (
                    <div className="flex flex-col space-y-1">
                      {[1, 2, 3].map((i) => (
                        <ArrowRight 
                          key={i} 
                          className={`w-4 h-4 sm:w-6 sm:h-6 text-green-600 animate-bounce ${animationStep === 3 ? 'rotate-180' : ''}`} 
                          style={{ animationDelay: `${i * 0.2}s` }} 
                        />
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-center space-x-2 sm:space-x-4">
                    {[1, 2, 3, 4].map((node) => (
                      <div key={node} className={`w-10 h-10 sm:w-12 sm:h-12 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm transition-all duration-500 ${
                        activeDemo === 'client-server' && isPlaying && (
                          (animationStep === 0 && node === 1) ||
                          (animationStep === 1 && node === 1) ||
                          (animationStep === 4 && node === 1)
                        ) ? 'animate-pulse scale-110 ring-4 ring-gray-300' : ''
                      }`}>
                        <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">CLIENTS</p>
                </div>
                
                {activeDemo === 'client-server' && demoText && (
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 mt-4">
                    <p className="text-center text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                      {demoText}
                    </p>
                  </div>
                )}
                
                {!activeDemo && (
                  <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
                    All clients request services from the central server
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">Centralized control</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">Better security</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-600 text-xl">×</span>
                  <span className="text-gray-600 dark:text-gray-300">Single point of failure</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Dedicated server provides services to multiple client nodes.
              </p>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Characteristics:</h4>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Centralized architecture</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Dedicated server hardware</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span>Better performance and security</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span>Higher infrastructure cost</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Table for Exam Mode */}
      {learningMode === 'exam' && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-600">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Architecture Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-600">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white text-lg">Aspect</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white text-lg">Peer-to-Peer</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white text-lg">Client-Server</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Cost</td>
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-300">Low</td>
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-300">High</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Scalability</td>
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-300">Limited</td>
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-300">High</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Security</td>
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-300">Moderate</td>
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-300">High</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Management</td>
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-300">Difficult</td>
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-300">Easy</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Reliability</td>
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-300">High (distributed)</td>
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-300">Moderate (single point)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default NetworkComparison;