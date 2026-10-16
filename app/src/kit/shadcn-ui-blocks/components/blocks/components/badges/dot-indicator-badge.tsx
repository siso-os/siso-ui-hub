import { Badge } from '../../../ui/badge';

export default function DotIndicatorBadge() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Badge variant="default" className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="bg-primary-foreground/80 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
          <span className="bg-primary-foreground relative inline-flex h-2 w-2 rounded-full"></span>
        </span>
        Default
      </Badge>

      <Badge variant="secondary" className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="bg-secondary-foreground/80 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
          <span className="bg-secondary-foreground relative inline-flex h-2 w-2 rounded-full"></span>
        </span>
        Secondary
      </Badge>

      <Badge variant="destructive" className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="bg-destructive-foreground/80 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
          <span className="bg-destructive-foreground relative inline-flex h-2 w-2 rounded-full"></span>
        </span>
        Destructive
      </Badge>

      <Badge variant="outline" className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="bg-foreground/50 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
          <span className="bg-foreground/80 relative inline-flex h-2 w-2 rounded-full"></span>
        </span>
        Outline
      </Badge>
    </div>
  );
}
