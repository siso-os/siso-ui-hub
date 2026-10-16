"use client"

import { Label } from "../../../ui/field"
import { TextField } from "../../../ui/text-field"
import { Textarea } from "../../../ui/textarea"

export default function TextareaReadonlyDemo() {
  return (
    <TextField isReadOnly name="address">
      <Label>Address</Label>
      <Textarea />
    </TextField>
  )
}
