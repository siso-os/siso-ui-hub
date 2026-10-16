"use client"

import { Form } from "react-aria-components/Form"
import { Button } from "../../../ui/button"
import { FieldError, Label } from "../../../ui/field"
import { Input } from "../../../ui/input"
import { TextField } from "../../../ui/text-field"

export default function TextFieldValidationDemo() {
  return (
    <Form className="space-y-4">
      <TextField isRequired name="name">
        <Label>Name</Label>
        <Input />
        <FieldError />
      </TextField>
      <Button type="submit">Submit</Button>
    </Form>
  )
}
