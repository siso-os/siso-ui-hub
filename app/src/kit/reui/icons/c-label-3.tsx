import { Field } from "../../shadcn/ui/field"
import { Label } from "../../shadcn/ui/label"
import { Textarea } from "../../shadcn/ui/textarea"

export function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-demo-message">Message</Label>
      <Textarea id="label-demo-message" placeholder="Type your message here…" />
    </Field>
  )
}