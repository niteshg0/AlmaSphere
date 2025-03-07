import React from "react";
import { useParams } from "react-router-dom";
import { useGetOneJobDetailQuery } from "../redux/Api/jobDetailApiSlice";

const JobDetails = () => {
  const { jobId } = useParams(); // Extract the job parameter from the URL

  // Fetch job details using the job parameter
  const { data, isLoading, error } = useGetOneJobDetailQuery(jobId || "");
  console.log(data);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
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
    <div className="p-10 min-h-screen flex justify-center bg-white">
      <div className="w-full max-w-5xl rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-black">{data?.title}</h2>
          <a href={`${data?.applyLink}`}>
            <button className="bg-purple-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
              Apply Now
            </button>
          </a>
        </div>
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-600">
            <span>{compareDate()}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-600">
            <span>{data?.job_type}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-600">
            <span>₹ {data?.salary.range}</span>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-4">Job Description</h3>
        <div className="border-t pt-4 space-y-1 text-gray-700">
          <p><strong className="pr-3">Role: </strong> {data?.title}</p>
          <p><strong className="pr-3">Location: </strong> {data?.location}</p>
          <p><strong className="pr-3">Description: </strong> {data?.description}</p>
          <p><strong className="pr-3">Experience: </strong> {data?.yearOfExperience}</p>
          <p><strong className="pr-3">Salary: </strong> ₹ {data?.salary.range}</p>
          <p><strong className="pr-3">Posted Date: </strong> {formateDate(data?.createdAt)}</p>
        </div>
        <div className="mt-8">
          <h4 className="text-xl font-semibold mb-4">Requirements</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {data?.requirements.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <h4 className="text-xl font-semibold mb-4">Contact Information</h4>
          <p><strong className="pr-3">Email: </strong> {data?.contact_email}</p>
          <p><strong className="pr-3">Phone: </strong> {data?.contact_phone}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
