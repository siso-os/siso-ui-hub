"use client"

import { Label } from "../../../ui/field"
import { NumberField, NumberInput } from "../../../ui/number-field"

export default function NumberFieldDemo() {
  return (
    <NumberField name="cookies">
      <Label>Cookies</Label>
      <NumberInput />
    </NumberField>
  )
}
