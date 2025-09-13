import React from "react";
import { motion } from "framer-motion";

const UserShownCard = ({ alumni, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{ scale: 1.02, y: -5 }}
    className="group relative overflow-hidden rounded-3xl h-[220px]"
  >
    {/* Fixed hover glow effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-purple-500/40 via-cyan-500/30 to-blue-500/40 blur-2xl" />

    {/* Card content */}
    <div className="relative h-full p-6 bg-gradient-to-br from-black via-black to-gray-700/60 backdrop-blur-xl border border-gray-700/40 rounded-3xl flex flex-col group-hover:border-gray-600/60 transition-colors duration-300">
      {/* Floating particles */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-gray-400 to-black rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />

      {/* Profile section */}
      <div className="flex items-start space-x-6 mb-6">
        {/* Avatar placeholder */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-gray-950 via-gray-600 to-gray-800 rounded-full border-2 border-gray-600/60 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br rounded-full flex items-center justify-center text-white font-normal text-3xl">
              {/* from-purple-500 to-cyan-500 */}
              {alumni.username.charAt(0)}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-gray-100/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
        </motion.div>

        <div className="flex-1 mt-2">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-200 via-gray-500 to-gray-700 bg-clip-text text-transparent mb-2">
            {alumni.username}
          </h3>
          <p className="text-sm text-gray-300 mb-1">
            {alumni.batch} ({alumni.course})
          </p>
          <p className="text-sm text-gray-400">
            {alumni.connections} mutual Connections
          </p>
        </div>
      </div>

      {/* Action section */}
      <div className="flex items-center justify-between mt-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 bg-gradient-to-r from-gray-950 to-gray-600 text-white rounded-full font-medium text-sm hover:from-gray-700 hover:text-gray-800 hover:to-gray-300 transition-all duration-300 shadow-lg hover:shadow-gray-500/25"
        >
          {/* bg-gradient-to-r from-purple-600 to-cyan-600 */}
          Connect
        </motion.button>

        <div className="flex items-center space-x-1">
          {/* Connection indicator circles */}
          <div className="flex -space-x-1">
            {[...Array(Math.min(alumni.connections, 3))].map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full border-2 border-gray-900"
              />
            ))}
            {alumni.connections > 3 && (
              <div className="w-6 h-6 bg-gradient-to-br from-gray-500 to-white-500 rounded-full border-2 border-gray-900 flex items-center justify-center text-xs text-white font-bold">
                +
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gray-500 via-white to-gray-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  </motion.div>
);

export default UserShownCard;
