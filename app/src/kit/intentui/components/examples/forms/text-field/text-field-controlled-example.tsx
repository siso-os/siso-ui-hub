"use client"

import { useState } from "react"

import { Description, Label } from "../../../ui/field"
import { Input } from "../../../ui/input"
import { TextField } from "../../../ui/text-field"

export default function TextFieldControlledDemo() {
  const [value, setValue] = useState("")
  return (
    <div className="fle flex-col">
      <TextField value={value} onChange={setValue} name="name">
        <Label>Name</Label>
        <Input />
        <Description>
          You have typed: <strong>{value ?? "-"}</strong>
        </Description>
      </TextField>
    </div>
  )
}
