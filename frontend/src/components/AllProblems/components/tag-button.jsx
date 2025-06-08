export const TagButton = ({ tag }) => {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium border bg-gray-100 border-gray-200 text-gray-800`}
    >
      {tag}
    </span>
  );
};
