import { Kbd, KbdGroup } from "../../shadcn/ui/kbd"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <KbdGroup>
        <Kbd>
          <IconPlaceholder
            lucide="ArrowLeftIcon"
            tabler="IconArrowLeft"
            hugeicons="ArrowLeft02Icon"
            phosphor="ArrowLeftIcon"
            remixicon="RiArrowLeftLine"
          />
          Left
        </Kbd>
        <Kbd>
          <IconPlaceholder
            lucide="CircleDashedIcon"
            tabler="IconCircleDashed"
            hugeicons="DashedLineCircleIcon"
            phosphor="CircleDashedIcon"
            remixicon="RiLoaderLine"
          />
          Voice Enabled
        </Kbd>
      </KbdGroup>
    </div>
  )
}