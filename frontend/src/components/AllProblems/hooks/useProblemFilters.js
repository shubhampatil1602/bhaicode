import { useMemo } from "react";

export const useProblemFilters = (
  problems,
  search,
  difficulty,
  selectedTag
) => {
  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagsSet = new Set();
    problems.forEach((problem) => {
      if (Array.isArray(problem.tags)) {
        problem.tags.forEach((tag) => tagsSet.add(tag.toLowerCase()));
      }
    });
    return Array.from(tagsSet);
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((problem) =>
        difficulty === "ALL"
          ? true
          : problem.difficulty.toUpperCase() === difficulty
      )
      .filter((problem) => {
        if (selectedTag === "ALL") return true;
        return problem.tags?.some(
          (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
        );
      });
  }, [problems, search, difficulty, selectedTag]);

  return {
    allTags,
    filteredProblems,
  };
};
