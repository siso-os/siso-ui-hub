import { Field } from "../../shadcn/ui/field"
import {
  InputGroup,
  InputGroupInput,
} from "../../shadcn/ui/input-group"

export function Pattern() {
  return (
    <Field className="max-w-xs">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
      </InputGroup>
    </Field>
  )
}