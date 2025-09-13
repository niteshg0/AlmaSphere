import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import { FaHome } from "react-icons/fa";

const VerifyDonation = () => {
  const searchQuery = useSearchParams()[0];
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    // Auto-redirect to home after 5 seconds with countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 700);

    return () => clearInterval(timer);
  }, [navigate]);

  const referenceId = searchQuery.get("reference");
  const razorpay_payment_id = searchQuery.get("razorpay_payment_id");
  const razorpay_order_id = searchQuery.get("razorpay_order_id");
  const razorpay_signature = searchQuery.get("razorpay_signature");

  // If this is a success response, all three should exist
  const isSuccessResponse =
    razorpay_payment_id && razorpay_order_id && razorpay_signature;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-lg transition-colors duration-300 shadow-sm"
          >
            <FaHome className="mr-2" />
            Return Home
          </Link>
        </div>

        {/* Status Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 shadow-xl">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-indigo-200/30 dark:bg-indigo-500/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-200/30 dark:bg-purple-500/10 blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 text-center">
            {isSuccessResponse ? (
              <>
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-green-500 dark:text-green-400 w-12 h-12" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Donation Successful!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Thank you for your generous contribution to our alumni
                  community.
                </p>
                {referenceId && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Reference ID
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white break-all">
                      {referenceId}
                    </p>
                  </div>
                )}
                {razorpay_payment_id && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Payment ID
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white break-all">
                      {razorpay_payment_id}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle className="text-red-500 dark:text-red-400 w-12 h-12" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Verification Failed
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We couldn't verify your donation. Please try again or contact
                  support.
                </p>
                {referenceId && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Reference ID
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white break-all">
                      {referenceId}
                    </p>
                  </div>
                )}
              </>
            )}

            <div className="mt-6 text-gray-500 dark:text-gray-400">
              Redirecting to home page in{" "}
              <span className="font-medium text-indigo-600 dark:text-indigo-400">
                {countdown}
              </span>{" "}
              seconds...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyDonation;
