import { toast } from "sonner"

import { Field } from "../../shadcn/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../../shadcn/ui/input-group"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <Field className="max-w-xs">
      <InputGroup>
        <InputGroupInput placeholder="Component name..." />
        <InputGroupAddon align="inline-end">
          <IconPlaceholder
            lucide="StarIcon"
            tabler="IconStar"
            hugeicons="StarIcon"
            phosphor="StarIcon"
            remixicon="RiStarLine"
            className="text-muted-foreground size-4"
          />
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            onClick={() => toast.success("Copied to clipboard")}
          >
            <IconPlaceholder
              lucide="CopyIcon"
              tabler="IconCopy"
              hugeicons="CopyIcon"
              phosphor="CopyIcon"
              remixicon="RiFileCopyLine"
              className="size-4"
            />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}