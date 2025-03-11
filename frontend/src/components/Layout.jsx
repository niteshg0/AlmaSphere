import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import ScrollToTop from "./ScrollToTop";

const Layout = ({ isDarkTheme, toggleTheme }) => {
  return (
    
     <div className=" min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-200"
     >
      <ScrollToTop />
      <Header isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}  />
        <main className=""><Outlet/></main>
      <Footer />
      
     </div>
  
  );
};

export default Layout;
