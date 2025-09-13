import React from 'react';
import { motion } from 'framer-motion';

const UserCard = ({ user }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-gradient-to-br from-black to-gray-800/95 backdrop-blur-xl border border-gray-700/40 rounded-3xl p-4 mb-4"
    >
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-gray-600/60" />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-200">{user.name}</h4>
          <p className="text-sm text-gray-400">{user.mutualConnections} mutual Connections</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white rounded-full text-sm font-medium transition-all duration-300"
        >
          Connect
        </motion.button>
        
        <div className="flex items-center space-x-1">
          <div className="flex -space-x-1">
            {[...Array(Math.min(user.mutualConnections, 3))].map((_, i) => (
              <div key={i} className="w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full border-2 border-gray-900" />
            ))}
          </div>
          <span className="text-sm text-gray-400">+</span>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
