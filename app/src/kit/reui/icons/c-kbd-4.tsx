import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../shadcn/ui/input-group"
import { Kbd } from "../../shadcn/ui/kbd"

export function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <InputGroup className="max-w-xs">
        <InputGroupInput placeholder="Search…" />
        <InputGroupAddon>
          <Kbd>Space</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}