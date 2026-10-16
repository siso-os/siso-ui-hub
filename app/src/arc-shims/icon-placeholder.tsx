// shadcn's create-app IconPlaceholder (reui uses it 548 times): it names one icon per icon library; the hub draws the
// lucide one, which every part names, so the part shows its real icon
import * as Lucide from "lucide-react"
import type { ComponentType, SVGProps } from "react"
type Props = SVGProps<SVGSVGElement> & { lucide?: string; tabler?: string; hugeicons?: string; phosphor?: string; remixicon?: string; size?: number | string }
export function IconPlaceholder({ lucide, tabler, hugeicons, phosphor, remixicon, ...rest }: Props) {
  void tabler; void hugeicons; void phosphor; void remixicon
  const lib = Lucide as unknown as Record<string, ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>>
  const Icon = (lucide && (lib[lucide] || lib[lucide.replace(/Icon$/, "")])) || Lucide.Square
  return <Icon {...rest} />
}
export default IconPlaceholder
