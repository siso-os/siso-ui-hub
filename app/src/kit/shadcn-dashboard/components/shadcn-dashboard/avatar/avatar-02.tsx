import { Avatar, AvatarFallback, AvatarImage } from "../../../../shadcn/ui/avatar";
const GroupAvatarDemo = () => {
  return (
    <div className="flex items-center justify-center px-4">
        <div className="flex flex-row justify-center items-center gap-6">
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 ">
            <Avatar >
              <AvatarImage src="https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-1.webp" alt="user" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar >
              <AvatarImage
                src="https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-2.webp"
                alt="user"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar >
              <AvatarImage
                src="https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-3.webp"
                alt="user"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <Avatar >
              <AvatarFallback className="text-card-foreground font-medium text-sm">+4</AvatarFallback>
            </Avatar>
          </div>
        </div>
    </div>
  );
};

export default GroupAvatarDemo;
