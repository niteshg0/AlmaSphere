import React from "react";
import ProfileList from "../components/ProfileComponents/ProfileList.jsx";
import UserDetails from "../components/ProfileComponents/UserDetails.jsx";
import { useLogoutMutation } from "../redux/Api/userApiSlice.js";
import { useNavigate, Link } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice.js";
import { useSelector } from "react-redux";
import AcademicDetails from "../components/ProfileComponents/AcademicDetails.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      console.log("Attempting to logout...");
      await logoutApiCall().unwrap()
      dispatch(logout());
      toast("Logout successfull...", {
        style: {
          background: "#1f2937", // Dark gray
          color: "#e0e7ff", // Light indigo text
          border: "1px solid #4f46e5", // Indigo border
        },
      });
        navigate("/");
    } catch (error) {
      console.log(error?.data?.message || error?.message);
      toast("Logout failed. Please try again.", {
        style: {
          background: "#1f2937",
          color: "#f87171", 
          border: "1px solid #dc2626", 
        },
      });
    }
  };
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex items-center border-b border-gray-700 p-6">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{user.data?.fullName}</h2>
            <p className="text-gray-400">{user.data?.email}</p>
          </div>
          <div className="ml-auto">
            <Link to={"/createJob"}>
              <button className="border px-5 py-2 rounded-3xl mr-3 cursor-pointer">
                Create Job
              </button>
            </Link>
            <button
              className="border px-5 py-2 rounded-3xl mr-3 cursor-pointer "
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* user details */}
          <UserDetails />
          {/* Account Details */}
          <AcademicDetails />
          {/* Security Settings */}
          <ProfileList />
          {/* Preferences */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Preferences</h3>
            <ul className="space-y-2">
              <li>
                <strong>Email Notifications:</strong> Subscribed
              </li>
              <li>
                <strong>SMS Alerts:</strong> Enabled
              </li>
              <li>
                <strong>Content Preferences:</strong> Technology, Design,
                Innovation
              </li>
              <li>
                <strong>Default Dashboard View:</strong> Compact Mode
              </li>
              <li>
                <strong>Dark Mode:</strong> Activated
              </li>
              <li>
                <strong>Language for Content:</strong> English
              </li>
            </ul>
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

export default Profile;
