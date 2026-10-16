import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../shadcn/ui/combobox"
import { Field } from "../../shadcn/ui/field"

const largeListItems = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`)

export function Pattern() {
  return (
    <Field className="max-w-xs">
      <Combobox items={largeListItems}>
        <ComboboxInput placeholder="Search from 100 items" />
        <ComboboxContent>
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
    </Field>
  )
}