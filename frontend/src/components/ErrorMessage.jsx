import { InfoIcon } from "lucide-react";

const ErrorMessage = ({ message }) => {
  return (
    <div className='text-red-500 flex items-center gap-1.5 text-sm bg-red-100 px-3 py-2 rounded-md'>
      <InfoIcon className='size-4' /> {message}
    </div>
  );
};

export default ErrorMessage;
