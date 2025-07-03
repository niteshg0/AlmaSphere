import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetCollege_dataQuery } from "../redux/Api/adminApiSlice";

function Student() {
  const {
    data: college_data,
    error,
    isLoading: isApiLoading,
  } = useGetCollege_dataQuery();
  const{refetch}= useGetCollege_dataQuery();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "fullName",
    direction: "ascending",
  });

  // Set students data when college_data is available
  useEffect(() => {
    const ap= async()=>{
      await refetch();
    }
    ap();
    if (college_data) {
      // Ensure college_data is an array before setting
      const studentsArray = Array.isArray(college_data)
        ? college_data
        : college_data?.students || college_data?.data || [];

      console.log("College data structure:", college_data);
      setStudents(studentsArray);
      setFilteredStudents(studentsArray);
      setIsLoading(false);
    }
  }, [college_data]);

  // Handle search functionality
  useEffect(() => {
    if (!students.length) return;

    const results = students.filter((student) => {
      return (
        student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(student.rollNumber)?.includes(searchTerm) ||
        student.branch?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredStudents(results);
  }, [searchTerm, students]);

  // Handle sorting functionality
  const requestSort = (key) => {
    let direction = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });

    // Make sure we're working with an array
    if (!Array.isArray(filteredStudents)) {
      console.error("filteredStudents is not an array:", filteredStudents);
      return;
    }

    const sortedData = [...filteredStudents].sort((a, b) => {
      // Handle null or undefined values
      const valueA = a[key] !== undefined && a[key] !== null ? a[key] : "";
      const valueB = b[key] !== undefined && b[key] !== null ? b[key] : "";

      if (valueA < valueB) {
        return direction === "ascending" ? -1 : 1;
      }
      if (valueA > valueB) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setFilteredStudents(sortedData);
  };

  // Error handling
  if (error) {
    toast.error(error?.data?.message || "Error loading student data", {
      className:
        "dark:!bg-gradient-to-r dark:!from-red-950/90 dark:!to-red-900/90 dark:!text-red-100 dark:!border-red-800 dark:!shadow-[0px_4px_10px_rgba(239,68,68,0.3)]",
    });
    return (
      <div className="p-6 flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
            Failed to load student data
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Please try again later
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // For debugging
  if (college_data && !isLoading && !isApiLoading) {
    console.log("College data type:", typeof college_data);
    console.log("Filtered students type:", typeof filteredStudents);
    console.log(
      "Is filteredStudents an array:",
      Array.isArray(filteredStudents)
    );
  }

  // Safely ensure filteredStudents is an array
  const safeFilteredStudents = Array.isArray(filteredStudents)
    ? filteredStudents
    : [];

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
            Student Management
          </h1>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search students..."
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <Link
              to="/admin/add-edit-Student"
              className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-center transition-colors duration-300"
            >
              Add New Student
            </Link>
          </div>
        </div>

        {isLoading || isApiLoading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">
              Loading student data...
            </p>
          </div>
        ) : safeFilteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-200">
              No students found
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => requestSort("fullName")}
                  >
                    <div className="flex items-center">
                      Name
                      {sortConfig.key === "fullName" && (
                        <span className="ml-1">
                          {sortConfig.direction === "ascending" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => requestSort("rollNumber")}
                  >
                    <div className="flex items-center">
                      Roll Number
                      {sortConfig.key === "rollNumber" && (
                        <span className="ml-1">
                          {sortConfig.direction === "ascending" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => requestSort("email")}
                  >
                    <div className="flex items-center">
                      Email
                      {sortConfig.key === "email" && (
                        <span className="ml-1">
                          {sortConfig.direction === "ascending" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => requestSort("branch")}
                  >
                    <div className="flex items-center">
                      Branch
                      {sortConfig.key === "branch" && (
                        <span className="ml-1">
                          {sortConfig.direction === "ascending" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => requestSort("cgpa")}
                  >
                    <div className="flex items-center">
                      CGPA
                      {sortConfig.key === "cgpa" && (
                        <span className="ml-1">
                          {sortConfig.direction === "ascending" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => requestSort("batch")}
                  >
                    <div className="flex items-center">
                      Batch
                      {sortConfig.key === "batch" && (
                        <span className="ml-1">
                          {sortConfig.direction === "ascending" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {safeFilteredStudents.map((student, index) => (
                  <tr
                    key={student._id || student.id || index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {student.fullName || "N/A"}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {student.gender || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {student.rollNumber
                          ? typeof student.rollNumber === "object" &&
                            student.rollNumber.$numberLong
                            ? student.rollNumber.$numberLong
                            : student.rollNumber
                          : "N/A"}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {student.course || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {student.email || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {student.branch || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.cgpa ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                          {typeof student.cgpa === "number"
                            ? student.cgpa.toFixed(1)
                            : student.cgpa}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          N/A
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {student.batch || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Student;
