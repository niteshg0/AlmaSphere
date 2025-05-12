import { useState } from "react";
import { useCreateJobMutation } from "../redux/Api/jobDetailApiSlice.js";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
<<<<<<< HEAD
import { FaHome } from "react-icons/fa";
import {string, z} from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateJob = ({ isDarkTheme }) => {
  
  
  
   const formSchema = z.object({
    title: z.string().min(3, "Enter the Title"),
    job_type: z.enum(["Full-time", "Part-time", "Contract", "Internship", "Freelance"]),

    salary: z.object({
      range: z.string().regex(/^\d+-\d+$/, {
    message: "Salary range must be in format: 10000-20000",
  }),
      currency: z.enum(["USD","INR" , "EUR","GBP"]).default("INR"), // assuming only "INR" for now
    }),

   status: z.enum(["active", "inactive"]).default("active"),

    yearOfExperience: z.enum(["fresher", "1 year", "2 year", "3 year" ,"4 year" , "5 year" , "5+ year"]),

    description: z.string().min(15, "Enter the discription"),
    companyName: z.string().min(1, "Enter Company Name"),
    requirements: z.string().min(3, "Requirements are "),
    applyLink: z.string().url("Enter valid Applylink"),
    contact_email: z.string().email("Invalid Email"),
    contact_phone: z.string().min(10, "Enter Phone No."),
    location: z.string().min(1, "Enter Location"),
    application_deadline: z.coerce.date(),

    });
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(formSchema),
    });
      console.log("Form errors:", errors);
=======
import { FaHome, FaLock } from "react-icons/fa";
import { useSelector } from "react-redux";

