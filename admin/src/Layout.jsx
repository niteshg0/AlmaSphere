import { useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router";

// Cookie utility functions
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

// const setCookie = (name, value, days = 30) => {
//   const expires = new Date();
//   expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
//   document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
// };

const Layout = () => {
  
  const savedState = getCookie("sidebar_state") === "true";


  return (
    <div className="min-h-screen flex flex-col font-['Inter']">
      <SidebarProvider
        defaultOpen={savedState}
      >
        <AppSidebar />
        <main className="flex-grow w-full max-w-full overflow-x-hidden">
          <SidebarTrigger className="relative top-2  " />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
