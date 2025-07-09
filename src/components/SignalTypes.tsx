import React, { useState } from 'react';
import { Zap, Radio, BookOpen, FileText } from 'lucide-react';

interface SignalTypesProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const SignalTypes: React.FC<SignalTypesProps> = ({ learningMode, isDarkMode }) => {
  const [selectedSignal, setSelectedSignal] = useState<'analog' | 'digital' | null>(null);

  const signalTypes = {
    analog: {
      name: 'Analog Signals',
      description: 'Continuous signals that vary smoothly over time',
      icon: Radio,
      color: 'blue',
      characteristics: [
        'Continuous waveform',
        'Infinite possible values',
        'Susceptible to noise',
        'Natural representation'
      ],
      examples: ['Sound waves', 'Radio waves', 'Temperature variations'],
      advantages: ['Natural representation', 'Infinite resolution', 'Simple transmission'],
      disadvantages: ['Noise accumulation', 'Difficult to process', 'Signal degradation'],
      examDetails: {
        definition: 'Signals that vary continuously in amplitude and time, representing information as continuous waveforms',
        properties: ['Amplitude', 'Frequency', 'Phase', 'Wavelength'],
        modulation: ['AM (Amplitude Modulation)', 'FM (Frequency Modulation)', 'PM (Phase Modulation)']
      }
    },
    digital: {
      name: 'Digital Signals',
      description: 'Discrete signals with distinct voltage levels',
      icon: Zap,
      color: 'green',
      characteristics: [
        'Discrete voltage levels',
        'Binary representation (0s and 1s)',
        'Noise resistant',
        'Easy to process'
      ],
      examples: ['Computer data', 'Digital audio', 'Network packets'],
      advantages: ['Noise immunity', 'Easy processing', 'Error detection/correction', 'Regeneration'],
      disadvantages: ['Bandwidth requirements', 'Quantization errors', 'Complex equipment'],
      examDetails: {
        definition: 'Signals that represent information using discrete voltage levels, typically binary (0 and 1)',
        encoding: ['NRZ (Non-Return-to-Zero)', 'Manchester', 'Differential Manchester'],
        modulation: ['ASK (Amplitude Shift Keying)', 'FSK (Frequency Shift Keying)', 'PSK (Phase Shift Keying)']
      }
    }
  };

  const encodingTechniques = [
    {
      name: 'NRZ (Non-Return-to-Zero)',
      fullForm: 'Non-Return-to-Zero',
      description: 'Signal level represents the bit value directly',
      characteristics: ['Simple implementation', 'No clock recovery', 'DC component present'],
      types: ['NRZ-L (Level)', 'NRZ-I (Inverted)']
    },
    {
      name: 'Manchester Encoding',
      fullForm: 'Manchester Encoding',
      description: 'Each bit period is divided into two halves with opposite signal levels',
      characteristics: ['Self-synchronizing', 'No DC component', 'Double bandwidth requirement'],
      types: ['Manchester', 'Differential Manchester']
    },
    {
      name: 'ASK (Amplitude Shift Keying)',
      fullForm: 'Amplitude Shift Keying',
      description: 'Information is encoded by varying the amplitude of the carrier signal',
      characteristics: ['Simple implementation', 'Susceptible to noise', 'Used in fiber optics'],
      applications: ['Fiber optic communication', 'Infrared communication']
    }
  ];

