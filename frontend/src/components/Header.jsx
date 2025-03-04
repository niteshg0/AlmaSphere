import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = ({ isDarkTheme, toggleTheme }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const existUser = user?.data?.fullName;

  // Apply theme to the body
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkTheme]);

  const handleClick = () => {
    navigate("/");
  };

  const profileClick = () => {
    navigate("/profile");
  };

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);

      const cardSection = document.getElementById("card-section");
      if (cardSection) {
        const cardSectionTop = cardSection.getBoundingClientRect().top;
        setIsNavbarVisible(cardSectionTop >= 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isNavbarVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className={`mx-4 mt-4 rounded-2xl backdrop-blur-lg transition-all duration-300 relative overflow-hidden group ${
          scrolled
            ? isDarkTheme
              ? "bg-gray-900/90"
              : "bg-white/95"
            : isDarkTheme
            ? "bg-gray-900/70"
            : "bg-white/95"
        }`}
      >
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-indigo-500/30 animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content border */}
        <div
          className={`absolute inset-[1px] rounded-2xl transition-all duration-500 ${
            isDarkTheme
              ? "bg-gradient-to-br from-gray-900/90 to-gray-800/90 group-hover:from-gray-900/95 group-hover:to-gray-800/95"
              : "bg-gradient-to-br from-white/95 to-blue-50/95 group-hover:from-white group-hover:to-blue-50"
          }`}
        />

        {/* Border glow effect */}
        <div
          className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
            isDarkTheme
              ? "border border-indigo-500/20 group-hover:border-indigo-500/40 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]"
              : "border border-indigo-200/50 group-hover:border-indigo-300/70 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
          }`}
        />

        {/* Hover border animation */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out`}
          />
        </div>

        <nav className="w-full relative">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            {/* Logo/Home Link */}
            <h2
              className={`font-bold font-serif cursor-pointer text-2xl bg-clip-text text-transparent ${
                isDarkTheme
                  ? "bg-gradient-to-r from-indigo-400 to-purple-400"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600"
              }`}
              onClick={handleClick}
            >
              AlumniHub
            </h2>

            {/* Navigation Links */}
            <ul className="hidden md:flex gap-8 items-center">
              <Link
                to="/about"
                className={`text-base font-medium transition-all duration-300 hover:scale-105 relative group ${
                  isDarkTheme
                    ? "text-gray-300 hover:text-indigo-400"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                About Us
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isDarkTheme
                      ? "bg-gradient-to-r from-indigo-400 to-purple-400"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600"
                  }`}
                />
              </Link>
              <Link
                to="/contact"
                className={`text-base font-medium transition-all duration-300 hover:scale-105 relative group ${
                  isDarkTheme
                    ? "text-gray-300 hover:text-indigo-400"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                Contact Us
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isDarkTheme
                      ? "bg-gradient-to-r from-indigo-400 to-purple-400"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600"
                  }`}
                />
              </Link>
              <Link
                to="/faq"
                className={`text-base font-medium transition-all duration-300 hover:scale-105 relative group ${
                  isDarkTheme
                    ? "text-gray-300 hover:text-indigo-400"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                FAQ
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isDarkTheme
                      ? "bg-gradient-to-r from-indigo-400 to-purple-400"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600"
                  }`}
                />
              </Link>
            </ul>

            {/* Right Section (Theme Toggle + Login/Profile) */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                  isDarkTheme
                    ? "bg-gray-800/50 text-gray-300 hover:text-white"
                    : "bg-white/80 text-gray-700 hover:text-indigo-600 border border-indigo-100"
                }`}
              >
                <span className="relative z-10">
                  {isDarkTheme ? "Light Mode" : "Dark Mode"}
                </span>
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isDarkTheme
                      ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20"
                      : "bg-gradient-to-r from-indigo-100/50 to-purple-100/50"
                  }`}
                />
              </button>

              {/* Login/Profile Button */}
              {!existUser ? (
                <Link to="/login">
                  <button
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden group ${
                      isDarkTheme
                        ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    <span className="relative z-10">Join Our Community</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </Link>
              ) : (
                <div
                  className={`px-6 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 transform hover:scale-105 relative overflow-hidden group ${
                    isDarkTheme
                      ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                  onClick={profileClick}
                >
                  <span className="relative z-10">{existUser}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
