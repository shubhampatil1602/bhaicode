import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useProblemFilters } from "./hooks/useProblemFilters";
import { usePagination } from "./hooks/usePagination";
import { Button } from "@/components/ui/button";
import { ProblemFilters } from "./components/problem-filters";
import { ProblemTable } from "./components/problem-table";
import { Pagination } from "./components/pagination";
import { Plus } from "lucide-react";
import { useProblemStore } from "@/store/useProblemStore";

export const AllProblems = () => {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const { authUser } = useAuthStore();
  const { deleteProblem, isProblemLoading, problems } = useProblemStore();

  const { allTags, filteredProblems } = useProblemFilters(
    problems,
    search,
    difficulty,
    selectedTag
  );

  const itemsPerPage = 5;
  const { totalPages, paginatedItems: paginatedProblems } = usePagination(
    filteredProblems,
    currentPage,
    itemsPerPage
  );

  const handleDelete = async (id) => {
    await deleteProblem(id);
  };

  const handleAddToPlaylist = async (id) => {
    // TODO: Implement add to playlist functionality
    console.log(id);
  };

  return (
    <div className='w-full max-w-6xl mx-auto pt-10'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-neutral-800'>Problems</h2>
        <Button variant='secondary' type='submit' size='lg' className='gap-2'>
          <Plus className='size-4' /> Create Playlist
        </Button>
      </div>

      <ProblemFilters
        search={search}
        setSearch={setSearch}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        allTags={allTags}
      />

      <ProblemTable
        problems={paginatedProblems}
        authUser={authUser}
        onDelete={handleDelete}
        isDeletingProblem={isProblemLoading}
        onAddToPlaylist={handleAddToPlaylist}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
