import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { axiosInstance } from "@/lib/axios";
import { problemSchema } from "./utils/schema";
import { sampleProblemData } from "./utils/sample-problem-data";
import { sampleStringProblem } from "./utils/sample-string-data";
import { defaultValues } from "./utils/default-values";

import { Card, CardContent } from "@/components/ui/card";
import { FormHeader } from "./components/form-header";
import { Form } from "./components/form";

export const AddProblemForm = () => {
  const [sampleType, setSampleType] = useState("DP");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
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

  const onSubmit = async (value) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post("/problems/create-problem", value);
      toast.success(res.data.message || "Problem created successfully");
      navigate("/");
    } catch (error) {
      console.log("Error creating problem", error);
      toast.error("Error creating problem");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleData = () => {
    const sampleData =
      sampleType === "DP" ? sampleProblemData : sampleStringProblem;

    // Replace arrays
    replaceTags(sampleData.tags.map((tag) => tag));
    replaceTestCases(sampleData.testcases.map((tc) => tc));
    // Reset the form with sample data
    reset(sampleData);
  };

  const resetForm = () => {
    reset(defaultValues);
  };

  return (
    <div className='container mx-auto py-4 px-1 w-[400px] sm:py-6 sm:px-4 sm:w-xl md:w-2xl lg:w-[54.8rem] max-w-7xl'>
      <Card>
        <CardContent className='p-3 sm:p-6'>
          <FormHeader
            sampleType={sampleType}
            setSampleType={setSampleType}
            loadSampleData={loadSampleData}
            resetForm={resetForm}
          />

          <Form
            register={register}
            control={control}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isLoading={isLoading}
            testCaseFields={testCaseFields}
            appendTestCase={appendTestCase}
            removeTestCase={removeTestCase}
            tagFields={tagFields}
            appendTag={appendTag}
            removeTag={removeTag}
          />
        </CardContent>
      </Card>
    </div>
  );
};
