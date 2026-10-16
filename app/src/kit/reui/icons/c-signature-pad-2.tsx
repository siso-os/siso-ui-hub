import {
  SignaturePad,
  SignaturePadArea,
  SignaturePadClear,
  SignaturePadGuide,
  SignaturePadPlaceholder,
  SignaturePadRedo,
  SignaturePadUndo,
} from "./signature-pad"

import { ButtonGroup } from "../../shadcn/ui/button-group"
import { Kbd, KbdGroup } from "../../shadcn/ui/kbd"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <SignaturePad className="mx-auto max-w-lg">
      <div className="flex items-center gap-3">
        <ButtonGroup aria-label="History">
          <SignaturePadUndo />
          <SignaturePadRedo />
        </ButtonGroup>
        <p className="text-muted-foreground hidden items-center gap-1.5 text-xs sm:flex">
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>Z</Kbd>
          </KbdGroup>
          to undo
        </p>
        <SignaturePadClear size="sm" className="ms-auto">
          <IconPlaceholder
            lucide="BrushCleaningIcon"
            tabler="IconEraser"
            hugeicons="BrushCleaningIcon"
            phosphor="BroomIcon"
            remixicon="RiEraserLine"
            aria-hidden="true"
          />
          Clear
        </SignaturePadClear>
      </div>
      <SignaturePadArea className="h-48">
        <SignaturePadGuide />
        <SignaturePadPlaceholder>Draw your signature</SignaturePadPlaceholder>
      </SignaturePadArea>
    </SignaturePad>
  )
}