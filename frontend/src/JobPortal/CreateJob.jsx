import { useState } from "react";
import { useCreateJobMutation } from "../redux/Api/jobDetailApiSlice.js";
import { useNavigate } from "react-router";

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    companyName: "",
    applyLink: "",
  });
  const navigate = useNavigate()
  const [createJob, { isLoading }] = useCreateJobMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJob(formData).unwrap();
      setFormData({ title: "", description: "", companyName: "", applyLink: "" });
    } catch (error) {
      console.error(error?.data?.message || error.message);
    }
    navigate("/jobs")
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 shadow-lg rounded-2xl">
        <h1 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          Create a Job Post
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter job title"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Job Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter job description"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Apply Link</label>
            <input
              type="url"
              name="applyLink"
              value={formData.applyLink}
              onChange={handleChange}
              placeholder="Enter apply link"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
