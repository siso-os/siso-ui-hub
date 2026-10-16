import { Button } from "../../../../shadcn/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../../shadcn/ui/tooltip";

const RoundedTooltipDemo = () => {
  return (
     <Tooltip>
      <TooltipTrigger>
        <Button variant='outline'>
          Rounded
        </Button>
      </TooltipTrigger>
      <TooltipContent className='rounded-full'>
        This tooltip is rounded
      </TooltipContent>
    </Tooltip>
  );
};

export default RoundedTooltipDemo;
