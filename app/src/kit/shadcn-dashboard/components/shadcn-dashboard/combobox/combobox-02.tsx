"use client"

import * as React from "react"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "../../../../shadcn/ui/combobox"

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const

const ComboboxMultipleDemo = () => {
  const anchor = useComboboxAnchor()

  return (
    <Combobox
      multiple
      autoHighlight
      items={frameworks}
      defaultValue={[frameworks[0]]}
    >
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue>
          {(values) => (
            <React.Fragment>
              {values.map((value: string) => (
                <ComboboxChip key={value} className="pt-0.5">{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export default ComboboxMultipleDemo