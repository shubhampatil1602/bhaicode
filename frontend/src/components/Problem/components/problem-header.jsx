import { Link } from "react-router-dom";
import { Bookmark, Share2, Clock, ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ProblemHeader = ({
  problem,
  selectedLanguage,
  onLanguageChange,
  isBookmarked,
  onBookmarkToggle,
}) => {
  return (
    <nav className='bg-card px-4 py-3'>
      <div className='flex items-center justify-between w-7xl mx-auto'>
        <div className='flex items-center gap-2'>
          <Link
            to='/'
            className='flex items-center gap-2 text-primary hover:text-primary/80'
          >
            <Home className='w-6 h-6' />
            <ChevronRight className='w-4 h-4' />
          </Link>
          <div className='ml-4'>
            <h1 className='text-xl font-bold'>{problem.title}</h1>
            <div className='flex items-center gap-2 text-sm text-muted-foreground mt-2'>
              <Clock className='w-4 h-4' />
              <span>
                Updated{" "}
                {new Date(problem.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='icon'
            className={isBookmarked ? "text-primary" : ""}
            onClick={onBookmarkToggle}
          >
            <Bookmark className='w-5 h-5' />
          </Button>
          <Button variant='ghost' size='icon'>
            <Share2 className='w-5 h-5' />
          </Button>
          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className='w-40 border-0 bg-muted/50'>
              <SelectValue placeholder='Select language' />
            </SelectTrigger>
            <SelectContent>
              {["javascript", "python", "java", "typescript"].map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </nav>
  );
};
