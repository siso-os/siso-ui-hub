"use client"

import { useState } from "react"

import { DropZone } from "../../../ui/drop-zone"
import { Label } from "../../../ui/field"

export default function DropZoneDemo() {
  const [dropped, setDropped] = useState(false)

  return (
    <DropZone onDrop={() => setDropped(true)}>
      <Label>{dropped ? "Drop nailed" : "Toss your stuff here"}</Label>
    </DropZone>
  )
}
