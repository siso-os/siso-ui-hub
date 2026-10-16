"use client";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Textarea } from "../../../../../../shadcn/ui/textarea";
import { Note, NoteColor, colorOptions } from "./types";

type Props = {
  note: Note | null;
  onUpdateNote: (id: number | null, title: string, color: NoteColor) => void;
};

const NoteContent = ({ note, onUpdateNote }: Props) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(note?.title ?? "");
  }, [note]);

  const handleBlur = () => {
    if (note) {
      onUpdateNote(note.id, title, note.color);
    }
  };

  const handleColorChange = (color: NoteColor) => {
    if (note) {
      onUpdateNote(note.id, title, color);
    }
  };

  return (
    <div className="flex grow p-6">
      {note ? (
        <div className="w-full">
          <Textarea
            id="outlined-multiline-static"
            placeholder="Edit Note"
            rows={5}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            className="w-full p-6"
          />
          <br />
          <h6 className="text-base mb-3">Change Note Color</h6>

          <div className="flex gap-2 items-center">
            {colorOptions.map((color) => (
              <div
                key={color.id}
                className={`h-7 w-7 flex justify-center items-center rounded-full cursor-pointer bg-${color.disp}`}
                onClick={() => handleColorChange(color.disp)}
              >
                {note.color === color.disp ? (
                  <Check width={18} className="text-white" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center w-full py-6 text-2xl">Select a Note</div>
      )}
    </div>
  );
};

export default NoteContent;
