import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

export const BasicInfo = ({ register, control, errors }) => {
  return (
    <div className='grid grid-cols-1 gap-4 sm:gap-6'>
      <div className='space-y-2'>
        <Label htmlFor='title' className='text-sm sm:text-base font-medium'>
          Title
        </Label>
        <Input
          id='title'
          className='w-full text-sm sm:text-base'
          {...register("title")}
          placeholder='Enter problem title'
        />
        {errors.title && (
          <p className='text-xs sm:text-sm text-destructive'>
            {errors.title.message}
          </p>
        )}
      </div>

      <div className='space-y-2'>
        <Label
          htmlFor='description'
          className='text-sm sm:text-base font-medium'
        >
          Description
        </Label>
        <Textarea
          id='description'
          className='min-h-24 w-full text-sm sm:text-base resize-y'
          {...register("description")}
          placeholder='Enter problem description'
        />
        {errors.description && (
          <p className='text-xs sm:text-sm text-destructive'>
            {errors.description.message}
          </p>
        )}
      </div>

      <div className='space-y-2'>
        <Label
          htmlFor='difficulty'
          className='text-sm sm:text-base font-medium'
        >
          Difficulty
        </Label>
        <Controller
          name='difficulty'
          control={control}
          defaultValue=''
          render={({ field: { value, onChange } }) => (
            <Select value={value || ""} onValueChange={onChange}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select difficulty' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='EASY'>Easy</SelectItem>
                <SelectItem value='MEDIUM'>Medium</SelectItem>
                <SelectItem value='HARD'>Hard</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.difficulty && (
          <p className='text-xs sm:text-sm text-destructive'>
            {errors.difficulty.message}
          </p>
        )}
      </div>
    </div>
  );
};
