"use client"

import { Label } from "../../../ui/field"
import { NumberField, NumberInput } from "../../../ui/number-field"

export default function NumberFieldUncontrolledDemo() {
  return (
    <NumberField defaultValue={302} name="width">
      <Label>Width</Label>
      <NumberInput />
    </NumberField>
  )
}
