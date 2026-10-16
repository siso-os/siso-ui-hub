import { Button } from "../../../../shadcn/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../../shadcn/ui/tooltip";

const ErrorTooltipDemo = () => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button variant="outline">Error Tooltip</Button>
      </TooltipTrigger>
      <TooltipContent className="bg-destructive text-white [&>*:last-child]:bg-destructive! [&>*:last-child]:fill-destructive!">
        This is an error tooltip
      </TooltipContent>
    </Tooltip>
  );
};

export default ErrorTooltipDemo;
