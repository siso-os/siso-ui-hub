import { InfoIcon } from "lucide-react"

import { Button } from "../ui/button"
import { Tooltip, TooltipTrigger } from "../ui/tooltip"

export default function TooltipIcon() {
  return (
    <TooltipTrigger>
      <Button size="icon" variant="outline" aria-label="Information">
        <InfoIcon className="size-4" />
      </Button>
      <Tooltip>Get more information</Tooltip>
    </TooltipTrigger>
  )
}
