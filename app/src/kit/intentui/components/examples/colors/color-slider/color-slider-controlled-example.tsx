"use client"

import { parseColor } from "@react-stately/color"
import { useState } from "react"
import { ControlledValues } from "../controlled-values"
import { ColorSlider, ColorSliderOutput, ColorSliderTrack } from "../../../ui/color-slider"
import { ColorThumb } from "../../../ui/color-thumb"

export default function ColorSliderControlledDemo() {
  const [value, setValue] = useState(parseColor("hsl(216, 98%, 52%)"))
  return (
    <div className="flex flex-col gap-2">
      <ColorSlider channel="hue" value={value} onChange={setValue}>
        <ColorSliderOutput />
        <ColorSliderTrack>
          <ColorThumb />
        </ColorSliderTrack>
      </ColorSlider>
      <ControlledValues color={value} />
    </div>
  )
}
