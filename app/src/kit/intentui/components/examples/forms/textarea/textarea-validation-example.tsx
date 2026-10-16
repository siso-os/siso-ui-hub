"use client"

import { useState } from "react"
import { Form } from "react-aria-components/Form"
import { Button } from "../../../ui/button"
import { FieldError, Label } from "../../../ui/field"
import { TextField } from "../../../ui/text-field"
import { Textarea } from "../../../ui/textarea"

export default function TextareaValidationDemo() {
  const [value, setValue] = useState("")
  return (
    <Form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <TextField value={value} onChange={setValue} isRequired name="address">
        <Label>Address</Label>
        <Textarea />
        <FieldError />
      </TextField>
      <Button type="submit">Submit</Button>
    </Form>
  )
}
