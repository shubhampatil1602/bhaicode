import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ authUser }) => {
  const location = useLocation();
  if (!authUser) {
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }

  return <Outlet />;
};
