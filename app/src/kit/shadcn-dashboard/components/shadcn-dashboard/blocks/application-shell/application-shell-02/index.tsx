"use client";
import { useState } from "react";
import { Card } from "../../../../../../shadcn/ui/card";
import { Sheet, SheetContent } from "../../../../../../shadcn/ui/sheet";
import { Button } from "../../../../../../shadcn/ui/button";
import { Menu } from "lucide-react";
import NotesSidebar from "./notes-sidebar";
import NoteContent from "./note-content";
import AddNotes from "./add-notes";
import { notesData as initialNotesData } from "./data";
import { Note, colorOptions } from "./types";

const ApplicationShell02 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>(initialNotesData);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(
    initialNotesData[0]?.id ?? null
  );

  const selectedNote = notes.find((note) => note.id === selectedNoteId) ?? null;

  const handleSelectNote = (id: number) => {
    setSelectedNoteId(id);
    setIsOpen(false);
  };

  const handleAddNote = (title: string, color: Note["color"]) => {
    const newNote: Note = {
      id: notes.length ? Math.max(...notes.map((note) => note.id)) + 1 : 1,
      title,
      color,
      datef: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedNoteId(newNote.id);
  };

  const handleUpdateNote = (id: number | null, title: string, color: Note["color"]) => {
    if (id === null) return;
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, title, color } : note))
    );
  };

  const handleDeleteNote = (id: number) => {
    setNotes((prev) => {
      const remaining = prev.filter((note) => note.id !== id);
      if (selectedNoteId === id) {
        setSelectedNoteId(remaining[0]?.id ?? null);
      }
      return remaining;
    });
  };

  return (
    <Card className="py-0! overflow-hidden w-full">
      <div className="flex min-h-[600px] h-[calc(100vh_-_300px)]">
        {/* NOTES SIDEBAR */}
        <div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent
              side="left"
              showCloseButton={false}
              className="max-w-[320px] sm:max-w-[320px] w-full h-full lg:z-0 lg:hidden block"
            >
              <NotesSidebar
                notes={notes}
                selectedNoteId={selectedNoteId}
                onSelectNote={handleSelectNote}
                onDeleteNote={handleDeleteNote}
              />
            </SheetContent>
          </Sheet>
          <div className="w-full h-full lg:block hidden">
            <NotesSidebar
              notes={notes}
              selectedNoteId={selectedNoteId}
              onSelectNote={handleSelectNote}
              onDeleteNote={handleDeleteNote}
            />
          </div>
        </div>

        {/* NOTES CONTENT */}
        <div className="w-full">
          <div className="flex justify-between items-center border-b border-border py-4 px-6">
            <div className="flex gap-3 items-center">
              <Button
                variant="ghost"
                onClick={() => setIsOpen(true)}
                className="h-8! w-8! rounded-md! justify-center items-center p-0 lg:hidden! flex border border-border"
              >
                <Menu size={18} />
              </Button>
              <h6 className="text-base">Edit Note</h6>
            </div>
            <AddNotes colors={colorOptions} onAddNote={handleAddNote} />
          </div>
          <NoteContent note={selectedNote} onUpdateNote={handleUpdateNote} />
        </div>
      </div>
    </Card>
  );
};

export default ApplicationShell02;
