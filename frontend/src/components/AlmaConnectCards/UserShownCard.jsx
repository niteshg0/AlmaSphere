import React from "react";
import { motion } from "framer-motion";
import profile1 from "../../../public/pic2.webp";
import profile2 from "../../../public/pic7.webp";
import profile3 from "../../../public/pic3.webp";
import profile5 from "../../../public/pic5.webp";

const UserShownCard = ({ alumni, index }) => {
  const profileArray = [profile1,profile2,profile3,profile5]
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group relative overflow-hidden rounded-3xl h-[220px]"
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-purple-500/40 via-cyan-500/30 to-blue-500/40 dark:from-gray-500/30 dark:via-gray-300/20 dark:to-gray-200/30 blur-xl" />

      {/* Border */}
      <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

      {/* Card content */}
      <div className="relative h-full p-6 flex flex-col">
        {/* Floating particles */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-gray-400 to-black dark:from-gray-400 dark:to-gray-600 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />

        {/* Profile section */}
        <div className="flex items-start space-x-6 mb-6">
          {/* Avatar placeholder */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 dark:from-gray-600 dark:via-gray-400 dark:to-gray-800 rounded-full border border-white/30 dark:border-gray-600/60 flex items-center justify-center">
              {alumni?.avatar ? (<div className="w-20 h-20 bg-gradient-to-br rounded-full flex items-center justify-center font-normal">
                <img src={alumni?.avatar} alt=""  className="w-20 h-20 bg-cover rounded-full"/>
              </div>): (<div className="w-16 h-16 bg-gradient-to-br rounded-full flex items-center justify-center text-white font-normal text-3xl">
                {alumni.username.charAt(0)}
              </div>)}
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-gray-100/20 dark:from-gray-400/20 dark:to-gray-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
          </motion.div>

          <div className="flex-1 mt-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-gray-200 dark:via-gray-400 dark:to-gray-200 bg-clip-text text-transparent mb-2">
              {alumni.username}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              {alumni.batch} ({alumni.course})
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {alumni.connections} mutual Connections
            </p>
          </div>
        </div>

        {/* Action section */}
        <div className="flex items-center justify-between mt-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-500/80 to-purple-500/80 text-white rounded-full font-medium text-sm hover:from-indigo-600/90 hover:to-purple-600/90 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 dark:from-gray-950 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-300 dark:hover:text-gray-800"
          >
            Connect
          </motion.button>

          <div className="flex items-center space-x-1">
            {/* Connection indicator circles */}
            <div className="flex -space-x-1">
              {[...Array(Math.min(alumni.connections, 3))].map((idx, i) => (
                <div
                  key={i}
                  className="w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-700 dark:from-gray-600 dark:to-gray-800 rounded-full border-2 border-white dark:border-gray-900"
                >
                  <img src={profileArray[i]} alt="userpic" className="w-full h-full rounded-full bg-cover"/>
                </div>
              ))}
              {alumni.connections > 3 && (
                <div className="w-6 h-6 bg-gradient-to-br from-gray-500 to-gray-700 dark:from-gray-700 dark:to-gray-900 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs text-white font-bold">
                  +
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gray-500 via-white to-gray-500 dark:from-gray-500 dark:via-gray-300 dark:to-gray-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </motion.div>
  );
};

export default UserShownCard;
