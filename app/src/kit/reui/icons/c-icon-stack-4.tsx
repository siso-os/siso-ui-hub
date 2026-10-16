import { IconStack } from "./icon-stack"

import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <IconStack aria-hidden="true" className="text-primary h-24 w-22">
        <span className="bg-background text-primary flex size-8 items-center justify-center rounded-full border shadow-xs">
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
            className="size-4"
          />
        </span>
      </IconStack>
    </div>
  )
}