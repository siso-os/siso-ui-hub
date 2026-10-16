import { Textarea } from "../../shadcn/ui/textarea"

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <Textarea
        placeholder="Type your message here…"
        aria-invalid="true"
        className="w-full"
      />
    </div>
  )
}