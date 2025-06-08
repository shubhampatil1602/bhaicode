import { Link } from "react-router-dom";
import { Bookmark, PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DifficultyButton } from "./difficulty-button";
import { TagButton } from "./tag-button";

export const ProblemTable = ({
  problems,
  authUser,
  onDelete,
  onAddToPlaylist,
}) => {
  return (
    <div className='overflow-x-auto rounded-xl shadow-md'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>Solved</TableHead>
            <TableHead className='text-center'>Title</TableHead>
            <TableHead className='text-center'>Tags</TableHead>
            <TableHead className='text-center'>Difficulty</TableHead>
            <TableHead className='text-center'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.length > 0 ? (
            problems.map((problem) => {
              const isSolved = problem.solvedBy.some(
                (user) => user.userId === authUser?.id
              );

              return (
                <TableRow key={problem.id}>
                  <TableCell className='text-center'>
                    <Checkbox
                      checked={isSolved}
                      readOnly
                      className='checkbox checkbox-sm'
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/problem/${problem.id}`}
                      className='font-semibold hover:underline'
                    >
                      {problem.title}
                    </Link>
                  </TableCell>
                  <TableCell className='text-center'>
                    <div className='flex flex-wrap justify-center gap-1'>
                      {(problem.tags || []).map((tag, idx) => (
                        <TagButton key={idx} tag={tag} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className='text-center'>
                    <DifficultyButton difficulty={problem.difficulty} />
                  </TableCell>
                  <TableCell className='flex justify-center items-center gap-2'>
                    <div className='flex flex-col md:flex-row gap-2 items-start md:items-center'>
                      {authUser?.role === "ADMIN" && (
                        <div className='flex gap-1'>
                          <Button
                            onClick={() => onDelete(problem.id)}
                            className='bg-red-500 hover:bg-red-600 text-white'
                          >
                            <TrashIcon className='size-3' />
                          </Button>
                          <Button
                            disabled
                            className='bg-sky-500 hover:bg-sky-700 text-white'
                          >
                            <PencilIcon className='size-3' />
                          </Button>
                        </div>
                      )}
                      <Button
                        className='flex gap-2 items-center'
                        onClick={() => onAddToPlaylist(problem.id)}
                      >
                        <Bookmark className='size-3' />
                        <span className='hidden sm:inline'>
                          Save to Playlist
                        </span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className='text-center'>
                No problems found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
