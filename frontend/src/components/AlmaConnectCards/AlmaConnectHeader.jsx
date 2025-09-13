import React from 'react';
import { motion } from 'framer-motion';

const AlmaConnectHeader = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-gradient-to-br from-black via-gray-850/95 to-black backdrop-blur-xl border-b border-gray-700/40"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.h1 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-gray-600 to-white bg-clip-text text-transparent"
          >
            AlmaConnect
          </motion.h1>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts, people, or topics..."
                className="w-full px-6 py-3 bg-black/50 border border-gray-700/40 rounded-2xl focus:outline-none focus:border-gray-500 text-gray-100 placeholder-gray-400"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            {['My Network', 'Messages'].map((item) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700/40 text-gray-200 hover:text-white hover:border-gray-600/60 transition-all duration-300"
              >
                {item}
              </motion.button>
            ))}
            
            {/* Profile Circle */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-gray-600/60 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default AlmaConnectHeader;
