import { CheckCircle2, Clock } from "lucide-react";

export const ProblemHeader = ({ problem, submissionCount }) => {
  return (
    <div className='flex items-center justify-between'>
      <h1 className='text-xl font-bold'>{problem.title}</h1>
      <div className='flex items-center gap-1 text-sm text-muted-foreground'>
        <CheckCircle2 className='w-4 h-4' />
        <span>{submissionCount} Submissions</span>
      </div>
    </div>
  );
};

{
  /* <div className='flex items-center gap-2 text-sm text-muted-foreground pr-10'>
  <Clock className='w-4 h-4' />
  <span>
    Updated{" "}
    {new Date(problem.createdAt).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
  </span>
</div> */
}
