import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const ProblemDescription = ({ problem, submissionCount }) => {
  return (
    <div className='prose max-w-none'>
      <div className='flex items-center gap-2 mb-6'>
        <span
          className={cn(
            "px-3 py-1 rounded-full text-sm font-medium",
            problem.difficulty === "EASY" && "bg-green-100 text-green-800",
            problem.difficulty === "MEDIUM" && "bg-yellow-100 text-yellow-800",
            problem.difficulty === "HARD" && "bg-red-100 text-red-800"
          )}
        >
          {problem.difficulty}
        </span>
        <div className='flex items-center gap-1 text-sm text-muted-foreground'>
          <CheckCircle2 className='w-4 h-4' />
          <span>{submissionCount} Submissions</span>
        </div>
      </div>

      <div className='space-y-6'>
        <p className='text-base leading-relaxed'>Q. {problem.description}</p>

        {problem.examples && (
          <div className='space-y-4'>
            <h3 className='text-xl font-semibold'>Examples:</h3>
            {Object.entries(problem.examples).map(([lang, example]) => (
              <div key={lang} className='bg-muted/50 p-6 rounded-lg space-y-4'>
                <div>
                  <div className='text-primary mb-2 text-base font-medium'>
                    Input:
                  </div>
                  <div className='bg-primary/5 px-4 py-2 rounded-md font-mono text-sm'>
                    {example.input}
                  </div>
                </div>
                <div>
                  <div className='text-primary mb-2 text-base font-medium'>
                    Output:
                  </div>
                  <div className='bg-primary/5 px-4 py-2 rounded-md font-mono text-sm'>
                    {example.output}
                  </div>
                </div>
                {example.explanation && (
                  <div>
                    <div className='text-primary mb-2 text-base font-medium'>
                      Explanation:
                    </div>
                    <p className='text-muted-foreground text-sm leading-relaxed'>
                      {example.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {problem.constraints && (
          <div className='space-y-4'>
            <h3 className='text-xl font-semibold'>Constraints:</h3>
            <div className='bg-muted/50 p-6 rounded-lg'>
              <div className='bg-primary/5 px-4 py-2 rounded-md font-mono text-sm'>
                {problem.constraints}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
