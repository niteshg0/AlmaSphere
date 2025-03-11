import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top if we're not on the home page
    if (pathname !== "/") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // Use instant instead of smooth for immediate scroll
      });
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;
