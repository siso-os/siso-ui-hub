"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../../shadcn/ui/dialog";
import { Textarea } from "../../../../../../shadcn/ui/textarea";
import { Button } from "../../../../../../shadcn/ui/button";
import { Check } from "lucide-react";
import { ColorOption, NoteColor } from "./types";

type Props = {
  colors: ColorOption[];
  onAddNote: (title: string, color: NoteColor) => void;
};

const AddNotes = ({ colors, onAddNote }: Props) => {
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [scolor, setScolor] = useState<NoteColor>("primary");
  const [title, setTitle] = useState("");

  const handleSave = () => {
    onAddNote(title, scolor);
    setOpenNoteModal(false);
    setTitle("");
    setScolor("primary");
  };

  return (
    <Dialog open={openNoteModal} onOpenChange={setOpenNoteModal}>
      <DialogTrigger render={<Button>Add Note</Button>} />
      <DialogContent className="sm:max-w-lg rtl:[&_[data-slot=dialog-close]]:left-2 rtl:[&_[data-slot=dialog-close]]:right-auto">
        <DialogHeader>
          <DialogTitle>Add New Note</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <Textarea
            rows={5}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
            placeholder="Write your note here..."
          />
          <h6 className="text-base pt-4">Change Note Color</h6>
          <div className="flex gap-2 items-center">
            {colors.map((color) => (
              <div
                key={color.disp}
                onClick={() => setScolor(color.disp)}
                className={`h-7 w-7 flex justify-center items-center rounded-full cursor-pointer bg-${color.disp}`}
              >
                {scolor === color.disp && <Check size={18} className="text-white" />}
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button disabled={!title} onClick={handleSave}>
            Save
          </Button>
          <Button variant="outline" onClick={() => setOpenNoteModal(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNotes;
