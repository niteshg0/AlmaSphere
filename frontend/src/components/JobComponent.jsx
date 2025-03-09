import React from "react";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { TbCalendarTime } from "react-icons/tb";
import { LuBoomBox } from "react-icons/lu";
import { LuTimerReset } from "react-icons/lu";
import {
  FaBriefcase,
  FaHome,
  FaClock,
  FaBolt,
  FaBuilding,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

const JobComponent = ({ job, isDarkTheme }) => {
  const create = new Date(job.createdAt);
  const closed = new Date(job.application_deadline);
  const diff = closed - create;

  const compareDate = () => {
    const now = new Date();
    const difference = now - create;
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 365) {
      const years = Math.floor(days / 365);
      return years === 1 ? "1 year ago" : `${years} years ago`;
    } else if (days > 30) {
      const months = Math.floor(days / 30);
      return months === 1 ? "1 month ago" : `${months} months ago`;
    } else if (days > 7) {
      const weeks = Math.floor(days / 7);
      return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    } else if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else {
      return "today";
    }
  };

  // Format deadline date
  const formatDeadline = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format salary range with commas
  const formatSalary = (range) => {
    if (!range) return "";
    const [min, max] = range.split("-").map(Number);
    return `${min.toLocaleString()} - ${max.toLocaleString()}`;
  };

  // Determine if job is new (posted within last 48 hours)
  const isNewJob = () => {
    const now = new Date();
    const difference = now - create;
    const hours = Math.floor(difference / (1000 * 60 * 60));
    return hours <= 48;
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {/* Company and status */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
                  <FaBuilding className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {job?.companyName}
                </h3>
              </div>
              <div className="flex items-center">
                {isNewJob() && (
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                    New
                  </span>
                )}
                <span
                  className={`${
                    diff >= 0
                      ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400"
                      : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                  } text-xs font-medium px-2.5 py-0.5 rounded-full`}
                >
                  {diff >= 0 ? "Active" : "Closed"}
                </span>
              </div>
            </div>

            {/* Job title */}
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {job?.title}
            </h2>

            {/* Job details */}
            <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                {job?.location.toLowerCase().includes("home") ? (
                  <FaHome className="mr-1.5 text-indigo-500 dark:text-indigo-400" />
                ) : (
                  <CiLocationOn className="mr-1.5 text-indigo-500 dark:text-indigo-400" />
                )}
                <span>{job?.location}</span>
              </div>
              <div className="flex items-center">
                <FaBriefcase className="mr-1.5 text-indigo-500 dark:text-indigo-400" />
                <span>{job?.yearOfExperience}</span>
              </div>
              <div className="flex items-center">
                <FaMoneyBillWave className="mr-1.5 text-indigo-500 dark:text-indigo-400" />
                <span>
                  {formatSalary(job?.salary?.range)} {job?.salary?.currency}
                </span>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-1.5 text-indigo-500 dark:text-indigo-400" />
                <span>{job?.job_type}</span>
              </div>
            </div>

            {/* Job description - truncated */}
            {/* <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
              {job?.description}
            </p> */}

            {/* Tags and timing */}
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {job?.requirements &&
                  job.requirements.slice(0, 3).map((req, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2.5 py-1 rounded-full"
                    >
                      {req}
                    </span>
                  ))}
                {job?.requirements && job.requirements.length > 3 && (
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2.5 py-1 rounded-full">
                    +{job.requirements.length - 3} more
                  </span>
                )}
              </div>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
                <div className="flex items-center mr-3">
                  <FaClock className="mr-1" />
                  <span>Posted {compareDate()}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  <span>
                    Deadline: {formatDeadline(job?.application_deadline)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
    </div>
  );
};

export default JobComponent;
