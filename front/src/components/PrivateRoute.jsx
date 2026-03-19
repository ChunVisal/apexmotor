// src/components/ProtectedRoute.jsx
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // If loading is true and user is null, the component returns null.
  // We're intentionally not showing a loading spinner to avoid the delay.
  if (loading && !user) {
    return null;
  }
  
  // If loading is complete and there's still no user, redirect to login.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If a user is found, render the protected content.
  return children;
};


export default ProtectedRoute;
