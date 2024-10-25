import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Trophy, Timer, ArrowRight } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctAnswer: 1
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Fe", "Au", "Cu"],
    correctAnswer: 2
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(30);

  React.useEffect(() => {
    if (timer > 0 && !showResults) {
      const countdown = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      handleNextQuestion();
    }
  }, [timer]);

  const handleAnswer = (selectedIndex: number) => {
    setSelectedAnswer(selectedIndex);
    if (selectedIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setTimer(30);
    } else {
      setShowResults(true);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full"
      >
        <div className="flex items-center justify-center mb-8">
          <Trophy className="w-16 h-16 text-yellow-500" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-6">Quiz Complete!</h2>
        <div className="text-center mb-8">
          <p className="text-2xl font-semibold text-gray-700">
            Your Score: {score} / {questions.length}
          </p>
          <p className="text-lg text-gray-600 mt-2">
            ({Math.round((score / questions.length) * 100)}%)
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl font-semibold
                     hover:bg-indigo-700 transition-colors duration-200"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-indigo-600" />
          <span className="text-lg font-semibold text-gray-700">
            Question {currentQuestion + 1}/{questions.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Timer className="w-6 h-6 text-gray-600" />
          <span className="text-lg font-semibold text-gray-700">{timer}s</span>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
        />
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {questions[currentQuestion].question}
      </h2>

      <div className="space-y-4">
        {questions[currentQuestion].options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswer(index)}
            className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200
              ${selectedAnswer === index 
                ? selectedAnswer === questions[currentQuestion].correctAnswer
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-indigo-500 hover:bg-indigo-50'
              }
            `}
          >
            <span className="text-lg font-medium">
              {String.fromCharCode(65 + index)}. {option}
            </span>
          </motion.button>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
          className={`flex items-center gap-2 py-3 px-6 rounded-xl font-semibold
            ${selectedAnswer !== null
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            } transition-colors duration-200`}
        >
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}