import { Button } from "@/components/ui/button";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className='flex justify-center mt-6 gap-2'>
      <Button
        variant='outline'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev.
      </Button>
      <span className='text-sm font-medium text-white bg-neutral-900 px-3 py-1 rounded-md flex flex-row items-center gap-2'>
        {currentPage} / {totalPages}
      </span>
      <Button
        variant='outline'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};
