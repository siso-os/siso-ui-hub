import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../shadcn/ui/avatar"

export function Pattern() {
  return (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
        className="grayscale"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}