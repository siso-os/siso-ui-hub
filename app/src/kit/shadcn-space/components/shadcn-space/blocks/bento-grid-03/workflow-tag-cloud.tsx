import {
  Building2,
  ClipboardList,
  Code,
  Layers,
  Megaphone,
  Package,
  Palette,
  Rocket,
  TrendingUp,
  User,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Marquee } from "../../animations/marquee";
import { Badge } from "../../../../../shadcn/ui/badge";

const rows: { icon: LucideIcon; label: string }[][] = [
  [
    { icon: Wrench, label: "Engineers" },
    { icon: TrendingUp, label: "Sales" },
    { icon: Megaphone, label: "Marketing" },
    { icon: User, label: "HR" },
  ],
  [
    { icon: Building2, label: "Enterprises" },
    { icon: ClipboardList, label: "Project Managers" },
    { icon: Code, label: "Developers" },
    { icon: Palette, label: "Designers" },
  ],
  [
    { icon: Layers, label: "Product Team" },
    { icon: Rocket, label: "Founders" },
    { icon: Package, label: "Product Team" },
    { icon: Wrench, label: "Engineers" },
  ],
];

function TagPill({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <Badge
      variant="outline"
      className="flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border-white/20 px-4 text-sm font-medium text-white backdrop-blur-sm"
    >
      <Icon className="size-4" />
      {label}
    </Badge>
  );
}

export function WorkflowTagCloud() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-6 overflow-hidden py-6">
      {rows.map((row, index) => (
        <Marquee
          key={index}
          reverse={index % 2 === 1}
          className="[--duration:25s] [--gap:0.75rem] p-0"
        >
          {row.map((tag, tagIndex) => (
            <TagPill key={`${tag.label}-${tagIndex}`} {...tag} />
          ))}
        </Marquee>
      ))}
    </div>
  );
}
