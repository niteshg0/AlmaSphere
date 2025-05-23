import React from "react";

const ShowProfileCard = ({
  name,
  status, // e.g. "Alumni" or "Student"
  role,   // e.g. "Alumni" or "Student"
  rollNumber,
  profilePicture,
}) => {
  return (
    <div
      className="w-full flex items-center gap-4 p-3 rounded-xl bg-white/80 dark:bg-gray-900/80 shadow-md border border-gray-100 dark:border-gray-800 transition hover:shadow-lg hover:bg-white/90 dark:hover:bg-gray-900/90 backdrop-blur-md"
      style={{ minHeight: 72 }}
    >
      {/* Profile Picture */}
      <div className="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-indigo-200 via-purple-200 to-indigo-100 dark:from-indigo-900 dark:via-purple-900 dark:to-indigo-800 border-2 border-indigo-100 dark:border-indigo-800">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-indigo-400 dark:text-indigo-200">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base sm:text-lg text-gray-900 dark:text-gray-100 truncate">
              {name}
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-700">
              {status}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium capitalize">
              {role}
            </span>
            <span className="inline-block px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs font-mono text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
              {rollNumber}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProfileCard; 