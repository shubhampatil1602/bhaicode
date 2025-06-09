import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { isEqual } from "lodash";
import { Loader } from "lucide-react";

import { useProblemStore } from "@/store/useProblemStore";
import { problemSchema } from "../AddProblemForm/utils/schema";
import { defaultValues } from "../AddProblemForm/utils/default-values";
import { Card, CardContent } from "@/components/ui/card";
import { FormHeader } from "../AddProblemForm/components/form-header";
import { Form } from "../AddProblemForm/components/form";
import { ConfirmationDialog } from "./components/confirmation-dialog";
import { ProblemLoading } from "../Problem/components/problem-loading";

export const EditProblemForm = ({ problemId }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  const { getProblemById, updateProblem, problem, isProblemLoading } =
    useProblemStore();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: defaultValues,
  });

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replaceTestCases,
  } = useFieldArray({
    control,
    name: "testcases",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: replaceTags,
  } = useFieldArray({
    control,
    name: "tags",
  });

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

  const resetForm = () => {
    if (problem) {
      reset({
        ...problem,
        hints: problem.hints || "",
        editorial: problem.editorial || "",
      });
    }
  };

  if (isProblemLoading) {
    return <ProblemLoading />;
  }

  return (
    <div className='container mx-auto py-4 px-1 w-[400px] sm:py-6 sm:px-4 sm:w-xl md:w-2xl lg:w-7xl max-w-7xl'>
      <div className='p-3 sm:p-6'>
        <FormHeader isEdit={true} resetForm={resetForm} />

        <Form
          register={register}
          control={control}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isLoading={isProblemLoading}
          testCaseFields={testCaseFields}
          appendTestCase={appendTestCase}
          removeTestCase={removeTestCase}
          tagFields={tagFields}
          appendTag={appendTag}
          removeTag={removeTag}
          isEdit={true}
        />

        <ConfirmationDialog
          showConfirmDialog={showConfirmDialog}
          setShowConfirmDialog={setShowConfirmDialog}
          handleConfirmUpdate={handleConfirmUpdate}
        />
      </div>
    </div>
  );
};
