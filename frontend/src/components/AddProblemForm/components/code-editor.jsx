import Editor from "@monaco-editor/react";
import { Controller } from "react-hook-form";

export const CodeEditor = ({ control, name, language, height = "200px" }) => {
  return (
    <div className='border rounded-md overflow-hidden'>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Editor
            height={height}
            language={language.toLowerCase()}
            theme='vs-dark'
            value={field.value}
            onChange={field.onChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        )}
      />
    </div>
  );
};
