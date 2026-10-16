import { Button } from "../../shadcn/ui/button"
import { ButtonGroup } from "../../shadcn/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../shadcn/ui/dropdown-menu"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <ButtonGroup>
      <Button variant="outline">Update</Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="icon">
              <IconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
                aria-hidden="true"
              />
            </Button>
          }
        />
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem>Production</DropdownMenuItem>
          <DropdownMenuItem>Staging</DropdownMenuItem>
          <DropdownMenuItem>Development</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}