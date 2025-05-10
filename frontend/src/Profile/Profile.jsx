import { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaFileAlt,
  FaLink,
  FaArrowRight,
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaClock,
  FaTrophy,
  FaClipboardList,
  FaToolbox,
  FaChalkboardTeacher,
  FaChartLine,
  FaEdit,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { useUserProfileQuery, useLogoutMutation } from "../redux/Api/userApiSlice";
import { useParams } from "react-router";
import ToastComp from "../components/ToastComp.jsx";

import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/authSlice.js";

const Profile= () => {

  
  const {data, isLoading, error} = useUserProfileQuery();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const [toast, setToast] = useState(null)
  
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  // Modal types
  const MODAL_TYPES = {
    PROFILE: "profile",
    JOB: "job",
    SKILLS: "skills",
    ACHIEVEMENT: "achievement",
    EXTRACURRICULAR: "extracurricular",
    ANALYTICS: "analytics",
  };

  useEffect(() => {
    if (data) {
      setUserData(data);
      console.log(data);
    }
    setLoading(false);
  }, [data]);


  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      setToast({type : 'success',message:"Logout successful..."})   

      setTimeout(() => {
        navigate("/");
        setUserData(null)
      }, 2000);
    } catch (error) {
      console.log(error?.data?.message || error?.message);

      setToast({type: 'error',message:"Unable to logout..."})
    }
  };

  const handleOpenModal = (type, data = null) => {
    setActiveModal(type);
    if (data) {
      setFormData(data);
    } else {
      setFormData({});
    }
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form data:", formData);
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Error
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {error.data.message || "An error occurred while loading the profile."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const renderModal = () => {
    if (!activeModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {activeModal === MODAL_TYPES.PROFILE && "Edit Profile"}
              {activeModal === MODAL_TYPES.JOB && "Add/Edit Job"}
              {activeModal === MODAL_TYPES.SKILLS && "Edit Skills"}
              {activeModal === MODAL_TYPES.ACHIEVEMENT && "Add Achievement"}
              {activeModal === MODAL_TYPES.EXTRACURRICULAR && "Add Extracurricular"}
              {activeModal === MODAL_TYPES.ANALYTICS && "Update Analytics"}
            </h3>
            <button
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {activeModal === MODAL_TYPES.PROFILE && (
              <>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName || userData?.fullName || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber || userData?.rollNumber || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Branch
                  </label>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch || userData?.branch || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>
              </>
            )}

            {activeModal === MODAL_TYPES.JOB && (
              <>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName || userData?.jobId?.companyName || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Position
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position || userData?.jobId?.position || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration || userData?.jobId?.duration || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location || userData?.jobId?.location || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>
              </>
            )}

            {activeModal === MODAL_TYPES.SKILLS && (
              <>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Technical Skills (comma-separated)
                  </label>
                  <textarea
                    name="technicalSkill"
                    value={
                      formData.technicalSkill || userData?.skillId?.technicalSkill || ""
                    }
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Non-Technical Skills (comma-separated)
                  </label>
                  <textarea
                    name="nonTechnicalSkill"
                    value={
                      formData.nonTechnicalSkill || userData?.skillId?.nonTechnicalSkill || ""
                    }
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>
              </>
            )}

            {activeModal === MODAL_TYPES.ACHIEVEMENT && (
              <>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>
              </>
            )}

            {activeModal === MODAL_TYPES.EXTRACURRICULAR && (
              <>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Activity
                  </label>
                  <input
                    type="text"
                    name="activity"
                    value={formData.activity || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>
              </>
            )}

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-red-500 font-medium">
          Error loading profile data
        </div>
      </div>
    );
  }

  // Process skills into arrays for better display 
  const technicalSkills = userData.skillId?.technicalSkill || [];
  const nonTechnicalSkills = userData.skillId?.nonTechnicalSkill || [];

  // Format the donation amount in lakhs
  const formattedDonation =
    userData.analyticsId && userData.analyticsId?.Donation >= 100000
      ? `${(userData.analyticsId?.Donation / 100000).toFixed(0)}L`
      : `₹${userData.analyticsId?.Donation || 0}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      {renderModal()}

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Profile Card */}
        <div className="rounded-xl shadow-md overflow-hidden border border-blue-100/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
          <div className="p-6">
            <div className="flex justify-between mb-2">
              <h2 className="text-xl font-bold flex items-center text-indigo-600 dark:text-indigo-400">
                <FaUserCircle className="mr-2" />
                Profile
              </h2>
              <button
                onClick={() => handleOpenModal(MODAL_TYPES.PROFILE, userData)}
                className="p-2 rounded-lg bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                <FaEdit className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col md:flex-row">
              {/* Left Side - Basic Info */}
              <div className="flex-1 space-y-4">
                {/* Name and Status */}
                <div className="flex flex-col md:flex-row md:justify-between md:space-x-4">
                  <div className="px-4 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50">
                    <span className="text-indigo-700 dark:text-indigo-300 font-medium">
                      {userData.fullName}
                    </span>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50">
                    <span className="text-blue-700 dark:text-blue-300">
                      {userData.role || "Alumni"}
                    </span>
                  </div>
                </div>

                {/* Student Details */}
                <div className="p-4 rounded-lg bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600">
                  <div className="flex items-center text-indigo-600 dark:text-indigo-400 mb-2">
                    <FaGraduationCap className="mr-2" />
                    <span className="font-medium">Academic Info</span>
                  </div>
                  <div className="space-y-1 text-gray-700 dark:text-gray-300">
                    <p>Roll No: {userData.rollNumber}</p>
                    <p>{userData.branch}</p>
                    <p>Batch: {userData.batch}</p>
                    <p>CGPA: {userData.cgpa || "N/A"}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button className="p-2 rounded-lg bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <FaUserCircle className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-lg bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <FaLink className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-lg bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <FaArrowRight className="h-5 w-5" />
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-sm transition-colors flex items-center">
                    <FaFileAlt className="mr-2" />
                    Resume
                  </button>
                  <button 
                      onClick={logoutHandler}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-sm transition-colors flex items-center"
                    >
                      Logout
                </button>
                </div>

                
              </div>

              {/* Right Side - Profile Image and Connection */}
              <div className="mt-6 md:mt-0 flex flex-col items-center md:ml-6 space-y-4">
                <div className="w-32 h-32 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border-2 border-indigo-300 dark:border-indigo-700 flex items-center justify-center overflow-hidden">
                  <div className="text-indigo-600 dark:text-indigo-400">
                    <svg
                      className="w-28 h-28"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="48"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M50 30 C60 30, 65 40, 65 45 C65 55, 55 60, 50 60"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M30 45 L40 50"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M60 50 L70 45"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M50 60 L50 75"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M40 75 L60 75"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50">
                  <span className="text-indigo-700 dark:text-indigo-300">
                    Connections: 108
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job History Card */}
        <div className="rounded-xl shadow-md overflow-hidden border border-blue-100/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
          <div className="p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center text-indigo-600 dark:text-indigo-400">
                <FaBriefcase className="mr-2" />
                Job History
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(MODAL_TYPES.JOB)}
                  className="p-2 rounded-lg bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <FaPlus className="h-5 w-5" />
                </button>
                <button
                  onClick={() =>
                    handleOpenModal(MODAL_TYPES.JOB, userData.jobId)
                  }
                  className="p-2 rounded-lg bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <FaEdit className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Job */}
              <div>
                <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                  Current Position
                </h3>
                <div className="p-4 rounded-lg bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600">
                  <p className="font-medium">{userData.jobId?.position || "Not specified"}</p>
                  <p>{userData.jobId?.companyName || "Not specified"}</p>
                  <p className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <FaMapMarkerAlt className="mr-1" size={12} />
                    {userData.jobId?.location || "Not specified"}
                  </p>
                  <p className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <FaClock className="mr-1" size={12} />
                    {userData.jobId?.duration || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Previous Jobs */}
              <div>
                <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                  Previous Experience
                </h3>
                <div className="p-4 rounded-lg bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600">
                  {userData.jobId?.previousCompany?.length > 0 ? (
                    userData.jobId.previousCompany.map((job, index) => (
                      <div key={index} className="mb-2">
                        <p className="font-medium">{job.companyName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {job.position}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {job.duration}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">No previous jobs listed</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="rounded-xl shadow-md overflow-hidden border border-blue-100/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
          <div className="p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center text-indigo-600 dark:text-indigo-400">
                <FaToolbox className="mr-2" />
                Skills
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleOpenModal(MODAL_TYPES.SKILLS, userData.skillId)
                  }
                  className="p-2 rounded-lg bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <FaEdit className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Technical Skills */}
              <div>
                <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center">
                  <FaToolbox className="mr-2 text-sm" />
                  Technical Skills
                </h3>
                <div className="p-4 rounded-lg bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600">
                  <div className="space-y-2">
                    {technicalSkills.length > 0 ? (
                      technicalSkills.map((skill, index) => (
                        <div key={index} className="flex items-center">
                          <span className="text-indigo-500 dark:text-indigo-400 mr-2">
                            -&gt;
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {skill.trim()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No technical skills listed</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Non-Technical Skills */}
              <div>
                <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center">
                  <FaChalkboardTeacher className="mr-2 text-sm" />
                  Non-Technical Skills
                </h3>
                <div className="p-4 rounded-lg bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600">
                  <div className="space-y-2">
                    {nonTechnicalSkills.length > 0 ? (
                      nonTechnicalSkills.map((skill, index) => (
                        <div key={index} className="flex items-center">
                          <span className="text-indigo-500 dark:text-indigo-400 mr-2">
                            -&gt;
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {skill.trim()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No non-technical skills listed</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements and Extra */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Achievements */}
          <div className="rounded-xl shadow-md overflow-hidden border border-blue-100/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
            <div className="p-6">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center text-indigo-600 dark:text-indigo-400">
                  <FaTrophy className="mr-2" />
                  Achievements
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(MODAL_TYPES.ACHIEVEMENT)}
                    className="p-2 rounded-lg bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FaPlus className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {userData?.extraId?.achievements?.length > 0 ? (
                  userData.extraId.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600 flex items-start"
                    >
                      <span className="text-green-500 dark:text-green-400 mr-2 mt-1">
                        -&gt;
                      </span>
                      <div>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          {achievement.title}
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 rounded-lg bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600 text-center">
                    <p className="text-gray-500 dark:text-gray-400">No achievements listed</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Extra */}
          <div className="rounded-xl shadow-md overflow-hidden border border-blue-100/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
            <div className="p-6">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center text-indigo-600 dark:text-indigo-400">
                  <FaClipboardList className="mr-2" />
                  Extracurricular
                </h2>
                <div className="flex gap-2">
                  
                  <button
                    onClick={() => handleOpenModal(MODAL_TYPES.EXTRACURRICULAR)}
                    className="p-2 rounded-lg bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FaPlus className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {userData?.extraId?.extracurriculars?.length > 0 ? (
                  userData.extraId.extracurriculars.map((activity, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600 flex items-start"
                    >
                      <span className="text-blue-500 dark:text-blue-400 mr-2 mt-1">
                        -&gt;
                      </span>
                      <div>
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          {activity.activity}
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {activity.duration}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 rounded-lg bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600 text-center">
                    <p className="text-gray-500 dark:text-gray-400">No extracurricular activities listed</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="rounded-xl shadow-md overflow-hidden border border-blue-100/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
          <div className="p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center text-indigo-600 dark:text-indigo-400">
                <FaChartLine className="mr-2" />
                Analytics
              </h2>
              
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 shadow-sm border border-green-100 dark:border-green-800/50 text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formattedDonation}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Donation
                </p>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 shadow-sm border border-indigo-100 dark:border-indigo-800/50 text-center">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {userData?.analyticsId?.QueryAnswered || 0}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Answers
                </p>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 shadow-sm border border-blue-100 dark:border-blue-800/50 text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {userData?.analyticsId?.jobPosted || 0}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Jobs Posted
                </p>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 shadow-sm border border-purple-100 dark:border-purple-800/50 text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {userData?.analyticsId?.EventOrganised || 0}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Events
                </p>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 shadow-sm border border-orange-100 dark:border-orange-800/50 text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {userData?.analyticsId?.postMade || 0}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Posts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

       {toast && <ToastComp toastType={toast.type} message={toast.message}/>}

    </div>
  );
};

export default Profile;