const CreateJob = ({ isDarkTheme }) => {
  const { user, token } = useSelector((state) => state.auth);
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
>>>>>>> a7d066a3e07af53ea8cf5ab0aeba56d772cabd26

  const navigate = useNavigate();
  const [createJob, { isLoading }] = useCreateJobMutation();



  const onsubmit = async (formData) => {

        console.log("Form data submitted:", formData);
    // e.preventDefault();

    // Convert comma-separated requirements to an array
    const formattedData = {
      ...formData,
      requirements: formData.requirements
        .split(",")
        .map((skill) => skill.trim()), // Convert string to array
    };

    // Validate salary range format
    if (!/^\d+-\d+$/.test(formattedData.salary.range)) {
      toast.error(
        "Invalid salary range format! Use format like '10000-20000'.",
        {
          style: {
            background: isDarkTheme ? "#1f2937" : "#fff",
            color: isDarkTheme ? "#f87171" : "#ef4444",
            border: isDarkTheme ? "1px solid #dc2626" : "1px solid #f87171",
          },
        }
      );
      return;
    }

    try {
      const res = await createJob(formattedData).unwrap();
      console.log(res);
      toast.success("Job created successfully!", {
        style: {
          background: isDarkTheme ? "#1f2937" : "#fff",
          color: isDarkTheme ? "#e0e7ff" : "#4f46e5",
          border: isDarkTheme ? "1px solid #4f46e5" : "1px solid #818cf8",
        },
      });

 

      setTimeout(() => {
        navigate("/jobs");
      }, 1500);
    } catch (error) {
      console.error(error?.data?.message || error.message);
      toast.error("Error occurred. Please try again.", {
        style: {
          background: isDarkTheme ? "#1f2937" : "#fff",
          color: isDarkTheme ? "#f87171" : "#ef4444",
          border: isDarkTheme ? "1px solid #dc2626" : "1px solid #f87171",
        },
      });
    }
  };

  // Guest view for when user is not logged in
  if (!user || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <FaLock className="mx-auto h-16 w-16 text-indigo-500 mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Login Required
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            To post a job, you need to log in or create an account first.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 bg-white hover:bg-gray-50 text-indigo-900 border border-indigo-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:border-gray-600"
            >
              Sign Up
            </Link>
          </div>
          <div className="mt-6">
            <Link
              to="/jobs"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Go back to Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
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
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Create a Job Post
            </h1>
            <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="title"
                 
                    {...register("title")}
                   
                    placeholder="eg- Web Developer"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                  />
                  {errors.title && (
     <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
   )}
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    
                    {...register("companyName")}
                    placeholder="Enter company name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                    
                  />
                   {errors.companyName && (
     <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.companyName.message}</p>
   )}
                </div>
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Job Description
                </label>
                <textarea
                  name="description"
                  // value={formData.description}
                  // onChange={handleChange}
                  {...register("description")}
                  placeholder="Enter job description"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                  rows="4"
                  
                />
                 {errors.description && (
     <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description.message}</p>
   )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Requirements */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Requirements (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="requirements"
                  
                    {...register("requirements")}
                    
                    placeholder="E.g., JavaScript, Node.js, MongoDB"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                    
                  />
                  {errors.requirements && (
     <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.requirements.message}</p>
   )}
  
                </div>

                {/* Application Deadline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    name="application_deadline"
                    // value={formData.application_deadline}
                    // onChange={handleChange}
                    {...register("application_deadline")}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                    
                  />
                   {errors.application_deadline && (
     <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.application_deadline.message}</p>
   )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    // value={formData.location}
                    // onChange={handleChange}
                    {...register("location")}
                    placeholder="Enter job location"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                    
                  />
                   {errors.location && (
     <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.location.message}</p>
   )}
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Job Type
                  </label>
                  <select
                    name="job_type"
                    // value={formData.job_type}
                    // onChange={handleChange}
                    {...register("job_type")}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                    
                  >
                     {errors.job_type && (
     <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.job_type.message}</p>
   )}
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Salary Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    name="salary.range"
                    // value={formData.salary.range}
                    // onChange={handleChange}
                    {
                     ...register("salary.range")
                    }
                    placeholder="E.g., 10000-20000"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                    
                  />
                   {errors.salary?.range && (
     <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.salary.range.message}</p>
   )}
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Format: min-max ( 10000-20000)
                  </p>
                </div>

                {/* Salary Currency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Salary Currency
                  </label>
                  <select
                    name="salary.currency"
                    // value={formData.salary.currency}
                    // onChange={handleChange}
                    {...register("salary.currency")}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                    
                  >
                     {errors.salary?.currency && (
     <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.salary.currency.message}</p>
   )}
   <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Experience Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Experience Level
                  </label>
                  <select
                    name="yearOfExperience"
                    // value={formData.yearOfExperience}
                    // onChange={handleChange}
                    {...register("yearOfExperience")}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                    
                  >
                     {errors.yearOfExperience && (
      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.yearOfExperience.message}</p>
    )}
                    <option value="fresher">Fresher</option>
                    <option value="1 year">1 year</option>
                    <option value="2 year">2 year</option>
                    <option value="3 year">3 year</option>
                    <option value="4 year">4 year</option>
                    <option value="5 year">5 year</option>
                    <option value="5+ year">5+ year</option>
                  </select>
                </div>

                {/* Apply Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Application Link
                  </label>
                  <input
                    type="url"
                    name="applyLink"
                    // value={formData.applyLink}
                    // onChange={handleChange}
                    {...register("applyLink")}
                    placeholder="https://example.com/apply"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                    
                  />
                   {errors.applyLink && (
      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.applyLink.message}</p>
    )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    name="contact_email"
                    // value={formData.contact_email}
                    // onChange={handleChange}
                    {...register("contact_email")}
                    placeholder="contact@example.com"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                   
                    />
                 {errors.contact_email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.contact_email.message}</p>
                  )}
                  
                </div>

                {/* Contact Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="contact_phone"
                    // value={formData.contact_phone}
                    // onChange={handleChange}
                    {...register("contact_phone")}
                    placeholder="+1 (123) 456-7890"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                    
                  />
                   {errors.contact_phone && (
      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.contact_phone.message}</p>
    )}
 
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  
                onClick={handleSubmit(onsubmit)}
                
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating Job...
                    </>
                  ) : (
                    <>
                      Post Job
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CreateJob;
