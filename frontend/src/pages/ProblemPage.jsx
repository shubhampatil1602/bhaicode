import { Problem } from "@/components/Problem";
import { useParams } from "react-router-dom";

const ProblemPage = () => {
  const { id } = useParams();

  return (
    <div className='h-full min-h-screen w-screen'>
      <Problem id={id} />
    </div>
  );
};

export default ProblemPage;
