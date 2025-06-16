import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useExecutionStore = create((set) => ({
  isRunning: false,
  isSubmitting: false,
  submission: null,
  runResults: null,

  clearSubmission: () => {
    set({ submission: null });
  },

  clearRunResults: () => {
    set({ runResults: null });
  },

  runCode: async (source_code, language_id, stdin, expected_outputs) => {
    try {
      set({ isRunning: true, runResults: null });
      const response = await axiosInstance.post("/execute-code/run", {
        source_code,
        language_id,
        stdin,
        expected_outputs,
      });
      set({ runResults: response.data.results });

      // Check if all test cases passed
      const allPassed = response.data.results.every((result) => result.passed);
      if (allPassed) {
        toast.success("All test cases passed!");
      } else {
        toast.error("Some test cases failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while running the code");
    } finally {
      set({ isRunning: false });
    }
  },

  submitCode: async (
    source_code,
    language_id,
    stdin,
    expected_outputs,
    problemId
  ) => {
    try {
      set({ isSubmitting: true, submission: null });
      const response = await axiosInstance.post("/execute-code/submit", {
        source_code,
        language_id,
        stdin,
        expected_outputs,
        problemId,
      });
      set({ submission: response.data.submission });

      // Check submission status
      if (response.data.submission.status === "Accepted") {
        toast.success("Solution accepted!");
      } else {
        toast.error("Solution rejected");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while submitting the code");
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
