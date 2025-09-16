import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ConnectionSearch from "../components/AlmaConnectCards/ConnectsCards/ConnectionSearch"
import ConnectionsList from "../components/AlmaConnectCards/ConnectsCards/ConnectionsList";
import sanskar from "../../public/sanskar.webp";
import nitesh from "../../public/nitesh.webp";
import khushi from "../../public/khushi1.jpg";
import om from "../../public/om1.jpg";
import dibyanshu from "../../public/dibyanshu1.jpg";
import pranjal from "../../public/pranjal1.jpg";
const ConnectionsPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState('');

  // Sample connections data
  const connections = [
    {
      id: 1,
      username: 'Sanskar Singh',
      duration: '2023-2027',
      course: 'Computer Science...',
      avatar: sanskar,
    },
    {
      id: 2,
      username: 'Nitesh Gupta',
      duration: '2023-2027',
      course: 'information Tech...',
      avatar: nitesh,
    },
    {
      id: 3,
      username: 'Pranjal Shahi',
      duration: '2023-2027',
      course: 'Electronic Eng...',
      avatar: pranjal,
    },
    {
      id: 4,
      username: 'Dibyanshu Yadav',
      duration: '2023-2027',
      course: 'information Tech...',
      avatar: dibyanshu,
    },
    {
      id: 5,
      username: 'Om Vishwakarma',
      duration: '2023-2027',
      course: 'information Tech...',
      avatar: om,
    },
    {
      id: 6,
      username: 'Khushi Singh',
      duration: '2023-2027',
      course: 'information Tech...',
      avatar: khushi,
    },
  ];

  // Filter connections based on search term
  const filteredConnections = connections.filter(connection =>
    connection.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Single mouse position tracker for the entire page
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMessageClick = (id) => {
    // Handle message functionality
    console.log(`Message clicked for connection ${id}`);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-gray-100/80 to-gray-200/90 dark:from-black dark:via-gray-850/95 dark:to-black">
      {/* Single cursor glow effect - POINTER EVENTS NONE */}
      <motion.div
        className="fixed pointer-events-none z-50"
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

      {/* Background orbs - POINTER EVENTS NONE */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        animate={{ 
          y: [0, -50, 0],
          x: [0, 25, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute top-60 left-40 w-72 h-72 bg-gradient-to-r from-gray-600/50 to-gray-800/10 dark:from-gray-400/50 dark:to-gray-200/10 rounded-full blur-3xl" />
        <div className="absolute top-80 right-60 w-96 h-96 bg-gradient-to-r from-gray-400/50 to-gray-800/20 dark:from-gray-600/50 dark:to-gray-200/20 rounded-full blur-3xl" />
      </motion.div>

      {/* INTERACTIVE CONTENT - HIGH Z-INDEX & RELATIVE */}
      <section className="relative z-20 p-6 sm:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Container with Glassmorphism - INTERACTIVE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl group z-30"
          >
            {/* Glassmorphism background - POINTER EVENTS NONE */}
            {/* <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg pointer-events-none" /> */}
            
            {/* Animated gradient border - POINTER EVENTS NONE */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/30 via-pink-400/30 to-indigo-400/30 dark:from-gray-500/20 dark:via-gray-300/25 dark:to-gray-500/20 opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-3xl pointer-events-none" /> */}
            
            {/* Border - POINTER EVENTS NONE */}
            {/* <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300 pointer-events-none" /> */}

            {/* Floating particles - POINTER EVENTS NONE */}
            {/* <div className="absolute top-6 right-8 w-2 h-2 bg-gradient-to-r from-sky-400 to-blue-500 dark:from-gray-200 dark:to-white rounded-full opacity-60 animate-pulse pointer-events-none" /> */}
            {/* <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-gray-400 dark:to-gray-600 rounded-full opacity-40 animate-pulse pointer-events-none" style={{ animationDelay: "1s" }} /> */}

            {/* MAIN INTERACTIVE CONTENT */}
            <div className="relative p-8 z-40">
              {/* Page Header */}
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl sm:text-3xl font-bold font-serif mb-8 bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-700 dark:from-gray-600 dark:via-white dark:to-gray-600 bg-clip-text text-transparent"
              >
                Connection Info
              </motion.h1>

              {/* Search Component - INTERACTIVE */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-8 relative z-50"
              >
                <ConnectionSearch 
                  searchTerm={searchTerm} 
                  setSearchTerm={setSearchTerm} 
                />
              </motion.div>

              {/* Connections List - INTERACTIVE */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="relative z-50"
              >
                <ConnectionsList 
                  connections={filteredConnections} 
                  onMessageClick={handleMessageClick}
                />
              </motion.div>
            </div>

            {/* Shadow effect - POINTER EVENTS NONE */}
            <div className="absolute inset-0 rounded-3xl shadow-xl shadow-gray-200/60 group-hover:shadow-2xl group-hover:shadow-indigo-300/20 dark:group-hover:shadow-gray-500/25 transition-shadow duration-500 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Floating accent elements - POINTER EVENTS NONE */}
      <motion.div
        className="fixed bottom-1/3 left-10 w-3 h-3 bg-gray-600 dark:bg-gray-400 rounded-full opacity-50 pointer-events-none z-10"
        animate={{
          x: [0, 15, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </main>
  );
};

export default ConnectionsPage;
