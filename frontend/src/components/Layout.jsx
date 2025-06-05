import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Layout = () => {
  return (
    <div className='pt-20 sm:pt-28'>
      <Navbar />
      <Outlet />
    </div>
  );
};
