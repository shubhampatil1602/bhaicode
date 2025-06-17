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
import { useFormContext } from "../context/form-context";

export const BasicInfo = () => {
  const { register, control, errors } = useFormContext();
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      <div className='space-y-2'>
        <Label className='text-base font-medium text-foreground'>Title</Label>
        <Input
          className='text-base focus:ring-2 focus:ring-primary/20 transition-all duration-200'
          {...register("title")}
          placeholder='Enter problem title'
        />
        {errors.title && (
          <p className='text-sm text-destructive font-medium'>
            {errors.title.message}
          </p>
        )}
      </div>

      <div className='space-y-2'>
        <Label className='text-base font-medium text-foreground'>
          Difficulty
        </Label>
        <Controller
          name='difficulty'
          control={control}
          defaultValue=''
          render={({ field: { value, onChange } }) => (
            <Select value={value || ""} onValueChange={onChange}>
              <SelectTrigger className='text-base focus:ring-2 focus:ring-primary/20 transition-all duration-200 w-full'>
                <SelectValue placeholder='Select difficulty' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='EASY' className='text-green-600 font-medium'>
                  Easy
                </SelectItem>
                <SelectItem
                  value='MEDIUM'
                  className='text-yellow-600 font-medium'
                >
                  Medium
                </SelectItem>
                <SelectItem value='HARD' className='text-red-600 font-medium'>
                  Hard
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.difficulty && (
          <p className='text-sm text-destructive font-medium'>
            {errors.difficulty.message}
          </p>
        )}
      </div>

      <div className='space-y-2 lg:col-span-2'>
        <Label className='text-base font-medium text-foreground'>
          Description
        </Label>
        <Textarea
          className='min-h-32 text-base focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-y'
          {...register("description")}
          placeholder='Enter problem description'
        />
        {errors.description && (
          <p className='text-sm text-destructive font-medium'>
            {errors.description.message}
          </p>
        )}
      </div>
    </div>
  );
};
