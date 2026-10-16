import { Badge } from '../../../ui/badge';

export default function ElevatedBadge() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Badge
        variant="default"
        className="shadow-md transition-shadow hover:shadow-lg"
      >
        Default
      </Badge>

      <Badge
        variant="secondary"
        className="shadow-md transition-shadow hover:shadow-lg"
      >
        Secondary
      </Badge>

      <Badge
        variant="destructive"
        className="shadow-md transition-shadow hover:shadow-lg"
      >
        Destructive
      </Badge>

      <Badge
        variant="outline"
        className="shadow-md transition-shadow hover:shadow-lg"
      >
        Outline
      </Badge>
    </div>
  );
}
