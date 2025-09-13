import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FilterSidebar from "../components/AlmaConnectCards/FilterSideBar";
import UserShownCard from "../components/AlmaConnectCards/UserShownCard";
import SearchCard from "../components/AlmaConnectCards/SearchCard";

// Sample alumni data (move to a separate data file or API if needed)
const alumniData = [
  {
    id: 1,
    username: "Sanskar Singh",
    batch: "2027",
    course: "Computer Science",
    connections: 11,
    avatar: null,
  },
  {
    id: 2,
    username: "Pranjal Shahi",
    batch: "2027",
    course: "Electronics Engineering",
    connections: 32,
    avatar: null,
  
  },
  {
    id: 3,
    username: "Nitesh Kumar Gupta",
    batch: "2027",
    course: "Information Technology",
    connections: 49,
    avatar: null,
  },
  {
    id: 4,
    username: "Dibyanshu Yadav",
    batch: "2027",
    course: "Information Technology",
    connections: 32,
    avatar: null,
  
  },
  {
    id: 5,
    username: "Om Vishwakarma",
    batch: "2027",
    course: "Information Technology",
    connections: 3,
    avatar: null,
  },
  {
    id: 6,
    username: "Khushi Singh",
    batch: "2027",
    course: "Information Technology",
    connections: 2,
    avatar: null,
  },
  {
    id: 7,
    username: "JohnDoe",
    batch: "2027",
    course: "Information Technology",
    connections: 12,
    avatar: null,
  },
  {
    id: 8,
    username: "SarahWilson",
    batch: "2023",
    course: "Computer Science",
    connections: 8,
    avatar: null,
  },
  {
    id: 9,
    username: "MikeJohnson",
    batch: "2024",
    course: "Electronics Engg",
    connections: 15,
    avatar: null,
  },
  {
    id: 10,
    username: "EmilyDavis",
    batch: "2022",
    course: "Information Technology",
    connections: 6,
    avatar: null,
  },
  {
    id: 11,
    username: "RobertBrown",
    batch: "2024",
    course: "Mechanical Engg",
    connections: 9,
    avatar: null,
  },
  {
    id: 12,
    username: "JessicaWilson",
    batch: "2023",
    course: "Civil Engineering",
    connections: 11,
    avatar: null,
  },
];

const AlmaSearch = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  // Track mouse position for interactive glow effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate multiple lines of falling stars with window object check
  const generateStarLines = () => {
    const lines = [];
    const numberOfLines = 6;
    const starsPerLine = 8;

    // Check if window is available (for SSR compatibility)
    const windowWidth =
      typeof window !== "undefined" ? window.innerWidth : 1920;
    const windowHeight =
      typeof window !== "undefined" ? window.innerHeight : 1080;

    for (let line = 0; line < numberOfLines; line++) {
      for (let star = 0; star < starsPerLine; star++) {
        const xStart = (windowWidth / starsPerLine) * star + line * 50;
        const yStart = -100 - line * 150;
        const delay = line * 2 + star * 0.8;

        lines.push(
          <motion.div
            key={`star-${line}-${star}`}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-gray-200 to-white"
            initial={{
              x: xStart,
              y: yStart,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: xStart + windowHeight * 0.8,
              y: windowHeight + 100,
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
            }}
            transition={{
              duration: 6,
              delay: delay,
              repeat: Infinity,
              repeatDelay: 12,
              ease: "linear",
            }}
            style={{
              boxShadow: "0 0 4px currentColor",
            }}
          />
        );
      }
    }
    return lines;
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-850/95 to-black">
      {/* Falling stars animation */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {generateStarLines()}
      </div>

      {/* Background orbs */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ y: y1 }}
      >
        <div className="absolute top-60 left-40 w-72 h-72 bg-gradient-to-r from-gray-400/50 to-gray-200/10 rounded-full blur-3xl" />
        <div className="absolute top-80 right-60 w-96 h-96 bg-gradient-to-r from-gray-600/50 to-gray-200/20  rounded-full blur-3xl" />
      </motion.div>
      {/* from-blue-600/15 to-violet-600/20 */}

      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ y: y2 }}
      >
        {/* from-cyan-600/20 to-blue-600/15  */}
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-gray-600/20 to-gray-300/10  rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-64 h-64 bg-gradient-to-r from-gray-600/10 to-gray-200/10 rounded-full blur-3xl" />
      </motion.div>
      {/* from-purple-600/25 to-pink-600/20  */}

      {/* Header */}
      <section className="relative z-10 pt-8 pb-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-gray-600 to-white bg-clip-text text-transparent">
              AlmaSearch
            </h1>
            <SearchCard searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="relative z-10 px-4 sm:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar filters */}
            <div className="lg:col-span-1">
              <FilterSidebar
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
                selectedBranch={selectedBranch}
                setSelectedBranch={setSelectedBranch}
              />
            </div>

            {/* Alumni grid */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {alumniData.map((alumni, index) => (
                  <UserShownCard
                    key={alumni.id}
                    alumni={alumni}
                    index={index}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating accent elements */}
      {/* <motion.div
        className="fixed top-1/4 right-10 w-2 h-2 bg-gray-400 rounded-full opacity-60"
        animate={{
          y: [0, -20, 0],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      /> */}

      <motion.div
        className="fixed bottom-1/3 left-10 w-3 h-3 bg-gray-900 rounded-full opacity-50"
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

export default AlmaSearch;
