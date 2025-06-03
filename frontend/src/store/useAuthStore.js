import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

export const useAuthStore = create((set) => ({
  authUser: null,
  singnInLoader: false,
  signUpLoader: false,
  isCheckingAuth: true,
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log(res.data);
      set({ authUser: res.data, isCheckingAuth: false });
    } catch (error) {
      set({ authUser: null });
      console.log("check auth error ", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data.user });
      toast.success(res.data.message);
    } catch (error) {
      console.log("signup error ", error);
      toast.error("Error signing up");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signIn: async (data) => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.user });
      toast.success(res.data.message);
    } catch (error) {
      console.log("signin error ", error);
      toast.error("Error signing in");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signOut: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success(res.data.message);
    } catch (error) {
      console.log("signout error ", error);
      toast.error("Error signing out");
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
