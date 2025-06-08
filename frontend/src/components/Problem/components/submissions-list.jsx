import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export const SubmissionsList = ({ submissions, isLoading }) => {
  // Helper function to safely parse JSON strings
  const safeParse = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing data:", error);
      return [];
    }
  };

  // Helper function to calculate average memory usage
  const calculateAverageMemory = (memoryData) => {
    const memoryArray = safeParse(memoryData).map((m) =>
      parseFloat(m.split(" ")[0])
    );
    if (memoryArray.length === 0) return 0;
    return (
      memoryArray.reduce((acc, curr) => acc + curr, 0) / memoryArray.length
    );
  };

  // Helper function to calculate average runtime
  const calculateAverageTime = (timeData) => {
    const timeArray = safeParse(timeData).map((t) =>
      parseFloat(t.split(" ")[0])
    );
    if (timeArray.length === 0) return 0;
    return timeArray.reduce((acc, curr) => acc + curr, 0) / timeArray.length;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className='space-y-4'>
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <Skeleton className='h-6 w-24' />
                  <Skeleton className='h-6 w-16' />
                </div>
                <div className='flex items-center gap-4'>
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-4 w-24' />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // No submissions state
  if (!submissions?.length) {
    return (
      <Card>
        <CardContent className='p-8'>
          <div className='text-center text-muted-foreground'>
            No submissions yet
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-4'>
      {submissions.map((submission) => {
        const avgMemory = calculateAverageMemory(submission.memory);
        const avgTime = calculateAverageTime(submission.time);

        return (
          <Card key={submission.id} className='transition-all hover:shadow-md'>
            <CardContent>
              <div className='flex items-center justify-between'>
                {/* Left Section: Status and Language */}
                <div className='flex items-center gap-4'>
                  {submission.status === "Accepted" ? (
                    <div className='flex items-center gap-2 text-green-600'>
                      <CheckCircle2 className='w-5 h-5' />
                      <span className='font-medium'>Accepted</span>
                    </div>
                  ) : (
                    <div className='flex items-center gap-2 text-red-600'>
                      <XCircle className='w-5 h-5' />
                      <span className='font-medium'>{submission.status}</span>
                    </div>
                  )}
                  <Badge variant='secondary' className='font-mono'>
                    {submission.language}
                  </Badge>
                </div>

                {/* Right Section: Runtime, Memory, and Date */}
                <div className='flex items-center gap-6 text-muted-foreground'>
                  <div className='flex items-center gap-1.5'>
                    <Clock className='w-4 h-4' />
                    <span className='text-sm'>{avgTime.toFixed(3)} s</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <Memory className='w-4 h-4' />
                    <span className='text-sm'>{avgMemory.toFixed(0)} KB</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <Calendar className='w-4 h-4' />
                    <span className='text-sm'>
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
