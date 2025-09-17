import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link,useNavigate } from "react-router-dom";
const pranjal = "/pranjal1.jpg";

const AlmaConnectHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate()

  // Track scroll for enhanced transparency effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 left-0 right-0 z-50 p-2">
      {/* Glassmorphism Header Container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`mx-2 sm:mx-4 rounded-3xl transition-all duration-500 relative group overflow-hidden ${
          scrolled
            ? "backdrop-blur-lg bg-white/10 dark:bg-black/10 shadow-lg shadow-indigo-500/5 dark:shadow-gray-500/5"
            : "backdrop-blur-lg bg-white/10 dark:bg-black/10 shadow-lg shadow-indigo-500/5 dark:shadow-gray-500/5"
        }`}
      >
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/30 via-pink-400/30 to-indigo-400/30 dark:from-gray-500/20 dark:via-gray-300/25 dark:to-gray-500/20 animate-gradient-x opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-3xl" />

        {/* Inner glassmorphism layer */}
        <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-white/30 via-white/20 to-white/10 dark:from-black/30 dark:via-black/20 dark:to-gray-800/10 backdrop-blur-md" />

        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-3xl border border-white/30 dark:border-gray-700/30 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-500" />

        {/* Floating particles effect */}
        <div className="absolute top-4 right-8 w-1 h-1 bg-gradient-to-r from-sky-400 to-blue-500 dark:from-gray-200 dark:to-white rounded-full opacity-60 animate-pulse" />
        <div
          className="absolute top-8 right-12 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-gray-400 dark:to-gray-600 rounded-full opacity-40 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-6 left-10 w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-gray-500 dark:to-gray-300 rounded-full opacity-50 animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        <div className="container mx-auto px-4 sm:px-6 py-4 relative z-10">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <motion.h1
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-xl sm:text-2xl font-bold font-serif bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-700 dark:from-gray-600 dark:via-white dark:to-gray-600 hover:from-indigo-600 hover:via-purple-500 hover:to-indigo-600 dark:hover:from-gray-500 dark:hover:via-gray-200 dark:hover:to-gray-500 transition-all duration-300 cursor-pointer"
            >
              AlmaConnect
            </motion.h1>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4 sm:mx-8">
              <div
                className={`relative transition-all duration-300 ${
                  isSearchFocused
                    ? "ring-2 ring-indigo-400/50 dark:ring-gray-500/40 shadow-lg shadow-indigo-500/20 dark:shadow-gray-500/20"
                    : "shadow-sm"
                } rounded-2xl backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-gray-700/40 hover:border-indigo-300/60 dark:hover:border-gray-600/60`}
              >
                <input
                  type="text"
                  placeholder="Search posts, people, or topics..."
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full px-6 py-3 bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-6">
              <Link
                to={"/alma_search"}
                // className="px-4 py-2 rounded-xl backdrop-blur-sm bg-white/20 dark:bg-black/20 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-gray-100 border border-white/20 dark:border-gray-700/20 hover:border-indigo-300/50 dark:hover:border-gray-600/50 transition-all duration-300"
                className="px-6 py-2 bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-600/90 hover:to-purple-600/90 text-white rounded-full font-medium transition-all duration-300 dark:from-gray-950 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-300 dark:hover:text-gray-800"
              >
                My Network
              </Link>
              <Link
                to={"/connect_info"}
                // className="px-4 py-2 rounded-xl backdrop-blur-sm bg-white/20 dark:bg-black/20 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-gray-100 border border-white/20 dark:border-gray-700/20 hover:border-indigo-300/50 dark:hover:border-gray-600/50 transition-all duration-300"
                className="px-6 py-2 bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-600/90 hover:to-purple-600/90 text-white rounded-full font-medium transition-all duration-300 dark:from-gray-950 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-300 dark:hover:text-gray-800"
              >
                Messages
              </Link>

              {/* Profile Circle */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 dark:from-gray-600 dark:via-gray-400 dark:to-gray-800 border border-white/30 dark:border-gray-600/60 cursor-pointer"
                onClick={(e) => (navigate("/fake_profile/5"))}
              >
                <img src={pranjal} alt="userimg" className="rounded-full bg-cover"/>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AlmaConnectHeader;
