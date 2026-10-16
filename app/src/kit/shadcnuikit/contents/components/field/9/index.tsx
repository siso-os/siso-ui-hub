import { Field, FieldLabel } from "../../../../../shadcn/ui/field";
import { Switch } from "../../../../../shadcn/ui/switch";

export default function FieldComponent() {
  return (
    <Field orientation="horizontal" className="w-fit">
      <FieldLabel htmlFor="2fa">Multi-factor authentication</FieldLabel>
      <Switch id="2fa" />
    </Field>
  );
}
