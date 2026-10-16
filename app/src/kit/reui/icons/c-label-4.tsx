import { Field } from "../../shadcn/ui/field"
import { Input } from "../../shadcn/ui/input"
import { Label } from "../../shadcn/ui/label"

export function Pattern() {
  return (
    <Field data-disabled={true} className="w-full max-w-xs">
      <Label htmlFor="label-demo-disabled">Disabled Field</Label>
      <Input id="label-demo-disabled" placeholder="Disabled input…" disabled />
    </Field>
  )
}