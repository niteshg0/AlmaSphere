import { useState, useEffect } from "react";
import { MdNotificationAdd } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import axios from "axios";
import Modal from "./Model";
import ProfileAvatar from "../Profile/ProfileAvatar.jsx";
import UploadProfileImage from "../Profile/Photo.jsx";
import { AnimatePresence, motion } from "framer-motion";

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
  FaLock,
} from "react-icons/fa";
import {
  useUserProfileQuery,
  useLogoutMutation,
} from "../redux/Api/userApiSlice";
import { useParams } from "react-router";
import ToastComp from "../components/ToastComp.jsx";

import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/authSlice.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAddExtraInfoMutation,
  useAddJobInfoMutation,
  useAddSkillsMutation,
  useEditAchievementMutation,
  useEditExtraCurricularMutation,
  useEditJobInfoMutation,
  useEditSkillsMutation,
} from "../redux/Api/editProfileApiSlice.js";
import { useGetConnectionRequestsQuery } from "../redux/Api/connectUserApiSlice.js";

const Profile = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { data, isLoading, error, refetch } = useUserProfileQuery();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [userp, setUserp] = useState(null);
  const [photoloading, setphotoLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  const { data: connectionData, refetch: refetchStatus } =
    useGetConnectionRequestsQuery();

  // Single mouse position tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
    refetchStatus();
  }, [data, connectionData]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/getPhoto`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserp(res.data);
      } catch (error) {
        console.error("❌ Error fetching user:", error);
      } finally {
        setphotoLoading(false);
      }
    };

    fetchUser();
  }, []);

  const [openUpload, setOpenUpload] = useState(false);

  const editHandler = () => {
    setOpenUpload(true);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success("Logout Successfully ...", {
        className:
          "dark:!bg-gradient-to-r dark:!from-indigo-950/90 dark:!to-indigo-900/90 dark:!text-indigo-100",
      });

      setTimeout(() => {
        navigate("/");
        setUserData(null);
      }, 1000);
    } catch (error) {
      console.log(error?.data?.message || error?.message);
      setToast({ type: "error", message: "Unable to logout..." });
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

  // editing routes
  const [editJobInfo] = useEditJobInfoMutation();
  const [jobinfo] = useAddJobInfoMutation();
  const [skillInfo] = useAddSkillsMutation();
  const [editSkillInfo] = useEditSkillsMutation();
  const [extraInfo] = useAddExtraInfoMutation();
  const [achievementInfo] = useEditAchievementMutation();
  const [extracurricularInfo] = useEditExtraCurricularMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;

      if (activeModal === MODAL_TYPES.JOB) {
        if (formData.companyName && !userData.jobId) {
          res = await jobinfo(formData);
        } else {
          res = await editJobInfo(formData);
        }
      } else if (activeModal === MODAL_TYPES.SKILLS) {
        if (
          (formData.technicalSkill || formData.nonTechnicalSkill) &&
          !userData.skillId
        ) {
          res = await skillInfo(formData);
        } else {
          res = await editSkillInfo(formData);
        }
      } else if (
        activeModal === MODAL_TYPES.ACHIEVEMENT ||
        MODAL_TYPES.EXTRACURRICULAR
      ) {
        const extraData = {
          ...(activeModal === MODAL_TYPES.ACHIEVEMENT && {
            achievements: [
              {
                title: formData.title,
                description: formData.description,
                date: formData.date,
              },
            ],
          }),
          ...(activeModal === MODAL_TYPES.EXTRACURRICULAR && {
            extracurriculars: [
              {
                activity: formData.activity,
                description: formData.description,
                duration: formData.duration,
              },
            ],
          }),
        };
        if (!userData.extraId) {
          res = await extraInfo(extraData);
        } else {
          if (activeModal === MODAL_TYPES.EXTRACURRICULAR) {
            res = await extracurricularInfo(extraData);
          }
          if (activeModal === MODAL_TYPES.ACHIEVEMENT) {
            res = await achievementInfo(extraData);
          }
        }
      }

      if (res?.error) {
        throw new Error(res.error.message || "Failed to update");
      }

      toast.success("Updated successfully!", {
        className:
          "dark:!bg-gradient-to-r dark:!from-green-950/90 dark:!to-green-900/90 dark:!text-green-100",
      });

      const { data: freshData } = await refetch();
      setUserData(freshData);

      handleCloseModal();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message || "Update failed", {
        className:
          "dark:!bg-gradient-to-r dark:!from-red-950/90 dark:!to-red-900/90 dark:!text-red-100",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Guest view for when user is not logged in
  if (error) {
    toast(error || "Error in Loading Profile", {
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

  const renderModal = () => {
    if (!activeModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 pointer-events-none">
        <div className="group relative overflow-hidden rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto pointer-events-auto">
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />

          {/* Border */}
          <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

          <div className="relative p-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200/40 dark:border-gray-700/40">
              <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent">
                {activeModal === MODAL_TYPES.JOB && "Add/Edit Job"}
                {activeModal === MODAL_TYPES.SKILLS && "Edit Skills"}
                {activeModal === MODAL_TYPES.ACHIEVEMENT && "Add Achievement"}
                {activeModal === MODAL_TYPES.EXTRACURRICULAR &&
                  "Add Extracurricular"}
                {activeModal === MODAL_TYPES.ANALYTICS && "Update Analytics"}
              </h3>
              <motion.button
                onClick={handleCloseModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors p-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
              >
                <FaTimes className="h-5 w-5" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Modal form fields - same as previous implementation */}
              {/* Job Modal Fields */}
              {activeModal === MODAL_TYPES.JOB && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Name
                    </label>
                    <div className="relative group/input">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-gray-100/30 to-gray-200/40 dark:from-black/40 dark:via-gray-800/30 dark:to-gray-700/40 backdrop-blur-md rounded-xl" />
                      <div className="absolute inset-0 rounded-xl border border-gray-300/50 dark:border-gray-600/40 group-hover/input:border-indigo-300/50 dark:group-hover/input:border-gray-500/50 transition-colors duration-300" />

                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName || ""}
                        onChange={handleInputChange}
                        className="relative w-full px-4 py-3 bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-gray-500/40 rounded-xl transition-all duration-300"
                      />
                    </div>
                  </div>
                  {/* Other job fields... */}
                </>
              )}

              {/* Skills, Achievement, Extracurricular modal fields same as before... */}

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200/40 dark:border-gray-700/40">
                <motion.button
                  type="button"
                  onClick={handleCloseModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-sm font-medium rounded-xl backdrop-blur-sm bg-white/30 dark:bg-black/30 text-gray-700 dark:text-gray-300 border border-gray-300/50 dark:border-gray-600/40 hover:border-gray-400/50 dark:hover:border-gray-500/50 transition-all duration-300"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-600/90 hover:to-purple-600/90 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/30 dark:from-gray-950 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-300 dark:hover:text-gray-800 transition-all duration-300"
                >
                  Save Changes
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  if (loading || isLoading || !userData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white via-gray-100/80 to-gray-200/90 dark:from-black dark:via-gray-850/95 dark:to-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-gray-100/80 to-gray-200/90 dark:from-black dark:via-gray-850/95 dark:to-black py-8 px-4 sm:px-6 lg:px-8">
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
          x: [0, 25, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute top-60 left-40 w-72 h-72 bg-gradient-to-r from-gray-600/50 to-gray-800/10 dark:from-gray-400/50 dark:to-gray-200/10 rounded-full blur-3xl" />
        <div className="absolute top-80 right-60 w-96 h-96 bg-gradient-to-r from-gray-400/50 to-gray-800/20 dark:from-gray-600/50 dark:to-gray-200/20 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        animate={{
          y: [0, -100, 0],
          x: [0, -25, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-gray-400/20 to-gray-700/10 dark:from-gray-600/20 dark:to-gray-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-64 h-64 bg-gradient-to-r from-gray-400/10 to-gray-700/10 dark:from-gray-600/10 dark:to-gray-200/10 rounded-full blur-3xl" />
      </motion.div>

      {renderModal()}

      {/* UPDATED LAYOUT - Main Content */}
      <div className="max-w-7xl mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN - Main Profile Content (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header Card - Same as before */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden rounded-3xl"
            >
              {/* Profile header content same as previous implementation */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />
              <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />
              <div className="absolute top-6 right-8 w-2 h-2 bg-gradient-to-r from-sky-400 to-blue-500 dark:from-gray-200 dark:to-white rounded-full opacity-60 animate-pulse" />

              <div className="relative p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                  <div className="flex-shrink-0">
                    <ProfileAvatar userp={userp} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                      <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
                          {userData.fullName}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                          {userData.role || "Alumni"}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <Link to="/network">
                          {connectionData > 0 ? (
                            <MdNotificationAdd className="text-2xl text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors" />
                          ) : (
                            <IoIosNotifications className="text-2xl text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors" />
                          )}
                        </Link>
                      </div>
                    </div>

                    {/* Academic Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="group/info relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" />
                        <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40 group-hover/info:border-indigo-300/50 dark:group-hover/info:border-gray-500/50 transition-colors duration-300" />

                        <div className="relative p-4 flex flex-col items-center justify-center text-center">
                          <FaGraduationCap className="mx-auto text-indigo-500 dark:text-indigo-400 mb-2" />
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {userData.rollNumber}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Roll No.
                          </p>
                        </div>
                      </div>

                      <div className="group/info relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" />
                        <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40 group-hover/info:border-indigo-300/50 dark:group-hover/info:border-gray-500/50 transition-colors duration-300" />

                        <div className="relative p-4 text-center flex flex-col items-center justify-center">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {userData.branch}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Branch
                          </p>
                        </div>
                      </div>

                      <div className="group/info relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" />
                        <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40 group-hover/info:border-indigo-300/50 dark:group-hover/info:border-gray-500/50 transition-colors duration-300" />

                        <div className="relative p-4 flex flex-col items-center justify-center text-center">
                          <p className="text-sm font-medium  text-gray-700 dark:text-gray-300">
                            {userData.batch}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Batch
                          </p>
                        </div>
                      </div>

                      <div className="group/info relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" />
                        <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40 group-hover/info:border-indigo-300/50 dark:group-hover/info:border-gray-500/50 transition-colors duration-300" />

                        <div className="relative flex flex-col items-center justify-center p-4 text-center">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {userData.cgpa || "N/A"}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            CGPA
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-600/90 hover:to-purple-600/90 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/30 dark:from-gray-950 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-300 dark:hover:text-gray-800 transition-all duration-300 flex items-center gap-2"
                      >
                        <FaFileAlt />
                        Resume
                      </motion.button>

                      <motion.button
                        onClick={() => setOpenUpload(true)}
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-green-500/80 to-teal-500/80 hover:from-green-600/90 hover:to-teal-600/90 text-white shadow-lg shadow-green-500/20 border border-green-400/30 transition-all duration-300 flex items-center gap-2"
                      >
                        <FaEdit />
                        Edit Photo
                      </motion.button>

                      <motion.button
                        onClick={logoutHandler}
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-red-500/80 to-pink-500/80 hover:from-red-600/90 hover:to-pink-600/90 text-white shadow-lg shadow-red-500/20 border border-red-400/30 transition-all duration-300"
                      >
                        Logout
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Job History Card - Same as before */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />
              <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

              <div className="relative p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent flex items-center gap-2">
                    <FaBriefcase />
                    Job History
                  </h2>
                  <motion.button
                    onClick={() => handleOpenModal(MODAL_TYPES.JOB)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl backdrop-blur-sm bg-white/30 dark:bg-black/30 text-indigo-600 dark:text-indigo-400 border border-gray-300/40 dark:border-gray-600/40 hover:border-indigo-300/50 dark:hover:border-gray-500/50 transition-all duration-300 shadow-lg"
                  >
                    {userData.jobId ? (
                      <FaEdit className="w-5 h-5" />
                    ) : (
                      <FaPlus className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Job */}
                  <div className="group/job relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" />
                    <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40 group-hover/job:border-indigo-300/50 dark:group-hover/job:border-gray-500/50 transition-colors duration-300" />

                    <div className="relative p-6">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent mb-4">
                        Current Position
                      </h3>
                      <div className="space-y-2">
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          {userData.jobId?.position || "Not specified"}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          {userData.jobId?.companyName || "Not specified"}
                        </p>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <FaMapMarkerAlt className="mr-2" />
                          {userData.jobId?.location || "Not specified"}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <FaClock className="mr-2" />
                          {userData.jobId?.duration || "Not specified"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Previous Jobs */}
                  <div className="group/job relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" />
                    <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40 group-hover/job:border-indigo-300/50 dark:group-hover/job:border-gray-500/50 transition-colors duration-300" />

                    <div className="relative p-6">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent mb-4">
                        Previous Experience
                      </h3>
                      <div className="space-y-3">
                        {userData.jobId?.previousCompany?.length > 0 ? (
                          userData.jobId.previousCompany.map(
                            (prevjob, index) => (
                              <div
                                key={index}
                                className="border-l-2 border-indigo-200 dark:border-gray-600 pl-3"
                              >
                                <p className="font-medium text-gray-800 dark:text-gray-200">
                                  {prevjob.companyName}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {prevjob.position}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                  {prevjob.duration}
                                </p>
                              </div>
                            )
                          )
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                            No previous jobs listed
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Skills Card - Same as before */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group relative overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />
              <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

              <div className="relative p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent flex items-center gap-2">
                    <FaToolbox />
                    Skills
                  </h2>
                  <motion.button
                    onClick={() => handleOpenModal(MODAL_TYPES.SKILLS)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl backdrop-blur-sm bg-white/30 dark:bg-black/30 text-indigo-600 dark:text-indigo-400 border border-gray-300/40 dark:border-gray-600/40 hover:border-indigo-300/50 dark:hover:border-gray-500/50 transition-all duration-300 shadow-lg"
                  >
                    {userData.skillId ? (
                      <FaEdit className="w-5 h-5" />
                    ) : (
                      <FaPlus className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Technical Skills */}
                  <div className="group/skill relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" />
                    <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40 group-hover/skill:border-indigo-300/50 dark:group-hover/skill:border-gray-500/50 transition-colors duration-300" />

                    <div className="relative p-6">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                        <FaToolbox className="text-sm" />
                        Technical Skills
                      </h3>
                      <div className="space-y-2">
                        {technicalSkills.length > 0 ? (
                          technicalSkills.map((skill, index) => (
                            <div key={index} className="flex items-center">
                              <span className="text-indigo-500 dark:text-indigo-400 mr-3">
                                →
                              </span>
                              <span className="text-gray-700 dark:text-gray-300">
                                {skill.trim()}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                            No technical skills listed
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Non-Technical Skills */}
                  <div className="group/skill relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" />
                    <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40 group-hover/skill:border-indigo-300/50 dark:group-hover/skill:border-gray-500/50 transition-colors duration-300" />

                    <div className="relative p-6">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                        <FaChalkboardTeacher className="text-sm" />
                        Soft Skills
                      </h3>
                      <div className="space-y-2">
                        {nonTechnicalSkills.length > 0 ? (
                          nonTechnicalSkills.map((skill, index) => (
                            <div key={index} className="flex items-center">
                              <span className="text-indigo-500 dark:text-indigo-400 mr-3">
                                →
                              </span>
                              <span className="text-gray-700 dark:text-gray-300">
                                {skill.trim()}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                            No soft skills listed
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* MOVED: Achievements and Extracurricular Below Skills */}
            <div className="space-y-8">
              {/* Achievements Card - Moved Here */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="group relative overflow-hidden rounded-3xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />
                <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

                <div className="relative p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent flex items-center gap-2">
                      <FaTrophy />
                      Achievements
                    </h2>
                    <motion.button
                      onClick={() => handleOpenModal(MODAL_TYPES.ACHIEVEMENT)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-xl backdrop-blur-sm bg-white/30 dark:bg-black/30 text-indigo-600 dark:text-indigo-400 border border-gray-300/40 dark:border-gray-600/40 hover:border-indigo-300/50 dark:hover:border-gray-500/50 transition-all duration-300 shadow-lg"
                    >
                      <FaPlus className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData?.extraId?.achievements?.length > 0 ? (
                      userData.extraId.achievements.map(
                        (achievement, index) => (
                          <div
                            key={index}
                            className="group/achievement relative overflow-hidden rounded-2xl"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" />
                            <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40 group-hover/achievement:border-green-300/50 dark:group-hover/achievement:border-green-500/50 transition-colors duration-300" />

                            <div className="relative p-6 flex items-start gap-3">
                              <span className="text-green-500 dark:text-green-400 mt-1 text-xl">
                                🏆
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-green-600 dark:text-green-400 mb-2">
                                  {achievement.title}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {achievement.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <div className="col-span-full group/achievement relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" />
                        <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40" />

                        <div className="relative p-8 text-center">
                          <p className="text-gray-500 dark:text-gray-400">
                            No achievements listed
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Extracurricular Card - Moved Here */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="group relative overflow-hidden rounded-3xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />
                <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

                <div className="relative p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent flex items-center gap-2">
                      <FaClipboardList />
                      Extracurricular Activities
                    </h2>
                    <motion.button
                      onClick={() =>
                        handleOpenModal(MODAL_TYPES.EXTRACURRICULAR)
                      }
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-xl backdrop-blur-sm bg-white/30 dark:bg-black/30 text-indigo-600 dark:text-indigo-400 border border-gray-300/40 dark:border-gray-600/40 hover:border-indigo-300/50 dark:hover:border-gray-500/50 transition-all duration-300 shadow-lg"
                    >
                      <FaPlus className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData?.extraId?.extracurriculars?.length > 0 ? (
                      userData.extraId.extracurriculars.map(
                        (act, index) =>
                          act && (
                            <div
                              key={index}
                              className="group/extra relative overflow-hidden rounded-2xl"
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" />
                              <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40 group-hover/extra:border-blue-300/50 dark:group-hover/extra:border-blue-500/50 transition-colors duration-300" />

                              <div className="relative p-6 flex items-start gap-3">
                                <span className="text-blue-500 dark:text-blue-400 mt-1 text-xl">
                                  🎯
                                </span>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-blue-600 dark:text-blue-400 mb-2">
                                    {act.activity}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    {act.description}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-500">
                                    {act.duration}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                      )
                    ) : (
                      <div className="col-span-full group/extra relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-100/50 to-gray-200/60 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-600/60 backdrop-blur-md" />
                        <div className="absolute inset-0 rounded-2xl border border-gray-300/40 dark:border-gray-600/40" />

                        <div className="relative p-8 text-center">
                          <p className="text-gray-500 dark:text-gray-400">
                            No extracurricular activities listed
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT SIDEBAR - STICKY/FIXED (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="sticky h-full space-y-8">
              {/* Connections Card - Fixed in Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="group relative overflow-hidden rounded-3xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />
                <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

                <div className="relative p-8 text-center">
                  <FaUserCircle className="mx-auto text-5xl text-indigo-500 dark:text-indigo-400 mb-4" />
                  <Link to="/connectedUser">
                    <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent mb-2">
                      {userData.connections.length}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      Connections
                    </p>
                  </Link>
                </div>
              </motion.div>

              {/* Analytics Card - Fixed in Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative overflow-hidden rounded-3xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />
                <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40 group-hover:border-indigo-300/50 dark:group-hover:border-gray-600/50 transition-colors duration-300" />

                <div className="relative p-8">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent mb-6 flex items-center gap-2">
                    <FaChartLine />
                    Analytics
                  </h2>

                  <div className="space-y-6">
                    <div className="group/stat relative overflow-hidden rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-100/60 to-emerald-100/60 dark:from-green-900/20 dark:to-emerald-900/20 backdrop-blur-sm" />
                      <div className="absolute inset-0 rounded-2xl border border-green-200/40 dark:border-green-800/40" />

                      <div className="relative p-6 text-center">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                          {formattedDonation}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          Donations
                        </p>
                      </div>
                    </div>

                    <div className="group/stat relative overflow-hidden rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/60 to-cyan-100/60 dark:from-blue-900/20 dark:to-cyan-900/20 backdrop-blur-sm" />
                      <div className="absolute inset-0 rounded-2xl border border-blue-200/40 dark:border-blue-800/40" />

                      <div className="relative p-6 text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                          {userData?.analyticsId?.QueryAnswered || 0}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          Queries Answered
                        </p>
                      </div>
                    </div>

                    <div className="group/stat relative overflow-hidden rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/60 to-pink-100/60 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm" />
                      <div className="absolute inset-0 rounded-2xl border border-purple-200/40 dark:border-purple-800/40" />

                      <div className="relative p-6 text-center">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                          {userData?.analyticsId?.jobPosted || 0}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          Jobs Posted
                        </p>
                      </div>
                    </div>

                    <div className="group/stat relative overflow-hidden rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/60 to-amber-100/60 dark:from-orange-900/20 dark:to-amber-900/20 backdrop-blur-sm" />
                      <div className="absolute inset-0 rounded-2xl border border-orange-200/40 dark:border-orange-800/40" />

                      <div className="relative p-6 text-center">
                        <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                          {userData?.analyticsId?.EventOrganised || 0}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          Events Organized
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal - Same as before */}
      <AnimatePresence>
        {openUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="group relative overflow-hidden rounded-3xl max-w-md w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg" />
              <div className="absolute inset-0 rounded-3xl border border-gray-300/60 dark:border-gray-700/40" />

              <div className="relative p-6">
                <button
                  onClick={() => setOpenUpload(false)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 text-xl transition-colors p-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                >
                  ✕
                </button>

                <UploadProfileImage onSuccess={() => setOpenUpload(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

export default Profile;
