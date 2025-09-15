import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSelector } from "react-redux";

// Icons
import EventIcon from "../icons/event-animated.svg";
import JobsIcon from "../icons/jobs-animated.svg";
import DonationIcon from "../icons/donation-animated.svg";
import GalleryIcon from "../icons/gallery-animated.svg";
import CollegeIcon from "../icons/college-animated.svg";
import QueryIcon from "../icons/query-animated.svg";
// import { SparklesCore } from "../components/ui/Sparkles";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  if (user?.role === "Admin") {
    navigate("/admin/add-edit-Student");
    return null;
  }

  const scrollToCards = () => {
    const cardSection = document.getElementById("card-section");
    cardSection?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  // Generate multiple lines of falling stars with inverted colors
  const generateStarLines = () => {
    const lines = [];
    const numberOfLines = 6;
    const starsPerLine = 8;

    for (let line = 0; line < numberOfLines; line++) {
      for (let star = 0; star < starsPerLine; star++) {
        const xStart = (window.innerWidth / starsPerLine) * star + line * 50;
        const yStart = -100 - line * 150;
        const delay = line * 2 + star * 0.8;

        lines.push(
          <motion.div
            key={`star-${line}-${star}`}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 dark:from-gray-300 dark:via-white dark:to-gray-200"
            initial={{
              x: xStart,
              y: yStart,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: xStart + window.innerHeight * 0.8,
              y: window.innerHeight + 100,
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

  const FeatureCard = ({ icon, title, description, link, index }) => (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="group relative overflow-hidden rounded-3xl h-[320px] sm:h-[300px]"
    >
      {/* Glassmorphism background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />

      {/* Warm hover glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-orange-100/80 via-amber-100/60 to-yellow-100/80 dark:from-purple-500/40 dark:via-cyan-500/30 dark:to-blue-500/40 blur-2xl"
      />

      {/* Elegant border with warm tones */}
      <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-gray-300/70 dark:group-hover:border-gray-600/60 transition-colors duration-300" />

      {/* Content container */}
      <div className="relative h-full p-6 sm:p-8 flex flex-col">
        {/* Warm floating particles */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-gray-700 to-gray-200 dark:from-gray-400 dark:to-black rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500 animate-pulse" />
        <div
          className="absolute top-8 right-8 w-1 h-1 bg-gradient-to-r from-gray-700 to-gray-200 dark:from-gray-500 dark:to-gray-700 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-700 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />

        {/* Header section with icon and title */}
        <div className="flex items-start space-x-4 mb-6">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Warm icon background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100/20 via-gray-900/20 to-gray-900/20 dark:from-gray-900/20 dark:via-gray-100/20 dark:to-gray-100/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-4 bg-gradient-to-br from-gray-50 via-gray-400 to-gray-200 dark:from-gray-950 dark:via-gray-600 dark:to-gray-800 rounded-2xl border border-orange-200/60 dark:border-gray-600/60 shadow-sm group-hover:shadow-lg group-hover:shadow-orange-200/25 dark:group-hover:shadow-gray-500/25 transition-all duration-300">
              <img src={icon} alt={title} className="w-8 h-8 relative z-10" />
            </div>
          </motion.div>

          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900/80 via-gray-400 to-gray-400 dark:from-gray-200 dark:via-gray-500 dark:to-gray-700 bg-clip-text text-transparent mb-2 group-hover:from-orange-700 group-hover:via-amber-600 group-hover:to-orange-800 dark:group-hover:from-gray-100 dark:group-hover:via-gray-400 dark:group-hover:to-gray-600 transition-all duration-300">
              {title}
            </h3>
          </div>
        </div>

        {/* Description with improved styling */}
        <div className="flex-1 relative">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
            {description}
          </p>

          {/* Warm text highlight effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-50/30 to-transparent dark:via-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg blur-sm" />
        </div>

        {/* Bottom section with warm accent */}
        <div className="mt-6 relative">
          {/* Warm gradient accent line */}
          <div className="h-0.5 bg-gradient-to-r from-orange-300 via-amber-400 to-yellow-300 dark:from-gray-500 dark:via-white dark:to-gray-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

          {/* Warm glow effect */}
          <div className="absolute -top-1 left-0 right-0 h-2 bg-gradient-to-r from-orange-200/30 via-amber-200/40 to-yellow-200/30 dark:from-gray-600/10 dark:via-gray-200/10 dark:to-gray-200/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Link indicator */}
          {link && (
            <motion.div
              className="absolute -bottom-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: -10 }}
              animate={{ x: 0 }}
            >
              <div className="flex items-center space-x-1 text-xs text-orange-600 dark:text-gray-400 font-medium">
                <span>Explore</span>
                <motion.svg
                  width="12"
                  height="12"
                  fill="currentColor"
                  className="opacity-60"
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    d="M3.5 6.5L8.5 6.5M6.5 3.5L9.5 6.5L6.5 9.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </motion.svg>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Warm shadow effect */}
      <div className="absolute inset-0 rounded-3xl shadow-lg shadow-gray-200/60 group-hover:shadow-xl group-hover:shadow-orange-300/20 dark:group-hover:shadow-gray-500/25 transition-shadow duration-500" />

      {/* Link wrapper */}
      {link && <Link to={link} className="absolute inset-0 z-30 rounded-3xl" />}
    </motion.div>
  );

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-gray-100/80 to-gray-200/90 dark:from-black dark:via-gray-850/95 dark:to-black">
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

      {/* Multiple lines of falling stars */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {generateStarLines()}
      </div>

      {/* Enhanced dynamic background orbs */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ y: y1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200/50 via-gray-300/40 to-gray-400/50 dark:from-transparent dark:via-transparent dark:to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-gray-600/50 to-gray-800/10 dark:from-gray-400/50 dark:to-gray-200/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-gray-400/50 to-gray-800/20 dark:from-gray-600/50 dark:to-gray-200/20 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ y: y2 }}
      >
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-gray-400/20 to-gray-700/10 dark:from-gray-600/20 dark:to-gray-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-64 h-64 bg-gradient-to-r from-gray-400/10 to-gray-700/10 dark:from-gray-600/10 dark:to-gray-200/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Welcome Section */}
      <section className="relative text-center py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.h1
              className="pb-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-serif mb-6 sm:mb-8 bg-clip-text text-transparent leading-tight bg-gradient-to-r from-gray-900 via-gray-600/90 to-black dark:from-gray-600 dark:to-white"
            >
              Your Alumni Journey Begins Here
            </motion.h1>
            <div className="absolute inset-x-20 bottom-0 bg-gradient-to-r from-transparent via-gray-500 dark:via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 bottom-0 bg-gradient-to-r from-transparent via-gray-500 dark:via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 bottom-0 bg-gradient-to-r from-transparent via-gray-500 dark:via-sky-500 to-transparent h-[2px] w-2/4 blur-sm" />
            <div className="absolute inset-x-60 bottom-0 bg-gradient-to-r from-transparent via-gray-500 dark:via-sky-500 to-transparent h-px w-1/4" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif mb-8 sm:mb-12 text-gray-700 dark:text-gray-300 font-light leading-relaxed"
          >
            Join a vibrant community of graduates who are shaping the future.
            Together, we create lasting connections and meaningful impact.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/alma_connect"
                className="px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 bg-gradient-to-r from-gray-200 to-gray-400 hover:from-gray-300 hover:to-gray-700 hover:text-black text-gray-800 shadow-lg hover:shadow-xl hover:shadow-gray-600/25 dark:bg-gradient-to-r dark:from-gray-950 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-300 dark:hover:text-gray-800 dark:hover:shadow-gray-500/25 dark:text-white"
              >
                Explore AlumniHub
              </Link>
            </motion.div>
            <motion.button
              onClick={scrollToCards}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 bg-white hover:bg-gray-100 text-black border border-gray-300 dark:bg-black dark:hover:bg-gray-900 dark:text-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl backdrop-blur-sm hover:shadow-gray-600/25 dark:hover:shadow-gray-500/25"
            >
              Explore Benefits
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="card-section"
        className="container mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative z-10"
      >
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 font-sans text-gray-900 dark:text-gray-100"
          >
            Your Gateway to Success
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400"
          >
            From career growth to lifelong friendships, discover how our alumni
            network can enrich your professional and personal life.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          <FeatureCard
            icon={EventIcon}
            title="Alumni Events & Meetups"
            description="Experience unforgettable moments at our exclusive events. From intimate networking dinners to grand reunions, create memories that last a lifetime while expanding your professional circle."
            index={0}
          />

          <FeatureCard
            icon={JobsIcon}
            title="Career Opportunities"
            description="Access a curated selection of career opportunities from our trusted network of employers. Whether you're seeking a career change or your next big role, our job board connects you with exclusive opportunities."
            link="/jobs"
            index={1}
          />

          <FeatureCard
            icon={DonationIcon}
            title="Support Your Alma Mater"
            description="Make a meaningful impact on future generations. Your contributions help fund scholarships, enhance campus facilities, and support innovative programs that shape the next generation of leaders."
            link="/donation"
            index={2}
          />

          <FeatureCard
            icon={GalleryIcon}
            title="Memory Lane"
            link="/Memorylane"
            description="Take a stroll down memory lane with our extensive collection of photos and videos. Relive your college days, celebrate achievements, and stay connected with classmates through our digital galleries."
            link="/memorylane"
            index={3}
          />

          <FeatureCard
            icon={CollegeIcon}
            title="College Legacy"
            description="Stay connected with your alma mater's journey. Learn about groundbreaking research, student achievements, and how your college continues to innovate and shape the future of education."
           link="/Legacy"
            index={4}
          />

          <FeatureCard
            icon={QueryIcon}
            title="Alumni Support Hub"
            description="Have questions? Need guidance? Our dedicated support team is here to help. From career advice to alumni benefits, we're committed to ensuring you get the most out of your alumni experience."
            link="/query"
            index={5}
          />
        </motion.div>
      </section>

      {/* Floating accent elements */}
      <motion.div
        className="fixed top-1/4 right-10 w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full opacity-50 dark:opacity-60"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="fixed bottom-1/3 left-10 w-3 h-3 bg-gray-100 dark:bg-gray-900 rounded-full opacity-40 dark:opacity-50"
        animate={{
          x: [0, 15, 0],
          opacity: [0.4, 0.7, 0.4],
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

export default Home;
