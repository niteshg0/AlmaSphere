import React from 'react';
import { motion } from 'framer-motion';
import UserPostCard from './UserPostCard';

const AlmaConnectMainFeed = () => {
  const posts = [
    {
      id: 1,
      username: 'UserName',
      year: '2021-2025',
      course: 'Computer Science',
      title: 'Handwritten SQL Notes for Placement Preparation',
      content: 'In today\'s competitive tech world, SQL is one of the most frequently asked topics in interviews for Data, Software, and Analytics roles. That\'s why I\'ve prepared concise handwritten notes covering: ✓ Core SQL concepts ✓ Frequently asked interview queries ✓ Optimization tips for real-world use cases 📚 These notes are designed to help students, freshers, and job seekers strengthen their foundation and revise faster before interviews.',
      tags: ['Core SQL concepts', 'Frequently asked interview queries', 'Optimization tips for real-world use cases'],
      hasMedia: true,
      likes: 45,
      comments: 12
    },
    {
      id: 2,
      username: 'UserName',
      year: '2021-2025',
      course: 'Computer Science',
      title: 'Handwritten SQL Notes for Placement Preparation',
      content: 'In today\'s competitive tech world, SQL is one of the most frequently asked topics in interviews for Data, Software, and Analytics roles. That\'s why I\'ve prepared concise handwritten notes covering core concepts and frequently asked questions.',
      tags: ['SQL', 'Interview Preparation', 'Database'],
      hasMedia: false,
      likes: 32,
      comments: 8
    }
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
        className="bg-gradient-to-br from-black to-gray-800/95 backdrop-blur-xl border border-gray-700/40 rounded-3xl p-6 mb-6"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-gray-600/60" />
          <input
            type="text"
            placeholder="Share your thoughts, achievements, or ask questions..."
            className="flex-1 bg-gray-800/50 border border-gray-700/40 rounded-2xl px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-gray-600/60"
          />
        </div>
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700/40">
          <div className="flex space-x-4">
            {['Photos', 'Video', 'Product Launch', 'Achievement', 'Articles'].map((option) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="px-3 py-1 text-sm text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
              >
                {option}
              </motion.button>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white rounded-full font-medium transition-all duration-300"
          >
            Post
          </motion.button>
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
