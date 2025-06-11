import { EditProblemForm } from "../components/EditProblemForm";
import { useParams } from "react-router-dom";

const EditProblem = () => {
  const { problemId } = useParams();
  return (
    <div className='pt-20 md:pt-24'>
      <EditProblemForm problemId={problemId} />;
    </div>
  );
};

export default EditProblem;
