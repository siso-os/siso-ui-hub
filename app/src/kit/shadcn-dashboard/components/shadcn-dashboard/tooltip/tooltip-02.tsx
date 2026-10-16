"use client";
import { InfoIcon } from "lucide-react";
import { Button } from "../../../../shadcn/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../../shadcn/ui/tooltip";

const ContentTooltipDemo = () => {
  return (
    
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline">Content Tooltip</Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-64 py-3 text-pretty">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <InfoIcon className="size-4" />
              <span className="text-sm font-medium">Design for Everyone</span>
            </div>
            <span className="text-background/80">
             Use tooltips as helpful guidance, not as a dependency. Important content should always be easy to find and understand.
            </span>
          </div>
        </TooltipContent>
      </Tooltip>
   
  );
};

export default ContentTooltipDemo;
