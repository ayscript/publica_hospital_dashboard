import { Navigate, Outlet } from "react-router";
// import { useAuth } from "./AuthContext";
import { useAuthStore } from "../store/authStore";

export const PublicRoute = () => {
  const { user, loading } = useAuthStore();
  const isAuthenticated = !!user;

  if (loading) {
    return <div>Loading...</div>;
  }

  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  
  return <Outlet />;
};
