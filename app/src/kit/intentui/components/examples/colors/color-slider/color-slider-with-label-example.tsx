"use client"

import { ColorSlider, ColorSliderOutput, ColorSliderTrack } from "../../../ui/color-slider"
import { ColorThumb } from "../../../ui/color-thumb"
import { Label } from "../../../ui/field"

export default function ColorSliderWithLabelDemo() {
  return (
    <ColorSlider channel="hue" defaultValue="hsl(0, 100%, 50%)">
      <Label>Color Customizer</Label>
      <ColorSliderOutput />
      <ColorSliderTrack>
        <ColorThumb />
      </ColorSliderTrack>
    </ColorSlider>
  )
}
