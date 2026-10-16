"use client"

import { DateField, DateInput } from "../../../ui/date-field"
import { Label } from "../../../ui/field"

export default function DateFieldDemo() {
  return (
    <DateField>
      <Label>Event date</Label>
      <DateInput />
    </DateField>
  )
}
