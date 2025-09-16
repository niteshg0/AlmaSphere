import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  // Track form steps
  const [formStep, setFormStep] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationOTP, setVerificationOTP] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [prefilledData, setPrefilledData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordValue, setPasswordValue] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup] = useSignupMutation();
  const [verify_roll] = useVerify_rollMutation();
  const [verify_Roll_code] = useVerify_Roll_CodeMutation();

  // Single mouse position tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (!password) return 0;
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
    if (passwordStrength === 0) return { text: "No password", color: "gray-400" };
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
        case "gray-400": return "text-gray-400 dark:text-gray-500";
        case "red-500": return "text-red-500 dark:text-red-400";
        case "orange-500": return "text-orange-500 dark:text-orange-400";
        case "yellow-500": return "text-yellow-500 dark:text-yellow-400";
        case "green-500": return "text-green-500 dark:text-green-400";
        case "emerald-500": return "text-emerald-500 dark:text-emerald-400";
        default: return "text-gray-400 dark:text-gray-500";
      }
    } else if (type === "bg") {
      switch (color) {
        case "gray-400": return "bg-gray-400 dark:bg-gray-500";
        case "red-500": return "bg-red-500 dark:bg-red-400";
        case "orange-500": return "bg-orange-500 dark:bg-orange-400";
        case "yellow-500": return "bg-yellow-500 dark:bg-yellow-400";
        case "green-500": return "bg-green-500 dark:bg-green-400";
        case "emerald-500": return "bg-emerald-500 dark:bg-emerald-400";
        default: return "bg-gray-400 dark:bg-gray-500";
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
      const rollNumber = data.rollNumber;
      const res = await verify_roll({ rollNumber });

      if (res.data) {
        toast.success("Verification code sent to your registered email", {
          className:
            "dark:!bg-gradient-to-r dark:!from-indigo-950/90 dark:!to-indigo-900/90 dark:!text-indigo-100",
        });

        const details = res.data.data;
        setPrefilledData({
          rollNumber
        });
        setFormStep(1);
      }

      if (res.error) {
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
      const rollNumber = prefilledData.rollNumber;
      const code = verificationOTP;
      const res = await verify_Roll_code({ rollNumber, code });

      if (res.error) {
        toast.error("Invalid verification code. Please try again.");
        return;
      }

      if (res.data) {
        toast.success(res.data?.message || `Email verified successfully!`, {
          className:
            "dark:!bg-gradient-to-r dark:!from-green-950/90 dark:!to-green-900/90 dark:!text-green-100",
        });

        const details = res.data.data;
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
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const data = formData;
      const res = await signup(data);

      if (res.error) {
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
      e.preventDefault();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-gray-100/80 to-gray-200/90 dark:from-black dark:via-gray-850/95 dark:to-black p-4">
      {/* Single cursor glow effect */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 100,
          y: mousePosition.y - 100,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      >
        <div className="w-48 h-48 bg-gradient-to-r from-indigo-200/10 via-purple-100/15 to-pink-200/10 dark:from-gray-400/10 dark:via-gray-300/15 dark:to-gray-200/10 rounded-full blur-2xl opacity-60" />
      </motion.div>

      {/* Background orbs */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        animate={{ 
          y: [0, -50, 0],
          x: [0, 25, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute top-60 left-40 w-72 h-72 bg-gradient-to-r from-gray-600/50 to-gray-800/10 dark:from-gray-400/50 dark:to-gray-200/10 rounded-full blur-3xl" />
        <div className="absolute top-80 right-60 w-96 h-96 bg-gradient-to-r from-gray-400/50 to-gray-800/20 dark:from-gray-600/50 dark:to-gray-200/20 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        animate={{ 
          y: [0, -100, 0],
          x: [0, -25, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-gray-400/20 to-gray-700/10 dark:from-gray-600/20 dark:to-gray-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-64 h-64 bg-gradient-to-r from-gray-400/10 to-gray-700/10 dark:from-gray-600/10 dark:to-gray-200/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Main SignUp Container */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl relative z-20"
      >
        <div className="group relative overflow-hidden rounded-3xl">
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg pointer-events-none" />
          
          {/* Animated gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/30 via-pink-400/30 to-indigo-400/30 dark:from-gray-500/20 dark:via-gray-300/25 dark:to-gray-500/20 opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-3xl pointer-events-none" />
          
          {/* Border */}
          <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300 pointer-events-none" />

          {/* Floating particles */}
          <div className="absolute top-6 right-8 w-2 h-2 bg-gradient-to-r from-sky-400 to-blue-500 dark:from-gray-200 dark:to-white rounded-full opacity-60 animate-pulse pointer-events-none" />
          <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-gray-400 dark:to-gray-600 rounded-full opacity-40 animate-pulse pointer-events-none" style={{ animationDelay: "1s" }} />

          <div className="relative p-8 z-30">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold font-serif bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-700 dark:from-gray-600 dark:via-white dark:to-gray-600 bg-clip-text text-transparent">
                Join Our Alumni Network
              </h2>
            </motion.div>

            {/* Form steps indicator */}
            <div className="flex items-center justify-center mb-8">
              <div
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  formStep >= 0
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-gray-500 dark:to-gray-300"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              ></div>
              <div
                className={`h-1 w-10 transition-all duration-300 ${
                  formStep >= 1
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-gray-500 dark:to-gray-300"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              ></div>
              <div
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  formStep >= 1
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-gray-500 dark:to-gray-300"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              ></div>
              <div
                className={`h-1 w-10 transition-all duration-300 ${
                  formStep >= 2
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-gray-500 dark:to-gray-300"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              ></div>
              <div
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  formStep >= 2
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-gray-500 dark:to-gray-300"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              ></div>
            </div>

            {/* Step 1: Roll Number Verification */}
            {formStep === 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent border-b border-gray-200/40 dark:border-gray-700/40 pb-2">
                  Step 1: Roll Number Verification
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Enter your college roll number to begin the verification
                  process.
                </p>
                <form
                  onSubmit={handleVerificationSubmit(verifyRollNumber)}
                  onKeyPress={handleKeyPress}
                >
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="rollNumber"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Roll Number
                      </label>
                      <div className="relative group/input">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-gray-100/30 to-gray-200/40 dark:from-black/40 dark:via-gray-800/30 dark:to-gray-700/40 backdrop-blur-md rounded-xl pointer-events-none" />
                        <div className="absolute inset-0 rounded-xl border border-gray-300/50 dark:border-gray-600/40 group-hover/input:border-indigo-300/50 dark:group-hover/input:border-gray-500/50 transition-colors duration-300 pointer-events-none" />
                        
                        <input
                          type="text"
                          id="rollNumber"
                          {...registerVerification("rollNumber")}
                          placeholder="2020XXXX12"
                          className="relative w-full px-4 py-3 bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-gray-500/40 rounded-xl font-medium transition-all duration-300"
                        />
                      </div>
                      {verificationErrors.rollNumber && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {verificationErrors.rollNumber.message}
                        </p>
                      )}
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isVerifying}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group/btn backdrop-blur-sm bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-600/90 hover:to-purple-600/90 text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 border border-indigo-400/30 dark:from-gray-950 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-300 dark:hover:text-gray-800 dark:shadow-gray-500/20 dark:hover:shadow-gray-500/30 dark:border-gray-600/30 disabled:opacity-60 disabled:cursor-not-allowed"
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
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 2: OTP Verification */}
            {formStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent border-b border-gray-200/40 dark:border-gray-700/40 pb-2">
                  Step 2: Verify Email
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We've sent a verification code to your college registered email.
                  Please enter it below.
                </p>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Verification Code
                    </label>
                    <div className="relative group/input">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-gray-100/30 to-gray-200/40 dark:from-black/40 dark:via-gray-800/30 dark:to-gray-700/40 backdrop-blur-md rounded-xl pointer-events-none" />
                      <div className="absolute inset-0 rounded-xl border border-gray-300/50 dark:border-gray-600/40 group-hover/input:border-indigo-300/50 dark:group-hover/input:border-gray-500/50 transition-colors duration-300 pointer-events-none" />
                      
                      <input
                        type="text"
                        id="otp"
                        value={verificationOTP}
                        onChange={(e) => setVerificationOTP(e.target.value)}
                        placeholder="Enter 4-digit code"
                        className="relative w-full px-4 py-3 bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-gray-500/40 rounded-xl font-medium transition-all duration-300 text-center tracking-widest text-lg"
                        maxLength={6}
                        minLength={4}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setFormStep(0)}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-300 font-medium"
                    >
                      Back
                    </button>
                    <motion.button
                      type="button"
                      onClick={verifyOTP}
                      disabled={isVerifying}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group/btn backdrop-blur-sm bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-600/90 hover:to-purple-600/90 text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 border border-indigo-400/30 dark:from-gray-950 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-300 dark:hover:text-gray-800 dark:shadow-gray-500/20 dark:hover:shadow-gray-500/30 dark:border-gray-600/30 disabled:opacity-60 disabled:cursor-not-allowed"
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
                          "Verify Code"
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Complete Registration */}
            {formStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent border-b border-gray-200/40 dark:border-gray-700/40 pb-2">
                  Step 3: Complete Your Profile
                </h3>

                <form
                  onSubmit={handleRegistrationSubmit(onSubmit)}
                  onKeyPress={handleKeyPress}
                >
                  {/* Prefilled Student Information Section */}
                  <div className="space-y-6 mb-8">
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent border-b border-gray-200/40 dark:border-gray-700/40 pb-2">
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
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-200/60 via-gray-300/40 to-gray-400/60 dark:from-gray-700/60 dark:via-gray-800/40 dark:to-gray-900/60 backdrop-blur-md rounded-xl pointer-events-none" />
                            <div className="absolute inset-0 rounded-xl border border-gray-400/30 dark:border-gray-600/30 pointer-events-none" />
                            
                            <input
                              type="text"
                              id="fullName"
                              {...registerRegistration("fullName")}
                              readOnly
                              className="relative w-full px-4 py-3 bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none rounded-xl font-medium cursor-not-allowed"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                          >
                            Email Address
                          </label>
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-200/60 via-gray-300/40 to-gray-400/60 dark:from-gray-700/60 dark:via-gray-800/40 dark:to-gray-900/60 backdrop-blur-md rounded-xl pointer-events-none" />
                            <div className="absolute inset-0 rounded-xl border border-gray-400/30 dark:border-gray-600/30 pointer-events-none" />
                            
                            <input
                              type="email"
                              id="email"
                              {...registerRegistration("email")}
                              readOnly
                              className="relative w-full px-4 py-3 bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none rounded-xl font-medium cursor-not-allowed"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="gender"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                          >
                            Gender
                          </label>
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-200/60 via-gray-300/40 to-gray-400/60 dark:from-gray-700/60 dark:via-gray-800/40 dark:to-gray-900/60 backdrop-blur-md rounded-xl pointer-events-none" />
                            <div className="absolute inset-0 rounded-xl border border-gray-400/30 dark:border-gray-600/30 pointer-events-none" />
                            
                            <input
                              type="text"
                              id="gender"
                              {...registerRegistration("gender")}
                              readOnly
                              className="relative w-full px-4 py-3 bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none rounded-xl font-medium cursor-not-allowed"
                            />
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
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-200/60 via-gray-300/40 to-gray-400/60 dark:from-gray-700/60 dark:via-gray-800/40 dark:to-gray-900/60 backdrop-blur-md rounded-xl pointer-events-none" />
                            <div className="absolute inset-0 rounded-xl border border-gray-400/30 dark:border-gray-600/30 pointer-events-none" />
                            
                            <input
                              type="text"
                              id="rollNumber"
                              {...registerRegistration("rollNumber")}
                              readOnly
                              className="relative w-full px-4 py-3 bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none rounded-xl font-medium cursor-not-allowed"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="course"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                          >
                            Course
                          </label>
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-200/60 via-gray-300/40 to-gray-400/60 dark:from-gray-700/60 dark:via-gray-800/40 dark:to-gray-900/60 backdrop-blur-md rounded-xl pointer-events-none" />
                            <div className="absolute inset-0 rounded-xl border border-gray-400/30 dark:border-gray-600/30 pointer-events-none" />
                            
                            <input
                              type="text"
                              id="course"
                              {...registerRegistration("course")}
                              readOnly
                              className="relative w-full px-4 py-3 bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none rounded-xl font-medium cursor-not-allowed"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="batch"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                          >
                            Batch
                          </label>
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-200/60 via-gray-300/40 to-gray-400/60 dark:from-gray-700/60 dark:via-gray-800/40 dark:to-gray-900/60 backdrop-blur-md rounded-xl pointer-events-none" />
                            <div className="absolute inset-0 rounded-xl border border-gray-400/30 dark:border-gray-600/30 pointer-events-none" />
                            
                            <input
                              type="text"
                              id="batch"
                              {...registerRegistration("batch")}
                              readOnly
                              className="relative w-full px-4 py-3 bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none rounded-xl font-medium cursor-not-allowed"
                            />
                          </div>
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
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-200/60 via-gray-300/40 to-gray-400/60 dark:from-gray-700/60 dark:via-gray-800/40 dark:to-gray-900/60 backdrop-blur-md rounded-xl pointer-events-none" />
                          <div className="absolute inset-0 rounded-xl border border-gray-400/30 dark:border-gray-600/30 pointer-events-none" />
                          
                          <input
                            type="text"
                            id="branch"
                            {...registerRegistration("branch")}
                            readOnly
                            className="relative w-full px-4 py-3 bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none rounded-xl font-medium cursor-not-allowed"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="cgpa"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          CGPA
                        </label>
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-200/60 via-gray-300/40 to-gray-400/60 dark:from-gray-700/60 dark:via-gray-800/40 dark:to-gray-900/60 backdrop-blur-md rounded-xl pointer-events-none" />
                          <div className="absolute inset-0 rounded-xl border border-gray-400/30 dark:border-gray-600/30 pointer-events-none" />
                          
                          <input
                            type="text"
                            id="cgpa"
                            {...registerRegistration("cgpa")}
                            readOnly
                            className="relative w-full px-4 py-3 bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none rounded-xl font-medium cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Password Section */}
                  <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent border-b border-gray-200/40 dark:border-gray-700/40 pb-2">
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
                      <div className="relative group/input">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-gray-100/30 to-gray-200/40 dark:from-black/40 dark:via-gray-800/30 dark:to-gray-700/40 backdrop-blur-md rounded-xl pointer-events-none" />
                        <div className="absolute inset-0 rounded-xl border border-gray-300/50 dark:border-gray-600/40 group-hover/input:border-indigo-300/50 dark:group-hover/input:border-gray-500/50 transition-colors duration-300 pointer-events-none" />
                        
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          {...registerRegistration("password", {
                            onChange: (e) => setPasswordValue(e.target.value),
                          })}
                          placeholder="At least 8 characters"
                          className="relative w-full px-4 py-3 pr-12 bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-gray-500/40 rounded-xl font-medium transition-all duration-300"
                        />
                        
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none transition-colors duration-300 z-10"
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
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                              Password strength:
                            </span>
                            <span className={`text-xs font-medium ${getStrengthColorClass("text")}`}>
                              {getStrengthLabel().text}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full transition-all duration-300 ${getStrengthColorClass("bg")}`}
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

                  <div className="flex items-center justify-end pt-4 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-300 font-medium"
                    >
                      Back
                    </button>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !passwordValue}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group/btn backdrop-blur-sm bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-600/90 hover:to-purple-600/90 text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 border border-indigo-400/30 dark:from-gray-950 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-300 dark:hover:text-gray-800 dark:shadow-gray-500/20 dark:hover:shadow-gray-500/30 dark:border-gray-600/30 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10">
                        {isSubmitting
                          ? "Creating your account..."
                          : "Create Account"}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>

          {/* Shadow effect */}
          <div className="absolute inset-0 rounded-3xl shadow-xl shadow-gray-200/60 group-hover:shadow-2xl group-hover:shadow-indigo-300/20 dark:group-hover:shadow-gray-500/25 transition-shadow duration-500 pointer-events-none" />
        </div>
      </motion.div>

      {/* Toast Container */}
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

      {/* Floating accent elements */}
      <motion.div
        className="fixed bottom-1/3 left-10 w-3 h-3 bg-gray-600 dark:bg-gray-400 rounded-full opacity-50 pointer-events-none z-10"
        animate={{
          x: [0, 15, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
};

export default SignUp;
