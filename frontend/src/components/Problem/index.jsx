import { useState, useEffect } from "react";
import { useProblemStore } from "@/store/useProblemStore";
import { useSubmissionStore } from "@/store/useSubmissionStore";
import { useExecutionStore } from "@/store/useExecutionStore";
import { ProblemContent } from "./components/problem-content";
import { ProblemLoading } from "./components/problem-loading";
import { getLanguageId } from "./utils/languageUtils";
import { Button } from "../ui/button";
import { Loader, Play, CheckCircle, XCircle } from "lucide-react";

export const Problem = ({ id }) => {
  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [testCases, setTestCases] = useState([]);

  const { getProblemById, problem, isProblemLoading } = useProblemStore();

  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();

  const {
    runCode,
    submitCode,
    submission,
    runResults,
    isRunning,
    isSubmitting,
    clearSubmission,
    clearRunResults,
  } = useExecutionStore();

  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
    clearSubmission();
    clearRunResults();
  }, [id, clearSubmission, clearRunResults]);

  useEffect(() => {
    if (problem) {
      setCode(problem.codeSnippet?.[selectedLanguage.toUpperCase()] || "");
      setTestCases(
        problem.testcases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );
    }
  }, [problem, selectedLanguage]);

  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id]);

  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
    setCode(problem.codeSnippet?.[value.toUpperCase()] || "");
  };

  const handleRunCode = async (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      await runCode(code, language_id, stdin, expected_outputs);
    } catch (error) {
      console.log("Error running code", error);
    }
  };

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      await submitCode(code, language_id, stdin, expected_outputs, id);
    } catch (error) {
      console.log("Error submitting code", error);
    }
  };

  const getRunButtonContent = () => {
    if (isRunning) {
      return <Loader className='size-4 animate-spin' />;
    }
    if (runResults) {
      const allPassed = runResults.every((result) => result.passed);
      return allPassed ? (
        <CheckCircle className='w-4 h-4 text-green-500' />
      ) : (
        <XCircle className='w-4 h-4 text-red-500' />
      );
    }
    return <Play className='w-4 h-4' />;
  };

  if (isProblemLoading || !problem) {
    return <ProblemLoading />;
  }

  return (
    <div className='h-full w-full'>
      <div className='p-4'>
        <div className='flex justify-center items-center gap-2'>
          <Button
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting}
            className='gap-2'
            variant='outline'
          >
            {getRunButtonContent()}
            Run Code
          </Button>
          <Button
            onClick={handleSubmitCode}
            disabled={isRunning || isSubmitting}
            variant='default'
            className='gap-2'
          >
            {isSubmitting && <Loader className='size-4 animate-spin' />}
            Submit Solution
          </Button>
        </div>
      </div>
      <ProblemContent
        onLanguageChange={handleLanguageChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        problem={problem}
        submissionCount={submissionCount}
        submissions={submissions}
        isSubmissionsLoading={isSubmissionsLoading}
        code={code}
        setCode={setCode}
        selectedLanguage={selectedLanguage}
        handleRunCode={handleRunCode}
        isRunning={isRunning}
        isSubmitting={isSubmitting}
        testCases={testCases}
        submission={submission}
        runResults={runResults}
      />
    </div>
  );
};
