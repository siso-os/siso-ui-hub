import { Badge } from '../../../ui/badge';

export default function HoverScaleBadge() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <div className="group">
        <Badge
          variant="default"
          className="transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md"
        >
          Default
        </Badge>
      </div>

      <div className="group">
        <Badge
          variant="secondary"
          className="transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md"
        >
          Secondary
        </Badge>
      </div>

      <div className="group">
        <Badge
          variant="destructive"
          className="transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md"
        >
          Destructive
        </Badge>
      </div>

      <div className="group">
        <Badge
          variant="outline"
          className="transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md"
        >
          Outline
        </Badge>
      </div>
    </div>
  );
}
