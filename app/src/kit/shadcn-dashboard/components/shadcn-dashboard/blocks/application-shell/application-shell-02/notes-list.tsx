"use client";
import { useState } from "react";
import { Trash2, SearchIcon } from "lucide-react";
import { Alert, AlertTitle } from "../../../../../../shadcn/ui/alert";
import { Input } from "../../../../../../shadcn/ui/input";
import { Button } from "../../../../../../shadcn/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../../../../../../shadcn/ui/tooltip";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Note, NoteColor } from "./types";
import { Card } from "../../../../../../shadcn/ui/card";

type Props = {
  notes: Note[];
  selectedNoteId: number | null;
  onSelectNote: (id: number) => void;
  onDeleteNote: (id: number) => void;
};

const colorClasses: Record<NoteColor, string> = {
  primary: "bg-primary/5 text-primary border border-primary/20",
  destructive: "bg-destructive/5 text-primary border border-destructive/20",
  "chart-3": "bg-chart-3/5 text-primary border border-chart-3/20",
  "chart-4": "bg-chart-4/5 text-primary border border-chart-4/20",
  "chart-2": "bg-chart-2/5 text-primary border border-chart-2/20",
};

const Notelist = ({ notes, selectedNoteId, onSelectNote, onDeleteNote }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="shrink-0">
        <div className="relative w-full">
          <SearchIcon
            size={16}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Notes..."
          />
        </div>
        <h6 className="text-base mt-6">All Notes</h6>
      </div>
      <SimpleBar className="flex-1 min-h-0 mt-4">
        <div className="flex flex-col gap-3 pe-2">
          {filteredNotes.length ? (
            filteredNotes.map((note) => (
              <Card
                key={note.id}
                className={`ring-0 cursor-pointer relative p-4 ${colorClasses[note.color]} ${
                  selectedNoteId === note.id ? "scale-100" : "scale-95"
                } transition-transform duration-200`}
                onClick={() => onSelectNote(note.id)}
              >
                <h6 className="text-base truncate text-primary">{note.title}</h6>
                <div className="flex items-center justify-between">
                  <p className="text-xs">{new Date(note.datef).toLocaleDateString()}</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <Button
                            variant="ghost"
                            className="hover:text-destructive! hover:bg-transparent! text-black dark:text-white"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteNote(note.id);
                            }}
                            aria-label="Delete note"
                          >
                            <Trash2 size={18} />
                          </Button>
                        }
                      />
                      <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </Card>
            ))
          ) : (
            <Alert variant="destructive">
              <AlertTitle>No Notes Found!</AlertTitle>
            </Alert>
          )}
        </div>
      </SimpleBar>
    </div>
  );
};

export default Notelist;
