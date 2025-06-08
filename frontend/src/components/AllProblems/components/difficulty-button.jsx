export const DifficultyButton = ({ difficulty }) => {
  const colors = {
    EASY: "bg-green-100 border-green-200 text-green-800",
    MEDIUM: "bg-yellow-100 border-yellow-200 text-yellow-800",
    HARD: "bg-red-100 border-red-200 text-red-800",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[difficulty]}`}
    >
      {difficulty}
    </span>
  );
};
