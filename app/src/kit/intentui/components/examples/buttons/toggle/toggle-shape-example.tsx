"use client"

import { Toggle } from "../../../ui/toggle"

export default function ToggleShapeDemo() {
  return <Toggle isCircle>{({ isSelected }) => <>{isSelected ? "Disabled" : "Enabled"}</>}</Toggle>
}
