import React, { useState } from 'react';
import { motion } from 'framer-motion';

const UserPostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
        <div className="w-48 h-48 bg-gradient-to-r from-indigo-200/10 via-purple-100/15 to-pink-200/10 dark:from-gray-400/10 dark:via-gray-300/15 dark:to-gray-200/10 rounded-full blur-2xl opacity-60" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        className="group relative overflow-hidden rounded-3xl p-6 mb-6"
      >
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />
        
        {/* Border */}
        <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

        {/* Floating particles */}
        <div className="absolute top-4 right-6 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-gray-400 dark:to-gray-600 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />

        <div className="relative">
          {/* Post Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 dark:from-gray-600 dark:via-gray-400 dark:to-gray-800 border-2 border-white/30 dark:border-gray-600/60" />
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-200">{post.username}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{post.year} ({post.course})</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-600/90 hover:to-purple-600/90 text-white rounded-full text-sm font-medium transition-all duration-300 dark:from-gray-950 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-300 dark:hover:text-gray-800"
            >
              + Follow
            </motion.button>
          </div>

          {/* Post Content */}
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{post.title}</h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{post.content}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags?.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-white/30 dark:bg-black/30 text-gray-700 dark:text-gray-300 text-sm rounded-full backdrop-blur-sm border border-gray-300/40 dark:border-gray-700/40">
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Media Content */}
          {post.hasMedia && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="aspect-video bg-white/20 dark:bg-black/20 rounded-2xl border border-gray-300/40 dark:border-gray-700/40 flex items-center justify-center backdrop-blur-sm">
                <div className="text-gray-600 dark:text-gray-400">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-8 bg-white/20 dark:bg-black/20 rounded-lg flex items-center px-3 backdrop-blur-sm border border-gray-300/40 dark:border-gray-700/40">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-600 dark:to-gray-800 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Comment {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Post Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200/40 dark:border-gray-700/40">
            <div className="flex items-center space-x-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : ''}`} fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Like</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowComments(!showComments)}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-gray-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Reply</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-gray-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span>Share</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default UserPostCard;
