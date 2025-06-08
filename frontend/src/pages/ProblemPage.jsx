import { Problem } from "@/components/Problem";
import { useParams } from "react-router-dom";

const ProblemPage = () => {
  const { id } = useParams();

  return <Problem id={id} />;
};

export default ProblemPage;
