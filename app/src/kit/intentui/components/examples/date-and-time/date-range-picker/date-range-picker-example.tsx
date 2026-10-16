"use client"

import { DateRangePicker, DateRangePickerTrigger } from "../../../ui/date-range-picker"
import { Label } from "../../../ui/field"

export default function DateRangePickerDemo() {
  return (
    <DateRangePicker>
      <Label>Event date</Label>
      <DateRangePickerTrigger />
    </DateRangePicker>
  )
}
