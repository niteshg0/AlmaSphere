import React, { useState } from "react";
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
import Footer from "./components/Footer";

function App() {

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
        
          <Header isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      <Home isDarkTheme={isDarkTheme} />
      <Footer isDarkTheme={isDarkTheme}/>
        </>
      ),
    },
    {
      path: "/jobs",
      element: (
        <>
          
          <Header />
          <JobPortal />
          <Footer isDarkTheme={isDarkTheme}/>
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          {" "}
          <Header /> <AboutUs />{" "}
          <Footer/>
        </>
      ),
    },
    {
      path: "/contact",
      element: (
        <>
          <Header /> <ContactUs />{" "}
          <Footer/>
        </>
      ),
    },
    {
      path: "/createJob",
      element: (
        <>
          <CreateJob />
        </>
      ),
    },
    {
      path: "/donation",
      element: (
        <>
          {" "}
          <Header />
          <Donation />{" "}
          <Footer isDarkTheme={isDarkTheme}/>
        </>
      )
    },
    {
      path: "/donation/verify",
      element: (
        <>
          {" "}
          {/* <Header /> */}
          <VerifyDonation/>{" "}
        </>
      )
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/verify/:email",
      element: <Verify />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
