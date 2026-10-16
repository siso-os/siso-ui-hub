import { IconTile } from "./icon-tile"

import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

const sizes = ["xs", "sm", "default", "lg", "xl"] as const

export function Pattern() {
  return (
    <div className="flex items-end justify-center gap-4">
      {sizes.map((size) => (
        <IconTile key={size} variant="elevated" size={size} aria-hidden="true">
          <IconPlaceholder
            lucide="PackageIcon"
            tabler="IconPackage"
            hugeicons="Package01Icon"
            phosphor="PackageIcon"
            remixicon="RiBox3Line"
          />
        </IconTile>
      ))}
    </div>
  )
}