import { IconStack } from "./icon-stack"

import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <IconStack aria-hidden="true">
        <IconPlaceholder
          lucide="LayersIcon"
          tabler="IconStack2"
          hugeicons="Layers01Icon"
          phosphor="StackIcon"
          remixicon="RiStackLine"
          className="size-4"
        />
      </IconStack>
    </div>
  )
}