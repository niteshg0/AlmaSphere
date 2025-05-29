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
import PrivateRoute from "./components/PrivateRoute";
import AddStudent from "./admin/AddStudent";
import Student from "./admin/Student";
import Memorylane from "./MemoryLane//Memorylane"
import Memoryform from "./MemoryLane/Memoryform";
import MemoryGallery from "./MemoryLane/MemoryGallary";
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

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
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
           <Route path="/Memorylane" element = {<Memorylane/>} />
        
           <Route path="/add-memory" element = {<Memoryform/>} />
          <Route path="/memory/:id" element={<MemoryGallery />} />



          <Route index element={<Home />} />

          <Route path="/about" element={<AboutUs />} />

          <Route path="/contact" element={<ContactUs />} />

          <Route path="/profiles/:rollNumber" element={<Profiles />} />
         

          <Route
            path="/donation/verify"
            element={<VerifyDonation isDarkTheme={isDarkTheme} />}
          />
        
          <Route path="/login" element={<Login />} />

          <Route path="/verify/:email" element={<Verify />} />

          <Route path="/signup" element={<SignUp />} />

          <Route path="/query" element={<Query />} />

          <Route path="/query/askQuestion" element={<AskQuestion />} />
          <Route path="/query/:questionId" element={<Question />} />

          {/* Moved from protected routes to public routes */}
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/donation"
            element={<Donation isDarkTheme={isDarkTheme} />}
          />
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
          <Route path="/admin/add-edit-Student" element={<AddStudent/>}/>
          <Route path="/admin/student" element={<Student/>}/>
        </Route>

        {/* Protected Routes - leaving empty as we moved them to public routes */}
        {/* <Route element={<PrivateRoute />}>
        </Route> */}
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
