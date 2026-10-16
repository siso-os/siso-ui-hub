// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { ColorPicker } from "../color-picker/color-picker";
import type { ColorSwatch } from "../color-picker/color-picker";

export function BrandColor() {
  const [color, setColor] = useState("#2F6BFF");
  const [swatches, setSwatches] = useState<ColorSwatch[]>([
    { id: "ink", color: "#17171A" },
    { id: "sky", color: "#3A8DFF" },
  ]);

  return (
    <ColorPicker
      label="Accent"
      value={color}
      onValueChange={setColor}
      background="#FFFFFF"
      swatches={swatches}
      onSwatchesChange={setSwatches}
    />
  );
}
