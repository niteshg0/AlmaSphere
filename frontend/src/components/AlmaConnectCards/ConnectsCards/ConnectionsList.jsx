import React from 'react';
import { motion } from 'framer-motion';
import ConnectionCard from './ConnectionCard';

const ConnectionsList = ({ connections, onMessageClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  if (connections.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="relative group overflow-hidden rounded-2xl max-w-md mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-gray-100/20 to-gray-200/30 dark:from-black/30 dark:via-gray-800/20 dark:to-gray-700/30 backdrop-blur-lg" />
          <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40" />
          
          <div className="relative p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
              No connections found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {connections.map((connection, index) => (
        <ConnectionCard
          key={connection.id}
          connection={connection}
          index={index}
          onMessageClick={() => onMessageClick(connection.id)}
        />
      ))}
    </motion.div>
  );
};

export default ConnectionsList;
