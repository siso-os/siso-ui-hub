import { PreviewTrigger as PreviewTriggerPrimitive } from "react-aria-components/PreviewTrigger"
import { PopoverContent, type PopoverContentProps } from "./popover"
import { cx } from "../../lib/primitive"

const Preview = PreviewTriggerPrimitive
const PreviewContent = ({ className, ...props }: PopoverContentProps) => {
  return <PopoverContent className={cx("p-4 max-w-xs", className)} {...props} />
}

export { Preview, PreviewContent }
