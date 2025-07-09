import React, { useState } from 'react';
import { Cable, Wifi, Zap, Shield, CheckCircle, XCircle, Trophy, BookOpen, FileText } from 'lucide-react';

interface TransmissionMediaProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const TransmissionMedia: React.FC<TransmissionMediaProps> = ({ learningMode, isDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<'guided' | 'unguided' | null>(null);
  const [gameScenario, setGameScenario] = useState<string | null>(null);
  const [gameAnswer, setGameAnswer] = useState<string | null>(null);
  const [showGameResult, setShowGameResult] = useState(false);

  const mediaTypes = {
    guided: {
      name: 'Guided Media',
      description: 'Physical cables that guide signals along a specific path',
      icon: Cable,
      color: 'blue',
      types: [
        {
          name: 'Twisted Pair Cable',
          fullForm: 'Twisted Pair (TP)',
          speed: 'Up to 10 Gbps',
          cost: 'Low',
          interference: 'Medium',
          useCase: 'Ethernet networks, telephone lines',
          details: 'Two insulated copper wires twisted together to reduce electromagnetic interference',
          examples: ['Cat5e: 1 Gbps', 'Cat6: 10 Gbps', 'Used in offices'],
          examDetails: {
            types: ['UTP (Unshielded)', 'STP (Shielded)', 'FTP (Foiled)'],
            categories: ['Cat5e (1 Gbps)', 'Cat6 (10 Gbps)', 'Cat6a (10 Gbps extended)'],
            advantages: ['Low cost', 'Easy installation', 'Flexible'],
            disadvantages: ['Limited distance', 'Susceptible to interference', 'Lower bandwidth']
          }
        },
        {
          name: 'Coaxial Cable',
          fullForm: 'Coaxial (Coax)',
          speed: 'Up to 1 Gbps',
          cost: 'Medium',
          interference: 'Low',
          useCase: 'Cable TV, broadband internet',
          details: 'Central conductor surrounded by insulation, metallic shield, and outer jacket',
          examples: ['Cable TV', 'BSNL broadband', 'Old Ethernet'],
          examDetails: {
            types: ['Thin coax (10BASE2)', 'Thick coax (10BASE5)', 'Cable TV (RG-6)'],
            structure: ['Inner conductor', 'Dielectric insulator', 'Metallic shield', 'Outer jacket'],
            advantages: ['Better shielding than TP', 'Higher bandwidth', 'Longer distance'],
            disadvantages: ['More expensive than TP', 'Difficult installation', 'Single point of failure']
          }
        },
        {
          name: 'Fiber Optic Cable',
          fullForm: 'Optical Fiber',
          speed: 'Up to 100+ Gbps',
          cost: 'High',
          interference: 'None',
          useCase: 'Long-distance, high-speed networks',
          details: 'Uses light pulses through glass or plastic fibers for data transmission',
          examples: ['Internet backbone', 'Jio Fiber', 'Submarine cables'],
          examDetails: {
            types: ['Single-mode (long distance)', 'Multi-mode (short distance)'],
            components: ['Core', 'Cladding', 'Buffer coating', 'Jacket'],
            advantages: ['Highest bandwidth', 'No electromagnetic interference', 'Secure', 'Long distance'],
            disadvantages: ['Most expensive', 'Fragile', 'Requires special equipment', 'Difficult splicing']
          }
        }
      ]
    },
    unguided: {
      name: 'Unguided Media',
      description: 'Wireless transmission through air, space, or water',
      icon: Wifi,
      color: 'purple',
      types: [
        {
          name: 'Radio Waves',
          fullForm: 'Radio Frequency (RF)',
          speed: 'Up to 1 Gbps',
          cost: 'Medium',
          interference: 'High',
          useCase: 'WiFi, Bluetooth, cellular networks',
          details: 'Electromagnetic waves that can travel through air and penetrate walls',
          examples: ['WiFi (2.4/5 GHz)', 'Bluetooth', '4G/5G cellular'],
          examDetails: {
            frequency: ['VLF (3-30 kHz)', 'LF (30-300 kHz)', 'MF (300 kHz-3 MHz)', 'HF (3-30 MHz)'],
            characteristics: ['Omnidirectional', 'Can penetrate walls', 'Subject to interference'],
            applications: ['AM/FM radio', 'WiFi', 'Cellular communication', 'Bluetooth']
          }
        },
        {
          name: 'Microwaves',
          fullForm: 'Microwave Transmission',
          speed: 'Up to 10 Gbps',
          cost: 'High',
          interference: 'Medium',
          useCase: 'Point-to-point communication, satellite',
          details: 'High-frequency radio waves that travel in straight lines',
          examples: ['Satellite internet', 'Point-to-point links', 'Radar systems'],
          examDetails: {
            frequency: ['1 GHz to 300 GHz'],
            types: ['Terrestrial microwave', 'Satellite microwave'],
            characteristics: ['Line of sight required', 'High frequency', 'Directional antennas'],
            applications: ['Satellite communication', 'Cellular towers', 'Point-to-point links']
          }
        },
        {
          name: 'Infrared',
          fullForm: 'Infrared (IR)',
          speed: 'Up to 16 Mbps',
          cost: 'Low',
          interference: 'Low',
          useCase: 'Short-range communication, remote controls',
          details: 'Light waves just below visible spectrum, requires line of sight',
          examples: ['TV remote', 'IrDA (old phones)', 'Some wireless mice'],
          examDetails: {
            frequency: ['300 GHz to 400 THz'],
            characteristics: ['Line of sight required', 'Cannot penetrate walls', 'Short range'],
            applications: ['Remote controls', 'IrDA communication', 'Optical communication'],
            limitations: ['Blocked by obstacles', 'Affected by sunlight', 'Very short range']
          }
        }
      ]
    }
  };

  const gameScenarios = [
    {
      id: 'home-office',
      title: 'Home Office Setup',
      requirements: ['Low cost', 'Easy installation', 'Moderate speed'],
      description: 'Setting up internet in a small home office, budget is limited',
      correct: 'Twisted Pair Cable',
      explanation: 'Twisted pair is perfect for home/office use - low cost, easy to install, and provides sufficient speed for most applications.'
    },
    {
      id: 'city-backbone',
      title: 'City Internet Backbone',
      requirements: ['Very high speed', 'Long distance', 'No interference'],
      description: 'Connecting internet across a city, need maximum performance',
      correct: 'Fiber Optic Cable',
      explanation: 'Fiber optic is ideal for backbone networks - highest speed, longest distance, and immune to electromagnetic interference.'
    },
    {
      id: 'mobile-hotspot',
      title: 'Mobile Internet Hotspot',
      requirements: ['Wireless', 'Mobile devices', 'Moderate range'],
      description: 'Providing internet access to mobile devices in a café',
      correct: 'Radio Waves',
      explanation: 'Radio waves (WiFi) are perfect for mobile access - wireless, good range, and can penetrate walls to some extent.'
    },
    {
      id: 'satellite-link',
      title: 'Remote Area Communication',
      requirements: ['Very long distance', 'No cables possible', 'Point-to-point'],
      description: 'Connecting a remote research station to the internet',
      correct: 'Microwaves',
      explanation: 'Microwaves (satellite) are ideal for remote areas - can cover very long distances without physical cables.'
    }
  ];

  const handleGameAnswer = (answer: string) => {
    setGameAnswer(answer);
    setShowGameResult(true);
  };

  const resetGame = () => {
    setGameScenario(null);
    setGameAnswer(null);
    setShowGameResult(false);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700',
      purple: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="mb-12 sm:mb-20">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12 text-center px-4">
        Transmission Media
      </h2>

      {/* Category Toggle */}
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8 sm:mb-12 px-4">
        {Object.entries(mediaTypes).map(([key, category]) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === key;
          
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(isSelected ? null : key as 'guided' | 'unguided')}
              className={`flex items-center space-x-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 border-2 ${
                isSelected 
                  ? `${getColorClasses(category.color)} shadow-lg scale-105` 
                  : 'bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-600 hover:shadow-md'
              }`}
            >
              <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${
                isSelected 
                  ? category.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                  : 'text-gray-600 dark:text-gray-300'
              }`} />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {category.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Media Types Display */}
      {selectedCategory && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
          {learningMode === 'exam' && (
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                {mediaTypes[selectedCategory].name} - Study Guide
              </h3>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {mediaTypes[selectedCategory].types.map((media, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-600"
              >
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {media.name}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {media.fullForm}
                </p>
                
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {media.details}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-white/50 dark:bg-gray-600/50 rounded-lg p-2">
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Speed</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{media.speed}</div>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-600/50 rounded-lg p-2">
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Cost</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{media.cost}</div>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-600/50 rounded-lg p-2">
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Interference</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{media.interference}</div>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-600/50 rounded-lg p-2">
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Use Case</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white truncate" title={media.useCase}>
                      {media.useCase}
                    </div>
                  </div>
                </div>

                {learningMode === 'visualize' ? (
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Examples:</h5>
                    <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                      {media.examples.map((example, idx) => (
                        <li key={idx}>• {example}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {media.examDetails.types && (
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">Types:</h5>
                        <div className="flex flex-wrap gap-1">
                          {media.examDetails.types.map((type, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded text-xs">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <h6 className="font-medium text-green-700 dark:text-green-300 text-xs mb-1">Advantages:</h6>
                        <ul className="text-xs text-gray-600 dark:text-gray-300">
                          {media.examDetails.advantages.slice(0, 2).map((adv, idx) => (
                            <li key={idx}>• {adv}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-medium text-red-700 dark:text-red-300 text-xs mb-1">Disadvantages:</h6>
                        <ul className="text-xs text-gray-600 dark:text-gray-300">
                          {media.examDetails.disadvantages.slice(0, 2).map((dis, idx) => (
                            <li key={idx}>• {dis}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Media Selection Game - Visualize Mode Only */}
      {learningMode === 'visualize' && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
          <div className="flex items-center space-x-3 mb-6">
            <Trophy className="w-6 h-6 text-yellow-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              🎯 Media Selection Challenge
            </h3>
          </div>

          {!gameScenario ? (
            <div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center mb-6">
                Choose a scenario to find the best transmission media!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gameScenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => setGameScenario(scenario.id)}
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
              {!showGameResult ? (
                <div>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-4 sm:p-6 mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-lg">
                      Scenario: {gameScenarios.find(s => s.id === gameScenario)?.title}
                    </h4>
                    <p className="text-xs sm:text-base text-gray-600 dark:text-gray-300 mb-3">
                      {gameScenarios.find(s => s.id === gameScenario)?.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Requirements:</span>
                      {gameScenarios.find(s => s.id === gameScenario)?.requirements.map((req, index) => (
                        <span key={index} className="px-2 py-1 bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded text-xs">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-center text-gray-700 dark:text-gray-300 mb-6 text-sm sm:text-base">
                    Which transmission media would be best for this scenario?
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {['Twisted Pair Cable', 'Fiber Optic Cable', 'Radio Waves', 'Microwaves'].map((media) => (
                      <button
                        key={media}
                        onClick={() => handleGameAnswer(media)}
                        className="p-3 sm:p-4 bg-gray-100 dark:bg-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 rounded-xl transition-all duration-300 border border-gray-200 dark:border-gray-600 text-sm sm:text-base"
                      >
                        {media}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  {(() => {
                    const scenario = gameScenarios.find(s => s.id === gameScenario);
                    const isCorrect = gameAnswer === scenario?.correct;
                    
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
                          The best choice is: <strong>{scenario?.correct}</strong>
                        </p>
                        
                        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 sm:p-4 mb-6">
                          <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed text-xs sm:text-sm">
                            {scenario?.explanation}
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <button
                            onClick={resetGame}
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
            <FileText className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Transmission Media - Exam Questions
            </h3>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 text-sm sm:text-base">
                Q1: Compare guided and unguided transmission media with examples.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Guided Media:</strong> Physical cables that guide signals (twisted pair, coaxial, fiber optic). 
                  Advantages: Secure, reliable, high speed. <strong>Unguided Media:</strong> Wireless transmission 
                  through air/space (radio, microwave, infrared). Advantages: Mobility, easy installation, no cables.
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3 text-sm sm:text-base">
                Q2: Why is fiber optic cable preferred for long-distance communication?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  Fiber optic offers: (1) <strong>Highest bandwidth</strong> (100+ Gbps), (2) <strong>Longest distance</strong> 
                  without signal degradation, (3) <strong>No electromagnetic interference</strong>, (4) <strong>Secure</strong> 
                  - difficult to tap, (5) <strong>Low signal loss</strong> over long distances.
                </p>
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 text-sm sm:text-base">
                Q3: What factors should be considered when selecting transmission media?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Technical:</strong> Bandwidth requirements, distance, interference levels, security needs. 
                  <strong>Economic:</strong> Installation cost, maintenance cost, equipment cost. 
                  <strong>Environmental:</strong> Physical constraints, weather conditions, electromagnetic environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TransmissionMedia;