  return (
    <section className="mb-12 sm:mb-20">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12 text-center px-4">
        Signal Types & Encoding
      </h2>

      {/* Signal Types Comparison */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        <div className="flex items-center space-x-3 mb-6">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
            Analog vs Digital Signals
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {Object.entries(signalTypes).map(([key, signal]) => {
            const Icon = signal.icon;
            const isSelected = selectedSignal === key;
            
            return (
              <div
                key={key}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? signal.color === 'blue' 
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600 shadow-lg' 
                      : 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-600 shadow-lg'
                    : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:shadow-md'
                }`}
                onClick={() => setSelectedSignal(isSelected ? null : key as 'analog' | 'digital')}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Icon className={`w-8 h-8 ${
                    signal.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                  }`} />
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    {signal.name}
                  </h4>
                </div>
                
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {signal.description}
                </p>

                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Characteristics:</h5>
                    <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                      {signal.characteristics.map((char, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-1.5 flex-shrink-0"></span>
                          <span>{char}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-green-700 dark:text-green-300 text-xs mb-1">Advantages:</h6>
                      <ul className="text-xs text-gray-600 dark:text-gray-300">
                        {signal.advantages.slice(0, 2).map((adv, index) => (
                          <li key={index}>• {adv}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-red-700 dark:text-red-300 text-xs mb-1">Disadvantages:</h6>
                      <ul className="text-xs text-gray-600 dark:text-gray-300">
                        {signal.disadvantages.slice(0, 2).map((dis, index) => (
                          <li key={index}>• {dis}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                        <h6 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Technical Details:</h6>
                        <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                          {signal.examDetails.definition}
                        </p>
                        <div className="space-y-2">
                          {signal.examDetails.properties && (
                            <div>
                              <span className="font-medium text-gray-900 dark:text-white text-xs">Properties:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {signal.examDetails.properties.map((prop, index) => (
                                  <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded text-xs">
                                    {prop}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {signal.examDetails.encoding && (
                            <div>
                              <span className="font-medium text-gray-900 dark:text-white text-xs">Encoding:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {signal.examDetails.encoding.map((enc, index) => (
                                  <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded text-xs">
                                    {enc}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white text-xs">Modulation:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {signal.examDetails.modulation.map((mod, index) => (
                                <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded text-xs">
                                  {mod}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Encoding Techniques */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0">
        <div className="flex items-center space-x-3 mb-6">
          <Zap className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
            Digital Encoding Techniques
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {encodingTechniques.map((technique, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-600"
            >
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {technique.name}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                {technique.fullForm}
              </p>
              
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {technique.description}
              </p>

              <div className="space-y-3">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Characteristics:</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                    {technique.characteristics.map((char, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></span>
                        <span>{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {technique.types && (
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Types:</h5>
                    <div className="flex flex-wrap gap-1">
                      {technique.types.map((type, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded text-xs">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {technique.applications && (
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Applications:</h5>
                    <div className="flex flex-wrap gap-1">
                      {technique.applications.map((app, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded text-xs">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exam Questions */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0 mt-8">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="w-6 h-6 text-orange-600" />
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
            Signal Types - Exam Questions
          </h3>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 text-sm sm:text-base">
              Q1: Compare analog and digital signals in terms of noise immunity and processing.
            </h4>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                <strong>Analog:</strong> Susceptible to noise accumulation, difficult to regenerate, simple transmission. 
                <strong>Digital:</strong> High noise immunity, easy regeneration, complex processing but error detection/correction possible. 
                Digital signals can be perfectly reconstructed while analog signals degrade with distance.
              </p>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
            <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3 text-sm sm:text-base">
              Q2: Explain Manchester encoding and its advantages over NRZ encoding.
            </h4>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                <strong>Manchester:</strong> Each bit represented by signal transition (high-to-low or low-to-high). 
                <strong>Advantages over NRZ:</strong> Self-synchronizing (clock recovery possible), no DC component, 
                better error detection. <strong>Disadvantage:</strong> Requires double bandwidth compared to NRZ.
              </p>
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
            <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 text-sm sm:text-base">
              Q3: What are the different types of digital modulation techniques?
            </h4>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                <strong>ASK (Amplitude Shift Keying):</strong> Varies amplitude to represent bits. 
                <strong>FSK (Frequency Shift Keying):</strong> Varies frequency to represent bits. 
                <strong>PSK (Phase Shift Keying):</strong> Varies phase to represent bits. 
                Each has different noise immunity and bandwidth requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignalTypes;