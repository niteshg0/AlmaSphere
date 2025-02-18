import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../redux/Api/userApiSlice";
import { setUserInfo } from "../redux/features/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    rollNumber: 0,
    email: "",
    password: "",
    batch: "",
    gender: "",
  });

  const navigate = useNavigate();
  const dispatch =useDispatch();

  const [createUser,isLoading] = useSignupMutation()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await createUser(formData)
      if(res.error){
        console.log(res.error.data.message) 
        const errorMessage =
          res.error.data?.message || "SignUp failed. Please try again.";
        toast(errorMessage, {
          style: {
            background: "#1f2937", // Dark gray
            color: "#f87171", // Light red text
            border: "1px solid #dc2626", // Red border
          },
        });
        return
      }
      dispatch(setUserInfo({...res})) 
      toast("Varify Email Redirecting...", {
        style: {
          background: "#1f2937", // Dark gray
          color: "#e0e7ff", // Light indigo text
          border: "1px solid #4f46e5", // Indigo border
        },
      });  
    } catch (error) {
      console.log(error?.data?.message || error.message)
      toast("SignUp failed. Please try again.", {
        style: {
          background: "#1f2937",
          color: "#f87171", 
          border: "1px solid #dc2626", 
        },
      });
    }
    setFormData({
      fullName: "",
      rollNumber: 0,
      email: "",
      password: "",
      batch: "",
      gender: "",
    });
    console.log("email", email);
    if(formData.email){
      setTimeout(() => {
        navigate(`/verify/${formData.email}`);
      }, 1500);
    }else{
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-indigo-400 text-center mb-6">
          Alumni Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Roll Number */}
          <div>
            <label htmlFor="rollNumber" className="block text-gray-300 mb-1">
              Roll Number
            </label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Batch */}
          <div>
            <label htmlFor="batch" className="block text-gray-300 mb-1">
              Batch
            </label>
            <input
              type="text"
              id="batch"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              placeholder="XXXX-XXXX"
              className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-gray-300 mb-1">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="" disabled>
                -- Select --
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-500 text-gray-100 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300"
            >
              Sign Up
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

export default SignUp;
