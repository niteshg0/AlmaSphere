import React, { useState } from "react";
import { motion } from "framer-motion";
import UserCard from "./UserCard";
import profile1 from "../../../public/pic2.webp";
import profile2 from "../../../public/pic7.webp";
import profile3 from "../../../public/pic3.webp";
import profile5 from "../../../public/pic5.webp";
import { useNavigate } from "react-router";

const AlmaConnectRightSidebar = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate()

  const suggestedUsers = [
    { name: "Pravesh Kumar", mutualConnections: 5,image:profile3 },
    { name: "Divyanshu Tripathi", mutualConnections: 8,image:profile2 },
    { name: "Sakshi Shahi", mutualConnections: 3 ,image:profile1},
    { name: "Manish Paityawal", mutualConnections: 12,image:profile5 },
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
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-80 h-[100vh] sticky top-0 p-6 group overflow-hidden rounded-3xl bg-transparent  "
        // bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg border border-gray-300/60 dark:border-gray-700/40
      >
        {/* Floating particles */}
        {/* <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-gray-400 dark:to-gray-600 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" /> */}

        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
            Suggested Connections
          </h3>
          <div className="space-y-4">
            {suggestedUsers.map((user, index) => (
              <UserCard key={index} user={user} />
            ))}
          </div>
          <motion.div className="w-full flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-xl mt-5 text-sm font-medium transition-all duration-300 backdrop-blur-sm bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-600/90 hover:to-purple-600/90 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/30 dark:from-gray-950 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-300 dark:hover:text-gray-800"
              onClick={(e) => (navigate("/alma_search"))}
            >
              <span className="flex items-center gap-1">
                View More
                <motion.svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="opacity-70"
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    d="M8.5 5.5L11.5 8.5L8.5 11.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </motion.svg>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default AlmaConnectRightSidebar;
