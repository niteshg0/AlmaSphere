import React from 'react';
import { motion } from 'framer-motion';
import AlmaConnectHeader from '@/components/AlmaConnectCards/AlmaConnectHeader';
import UserSideCard from '@/components/AlmaConnectCards/UserSideCard';
import AlmaConnectMainFeed from '@/components/AlmaConnectCards/AlmaConnectMainFeed';
import AlmaConnectRightSidebar from '@/components/AlmaConnectCards/AlmaConnectRightSidebar';

const AlmaConnect = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-850/95 to-black">
      {/* Falling stars animation */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {[...Array(48)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-gray-200 to-white"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -100,
              opacity: 0,
              scale: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth + window.innerHeight * 0.8,
              y: window.innerHeight + 100,
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0]
            }}
            transition={{
              duration: 6,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 12,
              ease: "linear"
            }}
            style={{
              boxShadow: "0 0 4px currentColor"
            }}
          />
        ))}
      </div>

      {/* Background orbs */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        animate={{ 
          y: [0, -50, 0],
          x: [0, 25, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute top-60 left-40 w-72 h-72 bg-gradient-to-r from-gray-400/50 to-gray-200/10 rounded-full blur-3xl" />
        <div className="absolute top-80 right-60 w-96 h-96 bg-gradient-to-r from-gray-600/50 to-gray-200/20 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        className="fixed inset-0 pointer-events-none"
        animate={{ 
          y: [0, -100, 0],
          x: [0, -25, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-gray-600/20 to-gray-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-64 h-64 bg-gradient-to-r from-gray-600/10 to-gray-200/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Main Layout */}
      <div className="relative z-10">
        <AlmaConnectHeader />
        <div className="flex">
          <UserSideCard />
          <AlmaConnectMainFeed />
          <AlmaConnectRightSidebar />
        </div>
      </div>
    </div>
  );
};

export default AlmaConnect;
