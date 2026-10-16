"use client"

import { Input } from "../../../ui/input"
import { TextField } from "../../../ui/text-field"

export default function TextFieldDemo() {
  return (
    <TextField aria-label="Name" name="name">
      <Input placeholder="Florin Aurelie" />
    </TextField>
  )
}
