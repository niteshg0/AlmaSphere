import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/Api/userApiSlice.js";
import { setUserInfo } from "../redux/features/authSlice.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ rollNumber, password });
      console.log(res)
      if (res.error) {
        const errorMessage =
          res.error.data?.message || "Login failed. Please try again.";
        toast(errorMessage, {
          style: {
            background: "#1f2937", // Dark gray
            color: "#f87171", // Light red text
            border: "1px solid #dc2626", // Red border
          },
        });
        return; // Exit early to prevent further execution
      }
  
      dispatch(setUserInfo({ ...res }));
      toast("Login successful! Redirecting...", {
        style: {
          background: "#1f2937", // Dark gray
          color: "#e0e7ff", // Light indigo text
          border: "1px solid #4f46e5", // Indigo border
        },
      });
      setRollNumber("");
      setPassword("");
    } catch (error) {
      toast("Login failed. Please try again.", {
        style: {
          background: "#1f2937",
          color: "#f87171", 
          border: "1px solid #dc2626", 
        },
      });
    }
    setTimeout(() => {
      navigate("/");
    }, 1500);

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md p-8 bg-gradient-to-br from-gray-800 to-gray-700 shadow-lg rounded-2xl">
        <h1 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Log in to continue to your account
        </p>
        <form onSubmit={handleSubmit} method="POST">
          <div className="mb-6">
            <label
              htmlFor="rollNumber"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Roll Number
            </label>
            <input
              type="text"
              id="rollNumber"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="Enter your roll number"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Log In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-400 hover:underline">
              Sign up
            </Link>
          </p>
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
          background: "linear-gradient(to right, #1f2937, #374151)", // Dark gray gradient
          color: "#e0e7ff", // Light indigo text
          borderRadius: "10px",
          border: "1px solid #4f46e5", // Indigo border
          boxShadow: "0px 4px 10px rgba(79, 70, 229, 0.2)",
        }}
      />
    </div>
  );
};

export default Login;
