"use client"

import { BellIcon } from "@heroicons/react/24/outline"
import { Button } from "../../../ui/button"
import { Popover, PopoverContent } from "../../../ui/popover"

export default function PopoverArrowDemo() {
  return (
    <Popover>
      <Button intent="outline" size="sq-sm">
        <BellIcon />
      </Button>
      <PopoverContent arrow className="p-4 sm:min-w-72">
        You have 3 new notifications.
      </PopoverContent>
    </Popover>
  )
}
