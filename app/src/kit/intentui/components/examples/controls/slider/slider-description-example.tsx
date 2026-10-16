"use client"

import { Description, Label } from "../../../ui/field"
import { Slider, SliderFill, SliderOutput, SliderThumb, SliderTrack } from "../../../ui/slider"

export default function SliderDescriptionDemo() {
  return (
    <Slider defaultValue={20}>
      <div className="flex items-center justify-between">
        <Label>Opacity</Label>
        <SliderOutput />
      </div>
      <SliderTrack>
        <SliderFill />
        <SliderThumb />
      </SliderTrack>
      <Description>Brightness of the image</Description>
    </Slider>
  )
}
