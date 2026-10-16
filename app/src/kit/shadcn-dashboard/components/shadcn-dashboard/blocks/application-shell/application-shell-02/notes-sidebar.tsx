import Notelist from "./notes-list";
import { Note } from "./types";

type Props = {
  notes: Note[];
  selectedNoteId: number | null;
  onSelectNote: (id: number) => void;
  onDeleteNote: (id: number) => void;
};

const NotesSidebar = ({ notes, selectedNoteId, onSelectNote, onDeleteNote }: Props) => {
  return (
    <div className="w-80 border-e border-border p-6 h-full flex flex-col overflow-hidden">
      <Notelist
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelectNote={onSelectNote}
        onDeleteNote={onDeleteNote}
      />
    </div>
  );
};

export default NotesSidebar;
