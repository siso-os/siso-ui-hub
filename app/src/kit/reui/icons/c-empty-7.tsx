import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../shadcn/ui/empty"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <div className="flex items-center justify-center p-4">
      <Empty className="py-16">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconPlaceholder
              lucide="InboxIcon"
              tabler="IconInbox"
              hugeicons="InboxIcon"
              phosphor="TrayIcon"
              remixicon="RiInboxLine"
            />
          </EmptyMedia>
          <EmptyTitle>Inbox zero</EmptyTitle>
          <EmptyDescription>
            You&apos;re all caught up. No new messages.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  )
}