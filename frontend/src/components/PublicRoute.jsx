import { Navigate, Outlet } from "react-router-dom";

export const AuthRoute = ({ authUser }) => {
  if (authUser) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};
