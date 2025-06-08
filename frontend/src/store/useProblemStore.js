import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

export const useProblemStore = create((set) => ({
  problems: [],
  problem: null,
  solvedProblems: [],
  isProblemsLoading: false,
  isProblemLoading: false,

  createProblem: async () => {
    try {
      set({ isProblemsLoading: true });
      const response = await axiosInstance.post("/create-problem");
      set((state) => ({
        problems: [...state.problems, response.data],
        isProblemsLoading: false,
      }));
      toast.success("Problem created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      set({ isProblemsLoading: false });
    }
  },

  getAllProblems: async () => {
    try {
      set({ isProblemsLoading: true });
      const response = await axiosInstance.get("/problems/get-all-problems");
      set({ problems: response.data.problems });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching problems");
    } finally {
      set({ isProblemsLoading: false });
    }
  },

  getProblemById: async (id) => {
    try {
      set({ isProblemLoading: true });
      const response = await axiosInstance.get(`/problems/get-problem/${id}`);
      set({ problem: response.data.problem });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching the problem");
    } finally {
      set({ isProblemLoading: false });
    }
  },

  updateProblem: async (id) => {
    try {
      set({ isProblemLoading: true });
      const response = await axiosInstance.put(
        `/problems/update-problem/${id}`
      );
      set((state) => ({
        problems: state.problems.map((problem) =>
          problem.id === response.data.problem.id
            ? response.data.problem
            : problem
        ),
        isProblemLoading: false,
      }));
      toast.success("Problem updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating the problem");
    } finally {
      set({ isProblemLoading: false });
    }
  },

  deleteProblem: async (id) => {
    try {
      set({ isProblemLoading: true });
      const response = await axiosInstance.delete(
        `/problems/delete-problem/${id}`
      );
      set((state) => ({
        problems: state.problems.filter(
          (problem) => problem.id !== response.data.id
        ),
        isProblemLoading: false,
      }));
      toast.success("Problem deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting the problem");
    } finally {
      set({ isProblemLoading: false });
    }
  },

  getAllProblemsSolvedByUser: async () => {
    try {
      set({ isProblemsLoading: true });
      const response = await axiosInstance.get("/problems/get-solved-problems");
      set({ solvedProblems: response.data.problems });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching solved problems");
    } finally {
      set({ isProblemsLoading: false });
    }
  },
}));
