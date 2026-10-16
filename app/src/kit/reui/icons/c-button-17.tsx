import { Button } from "../../shadcn/ui/button"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <Button variant="secondary">
      Open Project
      <IconPlaceholder
        lucide="ExternalLinkIcon"
        tabler="IconExternalLink"
        hugeicons="LinkSquare01Icon"
        phosphor="ArrowSquareOutIcon"
        remixicon="RiExternalLinkLine"
        aria-hidden="true"
      />
    </Button>
  )
}