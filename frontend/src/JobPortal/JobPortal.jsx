import React, { useState, useEffect } from "react";
import { useGetAllJobsQuery } from "../redux/Api/jobDetailApiSlice.js";
import JobComponent from "../components/JobComponent.jsx";
import { TbFilterSearch } from "react-icons/tb";
import { FaSearch, FaPlus, FaHome } from "react-icons/fa";
import Select from "react-select";
import { Link } from "react-router-dom";

const JobPortal = ({ isDarkTheme }) => {
  const { data, isLoading, error } = useGetAllJobsQuery();
  const [value, setValue] = useState("");
  const [salary, setSalary] = useState(0);
  const [isPartTime, setIsPartTime] = useState(false);
  const [isWorkFromHome, setIsWorkFromHome] = useState(false);
  const [profile, setProfile] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const experienceOptions = [
    { value: "fresher", label: "Fresher" },
    { value: "1 year", label: "1 Year" },
    { value: "2 year", label: "2 Years" },
    { value: "3 year", label: "3 Years" },
    { value: "4 year", label: "4 Years" },
    { value: "5 year", label: "5 Years" },
    { value: "5+ year", label: "5+ Years" },
  ];

  // Custom styles for react-select
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: isDarkTheme ? "#374151" : "white",
      borderColor: isDarkTheme ? "#4B5563" : "#E5E7EB",
      boxShadow: "none",
      "&:hover": {
        borderColor: isDarkTheme ? "#6366F1" : "#4F46E5",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: isDarkTheme ? "#1F2937" : "white",
      zIndex: 9999,
      position: "absolute",
      width: "100%",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "200px",
      padding: "5px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? isDarkTheme
          ? "#4F46E5"
          : "#EEF2FF"
        : state.isFocused
        ? isDarkTheme
          ? "#374151"
          : "#F3F4F6"
        : isDarkTheme
        ? "#1F2937"
        : "white",
      color: state.isSelected
        ? isDarkTheme
          ? "white"
          : "#4F46E5"
        : isDarkTheme
        ? "#E5E7EB"
        : "#111827",
      cursor: "pointer",
      padding: "8px 12px",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: isDarkTheme ? "#4B5563" : "#EEF2FF",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: isDarkTheme ? "white" : "#4F46E5",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: isDarkTheme ? "#E5E7EB" : "#4F46E5",
      "&:hover": {
        backgroundColor: isDarkTheme ? "#6B7280" : "#DBEAFE",
        color: isDarkTheme ? "white" : "#4338CA",
      },
    }),
    input: (provided) => ({
      ...provided,
      color: isDarkTheme ? "white" : "#111827",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: isDarkTheme ? "#9CA3AF" : "#6B7280",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: isDarkTheme ? "white" : "#111827",
    }),
  };

  useEffect(() => {
    if (data) {
      let filtered = data.filter(
        (job) =>
          job.title.toLowerCase().includes(value.toLowerCase()) ||
          job.companyName.toLowerCase().includes(value.toLowerCase()) ||
          job.location.toLowerCase().includes(value.toLowerCase())
      );

      if (isPartTime) {
        filtered = filtered.filter((job) => job.job_type === "Part-time");
      }

      if (isWorkFromHome) {
        filtered = filtered.filter((job) =>
          job.location.toLowerCase().includes("home")
        );
      }

      if (profile) {
        filtered = filtered.filter((job) =>
          job.title.toLowerCase().includes(profile.toLowerCase())
        );
      }

      if (location) {
        filtered = filtered.filter((job) =>
          job.location.toLowerCase().includes(location.toLowerCase())
        );
      }

      if (experience.length > 0) {
        filtered = filtered.filter((job) =>
          experience.some((exp) => job.yearOfExperience === exp.value)
        );
      }

      if (salary > 0) {
        filtered = filtered.filter((job) => {
          const [minSalary, maxSalary] = job.salary.range
            .split("-")
            .map(Number);
          const salaryInLakh = salary * 100000;
          return salaryInLakh >= minSalary && salaryInLakh <= maxSalary;
        });
      }

      setFilteredData(filtered);
    }
  }, [
    value,
    isPartTime,
    data,
    isWorkFromHome,
    location,
    profile,
    experience,
    salary,
  ]);

  const handlePartTimeChange = (e) => {
    setIsPartTime(e.target.checked);
  };

  const handleWorkFromHome = (e) => {
    setIsWorkFromHome(e.target.checked);
  };

  const clearFilters = () => {
    setValue("");
    setSalary(0);
    setIsPartTime(false);
    setIsWorkFromHome(false);
    setProfile("");
    setLocation("");
    setExperience([]);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-indigo-700 dark:text-indigo-400">
            Loading jobs...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Error Loading Jobs
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Failed to load job listings. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-lg transition-colors duration-300 shadow-sm"
            >
              <FaHome size={16} />
              <span>Home</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Job Portal
            </h1>
          </div>
          <Link
            to="/createJob"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
          >
            <FaPlus size={14} />
            <span>Post a Job</span>
          </Link>
        </div>

        {/* Mobile filter toggle */}
        <button
          className="md:hidden w-full mb-4 flex items-center justify-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md"
          onClick={toggleFilter}
        >
          <TbFilterSearch className="text-indigo-600 dark:text-indigo-400" />
          <span className="text-gray-900 dark:text-white font-medium">
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </span>
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Section */}
          <div
            className={`${
              isFilterOpen ? "block" : "hidden"
            } md:block md:w-80 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 h-fit sticky top-4 z-10`}
          >
            
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Search
              </h2>
              <div className="flex overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600">
                <input
                  type="text"
                  placeholder="e.g. Design, Mumbai, Infosys"
                  className="w-full p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <button className="bg-indigo-600 hover:bg-indigo-700 p-3 text-white transition-colors">
                  <FaSearch />
                </button>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
              <span className="mx-4 text-gray-500 dark:text-gray-400 font-medium">
                Filters
              </span>
              <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Profile
                </label>
                <input
                  type="text"
                  placeholder="e.g. Marketing"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Years of Experience
                </label>
                <Select
                  isMulti
                  options={experienceOptions}
                  value={experience}
                  onChange={(selected) => setExperience(selected)}
                  styles={customSelectStyles}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Delhi"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={isWorkFromHome}
                    onChange={handleWorkFromHome}
                    className="rounded text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span>Work from home</span>
                </label>
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={isPartTime}
                    onChange={handlePartTimeChange}
                    className="rounded text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span>Part-time</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Annual salary (in lakhs)
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {salary} LPA
                </p>
              </div>

              

              <div className="flex justify-between pt-4">
                <button
                  className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                  onClick={clearFilters}
                >
                  Clear all filters
                </button>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {filteredData?.length} jobs found
                </span>
              </div>
            </div>
          </div>

          {/* Job Listings Section */}
          <div className="flex-1">
            {filteredData?.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredData.map((job) => (
                  <Link
                    key={job._id}
                    to={`/jobDetail/${job._id}`}
                    className="block transform transition-transform hover:scale-[1.01] hover:shadow-lg"
                  >
                    <JobComponent job={job} isDarkTheme={isDarkTheme} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-md">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-10 h-10 text-indigo-600 dark:text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    No jobs found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Try adjusting your search filters or check back later for
                    new opportunities.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPortal;
