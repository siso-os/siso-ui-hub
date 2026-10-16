import { Button } from "../../shadcn/ui/button"
import {
  ButtonGroup,
  ButtonGroupText,
} from "../../shadcn/ui/button-group"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <ButtonGroup>
      <Button
        size="sm"
        variant="default"
        aria-label="Following 2.4k"
        className="border-primary"
      >
        <IconPlaceholder
          lucide="StarIcon"
          tabler="IconStar"
          hugeicons="StarIcon"
          phosphor="StarIcon"
          remixicon="RiStarLine"
        />
        Star
      </Button>
      <ButtonGroupText className="border-primary">2.4k</ButtonGroupText>
    </ButtonGroup>
  )
}