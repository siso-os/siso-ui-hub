"use client"

import { ColorField } from "../../../ui/color-field"
import { Label } from "../../../ui/field"
import { Input } from "../../../ui/input"

export default function ColorFieldDisabledDemo() {
  return (
    <ColorField isDisabled name="color">
      <Label>Color</Label>
      <Input placeholder="#155DFC" />
    </ColorField>
  )
}
