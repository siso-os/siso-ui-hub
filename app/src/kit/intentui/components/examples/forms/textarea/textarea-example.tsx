"use client"

import { Label } from "../../../ui/field"
import { TextField } from "../../../ui/text-field"
import { Textarea } from "../../../ui/textarea"

export default function TextareaDemo() {
  return (
    <TextField name="bio">
      <Label>Bio</Label>
      <Textarea />
    </TextField>
  )
}
