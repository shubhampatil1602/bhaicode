import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { isEqual } from "lodash";
import { useProblemStore } from "@/store/useProblemStore";
import { ProblemLoading } from "../Problem/components/problem-loading";
import { Form } from "../Form";
import { FormHeader } from "../Form/components/form-header";
import { FormProvider, useFormContext } from "../Form/context/form-context";
import { ConfirmationDialog } from "./components/confirmation-dialog";

const EditProblemFormContent = ({ problemId }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  const { getProblemById, updateProblem, problem, isProblemLoading } =
    useProblemStore();

  const { reset, isDirty, replaceTestCases, replaceTags } = useFormContext();

  useEffect(() => {
    getProblemById(problemId);
  }, [problemId, getProblemById]);

  useEffect(() => {
    if (problem) {
      // Replace arrays
      replaceTags(problem.tags.map((tag) => tag));
      replaceTestCases(problem.testcases.map((tc) => tc));
      // Reset the form with problem data, ensuring optional fields have default values
      const initialData = {
        ...problem,
        hints: problem.hints || "",
        editorial: problem.editorial || "",
      };
      reset(initialData);
      setFormData(initialData);
    }
  }, [problem, reset, replaceTags, replaceTestCases]);

  const onSubmit = async (value) => {
    // Check if there are any changes
    if (!isDirty) {
      toast.info("No changes were made to the problem");
      navigate("/");
      return;
    }

    // Check if the data is actually different from the original
    if (isEqual(value, formData)) {
      toast.info("No changes were made to the problem");
      navigate("/");
      return;
    }

    setShowConfirmDialog(true);
    setFormData(value);
  };

  const handleConfirmUpdate = async () => {
    try {
      await updateProblem(problemId, formData);
      navigate("/");
    } catch (error) {
      console.log("Error updating problem", error);
      toast.error("Error updating problem");
    } finally {
      setShowConfirmDialog(false);
    }
  };

  if (isProblemLoading) {
    return <ProblemLoading />;
  }

  return (
    <div className='container mx-auto py-4 px-1 w-[400px] sm:py-6 sm:px-4 sm:w-xl md:w-2xl lg:w-7xl max-w-7xl'>
      <div className='p-3 sm:p-6'>
        <FormHeader isEdit={true} />
        <Form handleFormSubmit={onSubmit} isEdit={true} />
        <ConfirmationDialog
          showConfirmDialog={showConfirmDialog}
          setShowConfirmDialog={setShowConfirmDialog}
          handleConfirmUpdate={handleConfirmUpdate}
        />
      </div>
    </div>
  );
};

export const EditProblemForm = ({ problemId }) => {
  return (
    <FormProvider>
      <EditProblemFormContent problemId={problemId} />
    </FormProvider>
  );
};
