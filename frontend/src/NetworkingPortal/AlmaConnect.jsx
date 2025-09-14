import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AlmaConnectHeader from '@/components/AlmaConnectCards/AlmaConnectHeader';
import UserSideCard from '@/components/AlmaConnectCards/UserSideCard';
import AlmaConnectMainFeed from '@/components/AlmaConnectCards/AlmaConnectMainFeed';
import AlmaConnectRightSidebar from '@/components/AlmaConnectCards/AlmaConnectRightSidebar';

const AlmaConnect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate enhanced falling stars
  const generateStarLines = () => {
    const stars = [];
    const numberOfStars = 48;

    for (let i = 0; i < numberOfStars; i++) {
      const delay = i * 0.2;
      const startX = Math.random() * window.innerWidth;
      const startY = -100;

      stars.push(
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 dark:from-gray-300 dark:via-white dark:to-gray-200"
          initial={{
            x: startX,
            y: startY,
            opacity: 0,
            scale: 0
          }}
          animate={{
            x: startX + window.innerHeight * 0.8,
            y: window.innerHeight + 100,
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0]
          }}
          transition={{
            duration: 6,
            delay: delay,
            repeat: Infinity,
            repeatDelay: 12,
            ease: "linear"
          }}
          style={{
            boxShadow: "0 0 4px currentColor"
          }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100/80 to-gray-200/90 dark:from-black dark:via-gray-850/95 dark:to-black">
      {/* Cursor glow effect */}
      <motion.div
        className="fixed pointer-events-none z-5"
        animate={{
          x: mousePosition.x - 100,
          y: mousePosition.y - 100,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      >
        <div className="w-48 h-48 bg-gradient-to-r from-indigo-200/10 via-purple-100/15 to-pink-200/10 dark:from-gray-400/10 dark:via-gray-300/15 dark:to-gray-200/10 rounded-full blur-2xl opacity-60" />
      </motion.div>

      {/* Falling stars animation */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {generateStarLines()}
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
        <div className="absolute top-60 left-40 w-72 h-72 bg-gradient-to-r from-gray-600/50 to-gray-800/10 dark:from-gray-400/50 dark:to-gray-200/10 rounded-full blur-3xl" />
        <div className="absolute top-80 right-60 w-96 h-96 bg-gradient-to-r from-gray-400/50 to-gray-800/20 dark:from-gray-600/50 dark:to-gray-200/20 rounded-full blur-3xl" />
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
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-gray-400/20 to-gray-700/10 dark:from-gray-600/20 dark:to-gray-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-64 h-64 bg-gradient-to-r from-gray-400/10 to-gray-700/10 dark:from-gray-600/10 dark:to-gray-200/10 rounded-full blur-3xl" />
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
