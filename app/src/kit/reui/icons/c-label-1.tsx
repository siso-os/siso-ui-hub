import { Field } from "../../shadcn/ui/field"
import { Input } from "../../shadcn/ui/input"
import { Label } from "../../shadcn/ui/label"

export function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-demo-username">Username</Label>
      <Input id="label-demo-username" placeholder="Enter your username…" />
    </Field>
  )
}