import { useState } from "react";
import { useCreateJobMutation } from "../redux/Api/jobDetailApiSlice.js";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    companyName: "",
    requirements: "",
    application_deadline: "",
    applyLink: "",
    job_type: "Full-time",
    salary: {
      range: "",
      currency: "INR",
    },
    contact_email: "",
    contact_phone: "",
    status: "active",
    location: "",
    yearOfExperience: "fresher",
  });

  const navigate = useNavigate();
  const [createJob, { isLoading }] = useCreateJobMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "salary.range" || name === "salary.currency") {
      setFormData({
        ...formData,
        salary: {
          ...formData.salary,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert comma-separated requirements to an array
    const formattedData = {
      ...formData,
      requirements: formData.requirements
        .split(",")
        .map((skill) => skill.trim()), // Convert string to array
    };

    // Validate salary range format
    if (!/^\d+-\d+$/.test(formattedData.salary.range)) {
      toast.error("Invalid salary range format! Use format like '10000-20000'.", {
        style: {
          background: "#1f2937",
          color: "#f87171",
          border: "1px solid #dc2626",
        },
      });
      return;
    }

    try {
      const res = await createJob(formattedData).unwrap();
      console.log(res);
      toast.success("Job created successfully!", {
        style: {
          background: "#1f2937",
          color: "#e0e7ff",
          border: "1px solid #4f46e5",
        },
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        companyName: "",
        requirements: "",
        application_deadline: "",
        applyLink: "",
        job_type: "Full-time",
        salary: {
          range: "",
          currency: "INR",
        },
        contact_email: "",
        contact_phone: "",
        status: "active",
        location: "",
        yearOfExperience: "fresher",
      });

      setTimeout(() => {
        navigate("/jobs");
      }, 1500);
    } catch (error) {
      console.error(error?.data?.message || error.message);
      toast.error("Error occurred. Please try again.", {
        style: {
          background: "#1f2937",
          color: "#f87171",
          border: "1px solid #dc2626",
        },
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 shadow-lg rounded-2xl">
        <h1 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          Create a Job Post
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Job Title */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="eg- Web Developer"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200"
              required
            />
          </div>

          {/* Company Name */}
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

          {/* Job Description */}
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

          {/* Requirements */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">
              Requirements (comma-separated)
            </label>
            <input
              type="text"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="E.g., JavaScript, Node.js, MongoDB"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200"
              required
            />
          </div>

          {/* Application Deadline */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">
              Application Deadline
            </label>
            <input
              type="date"
              name="application_deadline"
              value={formData.application_deadline}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200"
              required
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter job location"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200"
              required
            />
          </div>

          {/* Job Type */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Job Type</label>
            <select
              name="job_type"
              value={formData.job_type}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200"
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          {/* Salary Range */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Salary Range</label>
            <input
              type="text"
              name="salary.range"
              value={formData.salary.range}
              onChange={handleChange}
              placeholder="E.g., 10000-20000"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200"
              required
            />
          </div>

          {/* Salary Currency */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Salary Currency</label>
            <select
              name="salary.currency"
              value={formData.salary.currency}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200"
              required
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="AUD">AUD</option>
              <option value="CAD">CAD</option>
              <option value="SGD">SGD</option>
            </select>
          </div>

          {/* Apply Link */}
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

          {/* Contact Email */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Contact Email</label>
            <input
              type="email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
              placeholder="Enter contact email"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200"
              required
            />
          </div>

          {/* Contact Phone */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Contact Phone</label>
            <input
              type="tel"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              placeholder="Enter contact phone"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200"
            />
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200"
              required
            >
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Years of Experience */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">
              Years of Experience
            </label>
            <select
              name="yearOfExperience"
              value={formData.yearOfExperience}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200"
              required
            >
              <option value="fresher">Fresher</option>
              <option value="1 year">1 Year</option>
              <option value="2 year">2 Years</option>
              <option value="3 year">3 Years</option>
              <option value="4 year">4 Years</option>
              <option value="5 year">5 Years</option>
              <option value="5+ year">5+ Years</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Post Job"}
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: "linear-gradient(to right, #1f2937, #374151)",
          color: "#e0e7ff",
          borderRadius: "10px",
          border: "1px solid #4f46e5",
          boxShadow: "0px 4px 10px rgba(79, 70, 229, 0.2)",
        }}
      />
    </div>
  );
};

export default CreateJob;