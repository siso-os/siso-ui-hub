import { Toggle } from "../../shadcn/ui/toggle"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <Toggle variant="outline" aria-label="Toggle bookmark">
        <IconPlaceholder
          lucide="BookmarkIcon"
          tabler="IconBookmark"
          hugeicons="Bookmark02Icon"
          phosphor="BookmarkSimpleIcon"
          remixicon="RiBookmarkLine"
          className="group-data-[state=on]/toggle:fill-accent-foreground"
        />
        Bookmark
      </Toggle>
    </div>
  )
}