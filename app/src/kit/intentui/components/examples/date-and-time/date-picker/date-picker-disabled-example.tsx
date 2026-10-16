"use client"

import { DatePicker, DatePickerTrigger } from "../../../ui/date-picker"
import { Label } from "../../../ui/field"

export default function DatePickerDisabledDemo() {
  return (
    <DatePicker isDisabled>
      <Label>Event date</Label>
      <DatePickerTrigger />
    </DatePicker>
  )
}
