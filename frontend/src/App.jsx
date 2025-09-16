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
import AdminRoute from "./components/AdminRoute";
import AddStudent from "./admin/AddStudent";
import Student from "./admin/Student";
import Network from "./Network/Network";
import ConnectedUsers from "./Network/ConnectedUsers";
import AlumniEventsSection from "./Events/Events";
import EventDetailsPage from "./Events/EventsDesc";
import Campaign from "./Donation/campaign";
import CampaignDetail from "./Donation/Campaign_Detail";
import AlmaSearch from "./NetworkingPortal/AlmaSearch";
import AlmaConnect from "./NetworkingPortal/AlmaConnect";
import ConnectionsPage from "./NetworkingPortal/ConnectionsPage";
import MemoryLane from "./MemoryLane/Memorylane";
import MemoryForm from "./MemoryLane/Memoryform";
import MemoryGallery from "./MemoryLane/MemoryGallary";
import UploadProfileImage from "./Profile/Photo";
import CollegeLegacy from "./CollegeLegacy/Legacy"; 
import PlacementStats from "./CollegeLegacy/PlacementStats";
import ResearchInnovation from "./CollegeLegacy/Research";
import FakeProfile from "./fakeProfile/Fakeprofile";

import Register from "./Registration/Register"  
import CreateEvent from "./CreateEvent/CreateEvent";
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
          {" "}
          <Route path="/Memorylane" element={<MemoryLane />} />
          <Route path="/add-memory" element={<MemoryForm />} />
          <Route path="/memory/:id" element={<MemoryGallery />} />
          <Route path="/photo" element={<UploadProfileImage/>} />
          <Route path="/Legacy" element={<CollegeLegacy/>} />
          <Route path="/Stats" element={<PlacementStats/>} />
          <Route path="/Research" element={<ResearchInnovation/>} />







          <Route index element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/profiles/:rollNumber" element={<Profiles />} />
          {/* <Route
            path="/donation/verify"
            element={<VerifyDonation isDarkTheme={isDarkTheme} />}
          /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/verify/:email" element={<Verify />} />


          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<AlumniEventsSection />} />
          <Route path="/events/:eventId" element={<EventDetailsPage />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/query" element={<Query />} />
          <Route path="/query/askQuestion" element={<AskQuestion />} />
          <Route path="/query/:questionId" element={<Question />} />
          {/* Moved from protected routes to public routes */}
          <Route path="/profile" element={<Profile />} />
          {/* <Route
            path="/donation"
            element={<Donation isDarkTheme={isDarkTheme} />}
          /> */}
          <Route
            path="/donation"
            element={<Campaign isDarkTheme={isDarkTheme} />}
          />
          <Route
            path="/donation/details"
            element={<CampaignDetail isDarkTheme={isDarkTheme} />}
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
          <Route path="/network" element={<Network />} />
          <Route path="/connectedUser" element={<ConnectedUsers />} />
          {/* Admin Protected Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/add-edit-Student" element={<AddStudent />} />
            <Route path="/admin/student" element={<Student />} />
          </Route>
        </Route>

        {/* Student/Alumni Protected Routes */}
        <Route element={<PrivateRoute allowedRoles={["Student / Alumni"]} />}>
          <Route path="/profile" element={<Profile />} />
          {/* <Route
            path="/donation"
            element={<Donation isDarkTheme={isDarkTheme} />}
          /> */}
          <Route
            path="/donation"
            element={<Campaign isDarkTheme={isDarkTheme} />}
          />
          <Route
            path="/createJob"
            element={<CreateJob isDarkTheme={isDarkTheme} />}
          />
          <Route path="/query/askQuestion" element={<AskQuestion />} />
        </Route>

        <Route path="/alma_connect" element={<AlmaConnect />} />
        <Route path="/alma_search" element={<AlmaSearch />} />
        <Route path="/connect_info" element={<ConnectionsPage />} />

        {/* Routes accessible by both Admin and Student/Alumni */}
        <Route
          element={
            <PrivateRoute allowedRoles={["Admin", "Student / Alumni"]} />
          }
        >
          <Route
            path="/jobs"
            element={<JobPortal isDarkTheme={isDarkTheme} />}
          />
          <Route path="/query" element={<Query />} />
          <Route path="/query/:questionId" element={<Question />} />
        </Route>
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
