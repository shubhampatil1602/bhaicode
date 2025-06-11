import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
  Calendar,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Runtime</TableHead>
              <TableHead>Memory</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className='h-6 w-24' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6 w-16' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6 w-16' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6 w-16' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6 w-24' />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  // No submissions state
  if (!submissions?.length) {
    return (
      <div className='text-center text-muted-foreground'>
        No submissions yet
      </div>
    );
  }

  return (
    <div className='rounded-md border border-neutral-200 dark:border-neutral-800'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Runtime</TableHead>
            <TableHead>Memory</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => {
            const avgMemory = calculateAverageMemory(submission.memory);
            const avgTime = calculateAverageTime(submission.time);

            return (
              <TableRow key={submission.id} className='hover:bg-muted/50'>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  <Badge variant='secondary' className='font-mono'>
                    {submission.language}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-1.5 text-muted-foreground'>
                    <Clock className='w-4 h-4' />
                    <span className='text-sm'>{avgTime.toFixed(3)} s</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-1.5 text-muted-foreground'>
                    <Memory className='w-4 h-4' />
                    <span className='text-sm'>{avgMemory.toFixed(0)} KB</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-1.5 text-muted-foreground'>
                    <Calendar className='w-4 h-4' />
                    <span className='text-sm'>
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
