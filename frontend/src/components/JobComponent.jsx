import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { TbCalendarTime } from "react-icons/tb";
import { LuBoomBox } from "react-icons/lu";
import { LuTimerReset } from "react-icons/lu";
import { FaBriefcase, FaHome, FaClock, FaBolt } from "react-icons/fa";

const JobComponent = ({ job }) => {
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

  return (
    <>
      {/* <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-2xl flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">JavaScript Developer</h2>
          <p className="text-gray-500 text-sm">Adds99</p>
        </div>
        <div className="bg-gray-100 rounded-xl p-3">
          <FaBriefcase className="text-gray-400" size={24} />
        </div>
      </div>
      <div className="flex gap-4 text-gray-600 text-sm items-center">
        <div className="flex items-center gap-2">
          {job?.location.toLowerCase().includes("home") ?  <FaHome size={16} /> : <CiLocationOn size={16}/>}
          {job?.location}
        </div>
        <div className="flex items-center gap-2">
          <FaBriefcase size={16} />{job.yearOfExperience}
        </div>
        <div className="flex items-center gap-2">
          ₹ 4,00,000 - 5,00,000
        </div>
      </div>
        <div className="flex">
          <button
            className={`${
              diff >= 0
                ? " text-blue-500  border-blue-500"
                : "text-red-500  border-red-500"
            } flex mt-4 px-1 rounded-xl bg-gray-200 gap-2 align-middle justify-center`}
          >
            {diff >= 0 ? <p>active</p> : <p>closed</p>}
          </button>
          <button
            className={`${
              compareDate().includes("hour") || compareDate().includes("today")
                ? "text-green-600 bg-green-100"
                : `${
                    compareDate().includes("week")
                      ? "text-blue-600 bg-blue-200"
                      : "text-gray-600 bg-gray-200"
                  }`
            } flex mt-4 mx-4 px-1 rounded-xl bg-gray-200 gap-2 align-middle justify-center`}
          >
            <LuTimerReset className="mt-1" />
            <p>{compareDate()}</p>
          </button>
        </div>
      </div> */}
      <div className=" w-full bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">{job?.companyName}</h2>
          <button
            className={`${
              diff >= 0
                ? " text-blue-500  border-blue-500"
                : "text-red-500  border-red-500"
            } flex mt-2 mb-1 px-2 rounded-xl bg-gray-200 gap-2 align-middle justify-center`}
          >
            {diff >= 0 ? <p>active</p> : <p>closed</p>}
          </button>
        </div>
        <p className="text-gray-500 text-sm">
        <div className="flex items-center gap-2">
          {job?.location.toLowerCase().includes("home") ?  <FaHome size={16} /> : <CiLocationOn size={16}/>}
          {job?.location}
        </div>
        </p>
        <h3 className="font-bold text-xl mt-2">{job?.title}</h3>
        <p className="text-gray-600 text-sm mt-2">{job?.description}</p>
        <div className="flex gap-5 mt-4">
          <span className="bg-blue-100 text-blue-600 px-3 py-1 text-sm rounded-full font-semibold">
            {job?.yearOfExperience}
          </span>
          <span className="bg-red-100 text-red-600 px-3 py-1 text-sm rounded-full font-semibold">
            {job?.job_type}
          </span>
          <span className="bg-purple-100 text-purple-600 px-3 py-1 text-sm rounded-full font-semibold">
            {job?.salary?.range} {job?.salary?.currency}
          </span>
        </div>
      </div>
    </>
  );
};

export default JobComponent;
