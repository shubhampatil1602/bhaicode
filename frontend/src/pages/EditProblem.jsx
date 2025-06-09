import { EditProblemForm } from "../components/EditProblemForm";
import { useParams } from "react-router-dom";

const EditProblem = () => {
  const { problemId } = useParams();
  return <EditProblemForm problemId={problemId} />;
};

export default EditProblem;
