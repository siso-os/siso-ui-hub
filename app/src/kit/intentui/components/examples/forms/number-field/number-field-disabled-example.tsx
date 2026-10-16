"use client"

import { Label } from "../../../ui/field"
import { NumberField, NumberInput } from "../../../ui/number-field"

export default function NumberFieldDisabledDemo() {
  return (
    <NumberField isDisabled name="cookies">
      <Label>Cookies</Label>
      <NumberInput />
    </NumberField>
  )
}
