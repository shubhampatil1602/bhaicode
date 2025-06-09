import { useState, useEffect } from "react";
import { useProblemStore } from "@/store/useProblemStore";
import { useSubmissionStore } from "@/store/useSubmissionStore";
import { useExecutionStore } from "@/store/useExecutionStore";
import { ProblemContent } from "./components/problem-content";
import { ProblemLoading } from "./components/problem-loading";
import { getLanguageId } from "./utils/languageUtils";

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

  const { executeCode, submission, isExecuting, clearSubmission } =
    useExecutionStore();

  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
    clearSubmission();
  }, [id, clearSubmission]);

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
  }, [problem, selectedLanguage, clearSubmission]);

  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id]);

  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
    setCode(problem.codeSnippet?.[value.toUpperCase()] || "");
  };

  const handleRunCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      executeCode(code, language_id, stdin, expected_outputs, id);
    } catch (error) {
      console.log("Error executing code", error);
    }
  };

  if (isProblemLoading || !problem) {
    return <ProblemLoading />;
  }

  return (
    <div className='h-full w-full'>
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
        isExecuting={isExecuting}
        testCases={testCases}
        submission={submission}
      />
    </div>
  );
};
