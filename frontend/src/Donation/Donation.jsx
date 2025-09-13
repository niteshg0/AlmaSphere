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
  FaLock,
  FaInfo,
} from "react-icons/fa";


const Donation = ({ isDarkTheme }) => {
  const { user, token } = useSelector((state) => state.auth);
  const PORT = import.meta.env.VITE_BACKEND_PORT;
  const [activeTab, setActiveTab] = useState("donate");
  const navigate = useNavigate();

  const { processPayment, isProcessing } = useRazorpayPayment();

  const [formData, setFormData] = useState({
    rollNumber: user?.rollNumber || "",
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

    // Validation checks remain unchanged
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
      // First, create the donation order through your API
      const donateResponse = await donation(formData).unwrap();

      if (
        !donateResponse.success ||
        !donateResponse.donation ||
        !donateResponse.donation.id
      ) {
        toast("Failed to create donation order", {
          style: {
            background: isDarkTheme ? "#1f2937" : "#fff",
            color: isDarkTheme ? "#f87171" : "#ef4444",
            border: isDarkTheme ? "1px solid #dc2626" : "1px solid #f87171",
          },
        });
        return;
      }

      // Configure Razorpay with the order data
      const options = {
        key: donateResponse.keyId || import.meta.env.VITE_RAZOR_PAY_API_ID,
        amount: donateResponse.donation.amount,
        currency: donateResponse.donation.currency || "INR",
        name: "Alumni Association",
        description: `${formData.donationType} Donation`,
        image: "/AA-logo.png",
        order_id: donateResponse.donation.id,
        prefill: {
          name: user?.fullName || "",
          email: user?.email || "",
          contact: "",
        },
        notes: {
          rollNumber: user?.rollNumber,
          donationType: formData.donationType,
        },
        theme: {
          color: "#4F46E5",
        },
        handler: async function (response) {
          try {
            // Show processing toast
            const processingToast = toast.loading("Verifying your payment...", {
              style: {
                background: isDarkTheme ? "#1f2937" : "#fff",
                color: isDarkTheme ? "#d1d5db" : "#4b5563",
              },
            });

            // Verify the payment through your backend API
            const verificationData = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };

            // Make API call to verify payment
            const verifyResponse = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/api/donation/verify-payment`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(verificationData),
              }
            );

            const verificationResult = await verifyResponse.json();

            // Update the toast based on verification result
            if (verificationResult.verified) {
              toast.update(processingToast, {
                render:
                  "Thank you! Your donation has been verified successfully.",
                type: "success",
                isLoading: false,
                autoClose: 5000,
                style: {
                  background: isDarkTheme ? "#1f2937" : "#fff",
                  color: isDarkTheme ? "#10b981" : "#059669",
                  border: isDarkTheme
                    ? "1px solid #059669"
                    : "1px solid #10b981",
                },
              });

              // You can add additional logic here like updating UI or redirecting
            } else {
              toast.update(processingToast, {
                render: `Payment verification failed: ${
                  verificationResult.error || "Unknown error"
                }`,
                type: "error",
                isLoading: false,
                autoClose: 5000,
                style: {
                  background: isDarkTheme ? "#1f2937" : "#fff",
                  color: isDarkTheme ? "#f87171" : "#ef4444",
                  border: isDarkTheme
                    ? "1px solid #dc2626"
                    : "1px solid #f87171",
                },
              });
            }
          } catch (error) {
            // Handle any errors that occur during verification
            toast.error(
              `Verification error: ${
                error.message || "Failed to verify payment"
              }`,
              {
                style: {
                  background: isDarkTheme ? "#1f2937" : "#fff",
                  color: isDarkTheme ? "#f87171" : "#ef4444",
                  border: isDarkTheme
                    ? "1px solid #dc2626"
                    : "1px solid #f87171",
                },
              }
            );
            console.error("Payment verification error:", error);
          }
        },
      };

      // Reset form
      setFormData({
        rollNumber: user?.rollNumber || "",
        amount: "",
        donationType: "One-Time",
        message: "",
      });

      // Load Razorpay script if needed
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);

        script.onload = () => {
          const rzp = new window.Razorpay(options);
          rzp.open();
        };

        script.onerror = () => {
          toast("Failed to load payment gateway");
        };
      } else {
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast(`Payment Error: ${error.message || "Internal server error"}`);
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
            Error in Donation
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {error?.data?.message ||
              "Failed to load Donation details. Please try again later."}
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
              Our Impact
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div
            className={`lg:col-span-7 ${
              activeTab === "donate" ? "block" : "hidden"
            }`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Make Your Donation
                </h2>

                {!user || !token ? (
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 rounded-xl p-6 mb-6">
                    <div className="flex items-start">
                      <div className="shrink-0 p-2 rounded-full bg-indigo-100 dark:bg-indigo-800/50">
                        <FaInfo className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-300 mb-2">
                          Login Required for Donations
                        </h3>
                        <p className="text-indigo-700 dark:text-indigo-400 mb-4">
                          To make a donation, you'll need to log in or create an
                          account. This helps us track your contributions and
                          provide you with receipts.
                        </p>
                        <div className="flex flex-col xs:flex-row gap-3">
                          <Link
                            to="/login"
                            className="px-4 py-2 rounded-lg text-center font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                          >
                            Log In
                          </Link>
                          <Link
                            to="/signup"
                            className="px-4 py-2 rounded-lg text-center font-medium bg-white hover:bg-gray-50 text-indigo-700 border border-indigo-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-indigo-400 dark:border-indigo-800/50 transition-colors"
                          >
                            Sign Up
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Predefined Amounts */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select Amount
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {predefinedAmounts.map((amount) => (
                          <button
                            key={amount}
                            type="button"
                            className={`py-3 px-4 rounded-lg border transition-all ${
                              formData.amount === amount
                                ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-400 font-medium"
                                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-700"
                            }`}
                            onClick={() => handleAmountClick(amount)}
                            disabled={!user || !token}
                          >
                            ₹{amount}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Amount */}
                    <div>
                      <label
                        htmlFor="amount"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Or Enter Custom Amount
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500 dark:text-gray-400">
                            ₹
                          </span>
                        </div>
                        <input
                          type="number"
                          id="amount"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                          disabled={!user || !token}
                        />
                      </div>
                    </div>

                    {/* Donation Type */}
                    <div>
                      <label
                        htmlFor="donationType"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Donation Type
                      </label>
                      <select
                        id="donationType"
                        name="donationType"
                        value={formData.donationType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                        disabled={!user || !token}
                      >
                        <option value="One-Time">One-Time</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Annual">Annual</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Message (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Add a personal message with your donation..."
                        rows="3"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                        disabled={!user || !token}
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-colors ${
                          user && token
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                            : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-white"
                        }`}
                        disabled={!user || !token || isLoading || isProcessing}
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
                            {user && token
                              ? "Proceed to Payment"
                              : "Login to Donate"}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right side - Testimonials */}
          <div className="lg:col-span-5">
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
