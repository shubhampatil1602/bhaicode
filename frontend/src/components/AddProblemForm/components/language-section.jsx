import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Code2, CheckCircle2, FileCode2 } from "lucide-react";
import { CodeEditor } from "./code-editor";

export const LanguageSection = ({ language, control, register }) => {
  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-2'>
        <Code2 className='h-5 w-5 text-primary' />
        <h3 className='text-base font-semibold text-foreground'>{language}</h3>
      </div>

      <div className='space-y-6'>
        {/* Starter Code */}
        <div className='rounded-lg p-4 hover:bg-neutral-50 dark:bg-neutral-900'>
          <div className='flex items-center gap-2 mb-4'>
            <FileCode2 className='h-5 w-5 text-primary' />
            <h4 className='text-base font-semibold text-primary'>
              Starter Code Template
            </h4>
          </div>
          <CodeEditor
            control={control}
            name={`codeSnippet.${language}`}
            language={language}
          />
        </div>

        {/* Reference Solution */}
        <div className='rounded-lg p-4 hover:bg-neutral-50 dark:bg-neutral-900'>
          <div className='flex items-center gap-2 mb-4'>
            <CheckCircle2 className='h-5 w-5 text-success' />
            <h4 className='text-base font-semibold text-primary'>
              Reference Solution
            </h4>
          </div>
          <CodeEditor
            control={control}
            name={`referenceSolutions.${language}`}
            language={language}
          />
        </div>

        {/* Examples */}
        <div className='rounded-lg p-4 hover:bg-neutral-50 dark:bg-neutral-900'>
          <h4 className='text-base font-semibold text-foreground mb-4'>
            Example
          </h4>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label className='text-base font-medium text-foreground'>
                Input
              </Label>
              <Textarea
                className='min-h-24 text-base focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-y bg-white'
                {...register(`examples.${language}.input`)}
                placeholder='Example input'
              />
            </div>
            <div className='space-y-2'>
              <Label className='text-base font-medium text-foreground'>
                Output
              </Label>
              <Textarea
                className='min-h-24 text-base focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-y bg-white'
                {...register(`examples.${language}.output`)}
                placeholder='Example output'
              />
            </div>
            <div className='space-y-2 lg:col-span-2'>
              <Label className='text-base font-medium text-foreground'>
                Explanation
              </Label>
              <Textarea
                className='min-h-32 text-base focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-y bg-white'
                {...register(`examples.${language}.explanation`)}
                placeholder='Explain the example'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
