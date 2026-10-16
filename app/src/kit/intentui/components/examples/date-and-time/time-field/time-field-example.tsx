"use client"

import { Time } from "@internationalized/date"
import { DateInput } from "../../../ui/date-field"
import { Label } from "../../../ui/field"
import { TimeField } from "../../../ui/time-field"

export default function TimeFieldDemo() {
  return (
    <TimeField defaultValue={new Time()}>
      <Label>Event time</Label>
      <DateInput />
    </TimeField>
  )
}
