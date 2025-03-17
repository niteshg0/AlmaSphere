import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastComp = ({ toastType, message }) => {
  toast(message, {
    style:
      toastType === "success"
        ? {
            background: "linear-gradient(to right, #e0e7ff, #c7d2fe)",
            color: "#312e81",
            border: "1px solid #818cf8",
            boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
          }
        : {
            background: "linear-gradient(to right, #fee2e2, #fecaca)",
            color: "#991b1b",
            border: "1px solid #f87171",
            boxShadow: "0px 4px 10px rgba(239, 68, 68, 0.2)",
          },
    icon: toastType === "success" ? "✅" : "❌",
    className:
      toastType === "success"
        ? "dark:!bgCreating your account...-gradient-to-r dark:!from-indigo-950/90 dark:!to-indigo-900/90 dark:!text-indigo-100 dark:!border-indigo-800 dark:!shadow-[0px_4px_10px_rgba(99,102,241,0.3)]"
        : "dark:!bg-gradient-to-r dark:!from-red-950/90 dark:!to-red-900/90 dark:!text-red-100 dark:!border-red-800 dark:!shadow-[0px_4px_10px_rgba(239,68,68,0.3)]",
  });

  return (
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
  );
};

export default ToastComp;
