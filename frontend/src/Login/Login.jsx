import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/Api/userApiSlice.js";
import { setUserInfo, setTokenInfo } from "../redux/features/authSlice.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  // const [rollNumber, setRollNumber] = useState("");
  // const [password, setPassword] = useState("");
  // const navigate= useNavigate();
  // const {user} = useSelector((state) => state.auth);
  const [loggingIn, setLoggingIn] = useState(false);

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

  const onsubmit = async (data) => {
    // e.preventDefault();
    try {
      setLoggingIn(true);
      let { rollNumberOrEmail, password , selectLoginType} = data;
        //  console.log(data);
      // rollNumberOrEmail= rollNumberOrEmail.toLowerCase();
      const res = await login({ rollNumberOrEmail, password , role : selectLoginType});
      console.log(res);

      if (res.error) {
        const errorMessage =
          res.error.data?.message || "Login failed. Please try again.";
        // console.error("Login error:", res.error);
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

      // Check if data exists in the response
      if (!res.data) {
        console.error("Login response has no data:", res);
        toast("Login response is missing data", {
          style: {
            background: "linear-gradient(to right, #fee2e2, #fecaca)",
            color: "#991b1b",
          },
          icon: "❌",
        });
        return;
      }

      // Store user info
      dispatch(setUserInfo({ ...res.data }));

      toast( res.data.message || "Login successful! Redirecting...", {
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

      // Store auth token if it exists in the response
      if (res.data.token) {
        // Store the token for auth purposes
        dispatch(setTokenInfo(res.data.token));
      }

      setLoggingIn(false);
      // Check if cookies are set after login
      // console.log("Cookies after login:", document.cookie);

      

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md p-8 bg-gradient-to-br from-white/95 via-blue-50/95 to-indigo-50/95 dark:from-gray-800/95 dark:via-gray-800/95 dark:to-gray-900/95 shadow-lg rounded-2xl relative overflow-hidden group">
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
          <h1 className="text-3xl font-bold text-center text-indigo-900 dark:text-indigo-400 mb-6">
            Alumni Portal
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Access your alumni account
          </p>
          <form onSubmit={handleSubmit(onsubmit)} method="POST">
            
            <div className="relative mb-6">
              <select
                id="selectLoginType"
                {...register("selectLoginType")}
                defaultValue="Student / Alumni"
                className="appearance-none w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-500/30 transition-all duration-300"
              >
                <option value="Student / Alumni">Student / Alumni</option>
                <option value="Admin">Admin</option>
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
           
            <div className="mb-6">
              <label
                htmlFor="rollNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Id / RollNumber
              </label>
              <input
                type="text"
                id="rollNumber"
                {...register("rollNumberOrEmail")}
                placeholder="Enter your Email Id or RollNumber"
                className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-500/30 transition-all duration-300"
              />
              {errors.rollNumber && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.rollNumber.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-500/30 transition-all duration-300"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              onClick={handleSubmit(onsubmit)}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group"
              disabled={loggingIn}
            >
              <span className="relative z-10">
                {!loggingIn ? "Log In" : "Logging In"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              New to the portal?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 dark:text-indigo-400 hover:underline transition-colors duration-300"
              >
                Register here
              </Link>
            </p>
          </div>
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

export default Login;
