"use client"

import { ColorArea } from "../../../ui/color-area"
import { ColorThumb as Thumb } from "../../../ui/color-thumb"

export default function ColorAreaDisabledDemo() {
  return (
    <ColorArea isDisabled>
      <Thumb />
    </ColorArea>
  )
}
