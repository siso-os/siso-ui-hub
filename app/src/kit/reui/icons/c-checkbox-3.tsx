import { Checkbox } from "../../shadcn/ui/checkbox"
import { Field, FieldLabel } from "../../shadcn/ui/field"

export function Pattern() {
  return (
    <Field orientation="horizontal" className="w-auto" data-invalid>
      <Checkbox id="invalid" aria-invalid />
      <FieldLabel htmlFor="invalid">Invalid checkbox</FieldLabel>
    </Field>
  )
}