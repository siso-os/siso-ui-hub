import { Field, FieldLabel } from "../../shadcn/ui/field"
import { Switch } from "../../shadcn/ui/switch"

export function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <Field orientation="horizontal">
        <Switch id="switch-basic" />
        <FieldLabel htmlFor="switch-basic">Airplane Mode</FieldLabel>
      </Field>
    </div>
  )
}