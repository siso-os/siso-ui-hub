import { Search } from "lucide-react"

import { Input } from "../../../shadcn/ui/input"
import { cn } from "@/arc-shims/kit-utils"

function DataToolbar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="data-toolbar"
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  )
}

function DataToolbarSearch({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <div data-slot="data-toolbar-search" className="relative min-w-0 w-full flex-1 sm:min-w-48 sm:w-auto">
      <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
      <Input className={cn("pl-8", className)} {...props} />
    </div>
  )
}

function DataToolbarActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="data-toolbar-actions"
      className={cn("ml-auto flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  )
}

export { DataToolbar, DataToolbarActions, DataToolbarSearch }
