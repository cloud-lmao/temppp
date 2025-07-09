import React, { useState } from 'react';
import { Smartphone, Home, Building, Globe, Wifi, Cable } from 'lucide-react';

interface NetworkTypesProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const NetworkTypes: React.FC<NetworkTypesProps> = ({ learningMode, isDarkMode }) => {
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);

  const networkTypes = [
    {
      id: 'pan',
      name: 'PAN',
      fullName: 'Personal Area Network',
      range: '1-10 meters',
      icon: Smartphone,
      color: 'blue',
      description: learningMode === 'visualize' 
        ? 'Your personal bubble of connected devices - like your phone, smartwatch, and earbuds talking to each other!'
        : 'A network connecting devices within personal workspace, typically within 10 meters.',
      examples: ['Bluetooth headphones', 'Smartwatch to phone', 'Wireless mouse to laptop'],
      image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg'
    },
    {
      id: 'lan',
      name: 'LAN',
      fullName: 'Local Area Network',
      range: '100 meters - 1 km',
      icon: Home,
      color: 'green',
      description: learningMode === 'visualize'
        ? 'Like your home WiFi - connects all devices in your house or office so they can share the internet and files!'
        : 'A network that connects devices within a limited area like home, office, or school.',
      examples: ['Home WiFi network', 'Office network', 'School computer lab'],
      image: 'https://images.pexels.com/photos/4031818/pexels-photo-4031818.jpeg'
    },
    {
      id: 'man',
      name: 'MAN',
      fullName: 'Metropolitan Area Network',
      range: '5-50 km',
      icon: Building,
      color: 'purple',
      description: learningMode === 'visualize'
        ? 'Connects multiple buildings in a city - like linking all branches of a bank or connecting schools in a district!'
        : 'A network that spans a city or metropolitan area, connecting multiple LANs.',
      examples: ['City government network', 'University campus', 'Cable TV network'],
      image: 'https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg'
    },
    {
      id: 'wan',
      name: 'WAN',
      fullName: 'Wide Area Network',
      range: 'Unlimited (Global)',
      icon: Globe,
      color: 'red',
      description: learningMode === 'visualize'
        ? 'The biggest network of all - the Internet! Connects computers worldwide so you can chat with friends anywhere!'
        : 'A network that covers large geographical areas, often connecting multiple countries.',
      examples: ['The Internet', 'Corporate global network', 'Satellite networks'],
      image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-600',
      green: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-600',
      purple: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700 text-purple-600',
      red: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Network Types
      </h2>

      {/* Network Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {networkTypes.map((network) => {
          const Icon = network.icon;
          return (
            <div
              key={network.id}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedNetwork === network.id ? 'ring-4 ring-blue-300' : ''
              }`}
              onClick={() => setSelectedNetwork(selectedNetwork === network.id ? null : network.id)}
            >
              <div className={`p-4 rounded-lg ${getColorClasses(network.color)} mb-4`}>
                <Icon className="w-8 h-8 mx-auto" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
                {network.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-3">
                {network.fullName}
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 text-center">
                  Range: {network.range}
                </p>
              </div>

              {learningMode === 'visualize' && (
                <img 
                  src={network.image} 
                  alt={network.name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
              )}

              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                {network.description}
              </p>

              {selectedNetwork === network.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Examples:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {network.examples.map((example, index) => (
                      <li key={index}>• {example}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive Network Demonstration */}
      {learningMode === 'visualize' && (
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            📡 See Networks in Action
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Wifi className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Wireless Networks</h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>Speed:</span>
                    <span className="font-medium">Good (up to 1 Gbps)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Setup:</span>
                    <span className="font-medium">Easy</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mobility:</span>
                    <span className="font-medium">High</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interference:</span>
                    <span className="font-medium">Possible</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Cable className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Wired Networks</h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>Speed:</span>
                    <span className="font-medium">Excellent (up to 10 Gbps)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Setup:</span>
                    <span className="font-medium">Complex</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mobility:</span>
                    <span className="font-medium">Limited</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interference:</span>
                    <span className="font-medium">None</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Summary for Exam Mode */}
      {learningMode === 'exam' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Network Types Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Range</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Key Use</th>
                </tr>
              </thead>
              <tbody>
                {networkTypes.map((network) => (
                  <tr key={network.id} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{network.fullName}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{network.range}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{network.examples[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default NetworkTypes;