import { Badge } from "./badge"

import { Button } from "../../shadcn/ui/button"

export function Pattern() {
  return (
    <Button aria-label="Updates (new)">
      Updates
      <Badge variant="success" size="xs" aria-hidden="true">
        New
      </Badge>
    </Button>
  )
}