import { ProblemTabs } from "./problem-tabs";
import { ProblemEditor } from "./problem-editor";
import { ProblemTestCases } from "./problem-test-cases";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { SubmissionResults } from "./submission-results";

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
      <div className='h-[calc(100vh-8rem)]'>
        <PanelGroup direction='horizontal'>
          <Panel defaultSize={40} minSize={20}>
            <div className='h-full overflow-y-auto border border-neutral-200 dark:border-neutral-800 rounded-lg mr-'>
              <ProblemTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                problem={problem}
                submissionCount={submissionCount}
                submissions={submissions}
                isSubmissionsLoading={isSubmissionsLoading}
              />
            </div>
          </Panel>
          <PanelResizeHandle className='w-1.5 h-16 relative top-1/2 bg-neutral-300 hover:bg-primary transition-colors flex justify-center items-center' />
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction='vertical'>
              <Panel defaultSize={60} minSize={30}>
                <ProblemEditor
                  code={code}
                  onCodeChange={setCode}
                  selectedLanguage={selectedLanguage}
                  onRunCode={handleRunCode}
                  isExecuting={isExecuting}
                  problem={problem}
                  onLanguageChange={onLanguageChange}
                />
              </Panel>
              <PanelResizeHandle className='w-20 h-1.5 relative left-[45%] bg-neutral-300 hover:bg-primary transition-colors' />
              <Panel defaultSize={40} minSize={20}>
                <ProblemTestCases
                  testCases={testCases}
                  submission={submission}
                />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>

      {submission && <SubmissionResults submission={submission} />}
    </div>
  );
};
