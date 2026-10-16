import { Label } from "../../../../../shadcn/ui/label";
import { Textarea } from "../../../../../shadcn/ui/textarea";
import { Tooltip } from "../../../../../shadcn/ui/tooltip";
import { TooltipTrigger } from "../../../../../shadcn/ui/tooltip";
import { InfoIcon } from "lucide-react";
import { TooltipContent } from "../../../../../shadcn/ui/tooltip";

export default function TextareaComponent() {
  return (
    <div className="grid w-full max-w-sm gap-1.5 *:not-first:mt-2">
      <Label htmlFor="message">
        Your message{" "}
        <Tooltip>
          <TooltipTrigger asChild>
            <InfoIcon className="text-muted-foreground size-3" />
          </TooltipTrigger>
          <TooltipContent>
            <p>This is a tooltip</p>
          </TooltipContent>
        </Tooltip>
      </Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  );
}
