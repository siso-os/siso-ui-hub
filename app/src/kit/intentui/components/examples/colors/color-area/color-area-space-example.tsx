"use client"

import { ColorArea } from "../../../ui/color-area"
import { ColorThumb } from "../../../ui/color-thumb"

export default function ColorAreaSpaceDemo() {
  return (
    <ColorArea colorSpace="rgb">
      <ColorThumb />
    </ColorArea>
  )
}
