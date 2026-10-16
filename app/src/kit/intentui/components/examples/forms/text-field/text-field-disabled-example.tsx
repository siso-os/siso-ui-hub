"use client"

import { Label } from "../../../ui/field"
import { Input } from "../../../ui/input"
import { TextField } from "../../../ui/text-field"

export default function TextFieldDisabledDemo() {
  return (
    <TextField isDisabled name="name">
      <Label>Name</Label>
      <Input placeholder="Kurt Cobain" />
    </TextField>
  )
}
