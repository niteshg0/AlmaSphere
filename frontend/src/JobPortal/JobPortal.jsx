import React, { useState, useEffect } from "react";
import { useGetAllJobsQuery } from "../redux/Api/jobDetailApiSlice.js";
import JobComponent from "../components/JobComponent.jsx";
import { TbFilterSearch } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import { Link } from "react-router";

const JobPortal = () => {
  const { data, isLoading, error } = useGetAllJobsQuery();
  const [value, setValue] = useState("");
  const [salary, setSalary] = useState(0);
  const [isPartTime, setIsPartTime] = useState(false);
  const [isWorkFromHome, setIsWorkFromHome] = useState(false);
  const [profile, setProfile] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const experienceOptions = [
    { value: "fresher", label: "Fresher" },
    { value: "1 year", label: "1 Year" },
    { value: "2 year", label: "2 Years" },
    { value: "3 year", label: "3 Years" },
    { value: "4 year", label: "4 Years" },
    { value: "5 year", label: "5 Years" },
    { value: "5+ year", label: "5+ Years" },
  ];

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

  if (isLoading) return <p className="text-center text-gray-300">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        Failed to load job listings. Please try again.
      </p>
    );
  if (!filteredData) {
    return (
      <p className="text-center text-gray-400 col-span-full">
        No job postings available.
      </p>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Filter Section */}
      <div className="w-80 bg-white shadow-lg p-6 overflow-y-auto sticky top-0 h-screen">
        <div className="text-center">
          <h1 className="text-blue-400 font-extrabold mb-3">Search</h1>
          <div className="border border-gray-300 flex w-full rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="e.g. Design, Mumbai, Infosys"
              className="w-full p-2 focus:outline-none"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button className="bg-blue-500 p-2 text-white">
              <FaSearch />
            </button>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 font-bold">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <TbFilterSearch className="text-2xl text-blue-500" />
          <h1 className="font-bold text-lg">Filter</h1>
        </div>

        <div className="space-y-4 mt-4">
          <div className="flex flex-col">
            <label className="font-medium">Profile</label>
            <input
              type="text"
              placeholder="e.g. Marketing"
              className="border rounded-lg p-2 focus:outline-blue-400"
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Location</label>
            <input
              type="text"
              placeholder="e.g. Delhi"
              className="border rounded-lg p-2 focus:outline-blue-400"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isWorkFromHome}
              onChange={handleWorkFromHome}
            />{" "}
            Work from home
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPartTime}
              onChange={handlePartTimeChange}
            />{" "}
            Part-time
          </label>

          <div className="flex flex-col">
            <label className="font-medium">Annual salary (in lakhs)</label>
            <input
              type="range"
              min="0"
              max="10"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="cursor-pointer"
            />
            <p className="text-sm text-gray-500">{salary} LPA</p>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Years of Experience</label>
            <Select
              isMulti
              options={experienceOptions}
              value={experience}
              onChange={(selected) => setExperience(selected)}
              className="rounded-lg focus:outline-blue-400 border-none"
              classNamePrefix="select"
            />
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            className="text-blue-600 text-sm underline"
            onClick={clearFilters}
          >
            Clear all
          </button>
        </div>
      </div>

      {/* Job Section */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {filteredData?.map((job) => (
            <Link key={job._id} to={`/jobDetail/${job._id}`}>
              <div>
                <JobComponent job={job} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobPortal;
