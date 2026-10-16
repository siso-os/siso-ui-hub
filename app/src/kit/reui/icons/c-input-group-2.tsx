import { Field } from "../../shadcn/ui/field"
import {
  InputGroup,
  InputGroupInput,
} from "../../shadcn/ui/input-group"

export function Pattern() {
  return (
    <Field className="max-w-xs" data-disabled="true">
      <InputGroup>
        <InputGroupInput placeholder="Disabled field" disabled />
      </InputGroup>
    </Field>
  )
}