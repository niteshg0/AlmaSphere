import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./Home/Home";
import Login from "./Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./SignUp/SignUp";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Profile from "./Profile/Profile";
import JobPortal from "./JobPortal/JobPortal";
import CreateJob from "./JobPortal/CreateJob";
import Verify from "./components/Verify";
import Donation from "./Donation/Donation";
import VerifyDonation from "./Donation/verifyDonation";
import JobDetails from "./components/JobDetails";
import Footer from "./components/Footer";
import Layout from "./components/Layout";


function App() {

  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
        
        <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
          <Home />
        </Layout>
        </>
      ),
    },
    {
      path: "/jobs",
      element: (
        <>
          <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
          <JobPortal />
        </Layout>
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
          <AboutUs />
        </Layout>
        </>
      ),
    },
    {
      path: "/contact",
      element: (
        <>
           <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
          <ContactUs />
        </Layout>
        </>
      ),
    },
    {
      path: "/createJob",
      element: (
        <>
          <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
          <CreateJob />
        </Layout>
        </>
      ),
    },
    {
      path: "/donation",
      element: (
        <>
          <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
          <Donation />
        </Layout>
        </>
      )
    },
    {
      path: "/donation/verify",
      element: (
        <>
           <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
          <VerifyDonation />
        </Layout>
        </>
      )
    },
    {
      path: "/login",
      element: (
        <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
          <Login />
        </Layout>
      ),
    },
    {
      path:"/jobDetail/:jobId",
      element:(
        <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
          <JobDetails />
        </Layout>
      ),
    },
    {
      path: "/verify/:email",
      element:(
        <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
          <Verify />
        </Layout>
      ),
    },
    {
      path: "/signup",
      element: (
        <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
          <SignUp />
        </Layout>
      ),
    },
    {
      path: "/profile",
      element: (
        <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
          <Profile />
        </Layout>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
