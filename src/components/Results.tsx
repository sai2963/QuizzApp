import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, RefreshCw, Star } from 'lucide-react';
import clsx from 'clsx';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const Results: React.FC<ResultsProps> = ({
  score,
  totalQuestions,
  onRestart,
}) => {
  const percentage = (score / totalQuestions) * 100;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="w-full max-w-2xl mx-auto bg-gradient-to-b from-gray-800 to-gray-800/50 rounded-xl p-8 shadow-xl backdrop-blur-sm border border-gray-700/50"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative w-24 h-24 mx-auto mb-8"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50" />
        <Trophy className="w-24 h-24 text-yellow-500 relative z-10" />
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
      >
        Quest Complete!
      </motion.h2>

      <div className="space-y-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-4"
        >
          <Target className="w-6 h-6 text-purple-400" />
          <p className="text-xl text-gray-300">
            Final Score: <span className="font-bold text-white">{score}</span> out of {totalQuestions}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2"
        >
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={clsx(
                "w-6 h-6",
                i < Math.ceil((percentage / 100) * 5)
                  ? "text-yellow-500"
                  : "text-gray-600"
              )}
            />
          ))}
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-2xl font-bold text-center text-gray-300"
        >
          {percentage}% Mastery Achieved
        </motion.p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex items-center justify-center gap-2 mx-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
      >
        <RefreshCw className="w-5 h-5" />
        Begin New Quest
      </motion.button>
    </motion.div>
  );
};