import { Field, FieldLabel } from "../../shadcn/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../shadcn/ui/input-group"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="search-input">Search Components</FieldLabel>
      <InputGroup>
        <InputGroupAddon>
          <IconPlaceholder
            lucide="SearchIcon"
            tabler="IconSearch"
            hugeicons="Search01Icon"
            phosphor="MagnifyingGlassIcon"
            remixicon="RiSearchLine"
            className="text-muted-foreground"
          />
        </InputGroupAddon>
        <InputGroupInput id="search-input" placeholder="Search..." />
      </InputGroup>
    </Field>
  )
}