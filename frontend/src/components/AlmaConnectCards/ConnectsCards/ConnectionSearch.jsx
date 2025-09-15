import React, { useState } from "react";
import { motion } from "framer-motion";

const ConnectionSearch = ({ searchTerm, setSearchTerm }) => {
  const [isPostFocused, setIsPostFocused] = useState(false);
  return (
    <div className="relative group">
      {/* Search Input Container */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative overflow-hidden rounded-2xl"
      >
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-gray-100/30 to-gray-200/40 dark:from-black/40 dark:via-gray-800/30 dark:to-gray-700/40 backdrop-blur-md" />

        {/* Border */}
        <div className="absolute inset-0 rounded-2xl border border-gray-300/50 dark:border-gray-600/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-500/50 transition-colors duration-300" />

        <div className="relative flex items-center">
          {/* Search Icon */}
          {/* <div className="absolute left-4 z-10">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div> */}

          {/* <input
            type="text"
            placeholder="Search You Connections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-gray-500/40 rounded-2xl font-medium transition-all duration-300"
          /> */}
          
          <input
            type="text"
            placeholder="Search By Roll Number, Name....."
            onFocus={() => setIsPostFocused(true)}
            onBlur={() => setIsPostFocused(false)}
            className={`flex-1 rounded-2xl w-full px-6 py-3  text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all duration-300 ${
              isPostFocused
                ? "ring-2 ring-indigo-400/50 dark:ring-gray-500/40 shadow-lg shadow-indigo-500/20 dark:shadow-gray-500/20"
                : "shadow-sm"
            } backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-gray-700/40 hover:border-indigo-300/60 dark:hover:border-gray-600/60`}
          />

          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 via-purple-400/10 to-indigo-400/10 dark:from-gray-500/5 dark:via-gray-300/5 dark:to-gray-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
};

export default ConnectionSearch;
