import { Button } from "../../shadcn/ui/button"
import { Kbd } from "../../shadcn/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../shadcn/ui/tooltip"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button variant="outline" size="icon" aria-label="Search">
            <IconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="Search01Icon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            />
          </Button>
        }
      />
      <TooltipContent className="flex items-center gap-3">
        Search
        <Kbd className="-mr-1">⌘K</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}