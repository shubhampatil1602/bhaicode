import { create } from "zustand";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";

export const addProblemStore = create((set) => ({
  isLoading: false,

  onSubmit: async (value) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post("/problems/create-problem", value);
      toast.success(res.data.message || "Problem created successfully");
    } catch (error) {
      console.log("Error creating problem", error);
      toast.error("Error creating problem");
    } finally {
      set({ isLoading: false });
    }
  },
}));
