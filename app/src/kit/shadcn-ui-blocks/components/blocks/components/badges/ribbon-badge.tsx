import { Badge } from '../../../ui/badge';

export default function RibbonBadge() {
  return (
    <div className="flex flex-wrap justify-center gap-8 p-6">
      <div className="relative">
        <div className="bg-primary text-primary-foreground hover:bg-primary/80 absolute top-1/2 -left-3 h-6 w-2 -translate-y-1/2 rounded-l-sm"></div>
        <Badge variant="default" className="rounded-l-none pl-3">
          Default
        </Badge>
      </div>

      <div className="relative">
        <div className="bg-secondary text-secondary-foreground hover:bg-secondary/80 absolute top-1/2 -left-3 h-6 w-2 -translate-y-1/2 rounded-l-sm"></div>
        <Badge variant="secondary" className="rounded-l-none pl-3">
          Secondary
        </Badge>
      </div>

      <div className="relative">
        <div className="bg-destructive text-destructive-foreground hover:bg-destructive/80 absolute top-1/2 -left-3 h-6 w-2 -translate-y-1/2 rounded-l-sm"></div>
        <Badge variant="destructive" className="rounded-l-none pl-3">
          Destructive
        </Badge>
      </div>

      <div className="relative">
        <div className="absolute top-1/2 -left-3 h-6 w-2 -translate-y-1/2 rounded-l-sm border"></div>
        <Badge variant="outline" className="rounded-l-none pl-3">
          Outline
        </Badge>
      </div>
    </div>
  );
}
