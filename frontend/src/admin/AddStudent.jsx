import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useSignupMutation,
  useVerify_Roll_CodeMutation,
  useVerify_rollMutation,
} from "../redux/Api/userApiSlice";
import { setUserInfo } from "../redux/features/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
function AddStudent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup] = useSignupMutation();

  const registrationSchema = z.object({
    fullName: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    rollNumber: z
      .string()
      .min(10, "Roll number is required")
      .regex(/^\d+$/, "Roll number must contain only digits")
      .transform((val) => Number(val)),
    gender: z.enum(["Male", "Female", "Other"], {
      required_error: "Gender is required",
      invalid_type_error: "Gender not selected",
    }),
    batch: z
      .string()
      .regex(
        /^\d{4}-\d{4}$/,
        "Batch must be in format YYYY-YYYY (e.g. 2020-2024)"
      ),
    branch: z.string().min(2, "Branch is required"),
    course: z.string().min(2, "Course is required"),
    cgpa: z
      .string()
      .regex(
        /^([0-9]|10)(\.[0-9]{1,2})?$/,
        "CGPA must be between 0 and 10, with up to 2 decimal places"
      )
      .transform((val) => Number(val)),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .regex(
        /^(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .regex(/^(?=.*\d)/, "Password must contain at least one number")
      .regex(
        /^(?=.*[!@#$%^&*])/,
        "Password must contain at least one special character (!@#$%^&*)"
      ),
  });

  const {
    register: registerRegistration,
    handleSubmit: handleRegistrationSubmit,
    formState: { errors: registrationErrors },
    setValue,
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      rollNumber: "",
      fullName: "",
      email: "",
      gender: "",
      batch: "",
      branch: "",
      course: "",
      cgpa: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);
    try {
      const data = formData;
      const res = await signup(data);

      if (res.error) {
        // console.log(res);
        const errorMessage =
          res.error?.data?.message || "SignUp failed. Please try again.";

        toast.error(errorMessage, {
          className:
            "dark:!bg-gradient-to-r dark:!from-red-950/90 dark:!to-red-900/90 dark:!text-red-100 dark:!border-red-800 dark:!shadow-[0px_4px_10px_rgba(239,68,68,0.3)]",
        });
        return;
      }

      dispatch(setUserInfo({ ...res }));

      toast.success("Account created successfully!", {
        className:
          "dark:!bg-gradient-to-r dark:!from-indigo-950/90 dark:!to-indigo-900/90 dark:!text-indigo-100 dark:!border-indigo-800 dark:!shadow-[0px_4px_10px_rgba(99,102,241,0.3)]",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("SignUp failed. Please try again.", {
        className:
          "dark:!bg-gradient-to-r dark:!from-red-950/90 dark:!to-red-900/90 dark:!text-red-100 dark:!border-red-800 dark:!shadow-[0px_4px_10px_rgba(239,68,68,0.3)]",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter key
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl w-full space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-500/20 pb-2">
         Add Student / Alumni
        </h3>

        <form
          onSubmit={handleRegistrationSubmit(onSubmit)}
          onKeyPress={handleKeyPress}
        >
          {/* Prefilled Student Information Section */}
          <div className="space-y-6 mb-8">
            
           

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    {...registerRegistration("fullName")}
                    // readOnly
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none transition-all duration-300 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    {...registerRegistration("email")}
                    // readOnly
                    className="w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none transition-all duration-300 cursor-not-allowed"
                  />
                </div>

                <div>
                  <select
                id="selectLoginType"
                {...registerRegistration("gender")}
                defaultValue=""
                className="appearance-none w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-500/30 transition-all duration-300"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="rollNumber"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Roll Number
                  </label>
                  <input
                    type="text"
                    id="rollNumber"
                    {...registerRegistration("rollNumber")}
                    // readOnly
                    placeholder="Enter your roll number"
                    className="w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="course"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Course
                  </label>
                  <input
                    type="text"
                    id="course"
                    {...registerRegistration("course")}
                    // readOnly
                    placeholder="Enter your course"
                    className="w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none transition-all duration-300 "
                  />
                </div>

                <div>
                  <label
                    htmlFor="batch"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Batch
                  </label>
                  <input
                    type="text"
                    id="batch"
                    {...registerRegistration("batch")}
                    // readOnly
                    placeholder="Enter your batch (e.g. 2020-2024)"
                    className="w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none transition-all duration-300 "
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="branch"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Branch/Specialization
                </label>
                <input
                  type="text"
                  id="branch"
                  {...registerRegistration("branch")}
                //   readOnly
                placeholder="Enter your branch/specialization"
                  className="w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none transition-all duration-300 "
                />
              </div>

              <div>
                <label
                  htmlFor="cgpa"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  CGPA
                </label>
                <input
                  type="text"
                  id="cgpa"
                  {...registerRegistration("cgpa")}
                //   readOnly
                    placeholder="Enter your CGPA"
                  className="w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none transition-all duration-300 "
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Adding Student..." : "Add Student"}
            </button>
          </div>
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
      />
    </div>
  );
}

export default AddStudent;
