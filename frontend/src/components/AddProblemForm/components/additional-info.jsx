import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb } from "lucide-react";

export const AdditionalInfo = ({ register }) => {
  return (
    <div className='space-y-6 dark:bg-neutral-900 p-4 rounded-lg'>
      <div className='flex items-center gap-2'>
        <Lightbulb className='h-5 w-5 text-warning' />
        <h3 className='text-base font-semibold text-primary'>
          Additional Information
        </h3>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <Label className='text-base font-medium text-foreground'>
            Constraints
          </Label>
          <Textarea
            className='min-h-24 text-base focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-y bg-white'
            {...register("constraints")}
            placeholder='Enter problem constraints'
          />
        </div>

        <div className='space-y-2'>
          <Label className='text-base font-medium text-foreground'>
            Hints (Optional)
          </Label>
          <Textarea
            className='min-h-24 text-base focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-y bg-white'
            {...register("hints")}
            placeholder='Enter hints for solving the problem'
          />
        </div>

        <div className='space-y-2 lg:col-span-2'>
          <Label className='text-base font-medium text-foreground'>
            Editorial (Optional)
          </Label>
          <Textarea
            className='min-h-32 text-base focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-y bg-white'
            {...register("editorial")}
            placeholder='Enter problem editorial/solution explanation'
          />
        </div>
      </div>
    </div>
  );
};
