import React from 'react'
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

// Demo data
const memories = [
  {
    id: 1,
    title: "College Fest 2022",
    cover: "https://blogs.iiit.ac.in/wp-content/uploads/2022/06/AlumniMeet.png",
    date: "March 2022",
     year: 2022,
  month: 3,
    venue: "Madan Mohan University of Technology",
    Discription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam autem dolorem libero necessitatibus obcaecati ipsam"
  },
  {
    id: 2,
    title: "Alumni Meet 2023",
    cover: "https://nbs.nust.edu.pk/wp-content/uploads/2021/06/0GR_3320-scaled.jpg",
    date: "January 2023",
     year: 2023,
  month: 1,
    venue: "Madan Mohan University of Technology",
    Discription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam autem dolorem libero necessitatibus obcaecati ipsam"      
  },
    {
    id: 3,
    title: "Alumni Meet 2024",
    cover: "https://www.dbuu.ac.in/placement/images/alumni/banner-4.webp",
    date: "January 2024",
     year: 2024,
  month: 1,
    venue: "Madan Mohan University of Technology",
    Discription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam autem dolorem libero necessitatibus obcaecati ipsam"
  },
    {
    id: 4,
    
    title: "Alumni Meet 2025",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQifHcqJEbhKvh06Lgp0nhSgk4x_g-y1_c9Jg&s",
    date: "September 2025",
     year: 2025,
  month: 9,
    venue: "Madan Mohan University of Technology",
    Discription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam autem dolorem libero necessitatibus obcaecati ipsam"
  },
  // ...more memories
];

const MemoryLane = () => (
  <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 transition-colors duration-500">
    {/* Header */}
    <div className="flex items-center justify-between max-w-6xl mx-auto py-6 px-4 sm:py-10 sm:px-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
        AlmaVault
      </h1>
    </div>

    {/* Memories List */}
   <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 px-4 sm:px-6 pb-16">
  {[...memories]
    .sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year; // latest year first
      }
      return b.month - a.month; // if same year, compare month
    })
    .map((memory) => (
      <Link
        to={memory.coming_soon === 1 ? "#" : `/memory/${memory.id}`}
        key={memory.id}
        className={`group relative flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-lg bg-white/80 dark:bg-gray-800/80 hover:shadow-2xl transition-all duration-300 h-auto md:h-64 ${
          memory.coming_soon === 1 ? "pointer-events-none opacity-90" : ""
        }`}
      >
       

        {/* Left side: Image */}
        <div className="w-full md:w-1/3 h-48 md:h-64 overflow-hidden">
          <img
            src={memory.cover}
            alt={memory.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right side: Details */}
        <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center h-auto md:h-64">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6 line-clamp-1">
            {memory.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1 line-clamp-1">
            <span className="font-semibold">Date:</span> {memory.month}/{memory.year}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1 line-clamp-1">
            <span className="font-semibold">Venue:</span> {memory.venue}
          </p>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2 sm:mt-3 line-clamp-3">
            {memory.Discription}
          </p>
        </div>
      </Link>
    ))}
</div>


  </div>
);



export default MemoryLane