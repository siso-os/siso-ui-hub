import { Field, FieldLabel } from "../../shadcn/ui/field"
import { Input } from "../../shadcn/ui/input"

export function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-demo-date">Date</FieldLabel>
      <Input id="input-demo-date" type="date" />
    </Field>
  )
}