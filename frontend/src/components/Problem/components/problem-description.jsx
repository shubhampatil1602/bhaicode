import { cn } from "@/lib/utils";
import { ProblemHeader } from "./problem-header";

export const ProblemDescription = ({ problem, submissionCount }) => {
  return (
    <div className='prose max-w-none'>
      <ProblemHeader problem={problem} submissionCount={submissionCount} />
      <ProblemDifficulty difficulty={problem.difficulty} />

      <div className='space-y-6'>
        <p className='text-sm leading-relaxed'>Q. {problem.description}</p>

        {problem.examples && (
          <div className='space-y-4 my-10'>
            {Object.entries(problem.examples).map(([lang, example], idx) => (
              <div key={lang} className='space-y-2'>
                <div className='font-bold text-sm mb-2'>Example {idx + 1}:</div>

                <div className='border-l-2 border-neutral-200 dark:border-neutral-700 pl-3 ml-1 '>
                  <div>
                    <div className='text-sm font-medium font-mono '>
                      Input: {example.input}
                    </div>

                    <div className='text-sm font-medium font-mono'>
                      Output: {example.output}
                    </div>

                    {example.explanation && (
                      <div className='text-sm font-medium font-mono'>
                        Explanation: {example.explanation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {problem.constraints && (
          <div className='space-y-4'>
            <h3 className='text-sm font-semibold'>Constraints:</h3>
            <div className='rounded-xl w-fit text-sm border border-neutral-200 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 px-3 py-0.5 font-medium text-foreground'>
              {problem.constraints}
            </div>
          </div>
        )}

        {problem.hints && (
          <div className='space-y-4'>
            <h3 className='text-sm font-semibold'>Hints:</h3>
            <div className='rounded-xl w-fit text-sm border border-neutral-200 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 px-3 py-0.5 font-medium text-foreground'>
              {problem.hints}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ProblemDifficulty = ({ difficulty }) => {
  return (
    <div className='flex items-center gap-2 py-3'>
      <span
        className={cn(
          "px-3 py-1 rounded-full text-xs font-medium",
          difficulty === "EASY" && "bg-green-100 text-green-800",
          difficulty === "MEDIUM" && "bg-yellow-100 text-yellow-800",
          difficulty === "HARD" && "bg-red-100 text-red-800"
        )}
      >
        {difficulty}
      </span>
    </div>
  );
};
