"use client"

import { Description, Label } from "../../../ui/field"
import { TextField } from "../../../ui/text-field"
import { Textarea } from "../../../ui/textarea"

export default function TextareaDescriptionDemo() {
  return (
    <TextField name="address">
      <Label>Address</Label>
      <Textarea />
      <Description>Please enter your address</Description>
    </TextField>
  )
}
