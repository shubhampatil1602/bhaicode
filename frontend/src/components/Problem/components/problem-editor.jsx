import Editor from "@monaco-editor/react";
import { Share2, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ProblemEditor = ({
  code,
  onCodeChange,
  selectedLanguage,
  problem,
  onLanguageChange,
}) => {
  const getBoilerplateCode = (language) => {
    if (!problem?.codeSnippet) return "";
    return problem.codeSnippet[language.toUpperCase()] || "";
  };

  return (
    <Tabs defaultValue='editor' className='h-full flex flex-col gap-0'>
      <TabsList className='w-full flex justify-between rounded-none border-0 bg-muted/60 border-b rounded-tr-lg rounded-tl-lg border-neutral-50 dark:border-neutral-800'>
        <div className='flex gap-2 items-center px-3 py-2 text-sm font-medium text-black dark:text-neutral-200'>
          <Code2 className='w-4 h-4' />
          Code
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon'>
            <Share2 className='w-5 h-5 text-black dark:text-neutral-200' />
          </Button>
          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className='w-40 border-0 bg-muted/50 text-black dark:text-neutral-200'>
              <SelectValue placeholder='Select language' />
            </SelectTrigger>
            <SelectContent>
              {["javascript", "python", "java", "typescript"].map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
      </TabsContent>
    </Tabs>
  );
};
