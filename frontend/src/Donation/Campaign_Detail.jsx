import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaHandHoldingHeart,
  FaCheck,
  FaStar,
  FaCalendarAlt,
  FaArrowLeft,
  FaShare,
  FaHeart,
  FaUsers,
  FaFlag,
  FaClock,
  FaEdit,
  FaPaperPlane,
  FaTrophy,
  FaBullseye,
  FaGift,
} from "react-icons/fa";

const CampaignDetail = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
    donationAmount: "",
  });

  // Mock campaign data - in real app, fetch by campaignId
  const campaign = {
    id: 1,
    title: "New Computer Science Lab",
    description:
      "Help us build a state-of-the-art computer lab with cutting-edge technology to prepare our students for future careers in tech. This comprehensive project will transform how our students learn and interact with technology, providing them with industry-standard equipment and software.",
    longDescription: `
      Our Computer Science department has been at the forefront of education for over two decades. However, the rapid advancement in technology demands that we upgrade our facilities to match industry standards. This campaign aims to create a world-class computer lab that will serve hundreds of students each semester.

      The new lab will feature:
      • 50 high-performance workstations with latest processors and graphics cards
      • Industry-standard software licenses for development and design
      • Advanced networking equipment for cybersecurity and networking courses
      • Virtual reality setup for immersive learning experiences
      • 3D printing station for prototype development

      Your contribution will directly impact the learning experience of current and future students, preparing them for successful careers in technology.
    `,
    targetAmount: 2500000,
    collectedAmount: 1850000,
    image:
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Infrastructure",
    endDate: "2025-12-15",
    startDate: "2024-08-01",
    organizer: "Computer Science Department",
    location: "Main Campus, Building A",
    donorCount: 156,
    milestones: [
      {
        title: "Planning Phase",
        amount: 250000,
        completed: true,
        date: "2024-08-15",
        description: "Initial planning and design phase for the new computer lab.",
        completedDate: "2024-08-10",
      },
      {
        title: "Equipment Purchase",
        amount: 1500000,
        completed: true,
        date: "2024-10-30",
        description: "Purchase of computers, software licenses, and networking equipment.",
        completedDate: "2024-10-25",
      },
      {
        title: "Construction & Setup",
        amount: 750000,
        completed: false,
        date: "2025-01-15",
        description: "Lab construction, equipment installation, and final setup.",
        completedDate: null,
      },
    ],
    updates: [
      {
        date: "2024-11-15",
        title: "Equipment Delivered",
        content:
          "All computer equipment has been delivered and is being prepared for installation.",
      },
      {
        date: "2024-10-28",
        title: "Milestone Reached",
        content:
          "We've successfully reached our equipment purchase milestone! Thank you to all donors.",
      },
      {
        date: "2024-09-15",
        title: "Planning Complete",
        content:
          "Lab design and planning phase has been completed. Construction will begin soon.",
      },
    ],
    reviews: [
      {
        name: "Ajay Sharma",
        role: "Alumni, 2015",
        text: "Proud to contribute to this initiative. Our college needs modern computing facilities to stay competitive.",
        rating: 5,
        amount: 5000,
        date: "2024-11-10",
      },
      {
        name: "Priya Mehta",
        role: "Alumni, 2018",
        text: "This lab will help students stay competitive in the job market. Great initiative!",
        rating: 5,
        amount: 2500,
        date: "2024-11-05",
      },
      {
        name: "Dr. Rajesh Kumar",
        role: "Faculty, CS Department",
        text: "As a faculty member, I'm excited about the possibilities this new lab will bring to our curriculum.",
        rating: 5,
        amount: 10000,
        date: "2024-10-30",
      },
    ],
    faqs: [
      {
        question: "When will the lab be operational?",
        answer:
          "The lab is expected to be fully operational by February 2025, pending successful completion of all milestones.",
      },
      {
        question: "How will donations be used?",
        answer:
          "All donations go directly towards equipment purchase, installation, and setup costs. We provide regular updates on fund utilization.",
      },
      {
        question: "Can I visit the lab once it's complete?",
        answer:
          "Yes! All donors will be invited to the lab inauguration ceremony, and guided tours will be available.",
      },
    ],
  };

  const progressPercentage =
    (campaign.collectedAmount / campaign.targetAmount) * 100;
  const remainingAmount = campaign.targetAmount - campaign.collectedAmount;
  const daysLeft = Math.ceil(
    (new Date(campaign.endDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  // Quick donation amounts
  const quickAmounts = [1000, 2500, 5000, 10000, 25000];

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Handle review submission
    console.log("Review submitted:", reviewForm);
    setShowWriteReview(false);
    setReviewForm({
      name: "",
      email: "",
      rating: 5,
      comment: "",
      donationAmount: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-lg transition-colors duration-300 shadow-sm"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <Link
            to="/"
            className="inline-flex items-center bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-lg transition-colors duration-300 shadow-sm"
          >
            <FaHome className="mr-2" />
            Home
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative overflow-hidden rounded-2xl mb-6 shadow-lg">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-64 md:h-80 object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/1200x400/6366f1/ffffff?text=Campaign+Image";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/90 backdrop-blur-sm text-indigo-800">
                  {campaign.category}
                </span>
              </div>
            </div>

            {/* Campaign Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {campaign.title}
                </h1>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <FaShare className="text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {campaign.donorCount}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Donors
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {daysLeft}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Days Left
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    ₹{(campaign.collectedAmount / 100000).toFixed(1)}L
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Raised
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {progressPercentage.toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Complete
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-6 overflow-x-auto">
                  {[
                    {
                      id: "overview",
                      label: "Overview",
                    },
                    {
                      id: "milestones",
                      label: "Milestones",
                    },
                    {
                      id: "updates",
                      label: "Updates",
                    },
                    {
                      id: "reviews",
                      label: "Reviews",
                    },
                    {
                      id: "faq",
                      label: "FAQ",
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                        activeTab === tab.id
                          ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                          : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="mt-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        About This Campaign
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {campaign.description}
                      </p>
                      <div className="mt-4 whitespace-pre-line text-gray-600 dark:text-gray-300">
                        {campaign.longDescription}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Campaign Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <FaUsers className="text-indigo-500 mr-2" />
                          <span className="text-gray-600 dark:text-gray-300">
                            Organized by: {campaign.organizer}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FaCalendarAlt className="text-indigo-500 mr-2" />
                          <span className="text-gray-600 dark:text-gray-300">
                            Ends:{" "}
                            {new Date(campaign.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "milestones" && (
                  <div className="space-y-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Campaign Milestones
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Track the progress of our campaign through key milestones
                      </p>
                    </div>
                    
                    <div className="space-y-6">
                      {campaign.milestones.map((milestone, index) => (
                        <div
                          key={index}
                          className="relative"
                        >
                          {/* Timeline Line */}
                          {index < campaign.milestones.length - 1 && (
                            <div className="absolute left-4 top-8 w-0.5 h-16 bg-gray-300 dark:bg-gray-600"></div>
                          )}
                          
                          <div className="flex items-start space-x-4">
                            {/* Milestone Icon */}
                            <div
                              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                milestone.completed
                                  ? "bg-green-500 dark:bg-green-600"
                                  : "bg-gray-300 dark:bg-gray-600"
                              }`}
                            >
                              {milestone.completed ? (
                                <FaCheck className="text-white text-sm" />
                              ) : (
                                <FaClock className="text-white text-sm" />
                              )}
                            </div>

                            {/* Milestone Content */}
                            <div className="flex-1 bg-gray-50 dark:bg-gray-900/40 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-semibold text-gray-900 dark:text-white">
                                    {milestone.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    {milestone.description}
                                  </p>
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  ₹{(milestone.amount / 100000).toFixed(1)}L
                                </span>
                              </div>
                              
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                                    <FaFlag className="mr-1" />
                                    Target: {milestone.date}
                                  </div>
                                  {milestone.completed && milestone.completedDate && (
                                    <div className="flex items-center text-green-600 dark:text-green-400">
                                      <FaCheck className="mr-1" />
                                      Completed: {milestone.completedDate}
                                    </div>
                                  )}
                                </div>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    milestone.completed
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400"
                                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400"
                                  }`}
                                >
                                  {milestone.completed ? "Completed" : "In Progress"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "updates" && (
                  <div className="space-y-4">
                    {campaign.updates.map((update, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-indigo-500 pl-4 py-2"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {update.title}
                          </h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(update.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {update.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    {/* Write Review Button */}
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Community Reviews
                      </h3>
                      <button
                        onClick={() => setShowWriteReview(!showWriteReview)}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-300 text-sm font-medium"
                      >
                        <FaEdit className="mr-2" />
                        Write Review
                      </button>
                    </div>

                    {/* Write Review Form */}
                    {showWriteReview && (
                      <div className="bg-gray-50 dark:bg-gray-900/40 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Share Your Experience
                        </h4>
                        <form onSubmit={handleReviewSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Name
                              </label>
                              <input
                                type="text"
                                value={reviewForm.name}
                                onChange={(e) =>
                                  setReviewForm({ ...reviewForm, name: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email
                              </label>
                              <input
                                type="email"
                                value={reviewForm.email}
                                onChange={(e) =>
                                  setReviewForm({ ...reviewForm, email: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Rating
                            </label>
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() =>
                                    setReviewForm({ ...reviewForm, rating: star })
                                  }
                                  className={`text-2xl ${
                                    star <= reviewForm.rating
                                      ? "text-yellow-400"
                                      : "text-gray-300 dark:text-gray-600"
                                  } hover:text-yellow-400 transition-colors`}
                                >
                                  <FaStar />
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Your Review
                            </label>
                            <textarea
                              value={reviewForm.comment}
                              onChange={(e) =>
                                setReviewForm({ ...reviewForm, comment: e.target.value })
                              }
                              rows={4}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              placeholder="Share your thoughts about this campaign..."
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Donation Amount (Optional)
                            </label>
                            <input
                              type="number"
                              value={reviewForm.donationAmount}
                              onChange={(e) =>
                                setReviewForm({ ...reviewForm, donationAmount: e.target.value })
                              }
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              placeholder="₹ 1000"
                            />
                          </div>

                          <div className="flex gap-3">
                            <button
                              type="submit"
                              className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-300 font-medium"
                            >
                              <FaPaperPlane className="mr-2" />
                              Submit Review
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowWriteReview(false)}
                              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-300 font-medium"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Existing Reviews */}
                    <div className="space-y-4">
                      {campaign.reviews.map((review, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 dark:bg-gray-900/40 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {review.name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {review.role} • Donated ₹{review.amount}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <div className="flex mr-2">
                                {[...Array(review.rating)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className="text-yellow-400 text-sm"
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">
                            "{review.text}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "faq" && (
                  <div className="space-y-4">
                    {campaign.faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 dark:border-gray-700 pb-4"
                      >
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {faq.question}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-8">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    ₹{(campaign.collectedAmount / 100000).toFixed(1)}L raised
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    of ₹{(campaign.targetAmount / 100000).toFixed(1)}L
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-3">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full transition-all duration-300 relative overflow-hidden"
                    style={{ width: `${progressPercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ₹{(remainingAmount / 100000).toFixed(1)}L remaining • {progressPercentage.toFixed(0)}% complete
                </p>
              </div>

              {/* Impact Statistics */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-3">
                  <FaTrophy className="text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    Your Impact
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="text-center">
                    <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">156</div>
                    <div className="text-gray-600 dark:text-gray-400">Students Helped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">50</div>
                    <div className="text-gray-600 dark:text-gray-400">Workstations</div>
                  </div>
                </div>
              </div>

              {/* Quick Donation Amounts */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm flex items-center">
                  <FaGift className="mr-2 text-indigo-600 dark:text-indigo-400" />
                  Quick Donate
                </h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {quickAmounts.map((amount) => (
                    <Link
                      key={amount}
                      to={`/donation?amount=${amount}&campaign=${campaign.id}`}
                      className="text-center py-3 px-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      ₹{amount.toLocaleString()}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Primary Donate Button */}
              <Link
                to={`/donation?campaign=${campaign.id}`}
                className="block w-full text-center py-4 px-6 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-300 mb-4 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <div className="flex items-center justify-center">
                  <FaHandHoldingHeart className="mr-2" />
                  Donate Now
                </div>
              </Link>

              {/* Share Campaign */}
              <button className="w-full py-3 px-4 border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-500 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 mb-6">
                <div className="flex items-center justify-center">
                  <FaShare className="mr-2" />
                  Share Campaign
                </div>
              </button>

              {/* Quick Stats */}
              <div className="space-y-3 text-sm border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center">
                    <FaUsers className="mr-2 text-indigo-500" />
                    Donors
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {campaign.donorCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center">
                    <FaCalendarAlt className="mr-2 text-indigo-500" />
                    Days Left
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {daysLeft}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center">
                    <FaBullseye className="mr-2 text-indigo-500" />
                    Goal
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ₹{(campaign.targetAmount / 100000).toFixed(1)}L
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
