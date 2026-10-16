"use client"

import { Form } from "react-aria-components/Form"
import { Button } from "../../../ui/button"
import { ColorField } from "../../../ui/color-field"
import { FieldError, Label } from "../../../ui/field"
import { Input } from "../../../ui/input"

export default function ColorFieldValidationDemo() {
  function submit(e: React.FormEvent) {
    e.preventDefault()
  }

  return (
    <Form onSubmit={submit} className="space-y-4">
      <ColorField isRequired name="color">
        <Label>Color</Label>
        <Input placeholder="#155DFC" />
        <FieldError />
      </ColorField>
      <Button type="submit">Save</Button>
    </Form>
  )
}
