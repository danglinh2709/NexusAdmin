import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../stores/AuthContext";
import { ROUTES } from "../configs/route.config";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.AUTH.LOGIN} />;
};
