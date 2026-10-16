import { Button } from "../../shadcn/ui/button"
import {
  ButtonGroup,
  ButtonGroupText,
} from "../../shadcn/ui/button-group"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <ButtonGroup>
      <Button size="sm" variant="outline">
        <IconPlaceholder
          lucide="UserPlusIcon"
          tabler="IconUserPlus"
          hugeicons="UserAdd01Icon"
          phosphor="UserPlusIcon"
          remixicon="RiUserAddLine"
          aria-hidden="true"
        />
        Follow
      </Button>
      <ButtonGroupText className="text-muted-foreground">
        2.4k followers
      </ButtonGroupText>
    </ButtonGroup>
  )
}