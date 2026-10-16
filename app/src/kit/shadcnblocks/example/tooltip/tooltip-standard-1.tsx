"use client";

import { Button } from "../../../shadcn/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../shadcn/ui/tooltip";

export const title = "Simple Tooltip";

const Example = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default Example;
