import {
  Field,
  FieldDescription,
  FieldLabel,
} from "../../shadcn/ui/field"
import { Input } from "../../shadcn/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../shadcn/ui/tooltip"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <Field className="max-w-xs">
      <div className="flex items-center gap-2">
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <Tooltip>
          <TooltipTrigger className="inline-flex items-center">
            <IconPlaceholder
              lucide="HelpCircleIcon"
              tabler="IconHelpCircle"
              hugeicons="HelpCircleIcon"
              phosphor="QuestionIcon"
              remixicon="RiQuestionLine"
              className="text-muted-foreground size-3.5"
            />
          </TooltipTrigger>
          <TooltipContent>
            Your unique identifier on the platform.
          </TooltipContent>
        </Tooltip>
      </div>
      <Input id="username" placeholder="johndoe" />
      <FieldDescription>
        Your unique identifier on the platform.
      </FieldDescription>
    </Field>
  )
}