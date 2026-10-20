import { useState, type ReactNode } from "react";
// shadcn
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./ui/popover"
import { Separator } from "./ui/separator"

// assets
import { Bell, Check, CircleAlert, Mail, UserPlus } from "lucide-react"

//  ------------------------------ | POPOVER - NOTIFICATIONS | ------------------------------  //

export interface UiableNotificationsProps { children?:ReactNode; onMarkAllRead?:()=>void; onViewAll?:()=>void; }
export function PopoverNotifications({children,onMarkAllRead,onViewAll}:UiableNotificationsProps = {}) {
  const [allRead,setAllRead]=useState(false);
  return (
    <Popover>
      <PopoverTrigger aria-label="Notifications"
        render={
          <Button
            variant="outline"
            size="icon"
            className="relative h-10 w-10 dark:border-border"
          />
        }
      >
        <Bell className="h-5 w-5" />
        {!allRead&&<span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-primary" />}
      </PopoverTrigger>
      <PopoverContent className="w-80 gap-0 p-0" align="start">
        <div className="flex items-center justify-between p-4 pb-3">
          <PopoverHeader>
            <PopoverTitle className="text-sm font-semibold">
              Notifications
            </PopoverTitle>
          </PopoverHeader>
          <Button variant="link" size="sm" onClick={()=>{setAllRead(true);onMarkAllRead?.()}}>
            <Check className="mr-1 h-3 w-3" />
            {allRead?"All caught up":"Mark all read"}
          </Button>
        </div>
        <Separator />
        <div data-all-read={allRead} className="flex max-h-[320px] flex-col overflow-y-auto data-[all-read=true]:opacity-60">{children ?? <>
          {/* Notification 1 */}
          <div className="flex items-start gap-3 p-4">
            <div className="relative mt-0.5">
              <span className="absolute -top-0.5 right-0.5 z-10 flex h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
              <Avatar className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 after:border-none">
                <AvatarFallback className="bg-transparent">
                  <Mail className="h-4 w-4 text-primary" />
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm leading-none font-medium">New message</p>
                <span className="text-[10px] whitespace-nowrap text-muted-foreground">
                  5 min ago
                </span>
              </div>
              <p className="line-clamp-2 text-xs text-muted-foreground">
                Alex sent you a message about the project.
              </p>
            </div>
          </div>
          <Separator />
          {/* Notification 2 */}
          <div className="flex items-start gap-3 p-4">
            <div className="relative">
              <span className="absolute -top-0.5 right-0.5 z-10 flex h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
              <Avatar className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 after:border-none">
                <AvatarFallback className="bg-transparent">
                  <UserPlus className="h-4 w-4 text-primary" />
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm leading-none font-medium">New follower</p>
                <span className="text-[10px] whitespace-nowrap text-muted-foreground">
                  2 hours ago
                </span>
              </div>
              <p className="line-clamp-2 text-xs text-muted-foreground">
                Sarah started following you.
              </p>
            </div>
          </div>
          <Separator />
          {/* Notification 3 */}
          <div className="flex items-start gap-3 p-4 opacity-60">
            <div className="relative">
              <Avatar className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10 after:border-none">
                <AvatarFallback className="bg-transparent">
                  <CircleAlert className="h-4 w-4 text-destructive" />
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm leading-none font-medium">
                  Payment failed
                </p>
                <span className="text-[10px] whitespace-nowrap text-muted-foreground">
                  Yesterday
                </span>
              </div>
              <p className="line-clamp-2 text-xs text-muted-foreground">
                Your recent subscription payment was declined. Please update
                your billing info.
              </p>
            </div>
          </div>
        </>}</div>
        <Separator />
        <div className="p-2 text-center">
          <Button variant="ghost" className="h-8 w-full text-xs font-medium" disabled={!onViewAll} onClick={onViewAll}>
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// uihub: siso:blocks
