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
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "./redux/Api/userApiSlice";
import { useNavigate, useParams } from "react-router";
import ConnectionButton from "./components/ConnectionComponents/ConnectionButton";

const Profiles = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate= useNavigate();
  const { rollNumber } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data, isLoading } = useGetProfileQuery(rollNumber);



  useEffect(() => {
    if (data) {
      setUserData(data[0]);
      console.log(data[0]);
    }
    setLoading(false);
  }, [data]);

  if(!user){
    navigate("/login")
  }

 

  if (isLoading || loading || !userData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* {renderModal()} */}

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Profile Card */}
        <div className="rounded-xl shadow-md overflow-hidden border border-blue-100/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
          <div className="p-6">
            <div className="flex justify-between mb-2">
              <h2 className="text-xl font-bold flex items-center text-indigo-600 dark:text-indigo-400">
                <FaUserCircle className="mr-2" />
                Profile
              </h2>
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
                    <ConnectionButton userId={userData?._id} connectionsCount={userData.connections.length}/>
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
    </div>
  );
};

export default Profiles;