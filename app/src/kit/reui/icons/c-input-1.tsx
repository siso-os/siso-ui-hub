import { Field } from "../../shadcn/ui/field"
import { Input } from "../../shadcn/ui/input"

export function Pattern() {
  return (
    <Field className="max-w-xs">
      <Input id="basic-input" type="text" placeholder="Basic Input" />
    </Field>
  )
}