import React, { useState } from "react";
import { motion } from "framer-motion";

const SearchCard = ({ searchTerm, setSearchTerm }) => {
  const [isPostFocused, setIsPostFocused] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-[80%] max-w-4xl"
    >
      <div className="relative group overflow-hidden rounded-2xl">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />

        {/* Border */}
        <div className="absolute inset-0 rounded-2xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

        {/* <input
          type="text"
          placeholder="Search By Roll Number, Name....."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-lg bg-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-gray-500/40 transition-all duration-300 text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
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
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-500/10 via-cyan-500/10 to-blue-500/10 dark:from-gray-500/5 dark:via-gray-300/5 dark:to-gray-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default SearchCard;
