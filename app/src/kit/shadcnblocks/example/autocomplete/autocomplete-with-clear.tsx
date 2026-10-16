"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../../shadcn/ui/combobox";

export const title = "Autocomplete With Clear";

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Japanese",
  "Portuguese",
] as const;

const Example = () => (
  <div className="w-full max-w-md">
    <Combobox defaultValue={languages[0]} items={languages}>
      <ComboboxInput
        className="w-full bg-background"
        placeholder="Select a language..."
        showClear
      />
      <ComboboxContent>
        <ComboboxEmpty>No languages found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </div>
);

export default Example;
