"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../../shadcn/ui/combobox";

export const title = "Basic Autocomplete";

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
  "Gatsby",
  "SolidStart",
] as const;

const Example = () => (
  <div className="w-full max-w-md">
    <Combobox items={frameworks}>
      <ComboboxInput
        className="w-full bg-background"
        placeholder="Select a framework..."
      />
      <ComboboxContent>
        <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
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
