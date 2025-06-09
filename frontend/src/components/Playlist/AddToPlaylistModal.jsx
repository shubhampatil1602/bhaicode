import { useEffect, useState } from "react";
import { Loader, Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePlaylistStore } from "@/store/usePlaylistStore";

export const AddToPlaylistModal = ({
  isOpen,
  onClose,
  problemId,
  onAddToPlaylist,
}) => {
  const { playlists = [], getAllPlaylists, isLoading } = usePlaylistStore();
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  useEffect(() => {
    if (isOpen) {
      getAllPlaylists();
    }
  }, [isOpen, getAllPlaylists]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlaylist) return;

    await onAddToPlaylist(selectedPlaylist, [problemId]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add to Playlist</AlertDialogTitle>
          <AlertDialogDescription>
            Select a playlist to add this problem to.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            {isLoading ? (
              <div className='text-sm text-muted-foreground'>
                Loading playlists...
              </div>
            ) : playlists?.length > 0 ? (
              <Select
                value={selectedPlaylist}
                onValueChange={setSelectedPlaylist}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select a playlist' />
                </SelectTrigger>
                <SelectContent>
                  {playlists.map((playlist) => (
                    <SelectItem key={playlist.id} value={playlist.id}>
                      {playlist.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className='text-sm text-muted-foreground'>
                Please create a playlist first
              </div>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
            <Button
              type='submit'
              disabled={!selectedPlaylist || isLoading || !playlists?.length}
            >
              {isLoading ? (
                <Loader className='size-4 animate-spin' />
              ) : (
                <Plus className='size-4' />
              )}
              Add to Playlist
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
