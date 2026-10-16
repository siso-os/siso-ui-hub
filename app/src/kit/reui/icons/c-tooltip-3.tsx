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
          render={
            <Button variant="ghost" size="icon" aria-label="More information" />
          }
        >
          <IconPlaceholder
            lucide="InfoIcon"
            tabler="IconInfoCircle"
            hugeicons="InformationCircleIcon"
            phosphor="InfoIcon"
            remixicon="RiInformationLine"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-center text-sm">
            Additional information and help context.
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}