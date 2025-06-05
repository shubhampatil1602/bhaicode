import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Code2, CheckCircle2 } from "lucide-react";
import { CodeEditor } from "./code-editor";

export const LanguageSection = ({ language, control, register }) => {
  return (
    <Card>
      <CardHeader className='px-3 sm:px-6'>
        <CardTitle className='text-base sm:text-lg font-semibold flex items-center gap-2'>
          <Code2 className='h-4 w-4 sm:h-5 sm:w-5' />
          {language}
        </CardTitle>
      </CardHeader>
      <CardContent className='px-3 sm:px-6 space-y-3 sm:space-y-4'>
        {/* Starter Code */}
        <Card>
          <CardHeader className='px-3 sm:px-6'>
            <CardTitle className='text-sm sm:text-base'>
              Starter Code Template
            </CardTitle>
          </CardHeader>
          <CardContent className='px-3 sm:px-6'>
            <CodeEditor
              control={control}
              name={`codeSnippet.${language}`}
              language={language}
            />
          </CardContent>
        </Card>

        {/* Reference Solution */}
        <Card>
          <CardHeader className='px-3 sm:px-6'>
            <CardTitle className='text-sm sm:text-base flex items-center gap-2'>
              <CheckCircle2 className='h-4 w-4 sm:h-5 sm:w-5 text-success' />
              Reference Solution
            </CardTitle>
          </CardHeader>
          <CardContent className='px-3 sm:px-6'>
            <CodeEditor
              control={control}
              name={`referenceSolutions.${language}`}
              language={language}
            />
          </CardContent>
        </Card>

        {/* Examples */}
        <Card>
          <CardHeader className='px-3 sm:px-6'>
            <CardTitle className='text-sm sm:text-base'>Example</CardTitle>
          </CardHeader>
          <CardContent className='px-3 sm:px-6'>
            <div className='grid grid-cols-1 gap-3 sm:gap-4'>
              <div className='space-y-2'>
                <Label className='text-sm sm:text-base'>Input</Label>
                <Textarea
                  className='min-h-20 text-sm sm:text-base resize-y'
                  {...register(`examples.${language}.input`)}
                  placeholder='Example input'
                />
              </div>
              <div className='space-y-2'>
                <Label className='text-sm sm:text-base'>Output</Label>
                <Textarea
                  className='min-h-20 text-sm sm:text-base resize-y'
                  {...register(`examples.${language}.output`)}
                  placeholder='Example output'
                />
              </div>
              <div className='space-y-2'>
                <Label className='text-sm sm:text-base'>Explanation</Label>
                <Textarea
                  className='min-h-24 text-sm sm:text-base resize-y'
                  {...register(`examples.${language}.explanation`)}
                  placeholder='Explain the example'
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
