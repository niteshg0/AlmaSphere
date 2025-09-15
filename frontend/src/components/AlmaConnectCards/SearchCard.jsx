import React from "react";
import { motion } from "framer-motion";

const SearchCard = ({ searchTerm, setSearchTerm }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="w-[80%] max-w-4xl"
  >
    <div className="relative">
      <input
        type="text"
        placeholder="Search By Roll Number, Name....."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-6 py-3 text-lg bg-black backdrop-blur-xl border border-gray-700/60 rounded-2xl focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 transition-all duration-300 text-gray-100 placeholder-gray-400"
      />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-500/10 via-cyan-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  </motion.div>
);

export default SearchCard;
