import { Badge } from "./badge"

import { Button } from "../../shadcn/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../shadcn/ui/tooltip"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <Tooltip>
        <TooltipTrigger
          render={<Button variant="outline" size="icon" aria-label="Warning" />}
        >
          <IconPlaceholder
            lucide="AlertTriangleIcon"
            tabler="IconAlertTriangle"
            hugeicons="Alert01Icon"
            phosphor="WarningIcon"
            remixicon="RiAlertLine"
          />
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-2 text-sm">
            <IconPlaceholder
              lucide="AlertTriangleIcon"
              tabler="IconAlertTriangle"
              hugeicons="Alert02Icon"
              phosphor="WarningIcon"
              remixicon="RiAlertLine"
              className="size-4 shrink-0"
            />
            This action cannot be undone
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}