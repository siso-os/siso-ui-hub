import { Badge } from "./badge"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../shadcn/ui/avatar"
import { Button } from "../../shadcn/ui/button"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <Badge variant="outline">
      <Avatar className="size-3.5">
        <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80" />
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      Alex
      <Button
        variant="ghost"
        size="icon"
        className="size-3 hover:bg-transparent"
      >
        <IconPlaceholder
          lucide="XIcon"
          tabler="IconX"
          hugeicons="MultiplicationSignIcon"
          phosphor="XIcon"
          remixicon="RiCloseLine"
        />
      </Button>
    </Badge>
  )
}