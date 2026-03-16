// import { Navigate, Outlet } from "react-router";
// import { useAuth } from "./AuthContext";

// export const ProtectedRoute = () => {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>; // Or a spinner component
//   }

//   // If not authenticated, kick them to the login page
//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   // If authenticated, render the child routes (Dashboard)
//   return <Outlet />;
// };

import { Navigate, Outlet } from "react-router";
// Import your store instead of the AuthContext
import { useAuthStore } from "../store/authStore";

export const ProtectedRoute = () => {
  const { user, loading } = useAuthStore();
  const isAuthenticated = !!user;

  if (loading) {
    return <div>Loading...</div>;
  }

  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  
  return <Outlet />;
};
