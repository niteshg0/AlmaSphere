import React from 'react'
import Header from "./components/Header";
import Home from "./Home/Home";
import Login from "./Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./SignUp/SignUp";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Profile from './Profile/Profile';
import Verify from './components/Verify';

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
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path:'/profile',
      element: <Profile />
    },
    {
      path: '/verify/:email',
      element: <Verify />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;