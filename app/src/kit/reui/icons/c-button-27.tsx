import { Button } from "../../shadcn/ui/button"

export function Pattern() {
  return (
    <Button render={<a href="/" />} nativeButton={false}>
      Back to Home
    </Button>
  )
}