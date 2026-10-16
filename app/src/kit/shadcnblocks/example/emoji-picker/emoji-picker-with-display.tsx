"use client";

import { Smile } from "lucide-react";
import { useState } from "react";

import EmojiPicker from "../../components/shadcnblocks/emoji-picker";
import { Button } from "../../../shadcn/ui/button";

export const title = "Emoji Picker with Display";

const EmojiPickerExample = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    console.log("Selected emoji:", emoji);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <EmojiPicker
          onEmojiSelect={handleEmojiSelect}
          trigger={
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 w-8 rounded-lg p-0"
            >
              <Smile className="h-4 w-4" />
            </Button>
          }
        />

        {selectedEmoji && (
          <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3">
            <span className="text-2xl" role="img" aria-label="Selected emoji">
              {selectedEmoji}
            </span>
            <span className="text-sm text-muted-foreground">
              Selected emoji
            </span>
          </div>
        )}

        {!selectedEmoji && (
          <p className="text-sm text-muted-foreground">
            Click the button to select an emoji
          </p>
        )}
      </div>

      {selectedEmoji && (
        <div className="rounded-lg border p-4">
          <p className="mb-2 text-sm font-medium">Selected Emoji:</p>
          <div className="flex items-center gap-2">
            <span className="text-4xl" role="img" aria-label="Selected emoji">
              {selectedEmoji}
            </span>
            <code className="rounded bg-muted px-2 py-1 text-xs">
              {selectedEmoji}
            </code>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerExample;
