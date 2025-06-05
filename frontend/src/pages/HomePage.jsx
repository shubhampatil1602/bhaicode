import { useEffect } from "react";
import { useProblemStore } from "@/store/useProblemStore";
import { AllProblems } from "@/components/AllProblems";

const HomePage = () => {
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  if (isProblemsLoading) {
    return <div>TODO: Add shimmer card</div>;
  }

  console.log(problems);
  return (
    <section className='w-full flex flex-col items-center justify-center  px-4'>
      <h1 className='text-4xl font-extrabold z-10 text-center'>
        Welcome to <span className='text-primary'>Bhaicode</span>
      </h1>
      <p className='mt-4 text-center text-lg font-semibold text-neutral-500 dark:text-neutral-400 z-10'>
        A Platform Inspired by Leetcode which helps you to prepare for coding
        interviews and helps you to improve your coding skills by solving coding
        problems
      </p>

      {!!problems.length > 0 ? (
        <AllProblems problems={problems} />
      ) : (
        <div className='mt-8 text-center'>
          <p className='text-sm text-neutral-500 dark:text-neutral-400'>
            No problems available at the moment. Please check back later.
          </p>
        </div>
      )}
    </section>
  );
};

export default HomePage;
