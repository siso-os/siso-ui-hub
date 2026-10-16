import { Button } from "../../shadcn/ui/button"
import { ButtonGroup } from "../../shadcn/ui/button-group"
import { Input } from "../../shadcn/ui/input"

export function Pattern() {
  return (
    <ButtonGroup>
      <Button variant="outline">Button</Button>
      <Input placeholder="Type something here..." />
    </ButtonGroup>
  )
}