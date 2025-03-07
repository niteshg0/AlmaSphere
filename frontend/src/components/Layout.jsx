import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, isDarkTheme, toggleTheme }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
