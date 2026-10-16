import { Badge } from '../../../ui/badge';

export default function ThreeDimensionalBadge() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Badge
        variant="default"
        className="transform shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
      >
        Default
      </Badge>

      <Badge
        variant="secondary"
        className="transform shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
      >
        Secondary
      </Badge>

      <Badge
        variant="destructive"
        className="transform shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
      >
        Destructive
      </Badge>

      <Badge
        variant="outline"
        className="transform shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
      >
        Outline
      </Badge>
    </div>
  );
}
