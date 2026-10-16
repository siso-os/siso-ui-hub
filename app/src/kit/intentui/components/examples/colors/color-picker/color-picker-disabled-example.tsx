"use client"

import { parseColor } from "@react-stately/color"
import { useState } from "react"
import { Button } from "../../../ui/button"
import { ColorArea } from "../../../ui/color-area"
import { ColorField } from "../../../ui/color-field"
import { ColorPicker } from "../../../ui/color-picker"
import { ColorSlider, ColorSliderTrack } from "../../../ui/color-slider"
import { ColorSwatch } from "../../../ui/color-swatch"
import { ColorThumb } from "../../../ui/color-thumb"
import { Input } from "../../../ui/input"
import { Popover, PopoverBody, PopoverContent } from "../../../ui/popover"

export default function ColorPickerDisabledDemo() {
  const [color, setColor] = useState(parseColor("hsl(216, 98%, 52%)"))
  return (
    <ColorPicker value={color} onChange={setColor} defaultValue="rgb(120,140,200)">
      <Popover>
        <Button isDisabled intent="plain" data-slot="control">
          <ColorSwatch />
          Select color
        </Button>
        <PopoverContent className="[--gutter:--spacing(1)]">
          <PopoverBody>
            <div className="space-y-(--gutter)">
              <ColorArea
                colorSpace="rgb"
                defaultValue="rgb(120,140,200)"
                xChannel="red"
                yChannel="green"
                xName="red"
                yName="green"
              />
              <ColorSlider colorSpace="hsb" channel="hue">
                <ColorSliderTrack>
                  <ColorThumb />
                </ColorSliderTrack>
              </ColorSlider>
              <ColorField aria-label="Color">
                <Input />
              </ColorField>
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </ColorPicker>
  )
}
