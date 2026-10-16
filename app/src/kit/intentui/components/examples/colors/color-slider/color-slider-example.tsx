"use client"

import { ColorSlider, ColorSliderOutput, ColorSliderTrack } from "../../../ui/color-slider"
import { ColorThumb } from "../../../ui/color-thumb"
import { Description } from "../../../ui/field"

export default function ColorSliderDemo() {
  return (
    <ColorSlider channel="hue" defaultValue="hsl(0, 100%, 50%)">
      <ColorSliderOutput />
      <ColorSliderTrack>
        <ColorThumb />
      </ColorSliderTrack>
      <Description>
        This color slider is using the <strong className="font-medium text-fg">hue</strong> channel.
      </Description>
    </ColorSlider>
  )
}
