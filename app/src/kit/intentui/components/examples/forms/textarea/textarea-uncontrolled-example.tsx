"use client"

import { Label } from "../../../ui/field"
import { TextField } from "../../../ui/text-field"
import { Textarea } from "../../../ui/textarea"

export default function TextareaUncontrolledDemo() {
  return (
    <TextField defaultValue="Brooklyn New York, USA" name="address">
      <Label>Address</Label>
      <Textarea />
    </TextField>
  )
}
