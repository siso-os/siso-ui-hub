"use client"

import { DatePicker, DatePickerTrigger } from "../../../ui/date-picker"
import { Label } from "../../../ui/field"

export default function DatePickerDemo() {
  return (
    <DatePicker>
      <Label>Event date</Label>
      <DatePickerTrigger />
    </DatePicker>
  )
}
