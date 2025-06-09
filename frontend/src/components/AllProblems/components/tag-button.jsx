export const TagButton = ({ tag }) => {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium border bg-neutral-100 border-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200`}
    >
      {tag}
    </span>
  );
};
