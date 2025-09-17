import React, { useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FilterSidebar from "../components/AlmaConnectCards/FilterSideBar";
import UserShownCard from "../components/AlmaConnectCards/UserShownCard";
import SearchCard from "../components/AlmaConnectCards/SearchCard";

// Sample alumni data (unchanged)

const alumniData = [
  {
    id: 1,
    username: "Sanskar Singh",
    batch: "2027",
    course: "Computer Science",
    connections: 11,
    avatar: "/sanskar.webp",
  },
  {
    id: 2,
    username: "Pranjal Shahi",
    batch: "2027",
    course: "Electronics Engineering",
    connections: 32,
    avatar: "/pranjal1.jpg",
  },
  {
    id: 3,
    username: "Nitesh Kumar Gupta",
    batch: "2027",
    course: "Information Technology",
    connections: 49,
    avatar: "/nitesh.webp",
  },
  {
    id: 4,
    username: "Dibyanshu Yadav",
    batch: "2027",
    course: "Information Technology",
    connections: 32,
    avatar: "/dibyanshu1.jpg",
  },
  {
    id: 5,
    username: "Om Vishwakarma",
    batch: "2027",
    course: "Information Technology",
    connections: 3,
    avatar: "/om1.jpg",
  },
  {
    id: 6,
    username: "Khushi Singh",
    batch: "2027",
    course: "Information Technology",
    connections: 2,
    avatar: "/khushi1.jpg",
  },
  {
    id: 13,
    username: "Pravesh Kumar",
    batch: "2024",
    course: "Computer Science",
    connections: 3,
    avatar: null,
  },
  {
    id: 14,
    username: "Divyanshu Tripathi",
    batch: "2024",
    course: "Electronic Eng",
    connections: 7,
    avatar: null,
  },
  {
    id: 15,
    username: "Sakshi Shahi",
    batch: "2027",
    course: "Computer Science",
    connections: 1,
    avatar: null,
  },
  {
    id: 16,
    username: "Manish Paityawal",
    batch: "2024",
    course: "Electronic Eng",
    connections: 23,
    avatar: null,
  },
  {
    id: 7,
    username: "Satyam Rao",
    batch: "2027",
    course: "Electronic Eng",
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

  // ONLY ADDED: Filter alumni data based on search and filter criteria
  const filteredAlumni = useMemo(() => {
    return alumniData.filter((alumni) => {
      const matchesSearch =
        searchTerm === "" ||
        alumni.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.id.toString().includes(searchTerm);

      const matchesYear = selectedYear === "" || alumni.batch === selectedYear;

      const matchesCourse =
        selectedCourse === "" ||
        alumni.course.toLowerCase().includes(selectedCourse.toLowerCase());

      const matchesBranch =
        selectedBranch === "" ||
        alumni.course.toLowerCase().includes(selectedBranch.toLowerCase());

      return matchesSearch && matchesYear && matchesCourse && matchesBranch;
    });
  }, [searchTerm, selectedYear, selectedCourse, selectedBranch]);

  // Single mouse position tracker for the entire page (unchanged)
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate multiple lines of falling stars with window object check (unchanged)
  const generateStarLines = () => {
    // ... your exact same function
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-gray-100/80 to-gray-200/90 dark:from-black dark:via-gray-850/95 dark:to-black">
      {/* All your original styling components unchanged */}

      {/* Header */}
      <section className="relative z-10 pt-8 pb-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-700 dark:from-gray-600 dark:via-white dark:to-gray-600 bg-clip-text text-transparent">
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

            {/* Alumni grid - ONLY CHANGED: Use filteredAlumni instead of alumniData */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filteredAlumni.map((alumni, index) => (
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

      {/* Floating accent elements (unchanged) */}
      <motion.div
        className="fixed bottom-1/3 left-10 w-3 h-3 bg-gray-600 dark:bg-gray-400 rounded-full opacity-50"
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
