import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { Outlet } from "react-router";
// import ScrollToTop from "./ScrollToTop";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col poppins-medium">
      {/* <ScrollToTop /> */}
      <Header />
      <main className="flex-grow w-full max-w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
