import { CheckCircle2, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestCases } from "./test-cases";
import { Tags } from "./tags";
import { LanguageSection } from "./language-section";
import { BasicInfo } from "./basic-info";
import { AdditionalInfo } from "./additional-info";

export const Form = ({
  register,
  control,
  errors,
  handleSubmit,
  onSubmit,
  isLoading,
  testCaseFields,
  appendTestCase,
  removeTestCase,
  tagFields,
  appendTag,
  removeTag,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 sm:space-y-6'>
      <BasicInfo register={register} control={control} errors={errors} />

      <Tags
        tagFields={tagFields}
        register={register}
        errors={errors}
        appendTag={appendTag}
        removeTag={removeTag}
      />

      <TestCases
        testCaseFields={testCaseFields}
        register={register}
        errors={errors}
        appendTestCase={appendTestCase}
        removeTestCase={removeTestCase}
      />

      <div className='space-y-4 sm:space-y-6'>
        {["JAVASCRIPT", "PYTHON", "JAVA"].map((language) => (
          <LanguageSection
            key={language}
            language={language}
            control={control}
            register={register}
          />
        ))}
      </div>

      <AdditionalInfo register={register} />

      <div className='flex justify-end pt-4 border-t'>
        <Button type='submit' size='lg' className='w-full sm:w-auto gap-2'>
          {isLoading ? (
            <Loader className='size-5 text-white animate-spin' />
          ) : (
            <>
              <CheckCircle2 className='h-5 w-5 text-white' />
              Create Problem
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
