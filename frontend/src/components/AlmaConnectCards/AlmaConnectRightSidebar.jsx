import React from "react";
import { motion } from "framer-motion";
import UserCard from "./UserCard";

const AlmaConnectRightSidebar = () => {
  const suggestedUsers = [
    { name: "UserName", mutualConnections: 5 },
    { name: "UserName", mutualConnections: 8 },
    { name: "UserName", mutualConnections: 3 },
    { name: "UserName", mutualConnections: 12 },
    // { name: 'UserName', mutualConnections: 7 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-80 h-[100vh] sticky top-0 bg-gradient-to-br from-black via-gray-800/95 to-gray-900 border-l border-gray-700/40 p-6"
    >
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-200 mb-4">
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
            className=" px-4 py-2 rounded-xl  mt-5 border border-gray-500 text-gray-300 hover:text-white hover:border-gray-600/60 transition-all duration-300"
          >
            {"View More.. >"}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AlmaConnectRightSidebar;
