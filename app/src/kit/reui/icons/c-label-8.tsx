import { Badge } from "./badge"

import { Field } from "../../shadcn/ui/field"
import { Input } from "../../shadcn/ui/input"
import { Label } from "../../shadcn/ui/label"

export function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-badge" className="gap-2">
        Webhook URL
        <Badge variant="success-light" size="sm">
          Active
        </Badge>
      </Label>
      <Input
        id="label-badge"
        type="url"
        defaultValue="https://api.example.com/webhooks"
        className="font-mono text-xs"
      />
    </Field>
  )
}