import { useNavigate, useParams } from "react-router";
import { useVerifyMutation } from "../redux/Api/userApiSlice";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verify = () => {
  const [code, setCode] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const { email } = useParams();
  const navigate = useNavigate();

  const [verify, { isLoading }] = useVerifyMutation();

  // Auto-focus input field
  useEffect(() => {
    const timer = setTimeout(() => {
      const inputElement = document.getElementById("code");
      if (inputElement) inputElement.focus();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (code.trim() === "") return; // Prevent empty submission
      const res = await verify({ email, code });
      console.log(`verified ${email} successfully`, res.data.message);
      toast.success("Verification successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error("Invalid verification code. Please try again.");
      console.log("error in verify page otp", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
      <div
        className="relative p-8 w-full max-w-md rounded-2xl transition-all duration-300 overflow-hidden group
        bg-white/95 dark:bg-gray-800/90 shadow-lg shadow-indigo-500/10"
      >
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-indigo-500/30 animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content border */}
        <div
          className="absolute inset-[1px] rounded-2xl transition-all duration-500 
          bg-gradient-to-br from-white/95 to-blue-50/95 group-hover:from-white group-hover:to-blue-50
          dark:from-gray-800/90 dark:to-gray-700/90 dark:group-hover:from-gray-800/95 dark:group-hover:to-gray-700/95"
        />

        {/* Border glow effect */}
        <div
          className="absolute inset-0 rounded-2xl transition-all duration-500 border 
          border-indigo-200/50 group-hover:border-indigo-300/70 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]
          dark:border-indigo-500/20 dark:group-hover:border-indigo-500/40 dark:group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]"
        />

        {/* Hover border animation */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
        </div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Email Verification
          </h2>

          <p className="text-center mt-2 text-gray-600 dark:text-gray-300">
            Please enter the verification code sent to:
          </p>

          <p className="text-center font-medium mt-1 mb-6 text-indigo-600 dark:text-indigo-300">
            {email}
          </p>

          {/* OTP Verification Code Input */}
          <div className="mt-4">
            <label
              htmlFor="code"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
            >
              Verification Code
            </label>
            <div
              className={`relative transition-all duration-300 ${
                inputFocus ? "transform scale-[1.02]" : ""
              }`}
            >
              <input
                type="text"
                id="code"
                value={code}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                className="w-full px-4 py-3 text-center tracking-widest text-lg rounded-lg 
                  border outline-none transition-all duration-300
                  bg-white text-gray-800 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
                  dark:bg-gray-700/70 dark:text-gray-100 dark:border-gray-600 dark:focus:border-indigo-500 dark:focus:ring-2 dark:focus:ring-indigo-500/50"
                placeholder="Enter verification code"
                maxLength={6}
              />
              <div
                className={`absolute inset-0 rounded-lg ${
                  inputFocus
                    ? "shadow-[0_0_0_2px] shadow-indigo-500/40"
                    : "shadow-none"
                } pointer-events-none transition-all duration-300`}
              ></div>
            </div>
          </div>

          {/* Verify Button */}
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              disabled={isLoading || code.trim() === ""}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform relative overflow-hidden
                ${
                  isLoading
                    ? "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                    : code.trim() === ""
                    ? "bg-indigo-400/50 text-white dark:bg-indigo-600/50 dark:text-gray-300"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]"
                }`}
            >
              <span className="relative z-10">
                {isLoading ? "Verifying..." : "Verify Code"}
              </span>
              {!isLoading && code.trim() !== "" && (
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
              )}
            </button>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-center mt-4">
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin
                  border-indigo-600 dark:border-indigo-400"
                ></div>
                <div
                  className="absolute inset-0 w-8 h-8 rounded-full border-2 border-t-transparent border-l-transparent animate-ping 
                  border-indigo-600/30 dark:border-indigo-400/30"
                ></div>
              </div>
            </div>
          )}

          {/* Return Link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-sm font-medium transition-colors duration-300 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
            >
              Return to home page
            </button>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="auto"
      />
    </div>
  );
};

export default Verify;
