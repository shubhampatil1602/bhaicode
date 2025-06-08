import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export const SubmissionResults = ({ submission }) => {
  // Parse stringified arrays
  const memoryArr = JSON.parse(submission.memory || "[]");
  const timeArr = JSON.parse(submission.time || "[]");

  // Calculate averages
  const avgMemory =
    memoryArr.map((m) => parseFloat(m)).reduce((a, b) => a + b, 0) /
    memoryArr.length;

  const avgTime =
    timeArr.map((t) => parseFloat(t)).reduce((a, b) => a + b, 0) /
    timeArr.length;

  const passedTests = submission.testCases.filter((tc) => tc.passed).length;
  const totalTests = submission.testCases.length;
  const successRate = (passedTests / totalTests) * 100;

  return (
    <div className='space-y-6 my-6'>
      {/* Overall Status */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='p-6 rounded-lg border bg-card'>
          <div className='flex flex-col space-y-2'>
            <h3 className='text-sm font-medium text-muted-foreground'>
              Status
            </h3>
            <div
              className={cn(
                "text-2xl font-bold",
                submission.status === "Accepted"
                  ? "text-green-600"
                  : "text-red-600"
              )}
            >
              {submission.status}
            </div>
          </div>
        </div>

        <div className='p-6 rounded-lg border bg-card'>
          <div className='flex flex-col space-y-2'>
            <h3 className='text-sm font-medium text-muted-foreground'>
              Success Rate
            </h3>
            <div className='space-y-2'>
              <div className='text-2xl font-bold'>
                {successRate.toFixed(1)}%
              </div>
              <Progress value={successRate} className='h-2' />
            </div>
          </div>
        </div>

        <div className='p-6 rounded-lg border bg-card'>
          <div className='flex flex-col space-y-2'>
            <h3 className='text-sm font-medium text-muted-foreground flex items-center gap-2'>
              <Clock className='w-4 h-4' />
              Avg. Runtime
            </h3>
            <div className='text-2xl font-bold'>{avgTime.toFixed(3)} s</div>
          </div>
        </div>

        <div className='p-6 rounded-lg border bg-card'>
          <div className='flex flex-col space-y-2'>
            <h3 className='text-sm font-medium text-muted-foreground flex items-center gap-2'>
              <Memory className='w-4 h-4' />
              Avg. Memory
            </h3>
            <div className='text-2xl font-bold'>{avgMemory.toFixed(0)} KB</div>
          </div>
        </div>
      </div>

      {/* Test Cases Results */}
      <div>
        <div className='mb-4'>
          <h3 className='text-xl font-semibold'>Test Cases Results</h3>
        </div>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Expected Output</TableHead>
                <TableHead>Your Output</TableHead>
                <TableHead>Memory</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submission.testCases.map((testCase) => (
                <TableRow key={testCase.id}>
                  <TableCell>
                    {testCase.passed ? (
                      <div className='flex items-center gap-2 text-green-600'>
                        <CheckCircle2 className='w-5 h-5' />
                        <span className='font-medium'>Passed</span>
                      </div>
                    ) : (
                      <div className='flex items-center gap-2 text-red-600'>
                        <XCircle className='w-5 h-5' />
                        <span className='font-medium'>Failed</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className='font-mono text-sm'>
                    {testCase.expected}
                  </TableCell>
                  <TableCell className='font-mono text-sm'>
                    {testCase.stdout || "null"}
                  </TableCell>
                  <TableCell className='text-sm'>{testCase.memory}</TableCell>
                  <TableCell className='text-sm'>{testCase.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
