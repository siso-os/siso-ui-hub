"use client"

import { useState } from "react"
import { Badge } from "./badge"

import { Toggle } from "../../shadcn/ui/toggle"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  const [pressed, setPressed] = useState(false)

  return (
    <div className="flex items-center justify-center">
      <Toggle
        aria-label="Toggle notifications"
        pressed={pressed}
        onPressedChange={setPressed}
      >
        <div className="relative">
          <IconPlaceholder
            lucide="BellIcon"
            tabler="IconBell"
            hugeicons="NotificationIcon"
            phosphor="BellIcon"
            remixicon="RiNotificationLine"
          />
          {!pressed && (
            <Badge
              variant="destructive"
              size="xs"
              className="absolute -top-2 -right-2 rounded-full!"
            >
              3
            </Badge>
          )}
        </div>
      </Toggle>
    </div>
  )
}