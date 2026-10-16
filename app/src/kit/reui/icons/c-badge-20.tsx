import { Badge } from "./badge"

import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <Badge variant="outline">
      <IconPlaceholder
        lucide="CheckIcon"
        tabler="IconCheck"
        hugeicons="Tick02Icon"
        phosphor="CheckIcon"
        remixicon="RiCheckLine"
      />
      Badge
    </Badge>
  )
}