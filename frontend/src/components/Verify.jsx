import { useNavigate, useParams } from "react-router";
import { useVerifyMutation } from "../redux/Api/userApiSlice";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verify = () => {
  const [code, setCode] = useState("");
  const { email } = useParams();
  const navigate= useNavigate()

  const [verify, { isLoading }] = useVerifyMutation();

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async () => {
    try {
        if (code.trim() === "") return; // Prevent empty submission
        const res= await verify({ email, code });
        console.log(`verified ${email} successfuly`, res.data.message);
        toast("SignUp successful! Redirecting...", {
          style: {
            background: "#1f2937", // Dark gray
            color: "#e0e7ff", // Light indigo text
            border: "1px solid #4f46e5", // Indigo border
          },
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
    } catch (error) {
      toast("Wrong OTP Re-enter please...", {
        style: {
          background: "#1f2937",
          color: "#f87171", 
          border: "1px solid #dc2626", 
        },
      });
        console.log("error in verify page otp", error); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="p-8 bg-gray-800 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-400 mb-4">
          Email Verification
        </h2>
        <p className="text-center text-gray-300">
          Verifying email: <span className="font-semibold">{email}</span>
        </p>

        {/* Verification Code Input */}
        <div className="mt-4">
          <label htmlFor="code" className="block text-gray-400 mb-2">
            Enter Verification Code
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Enter your code"
          />
        </div>

        {/* Verify Button */}
        <div className="mt-4">
          <button
            onClick={handleSubmit}
            className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
              isLoading
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-indigo-500 text-gray-100 hover:bg-indigo-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </div>

        {/* Loading Message */}
        {isLoading && (
          <p className="text-center mt-4 text-yellow-400">
            Please wait while we process your request...
          </p>
        )}
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

export default Verify;
