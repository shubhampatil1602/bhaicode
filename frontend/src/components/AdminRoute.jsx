// AdminRoute.jsx
import { useAuthStore } from "@/store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoute = () => {
  const { authUser } = useAuthStore();

  if (!authUser) {
    return <Navigate to='/signin' replace />;
  }

  if (authUser.role !== "ADMIN") {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};
