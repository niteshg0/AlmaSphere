import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import ScrollToTop from "./ScrollToTop";

const Layout = ({ isDarkTheme, toggleTheme }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-black dark:via-black dark:to-black text-gray-900 dark:text-gray-200">
      <ScrollToTop />
      <Header isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      <main className="flex-grow w-full max-w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
