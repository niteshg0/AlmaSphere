import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = ({ isDarkTheme, toggleTheme, NavBar }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Access fullName directly from user, not from user.data
  const existUser = user?.fullName;

  // console.log("User in header:", user); // Debug log

  const handleClick = () => {
    navigate("/");
    setMobileMenuOpen(false);
  };

  const profileClick = () => {
    navigate("/profile");
    setMobileMenuOpen(false);
  };

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        !event.target.closest(".mobile-menu-container") &&
        !event.target.closest(".menu-button")
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const navItem = [
    {
      name : "About Us",
      id : 1,
      link : "/about",
      role : "user",
    } ,
    {
      name : "Contact Us",
      id : 2,
      link : "/contact",
      role : "user",

    } ,
    {
      name : "Queries",
      id : 3,
      link : "/query",
      role : "user",

    } ,
    {
      name : "Job Portal",
      id : 4,
      link : "/jobs",
      role : "user",

    } ,
    
    
  ]

  const navAdmin = [
    {
      name : "Add Student",
      id : 5,
      link : "/admin/add-student",
      role : "admin",
    },
    {
      name : "Student",
      id : 6,
      link : "/admin/student",
      role : "admin",
    },
  ]



  return (
    <div
      className={`p-2 top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isNavbarVisible ? "translate-y-0" : "-translate-y-24"
      }`}
    >
      <div
        className={`mx-2 sm:mx-4 rounded-2xl backdrop-blur-lg transition-all duration-300 relative overflow-hidden group 
            ? "bg-white/95 dark:bg-gray-900/90"
            : "bg-white/95 dark:bg-gray-900/70"
        }`}
      >
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-indigo-500/30 animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content border */}
        <div className="absolute inset-[1px] rounded-2xl transition-all duration-500 bg-gradient-to-br from-white/95 to-blue-50/95 group-hover:from-white group-hover:to-blue-50 dark:from-gray-900/90 dark:to-gray-800/90 dark:group-hover:from-gray-900/95 dark:group-hover:to-gray-800/95" />

        {/* Border glow effect */}
        <div className="absolute inset-0 rounded-2xl transition-all duration-500 border border-indigo-200/50 group-hover:border-indigo-300/70 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] dark:border-indigo-500/20 dark:group-hover:border-indigo-500/40 dark:group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]" />

        {/* Hover border animation */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
        </div>

        <nav className="w-full relative">
          <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
            {/* Logo/Home Link */}
            <h2
              className="font-bold font-serif cursor-pointer text-xl sm:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
              onClick={handleClick}
            >
              AlumniHub
            </h2>

            {/* Navigation Links - Desktop */}
            <ul className="hidden md:flex gap-8 items-center">
              {(user?.role != "Admin") && navItem.map((item) => ( 
                <Link
                key={item.id}
                to = {item.link}
                className="text-base font-medium transition-all duration-300 hover:scale-105 relative group text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              >
               {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400" />
              </Link>
              ))}

              {(user?.role == "Admin") && navAdmin.map((item) => (
                <Link
                key={item.id}
                to = {item.link}
                className="text-base font-medium transition-all duration-300 hover:scale-105 relative group text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              >
               {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400" />
              </Link>
              ))}
                
              
            </ul>

            {/* Right Section (Theme Toggle + Login/Profile + Mobile Menu Button) */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full transition-all duration-300 relative overflow-hidden group bg-white/80 text-gray-700 hover:text-indigo-600 border border-indigo-100 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:text-white"
                aria-label={
                  isDarkTheme ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                <div className="relative w-5 h-5">
                  {/* Sun Icon */}
                  <svg
                    className={`absolute inset-0 w-5 h-5 transition-all duration-300 transform ${
                      isDarkTheme
                        ? "opacity-0 rotate-90 scale-0"
                        : "opacity-100 rotate-0 scale-100"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  {/* Moon Icon */}
                  <svg
                    className={`absolute inset-0 w-5 h-5 transition-all duration-300 transform ${
                      isDarkTheme
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 -rotate-90 scale-0"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-indigo-100/50 to-purple-100/50 dark:from-indigo-500/20 dark:to-purple-500/20" />
              </button>

              {/* Login/Profile Button - Desktop */}
              <div className="hidden sm:block">
                {!existUser ? (
                  <Link to="/login">
                    <button className="px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden group bg-indigo-600 hover:bg-indigo-700 text-white">
                      <span className="relative z-10">Login / Register</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </Link>
                ) : (
                  <div
                    className="px-4 sm:px-6 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 transform hover:scale-105 relative overflow-hidden group bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={profileClick}
                  >
                    <span className="relative z-10">{existUser}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="menu-button md:hidden p-2 rounded-lg bg-white/80 text-gray-700 hover:text-indigo-600 border border-indigo-100 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={
                  mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
                }
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`mobile-menu-container md:hidden ${
              mobileMenuOpen ? "block" : "hidden"
            }`}
          >
            <div className="px-4 py-6 bg-white/95 dark:bg-gray-800/95 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
             
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/about"
                    className="block py-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="block py-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/query"
                    className="block py-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Queries
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="block py-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Job Portal
                  </Link>
                </li>
                {/* Mobile Login/Profile Button */}
                <li className="pt-2 sm:hidden">
                  {!existUser ? (
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full py-3 text-center rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Login / Register
                    </Link>
                  ) : (
                    <button
                      onClick={profileClick}
                      className="block w-full py-3 text-center rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      {existUser}
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
