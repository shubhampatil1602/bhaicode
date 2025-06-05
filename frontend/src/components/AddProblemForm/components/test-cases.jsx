import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";

export const TestCases = ({
  testCaseFields,
  register,
  errors,
  appendTestCase,
  removeTestCase,
}) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6'>
        <CardTitle className='text-base sm:text-lg font-semibold flex items-center gap-2'>
          <CheckCircle2 className='h-4 w-4 sm:h-5 sm:w-5' />
          Test Cases
        </CardTitle>
        <Button
          type='button'
          size='sm'
          onClick={() => appendTestCase({ input: "", output: "" })}
        >
          <Plus className='h-4 w-4 mr-1' /> Add Test Case
        </Button>
      </CardHeader>
      <CardContent className='px-3 sm:px-6'>
        <div className='space-y-3 sm:space-y-4'>
          {testCaseFields.map((field, index) => (
            <Card key={field.id}>
              <CardContent className='p-3 sm:p-4'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 sm:mb-4'>
                  <h4 className='text-sm sm:text-base font-semibold'>
                    Test Case #{index + 1}
                  </h4>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='text-destructive'
                    onClick={() => removeTestCase(index)}
                    disabled={testCaseFields.length === 1}
                  >
                    <Trash2 className='h-4 w-4 mr-1' /> Remove
                  </Button>
                </div>
                <div className='grid grid-cols-1 gap-3 sm:gap-4'>
                  <div className='space-y-2'>
                    <Label className='text-sm sm:text-base'>Input</Label>
                    <Textarea
                      className='min-h-20 text-sm sm:text-base resize-y'
                      {...register(`testcases.${index}.input`)}
                      placeholder='Enter test case input'
                    />
                    {errors.testcases?.[index]?.input && (
                      <p className='text-xs sm:text-sm text-destructive'>
                        {errors.testcases[index].input.message}
                      </p>
                    )}
                  </div>
                  <div className='space-y-2'>
                    <Label className='text-sm sm:text-base'>
                      Expected Output
                    </Label>
                    <Textarea
                      className='min-h-20 text-sm sm:text-base resize-y'
                      {...register(`testcases.${index}.output`)}
                      placeholder='Enter expected output'
                    />
                    {errors.testcases?.[index]?.output && (
                      <p className='text-xs sm:text-sm text-destructive'>
                        {errors.testcases[index].output.message}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
