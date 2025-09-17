import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useLoginMutation } from "../redux/Api/userApiSlice.js";
import { setUserInfo, setTokenInfo } from "../redux/features/authSlice.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const [loggingIn, setLoggingIn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const formSchema = z.object({
    rollNumberOrEmail: z.union([
      z
        .string()
        .min(10, "Roll number must be at least 10 digits")
        .regex(/^\d+$/, "Roll number must contain only digits")
        .transform((val) => Number(val)),
      z
        .string()
        .email("Invalid email address")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Incorrect Email Format"),
    ]),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{6,}$/,
        "Password must include a letter, a number, and a special character"
      ),
    selectLoginType: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  // Single mouse position tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const onsubmit = async (data) => {
    try {
      setLoggingIn(true);
      let { rollNumberOrEmail, password, selectLoginType } = data;
      const res = await login({ rollNumberOrEmail, password, role: selectLoginType });

      if (res.error) {
        const errorMessage =
          res.error.data?.message || "Login failed. Please try again.";
        toast(errorMessage, {
          style: {
            background: "linear-gradient(to right, #fee2e2, #fecaca)",
            color: "#991b1b",
            border: "1px solid #f87171",
            boxShadow: "0px 4px 10px rgba(239, 68, 68, 0.2)",
          },
          icon: "❌",
          className:
            "dark:!bg-gradient-to-r dark:!from-red-950/90 dark:!to-red-900/90 dark:!text-red-100 dark:!border-red-800 dark:!shadow-[0px_4px_10px_rgba(239,68,68,0.3)]",
        });
        return;
      }

      if (!res.data) {
        toast("Login response is missing data", {
          style: {
            background: "linear-gradient(to right, #fee2e2, #fecaca)",
            color: "#991b1b",
          },
          icon: "❌",
        });
        return;
      }

      dispatch(setUserInfo({ ...res.data }));

      toast(res.data.message || "Login successful! Redirecting...", {
        style: {
          background: "linear-gradient(to right, #e0e7ff, #c7d2fe)",
          color: "#312e81",
          border: "1px solid #818cf8",
          boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
        },
        icon: "✅",
        className:
          "dark:!bg-gradient-to-r dark:!from-indigo-950/90 dark:!to-indigo-900/90 dark:!text-indigo-100 dark:!border-indigo-800 dark:!shadow-[0px_4px_10px_rgba(99,102,241,0.3)]",
      });

      if (res.data.token) {
        dispatch(setTokenInfo(res.data.token));
      }

      setLoggingIn(false);

      setTimeout(() => {
        if (res.data.role === "Admin") {
          navigate("/admin/add-edit-Student");
        } else {
          navigate("/");
        }
      }, 1000);
    } catch (error) {
      console.error("Login exception:", error);
      toast("Login failed. Please try again.", {
        style: {
          background: "linear-gradient(to right, #fee2e2, #fecaca)",
          color: "#991b1b",
          border: "1px solid #f87171",
          boxShadow: "0px 4px 10px rgba(239, 68, 68, 0.2)",
        },
        icon: "❌",
        className:
          "dark:!bg-gradient-to-r dark:!from-red-950/90 dark:!to-red-900/90 dark:!text-red-100 dark:!border-red-800 dark:!shadow-[0px_4px_10px_rgba(239,68,68,0.3)]",
      });
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-gray-100/80 to-gray-200/90 dark:from-black dark:via-gray-850/95 dark:to-black">
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

      {/* Main Login Container */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-20"
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
              <h1 className="text-3xl font-bold font-serif mb-2 bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-700 dark:from-gray-600 dark:via-white dark:to-gray-600 bg-clip-text text-transparent">
                Alumni Portal
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Access your alumni account
              </p>
            </motion.div>

            {/* Login Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onSubmit={handleSubmit(onsubmit)}
              method="POST"
              className="space-y-6"
            >
              {/* Login Type Select */}
              <div className="relative">
                <label
                  htmlFor="selectLoginType"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Login Type
                </label>
                <div className="relative group/select">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-gray-100/30 to-gray-200/40 dark:from-black/40 dark:via-gray-800/30 dark:to-gray-700/40 backdrop-blur-md rounded-xl pointer-events-none" />
                  <div className="absolute inset-0 rounded-xl border border-gray-300/50 dark:border-gray-600/40 group-hover/select:border-indigo-300/50 dark:group-hover/select:border-gray-500/50 transition-colors duration-300 pointer-events-none" />
                  
                  <select
                    id="selectLoginType"
                    {...register("selectLoginType")}
                    defaultValue="Student / Alumni"
                    className="relative appearance-none w-full px-4 py-3 bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-gray-500/40 rounded-xl font-medium transition-all duration-300"
                  >
                    <option value="Student / Alumni">Student / Alumni</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
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

              {/* Email/Roll Number Input */}
              <div className="relative">
                <label
                  htmlFor="rollNumber"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Id / RollNumber
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-gray-100/30 to-gray-200/40 dark:from-black/40 dark:via-gray-800/30 dark:to-gray-700/40 backdrop-blur-md rounded-xl pointer-events-none" />
                  <div className="absolute inset-0 rounded-xl border border-gray-300/50 dark:border-gray-600/40 group-hover/input:border-indigo-300/50 dark:group-hover/input:border-gray-500/50 transition-colors duration-300 pointer-events-none" />
                  
                  <input
                    type="text"
                    id="rollNumber"
                    {...register("rollNumberOrEmail")}
                    placeholder="Enter your Email Id or RollNumber"
                    className="relative w-full px-4 py-3 bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-gray-500/40 rounded-xl font-medium transition-all duration-300"
                  />
                </div>
                {errors.rollNumberOrEmail && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.rollNumberOrEmail.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
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
                    type="password"
                    id="password"
                    {...register("password")}
                    placeholder="Enter your password"
                    className="relative w-full px-4 py-3 bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-gray-500/40 rounded-xl font-medium transition-all duration-300"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                disabled={loggingIn}
                className="w-full py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group/btn backdrop-blur-sm bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-600/90 hover:to-purple-600/90 text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 border border-indigo-400/30 dark:from-gray-950 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-300 dark:hover:text-gray-800 dark:shadow-gray-500/20 dark:hover:shadow-gray-500/30 dark:border-gray-600/30 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {!loggingIn ? "Log In" : "Logging In"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </motion.form>

            {/* Register Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                New to the portal?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors duration-300"
                >
                  Register here
                </Link>
              </p>
            </motion.div>
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

export default Login;
