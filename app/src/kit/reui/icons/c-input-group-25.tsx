import { Field } from "../../shadcn/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../../shadcn/ui/input-group"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <Field className="max-w-xs">
      <InputGroup>
        <InputGroupAddon>
          <IconPlaceholder
            lucide="SearchIcon"
            tabler="IconSearch"
            hugeicons="Search01Icon"
            phosphor="MagnifyingGlassIcon"
            remixicon="RiSearchLine"
            className="text-muted-foreground size-4"
          />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search logs..." />
        <InputGroupAddon align="inline-end">
          <InputGroupText className="text-muted-foreground text-xs">
            12 results
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}