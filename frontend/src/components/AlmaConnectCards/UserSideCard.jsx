import React from "react";
import { motion } from "framer-motion";

const UserSideCard = () => {
  const navigationItems = [
    { name: "All Posts", active: true },
    { name: "Achievement", active: false },
    { name: "Events", active: false },
    { name: "Product Launch", active: false },
    { name: "Articles", active: false, highlight: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-80 h-screen sticky top-0 bg-gradient-to-br from-black via-gray-900/45 to-gray-700/40 border-r border-gray-700/40 p-6"
    >
      {/* User Profile Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-black to-gray-800/95 backdrop-blur-xl border border-gray-700/40 rounded-3xl p-6 mb-6"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-gray-600/60" />
          <div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-400 to-gray-800/50">
              UserName
            </h3>
          </div>
        </div>
        <p className="text-gray-400">2023-2027 (Information Technology)</p>
      </motion.div>

      {/* Connections */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-black to-gray-800/95 backdrop-blur-xl border border-gray-700/40 rounded-3xl p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-gray-200 mb-2">Connections</h3>
        <p className="text-3xl font-bold text-white">180</p>
      </motion.div>

      {/* Navigation Menu */}
      <div className="space-y-2">
        {navigationItems.map((item, index) => (
          <motion.div
            key={item.name}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
              item.active
                ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white border border-gray-600/60"
                : "text-gray-300 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{item.name}</span>
              {item.highlight && (
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              )}
            </div>
            {item.active && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-500 to-white rounded-full" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default UserSideCard;
