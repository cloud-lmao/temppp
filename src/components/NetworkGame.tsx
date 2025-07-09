import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Loader, AlertCircle } from 'lucide-react';

interface NetworkGameProps {
  learningMode: 'visualize' | 'exam';
  isDarkMode: boolean;
}

const NetworkGame: React.FC<NetworkGameProps> = ({ learningMode, isDarkMode }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const questions = [
    {
      id: 1,
      scenario: "Your smartphone connecting to your wireless earbuds",
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
      options: ["PAN", "LAN", "MAN", "WAN"],
      correct: "PAN",
      explanation: "Bluetooth connection between personal devices = Personal Area Network (PAN). Range is typically 1-10 meters."
    },
    {
      id: 2,
      scenario: "All computers in your school connected to share internet",
      image: "https://images.pexels.com/photos/159213/room-laptop-computer-mac-159213.jpeg",
      options: ["PAN", "LAN", "MAN", "WAN"],
      correct: "LAN",
      explanation: "School network connecting devices in one building = Local Area Network (LAN). Covers up to 1 km range."
    },
    {
      id: 3,
      scenario: "Video calling your friend in another country",
      image: "https://images.pexels.com/photos/4031820/pexels-photo-4031820.jpeg",
      options: ["PAN", "LAN", "MAN", "WAN"],
      correct: "WAN",
      explanation: "International communication uses the Internet = Wide Area Network (WAN). Global coverage with unlimited range."
    },
    {
      id: 4,
      scenario: "City traffic lights controlled from one central office",
      image: "https://images.pexels.com/photos/2449452/pexels-photo-2449452.jpeg",
      options: ["PAN", "LAN", "MAN", "WAN"],
      correct: "MAN",
      explanation: "City-wide system = Metropolitan Area Network (MAN). Covers 5-50 km range across a metropolitan area."
    },
    {
      id: 5,
      scenario: "Connecting your laptop to your home WiFi printer",
      image: "https://images.pexels.com/photos/3846207/pexels-photo-3846207.jpeg",
      options: ["PAN", "LAN", "MAN", "WAN"],
      correct: "LAN",
      explanation: "Home network devices = Local Area Network (LAN). All devices within your house or small office."
    }
  ];

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setImageLoading(true);
      setImageError(false);
    } else {
      setGameCompleted(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameCompleted(false);
    setImageLoading(true);
    setImageError(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Excellent! You're a network expert! 🏆";
    if (percentage >= 60) return "Good job! You understand networks well! 👍";
    if (percentage >= 40) return "Not bad! Keep practicing! 📚";
    return "Keep learning! Networks are tricky but you'll get it! 💪";
  };

  if (gameCompleted) {
    return (
      <section className="mb-20">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center border border-gray-200 dark:border-gray-600">
          <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Game Complete!</h2>
          <div className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {score}/{questions.length}
          </div>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {getScoreMessage()}
          </p>
          <button
            onClick={resetGame}
            className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg mx-auto text-lg font-semibold"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Play Again</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-20">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
        🎮 Guess the Network Type!
      </h2>

      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-600">
        {/* Progress Bar */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-2 sm:space-y-0">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Score: {score}/{questions.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-8">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          {learningMode === 'visualize' && (
            <div className="mb-6">
              <div className="relative w-full h-48 sm:h-64 md:h-72 bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center space-y-3">
                      <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">Loading image...</span>
                    </div>
                  </div>
                )}
                
                {imageError && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center space-y-3 text-center p-4">
                      <AlertCircle className="w-8 h-8 text-red-500" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">
                        Image failed to load
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-xs">
                        Don't worry, you can still answer the question!
                      </span>
                    </div>
                  </div>
                )}
                
                <img 
                  src={questions[currentQuestion].image}
                  alt="Network scenario"
                  className={`w-full h-full object-contain transition-opacity duration-300 ${
                    imageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </div>
            </div>
          )}
          
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            What type of network is this?
          </h3>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6 mb-8">
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              "{questions[currentQuestion].scenario}"
            </p>
          </div>
        </div>

        {/* Answer Options */}
        {!showResult ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="p-4 sm:p-6 bg-gray-100 dark:bg-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 text-gray-900 dark:text-white rounded-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-600 transform hover:scale-105 shadow-lg text-lg font-semibold"
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div className="mb-8">
            <div className={`p-6 sm:p-8 rounded-2xl ${
              selectedAnswer === questions[currentQuestion].correct 
                ? 'bg-green-50 dark:bg-green-900/30 border-2 border-green-300 dark:border-green-600' 
                : 'bg-red-50 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-600'
            }`}>
              <div className="flex items-center justify-center mb-6">
                {selectedAnswer === questions[currentQuestion].correct ? (
                  <CheckCircle className="w-16 h-16 text-green-600" />
                ) : (
                  <XCircle className="w-16 h-16 text-red-600" />
                )}
              </div>
              
              <h4 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white text-center mb-4">
                {selectedAnswer === questions[currentQuestion].correct ? 'Correct! 🎉' : 'Not quite right! 🤔'}
              </h4>
              
              <p className="text-center text-gray-600 dark:text-gray-300 mb-6 text-lg">
                The correct answer is: <strong className="text-xl">{questions[currentQuestion].correct}</strong>
              </p>
              
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 sm:p-6">
                <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed">
                  {questions[currentQuestion].explanation}
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button
                onClick={nextQuestion}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg font-semibold"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results 🏆'}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NetworkGame;