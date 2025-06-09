import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useThemeStore } from "./store/useThemeStore";

import { useAuthStore } from "./store/useAuthStore";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import AddProblem from "./pages/AddProblem";
import ProblemPage from "./pages/ProblemPage";
import { PublicRoute } from "./components/PublicRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import { Layout } from "./components/Layout";
import { Loader } from "lucide-react";
import EditProblem from "./pages/EditProblem";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    console.log("App: Current theme is", theme);
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen bg-background text-foreground'>
        <Loader className='animate-spin size-10' />
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-start min-h-screen bg-background text-foreground'>
      <Routes>
        <Route element={<PublicRoute authUser={authUser} />}>
          <Route path='/signin' element={<SigninPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Route>

        <Route element={<ProtectedRoute authUser={authUser} />}>
          <Route element={<Layout />}>
            <Route path='/' index element={<HomePage />} />
            <Route path='/problem/:id' element={<ProblemPage />} />

            <Route element={<AdminRoute />}>
              <Route path='/add-problem' element={<AddProblem />} />
              <Route
                path='/edit-problem/:problemId'
                element={<EditProblem />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
