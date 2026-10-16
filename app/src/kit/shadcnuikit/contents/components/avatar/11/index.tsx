import { Avatar, AvatarFallback, AvatarImage } from "../../../../../shadcn/ui/avatar";

export default function AvatarComponent() {
  return (
    <Avatar className="rounded-lg after:rounded-lg **:data-[slot=avatar-image]:rounded-lg **:data-[slot=avatar-fallback]:rounded-lg">
      <AvatarImage src="https://i.pravatar.cc/150?u=shadcn" alt="@shadcn" />
      <AvatarFallback>TB</AvatarFallback>
    </Avatar>
  );
}
