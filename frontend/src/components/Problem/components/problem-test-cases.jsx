import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SubmissionResults } from "./submission-results";

export const ProblemTestCases = ({ testCases, submission }) => {
  return (
    <div className='my-6 bg-background'>
      <div className='mb-4'>
        <h3 className='text-xl font-semibold'>Test Cases</h3>
      </div>
      <div className='rounded-md border border-neutral-200 dark:border-neutral-800'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[50%]'>Input</TableHead>
              <TableHead className='w-[50%]'>Expected Output</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testCases.map((testCase, index) => (
              <TableRow key={index}>
                <TableCell className='font-mono text-sm'>
                  {testCase.input}
                </TableCell>
                <TableCell className='font-mono text-sm'>
                  {testCase.output}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {submission && <SubmissionResults submission={submission} />}
    </div>
  );
};
