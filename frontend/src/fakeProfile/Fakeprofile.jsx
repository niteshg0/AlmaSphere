import { useState, useEffect } from "react";
import { MdNotificationAdd } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import axios from "axios";
// import Modal from "./Model";
import ProfileAvatar from "../Profile/ProfileAvatar.jsx";
import UploadProfileImage from "../Profile/Photo.jsx";
import { AnimatePresence, motion } from "framer-motion";

const pranjal = "/pranjal1.jpg";
const sanskar = "/sanskar.webp";
const nitesh = "/nitesh.webp";
const khushi = "/khushi1.jpg";
const om = "/om1.jpg";
const dibyanshu = "/dibyanshu1.jpg";

import {
  FaUserCircle,
  FaFileAlt,
  FaLink,
  FaArrowRight,
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaClock,
  FaTrophy,
  FaClipboardList,
  FaToolbox,
  FaChalkboardTeacher,
  FaChartLine,
  FaEdit,
  FaPlus,
  FaTimes,
  FaLock,
} from "react-icons/fa";

import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FakeProfile = () => {
  const { id } = useParams();
  const [btnText, setBtnText] = useState("Connect");
  const handleButton = () => {
    setBtnText("Pending");
  };

  // Add missing state variables
  const [openUpload, setOpenUpload] = useState(false);

  // Add missing constants
  const MODAL_TYPES = {
    JOB: "job",
    SKILLS: "skills",
    ACHIEVEMENT: "achievement",
    EXTRACURRICULAR: "extracurricular",
  };

  // Add missing function handlers
  const handleOpenModal = (modalType) => {
    console.log(`Opening modal: ${modalType}`);
    // Add your modal logic here
  };

  const jsonData = [
    {
      id: 1,
      fullName: "Sanskar Singh",
      image: sanskar,
      role: "Student",
      rollNumber: "2023071032",
      branch: "Computer Science",
      batch: "2023-2027",
      cgpa: "8.5",
      connections: [
        {
          id: "conn1",
          name: "Connection 1",
        },
        {
          id: "conn2",
          name: "Connection 2",
        },
      ],
      jobId: {
        position: "Senior Software Developer",
        companyName: "Tech Corp",
        location: "Mumbai, India",
        duration: "2 years",
        previousCompany: [
          {
            companyName: "StartupXYZ",
            position: "Junior Developer",
            duration: "1 year",
          },
          {
            companyName: "WebSolutions Inc",
            position: "Frontend Developer",
            duration: "1.5 years",
          },
        ],
      },
      skillId: {
        technicalSkills: "JavaScript, React, Node.js, Python, MongoDB",
        nonTechnicalSkills:
          "Leadership, Communication, Project Management, Team Collaboration",
      },
      extraId: {
        achievements: [
          {
            title: "Best Project Award",
            description:
              "Won first place in college hackathon for innovative web application",
          },
          {
            title: "Dean's List",
            description:
              "Maintained top 5% academic performance for 4 consecutive semesters",
          },
        ],
        extracurriculars: [
          {
            activity: "Coding Club President",
            description:
              "Led a team of 50+ members, organized workshops and competitions",
            duration: "2 years",
          },
          {
            activity: "Volunteer Teaching",
            description:
              "Taught programming basics to underprivileged children",
            duration: "1 year",
          },
        ],
      },
      analyticsId: {
        QueryAnswered: 5,
        jobPosted: 3,
        EventOrganised: 8,
      },
    },
    {
      id: 2,
      fullName: "Nitesh Kumar Gupta",
      role: "Alumni",
      image: nitesh,
      rollNumber: "2023071049",
      branch: "IT",
      batch: "2023-2027",
      cgpa: "8.9",
      connections: [
        { id: "conn1", name: "Shubham Tiwari" },
        { id: "conn2", name: "Neha Agarwal" },
        { id: "conn3", name: "Karan Singh" },
        { id: "conn4", name: "Divya Joshi" },
        { id: "conn5", name: "Rajesh Yadav" },
      ],
      jobId: {
        position: "ML Engineer Intern",
        companyName: "Microsoft",
        location: "Hyderabad, India",
        duration: "6 months",
        previousCompany: [
          {
            companyName: "Analytics Startup",
            position: "Data Analyst Intern",
            duration: "3 months",
          },
        ],
      },
      skillId: {
        // Fixed: Convert array to string for consistency
        technicalSkills:
          "Python, Machine Learning, TensorFlow, Pandas, SQL, R, Power BI, Apache Spark",
        nonTechnicalSkills:
          "Research Skills, Critical Thinking, Presentation, Cross-functional Collaboration",
      },
      extraId: {
        achievements: [
          {
            title: "Kaggle Competition Silver Medal",
            description:
              "Achieved top 5% ranking in international machine learning competition",
          },
          {
            title: "Research Paper Published",
            description:
              "Co-authored paper on ML applications in healthcare, published in IEEE conference",
          },
        ],
        extracurriculars: [
          {
            activity: "AI Research Group",
            description:
              "Conducted research on computer vision and NLP applications",
            duration: "2 years",
          },
          {
            activity: "Data Science Workshop Instructor",
            description: "Taught Python and ML basics to 100+ junior students",
            duration: "1 year",
          },
        ],
      },
      analyticsId: {
        QueryAnswered: 89,
        jobPosted: 3,
        EventOrganised: 15,
      },
    },
    {
      id: 3,
      fullName: "Khushi Singh",
      role: "Student",
      image: khushi,
      rollNumber: "2023071041",
      branch: "IT",
      batch: "2023-2027",
      cgpa: "9.1",
      connections: [
        { id: "conn1", name: "Priya Patel" },
        { id: "conn2", name: "Arjun Kumar" },
        { id: "conn3", name: "Sneha Gupta" },
        { id: "conn4", name: "Rohit Sharma" },
      ],
      jobId: {
        position: "Frontend Developer Intern",
        companyName: "Flipkart",
        location: "Bangalore, India",
        duration: "6 months",
        previousCompany: [
          {
            companyName: "Startup Incubator",
            position: "Web Developer",
            duration: "3 months",
          },
        ],
      },
      skillId: {
        technicalSkills:
          "React, JavaScript, Python, Node.js, MongoDB, HTML/CSS, Git, AWS",
        nonTechnicalSkills:
          "Communication, Creative Problem Solving, Time Management, Mentoring",
      },
      extraId: {
        achievements: [
          {
            title: "Hackathon Winner",
            description:
              "Won first place in Smart India Hackathon for developing educational app",
          },
          {
            title: "Google Developer Student Club Lead",
            description:
              "Led GDSC chapter with 200+ members, organized coding bootcamps",
          },
        ],
        extracurriculars: [
          {
            activity: "Coding Club President",
            description:
              "Managed coding club activities and competitive programming sessions",
            duration: "1.5 years",
          },
          {
            activity: "Women in Tech Advocate",
            description:
              "Promoted diversity in technology through workshops and mentorship",
            duration: "2 years",
          },
        ],
      },
      analyticsId: {
        QueryAnswered: 67,
        jobPosted: 2,
        EventOrganised: 12,
      },
    },
    {
      id: 4,
      fullName: "Om Vishwakarma",
      role: "Student",
      image: om,
      rollNumber: "2023071050",
      branch: "IT",
      batch: "2023-2027",
      cgpa: "8.4",
      connections: [
        { id: "conn1", name: "Amit Rajput" },
        { id: "conn2", name: "Sarthak Jain" },
      ],
      jobId: {
        position: "Backend Developer Intern",
        companyName: "Zomato",
        location: "Gurgaon, India",
        duration: "4 months",
        previousCompany: [
          {
            companyName: "Local Web Agency",
            position: "Junior Developer",
            duration: "2 months",
          },
        ],
      },
      skillId: {
        technicalSkills:
          "Java, Spring Boot, React, MySQL, Docker, Kubernetes, REST APIs",
        nonTechnicalSkills:
          "Analytical Thinking, Team Collaboration, Public Speaking, Adaptability",
      },
      extraId: {
        achievements: [
          {
            title: "Open Source Contributor",
            description:
              "Contributed to 5+ open source projects on GitHub with 100+ stars",
          },
          {
            title: "Technical Blog Writer",
            description:
              "Published 15+ technical articles on Medium with 1000+ readers",
          },
        ],
        extracurriculars: [
          {
            activity: "Debate Society Member",
            description: "Participated in inter-college debate competitions",
            duration: "1 year",
          },
          {
            activity: "Freelance Developer",
            description: "Developed websites for local businesses",
            duration: "18 months",
          },
        ],
      },
      analyticsId: {
        QueryAnswered: 34,
        jobPosted: 0,
        EventOrganised: 6,
      },
    },
    {
      id: 5,
      fullName: "Pranjal Shahi",
      role: "Alumni",
      image: pranjal,
      rollNumber: "2023041059",
      branch: "ECE",
      batch: "2023-2027",
      cgpa: "8.7",
      connections: [
        { id: "conn1", name: "Rahul Verma" },
        { id: "conn2", name: "Anita Sharma" },
        { id: "conn3", name: "Vikash Singh" },
      ],
      jobId: {
        position: "Hardware Design Intern",
        companyName: "Qualcomm India",
        location: "Bangalore, India",
        duration: "6 months",
        previousCompany: [
          {
            companyName: "TechMahindra",
            position: "Summer Intern",
            duration: "2 months",
          },
        ],
      },
      skillId: {
        technicalSkills:
          "Circuit Design, VLSI, Embedded Systems, MATLAB, Verilog, PCB Design",
        nonTechnicalSkills:
          "Problem Solving, Team Leadership, Technical Writing, Project Management",
      },
      extraId: {
        achievements: [
          {
            title: "Best Circuit Design Project",
            description:
              "Designed an innovative IoT-based home automation system using Arduino and sensors",
          },
          {
            title: "IEEE Student Member",
            description:
              "Active member of IEEE student chapter, organized technical workshops",
          },
        ],
        extracurriculars: [
          {
            activity: "Robotics Club Member",
            description:
              "Built autonomous robots for national level competitions",
            duration: "2 years",
          },
          {
            activity: "Technical Event Coordinator",
            description: "Organized college tech fest electronics competitions",
            duration: "1 year",
          },
        ],
      },
      analyticsId: {
        QueryAnswered: 23,
        jobPosted: 1,
        EventOrganised: 4,
      },
    },
  ];

  const [userData, setUserData] = useState({});

  const getJsonData = () => {
    setUserData(jsonData[id - 1]);
    console.log(id);
  };

  useEffect(() => {
    getJsonData();
  }, [id]);

  // Helper function to process skills (handle both string and array formats)
  const getSkillsArray = (skills) => {
    if (Array.isArray(skills)) {
      return skills;
    }
    if (typeof skills === "string") {
      return skills.split(",").map((skill) => skill.trim());
    }
    return [];
  };

  // Get processed skills
  const technicalSkills = userData?.skillId?.technicalSkills
    ? getSkillsArray(userData?.skillId?.technicalSkills)
    : [];

  const nonTechnicalSkills = userData?.skillId?.nonTechnicalSkills
    ? getSkillsArray(userData?.skillId?.nonTechnicalSkills)
    : [];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-gray-100/80 to-gray-200/90 dark:from-black dark:via-gray-850/95 dark:to-black py-8 px-4 sm:px-6 lg:px-8">
      {/* Single cursor glow effect */}
      <motion.div
        className="fixed pointer-events-none z-50"
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      >
        <div className="w-48 h-48 bg-gradient-to-r from-indigo-200/10 via-purple-100/15 to-pink-200/10 dark:from-gray-400/10 dark:via-gray-300/15 dark:to-gray-200/10 rounded-full blur-2xl opacity-60" />
      </motion.div>

      {/* Background orbs */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        animate={{
          y: [0, -50, 0],
          x: [0, 25, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute top-60 left-40 w-72 h-72 bg-gradient-to-r from-gray-600/50 to-gray-800/10 dark:from-gray-400/50 dark:to-gray-200/10 rounded-full blur-3xl" />
        <div className="absolute top-80 right-60 w-96 h-96 bg-gradient-to-r from-gray-400/50 to-gray-800/20 dark:from-gray-600/50 dark:to-gray-200/20 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        animate={{
          y: [0, -100, 0],
          x: [0, -25, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-gray-400/20 to-gray-700/10 dark:from-gray-600/20 dark:to-gray-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-64 h-64 bg-gradient-to-r from-gray-400/10 to-gray-700/10 dark:from-gray-600/10 dark:to-gray-200/10 rounded-full blur-3xl" />
      </motion.div>

      {/* UPDATED LAYOUT - Main Content */}
      <div className="max-w-7xl mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN - Main Profile Content (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />
              <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />
              <div className="absolute top-6 right-8 w-2 h-2 bg-gradient-to-r from-sky-400 to-blue-500 dark:from-gray-200 dark:to-white rounded-full opacity-60 animate-pulse" />

              <div className="relative p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                  <div className="flex-shrink-0">
                    <div
                      className="w-32 h-32 rounded-full bg-indigo-100 dark:bg-indigo-900/30 
             border-2 border-indigo-300 dark:border-indigo-700 
             flex items-center justify-center overflow-hidden 
             cursor-pointer"
                    >
                      {/* <svg
                        className="w-16 h-16 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 
           7.5 5.015 7.5 7.5 9.515 12 12 12zm-7.5 
           9a7.5 7.5 0 0115 0H4.5z"
                          clipRule="evenodd"
                        /> 
                      </svg>*/}
                      <img
                        src={userData?.image}
                        alt="user image"
                        className="bg-cover rounded-full"
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                      <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
                          {userData?.fullName}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                          {userData?.role || "Alumni"}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* <Link to="/network">
                          {userData?.connections?.length > 0 ? (
                            <MdNotificationAdd className="text-2xl text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors" />
                          ) : (
                            <IoIosNotifications className="text-2xl text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors" />
                          )}
                        </Link> */}
                        <motion.button
                          whileHover={{ scale: 1.05, y: -1 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-600/90 hover:to-purple-600/90 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/30 dark:from-gray-950 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-300 dark:hover:text-gray-800 transition-all duration-300 flex items-center gap-2"
                          onClick={handleButton}
                        >
                          {btnText}
                        </motion.button>
                      </div>
                    </div>

                    {/* Academic Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="group/info relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" />
                        <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40 group-hover/info:border-indigo-300/50 dark:group-hover/info:border-gray-500/50 transition-colors duration-300" />

                        <div className="relative p-4 flex flex-col items-center justify-center text-center">
                          <FaGraduationCap className="mx-auto text-indigo-500 dark:text-indigo-400 mb-2" />
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {userData?.rollNumber}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Roll No.
                          </p>
                        </div>
                      </div>

                      <div className="group/info relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" />
                        <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40 group-hover/info:border-indigo-300/50 dark:group-hover/info:border-gray-500/50 transition-colors duration-300" />

                        <div className="relative p-4 text-center flex flex-col items-center justify-center">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {userData?.branch}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Branch
                          </p>
                        </div>
                      </div>

                      <div className="group/info relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" />
                        <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40 group-hover/info:border-indigo-300/50 dark:group-hover/info:border-gray-500/50 transition-colors duration-300" />

                        <div className="relative p-4 flex flex-col items-center justify-center text-center">
                          <p className="text-sm font-medium  text-gray-700 dark:text-gray-300">
                            {userData?.batch}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Batch
                          </p>
                        </div>
                      </div>

                      <div className="group/info relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" />
                        <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40 group-hover/info:border-indigo-300/50 dark:group-hover/info:border-gray-500/50 transition-colors duration-300" />

                        <div className="relative flex flex-col items-center justify-center p-4 text-center">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {userData?.cgpa || "N/A"}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            CGPA
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-600/90 hover:to-purple-600/90 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/30 dark:from-gray-950 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-300 dark:hover:text-gray-800 transition-all duration-300 flex items-center gap-2"
                      >
                        <FaFileAlt />
                        Resume
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Job History Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />
              <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

              <div className="relative p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent flex items-center gap-2">
                    <FaBriefcase />
                    Job History
                  </h2>
                  {/* <motion.button
                    onClick={() => handleOpenModal(MODAL_TYPES.JOB)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl backdrop-blur-sm bg-white/30 dark:bg-black/30 text-indigo-600 dark:text-indigo-400 border border-gray-300/40 dark:border-gray-600/40 hover:border-indigo-300/50 dark:hover:border-gray-500/50 transition-all duration-300 shadow-lg"
                  >
                    {userData?.jobId ? (
                      <FaEdit className="w-5 h-5" />
                    ) : (
                      <FaPlus className="w-5 h-5" />
                    )}
                  </motion.button> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Job */}
                  <div className="group/job relative overflow-hidden rounded-2xl">
                    {/* <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" /> */}
                    <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40 group-hover/job:border-indigo-300/50 dark:group-hover/job:border-gray-500/50 transition-colors duration-300" />

                    <div className="relative p-6">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent mb-4">
                        Current Position
                      </h3>
                      <div className="space-y-2">
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          {userData?.jobId?.position || "Not specified"}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          {userData?.jobId?.companyName || "Not specified"}
                        </p>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <FaMapMarkerAlt className="mr-2" />
                          {userData?.jobId?.location || "Not specified"}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <FaClock className="mr-2" />
                          {userData?.jobId?.duration || "Not specified"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Previous Jobs */}
                  <div className="group/job relative overflow-hidden rounded-2xl">
                    {/* <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" /> */}
                    <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40 group-hover/job:border-indigo-300/50 dark:group-hover/job:border-gray-500/50 transition-colors duration-300" />

                    <div className="relative p-6">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent mb-4">
                        Previous Experience
                      </h3>
                      <div className="space-y-3">
                        {userData?.jobId?.previousCompany?.length > 0 ? (
                          userData.jobId.previousCompany.map(
                            (prevjob, index) => (
                              <div
                                key={index}
                                className="border-l-2 border-indigo-200 dark:border-gray-600 pl-3"
                              >
                                <p className="font-medium text-gray-800 dark:text-gray-200">
                                  {prevjob?.companyName}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {prevjob?.position}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                  {prevjob?.duration}
                                </p>
                              </div>
                            )
                          )
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                            No previous jobs listed
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Skills Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group relative overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />
              <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

              <div className="relative p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent flex items-center gap-2">
                    <FaToolbox />
                    Skills
                  </h2>
                  {/* <motion.button
                    onClick={() => handleOpenModal(MODAL_TYPES.SKILLS)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl backdrop-blur-sm bg-white/30 dark:bg-black/30 text-indigo-600 dark:text-indigo-400 border border-gray-300/40 dark:border-gray-600/40 hover:border-indigo-300/50 dark:hover:border-gray-500/50 transition-all duration-300 shadow-lg"
                  >
                    {userData?.skillId ? (
                      <FaEdit className="w-5 h-5" />
                    ) : (
                      <FaPlus className="w-5 h-5" />
                    )}
                  </motion.button> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Technical Skills */}
                  <div className="group/skill relative overflow-hidden rounded-2xl">
                    {/* <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" /> */}
                    <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40 group-hover/skill:border-indigo-300/50 dark:group-hover/skill:border-gray-500/50 transition-colors duration-300" />

                    <div className="relative p-6">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                        <FaToolbox className="text-sm" />
                        Technical Skills
                      </h3>
                      <div className="space-y-2">
                        {technicalSkills.length > 0 ? (
                          technicalSkills.map((skill, index) => (
                            <div key={index} className="flex items-center">
                              <span className="text-indigo-500 dark:text-indigo-400 mr-3">
                                →
                              </span>
                              <span className="text-gray-700 dark:text-gray-300">
                                {skill.trim()}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                            No technical skills listed
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Non-Technical Skills */}
                  <div className="group/skill relative overflow-hidden rounded-2xl">
                    {/* <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" /> */}
                    <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40 group-hover/skill:border-indigo-300/50 dark:group-hover/skill:border-gray-500/50 transition-colors duration-300" />

                    <div className="relative p-6">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                        <FaChalkboardTeacher className="text-sm" />
                        Soft Skills
                      </h3>
                      <div className="space-y-2">
                        {nonTechnicalSkills.length > 0 ? (
                          nonTechnicalSkills.map((skill, index) => (
                            <div key={index} className="flex items-center">
                              <span className="text-indigo-500 dark:text-indigo-400 mr-3">
                                →
                              </span>
                              <span className="text-gray-700 dark:text-gray-300">
                                {skill.trim()}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                            No soft skills listed
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Achievements and Extracurricular */}
            <div className="space-y-8">
              {/* Achievements Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="group relative overflow-hidden rounded-3xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />
                <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

                <div className="relative p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent flex items-center gap-2">
                      <FaTrophy />
                      Achievements
                    </h2>
                    {/* <motion.button
                      onClick={() => handleOpenModal(MODAL_TYPES.ACHIEVEMENT)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-xl backdrop-blur-sm bg-white/30 dark:bg-black/30 text-indigo-600 dark:text-indigo-400 border border-gray-300/40 dark:border-gray-600/40 hover:border-indigo-300/50 dark:hover:border-gray-500/50 transition-all duration-300 shadow-lg"
                    >
                      <FaPlus className="w-5 h-5" />
                    </motion.button> */}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData?.extraId?.achievements?.length > 0 ? (
                      userData.extraId.achievements.map(
                        (achievement, index) => (
                          <div
                            key={index}
                            className="group/achievement relative overflow-hidden rounded-2xl"
                          >
                            {/* <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" /> */}
                            <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40 group-hover/achievement:border-green-300/50 dark:group-hover/achievement:border-green-500/50 transition-colors duration-300" />

                            <div className="relative p-6 flex items-start gap-3">
                              <span className="text-green-500 dark:text-green-400 mt-1 text-xl">
                                🏆
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-green-600 dark:text-green-400 mb-2">
                                  {achievement.title}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {achievement.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <div className="col-span-full group/achievement relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" />
                        <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40" />

                        <div className="relative p-8 text-center">
                          <p className="text-gray-500 dark:text-gray-400">
                            No achievements listed
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Extracurricular Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="group relative overflow-hidden rounded-3xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />
                <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

                <div className="relative p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent flex items-center gap-2">
                      <FaClipboardList />
                      Extracurricular Activities
                    </h2>
                    {/* <motion.button
                      onClick={() =>
                        handleOpenModal(MODAL_TYPES.EXTRACURRICULAR)
                      }
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-xl backdrop-blur-sm bg-white/30 dark:bg-black/30 text-indigo-600 dark:text-indigo-400 border border-gray-300/40 dark:border-gray-600/40 hover:border-indigo-300/50 dark:hover:border-gray-500/50 transition-all duration-300 shadow-lg"
                    >
                      <FaPlus className="w-5 h-5" />
                    </motion.button> */}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData?.extraId?.extracurriculars?.length > 0 ? (
                      userData.extraId.extracurriculars.map(
                        (act, index) =>
                          act && (
                            <div
                              key={index}
                              className="group/extra relative overflow-hidden rounded-2xl"
                            >
                              {/* <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" /> */}
                              <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40 group-hover/extra:border-blue-300/50 dark:group-hover/extra:border-blue-500/50 transition-colors duration-300" />

                              <div className="relative p-6 flex items-start gap-3">
                                <span className="text-blue-500 dark:text-blue-400 mt-1 text-xl">
                                  🎯
                                </span>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-blue-600 dark:text-blue-400 mb-2">
                                    {act.activity}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    {act.description}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-500">
                                    {act.duration}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                      )
                    ) : (
                      <div className="col-span-full group/extra relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" />
                        <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40" />

                        <div className="relative p-8 text-center">
                          <p className="text-gray-500 dark:text-gray-400">
                            No extracurricular activities listed
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky space-y-8">
              {/* Connections Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="group relative overflow-hidden rounded-3xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />
                <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

                <div className="relative p-8 text-center">
                  <FaUserCircle className="mx-auto text-5xl text-indigo-500 dark:text-indigo-400 mb-4" />
                  <Link to="/connectedUser">
                    <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent mb-2">
                      {userData?.connections?.length || 0}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      Connections
                    </p>
                  </Link>
                </div>
              </motion.div>

              {/* Analytics Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative overflow-hidden rounded-3xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />
                <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

                <div className="relative p-8">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent mb-6 flex items-center gap-2">
                    <FaChartLine />
                    Analytics
                  </h2>

                  <div className="space-y-6">
                    <div className="group/stat relative overflow-hidden rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-100/60 to-emerald-100/60 dark:from-green-900/20 dark:to-emerald-900/20 backdrop-blur-sm" />
                      <div className="absolute inset-0 rounded-2xl border border-green-200/40 dark:border-green-800/40" />

                      <div className="relative p-6 text-center">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                          ₹0
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          Donations
                        </p>
                      </div>
                    </div>

                    <div className="group/stat relative overflow-hidden rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/60 to-cyan-100/60 dark:from-blue-900/20 dark:to-cyan-900/20 backdrop-blur-sm" />
                      <div className="absolute inset-0 rounded-2xl border border-blue-200/40 dark:border-blue-800/40" />

                      <div className="relative p-6 text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                          {userData?.analyticsId?.QueryAnswered || 0}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          Queries Answered
                        </p>
                      </div>
                    </div>

                    <div className="group/stat relative overflow-hidden rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/60 to-pink-100/60 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm" />
                      <div className="absolute inset-0 rounded-2xl border border-purple-200/40 dark:border-purple-800/40" />

                      <div className="relative p-6 text-center">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                          {userData?.analyticsId?.jobPosted || 0}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          Jobs Posted
                        </p>
                      </div>
                    </div>

                    <div className="group/stat relative overflow-hidden rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/60 to-amber-100/60 dark:from-orange-900/20 dark:to-amber-900/20 backdrop-blur-sm" />
                      <div className="absolute inset-0 rounded-2xl border border-orange-200/40 dark:border-orange-800/40" />

                      <div className="relative p-6 text-center">
                        <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                          {userData?.analyticsId?.EventOrganised || 0}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          Events Organized
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {openUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="group relative overflow-hidden rounded-3xl max-w-md w-full mx-4"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />
              <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40" />

              <div className="relative p-6">
                <button
                  onClick={() => setOpenUpload(false)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 text-xl transition-colors p-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                >
                  ✕
                </button>

                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Upload Profile Image
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    This feature is not available in demo mode.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          borderRadius: "10px",
          padding: "12px 16px",
          fontSize: "14px",
          fontWeight: "500",
        }}
      />

      {/* Floating accent elements */}
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
    </div>
  );
};

export default FakeProfile;
