import { Checkbox } from "../../shadcn/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "../../shadcn/ui/field"

export function Pattern() {
  return (
    <FieldGroup className="max-w-xs">
      <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox defaultChecked />
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>
              You can enable or disable notifications at any time.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
    </FieldGroup>
  )
}