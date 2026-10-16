import { Field, FieldLabel } from "../../shadcn/ui/field"
import { Input } from "../../shadcn/ui/input"

export function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="minimal-input">Invisible Input</FieldLabel>
      <Input
        id="minimal-input"
        placeholder="Type here..."
        className="border-none bg-transparent p-0 shadow-none focus-visible:ring-0"
      />
    </Field>
  )
}