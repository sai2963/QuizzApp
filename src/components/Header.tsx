import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Star, Trophy } from 'lucide-react';

export const Header = () => {
  return (
    <motion.header
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto mb-12 pt-8"
    >
      <div className="flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <Brain className="w-8 h-8 text-purple-500" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            BrainQuest
          </span>
        </motion.div>
        <div className="flex items-center gap-6">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-300">Premium Quiz</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Trophy className="w-5 h-5 text-purple-500" />
            <span className="text-gray-300">Top Rated</span>
          </motion.div>
        </div>
      </div>
      <motion.div 
        className="mt-8 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
      />
    </motion.header>
  );
};