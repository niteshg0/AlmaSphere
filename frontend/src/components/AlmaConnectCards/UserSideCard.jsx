import React, { useState } from "react";
import { motion } from "framer-motion";
// import pranjal from "../../../public/pranjal1.jpg";
import { useNavigate } from "react-router";
const pranjal = "/pranjal1.jpg";
const UserSideCard = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const navigationItems = [
    { name: "All Posts", active: true },
    { name: "Achievement", active: false },
    { name: "Events", active: false },
    { name: "Product Launch", active: false },
    { name: "Articles", active: false, highlight: true },
  ];

  // Track mouse position for cursor glow
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Cursor glow effect */}
      <motion.div
        className="fixed pointer-events-none z-5"
        animate={{
          x: mousePosition.x - 100,
          y: mousePosition.y - 100,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      >
        {/* <div className="w-48 h-48 bg-gradient-to-r from-indigo-200/10 via-purple-100/15 to-pink-200/10 dark:from-gray-400/10 dark:via-gray-300/15 dark:to-gray-200/10 rounded-full blur-2xl opacity-60" /> */}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-80 h-screen sticky top-0 p-6"
      >
        {/* Background with glassmorphism */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg border border-gray-300/60 dark:border-gray-700/40 rounded-3xl" /> */}

        <div className="relative z-10">
          {/* User Profile Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="group relative overflow-hidden rounded-3xl mb-6 cursor-pointer"
            onClick={(e) => navigate("/fake_profile/5")}
          >
            {/* Profile card glassmorphism background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />

            {/* Border */}
            <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

            <div className="relative p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 dark:from-gray-600 dark:via-gray-400 dark:to-gray-800 border-2 border-white/30 dark:border-gray-600/60">
                  <img src={pranjal} alt="image1" className="rounded-full" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-gray-200 dark:via-gray-400 dark:to-gray-200">
                    Pranjal Shahi
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                2023-2027 (Electronics Engineering)
              </p>
            </div>
          </motion.div>

          {/* Connections */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="group relative overflow-hidden rounded-3xl mb-6"
          >
            {/* Connections card glassmorphism background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />

            {/* Border */}
            <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

            <div
              className="relative p-6 cursor-pointer"
              onClick={(e) => navigate("/connect_info")}
            >
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                Connections
              </h3>
              <p className="text-3xl font-bold text-indigo-600 dark:text-gray-100">
                6
              </p>
            </div>
          </motion.div>

          {/* Navigation Menu */}
          <div className="space-y-2">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-sm border ${
                  item.active
                    ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 dark:from-gray-700/40 dark:to-gray-600/40 text-indigo-700 dark:text-gray-200 border-indigo-300/50 dark:border-gray-600/50"
                    : "bg-white/20 dark:bg-black/20 text-gray-700 dark:text-gray-300 border-gray-300/40 dark:border-gray-700/40 hover:border-indigo-300/50 dark:hover:border-gray-600/50 hover:bg-indigo-50/30 dark:hover:bg-gray-700/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.name}</span>
                  {item.highlight && (
                    <div className="w-2 h-2 bg-blue-400 dark:bg-gray-400 rounded-full animate-pulse" />
                  )}
                </div>
                {item.active && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 dark:from-gray-500 dark:to-gray-300 rounded-full" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default UserSideCard;
