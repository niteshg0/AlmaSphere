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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    rollNumber: 0,
    email: "",
    password: "",
    batch: "",
    gender: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [prefilledData, setPrefilledData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordValue, setPasswordValue] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup] = useSignupMutation();
  const [verify_roll] = useVerify_rollMutation();
  const [verify_Roll_code] = useVerify_Roll_CodeMutation();

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let score = 0;

    if (!password) return 0;

    // Length check
    
    // if (password.length >= 12) score += 1;

    // Character type checks
    if (/[a-z]/.test(password)) score += 1; // lowercase
    if (/[A-Z]/.test(password)) score += 1; // uppercase
    if (/\d/.test(password)) score += 1; // digits
    if (password.length >= 8) score += 1;
    if (/[!@#$%^&*]/.test(password)) score += 1; // special chars

    return Math.min(score, 5); // Max score is 5
  };

  // Update password strength when password changes
  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(passwordValue));
  }, [passwordValue]);

  const getStrengthLabel = () => {
    if (passwordStrength === 0)
      return { text: "No password", color: "gray-400" };
    if (passwordStrength === 1) return { text: "Very weak", color: "red-500" };
    if (passwordStrength === 2) return { text: "Weak", color: "orange-500" };
    if (passwordStrength === 3) return { text: "Medium", color: "yellow-500" };
    if (passwordStrength === 4) return { text: "Strong", color: "green-500" };
    return { text: "Very strong", color: "emerald-500" };
  };

  // Function to get the correct Tailwind classes for strength color
  const getStrengthColorClass = (type) => {
    const color = getStrengthLabel().color;
    if (type === "text") {
      switch (color) {
        case "gray-400":
          return "text-gray-400 dark:text-gray-500";
        case "red-500":
          return "text-red-500 dark:text-red-400";
        case "orange-500":
          return "text-orange-500 dark:text-orange-400";
        case "yellow-500":
          return "text-yellow-500 dark:text-yellow-400";
        case "green-500":
          return "text-green-500 dark:text-green-400";
        case "emerald-500":
          return "text-emerald-500 dark:text-emerald-400";
        default:
          return "text-gray-400 dark:text-gray-500";
      }
    } else if (type === "bg") {
      switch (color) {
        case "gray-400":
          return "bg-gray-400 dark:bg-gray-500";
        case "red-500":
          return "bg-red-500 dark:bg-red-400";
        case "orange-500":
          return "bg-orange-500 dark:bg-orange-400";
        case "yellow-500":
          return "bg-yellow-500 dark:bg-yellow-400";
        case "green-500":
          return "bg-green-500 dark:bg-green-400";
        case "emerald-500":
          return "bg-emerald-500 dark:bg-emerald-400";
        default:
          return "bg-gray-400 dark:bg-gray-500";
      }
    }
    return "";
  };

  // Form validation schemas
  const verificationSchema = z.object({
    rollNumber: z
      .string()
      .min(10, "Roll number is required")
      .regex(/^\d+$/, "Roll number must contain only digits")
      .transform((val) => Number(val)),
  });

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

  // Use different resolver based on form step
  const {
    register: registerVerification,
    handleSubmit: handleVerificationSubmit,
    formState: { errors: verificationErrors },
    watch: watchVerification,
  } = useForm({
    resolver: zodResolver(verificationSchema),
  });

  const {
    register: registerRegistration,
    handleSubmit: handleRegistrationSubmit,
    formState: { errors: registrationErrors },
    setValue,
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      rollNumber: watchVerification("rollNumber") || "",
    },
  });

  // Set roll number in the main form when it changes in verification step
  React.useEffect(() => {
    if (isVerified && prefilledData) {
      // If we have prefilled data from verification, set form values
      Object.entries(prefilledData).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [isVerified, prefilledData, setValue]);

  // Handle roll number verification
  const verifyRollNumber = async (data) => {
    setIsVerifying(true);
    try {
      // Simulate API call to verify roll number
      const rollNumber= data.rollNumber;
      const res= await verify_roll({rollNumber})
      // In production, replace with actual API call
      
      if(res.data){
        toast.success("Verification code sent to your registered email", {
          className:
            "dark:!bg-gradient-to-r dark:!from-indigo-950/90 dark:!to-indigo-900/90 dark:!text-indigo-100",
        });

        const details= res.data.data;
        console.log((details));
        
        setPrefilledData({
          rollNumber
          // fullName: details.fullName,
          // email: details.email,
          // gender: details.gender,
          // batch: details.batch,
          // branch: details.branch,
          // course: details.course,
          // cgpa: details.cgpa,
        });

        setFormStep(1);
      }

      // console.log(res.error);
      
      if(res.error){
        toast.error(`${res.error.data.message}`, {
        className:
          "dark:!bg-gradient-to-r dark:!from-red-950/90 dark:!to-red-900/90 dark:!text-red-100",
      });
      return;
      }

    } catch (error) {
      toast.error("Verification failed. Please check your roll number.", {
        className:
          "dark:!bg-gradient-to-r dark:!from-red-950/90 dark:!to-red-900/90 dark:!text-red-100",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle OTP verification
  const verifyOTP = async () => {
    if (verificationOTP.trim() === "") {
      toast.error("Please enter verification code");
      return;
    }

    setIsVerifying(true);
    try {
      // Simulate OTP verification
      const rollNumber = prefilledData.rollNumber;
      const code = verificationOTP;
      const res = await verify_Roll_code({ rollNumber, code });
      // In production, replace with actual API call
      // console.log(res);

      if(res.error){
         toast.error("Invalid verification code. Please try again.");
        return 
      }

      console.log(res.data);
      

      if (res.data) {
        toast.success(res.data?.message || `Email verified successfully!`, {
          className:
            "dark:!bg-gradient-to-r dark:!from-green-950/90 dark:!to-green-900/90 dark:!text-green-100",
        });

        const details= res.data.data;
        console.log("Details", details);
        
        setPrefilledData({
          rollNumber,
          fullName: details.fullName,
          email: details.email,
          gender: details.gender,
          batch: details.batch,
          branch: details.branch,
          course: details.course,
          cgpa: details.cgpa,
        });

        setTimeout(() => {
          setIsVerified(true);
          setFormStep(2);
        }, 1000);
      }
    } catch (error) {
      toast.error("Invalid verification code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle final form submission
  const onSubmit = async (formData) => {
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);
    try {
      const res = await createUser(formData);
      if (res.error) {
        // console.log(res);
        const errorMessage =
          res.error?.data?.message || "SignUp failed. Please try again.";

        toast.error(errorMessage, {
          className:
            "dark:!bg-gradient-to-r dark:!from-red-950/90 dark:!to-red-900/90 dark:!text-red-100 dark:!border-red-800 dark:!shadow-[0px_4px_10px_rgba(239,68,68,0.3)]",
        });
      } else {
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
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission on Enter key
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-4xl p-8 bg-gradient-to-br from-white/95 via-blue-50/95 to-indigo-50/95 dark:from-gray-800/95 dark:via-gray-800/95 dark:to-gray-900/95 shadow-lg rounded-2xl relative overflow-hidden group">
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-indigo-500/30 animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content border */}
        <div className="absolute inset-[1px] rounded-2xl transition-all duration-500 bg-gradient-to-br from-white/95 to-blue-50/95 group-hover:from-white group-hover:to-blue-50 dark:from-gray-900/90 dark:to-gray-800/90 dark:group-hover:from-gray-900/95 dark:group-hover:to-gray-800/95" />

        {/* Border glow effect */}
        <div className="absolute inset-0 rounded-2xl transition-all duration-500 border border-indigo-200/50 group-hover:border-indigo-300/70 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] dark:border-indigo-500/20 dark:group-hover:border-indigo-500/40 dark:group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]" />

        {/* Hover border animation */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center text-indigo-900 dark:text-indigo-400 mb-8">
            Join Our Alumni Network
          </h2>
          <form onSubmit={handleSubmit} onKeyPress={handleKeyPress} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-500/20 pb-2">
                  About You
                </h3>
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
                      {...registerVerification("rollNumber")}
                      placeholder="2020XXXX12"
                      className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-500/30 transition-all duration-300"
                    />
                    {verificationErrors.rollNumber && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {verificationErrors.rollNumber.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    <span className="relative z-10">
                      {isVerifying ? (
                        <div className="flex items-center justify-center">
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
                          Verifying...
                        </div>
                      ) : (
                        "Verify Roll Number"
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                  </button>
                </div>
              </div>

              {/* Academic Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-500/20 pb-2">
                  College Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Roll Number
                    </label>
                    <input
                      type="text"
                      id="rollNumber"
                      name="rollNumber"
                      value={formData.rollNumber || ""}
                      onChange={handleChange}
                      placeholder="e.g., 2020/BCA/123"
                      className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-500/30 transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="batch" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Batch
                    </label>
                    <input
                      type="text"
                      id="batch"
                      name="batch"
                      value={formData.batch}
                      onChange={handleChange}
                      placeholder="e.g., 2020-2024"
                      className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-500/30 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Complete Registration */}
          {formStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-500/20 pb-2">
                Step 3: Complete Your Profile
              </h3>

              <form
                onSubmit={handleRegistrationSubmit(onSubmit)}
                onKeyPress={handleKeyPress}
              >
                {/* Prefilled Student Information Section */}
                <div className="space-y-6 mb-8">
                  <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-500/20 pb-2">
                    Verified Student Information
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    The following information has been retrieved from our
                    records and cannot be modified.
                  </p>

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
                          readOnly
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
                          {...registerRegistration("email")}
                          readOnly
                          className="w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none transition-all duration-300 cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="gender"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Gender
                        </label>
                        <input
                          type="text"
                          id="gender"
                          {...registerRegistration("gender")}
                          readOnly
                          className="w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none transition-all duration-300 cursor-not-allowed"
                        />
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
                          readOnly
                          className="w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none transition-all duration-300 cursor-not-allowed"
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
                          readOnly
                          className="w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none transition-all duration-300 cursor-not-allowed"
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
                          readOnly
                          className="w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none transition-all duration-300 cursor-not-allowed"
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
                        readOnly
                        className="w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none transition-all duration-300 cursor-not-allowed"
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
                        readOnly
                        className="w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none transition-all duration-300 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Password Section */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-500/20 pb-2">
                    Create Your Password
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Please create a secure password for your account.
                  </p>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        {...registerRegistration("password", {
                          onChange: (e) => setPasswordValue(e.target.value),
                        })}
                        placeholder="At least 8 characters"
                        className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-500/30 transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                              clipRule="evenodd"
                            />
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Password strength indicator */}
                    {passwordValue && (
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium">
                            Password strength:
                          </span>
                          <span className={getStrengthColorClass("text")}>
                            {getStrengthLabel().text}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-300 ${getStrengthColorClass(
                              "bg"
                            )}`}
                            style={{
                              width: `${(passwordStrength / 5) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {registrationErrors.password && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {registrationErrors.password.message}
                      </p>
                    )}
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                      <p>Password must contain:</p>
                      <ul className="list-disc list-inside pl-1 space-y-0.5">
                        <li>At least 8 characters</li>
                        <li>At least one uppercase letter (A-Z)</li>
                        <li>At least one lowercase letter (a-z)</li>
                        <li>At least one number (0-9)</li>
                        <li>At least one special character (!@#$%^&*)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setFormStep(1)}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-300 mr-4"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !passwordValue}
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10">
                      {isSubmitting
                        ? "Creating your account..."
                        : "Create Account"}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
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
          borderRadius: "10px",
          padding: "12px 16px",
          fontSize: "14px",
          fontWeight: "500",
        }}
      />
    </div>
  );
};

export default SignUp;
