import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, token } = useSelector((state) => state.auth);

  console.log("Private route check - User:", user, "Token:", token);

  if (!user || !token) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User's role not authorized, redirect to home page
    return <Navigate to="/" replace />;
  }

  // Authorized, render component
  return <Outlet />;
};

export default PrivateRoute;
