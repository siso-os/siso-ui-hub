import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../shadcn/ui/avatar"
import { Button } from "../../shadcn/ui/button"

export function Pattern() {
  return (
    <Button variant="outline">
      <Avatar className="size-5">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CH</AvatarFallback>
      </Avatar>
      <span className="text-xs">@shadcn</span>
    </Button>
  )
}