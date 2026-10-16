import { Frame, FramePanel } from "./frame"
import { IconTile } from "./icon-tile"

import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <Frame className="w-full max-w-xs">
      <FramePanel className="flex flex-col gap-3">
        <IconTile variant="elevated" size="lg" aria-hidden="true">
          <IconPlaceholder
            lucide="LayoutDashboardIcon"
            tabler="IconLayoutDashboard"
            hugeicons="DashboardSquare02Icon"
            phosphor="LayoutIcon"
            remixicon="RiDashboardLine"
          />
        </IconTile>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">Unified dashboard</h3>
          <p className="text-muted-foreground text-xs">
            Track every project, deployment and metric from a single workspace.
          </p>
        </div>
      </FramePanel>
    </Frame>
  )
}