import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FilterCard = ({ title, value, onChange, options }) => {
  const [rotate, setRotate] = useState(false);

  // FIXED: Separate function for toggling dropdown
  const handleToggle = () => {
    setRotate((p) => !p);
  };

  // FIXED: Separate function for selecting an option
  const handleOptionSelect = (val) => {
    onChange(val);
    setRotate(false); // Close dropdown when option is selected
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />
      
      {/* Border */}
      <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

      {/* Floating particles */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-gray-400 to-black dark:from-gray-400 dark:to-gray-600 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />

      <div className="relative px-2 py-4 rounded-3xl">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">{title}</h3>
        <div
          className="rounded-3xl text-gray-700 dark:text-gray-300 py-2 px-4 border flex cursor-pointer justify-between items-center border-gray-300/60 dark:border-gray-700/40 backdrop-blur-sm bg-white/30 dark:bg-black/30"
          onClick={handleToggle} // FIXED: Now only toggles dropdown
        >
          <h2 className="">{value ? `${value}` : `Select ${title}`}</h2>
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-gray-600 dark:to-gray-400 text-white rounded-full w-4 h-4 flex items-center justify-center">
            <div
              className={`w-full h-full ${
                rotate ? "-rotate-180" : "-rotate-0"
              } transition-transform duration-300 flex items-center justify-center`}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </span>
        </div>
        <AnimatePresence>
          {rotate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-h-[200px] overflow-scroll"
            >
              <ul className="text-gray-700 dark:text-gray-300 flex flex-col my-3 justify-center text-center gap-3 items-center transition-all duration-300">
                {/* ADDED: Clear option if there's a selected value */}
                {value && (
                  <li
                    className="w-full border cursor-pointer border-red-300/60 dark:border-red-700/40 py-2 px-4 rounded-3xl bg-gradient-to-r from-red-50 via-red-50 to-red-100/50 dark:from-red-900/20 dark:via-red-900/20 dark:to-red-700/20 backdrop-blur-sm hover:bg-red-100/50 dark:hover:bg-red-800/40 text-red-600 dark:text-red-400"
                    onClick={() => handleOptionSelect("")} // FIXED: Clear selection
                  >
                    Clear {title}
                  </li>
                )}
                {options.map((p) => (
                  <li
                    className="w-full border cursor-pointer border-gray-300/60 dark:border-gray-700/40 py-2 px-4 rounded-3xl bg-gradient-to-r from-white via-gray-50 to-gray-100/50 dark:from-black dark:via-black dark:to-gray-700/50 backdrop-blur-sm hover:bg-indigo-50/30 dark:hover:bg-gray-700/40"
                    key={p}
                    onClick={() => handleOptionSelect(p)} // FIXED: Select option and close dropdown
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FilterCard;
