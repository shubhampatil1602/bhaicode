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
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <CheckCircle2 className='h-5 w-5 text-primary' />
          <h3 className='text-base font-semibold text-foreground'>
            Test Cases
          </h3>
        </div>
        <Button
          type='button'
          size='sm'
          onClick={() => appendTestCase({ input: "", output: "" })}
        >
          <Plus className='h-4 w-4 mr-1' /> Add Test Case
        </Button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {testCaseFields.map((field, index) => (
          <div key={field.id}>
            <div className='flex justify-between items-center mb-4'>
              <h4 className='text-base font-semibold text-foreground'>
                Test Case #{index + 1}
              </h4>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => removeTestCase(index)}
                disabled={testCaseFields.length === 1}
                className='text-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200'
              >
                <Trash2 className='h-4 w-4 mr-1' /> Remove
              </Button>
            </div>

            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label className='text-base font-medium text-foreground'>
                  Input
                </Label>
                <Textarea
                  className='min-h-24 text-base focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-y bg-white'
                  {...register(`testcases.${index}.input`)}
                  placeholder='Enter test case input'
                />
                {errors.testcases?.[index]?.input && (
                  <p className='text-sm text-destructive font-medium'>
                    {errors.testcases[index].input.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label className='text-base font-medium text-foreground'>
                  Expected Output
                </Label>
                <Textarea
                  className='min-h-24 text-base focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-y bg-white'
                  {...register(`testcases.${index}.output`)}
                  placeholder='Enter expected output'
                />
                {errors.testcases?.[index]?.output && (
                  <p className='text-sm text-destructive font-medium'>
                    {errors.testcases[index].output.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
