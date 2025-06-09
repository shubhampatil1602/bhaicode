import { CheckCircle2, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestCases } from "@/components/AddProblemForm/components/test-cases";
import { Tags } from "@/components/AddProblemForm/components/tags";
import { LanguageSection } from "@/components/AddProblemForm/components/language-section";
import { BasicInfo } from "@/components/AddProblemForm/components/basic-info";
import { AdditionalInfo } from "@/components/AddProblemForm/components/additional-info";

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
  isEdit = false,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
      <div className='bg-background rounded-lg p-6'>
        <h2 className='text-xl font-semibold mb-6 text-foreground'>
          Basic Information
        </h2>
        <BasicInfo register={register} control={control} errors={errors} />
      </div>

      <div className='bg-background rounded-lg p-6'>
        <h2 className='text-xl font-semibold mb-6 text-foreground'>
          Problem Tags
        </h2>
        <Tags
          tagFields={tagFields}
          register={register}
          errors={errors}
          appendTag={appendTag}
          removeTag={removeTag}
        />
      </div>

      <div className='bg-background rounded-lg p-6'>
        <h2 className='text-xl font-semibold mb-6 text-foreground'>
          Test Cases
        </h2>
        <TestCases
          testCaseFields={testCaseFields}
          register={register}
          errors={errors}
          appendTestCase={appendTestCase}
          removeTestCase={removeTestCase}
        />
      </div>

      <div className='bg-background rounded-lg p-6'>
        <h2 className='text-xl font-semibold mb-6 text-foreground'>
          Code Templates
        </h2>
        <div className='space-y-8'>
          {["JAVASCRIPT", "PYTHON", "JAVA"].map((language) => (
            <LanguageSection
              key={language}
              language={language}
              control={control}
              register={register}
            />
          ))}
        </div>
      </div>

      <div className='bg-background rounded-lg p-6'>
        <h2 className='text-xl font-semibold mb-6 text-foreground'>
          Additional Information
        </h2>
        <AdditionalInfo register={register} />
      </div>

      <div className='flex justify-end pt-6'>
        <Button type='submit' size='lg' className='w-full sm:w-auto gap-2'>
          {isLoading ? (
            <Loader className='size-5 animate-spin' />
          ) : (
            <>
              <CheckCircle2 className='h-5 w-5' />
              {isEdit ? "Update Problem" : "Create Problem"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
