import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle } from "lucide-react";

export const ProblemTestCases = ({ testCases, runResults, submission }) => {
  const getTestStatus = (index) => {
    if (runResults) {
      const result = runResults[index];
      if (!result) return null;
      return result.passed ? "passed" : "failed";
    }
    if (submission?.testCases) {
      const result = submission.testCases[index];
      if (!result) return null;
      return result.passed ? "passed" : "failed";
    }
    return null;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "passed":
        return "text-green-500";
      case "failed":
        return "text-red-500";
      default:
        return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "passed":
        return <CheckCircle className='w-4 h-4 text-green-500' />;
      case "failed":
        return <XCircle className='w-4 h-4 text-red-500' />;
      default:
        return null;
    }
  };

  const getOverallStatus = () => {
    if (runResults) {
      const allPassed = runResults.every((result) => result.passed);
      return allPassed ? "passed" : "failed";
    }
    if (submission) {
      return submission.status === "Accepted" ? "passed" : "failed";
    }
    return null;
  };

  const getResults = (index) => {
    if (runResults) {
      return runResults[index];
    }
    if (submission?.testCases) {
      return submission.testCases[index];
    }
    return null;
  };

  return (
    <div className='bg-background relative border border-neutral-200 dark:border-neutral-800 pt-4 px-2 rounded-lg h-full overflow-scroll'>
      <div className='pb-2'>
        <div className='flex items-center justify-between px-1 pb-3'>
          <h3 className='text-xl font-semibold'>Test Cases</h3>
          {(runResults || submission) && (
            <div
              className={`flex items-center gap-2 font-semibold ${getStatusColor(
                getOverallStatus()
              )}`}
            >
              {getStatusIcon(getOverallStatus())}
              {getOverallStatus() === "passed" ? "Accepted" : "Rejected"}
            </div>
          )}
        </div>
        <Tabs defaultValue='test-case-0' className='w-full'>
          <TabsList className='bg-transparent'>
            {testCases.map((_, index) => {
              const status = getTestStatus(index);
              return (
                <TabsTrigger
                  key={index}
                  value={`test-case-${index}`}
                  className={`flex items-center gap-2 ${getStatusColor(
                    status
                  )}`}
                >
                  {getStatusIcon(status)}
                  Case {index + 1}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {testCases.length > 0 ? (
            <>
              {testCases.map((testCase, index) => {
                const result = getResults(index);
                const status = getTestStatus(index);
                return (
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
                        {result && (
                          <>
                            <div>
                              <h4 className='font-semibold'>Your Output:</h4>
                              <pre className='bg-neutral-100 dark:bg-neutral-900 p-2 rounded-md overflow-auto text-sm font-mono'>
                                {result.stdout || "No output"}
                              </pre>
                            </div>
                            {result.stderr && (
                              <div>
                                <h4 className='font-semibold text-red-500'>
                                  Error:
                                </h4>
                                <pre className='bg-red-50 dark:bg-red-900/20 p-2 rounded-md overflow-auto text-sm font-mono text-red-500'>
                                  {result.stderr}
                                </pre>
                              </div>
                            )}
                            <div className='flex items-center gap-2'>
                              <span
                                className={`font-semibold ${getStatusColor(
                                  status
                                )}`}
                              >
                                {status === "passed" ? "Passed" : "Failed"}
                              </span>
                              {result.time && (
                                <span className='text-sm text-neutral-500'>
                                  Time: {result.time}
                                </span>
                              )}
                              {result.memory && (
                                <span className='text-sm text-neutral-500'>
                                  Memory: {result.memory}
                                </span>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                );
              })}
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
