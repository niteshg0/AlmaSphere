import React, { useState, useEffect } from "react";
import Home from "./Home/Home";
import Login from "./Login/Login";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
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
import Layout from "./components/Layout";
import Query from "./Query/Query";
import AskQuestion from "./Query/AskQuestion";
import Question from "./Query/Question";
import Profiles from "./Profiles";

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

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: (
  //       <>

  //       <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
  //         <Home />
  //       </Layout>
  //       </>
  //     ),
  //   },
  //   {
  //     path: "/jobs",
  //     element: (
  //       <>
  //         <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
  //         <JobPortal />
  //       </Layout>
  //       </>
  //     ),
  //   },
  //   {
  //     path: "/about",
  //     element: (
  //       <>
  //         <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
  //         <AboutUs />
  //       </Layout>
  //       </>
  //     ),
  //   },
  //   {
  //     path: "/contact",
  //     element: (
  //       <>
  //          <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
  //         <ContactUs />
  //       </Layout>
  //       </>
  //     ),
  //   },
  //   {
  //     path: "/createJob",
  //     element: (
  //       <>
  //         <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
  //         <CreateJob />
  //       </Layout>
  //       </>
  //     ),
  //   },
  //   {
  //     path: "/donation",
  //     element: (
  //       <>
  //         <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
  //         <Donation />
  //       </Layout>
  //       </>
  //     )
  //   },
  //   {
  //     path: "/donation/verify",
  //     element: (
  //       <>
  //          <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
  //         <VerifyDonation />
  //       </Layout>
  //       </>
  //     )
  //   },
  //   {
  //     path: "/login",
  //     element: (
  //       <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
  //         <Login />
  //       </Layout>
  //     ),
  //   },
  //   {
  //     path:"/jobDetail/:jobId",
  //     element:(
  //       <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
  //         <JobDetails />
  //       </Layout>
  //     ),
  //   },
  //   {
  //     path: "/verify/:email",
  //     element:(
  //       <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
  //         <Verify />
  //       </Layout>
  //     ),
  //   },
  //   {
  //     path: "/signup",
  //     element: (
  //       <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
  //         <SignUp />
  //       </Layout>
  //     ),
  //   },
  //   {
  //     path: "/profile",
  //     element: (
  //       <Layout isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}>
  //         <Profile />
  //       </Layout>
  //     ),
  //   },
  // ]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* <Route
          path="/"
          element={
            <Layout
              isDarkTheme={isDarkTheme}
              toggleTheme={toggleTheme}
              NavBar={"fixed"}
            />
          }
        >
          <Route index element={<Home />} />
        </Route> */}

        <Route
          path="/"
          element={
            <Layout
              isDarkTheme={isDarkTheme}
              toggleTheme={toggleTheme}
              // NavBar={""}
            />
          }
        >
          <Route index element={<Home />} />

          <Route path="/about" element={<AboutUs />}/>

          <Route path="/contact" element={<ContactUs />}/>

          <Route path="/profiles/:rollNumber" element={<Profiles />}/>

          <Route path="/donation/verify" element={<VerifyDonation isDarkTheme={isDarkTheme}  />}/>

          <Route path="/login" element={<Login />}/>

          <Route path="/verify/:email" element={<Verify />}/>

          <Route path="/signup" element={<SignUp />}/>

          <Route path="/query" element= {<Query />} />
        
          <Route path="/query/askQuestion" element={<AskQuestion />} />
          <Route path="/query/:questionId" element={<Question />} />

        </Route>

        <Route path="/profile" element={<Profile />}/>

        <Route path="/donation" element={<Donation isDarkTheme={isDarkTheme}  />}/>
        
        <Route
          path="/jobs"
          element={<JobPortal isDarkTheme={isDarkTheme} />}
        />
        <Route
          path="/createJob"
          element={<CreateJob isDarkTheme={isDarkTheme} />}
        />
        <Route
          path="/jobDetail/:jobId"
          element={<JobDetails isDarkTheme={isDarkTheme} />}
        />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
