import React from "react";
import { Link } from "react-router-dom";

// Icons
import EventIcon from "../icons/event-animated.svg";
import JobsIcon from "../icons/jobs-animated.svg";
import DonationIcon from "../icons/donation-animated.svg";
import GalleryIcon from "../icons/gallery-animated.svg";
import CollegeIcon from "../icons/college-animated.svg";
import QueryIcon from "../icons/query-animated.svg";

const Home = () => {
  const scrollToCards = () => {
    const cardSection = document.getElementById("card-section");
    cardSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-200">
      {/* Welcome Section */}
      <section className="relative text-center py-32 px-6 overflow-hidden bg-gradient-to-b from-white/80 to-blue-50/80 dark:from-gray-900/80 dark:to-gray-800/80">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-indigo-200/30 dark:bg-indigo-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-200/30 dark:bg-purple-500/10 blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className=" pb-2 text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-8 bg-clip-text text-transparent leading-tight bg-gradient-to-r from-indigo-900 to-purple-900 dark:from-indigo-400 dark:to-purple-400">
            Your Alumni Journey Begins Here
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-serif mb-12 text-gray-700 dark:text-gray-300 font-light leading-relaxed">
            Join a vibrant community of graduates who are shaping the future.
            Together, we create lasting connections and meaningful impact.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/profile"
              className="px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Join Our Community
            </Link>
            <button
              onClick={scrollToCards}
              className="px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 bg-white hover:bg-gray-50 text-indigo-900 border border-indigo-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-700"
            >
              Explore Benefits
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="card-section" className="container mx-auto py-20 px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-sans text-indigo-900 dark:text-indigo-400">
            Your Gateway to Success
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            From career growth to lifelong friendships, discover how our alumni
            network can enrich your professional and personal life.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Event Card */}
          <div className="group relative p-8 rounded-3xl overflow-hidden transition-all duration-500 h-[280px] flex flex-col bg-gradient-to-br from-white/95 via-blue-50/95 to-indigo-50/95 dark:from-gray-800/90 dark:via-gray-800/90 dark:to-gray-900/90 shadow-lg dark:shadow-gray-900/20">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 transform transition-all duration-300 group-hover:scale-110">
                  <img src={EventIcon} alt="Events" className="w-8 h-8" />
                </div>
                <h3 className="ml-4 text-2xl font-bold text-indigo-900 dark:text-indigo-400">
                  Alumni Events & Meetups
                </h3>
              </div>
              <p className="text-base leading-relaxed flex-grow text-gray-600 dark:text-gray-300">
                Experience unforgettable moments at our exclusive events. From
                intimate networking dinners to grand reunions, create memories
                that last a lifetime while expanding your professional circle.
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 dark:bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>

          {/* Jobs Card */}
          <Link to="/jobs" className="block h-[280px]">
            <div className="group relative p-8 rounded-3xl overflow-hidden transition-all duration-500 h-full flex flex-col bg-gradient-to-br from-white/95 via-blue-50/95 to-indigo-50/95 dark:from-gray-800/90 dark:via-gray-800/90 dark:to-gray-900/90 shadow-lg dark:shadow-gray-900/20">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 transform transition-all duration-300 group-hover:scale-110">
                    <img src={JobsIcon} alt="Jobs" className="w-8 h-8" />
                  </div>
                  <h3 className="ml-4 text-2xl font-bold text-indigo-900 dark:text-indigo-400">
                    Career Opportunities
                  </h3>
                </div>
                <p className="text-base leading-relaxed flex-grow text-gray-600 dark:text-gray-300">
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
          <Link to="/donation" className="block h-[280px]">
            <div className="group relative p-8 rounded-3xl overflow-hidden transition-all duration-500 h-full flex flex-col bg-gradient-to-br from-white/95 via-blue-50/95 to-indigo-50/95 dark:from-gray-800/90 dark:via-gray-800/90 dark:to-gray-900/90 shadow-lg dark:shadow-gray-900/20">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 transform transition-all duration-300 group-hover:scale-110">
                    <img
                      src={DonationIcon}
                      alt="Donations"
                      className="w-8 h-8"
                    />
                  </div>
                  <h3 className="ml-4 text-2xl font-bold text-indigo-900 dark:text-indigo-400">
                    Support Your Alma Mater
                  </h3>
                </div>
                <p className="text-base leading-relaxed flex-grow text-gray-600 dark:text-gray-300">
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
          <div className="group relative p-8 rounded-3xl overflow-hidden transition-all duration-500 h-[280px] flex flex-col bg-gradient-to-br from-white/95 via-blue-50/95 to-indigo-50/95 dark:from-gray-800/90 dark:via-gray-800/90 dark:to-gray-900/90 shadow-lg dark:shadow-gray-900/20">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 transform transition-all duration-300 group-hover:scale-110">
                  <img src={GalleryIcon} alt="Galleries" className="w-8 h-8" />
                </div>
                <h3 className="ml-4 text-2xl font-bold text-indigo-900 dark:text-indigo-400">
                  Memory Lane
                </h3>
              </div>
              <p className="text-base leading-relaxed flex-grow text-gray-600 dark:text-gray-300">
                Take a stroll down memory lane with our extensive collection of
                photos and videos. Relive your college days, celebrate
                achievements, and stay connected with classmates through our
                digital galleries.
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 dark:bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>

          {/* About College Card */}
          <div className="group relative p-8 rounded-3xl overflow-hidden transition-all duration-500 h-[280px] flex flex-col bg-gradient-to-br from-white/95 via-blue-50/95 to-indigo-50/95 dark:from-gray-800/90 dark:via-gray-800/90 dark:to-gray-900/90 shadow-lg dark:shadow-gray-900/20">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 transform transition-all duration-300 group-hover:scale-110">
                  <img
                    src={CollegeIcon}
                    alt="About College"
                    className="w-8 h-8"
                  />
                </div>
                <h3 className="ml-4 text-2xl font-bold text-indigo-900 dark:text-indigo-400">
                  College Legacy
                </h3>
              </div>
              <p className="text-base leading-relaxed flex-grow text-gray-600 dark:text-gray-300">
                Stay connected with your alma mater's journey. Learn about
                groundbreaking research, student achievements, and how your
                college continues to innovate and shape the future of education.
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 dark:bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>

          {/* Your Query Card */}
          <div className="group relative p-8 rounded-3xl overflow-hidden transition-all duration-500 h-[280px] flex flex-col bg-gradient-to-br from-white/95 via-blue-50/95 to-indigo-50/95 dark:from-gray-800/90 dark:via-gray-800/90 dark:to-gray-900/90 shadow-lg dark:shadow-gray-900/20">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 transform transition-all duration-300 group-hover:scale-110">
                  <img src={QueryIcon} alt="Queries" className="w-8 h-8" />
                </div>
                <h3 className="ml-4 text-2xl font-bold text-indigo-900 dark:text-indigo-400">
                  Alumni Support Hub
                </h3>
              </div>
              <p className="text-base leading-relaxed flex-grow text-gray-600 dark:text-gray-300">
                Have questions? Need guidance? Our dedicated support team is
                here to help. From career advice to alumni benefits, we're
                committed to ensuring you get the most out of your alumni
                experience.
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 dark:bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
