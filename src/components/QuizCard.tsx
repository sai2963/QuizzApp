import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '../types';
import clsx from 'clsx';

interface QuizCardProps {
  question: Question;
  selectedAnswer: string | undefined;
  onAnswerSelect: (answer: string) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
}) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="w-full max-w-2xl mx-auto bg-gradient-to-b from-gray-800 to-gray-800/50 rounded-xl p-8 shadow-xl backdrop-blur-sm border border-gray-700/50"
    >
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
      >
        {question.question}
      </motion.h3>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAnswerSelect(option)}
            className={clsx(
              "w-full p-4 rounded-lg text-left transition-all duration-300",
              "hover:bg-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500",
              selectedAnswer === option
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                : "bg-gray-700/50 text-gray-300 hover:text-white"
            )}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};