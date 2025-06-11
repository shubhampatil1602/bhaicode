import { Problem } from "@/components/Problem";
import { useParams } from "react-router-dom";

const ProblemPage = () => {
  const { id } = useParams();

  return (
    <div className='h-full min-h-screen w-screen pt-20 md:pt-24'>
      <Problem id={id} />
    </div>
  );
};

export default ProblemPage;
