import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Tag } from "lucide-react";
import { useFormContext } from "../context/form-context";

export const Tags = () => {
  const { register, errors, tagFields, appendTag, removeTag } =
    useFormContext();
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Tag className='h-5 w-5 text-primary' />
          <h3 className='text-base font-semibold text-foreground'>Add Tags</h3>
        </div>
        <Button
          type='button'
          size='sm'
          onClick={() => appendTag("")}
          variant='default'
        >
          <Plus className='h-4 w-4 mr-1' /> Add Tag
        </Button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {tagFields.map((field, index) => (
          <div key={field.id} className='flex items-center gap-2'>
            <div className='flex-1'>
              <Input
                className='text-base focus:ring-2 focus:ring-primary/20 transition-all duration-200'
                {...register(`tags.${index}`)}
                placeholder='Enter tag'
              />
              {errors.tags?.[index] && (
                <p className='text-sm text-destructive font-medium mt-1'>
                  {errors.tags[index].message}
                </p>
              )}
            </div>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={() => removeTag(index)}
              className='text-gray-400 hover:text-destructive hover:bg-destructive/10 transition-all duration-200'
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        ))}
      </div>

      {errors.tags && (
        <p className='text-sm text-destructive font-medium'>
          {errors.tags.message}
        </p>
      )}
    </div>
  );
};
