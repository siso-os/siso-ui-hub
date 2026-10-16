import { Avatar, AvatarImage } from "../../../../../shadcn/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../../../shadcn/ui/tooltip";

export default function AvatarComponent() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Avatar>
          <AvatarImage alt="Jane Cooper" src="https://i.pravatar.cc/150?img=1" />
        </Avatar>
      </TooltipTrigger>
      <TooltipContent>Jane Cooper</TooltipContent>
    </Tooltip>
  );
}
