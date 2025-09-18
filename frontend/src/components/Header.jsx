import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLogoutMutation } from "../redux/Api/userApiSlice";
import { useSearchMutation } from "../redux/Api/searchApiSlice.js";
import Notification from "./Notification.jsx";
import { logout } from "../redux/features/authSlice.js";
import "react-toastify/dist/ReactToastify.css";
import SearchResultsDropdown from "./Card/SearchResultsDropdown.jsx";

const Header = ({ isDarkTheme, toggleTheme, NavBar }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  //logout
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();

  // Access fullName directly from user, not from user.data
  const existUser = user?.fullName;

  const handleClick = () => {
    navigate("/");
    setMobileMenuOpen(false);
  };

  const profileClick = () => {
    navigate("/profile");
    setMobileMenuOpen(false);
  };

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  // Track mouse position for cursor glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Track scroll for enhanced transparency effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      name: "About Us",
      id: 1,
      link: "/about",
      role: "user",
    },
    {
      name: "Contact Us",
      id: 2,
      link: "/contact",
      role: "user",
    },
    {
      name: "Queries",
      id: 3,
      link: "/query",
      role: "user",
    },
    {
      name: "Job Portal",
      id: 4,
      link: "/jobs",
      role: "user",
    },
  ];

  const navAdmin = [
    {
      name: "Add Student",
      id: 5,
      link: "/admin/add-edit-Student",
      role: "admin",
    },
    {
      name: "Student",
      id: 6,
      link: "/admin/student",
      role: "admin",
    },
  ];

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success("Logout Successfully ...", {
        className:
          "dark:!bg-gradient-to-r dark:!from-gray-900/90 dark:!to-gray-800/90 dark:!text-gray-100",
      });
      navigate("/");
    } catch (error) {
      console.log(error?.data?.message || error?.message);
      toast.error("Logout failed ...", {
        className:
          "dark:!bg-gradient-to-r dark:!from-gray-900/90 dark:!to-gray-800/90 dark:!text-gray-100",
      });
    }
  };

  const [searchUsers, { isError, isLoading }] = useSearchMutation();
  let res = null;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      res = await searchUsers(query);
      setShowDropDown(true);
      setQuery("");
      setMobileMenuOpen(false);
      setSearchResults(res?.data || []);
    }
  };

  return (
    <>
      {/* Cursor glow effect */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
        }}
      >
        <div className="w-48 h-48 bg-gradient-to-r from-indigo-200/10 via-purple-100/15 to-pink-200/10 dark:from-gray-400/10 dark:via-gray-300/15 dark:to-gray-200/10 rounded-full blur-2xl opacity-60" />
      </div>

      <div className="sticky top-0 left-0 right-0 z-50 p-2">
        {/* Glassmorphism Header Container */}
        <div
          className={`mx-2 sm:mx-4 rounded-3xl transition-all duration-500 relative group overflow-hidden ${
            scrolled
              ? "backdrop-blur-lg bg-white/10 dark:bg-black/10 shadow-lg shadow-indigo-500/5 dark:shadow-gray-500/5"
              : "backdrop-blur-lg bg-white/10 dark:bg-black/10 shadow-lg shadow-indigo-500/5 dark:shadow-gray-500/5"
          }`}
        >
          {/* Animated gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/30 via-pink-400/30 to-indigo-400/30 dark:from-gray-500/20 dark:via-gray-300/25  dark:to-gray-500/20 animate-gradient-x opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-3xl" />

          {/* Inner glassmorphism layer */}
          <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-white/30 via-white/20 to-white/10 dark:from-black/30 dark:via-black/20 dark:to-gray-800/10 backdrop-blur-md" />

          {/* Subtle border glow */}
          <div className="absolute inset-0 rounded-3xl border border-white/30 dark:border-gray-700/30 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-500" />

          {/* Floating particles effect */}
          <div className="absolute top-4 right-8 w-1 h-1 bg-gradient-to-r from-sky-400 to-blue-500 dark:from-gray-200 dark:to-white rounded-full opacity-60 animate-pulse" />
          <div
            className="absolute top-8 right-12 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-gray-400 dark:to-gray-600 rounded-full opacity-40 animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-6 left-10 w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-gray-500 dark:to-gray-300 rounded-full opacity-50 animate-pulse"
            style={{ animationDelay: "2s" }}
          />

          <nav className="w-full relative z-10">
            <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Logo/Home Link */}
              <div className="flex items-center justify-between w-full md:w-auto">
                <h2
                  className="font-bold font-serif cursor-pointer text-xl sm:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-700 dark:from-gray-600 dark:via-white dark:to-gray-600 hover:from-indigo-600 hover:via-purple-500 hover:to-indigo-600 dark:hover:from-gray-500 dark:hover:via-gray-200 dark:hover:to-gray-500 transition-all duration-300"
                  onClick={handleClick}
                >
                  AlmaSphere
                </h2>

                {/* Mobile Menu Button */}
                <button
                  className="menu-button md:hidden p-2 rounded-xl backdrop-blur-sm bg-white/20 dark:bg-black/20 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-gray-100 border border-white/20 dark:border-gray-700/20 hover:border-indigo-300/50 dark:hover:border-gray-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 dark:hover:shadow-gray-500/20"
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

              {user?.role!= "Admin" && (
              <div className="relative w-full md:w-auto md:max-w-md">
                <form
                  onSubmit={handleSearch}
                  className={`relative flex items-center transition-all duration-300 ${
                    isSearchFocused
                      ? "ring-2 ring-indigo-400/50 dark:ring-gray-500/40 shadow-lg shadow-indigo-500/20 dark:shadow-gray-500/20"
                      : "shadow-sm"
                  } rounded-full backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-gray-700/40 hover:border-indigo-300/60 dark:hover:border-gray-600/60`}
                >
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                      setIsSearchFocused(true);
                      setShowResults(true);
                    }}
                    onBlur={() => {
                      setIsSearchFocused(false);
                      setTimeout(() => setShowResults(false), 200);
                    }}
                    placeholder="search alumni/student"
                    className="w-full px-4 py-2 bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none rounded-full"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-gray-100 hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </form>
                {showResults && searchResults.length > 0 && (
                  <SearchResultsDropdown
                    users={searchResults}
                    onClose={() => setShowResults(false)}
                  />
                )}
              </div>
              )}

              {/* Navigation Links - Desktop */}
              <ul className="hidden md:flex gap-8 items-center">
                {user?.role != "Admin" &&
                  navItem.map((item) => (
                    <Link
                      key={item.id}
                      to={item.link}
                      className="text-base font-medium transition-all duration-300 hover:scale-105 relative group text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-gray-100"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-500 dark:to-white rounded-full" />
                      {/* Glow effect */}
                      <span className="absolute bottom-0 left-0 w-0 h-2 transition-all duration-300 group-hover:w-full bg-gradient-to-r from-indigo-400/30 to-purple-400/30 dark:from-gray-500/20 dark:to-gray-200/20 blur-sm -z-10" />
                    </Link>
                  ))}

                {user?.role == "Admin" &&
                  navAdmin.map((item) => (
                    <Link
                      key={item.id}
                      to={item.link}
                      className="text-base font-medium transition-all duration-300 hover:scale-105 relative group text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-gray-100"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-500 dark:to-white rounded-full" />
                      <span className="absolute bottom-0 left-0 w-0 h-2 transition-all duration-300 group-hover:w-full bg-gradient-to-r from-indigo-400/30 to-purple-400/30 dark:from-gray-500/20 dark:to-gray-200/20 blur-sm -z-10" />
                    </Link>
                  ))}
              </ul>

              {/* Right Section (Theme Toggle + Login/Profile) */}
              <div className="hidden md:flex items-center gap-3 sm:gap-4">
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-xl transition-all duration-300 relative overflow-hidden group backdrop-blur-sm bg-white/20 dark:bg-black/20 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-gray-100 border border-white/20 dark:border-gray-700/20 hover:border-indigo-300/50 dark:hover:border-gray-600/50 hover:shadow-lg hover:shadow-indigo-500/20 dark:hover:shadow-gray-500/20"
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
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 dark:from-gray-500/10 dark:to-gray-200/10 rounded-xl" />
                </button>

                {/* Login/Profile Button - Desktop */}
                <div className="hidden sm:block">
                  {!existUser ? (
                    <Link to="/login">
                      <button className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden group backdrop-blur-sm bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-600/90 hover:to-purple-600/90 text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 border border-indigo-400/30 dark:from-gray-950 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-300 dark:hover:text-gray-800 dark:shadow-gray-500/20 dark:hover:shadow-gray-500/30 dark:border-gray-600/30">
                        <span className="relative z-10">Login / Register</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>
                    </Link>
                  ) : user?.role === "Admin" ? (
                    <div>
                      <button
                        className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden group backdrop-blur-sm bg-gradient-to-r from-red-500/80 to-pink-500/80 hover:from-red-600/90 hover:to-pink-600/90 text-white shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 border border-red-400/30 dark:from-gray-800 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-500 dark:shadow-gray-500/20 dark:hover:shadow-gray-500/30 dark:border-gray-600/30"
                        onClick={handleLogout}
                      >
                        <span className="relative z-10">Log Out</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="px-6 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-300 transform hover:scale-105 relative overflow-hidden group backdrop-blur-sm bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-600/90 hover:to-purple-600/90 text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 border border-indigo-400/30 dark:from-gray-950 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-300 dark:hover:text-gray-800 dark:shadow-gray-500/20 dark:hover:shadow-gray-500/30 dark:border-gray-600/30"
                      onClick={profileClick}
                    >
                      <span className="relative z-10">{existUser}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                </div>

                <div>
                  {user && (<Notification />)}
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              className={`mobile-menu-container md:hidden transition-all duration-300 ${
                mobileMenuOpen ? "block opacity-100" : "hidden opacity-0"
              }`}
            >
              <div className="px-4 py-6 backdrop-blur-xl bg-white/30 dark:bg-black/30 border-t border-white/20 dark:border-gray-700/20 rounded-b-3xl mt-2">
                {/* Search Bar in Mobile Menu */}
                <form onSubmit={handleSearch} className="mb-6">
                  <div className="relative flex items-center rounded-xl backdrop-blur-sm bg-white/40 dark:bg-black/40 border border-white/30 dark:border-gray-700/30">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search by name or roll number..."
                      className="w-full px-4 py-3 bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none rounded-xl font-medium"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-gray-100 hover:bg-white/20 dark:hover:bg-gray-700/20 transition-colors duration-200"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </form>

                <ul className="space-y-4">
                  <li>
                    <div
                      className="block btn-link py-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                    >
                      {user && (<Notification />)}
                    </div>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="block py-3 px-4 rounded-xl text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-gray-100 hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-300 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="block py-3 px-4 rounded-xl text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-gray-100 hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-300 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/query"
                      className="block py-3 px-4 rounded-xl text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-gray-100 hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-300 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Queries
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/jobs"
                      className="block py-3 px-4 rounded-xl text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-gray-100 hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-300 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Job Portal
                    </Link>
                  </li>
                  {/* Mobile Login/Profile Button */}
                  <li className="pt-4 sm:hidden">
                    {!existUser ? (
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full py-3 text-center rounded-xl text-sm font-medium backdrop-blur-sm bg-gradient-to-r from-indigo-500/80 to-purple-500/80 text-white shadow-lg border border-indigo-400/30 dark:from-gray-950 dark:to-gray-600 dark:border-gray-600/30"
                      >
                        Login / Register
                      </Link>
                    ) : (
                      <button
                        onClick={profileClick}
                        className="block w-full py-3 text-center rounded-xl text-sm font-medium backdrop-blur-sm bg-gradient-to-r from-indigo-500/80 to-purple-500/80 text-white shadow-lg border border-indigo-400/30 dark:from-gray-950 dark:to-gray-600 dark:border-gray-600/30"
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
    </>
  );
};

export default Header;
