import React, { useState } from "react";
import {
  FaQuestion,
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaTag,
  FaFilter,
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
  FaReply,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import QueryCard from "./QueryCard";

const Query = ({ isDarkTheme }) => {
  // Sample data - expanded with multiple questions
  const [allQueries, setAllQueries] = useState([
    {
      _id: "67ce9d0094b23c2bc3494bc6",
      askedBy: {
        _id: "67cc7970e26c9c11719e63d7",
        rollNumber: "2023071048",
        fullName: "Nitesh",
      },
      title: "First Question",
      content:
        "This is first question for testing. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
      answers: ["67cf1e0bee91b2e32b508bd3", "67cf1e3aee91b2e32b508bd9"],
      category: "Career",
      status: "Open",
      createdAt: "2025-03-10T08:04:16.734Z",
      __v: 14,
      downvotes: [],
      upvotes: ["67cc7970e26c9c11719e63d7"],
    },
    {
      _id: "67ce9d0094b23c2bc3494bc7",
      askedBy: {
        _id: "67cc7970e26c9c11719e63d8",
        rollNumber: "2023071049",
        fullName: "Rahul",
      },
      title: "How to prepare for campus placements?",
      content:
        "I'm a final year student looking for tips on how to prepare for upcoming campus placements. Any advice on resume building and interview preparation would be helpful.",
      answers: ["67cf1e0bee91b2e32b508bd4"],
      category: "Career",
      status: "Open",
      createdAt: "2025-03-09T10:14:16.734Z",
      __v: 5,
      downvotes: [],
      upvotes: ["67cc7970e26c9c11719e63d7", "67cc7970e26c9c11719e63d8"],
    },
    {
      _id: "67ce9d0094b23c2bc3494bc8",
      askedBy: {
        _id: "67cc7970e26c9c11719e63d9",
        rollNumber: "2023071050",
        fullName: "Priya",
      },
      title: "Best resources for learning web development",
      content:
        "I want to learn web development from scratch. What are some good resources, courses, or books that you would recommend for beginners?",
      answers: [],
      category: "Technical",
      status: "Open",
      createdAt: "2025-03-08T15:30:16.734Z",
      __v: 2,
      downvotes: [],
      upvotes: [],
    },
    {
      _id: "67ce9d0094b23c2bc3494bc9",
      askedBy: {
        _id: "67cc7970e26c9c11719e63d7",
        rollNumber: "2023071048",
        fullName: "Nitesh",
      },
      title: "Campus facilities during weekends",
      content:
        "Are the library and computer labs accessible during weekends? What are the timings?",
      answers: ["67cf1e0bee91b2e32b508bd5", "67cf1e0bee91b2e32b508bd6"],
      category: "Campus",
      status: "Closed",
      createdAt: "2025-03-05T09:20:16.734Z",
      __v: 8,
      downvotes: ["67cc7970e26c9c11719e63d9"],
      upvotes: ["67cc7970e26c9c11719e63d8"],
    },
  ]);

  const [searchTerm, setSearchTerm]= useState("");
  const [selectedCategory, setSelectedCategory]= useState("All");
  const [selectedStatus, setSelectedStatus]= useState("All");
  const [sortBy, setSortBy]= useState("newest");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  

    // // Available categories and statuses
    const categories = ["All", "Career", "Technical", "Academic", "Campus", "Other",];
    const statuses = ["All", "Open", "Resolved", "In Progress"];


    const filteredQueries= allQueries.filter((q)=>{

        const matchesSearch= searchTerm === "" 
            || q.title.toLowerCase().includes(searchTerm.toLowerCase()) 
            || q.content.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory= selectedCategory=== "All" 
            || selectedCategory=== q.category;

        const matchesStatus= selectedStatus ==="All" ||
            selectedStatus=== q.status;

        return matchesCategory && matchesSearch && matchesStatus;
    }).sort((a, b)=>{
        if(sortBy==="newest"){
            return new Date(b.createdAt) - new Date(b.createdAt);
        } else if(sortBy==="oldest"){
            return new Date(a.createdAt) - new Date(b.createdAt);
        } else{
            return (b.upvotes.length -b.downvotes.length) - (a.upvotes.length -a.downvotes.length);
        }
    })
    

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Query Portal
          </h1>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-300">
            <FaQuestion size={14} />
            <span>Ask a Question</span>
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <div className="md:hidden">
              <button
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className="w-full flex items-center justify-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-lg"
              >
                <FaFilter />
                <span>{isFilterVisible ? "Hide Filters" : "Show Filters"}</span>
              </button>
            </div>
            
             {/*filter for desktop  */}
            <div className="hidden md:flex gap-4">
                {/* category filter */}
                <select value={selectedCategory} name="Category"
                onChange={(e)=>(setSelectedCategory(e.target.value))}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors" >
                    {categories.map((category)=>(
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                {/* status filter */}
                <select value={selectedStatus} name="Status"
                onChange={(e)=>(setSelectedStatus(e.target.value))}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors" >
                    {statuses.map((status)=>(
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>

                {/* sortBy newest oldest */}
                <select value={sortBy} name="SortBy"
                onChange={(e)=> (setSortBy(e.target.value))} 
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors">
                    <option key="newest" value="newest">Newest</option>
                    <option key="oldest" value="oldest">Oldest</option>
                    <option key="popular" value="popular">Popular</option>
                </select>
            </div>
            
        
            {/* Filter Options (Mobile) */}
            {isFilterVisible && (
            <div className="md:hidden mt-4 grid grid-cols-1 gap-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              {/* Sort Options */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
            )}
                
                
            </div>
        </div>

        {/* Query Cards */}
        {filteredQueries.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-md">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
                <FaQuestion className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No Queries Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedStatus("All");
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQueries.map((q) => (
              <QueryCard q= {q}/>
            ))}
          </div>
        )}

        {/* Pagination (if needed) */}
        {/* {filteredQueries.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                Previous
              </button>
              <button className="px-3 py-1 rounded-md bg-indigo-600 text-white">
                1
              </button>
              <button className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                2
              </button>
              <button className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                3
              </button>
              <button className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                Next
              </button>
            </nav>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Query;
