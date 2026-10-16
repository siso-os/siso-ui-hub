import { Field } from "../../shadcn/ui/field"
import {
  InputGroup,
  InputGroupInput,
} from "../../shadcn/ui/input-group"

export function Pattern() {
  return (
    <Field className="max-w-xs" data-invalid="true">
      <InputGroup>
        <InputGroupInput placeholder="Invalid field" aria-invalid="true" />
      </InputGroup>
    </Field>
  )
}