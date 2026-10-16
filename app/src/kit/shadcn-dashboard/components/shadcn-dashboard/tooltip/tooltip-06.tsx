import { Button } from "../../../../shadcn/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../shadcn/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../shadcn/ui/avatar";

const AvatarGroupTooltipDemo = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex flex-row justify-center items-center gap-6">
        <TooltipProvider>
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
            <Tooltip>
              <TooltipTrigger >
                <Avatar>
                  <AvatarImage
                    src="https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-1.webp"
                    alt="user"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                Chris Nolan
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger >
                <Avatar>
                  <AvatarImage
                    src="https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-2.webp"
                    alt="user"
                  />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                Laura Ross
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger >
                <Avatar>
                  <AvatarImage
                    src="https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-3.webp"
                    alt="user"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                John Roberts
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger >
                <Avatar>
                  <AvatarFallback className="text-card-foreground font-medium text-sm">
                    +4
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                4 more members
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default AvatarGroupTooltipDemo;
