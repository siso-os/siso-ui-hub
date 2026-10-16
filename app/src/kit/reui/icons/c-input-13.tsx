import { Field, FieldLabel } from "../../shadcn/ui/field"
import { Input } from "../../shadcn/ui/input"

export function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="company">
        Company <span className="text-destructive">*</span>
      </FieldLabel>
      <Input id="company" placeholder="Wotso Inc." />
    </Field>
  )
}