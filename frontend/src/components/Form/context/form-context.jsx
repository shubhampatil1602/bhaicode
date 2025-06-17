import { createContext, useContext, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { problemSchema } from "../utils/schema";
import { defaultValues } from "../utils/default-values";
import { sampleProblemData } from "../utils/sample-problem-data";
import { sampleStringProblem } from "../utils/sample-string-data";

const FormContext = createContext(null);

export const FormProvider = ({ children, initialData = null }) => {
  const [sampleType, setSampleType] = useState("DP");

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

  const loadSampleData = () => {
    const sampleData =
      sampleType === "DP" ? sampleProblemData : sampleStringProblem;
    replaceTags(sampleData.tags);
    replaceTestCases(sampleData.testcases);
    reset(sampleData);
  };

  const resetForm = () => {
    reset(defaultValues);
  };

  const editResetForm = (problem) => {
    if (problem) {
      reset({
        ...problem,
        hints: problem.hints || "",
        editorial: problem.editorial || "",
      });
    }
  };

  const handleSetSampleType = (type) => {
    setSampleType(type);
  };

  const value = {
    // Form controls
    register,
    control,
    handleSubmit,
    reset,
    errors,
    isDirty,

    // Test cases
    testCaseFields,
    appendTestCase,
    removeTestCase,
    replaceTestCases,

    // Tags
    tagFields,
    appendTag,
    removeTag,
    replaceTags,

    // Sample data
    sampleType,
    handleSetSampleType,
    loadSampleData,
    resetForm,
    editResetForm,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
