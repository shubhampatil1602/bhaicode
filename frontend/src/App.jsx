import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { PublicRoute } from "./components/PublicRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { AdminRoute } from "./components/AdminRoute";
import AddProblem from "./pages/AddProblem";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen bg-white text-black dark:bg-neutral-900 dark:text-white'>
        <Loader className='animate-spin size-10' />
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-start'>
      <Routes>
        {/* <Route element={<Layout />}>
        </Route> */}

        <Route element={<PublicRoute authUser={authUser} />}>
          <Route path='/signin' element={<SigninPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Route>

        <Route element={<ProtectedRoute authUser={authUser} />}>
          <Route element={<Layout />}>
            <Route path='/' index element={<HomePage />} />
            <Route element={<AdminRoute />}>
              <Route path='/add-problem' element={<AddProblem />} />
              {/* <Route path='/all-problems' element={<AllProblems />} /> */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
