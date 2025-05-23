import React from "react";
import ShowProfileCard from "./ShowProfileCard";
import { Link } from "react-router";

const SearchResultsDropdown = ({ users, onClose }) => {
  if (!users || users.length === 0) return null;

  return (
    <div
      className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto z-50 p-2"
      style={{ minWidth: 340 }}
    >
      <div className="mb-2 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        Recommendations
      </div>
      <div className="flex flex-col gap-3">
        {users.map((user) => (
          <Link to={`/profiles/${user.rollNumber}`}>
            <div
              key={user._id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition p-1"
            >
              <ShowProfileCard
                name={user.fullName}
                status={user.status}
                role={user.role}
                rollNumber={user.rollNumber}
                profilePicture={user.profilePicture}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsDropdown;
