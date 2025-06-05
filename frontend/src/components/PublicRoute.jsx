import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = ({ authUser }) => {
  if (authUser) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};
