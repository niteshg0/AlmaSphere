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
    const date = new Date(data)
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
      <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-lg shadow-lg relative">
        <h2 className="text-3xl font-extrabold text-indigo-400 text-center mb-6">
          {data?.title}
        </h2>
        <p className="text-gray-400 text-center mb-4">Company: {data?.companyName}</p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p>
              <strong>Start Date:</strong>{formateDate(data?.createdAt)}
            </p>
            <p>
              <strong>Job Type:</strong> {data?.job_type}
            </p>
            <p>
              <strong>Salary:</strong> ₹ {data?.salary.range}
            </p>
            <p>
              <strong>Application Deadline:</strong> {formateDate(data?.application_deadline)}
            </p>
            <p>
              <strong>Status:</strong> {data?.status}
            </p>
          </div>
          <div className="text-right">
            <p>
              <strong>Posted By:</strong> {data?.userId?.fullName}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl text-indigo-400 mb-4">Requirements</h3>
          <ul className="list-disc list-inside text-gray-300">
            {data?.requirements.map((req)=>(
              <li key={Math.random()}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl text-indigo-400 mb-4">Contact Information</h3>
          <p>
            <strong>Email:</strong> {data?.contact_email}
          </p>
          <p>
            <strong>Phone:</strong> {data?.contact_phone}
          </p>
        </div>

        <div className="mt-6 text-center">
          <a
            href={data?.applyLink}
            target="_blank"
            className="bg-indigo-500 text-white w-full block text-center px-6 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300"
          >
            Apply Now
          </a>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl text-indigo-400 mb-4">Job Description</h3>
          <p>{data?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
