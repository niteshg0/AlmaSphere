import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { user, token } = useSelector((state) => state.auth);

  console.log("Private route check - User:", user, "Token:", token);

  // If we have a user and token, allow access to the route
  // Otherwise, redirect to login
  return user && token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
