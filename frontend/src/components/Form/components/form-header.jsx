import { useFormContext } from "../context/form-context";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { IconReload } from "@tabler/icons-react";

export const FormHeader = ({ isEdit = false }) => {
  const {
    sampleType,
    handleSetSampleType,
    loadSampleData,
    resetForm,
    editResetForm,
  } = useFormContext();
  return (
    <div className='flex flex-col gap-4 mb-4 sm:mb-6 pb-4 border-b'>
      {!isEdit ? (
        <>
          <CardTitle className='flex-1 text-xl sm:text-2xl font-semibold flex items-center gap-2'>
            <FileText className='h-5 w-5 sm:h-6 sm:w-6 text-primary' />
            Create Problem
          </CardTitle>

          <div className='flex flex-col justify-between lg:flex-row gap-2 sm:gap-3 w-full'>
            <div className='flex w-full sm:w-auto'>
              <Button
                type='button'
                variant={sampleType === "DP" ? "default" : "outline"}
                className='flex-1 rounded-r-none'
                onClick={() => handleSetSampleType("DP")}
              >
                Sample DP Problem
              </Button>
              <Button
                type='button'
                variant={sampleType === "string" ? "default" : "outline"}
                className='flex-1 rounded-l-none'
                onClick={() => handleSetSampleType("string")}
              >
                Sample String Problem
              </Button>
            </div>
            <div className='flex gap-3 sm:w-auto'>
              <Button
                type='button'
                variant='secondary'
                className='flex-1 sm:w-auto gap-2'
                onClick={loadSampleData}
              >
                <Download className='size-4' />
                Load Sample
              </Button>

              <Button
                type='button'
                variant='secondary'
                className='flex-1 sm:w-auto gap-2'
                onClick={isEdit ? editResetForm : resetForm}
              >
                <IconReload className='size-4' />
                Reset Form
              </Button>
            </div>
          </div>
        </>
      ) : (
        <CardTitle className='flex-1 text-xl sm:text-2xl font-semibold flex items-center gap-2'>
          <FileText className='h-5 w-5 sm:h-6 sm:w-6 text-primary' />
          Edit Problem
        </CardTitle>
      )}
    </div>
  );
};
