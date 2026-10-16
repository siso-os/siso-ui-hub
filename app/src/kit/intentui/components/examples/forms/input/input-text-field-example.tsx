"use client"

import { Description, Label } from "../../../ui/field"
import { Input } from "../../../ui/input"
import { TextField } from "../../../ui/text-field"

export default function InputBasicDemo() {
  return (
    <TextField>
      <Label htmlFor="name">Name</Label>
      <Input id="name" aria-label="Name" placeholder="Your name" />
      <Description>Please enter your full name.</Description>
    </TextField>
  )
}
