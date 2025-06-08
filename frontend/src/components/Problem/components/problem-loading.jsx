import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProblemLoading = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-background'>
      <Card className='p-8'>
        <Skeleton className='h-12 w-12 rounded-full' />
        <p className='mt-4 text-muted-foreground'>Loading problem...</p>
      </Card>
    </div>
  );
};
