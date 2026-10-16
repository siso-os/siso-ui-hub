import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../../../shadcn/ui/tooltip";
import { Button } from "../../../../../shadcn/ui/button";

export default function Component() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
