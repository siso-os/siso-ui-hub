"use client"

import { Description, Label } from "../../../ui/field"
import { Input } from "../../../ui/input"
import { TextField } from "../../../ui/text-field"

export default function TextFieldDescriptionDemo() {
  return (
    <TextField name="name">
      <Label>Name</Label>
      <Input />
      <Description>Please enter your legal name.</Description>
    </TextField>
  )
}
