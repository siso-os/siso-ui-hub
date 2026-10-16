import { Button } from "../../shadcn/ui/button"
import { Spinner } from "../../shadcn/ui/spinner"

export function Pattern() {
  return (
    <Button disabled>
      <Spinner aria-hidden="true" />
      Please wait
    </Button>
  )
}