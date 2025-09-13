import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Icons
import EventIcon from "../icons/event-animated.svg";
import JobsIcon from "../icons/jobs-animated.svg";
import DonationIcon from "../icons/donation-animated.svg";
import GalleryIcon from "../icons/gallery-animated.svg";
import CollegeIcon from "../icons/college-animated.svg";
import QueryIcon from "../icons/query-animated.svg";
import { useSelector } from "react-redux";

const Home = () => {

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  if (user?.role === "Admin") {
    navigate("/admin/add-edit-Student")
    return
  }

  const scrollToCards = () => {
    const cardSection = document.getElementById("card-section");
    cardSection?.scrollIntoView({ behavior: "smooth" });
  };



  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-200">
      {/* Welcome Section */}
      <section className="relative text-center py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="pb-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
               font-bold font-serif mb-6 sm:mb-8 
               bg-clip-text text-transparent leading-tight 
               bg-gradient-to-r from-indigo-900 via-purple-700 to-purple-900 
               dark:from-indigo-400 dark:via-purple-500 dark:to-purple-400 
               animated-gradient">
            Your Alumni Journey Begins Here
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif mb-8 sm:mb-12 text-gray-700 dark:text-gray-300 font-light leading-relaxed">
            Join a vibrant community of graduates who are shaping the future.
            Together, we create lasting connections and meaningful impact.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/about"
              className="px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Explore AlumniHub
            </Link>
            <button
              onClick={scrollToCards}
              className="px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 bg-white hover:bg-gray-50 text-indigo-900 border border-indigo-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-700"
            >
              Explore Benefits
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="card-section"
        className="container mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6"
      >
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 font-sans text-indigo-900 dark:text-indigo-400">
            Your Gateway to Success
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            From career growth to lifelong friendships, discover how our alumni
            network can enrich your professional and personal life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Event Card */}
          <Link to="/events" className="block h-auto sm:h-[280px]">
            <div className="group relative p-4 sm:p-6 md:p-8 rounded-3xl overflow-hidden transition-all duration-500 h-auto sm:h-[280px] flex flex-col bg-gradient-to-br from-white/95 via-blue-50/95 to-indigo-50/95 dark:from-gray-800/90 dark:via-gray-800/90 dark:to-gray-900/90 shadow-lg dark:shadow-gray-900/20">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6">
                  <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 transform transition-all duration-300 group-hover:scale-110 mb-3 sm:mb-0 inline-flex">
                    <img src={EventIcon} alt="Events" className="w-8 h-8" />
                  </div>
                  <h3 className="sm:ml-4 text-xl sm:text-2xl font-bold text-indigo-900 dark:text-indigo-400">
                    Alumni Events & Meetups
                  </h3>
                </div>
                <p className="text-sm sm:text-base leading-relaxed flex-grow text-gray-600 dark:text-gray-300">
                  Experience unforgettable moments at our exclusive events. From
                  intimate networking dinners to grand reunions, create memories
                  that last a lifetime while expanding your professional circle.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 dark:bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          </Link>

          {/* Jobs Card */}

          <Link to="/jobs" className="block h-auto sm:h-[280px]">
            <div className="group relative p-4 sm:p-6 md:p-8 rounded-3xl overflow-hidden transition-all duration-500 h-full flex flex-col bg-gradient-to-br from-white/95 via-blue-50/95 to-indigo-50/95 dark:from-gray-800/90 dark:via-gray-800/90 dark:to-gray-900/90 shadow-lg dark:shadow-gray-900/20">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6">
                  <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 transform transition-all duration-300 group-hover:scale-110 mb-3 sm:mb-0 inline-flex">
                    <img src={JobsIcon} alt="Jobs" className="w-8 h-8" />
                  </div>
                  <h3 className="sm:ml-4 text-xl sm:text-2xl font-bold text-indigo-900 dark:text-indigo-400">
                    Career Opportunities
                  </h3>
                </div>
                <p className="text-sm sm:text-base leading-relaxed flex-grow text-gray-600 dark:text-gray-300">
                  Access a curated selection of career opportunities from our
                  trusted network of employers. Whether you're seeking a career
                  change or your next big role, our job board connects you with
                  exclusive opportunities.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 dark:bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          </Link>

          {/* Donation Card */}
          <Link to="/donation" className="block h-auto sm:h-[280px]">
            <div className="group relative p-4 sm:p-6 md:p-8 rounded-3xl overflow-hidden transition-all duration-500 h-full flex flex-col bg-gradient-to-br from-white/95 via-blue-50/95 to-indigo-50/95 dark:from-gray-800/90 dark:via-gray-800/90 dark:to-gray-900/90 shadow-lg dark:shadow-gray-900/20">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6">
                  <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 transform transition-all duration-300 group-hover:scale-110 mb-3 sm:mb-0 inline-flex">
                    <img
                      src={DonationIcon}
                      alt="Donations"
                      className="w-8 h-8"
                    />
                  </div>
                  <h3 className="sm:ml-4 text-xl sm:text-2xl font-bold text-indigo-900 dark:text-indigo-400">
                    Support Your Alma Mater
                  </h3>
                </div>
                <p className="text-sm sm:text-base leading-relaxed flex-grow text-gray-600 dark:text-gray-300">
                  Make a meaningful impact on future generations. Your
                  contributions help fund scholarships, enhance campus
                  facilities, and support innovative programs that shape the
                  next generation of leaders.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 dark:bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          </Link>

          {/* Galleries Card */}
          <div className="group relative p-4 sm:p-6 md:p-8 rounded-3xl overflow-hidden transition-all duration-500 h-auto sm:h-[280px] flex flex-col bg-gradient-to-br from-white/95 via-blue-50/95 to-indigo-50/95 dark:from-gray-800/90 dark:via-gray-800/90 dark:to-gray-900/90 shadow-lg dark:shadow-gray-900/20">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 transform transition-all duration-300 group-hover:scale-110 mb-3 sm:mb-0 inline-flex">
                  <img src={GalleryIcon} alt="Galleries" className="w-8 h-8" />
                </div>
                <h3 className="sm:ml-4 text-xl sm:text-2xl font-bold text-indigo-900 dark:text-indigo-400">
                  Memory Lane
                </h3>
              </div>
              <p className="text-sm sm:text-base leading-relaxed flex-grow text-gray-600 dark:text-gray-300">
                Take a stroll down memory lane with our extensive collection of
                photos and videos. Relive your college days, celebrate
                achievements, and stay connected with classmates through our
                digital galleries.
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 dark:bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>

          {/* About College Card */}
          <div className="group relative p-4 sm:p-6 md:p-8 rounded-3xl overflow-hidden transition-all duration-500 h-auto sm:h-[280px] flex flex-col bg-gradient-to-br from-white/95 via-blue-50/95 to-indigo-50/95 dark:from-gray-800/90 dark:via-gray-800/90 dark:to-gray-900/90 shadow-lg dark:shadow-gray-900/20">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 transform transition-all duration-300 group-hover:scale-110 mb-3 sm:mb-0 inline-flex">
                  <img
                    src={CollegeIcon}
                    alt="About College"
                    className="w-8 h-8"
                  />
                </div>
                <h3 className="sm:ml-4 text-xl sm:text-2xl font-bold text-indigo-900 dark:text-indigo-400">
                  College Legacy
                </h3>
              </div>
              <p className="text-sm sm:text-base leading-relaxed flex-grow text-gray-600 dark:text-gray-300">
                Stay connected with your alma mater's journey. Learn about
                groundbreaking research, student achievements, and how your
                college continues to innovate and shape the future of education.
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 dark:bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>

          {/* Your Query Card */}
          <Link to="/query" className="block h-auto sm:h-[280px]">
            <div className="group relative p-4 sm:p-6 md:p-8 rounded-3xl overflow-hidden transition-all duration-500 h-full flex flex-col bg-gradient-to-br from-white/95 via-blue-50/95 to-indigo-50/95 dark:from-gray-800/90 dark:via-gray-800/90 dark:to-gray-900/90 shadow-lg dark:shadow-gray-900/20">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6">
                  <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 transform transition-all duration-300 group-hover:scale-110 mb-3 sm:mb-0 inline-flex">
                    <img src={QueryIcon} alt="Queries" className="w-8 h-8" />
                  </div>
                  <h3 className="sm:ml-4 text-xl sm:text-2xl font-bold text-indigo-900 dark:text-indigo-400">
                    Alumni Support Hub
                  </h3>
                </div>
                <p className="text-sm sm:text-base leading-relaxed flex-grow text-gray-600 dark:text-gray-300">
                  Have questions? Need guidance? Our dedicated support team is
                  here to help. From career advice to alumni benefits, we're
                  committed to ensuring you get the most out of your alumni
                  experience.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 dark:bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
