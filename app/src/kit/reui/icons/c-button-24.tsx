import { Button } from "../../shadcn/ui/button"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <Button size="icon-xs" variant="outline" aria-label="Close">
      <IconPlaceholder
        lucide="XIcon"
        tabler="IconX"
        hugeicons="MultiplicationSignIcon"
        phosphor="XIcon"
        remixicon="RiCloseLine"
        aria-hidden="true"
      />
    </Button>
  )
}