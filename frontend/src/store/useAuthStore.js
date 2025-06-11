import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log(res.data);
      set({ authUser: res.data.user, isCheckingAuth: false });
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
      set({ authUser: res.data.user, isCheckingAuth: false });
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
      if (res.data.user) {
        set({ authUser: res.data.user, isCheckingAuth: false });
        toast.success(res.data.message);
        return { success: true };
      } else {
        set({ authUser: null, isCheckingAuth: false });
        toast.error("Invalid credentials");
        return { success: false };
      }
    } catch (error) {
      set({ authUser: null });
      console.log("signin error ", error);
      const errorMessage = error.response?.data?.message || "Error signing in";
      toast.error(errorMessage);
      return { success: false };
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signOut: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null, isCheckingAuth: false });
      toast.success(res.data.message);
    } catch (error) {
      console.log("signout error ", error);
      toast.error("Error signing out");
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
