import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FaQuestion,
  FaFilter,
  FaSearch,

} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import QueryCard from "./QueryCard";
import { useShowAllQueryQuery } from "../redux/Api/queryApiSlice";

const Query = () => {

  const {data: queryData, isLoading, error}= useShowAllQueryQuery()
  
  const [allQueries, setAllQueries] = useState([]);
  const [searchTerm, setSearchTerm]= useState("");
  const [selectedCategory, setSelectedCategory]= useState("All");
  const [selectedStatus, setSelectedStatus]= useState("All");
  const [sortBy, setSortBy]= useState("newest");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  

    // // Available categories and statuses
    const categories = ["All", "Career", "Technical", "Academic", "General",];
    const statuses = ["All", "Open", "Resolved", "In Progress"];

    useEffect(() => {

      if(queryData){
        let filteredQueries= queryData.filter((q)=>{

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
              return new Date(b.createdAt) - new Date(a.createdAt);
          } else if(sortBy==="oldest"){
              return new Date(a.createdAt) - new Date(b.createdAt);
          } else{
              return (b.upvotes.length -b.downvotes.length) - (a.upvotes.length -a.downvotes.length);
          }
      })

      setAllQueries(filteredQueries);
      }

    }, [queryData, searchTerm, selectedCategory, selectedStatus, sortBy, setSelectedCategory, setSelectedStatus]);

    if (isLoading)
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 rounded-full border-4 border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent animate-spin"></div>
            <p className="mt-4 text-lg font-medium text-indigo-700 dark:text-indigo-400">
              Loading Queries...
            </p>
          </div>
        </div>
      );
  
    if (error)
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              Error Loading Query
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Failed to load Query. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      );
    
    

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Query Portal
          </h1>

          

            <Link to="/query/askQuestion" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-300">
              <FaQuestion size={14} />
              <span>Ask a Question</span>
            </Link>

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

                {(selectedCategory==="All" && selectedStatus==="All" && sortBy==="newest")? (""): (
                  <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setSelectedStatus("All");
                    setSortBy("newest");
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                >
                  Clear Filters
                </button>
                )}
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
        {allQueries.length === 0 ? (
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
            {allQueries.map((q) => (
              <QueryCard q= {q} setSelectedCategory={setSelectedCategory} setSelectedStatus={setSelectedStatus} />
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
