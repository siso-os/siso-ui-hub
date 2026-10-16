import { Button } from "../../shadcn/ui/button"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <Button>
      <IconPlaceholder
        lucide="CloudDownloadIcon"
        tabler="IconCloudDownload"
        hugeicons="CloudDownloadIcon"
        phosphor="CloudArrowDownIcon"
        remixicon="RiDownloadCloud2Line"
        aria-hidden="true"
      />
      Download
    </Button>
  )
}