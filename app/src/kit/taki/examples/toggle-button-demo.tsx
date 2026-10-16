import { BoldIcon } from "lucide-react"

import { ToggleButton } from "../ui/toggle-button"

export default function ToggleButtonDemo() {
  return (
    <ToggleButton variant="outline" aria-label="Toggle bold">
      <BoldIcon />
      Bold
    </ToggleButton>
  )
}
