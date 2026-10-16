"use client"

import { Form } from "react-aria-components/Form"
import { Button } from "../../../ui/button"
import { DateRangePicker, DateRangePickerTrigger } from "../../../ui/date-range-picker"
import { FieldError, Label } from "../../../ui/field"

export default function DateRangePickerValidationDemo() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <DateRangePicker isRequired className="mb-2">
        <Label>Event date</Label>
        <DateRangePickerTrigger />
        <FieldError />
      </DateRangePicker>
      <Button type="submit">Submit</Button>
    </Form>
  )
}
