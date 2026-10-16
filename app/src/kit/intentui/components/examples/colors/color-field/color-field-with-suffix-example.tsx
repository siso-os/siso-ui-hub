"use client"

import { SwatchIcon } from "@heroicons/react/24/outline"
import { ColorField } from "../../../ui/color-field"
import { Label } from "../../../ui/field"
import { Input, InputGroup } from "../../../ui/input"

export default function ColorFieldWithSuffixDemo() {
  return (
    <ColorField name="color">
      <Label>Color</Label>
      <InputGroup>
        <Input placeholder="#155DFC" />
        <SwatchIcon />
      </InputGroup>
    </ColorField>
  )
}
