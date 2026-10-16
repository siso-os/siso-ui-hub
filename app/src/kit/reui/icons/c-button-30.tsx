import { Button } from "../../shadcn/ui/button"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <Button size="lg">
      <IconPlaceholder
        lucide="ZapIcon"
        tabler="IconBolt"
        hugeicons="ZapIcon"
        phosphor="LightningIcon"
        remixicon="RiFlashlightLine"
        aria-hidden="true"
      />
      Upgrade Now
    </Button>
  )
}