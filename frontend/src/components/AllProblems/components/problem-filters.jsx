import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ProblemFilters = ({
  search,
  setSearch,
  difficulty,
  setDifficulty,
  selectedTag,
  setSelectedTag,
  allTags,
}) => {
  const formatValue = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  return (
    <div className='flex flex-wrap justify-between items-center mb-6 gap-4 w-full'>
      <Input
        id='search'
        className='w-full md:w-1/3 text-sm sm:text-base'
        placeholder='Enter problem title'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Select defaultValue={difficulty} onValueChange={setDifficulty}>
        <SelectTrigger className='w-full md:w-1/4'>
          <SelectValue>
            {formatValue(difficulty) === "All"
              ? "All Difficulties"
              : formatValue(difficulty)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {["ALL", "EASY", "MEDIUM", "HARD"].map((diff) => (
            <SelectItem key={diff} value={diff}>
              {formatValue(diff)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select defaultValue={selectedTag} onValueChange={setSelectedTag}>
        <SelectTrigger className='w-full md:w-1/4'>
          <SelectValue>
            {selectedTag === "ALL" ? "All Tags" : selectedTag}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='ALL'>All Tags</SelectItem>
          {allTags.map((tag) => (
            <SelectItem key={tag} value={tag}>
              {tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
