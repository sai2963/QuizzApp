import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Loader } from "lucide-react";
import axios from "axios";
import { Question, QuizState } from "./types";
import { QuizCard } from "./components/QuizCard";
import { Results } from "./components/Results";
import { Header } from "./components/Header";

const DEFAULT_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is React?",
    options: [
      "A JavaScript library for building user interfaces",
      "A programming language",
      "A database management system",
      "An operating system",
    ],
    correctAnswer: "A JavaScript library for building user interfaces",
  },
  {
    id: 2,
    question: "Which hook is used for handling side effects in React?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correctAnswer: "useEffect",
  },
  {
    id: 3,
    question: "What is TypeScript?",
    options: [
      "A superset of JavaScript that adds static typing",
      "A new programming language",
      "A JavaScript framework",
      "A testing library",
    ],
    correctAnswer: "A superset of JavaScript that adds static typing",
  },
  {
    id: 4,
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style System",
      "Creative Style Solutions",
      "Coded Style Structures",
    ],
    correctAnswer: "Cascading Style Sheets",
  },
  {
    id: 5,
    question: "Which of these is NOT a JavaScript framework/library?",
    options: ["Django", "Angular", "Vue", "Next.js"],
    correctAnswer: "Django",
  },
  {
    id: 6,
    question: "What is the purpose of JSON?",
    options: [
      "To exchange data between a server and a web application",
      "To style web pages",
      "To create animations",
      "To handle server-side logic",
    ],
    correctAnswer: "To exchange data between a server and a web application",
  },
  {
    id: 7,
    question: "What is the Virtual DOM in React?",
    options: [
      "A lightweight copy of the actual DOM for performance optimization",
      "A special browser feature",
      "A database management system",
      "A new HTML version",
    ],
    correctAnswer:
      "A lightweight copy of the actual DOM for performance optimization",
  },
  {
    id: 8,
    question:
      "Which of these is a valid way to declare a variable in JavaScript?",
    options: [
      "let myVariable = 10;",
      "variable myVariable = 10;",
      "var myVariable : number = 10;",
      "define myVariable = 10;",
    ],
    correctAnswer: "let myVariable = 10;",
  },
  {
    id: 9,
    question: "What is NPM?",
    options: [
      "Node Package Manager",
      "New Programming Method",
      "Network Protocol Management",
      "New Project Module",
    ],
    correctAnswer: "Node Package Manager",
  },
  {
    id: 10,
    question: "What is the purpose of Git?",
    options: [
      "Version control system for tracking changes in source code",
      "A programming language",
      "A web hosting service",
      "A database system",
    ],
    correctAnswer: "Version control system for tracking changes in source code",
  },
];
function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    score: 0,
    isComplete: false,
  });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("https://api.jsonserve.com/Uw5CrX", {
          timeout: 5000,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        let data = response.data;

        if (!data) {
          throw new Error("No data received from the API");
        }

        if (!Array.isArray(data)) {
          data = Object.values(data);
        }

        const isValidQuestions = data.every(
          (q: any) =>
            q.question &&
            Array.isArray(q.options) &&
            q.options.length > 0 &&
            q.correctAnswer
        );

        if (!isValidQuestions) {
          throw new Error("Invalid question format in API response");
        }

        setQuestions(data);
      } catch (err) {
        console.error("Quiz loading error:", err);

        setQuestions(DEFAULT_QUESTIONS);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleStart = () => setStarted(true);

  const handleAnswerSelect = (answer: string) => {
    if (!quizState.isComplete) {
      setQuizState((prev) => ({
        ...prev,
        answers: { ...prev.answers, [prev.currentQuestion]: answer },
      }));
    }
  };

  const handleNext = () => {
    if (quizState.currentQuestion >= questions.length) {
      return;
    }

    const currentAnswer = quizState.answers[quizState.currentQuestion];
    const isCorrect =
      currentAnswer === questions[quizState.currentQuestion]?.correctAnswer;

    setQuizState((prev) => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      currentQuestion: prev.currentQuestion + 1,
      isComplete: prev.currentQuestion === questions.length - 1,
    }));
  };

  const handleRestart = () => {
    setQuizState({
      currentQuestion: 0,
      answers: {},
      score: 0,
      isComplete: false,
    });
    setStarted(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400 animate-pulse">
            Loading your quiz experience...
          </p>
        </div>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-500 text-xl">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-6">
      <Header />
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!started ? (
            <motion.div
              key="welcome"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="text-center py-12"
            >
              <motion.h1
                className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Welcome to BrainQuest
              </motion.h1>
              <motion.p
                className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Challenge yourself with our carefully curated questions and test
                your knowledge across various topics. Are you ready to begin
                your quest?
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="flex items-center justify-center gap-2 mx-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
              >
                <Play className="w-5 h-5" />
                Start Your Quest
              </motion.button>
            </motion.div>
          ) : quizState.isComplete ? (
            <Results
              score={quizState.score}
              totalQuestions={questions.length}
              onRestart={handleRestart}
            />
          ) : (
            <motion.div
              className="space-y-6 py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-between items-center mb-8">
                <p className="text-gray-400">
                  Question {quizState.currentQuestion + 1} of {questions.length}
                </p>
                <p className="text-gray-400">
                  Score:{" "}
                  <span className="text-purple-400 font-semibold">
                    {quizState.score}
                  </span>
                </p>
              </div>
              {questions[quizState.currentQuestion] && (
                <QuizCard
                  question={questions[quizState.currentQuestion]}
                  selectedAnswer={quizState.answers[quizState.currentQuestion]}
                  onAnswerSelect={handleAnswerSelect}
                />
              )}
              {quizState.answers[quizState.currentQuestion] && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleNext}
                  className="w-full max-w-2xl mx-auto mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                >
                  {quizState.currentQuestion === questions.length - 1
                    ? "Complete Quest"
                    : "Next Question"}
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
