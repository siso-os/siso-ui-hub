import { Checkbox } from "../../shadcn/ui/checkbox"
import { Field } from "../../shadcn/ui/field"
import { Label } from "../../shadcn/ui/label"

export function Pattern() {
  return (
    <Field orientation="horizontal" className="mx-auto w-auto">
      <Checkbox id="label-demo-terms" />
      <Label htmlFor="label-demo-terms">Accept terms and conditions</Label>
    </Field>
  )
}