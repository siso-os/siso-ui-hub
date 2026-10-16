"use client"

import { DateRangePicker, DateRangePickerTrigger } from "../../../ui/date-range-picker"
import { Label } from "../../../ui/field"

export default function DateRangePickerVisibleDurationDemo() {
  return (
    <DateRangePicker visibleDuration={{ months: 3 }}>
      <Label>Event date</Label>
      <DateRangePickerTrigger />
    </DateRangePicker>
  )
}
