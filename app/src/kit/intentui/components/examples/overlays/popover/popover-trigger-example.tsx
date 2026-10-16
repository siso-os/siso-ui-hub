"use client"

import { Avatar } from "../../../ui/avatar"
import { Button } from "../../../ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../../../ui/popover"

export default function PopoverTriggerDemo() {
  return (
    <Popover>
      <PopoverTrigger aria-label="Open Popover">
        <Avatar alt="cobain" src="https://intentui.com/images/avatar/cobain.jpg" />
      </PopoverTrigger>
      <PopoverContent className="min-w-72">
        <PopoverHeader>
          <PopoverTitle>Email</PopoverTitle>
          <PopoverDescription>We'll send you an email to log in.</PopoverDescription>
        </PopoverHeader>
        <PopoverFooter>
          <Button>Send Login Link</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
