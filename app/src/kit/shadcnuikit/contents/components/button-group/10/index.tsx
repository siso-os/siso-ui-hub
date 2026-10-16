import { Button } from "../../../../../shadcn/ui/button"
import { ButtonGroup } from "../../../../../shadcn/ui/button-group"
import { Input } from "../../../../../shadcn/ui/input"
import { SearchIcon } from "lucide-react"

export default function ButtonGroupComponent() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button variant="outline" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  )
}
