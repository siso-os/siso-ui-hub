import {
  ButtonGroup,
  ButtonGroupText,
} from "../../shadcn/ui/button-group"
import { Field } from "../../shadcn/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../shadcn/ui/input-group"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <Field className="max-w-xs">
      <ButtonGroup>
        <ButtonGroupText>https://</ButtonGroupText>
        <InputGroup>
          <InputGroupInput placeholder="example" />
          <InputGroupAddon align="inline-end">
            <IconPlaceholder
              lucide="InfoIcon"
              tabler="IconInfoCircle"
              hugeicons="InformationCircleIcon"
              phosphor="InfoIcon"
              remixicon="RiInformationLine"
              className="text-muted-foreground size-4"
            />
          </InputGroupAddon>
        </InputGroup>
        <ButtonGroupText>.com</ButtonGroupText>
      </ButtonGroup>
    </Field>
  )
}