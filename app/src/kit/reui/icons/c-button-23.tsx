import { Button } from "../../shadcn/ui/button"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <Button variant="destructive">
      Confirm Removal
      <IconPlaceholder
        lucide="CircleAlertIcon"
        tabler="IconAlertCircle"
        hugeicons="AlertCircleIcon"
        phosphor="WarningCircleIcon"
        remixicon="RiErrorWarningLine"
        aria-hidden="true"
      />
    </Button>
  )
}