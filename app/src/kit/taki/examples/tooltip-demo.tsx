import { Button } from "../ui/button"
import { Tooltip, TooltipTrigger } from "../ui/tooltip"

export default function TooltipDemo() {
  return (
    <TooltipTrigger>
      <Button variant="outline">Hover</Button>
      <Tooltip>Add to library</Tooltip>
    </TooltipTrigger>
  )
}
