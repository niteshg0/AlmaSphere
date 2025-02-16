import React from "react";
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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          {" "}
          <Header />
          <Home />{" "}
        </>
      ),
    },
    {
      path: "/jobs",
      element: (
        <>
          {" "}
          <Header />
          <JobPortal />{" "}
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          {" "}
          <Header /> <AboutUs />{" "}
        </>
      ),
    },
    {
      path: "/contact",
      element: (
        <>
          <Header /> <ContactUs />{" "}
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
        </>
      )
    },
    {
      path: "/donation/verify",
      element: (
        <>
          {" "}
          <Header />
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
