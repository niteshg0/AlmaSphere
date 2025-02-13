import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetAllJobsQuery } from "../redux/Api/jobDetailApiSlice.js";

const JobPortal = () => {
  const { data, isLoading,refetch } = useGetAllJobsQuery();
    useEffect(()=>{
        refetch()
    },[refetch])

  if (isLoading) return <p className="text-center text-gray-300">Loading...</p>;

  return (
    <main className="bg-gray-900 text-gray-200 min-h-screen">
      {/* Page Header */}
      <header className="text-center py-12 bg-gray-800 shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-400">
          Job Portal
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Find and Apply for Jobs Posted by Alumni and Companies.
        </p>
      </header>

      {/* Job Listings */}
      <section className="container mx-auto py-10 px-6 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data?.map((job) => (
            <div
              key={job._id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-indigo-400 mb-2">
                {job.title}
              </h3>
              <p className="text-gray-300">{job.companyName}</p>
              <p className="text-gray-400 mt-2 text-sm line-clamp-2">
                {job.description}
              </p>
              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default JobPortal;
