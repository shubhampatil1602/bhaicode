import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, BookOpen } from "lucide-react";

export const Tags = ({ tagFields, register, errors, appendTag, removeTag }) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6'>
        <CardTitle className='text-base sm:text-lg font-semibold flex items-center gap-2'>
          <BookOpen className='h-4 w-4 sm:h-5 sm:w-5' />
          Tags
        </CardTitle>
        <Button type='button' size='sm' onClick={() => appendTag("")}>
          <Plus className='h-4 w-4 mr-1' /> Add Tag
        </Button>
      </CardHeader>
      <CardContent className='px-3 sm:px-6'>
        <div className='grid grid-cols-1 gap-3 sm:gap-4'>
          {tagFields.map((field, index) => (
            <div key={field.id} className='flex gap-2 items-center'>
              <Input
                {...register(`tags.${index}`)}
                placeholder='Enter tag'
                className='text-sm sm:text-base'
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={() => removeTag(index)}
                disabled={tagFields.length === 1}
              >
                <Trash2 className='h-4 w-4 text-destructive' />
              </Button>
            </div>
          ))}
        </div>
        {errors.tags && (
          <p className='mt-2 text-xs sm:text-sm text-destructive'>
            {errors.tags.message}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
