import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ProblemTestCases = ({ testCases }) => {
  return (
    <div className='bg-background relative border border-neutral-200 dark:border-neutral-800 pt-4 px-2 rounded-lg h-full overflow-scroll'>
      <div className='pb-2'>
        <h3 className='text-xl font-semibold px-1 pb-3'>Test Cases</h3>
        <Tabs defaultValue='test-case-0' className='w-full'>
          <TabsList className='bg-transparent'>
            {testCases.map((_, index) => (
              <TabsTrigger key={index} value={`test-case-${index}`}>
                Case {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>
          {testCases.length > 0 ? (
            <>
              {testCases.map((testCase, index) => (
                <TabsContent
                  key={index}
                  value={`test-case-${index}`}
                  className='h-full'
                >
                  <div className='rounded-md border border-neutral-200 dark:border-neutral-800 p-4 h-full overflow-y-auto'>
                    <div className='space-y-4'>
                      <div>
                        <h4 className='font-semibold'>Input:</h4>
                        <pre className='bg-neutral-100 dark:bg-neutral-900 p-2 rounded-md overflow-auto text-sm font-mono'>
                          {testCase.input}
                        </pre>
                      </div>
                      <div>
                        <h4 className='font-semibold'>Expected Output:</h4>
                        <pre className='bg-neutral-100 dark:bg-neutral-900 p-2 rounded-md overflow-auto text-sm font-mono'>
                          {testCase.output}
                        </pre>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </>
          ) : (
            <TabsContent value='no-test-cases' className='h-full'>
              <p className='text-center text-neutral-500 rounded-md border border-neutral-200 dark:border-neutral-800 p-4'>
                No test cases available.
              </p>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};
