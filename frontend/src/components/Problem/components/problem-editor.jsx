import Editor from "@monaco-editor/react";
import { Play, Terminal, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ProblemEditor = ({
  code,
  onCodeChange,
  selectedLanguage,
  onRunCode,
  isExecuting,
  problem,
}) => {
  const getBoilerplateCode = (language) => {
    if (!problem?.codeSnippet) return "";
    return problem.codeSnippet[language.toUpperCase()] || "";
  };

  return (
    <Tabs defaultValue='editor' className='h-full flex flex-col'>
      <TabsList className='w-full justify-start rounded-none bg-transparent border-0'>
        <TabsTrigger
          value='editor'
          className='gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary'
        >
          <Terminal className='w-4 h-4' />
          Code Editor
        </TabsTrigger>
      </TabsList>
      <TabsContent value='editor' className='flex-1 flex flex-col'>
        <div className='flex-1'>
          <Editor
            height='100%'
            language={selectedLanguage.toLowerCase()}
            theme='vs-dark'
            value={code || getBoilerplateCode(selectedLanguage)}
            onChange={(value) => onCodeChange(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
              padding: { top: 16, bottom: 16 },
            }}
          />
        </div>

        <div className='p-4 border-t border-border bg-background'>
          <div className='flex justify-between items-center gap-4'>
            <Button
              onClick={onRunCode}
              disabled={isExecuting}
              className='gap-2'
              variant='outline'
            >
              {!isExecuting && <Play className='w-4 h-4' />}
              {isExecuting ? (
                <Loader className='size-4 animate-spin' />
              ) : (
                "Run Code"
              )}
            </Button>
            <Button variant='default' className='gap-2'>
              Submit Solution
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};
