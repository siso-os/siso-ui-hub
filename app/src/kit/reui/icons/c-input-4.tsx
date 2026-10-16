import { Field, FieldLabel } from "../../shadcn/ui/field"
import { Input } from "../../shadcn/ui/input"

export function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-demo-disabled">Email</FieldLabel>
      <Input
        id="input-demo-disabled"
        type="email"
        placeholder="Email"
        disabled
      />
    </Field>
  )
}