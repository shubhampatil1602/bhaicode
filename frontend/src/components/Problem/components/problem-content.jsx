import { Resizable } from "re-resizable";
import { ProblemTabs } from "./problem-tabs";
import { ProblemEditor } from "./problem-editor";
import { ProblemTestCases } from "./problem-test-cases";

export const ProblemContent = ({
  activeTab,
  setActiveTab,
  problem,
  submissionCount,
  submissions,
  isSubmissionsLoading,
  code,
  setCode,
  selectedLanguage,
  handleRunCode,
  isExecuting,
  testCases,
  submission,
  onLanguageChange,
}) => {
  return (
    <div className='mx-auto w-full max-full px-3'>
      <div className='flex gap-2 h-[calc(100vh-8rem)]'>
        <Resizable
          defaultSize={{ width: "50%", height: "100%" }}
          enable={{ right: true }}
          className='min-w-[30%] max-w-[70%]'
          handleStyles={{
            right: {
              width: "4px",
              right: "-2px",
              cursor: "col-resize",
              backgroundColor: "hsl(var(--border))",
              "&:hover": {
                backgroundColor: "hsl(var(--primary))",
              },
            },
          }}
        >
          <div className='h-full bg-background overflow-y-auto border border-neutral-200 dark:border-neutral-800 rounded-lg'>
            <ProblemTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              problem={problem}
              submissionCount={submissionCount}
              submissions={submissions}
              isSubmissionsLoading={isSubmissionsLoading}
            />
          </div>
        </Resizable>

        <div className='flex-1 bg-background overflow-hidden border border-neutral-200 dark:border-neutral-800 rounded-lg'>
          <ProblemEditor
            code={code}
            onCodeChange={setCode}
            selectedLanguage={selectedLanguage}
            onRunCode={handleRunCode}
            isExecuting={isExecuting}
            problem={problem}
            onLanguageChange={onLanguageChange}
          />
        </div>
      </div>

      <ProblemTestCases testCases={testCases} submission={submission} />
    </div>
  );
};
