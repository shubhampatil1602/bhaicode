import { create } from "zustand";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";

export const useSubmissionStore = create((set) => ({
  isLoading: null,
  submissions: [],
  submission: null,
  submissionCount: null,

  getAllSubmissions: async () => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get(
        "/submission/get-all-submissions"
      );
      set({ submissions: response.data.submissions });
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast.error("Failed to fetch submissions");
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionForProblem: async (problemId) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get(
        `/submission/get-submission/${problemId}`
      );
      set({ submission: response.data.submissions });
    } catch (error) {
      console.error("Error fetching submission for problem:", error);
      toast.error("Failed to fetch submission for problem");
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionCountForProblem: async (problemId) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get(
        `/submission/get-submissionsCount/${problemId}`
      );
      set({ submissionCount: response.data.count });
    } catch (error) {
      console.error("Error fetching submission count for problem:", error);
      toast.error("Failed to fetch submission count for problem");
    } finally {
      set({ isLoading: false });
    }
  },
}));
