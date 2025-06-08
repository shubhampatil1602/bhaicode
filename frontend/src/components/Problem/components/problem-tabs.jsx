import { FileText, Code2, MessageSquare, Lightbulb } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProblemDescription } from "./problem-description";
import { SubmissionsList } from "./submissions-list";

export const ProblemTabs = ({
  activeTab,
  onTabChange,
  problem,
  submissionCount,
  submissions,
  isSubmissionsLoading,
}) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <ProblemDescription
            problem={problem}
            submissionCount={submissionCount}
          />
        );
      case "submissions":
        return (
          <SubmissionsList
            submissions={submissions}
            isLoading={isSubmissionsLoading}
          />
        );
      case "discussion":
        return (
          <div className='p-4 text-center text-muted-foreground'>
            No discussions yet
          </div>
        );
      case "hints":
        return (
          <div className='p-4'>
            {problem?.hints ? (
              <div className='bg-muted/50 p-6 rounded-lg'>
                <span className='bg-primary/5 px-4 py-1 rounded-md font-semibold text-lg'>
                  {problem.hints}
                </span>
              </div>
            ) : (
              <div className='text-center text-muted-foreground'>
                No hints available
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className='h-full'>
      <TabsList className='flex justify-start rounded-none w-full px-4 bg-white sticky top-0'>
        <TabsTrigger
          value='description'
          className='flex items-center gap-2 px-4 py-3 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary'
        >
          <FileText className='w-4 h-4' />
          Description
        </TabsTrigger>
        <TabsTrigger
          value='submissions'
          className='flex items-center gap-2 px-4 py-3 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary'
        >
          <Code2 className='w-4 h-4' />
          Submissions
        </TabsTrigger>
        <TabsTrigger
          value='discussion'
          className='flex items-center gap-2 px-4 py-3 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary'
        >
          <MessageSquare className='w-4 h-4' />
          Discussion
        </TabsTrigger>
        <TabsTrigger
          value='hints'
          className='flex items-center gap-2 px-4 py-3 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary'
        >
          <Lightbulb className='w-4 h-4' />
          Hints
        </TabsTrigger>
      </TabsList>
      <TabsContent value={activeTab} className='p-3'>
        {renderTabContent()}
      </TabsContent>
    </Tabs>
  );
};
