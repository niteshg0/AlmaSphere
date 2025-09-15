import React, { useState } from 'react';
import { motion } from 'framer-motion';

const UserCard = ({ user }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for cursor glow
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
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

      <motion.div 
        whileHover={{ scale: 1.02, y: -2 }}
        className="group relative overflow-hidden rounded-3xl mb-4"
      >
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />
        
        {/* Border */}
        <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

        {/* Floating particles */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-gray-400 dark:to-gray-600 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />

        <div className="relative p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 dark:from-gray-600 dark:via-gray-400 dark:to-gray-800 border-2 border-white/30 dark:border-gray-600/60" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.mutualConnections} mutual Connections</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-600/90 hover:to-purple-600/90 text-white rounded-full text-sm font-medium transition-all duration-300 dark:from-gray-950 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-300 dark:hover:text-gray-800"
            >
              Connect
            </motion.button>
            
            <div className="flex items-center space-x-1">
              <div className="flex -space-x-1">
                {[...Array(Math.min(user.mutualConnections, 3))].map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-700 dark:from-gray-600 dark:to-gray-800 rounded-full border-2 border-white dark:border-gray-900" />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">+</span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default UserCard;
