import { useNavigate, useParams } from "react-router";
import { useVerifyMutation } from "../redux/Api/userApiSlice";
import { useState } from "react";

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
        

        navigate("/")
    } catch (error) {
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
    </div>
  );
};

export default Verify;
