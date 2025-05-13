import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContactMessageMutation } from "../redux/Api/contactApiSlice.";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Zod schema
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [ContactMessage] = useContactMessageMutation();
  // const {user}= useSelector((state)=>state.auth);
  // const navigate= useNavigate()

  // console.log("user", user);
  // const email= user?.email
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      // debugger
      // console.log("data", data);
      
      const newdata= {
        name: data.name,
        email: data.email,
        message: data.message
      }
      // if(!user){
      //   navigate("/login")
      // }
      //  const email= user?.email

      const res = await ContactMessage(newdata);

      if (res.error) {
        const errorMessage =
          res.error.data?.message ||
          "could not send Message. Please try again.";
        // console.error("Login error:", res.error);
        toast(errorMessage, {
          style: {
            background: "linear-gradient(to right, #fee2e2, #fecaca)",
            color: "#991b1b",
            border: "1px solid #f87171",
            boxShadow: "0px 4px 10px rgba(239, 68, 68, 0.2)",
          },
          icon: "❌",
          className:
            "dark:!bg-gradient-to-r dark:!from-red-950/90 dark:!to-red-900/90 dark:!text-red-100 dark:!border-red-800 dark:!shadow-[0px_4px_10px_rgba(239,68,68,0.3)]",
        });
        return;
      }

      toast( res.data.message || "Message sent Successfuly", {
              style: {
                background: "linear-gradient(to right, #e0e7ff, #c7d2fe)",
                color: "#312e81",
                border: "1px solid #818cf8",
                boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
              },
              icon: "✅",
              className:
                "dark:!bg-gradient-to-r dark:!from-indigo-950/90 dark:!to-indigo-900/90 dark:!text-indigo-100 dark:!border-indigo-800 dark:!shadow-[0px_4px_10px_rgba(99,102,241,0.3)]",
      });

      setSent(true);
      reset();
      setTimeout(() => setSent(false), 3000);
    } catch (error) {

      toast("Error in Message sent. Please try again.", {
        style: {
          background: "linear-gradient(to right, #fee2e2, #fecaca)",
          color: "#991b1b",
          border: "1px solid #f87171",
          boxShadow: "0px 4px 10px rgba(239, 68, 68, 0.2)",
        },
        icon: "❌",
        className:
          "dark:!bg-gradient-to-r dark:!from-red-950/90 dark:!to-red-900/90 dark:!text-red-100 dark:!border-red-800 dark:!shadow-[0px_4px_10px_rgba(239,68,68,0.3)]",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-2xl rounded-3xl overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
        {/* Left: Illustration & Info */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Get in Touch
          </h2>
          <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
            We'd love to hear from you! Whether you have a question, feedback,
            or just want to say hello, our team is ready to help.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-blue-600 dark:text-blue-400">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="inline-block"
                >
                  <path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7.5"></path>
                  <path d="M16 21l5-5"></path>
                  <path d="M21 21v-4.8a2 2 0 0 0-2-2h-4.8"></path>
                </svg>
              </span>
              <span className="text-gray-800 dark:text-gray-200">
                alumni@college.edu
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-blue-600 dark:text-blue-400">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="inline-block"
                >
                  <path d="M17 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7.5"></path>
                  <path d="M16 21l5-5"></path>
                  <path d="M21 21v-4.8a2 2 0 0 0-2-2h-4.8"></path>
                </svg>
              </span>
              <span className="text-gray-800 dark:text-gray-200">
                +91 12345 67890
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-blue-600 dark:text-blue-400">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="inline-block"
                >
                  <path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7.5"></path>
                  <path d="M16 21l5-5"></path>
                  <path d="M21 21v-4.8a2 2 0 0 0-2-2h-4.8"></path>
                </svg>
              </span>
              <span className="text-gray-800 dark:text-gray-200">
                123 College Road, City, Country
              </span>
            </div>
          </div>
          <div className="mt-8 hidden md:block">
            <img
              src="/undraw_mailbox_e7nc.svg"
              alt="Contact Illustration"
              className="w-64 mx-auto z-10"
            />
          </div>
        </div>
        {/* Right: Form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <div>
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2 font-semibold"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className={`w-full px-4 py-2 border rounded-lg bg-white/70 dark:bg-gray-900/70 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.name
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-700"
                }`}
                type="text"
                id="name"
                {...register("name")}
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2 font-semibold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`w-full px-4 py-2 border rounded-lg bg-white/70 dark:bg-gray-900/70 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.email
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-700"
                }`}
                type="email"
                id="email"
                {...register("email")}
                placeholder="you@email.com"
              />
              {errors.email && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2 font-semibold"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className={`w-full px-4 py-2 border rounded-lg bg-white/70 dark:bg-gray-900/70 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.message
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-700"
                }`}
                id="message"
                rows="5"
                {...register("message")}
                placeholder="Type your message here..."
              />
              {errors.message && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              {sent ? "Message Sent!" : "Send Message"}
            </button>
          </form>
          {sent && (
            <div className="mt-4 text-green-600 dark:text-green-400 font-semibold text-center animate-bounce">
              Thank you for contacting us!
            </div>
          )}
        </div>
      </div>
      {/* Tailwind custom animation for blobs */}
      <style>
        {`
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          @keyframes blob {
            0%, 100% {
              transform: translateY(0px) scale(1);
            }
            33% {
              transform: translateY(-20px) scale(1.1);
            }
            66% {
              transform: translateY(10px) scale(0.9);
            }
          }
        `}
      </style>
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

export default Contact;
