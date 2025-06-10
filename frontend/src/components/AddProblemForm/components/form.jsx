import { useState } from "react";
import { CheckCircle2, Loader, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  isEdit = false,
}) => {
  const [currentTab, setCurrentTab] = useState("basic");
  const tabs = ["basic", "tags", "testcases", "templates", "additional"];

  const handleNext = () => {
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex < tabs.length - 1) {
      setCurrentTab(tabs[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex > 0) {
      setCurrentTab(tabs[currentIndex - 1]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
      <Tabs value={currentTab} onValueChange={setCurrentTab} className='w-full'>
        <TabsList className='grid w-full grid-cols-5'>
          <TabsTrigger value='basic'>Basic Info</TabsTrigger>
          <TabsTrigger value='tags'>Tags</TabsTrigger>
          <TabsTrigger value='testcases'>Test Cases</TabsTrigger>
          <TabsTrigger value='templates'>Code Templates</TabsTrigger>
          <TabsTrigger value='additional'>Additional</TabsTrigger>
        </TabsList>

        <TabsContent value='basic' className='mt-6'>
          <div className='bg-background rounded-lg p-6'>
            <h2 className='text-xl font-semibold mb-6 text-foreground'>
              Basic Information
            </h2>
            <BasicInfo register={register} control={control} errors={errors} />
          </div>
        </TabsContent>

        <TabsContent value='tags' className='mt-6'>
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
        </TabsContent>

        <TabsContent value='testcases' className='mt-6'>
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
        </TabsContent>

        <TabsContent value='templates' className='mt-6'>
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
        </TabsContent>

        <TabsContent value='additional' className='mt-6'>
          <div className='bg-background rounded-lg p-6'>
            <h2 className='text-xl font-semibold mb-6 text-foreground'>
              Additional Information
            </h2>
            <AdditionalInfo register={register} />
          </div>
        </TabsContent>
      </Tabs>

      <div className='flex justify-end items-center pt-6 gap-4'>
        <Button
          type='button'
          variant='outline'
          size='lg'
          className='gap-2'
          onClick={handlePrev}
          disabled={currentTab === "basic"}
        >
          <ChevronLeft className='h-5 w-5' />
          Previous
        </Button>

        <div className='flex gap-4'>
          <Button
            type='button'
            variant='outline'
            size='lg'
            className='gap-2'
            onClick={handleNext}
            disabled={currentTab === "additional"}
          >
            Next
            <ChevronRight className='h-5 w-5' />
          </Button>

          <Button type='submit' size='lg' className='gap-2'>
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
      </div>
    </form>
  );
};
