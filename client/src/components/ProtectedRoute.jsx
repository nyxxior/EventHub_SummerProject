import React from "react";
import { Navigate } from "react-router-dom";

// Wrap any page with this component to make sure only logged-in
// users can see it. If there is no token, send them to the login page.
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
