import { Field } from "../../shadcn/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../../shadcn/ui/input-group"

export function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <InputGroup>
        <InputGroupInput placeholder="Query..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton>Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}