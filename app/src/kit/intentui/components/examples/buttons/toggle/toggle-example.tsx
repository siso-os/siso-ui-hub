"use client"

import { Toggle } from "../../../ui/toggle"

export default function ToggleDemo() {
  return <Toggle>{({ isSelected }) => <>{isSelected ? "Unpin" : "Pin"}</>}</Toggle>
}
