"use client"

import { Form } from "react-aria-components/Form"
import { Button } from "../../../ui/button"
import { DateInput } from "../../../ui/date-field"
import { FieldError, Label } from "../../../ui/field"
import { TimeField } from "../../../ui/time-field"

export default function TimeFieldValidationDemo() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <TimeField isRequired className="mb-2">
        <Label>Event time</Label>
        <DateInput />
        <FieldError />
      </TimeField>
      <Button type="submit">Submit</Button>
    </Form>
  )
}
