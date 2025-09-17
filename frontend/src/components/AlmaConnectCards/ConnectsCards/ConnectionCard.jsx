import React, { useState } from "react";
import { motion } from "framer-motion";

const ConnectionCard = ({ connection, index, onMessageClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-3xl h-24"
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-gray-100/30 to-gray-200/40 dark:from-black/40 dark:via-gray-800/30 dark:to-gray-700/40 backdrop-blur-md" />

      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-indigo-400/20 dark:from-gray-500/15 dark:via-gray-300/20 dark:to-gray-500/15 opacity-0  transition-opacity duration-500 rounded-3xl" />

      {/* Border */}
      <div className="absolute inset-0 rounded-3xl border border-gray-300/50 dark:border-gray-600/40 hover:border-indigo-300/60 dark:hover:border-gray-500/60 transition-colors duration-300" />

      <div className="relative h-full p-4 flex items-center justify-between">
        {/* User Info Section */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          {/* Avatar */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex-shrink-0"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 dark:from-gray-600 dark:via-gray-400 dark:to-gray-800 border-2 border-white/40 dark:border-gray-600/50 flex items-center justify-center shadow-lg shadow-indigo-500/20 dark:shadow-gray-500/20">
              {connection?.avatar ? (
                <img src={connection.avatar} alt="user img" className="bg-cover rounded-full w-14 h-14"/>
              ) : (
                <span className="text-white font-bold text-lg">
                  {connection.username?.charAt(0) || "U"}
                </span>
              )}
            </div>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-indigo-400/40 to-purple-400/40 dark:from-gray-400/30 dark:to-gray-600/30 rounded-full blur-md"
              animate={{ opacity: isHovered ? 0.6 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* User Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-gray-100 transition-colors duration-300 truncate">
              {connection.username}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono truncate">
              {connection.duration} ({connection.course})
            </p>
          </div>
        </div>

        {/* Message Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onMessageClick}
          className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm bg-white/30 dark:bg-black/30 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-gray-100 border border-gray-300/50 dark:border-gray-600/40 hover:border-indigo-300/60 dark:hover:border-gray-500/60 hover:shadow-lg hover:shadow-indigo-500/20 dark:hover:shadow-gray-500/20 relative overflow-hidden group/btn"
        >
          <span className="relative z-10">Message</span>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 dark:from-gray-500/10 dark:to-gray-200/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </div>

      {/* Shadow effect */}
      <div className="absolute inset-0 rounded-3xl shadow-md shadow-gray-200/50 group-hover:shadow-lg group-hover:shadow-indigo-300/20 dark:group-hover:shadow-gray-500/20 transition-shadow duration-300" />
    </motion.div>
  );
};

export default ConnectionCard;
