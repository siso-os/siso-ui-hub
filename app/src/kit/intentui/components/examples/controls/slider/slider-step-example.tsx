"use client"

import { Description, Label } from "../../../ui/field"
import { Slider, SliderFill, SliderOutput, SliderThumb, SliderTrack } from "../../../ui/slider"

export default function SliderStepDemo() {
  return (
    <Slider defaultValue={20}>
      <div className="flex items-center justify-between">
        <Label>Progress tracking</Label>
        <SliderOutput />
      </div>
      <SliderTrack>
        <SliderFill />
        <SliderThumb />
      </SliderTrack>
      <Description>Step in 10</Description>
    </Slider>
  )
}
