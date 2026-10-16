"use client"

import { Label } from "../../../ui/field"
import { Input } from "../../../ui/input"
import { TextField } from "../../../ui/text-field"

export default function TextFieldReadonlyDemo() {
  return (
    <TextField isReadOnly name="name">
      <Label>Name</Label>
      <Input />
    </TextField>
  )
}
