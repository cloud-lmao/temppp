import React, { useState } from 'react';
import { Gauge, Clock, Zap, TrendingUp, Calculator, BookOpen, FileText } from 'lucide-react';

interface PerformanceMetricsProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ learningMode, isDarkMode }) => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [calculatorValues, setCalculatorValues] = useState({
    bandwidth: 100,
    packetSize: 1000,
    distance: 1000,
    propagationSpeed: 200000000
  });

  const metrics = [
    {
      id: 'bandwidth',
      name: 'Bandwidth',
      fullForm: 'Maximum Data Capacity',
      icon: Gauge,
      color: 'blue',
      simple: 'How much data can flow through the pipe at once',
      technical: 'The maximum rate of data transfer across a network path, measured in bits per second (bps)',
      analogy: 'Like the width of a highway - wider highway allows more cars',
      unit: 'bps (bits per second)',
      examples: ['Home WiFi: 100 Mbps', 'Fiber: 1 Gbps', '4G: 50 Mbps'],
      examDetails: {
        definition: 'Theoretical maximum data transfer rate of a communication channel',
        factors: ['Physical medium', 'Signal encoding', 'Noise levels', 'Technology standards'],
        types: ['Theoretical bandwidth', 'Effective bandwidth', 'Available bandwidth']
      }
    },
    {
      id: 'throughput',
      name: 'Throughput',
      fullForm: 'Actual Data Transfer Rate',
      icon: TrendingUp,
      color: 'green',
      simple: 'How much data actually gets through in real life',
      technical: 'The actual rate of successful data delivery over a communication channel',
      analogy: 'Like actual cars passing through highway - less than maximum due to traffic',
      unit: 'bps (bits per second)',
      examples: ['WiFi bandwidth: 100 Mbps', 'Actual throughput: 60 Mbps', 'Due to interference'],
      examDetails: {
        definition: 'Actual measured data transfer rate, always less than or equal to bandwidth',
        factors: ['Network congestion', 'Protocol overhead', 'Error rates', 'Hardware limitations'],
        relationship: 'Throughput ≤ Bandwidth'
      }
    },
    {
      id: 'latency',
      name: 'Latency',
      fullForm: 'Transmission Delay',
      icon: Clock,
      color: 'purple',
      simple: 'How long it takes for data to travel from source to destination',
      technical: 'The time delay between the transmission of data and its reception',
      analogy: 'Like travel time from your house to friend\'s house',
      unit: 'ms (milliseconds)',
      examples: ['Local network: 1 ms', 'Internet: 50-100 ms', 'Satellite: 500+ ms'],
      examDetails: {
        definition: 'Total time delay in data transmission from source to destination',
        components: ['Propagation delay', 'Transmission delay', 'Processing delay', 'Queuing delay'],
        formula: 'Latency = Propagation + Transmission + Processing + Queuing'
      }
    },
    {
      id: 'jitter',
      name: 'Jitter',
      fullForm: 'Delay Variation',
      icon: Zap,
      color: 'orange',
      simple: 'How much the delay time varies - inconsistent timing',
      technical: 'The variation in packet arrival times, causing irregular delivery',
      analogy: 'Like buses arriving at random times instead of on schedule',
      unit: 'ms (milliseconds)',
      examples: ['Good: 1-5 ms jitter', 'Bad: 50+ ms jitter', 'Affects video calls'],
      examDetails: {
        definition: 'Variation in packet delay, difference between maximum and minimum latency',
        causes: ['Network congestion', 'Route changes', 'Processing variations', 'Buffer overflow'],
        impact: 'Critical for real-time applications like VoIP and video streaming'
      }
    }
  ];

  const calculateLatency = () => {
    const propagationDelay = calculatorValues.distance / calculatorValues.propagationSpeed * 1000; // Convert to ms
    const transmissionDelay = (calculatorValues.packetSize * 8) / (calculatorValues.bandwidth * 1000000) * 1000; // Convert to ms
    return {
      propagation: propagationDelay.toFixed(2),
      transmission: transmissionDelay.toFixed(2),
      total: (propagationDelay + transmissionDelay).toFixed(2)
    };
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-600',
      green: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-600',
      purple: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700 text-purple-600',
      orange: 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700 text-orange-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="mb-12 sm:mb-20">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12 text-center px-4">
        Performance Metrics
      </h2>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 mx-2 sm:mx-0">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isSelected = selectedMetric === metric.id;
          
          return (
            <div
              key={metric.id}
              className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 cursor-pointer transition-all duration-300 border-2 ${
                isSelected 
                  ? 'border-blue-400 dark:border-blue-500 shadow-2xl scale-105' 
                  : 'border-gray-200 dark:border-gray-600 hover:shadow-2xl hover:scale-102'
              }`}
              onClick={() => setSelectedMetric(isSelected ? null : metric.id)}
            >
              <div className={`p-3 sm:p-4 rounded-lg ${getColorClasses(metric.color)} mb-4`}>
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
                {metric.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center mb-3">
                {metric.fullForm}
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 sm:p-3 mb-4">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 text-center">
                  Unit: {metric.unit}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center">
                {learningMode === 'visualize' ? metric.simple : metric.technical}
              </p>

              {isSelected && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  {learningMode === 'visualize' ? (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Real-world Analogy:</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">{metric.analogy}</p>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Examples:</h4>
                      <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                        {metric.examples.map((example, index) => (
                          <li key={index}>• {example}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Technical Details:</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">{metric.examDetails.definition}</p>
                      <div className="space-y-2">
                        {metric.examDetails.factors && (
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white text-xs">Factors:</span>
                            <ul className="text-xs text-gray-600 dark:text-gray-300 ml-2">
                              {metric.examDetails.factors.map((factor, index) => (
                                <li key={index}>• {factor}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {metric.examDetails.components && (
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white text-xs">Components:</span>
                            <ul className="text-xs text-gray-600 dark:text-gray-300 ml-2">
                              {metric.examDetails.components.map((component, index) => (
                                <li key={index}>• {component}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive Calculator - Visualize Mode Only */}
      {learningMode === 'visualize' && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
          <div className="flex items-center space-x-3 mb-6">
            <Calculator className="w-6 h-6 text-green-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              🧮 Latency Calculator
            </h3>
          </div>
          
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center mb-6">
            Adjust the values to see how different factors affect latency
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bandwidth (Mbps - Megabits per second)
                </label>
                <input
                  type="range"
                  min="1"
                  max="1000"
                  value={calculatorValues.bandwidth}
                  onChange={(e) => setCalculatorValues({...calculatorValues, bandwidth: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {calculatorValues.bandwidth} Mbps
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Packet Size (bytes)
                </label>
                <input
                  type="range"
                  min="64"
                  max="1500"
                  value={calculatorValues.packetSize}
                  onChange={(e) => setCalculatorValues({...calculatorValues, packetSize: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {calculatorValues.packetSize} bytes
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Distance (km - kilometers)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10000"
                  value={calculatorValues.distance}
                  onChange={(e) => setCalculatorValues({...calculatorValues, distance: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {calculatorValues.distance} km
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Signal Speed (m/s - meters per second)
                </label>
                <select
                  value={calculatorValues.propagationSpeed}
                  onChange={(e) => setCalculatorValues({...calculatorValues, propagationSpeed: parseInt(e.target.value)})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value={300000000}>Light in vacuum (300,000 km/s)</option>
                  <option value={200000000}>Light in fiber (200,000 km/s)</option>
                  <option value={200000000}>Electrical in copper (200,000 km/s)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 rounded-xl p-4 sm:p-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
              📊 Calculated Results
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(() => {
                const results = calculateLatency();
                return (
                  <>
                    <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <div className="text-lg sm:text-xl font-bold text-blue-600">{results.propagation} ms</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Propagation Delay</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">Time for signal to travel</div>
                    </div>
                    <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <div className="text-lg sm:text-xl font-bold text-green-600">{results.transmission} ms</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Transmission Delay</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">Time to push all bits</div>
                    </div>
                    <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <div className="text-lg sm:text-xl font-bold text-purple-600">{results.total} ms</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Latency</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">Combined delay</div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Exam Mode Study Questions */}
      {learningMode === 'exam' && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-6 h-6 text-green-600" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Performance Metrics - Exam Questions
            </h3>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 text-sm sm:text-base">
                Q1: Differentiate between bandwidth and throughput with examples.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Bandwidth:</strong> Theoretical maximum data rate (e.g., 100 Mbps WiFi specification). 
                  <strong>Throughput:</strong> Actual achieved data rate (e.g., 60 Mbps due to interference, protocol overhead). 
                  Throughput is always ≤ Bandwidth due to real-world limitations.
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3 text-sm sm:text-base">
                Q2: Explain the components of total network latency.
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Total Latency = Propagation + Transmission + Processing + Queuing.</strong><br/>
                  • <strong>Propagation:</strong> Time for signal to travel distance<br/>
                  • <strong>Transmission:</strong> Time to push all bits onto medium<br/>
                  • <strong>Processing:</strong> Time for device to process packet<br/>
                  • <strong>Queuing:</strong> Time waiting in buffers
                </p>
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 text-sm sm:text-base">
                Q3: Why is jitter particularly problematic for real-time applications?
              </h4>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  Jitter causes irregular packet arrival times, disrupting real-time applications like VoIP and video streaming. 
                  High jitter leads to choppy audio, frozen video frames, and poor user experience. 
                  Solutions include jitter buffers and Quality of Service (QoS) mechanisms.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PerformanceMetrics;