"use client"

import { DateField, DateInput } from "../../../ui/date-field"
import { Label } from "../../../ui/field"

export default function DateFieldDisabledDemo() {
  return (
    <DateField isDisabled>
      <Label>Event date</Label>
      <DateInput />
    </DateField>
  )
}
