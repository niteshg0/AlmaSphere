import React, { useState } from "react";
import { Link, Links } from "react-router-dom";
import {
  FaHome,
  FaHandHoldingHeart,
  FaCalendarAlt,
  FaUsers,
  FaEye,
  FaGraduationCap,
  FaBuilding,
  FaBookOpen,
  FaTrophy,
  FaHeart,
  FaShare,
} from "react-icons/fa";
import { FiArrowRight, FiTrendingUp } from "react-icons/fi";

const Campaign = () => {
  // Impact statistics
  const impactStats = [
    {
      icon: <FaGraduationCap className="text-2xl text-blue-600" />,
      number: "156+",
      label: "Scholarships Awarded",
      description: "Students supported with financial aid",
    },
    {
      icon: <FaBuilding className="text-2xl text-green-600" />,
      number: "8",
      label: "Projects Completed",
      description: "Infrastructure improvements made",
    },
    {
      icon: <FaBookOpen className="text-2xl text-purple-600" />,
      number: "25K+",
      label: "Books Added",
      description: "Library resources expanded",
    },
    {
      icon: <FaTrophy className="text-2xl text-orange-600" />,
      number: "₹2.8Cr",
      label: "Total Funds Raised",
      description: "Community contributions received",
    },
  ];

  // Dummy campaign data
  const campaigns = [
    {
      id: 2,
      title: "Merit Scholarship Fund",
      shortDescription:
        "Support talented students from underprivileged backgrounds achieve their academic dreams.",
      targetAmount: 1800000,
      collectedAmount: 950000,
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Scholarship",
      endDate: "2025-08-30",
      donorCount: 89,
      urgency: "medium",
    },
    {
      id: 3,
      title: "Library Expansion Project",
      shortDescription:
        "Expand library with new study spaces, digital resources, and modern learning facilities.",
      targetAmount: 3500000,
      collectedAmount: 2200000,
      image:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Infrastructure",
      endDate: "2026-03-20",
      donorCount: 203,
      urgency: "low",
    },
    {
      id: 4,
      title: "Sports Complex Renovation",
      shortDescription:
        "Modernize sports facilities for better student experience and competitive excellence.",
      targetAmount: 4200000,
      collectedAmount: 1680000,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Sports",
      endDate: "2025-11-30",
      donorCount: 134,
      urgency: "medium",
    },
    {
      id: 5,
      title: "Research Innovation Hub",
      shortDescription:
        "Create dedicated space for student research projects and innovation initiatives.",
      targetAmount: 2800000,
      collectedAmount: 1120000,
      image:
        "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Research",
      endDate: "2025-10-15",
      donorCount: 67,
      urgency: "high",
    },
    {
      id: 6,
      title: "Student Wellness Center",
      shortDescription:
        "Build a comprehensive wellness center for student mental health and wellbeing support.",
      targetAmount: 3200000,
      collectedAmount: 1450000,
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Infrastructure",
      endDate: "2025-09-20",
      donorCount: 98,
      urgency: "medium",
    },
    {
      id: 1,
      title: "New Computer Science Lab",
      shortDescription:
        "State-of-the-art computer lab with cutting-edge technology to prepare students for future careers.",
      targetAmount: 2500000,
      collectedAmount: 1850000,
      image:
        "https://images.unsplash.com/photo-1581092921461-eab10380ed77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Infrastructure",
      endDate: "2025-12-15",
      donorCount: 156,
      urgency: "high",
    },
  ];

  const [activeFilter, setActiveFilter] = useState("All");
  const filters = [
    "All",
    "Infrastructure",
    "Scholarship",
    "Research",
    "Sports",
  ];

  const filteredCampaigns =
    activeFilter === "All"
      ? campaigns
      : campaigns.filter((campaign) => campaign.category === activeFilter);

  const getDaysLeft = (endDate) => {
    const days = Math.ceil(
      (new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24)
    );
    return days > 0 ? days : 0;
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Navigation */}
        <div className="flex flex-wrap gap-4 mb-4">
          {/* Navigation items commented out as in original */}
        </div>

        {/* Hero Section with Overlapping Impact Banner */}
        <div className="relative">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white blur-3xl" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white blur-3xl" />
            </div>

            <div className="relative z-10 p-6  md:p-5 text-white pb- md:pb-24">
              <div className="max-w-3xl pl-5">
                <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold mb-2">
                  College Campaign Initiatives
                </h1>
                <p className="text-lg md:text opacity-90">
                  Support our ongoing campaigns to help build a better future
                  for our college and its students. Every contribution makes a
                  difference.
                </p>
              </div>
            </div>
          </div>

          {/* Impact Banner - Mobile Version */}
          <div className="block md:hidden mt-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-white/20 rounded-full mr-3">
                      <FiTrendingUp className="text-white text-lg" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base">
                        Our Impact So Far
                      </h3>
                      <p className="text-emerald-100 text-xs">
                        Making a difference through your generosity
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {impactStats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-1.5 bg-white dark:bg-gray-600 rounded-lg">
                          <div className="text-lg">{stat.icon}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {stat.number}
                          </div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                        {stat.label}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        {stat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Impact Banner - Desktop Version */}
          <div className="hidden md:block translate-x-[15%] -translate-y-[26%] w-[75%] max-w-6xl px-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {impactStats.map((stat, index) => (
                    <div
                      key={index}
                      className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-2 hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <div className="p-2 bg-white dark:bg-gray-600 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                          {stat.icon}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {stat.number}
                          </div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {stat.label}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {stat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex justify-center overflow-x-auto  -translate-y-2 py-3 ">
          <div className="inline-flex p-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 md:px-6 py-2.5 rounded-lg font-medium transition-all duration-300 whitespace-nowrap text-sm ${
                  activeFilter === filter
                    ? "bg-indigo-600 text-white shadow-lg transform scale-105"
                    : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Campaigns List - Compact Cards */}
        <div className="space-y-4 py-4 md:px-24">
          {filteredCampaigns.map((campaign) => {
            const progressPercentage =
              (campaign.collectedAmount / campaign.targetAmount) * 100;
            const daysLeft = getDaysLeft(campaign.endDate);

            return (
              <Link to="/donation/details">
                <div
                key={campaign.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 transform hover:-translate-y-1 mb-4"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image Section - Smaller */}
                  <div className="relative md:w-96 h-48 md:h-64 overflow-hidden">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                    {/* Category and Urgency Badge */}
                    <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white/90 backdrop-blur-sm text-indigo-800">
                        {campaign.category}
                      </span>
                      {daysLeft <= 30 && (
                        <span
                          className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getUrgencyColor(
                            campaign.urgency
                          )}`}
                        >
                          {daysLeft} days left
                        </span>
                      )}
                    </div>

                    {/* Action Icons */}
                    {/* <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="p-1.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-300">
                        <FaHeart className="text-red-500 text-sm" />
                      </button>
                      <button className="p-1.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-300">
                        <FaShare className="text-gray-600 text-sm" />
                      </button>
                    </div> */}
                  </div>

                  {/* Content Section - Reduced Padding */}
                  <div className="flex-1 p-4 md:p-3 flex flex-col justify-between">
                    {/* Header */}
                    <div className="">
                      <h3 className="text-xl md:text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                        {campaign.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
                        {campaign.shortDescription}
                      </p>
                    </div>

                    {/* Progress Section */}
                    <div className="">
                      <div className="flex justify-between items-center mb-1">
                        <div>
                          <span className="text-2xl md:text-xl font-medium text-gray-900 dark:text-white">
                            ₹{(campaign.collectedAmount / 100000).toFixed(1)}L
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                            raised
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                            {progressPercentage.toFixed(0)}%
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            funded
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative mb-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                            style={{ width: `${progressPercentage}%` }}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-pulse" />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>
                          Goal: ₹{(campaign.targetAmount / 100000).toFixed(1)}L
                        </span>
                        <span>
                          ₹
                          {(
                            (campaign.targetAmount - campaign.collectedAmount) /
                            100000
                          ).toFixed(1)}
                          L to go
                        </span>
                      </div>
                    </div>

                    {/* Stats and Actions Row */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      {/* Stats Row */}
                      <div className="flex items-center gap-4 py-2 px-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <FaUsers className="mr-1.5 text-indigo-500 text-sm" />
                          <span className="font-medium text-sm">
                            {campaign.donorCount}
                          </span>
                          <span className="text-xs ml-1">donors</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <FaCalendarAlt className="mr-1.5 text-indigo-500 text-sm" />
                          <span className="font-medium text-sm">
                            {daysLeft}
                          </span>
                          <span className="text-xs ml-1">days left</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {/* <div className="flex gap-2">
                        <Link
                          to={`/campaigns/${campaign.id}`}
                          className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-all duration-300 text-sm group/btn"
                        >
                          <FaEye className="mr-1.5 group-hover/btn:scale-110 transition-transform duration-300" />
                          <span>Details</span>
                        </Link>
                        <Link
                          to={`/donation?campaign=${campaign.id}`}
                          className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-300 text-sm shadow-md hover:shadow-lg transform hover:scale-105 group/btn"
                        >
                          <FaHandHoldingHeart className="mr-1.5 group-hover/btn:scale-110 transition-transform duration-300" />
                          <span>Donate</span>
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            );
          })}
        </div>

        {/* Call to Action Section - Reduced Padding */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 md:p-8 text-center text-white shadow-xl">
          <h3 className="text-xl md:text-2xl font-bold mb-3">
            Ready to Make an Impact?
          </h3>
          <p className="text-base md:text-lg opacity-90 mb-6 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of alumni and supporters in creating positive change.
            Every contribution helps build a brighter future.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/donation"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-700 hover:bg-indigo-50 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Donating
              <FaHandHoldingHeart className="ml-2" />
            </Link>
            <Link
              to="/campaigns"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-indigo-700 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Learn More
              <FaEye className="ml-2" />
            </Link>
          </div>
        </div>


        
      </div>
    </div>
  );
};

export default Campaign;
