import { FormHeader } from "../Form/components/form-header";
import { Form } from "../Form";
import { useNavigate } from "react-router-dom";
import { addProblemStore } from "./store/add-problem";
import { FormProvider } from "../Form/context/form-context";

export const AddProblemForm = () => {
  const navigate = useNavigate();
  const { onSubmit } = addProblemStore();

  const handleFormSubmit = async (value) => {
    try {
      await onSubmit(value);
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <FormProvider>
      <div className='container mx-auto py-4 px-1 w-[400px] sm:py-6 sm:px-4 sm:w-xl md:w-2xl lg:w-7xl max-w-7xl'>
        <div className='p-3 sm:p-6'>
          <FormHeader />
          <Form handleFormSubmit={handleFormSubmit} />
        </div>
      </div>
    </FormProvider>
  );
};
