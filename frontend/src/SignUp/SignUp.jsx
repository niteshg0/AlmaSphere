import React, { useState } from "react";
import {z} from "zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../redux/Api/userApiSlice";
import { setUserInfo } from "../redux/features/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";






const SignUp = () => {



  const formSchema = z.object({
     fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  rollNumber: z.string().min(10, "Roll number is required")
  .regex(/^\d+$/, "Roll number must contain only digits")
    .transform((val) => Number(val)),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
     invalid_type_error: "Gender not selected"
  }),
  batch: z.string().regex(/^\d{4}-\d{4}$/, "Batch must be in format YYYY-YYYY (e.g. 2020-2024)"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(formSchema),
});
  console.log('Form Errors:', errors);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createUser] = useSignupMutation();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };

 const onSubmit = async (formData)=>{
     if (isSubmitting) return; // Prevent multiple submissions
    
    setIsSubmitting(true);
    try {
      const res = await createUser(formData);
      if (res.error) {
        console.log(res.error.data.message);
        const errorMessage = res.error.data?.message || "SignUp failed. Please try again.";

        toast(errorMessage, {
          style: {
            background: "linear-gradient(to right, #fee2e2, #fecaca)",
            color: "#991b1b",
            border: "1px solid #f87171",
            boxShadow: "0px 4px 10px rgba(239, 68, 68, 0.2)",
          },
          icon: "❌",
          className: "dark:!bg-gradient-to-r dark:!from-red-950/90 dark:!to-red-900/90 dark:!text-red-100 dark:!border-red-800 dark:!shadow-[0px_4px_10px_rgba(239,68,68,0.3)]",
        });
      } else {
        dispatch(setUserInfo({ ...res }));

        toast("Verify Email Redirecting...", {
          style: {
            background: "linear-gradient(to right, #e0e7ff, #c7d2fe)",
            color: "#312e81",
            border: "1px solid #818cf8",
            boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
          },
          icon: "✅",
          className: "dark:!bg-gradient-to-r dark:!from-indigo-950/90 dark:!to-indigo-900/90 dark:!text-indigo-100 dark:!border-indigo-800 dark:!shadow-[0px_4px_10px_rgba(99,102,241,0.3)]",
        });

        
        setTimeout(() => {
          navigate(formData.email ? `/verify/${formData.email}` : "/");
        }, 1500);
      }
    } catch (error) {
      console.log(error?.data?.message || error.message);
      toast("SignUp failed. Please try again.", {
        style: {
          background: "linear-gradient(to right, #fee2e2, #fecaca)",
          color: "#991b1b",
          border: "1px solid #f87171",
          boxShadow: "0px 4px 10px rgba(239, 68, 68, 0.2)",
        },
        icon: "❌",
        className: "dark:!bg-gradient-to-r dark:!from-red-950/90 dark:!to-red-900/90 dark:!text-red-100 dark:!border-red-800 dark:!shadow-[0px_4px_10px_rgba(239,68,68,0.3)]",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission on Enter key
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-4xl p-8 bg-gradient-to-br from-white/95 via-blue-50/95 to-indigo-50/95 dark:from-gray-800/95 dark:via-gray-800/95 dark:to-gray-900/95 shadow-lg rounded-2xl relative overflow-hidden group">
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-indigo-500/30 animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content border */}
        <div className="absolute inset-[1px] rounded-2xl transition-all duration-500 bg-gradient-to-br from-white/95 to-blue-50/95 group-hover:from-white group-hover:to-blue-50 dark:from-gray-900/90 dark:to-gray-800/90 dark:group-hover:from-gray-900/95 dark:group-hover:to-gray-800/95" />

        {/* Border glow effect */}
        <div className="absolute inset-0 rounded-2xl transition-all duration-500 border border-indigo-200/50 group-hover:border-indigo-300/70 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] dark:border-indigo-500/20 dark:group-hover:border-indigo-500/40 dark:group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]" />

        {/* Hover border animation */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center text-indigo-900 dark:text-indigo-400 mb-8">
            Join Our Alumni Network
          </h2>
          <form onSubmit={handleSubmit(onsubmit)} onKeyPress={handleKeyPress} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-500/20 pb-2">
                  About You
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      
                      {...register("fullName")}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-500/30 transition-all duration-300"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Gender
                    </label>
                    <select
                      id="gender"
                     
                      {...register("gender")}
                       
                      
                      className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-500/30 transition-all duration-300"
                   
                    >
                      <option value="" >Choose your gender</option>
                      <option value="Male">Male</option>
                       <option value="Female">Female</option>
                       <option value="Other">Other</option>
                    </select>
                     {errors.gender && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">Gender is not selected</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Academic Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-500/20 pb-2">
                  College Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Roll Number
                    </label>
                    <input
                      type="text"
                      id="rollNumber"
                      
                      {...register("rollNumber")}
                      placeholder="e.g., 2020/BCA/123"
                      className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-500/30 transition-all duration-300"
                 
                    />
                      {errors.rollNumber && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.rollNumber.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="batch" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Batch
                    </label>
                    <input
                      type="text"
                      id="batch"
                 
                      {...register("batch")}
                      placeholder="2020-2024"
                      className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-500/30 transition-all duration-300"
                    />
                    {errors.batch && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.batch.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Account Credentials Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-500/20 pb-2">
                Create Your Account
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                   
                    {...register("email")}
                    placeholder="john.doe@example.com"
                    className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-500/30 transition-all duration-300"
                  
                  />
                    {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Create a Password
                  </label>
                  <input
                    type="password"
                    id="password"
                   
                    {...register("password")}
                    placeholder="At least 6 characters"
                    className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-500/30 transition-all duration-300"
                  
                  />
                   {errors.password && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
               
               
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">{isSubmitting ? "Creating your account..." : "Create Account"}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          borderRadius: "10px",
          padding: "12px 16px",
          fontSize: "14px",
          fontWeight: "500",
        }}
      />
    </div>
  );
};

export default SignUp;
