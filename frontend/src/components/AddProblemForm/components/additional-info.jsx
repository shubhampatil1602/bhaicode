import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb } from "lucide-react";

export const AdditionalInfo = ({ register }) => {
  return (
    <Card>
      <CardHeader className='px-3 sm:px-6'>
        <CardTitle className='text-base sm:text-lg font-semibold flex items-center gap-2'>
          <Lightbulb className='h-4 w-4 sm:h-5 sm:w-5 text-warning' />
          Additional Information
        </CardTitle>
      </CardHeader>
      <CardContent className='px-3 sm:px-6 space-y-3 sm:space-y-4'>
        <div className='space-y-2'>
          <Label className='text-sm sm:text-base'>Constraints</Label>
          <Textarea
            className='min-h-24 text-sm sm:text-base resize-y'
            {...register("constraints")}
            placeholder='Enter problem constraints'
          />
        </div>
        <div className='space-y-2'>
          <Label className='text-sm sm:text-base'>Hints (Optional)</Label>
          <Textarea
            className='min-h-24 text-sm sm:text-base resize-y'
            {...register("hints")}
            placeholder='Enter hints for solving the problem'
          />
        </div>
        <div className='space-y-2'>
          <Label className='text-sm sm:text-base'>Editorial (Optional)</Label>
          <Textarea
            className='min-h-32 text-sm sm:text-base resize-y'
            {...register("editorial")}
            placeholder='Enter problem editorial/solution explanation'
          />
        </div>
      </CardContent>
    </Card>
  );
};
