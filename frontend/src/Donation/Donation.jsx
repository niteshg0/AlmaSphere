import React, { useState, useEffect } from "react";
import { useDonationMutation } from "../redux/Api/donationApi";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaHeart,
  FaRegCreditCard,
  FaHandHoldingHeart,
  FaUniversity,
  FaGraduationCap,
  FaUsers,
} from "react-icons/fa";

const Donation = ({ isDarkTheme }) => {
  const { user } = useSelector((state) => state.auth);
  const PORT = import.meta.env.VITE_BACKEND_PORT;
  const [activeTab, setActiveTab] = useState("donate");
  const navigate= useNavigate();

  const [formData, setFormData] = useState({
    rollNumber: user?.data?.rollNumber || "",
    amount: "",
    donationType: "One-Time",
    message: "",
  });

  const [donation, { isLoading, error }] = useDonationMutation();
  const [donationStats, setDonationStats] = useState({
    totalRaised: 1250000,
    donors: 328,
    scholarships: 42,
    events: 15,
  });

  const handleAmountClick = (selectedAmount) => {
    setFormData({ ...formData, amount: selectedAmount });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast("Please Login to make a donation", {
        style: {
          background: isDarkTheme ? "#1f2937" : "#fff",
          color: isDarkTheme ? "#f87171" : "#ef4444",
          border: isDarkTheme ? "1px solid #dc2626" : "1px solid #f87171",
        },
      });
      return;
    }

    if (!formData.amount) {
      toast("Please enter a donation amount", {
        style: {
          background: isDarkTheme ? "#1f2937" : "#fff",
          color: isDarkTheme ? "#f87171" : "#ef4444",
          border: isDarkTheme ? "1px solid #dc2626" : "1px solid #f87171",
        },
      });
      return;
    }

    try {
      const donate = await donation(formData).unwrap();

      if (!donate.donation.id) {
        toast("Failed to create Donation Order", {
          style: {
            background: isDarkTheme ? "#1f2937" : "#fff",
            color: isDarkTheme ? "#f87171" : "#ef4444",
            border: isDarkTheme ? "1px solid #dc2626" : "1px solid #f87171",
          },
        });
        return;
      }

      setFormData({
        rollNumber: user?.data?.rollNumber || "",
        amount: "",
        donationType: "One-Time",
        message: "",
      });

      const options = {
        key: import.meta.env.VITE_RAZOR_PAY_API_ID,
        amount: donate.donation.amount,
        currency: "INR",
        name: "Alumni Association",
        description: "Test Transaction",
        image: "/AA-logo.png",
        order_id: donate.donation.id,
        callback_url: `${import.meta.env.VITE_BACKEND_URL}/api/donation/verify`,
        prefill: {
          name: user?.data?.fullname || "",
          email: user.data.email || "",
          contact: "",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#4F46E5",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      toast("Internal Error", {
        style: {
          background: isDarkTheme ? "#1f2937" : "#fff",
          color: isDarkTheme ? "#f87171" : "#ef4444",
          border: isDarkTheme ? "1px solid #dc2626" : "1px solid #f87171",
        },
      });
      console.log(error);
    }
  };

  const predefinedAmounts = [500, 1000, 2500, 5000];
  const donationPurposes = [
    {
      id: "scholarships",
      title: "Scholarships",
      icon: (
        <FaGraduationCap className="text-indigo-600 dark:text-indigo-400 text-xl" />
      ),
      description:
        "Support deserving students with financial assistance for their education.",
    },
    {
      id: "events",
      title: "Alumni Events",
      icon: (
        <FaUsers className="text-indigo-600 dark:text-indigo-400 text-xl" />
      ),
      description:
        "Fund networking events, reunions, and professional development workshops.",
    },
    {
      id: "campus",
      title: "Campus Development",
      icon: (
        <FaUniversity className="text-indigo-600 dark:text-indigo-400 text-xl" />
      ),
      description:
        "Help improve campus facilities and create better learning environments.",
    },
  ];

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Error Loading Job
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {error.data.message||
              "Failed to load job details. Please try again later."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            to="/"
            className="inline-flex items-center bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-lg transition-colors duration-300 shadow-sm"
          >
            <FaHome className="mr-2" />
            Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl mb-12">
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white blur-3xl" />
          </div>
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Make a Difference Today
                </h1>
                <p className="text-xl opacity-90 max-w-xl">
                  Your contribution helps fund scholarships, events, and
                  initiatives that strengthen our alumni community.
                </p>
              </div>
              <div className="flex flex-col items-center bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-4xl font-bold">
                  ₹{(donationStats.totalRaised / 100000).toFixed(1)}L+
                </div>
                <div className="text-lg opacity-90">Raised So Far</div>
                <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">
                      {donationStats.donors}
                    </div>
                    <div className="text-sm opacity-90">Donors</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {donationStats.scholarships}
                    </div>
                    <div className="text-sm opacity-90">Scholarships</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button
              onClick={() => setActiveTab("donate")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "donate"
                  ? "bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400"
                  : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              }`}
            >
              Donate Now
            </button>
            <button
              onClick={() => setActiveTab("impact")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "impact"
                  ? "bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400"
                  : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              }`}
            >
              Your Impact
            </button>
          </div>
        </div>

        {/* Main content */}
        {activeTab === "donate" ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left side - Donation form */}
            <div className="flex-1">
              <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 shadow-xl">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-indigo-200/30 dark:bg-indigo-500/10 blur-3xl" />
                  <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-200/30 dark:bg-purple-500/10 blur-3xl" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-8">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 mr-4">
                      <FaHandHoldingHeart className="text-indigo-600 dark:text-indigo-400 text-xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Make a Donation
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Donation Purpose */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select Purpose (Optional)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {donationPurposes.map((purpose) => (
                          <button
                            type="button"
                            key={purpose.id}
                            onClick={() =>
                              setFormData({ ...formData, purpose: purpose.id })
                            }
                            className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
                              formData.purpose === purpose.id
                                ? "bg-indigo-50 dark:bg-indigo-900/30 border-2 border-indigo-500 dark:border-indigo-400"
                                : "bg-gray-50 dark:bg-gray-700/50 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                            }`}
                          >
                            <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 mb-2">
                              {purpose.icon}
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {purpose.title}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Donation Amount */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select Amount
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                        {predefinedAmounts.map((amt) => (
                          <button
                            type="button"
                            key={amt}
                            onClick={() => handleAmountClick(amt)}
                            className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                              formData.amount === amt
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-600"
                            }`}
                          >
                            ₹{amt.toLocaleString()}
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                          ₹
                        </span>
                        <input
                          type="number"
                          placeholder="Enter custom amount"
                          value={formData.amount}
                          onChange={(e) =>
                            setFormData({ ...formData, amount: e.target.value })
                          }
                          className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>

                    {/* Donation Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Donation Type
                      </label>
                      <div className="flex gap-4">
                        {["One-Time", "Recurring"].map((type) => (
                          <button
                            type="button"
                            key={type}
                            onClick={() =>
                              setFormData({ ...formData, donationType: type })
                            }
                            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                              formData.donationType === type
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-600"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message (Optional)
                      </label>
                      <textarea
                        name="message"
                        placeholder="Share why you're donating or any specific area you'd like your donation to support..."
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 font-medium shadow-md hover:shadow-lg"
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaRegCreditCard className="mr-2" />
                          Donate{" "}
                          {formData.amount ? `₹${formData.amount}` : "Now"}
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Right side - Testimonials */}
            <div className="lg:w-96">
              <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <FaHeart className="text-red-500 mr-2" />
                    Donor Testimonials
                  </h3>

                  <div className="space-y-6">
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4">
                      <p className="text-gray-700 dark:text-gray-300 italic mb-3">
                        "My donation helped fund a scholarship for a deserving
                        student. It's incredibly rewarding to know I'm making a
                        difference in someone's education journey."
                      </p>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-200 dark:bg-indigo-700 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-300">
                          R
                        </div>
                        <div className="ml-2">
                          <p className="font-medium text-gray-900 dark:text-white">
                            Rahul M.
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Class of 2015
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                      <p className="text-gray-700 dark:text-gray-300 italic mb-3">
                        "The alumni network has given me so much. Donating
                        annually is my way of giving back and ensuring future
                        graduates have the same opportunities."
                      </p>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-200 dark:bg-purple-700 flex items-center justify-center font-bold text-purple-600 dark:text-purple-300">
                          P
                        </div>
                        <div className="ml-2">
                          <p className="font-medium text-gray-900 dark:text-white">
                            Priya S.
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Class of 2010
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                      <p className="text-gray-700 dark:text-gray-300 italic mb-3">
                        "Supporting campus development projects has been a
                        meaningful way to leave a lasting legacy at my alma
                        mater."
                      </p>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-700 flex items-center justify-center font-bold text-blue-600 dark:text-blue-300">
                          A
                        </div>
                        <div className="ml-2">
                          <p className="font-medium text-gray-900 dark:text-white">
                            Amit K.
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Class of 2008
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Your Donation Makes a Difference
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {donationPurposes.map((purpose) => (
                  <div
                    key={purpose.id}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6"
                  >
                    <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 inline-block mb-4">
                      {purpose.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {purpose.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {purpose.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Progress
                        </span>
                        <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                          {purpose.id === "scholarships"
                            ? "68%"
                            : purpose.id === "events"
                            ? "45%"
                            : "32%"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full"
                          style={{
                            width:
                              purpose.id === "scholarships"
                                ? "68%"
                                : purpose.id === "events"
                                ? "45%"
                                : "32%",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Recent Achievements
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                      {donationStats.scholarships}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Scholarships Awarded
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                      {donationStats.events}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Events Organized
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                      3
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Labs Renovated
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                      12
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Research Grants
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setActiveTab("donate")}
                    className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 font-medium shadow-md hover:shadow-lg"
                  >
                    <FaHandHoldingHeart className="mr-2" />
                    Contribute Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkTheme ? "dark" : "light"}
      />
    </div>
  );
};

export default Donation;
