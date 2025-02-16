import { useEffect, useState, } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";

const VerifyDonation = () => {
    const searchQuery= useSearchParams()[0];
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-8 text-center">
        
            <CheckCircle className="text-green-400 w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold">Donation Verified!</h2>
            <p className="text-gray-300 mt-2">Thank you for your generous donation.</p>
            <p className="text-gray-400 text-sm">Reference ID: {searchQuery.get("reference")}</p>
          
         
    
      </div>
    </div>
  );
};

export default VerifyDonation;
