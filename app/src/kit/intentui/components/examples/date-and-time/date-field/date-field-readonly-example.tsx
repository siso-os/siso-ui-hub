"use client"

import { DateField, DateInput } from "../../../ui/date-field"
import { Label } from "../../../ui/field"

export default function DateFieldReadonlyDemo() {
  return (
    <DateField isReadOnly>
      <Label>Event date</Label>
      <DateInput />
    </DateField>
  )
}
