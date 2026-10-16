"use client"

import { DateInput } from "../../../ui/date-field"
import { Label } from "../../../ui/field"
import { TimeField } from "../../../ui/time-field"

export default function TimeFieldDisabledDemo() {
  return (
    <TimeField isDisabled>
      <Label>Event time</Label>
      <DateInput />
    </TimeField>
  )
}
