import React from 'react'
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

// Demo data
const memories = [
  {
    id: 1,
    title: "College Fest 2022",
    cover: "https://d23qowwaqkh3fj.cloudfront.net/wp-content/uploads/2024/04/3-1-1024x768.jpeg",
    date: "March 2022",
  },
  {
    id: 2,
    title: "Alumni Meet 2023",
    cover: "https://nbs.nust.edu.pk/wp-content/uploads/2021/06/0GR_3320-scaled.jpg",
    date: "January 2023",
  },
  // ...more memories
];

const MemoryLane = () => (
  <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 transition-colors duration-500">
    {/* Header */}
    <div className="flex items-center justify-between max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Memory Lane</h1>

    </div>

    {/* Memories Grid */}
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 pb-16">
      {memories.map((memory) => (
        <Link
          to={`/memory/${memory.id}`}
          key={memory.id}
          className="group relative rounded-2xl overflow-hidden shadow-lg bg-white/80 dark:bg-gray-800/80 hover:shadow-2xl transition-all duration-300"
        >
          <img
            src={memory.cover}
            alt={memory.title}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <h2 className="text-2xl font-bold text-white">{memory.title}</h2>
            <p className="text-sm text-gray-200">{memory.date}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default MemoryLane