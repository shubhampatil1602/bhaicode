import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useExecutionStore = create((set) => ({
  isExecuting: false,
  submission: null,

  clearSubmission: () => {
    set({ submission: null });
  },

  executeCode: async (
    source_code,
    language_id,
    stdin,
    expected_outputs,
    problemId
  ) => {
    try {
      set({ isExecuting: true, submission: null });
      const response = await axiosInstance.post("/execute-code", {
        source_code,
        language_id,
        stdin,
        expected_outputs,
        problemId,
      });
      set({ submission: response.data.submission });
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while executing the code");
    } finally {
      set({ isExecuting: false });
    }
  },
}));
