import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetOneJobDetailQuery } from "../redux/Api/jobDetailApiSlice";
import { FaHome } from "react-icons/fa";

const JobDetails = ({ isDarkTheme }) => {
  const { jobId } = useParams(); // Extract the job parameter from the URL

  // Fetch job details using the job parameter
  const { data, isLoading, error } = useGetOneJobDetailQuery(jobId || "");

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-indigo-700 dark:text-indigo-400">
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Error Loading Job
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {error.message ||
              "Failed to load job details. Please try again later."}
          </p>
          <Link
            to="/jobs"
            className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const formateDate = (data) => {
    const date = new Date(data);
    return date.toLocaleDateString();
  };

  const create = new Date(data.createdAt);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Navigation buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            to="/jobs"
            className="inline-flex items-center text-indigo-700 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Jobs
          </Link>

          <Link
            to="/"
            className="inline-flex items-center bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-lg transition-colors duration-300 shadow-sm"
          >
            <FaHome className="mr-2" />
            Home
          </Link>
        </div>

        {/* Main content card */}
        <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 shadow-xl">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-indigo-200/30 dark:bg-indigo-500/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-200/30 dark:bg-purple-500/10 blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8 border-b border-gray-200 dark:border-gray-700 pb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {data?.title}
                </h1>
                <p className="text-xl text-indigo-700 dark:text-indigo-400 font-medium mb-2">
                  {data?.companyName}
                </p>
                <p className="text-gray-600 dark:text-gray-300 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {data?.location}
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-4">
                <a
                  href={`${data?.applyLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 font-medium shadow-md hover:shadow-lg flex items-center">
                    Apply Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </a>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  Application deadline:{" "}
                  <span className="font-medium">
                    {formateDate(data?.application_deadline)}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags section */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
                {data?.job_type}
              </div>
              <div className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                {data?.yearOfExperience}
              </div>
              <div className="px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
                ₹ {data?.salary.range}
          </div>
              <div className="px-4 py-2 rounded-full text-sm font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                Posted {compareDate()}
          </div>
        </div>

            {/* Description section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Job Description
              </h2>
              <div className="prose prose-indigo dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <p>{data?.description}</p>
              </div>
        </div>

            {/* Requirements section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Requirements
              </h2>
              <ul className="space-y-3">
                {data?.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-indigo-500 dark:text-indigo-400 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">
                      {requirement}
                    </span>
                  </li>
            ))}
          </ul>
        </div>

            {/* Contact Information */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {data?.contact_email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Phone
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {data?.contact_phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
