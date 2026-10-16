"use client";

import {
  ColorPicker,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
} from "@/components/kibo-ui/color-picker";

export const title = "Basic color picker";

const Example = () => (
  <ColorPicker
    className="w-64 rounded-md border bg-background p-3 shadow-sm"
    defaultValue="#3b82f6"
  >
    <ColorPickerSelection className="h-36" />
    <div className="mt-3 space-y-2">
      <ColorPickerHue />
      <div className="flex items-center gap-2">
        <ColorPickerOutput />
        <ColorPickerFormat />
      </div>
    </div>
  </ColorPicker>
);

export default Example;
