import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"
import {useLoginMutation} from '../redux/Api/userApiSlice.js'
import {setUserInfo} from '../redux/features/authSlice.js'

const Login = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // store and login work
  const dispatch = useDispatch()
  const [login,isLoading] = useLoginMutation()

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const res = await login({rollNumber,password})
      dispatch(setUserInfo({...res})) 
    } catch (error) {
      console.log(error?.data?.message || error.message)
    }
    console.log("Username : ", rollNumber);
    console.log("Password : ", password);

    setPassword("");
    setRollNumber("");
    navigate("/");
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
          {/* Username */}
          <div className="mb-6">
            <label
              htmlFor="rollNumber"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              RollNumber
            </label>
            <input
              type="text"
              id="rollNumber"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>
          {/* Password */}
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
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Log In
          </button>
        </form>
        {/* Additional Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
