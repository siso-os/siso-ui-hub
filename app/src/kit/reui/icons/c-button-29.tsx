import { Button } from "../../shadcn/ui/button"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <Button variant="link" className="group/link-button">
      View Documentation
      <IconPlaceholder
        lucide="ArrowUpRightIcon"
        tabler="IconArrowUpRight"
        hugeicons="ArrowUpRight01Icon"
        phosphor="ArrowUpRightIcon"
        remixicon="RiArrowRightUpLine"
        aria-hidden="true"
        className="transition-transform group-hover/link-button:rotate-45"
      />
    </Button>
  )
}