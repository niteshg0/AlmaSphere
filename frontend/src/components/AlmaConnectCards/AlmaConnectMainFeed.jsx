import React, { useState } from "react";
import { motion } from "framer-motion";
import UserPostCard from "./UserPostCard";
const pranjal = "/pranjal1.jpg";
const sanskar = "/sanskar.webp";
const nitesh = "/nitesh.webp";
const khushi = "/khushi1.jpg";
const om = "/om1.jpg";
const dibyanshu = "/dibyanshu1.jpg";
const sanskarbg = "/sanskarbg.png";
const khushibg = "/khushibg.png";
const ombg = "/ombg.png";
const AlmaConnectMainFeed = () => {
  const [isPostFocused, setIsPostFocused] = useState(false);

  const posts = [
    {
      id: 1,
      username: "Sanskar Singh",
      year: "2023-2027",
      course: "Computer Science",
      title: "Handwritten SQL Notes for Placement Preparation",
      content:
        "In today's competitive tech world, SQL is one of the most frequently asked topics in interviews for Data, Software, and Analytics roles. That's why I've prepared concise handwritten notes covering: ✓ Core SQL concepts ✓ Frequently asked interview queries ✓ Optimization tips for real-world use cases 📚 These notes are designed to help students, freshers, and job seekers strengthen their foundation and revise faster before interviews.",
      tags: [
        "Core SQL concepts",
        "Frequently asked interview queries",
        "Optimization tips for real-world use cases",
      ],
      hasMedia: true,
      likes: 45,
      comments: 12,
      image: sanskar,
      bgImage : khushibg
    },
    {
      id: 2,
      username: "Nitesh Kumar",
      year: "2023-2027",
      course: "Information Technology",
      title: "AutoCAD and SolidWorks Projects for Beginners",
      content:
        "Created 15+ mechanical design projects using AutoCAD and SolidWorks. Perfect for beginners who want to build their portfolio. Includes assembly drawings, part modeling, and simulation results.",
      tags: ["AutoCAD", "SolidWorks", "Mechanical Design", "CAD"],
      hasMedia: true,
      likes: 64,
      comments: 12,
      image:nitesh,
      bgImage:sanskarbg
    },
    {
      id: 3,
      username: "Khushi Singh",
      year: "2023-2027",
      course: "Electronics and Communication",
      title: "GATE ECE Preparation Strategy - Scored AIR 45",
      content:
        "Sharing my detailed preparation strategy for GATE ECE 2024. Covered all subjects with recommended books, online resources, and mock test analysis. Special focus on Signal Processing and Communication Systems.",
      tags: ["GATE", "ECE", "Rank 45", "Preparation Strategy"],
      hasMedia: false,
      likes: 89,
      comments: 31,
      image:khushi
    },
    {
      id: 4,
      username: "Om Vishwakarma",
      year: "2023-2027",
      course: "Information Technology",
      title: "Complete DSA Roadmap with LeetCode Problem Solutions",
      content:
        "After solving 500+ problems on LeetCode, I've created a comprehensive roadmap for Data Structures and Algorithms. This includes problem patterns, time complexity analysis, and interview tips from my recent Google internship experience.",
      tags: ["DSA", "LeetCode", "Coding Interview", "Google"],
      hasMedia: true,
      likes: 127,
      comments: 23,
      image:om,
      bgImage:ombg
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 max-w-4xl mx-auto p-6"
    >
      {/* Post Creation Area */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="group relative overflow-hidden rounded-3xl mb-6"
      >
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />

        {/* Border */}
        <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

        <div className="relative p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 dark:from-gray-600 dark:via-gray-400 dark:to-gray-800 border-2 border-white/30 dark:border-gray-600/60">
              <img
                src={pranjal}
                alt="profile1"
                className="bg-cover rounded-full"
              />
            </div>
            <input
              type="text"
              placeholder="Share your thoughts, achievements, or ask questions..."
              onFocus={() => setIsPostFocused(true)}
              onBlur={() => setIsPostFocused(false)}
              className={`flex-1 rounded-2xl px-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                isPostFocused
                  ? "ring-2 ring-indigo-400/50 dark:ring-gray-500/40 shadow-lg shadow-indigo-500/20 dark:shadow-gray-500/20"
                  : "shadow-sm"
              } backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-gray-700/40 hover:border-indigo-300/60 dark:hover:border-gray-600/60`}
            />
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200/40 dark:border-gray-700/40">
            <div className="flex space-x-4">
              {[
                "Photos",
                "Video",
                "Product Launch",
                "Achievement",
                "Articles",
              ].map((option) => (
                <motion.button
                  key={option}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-700/20 rounded-lg transition-all duration-200"
                >
                  {option}
                </motion.button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-600/90 hover:to-purple-600/90 text-white rounded-full font-medium transition-all duration-300 dark:from-gray-950 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-300 dark:hover:text-gray-800"
            >
              Post
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Posts Feed */}
      <div>
        {posts.map((post) => (
          <UserPostCard key={post.id} post={post} />
        ))}
      </div>
    </motion.div>
  );
};

export default AlmaConnectMainFeed;
