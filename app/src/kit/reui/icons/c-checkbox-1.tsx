import { Checkbox } from "../../shadcn/ui/checkbox"
import { Field, FieldLabel } from "../../shadcn/ui/field"

export function Pattern() {
  return (
    <Field orientation="horizontal" className="w-auto">
      <Checkbox id="terms" />
      <FieldLabel htmlFor="terms">Basic checkbox</FieldLabel>
    </Field>
  )
}