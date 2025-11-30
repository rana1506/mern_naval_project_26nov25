// src/routes/RoleProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  const hasRole = user.roles?.some((r) => allowedRoles.includes(r));

  if (!hasRole) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default RoleProtectedRoute;
