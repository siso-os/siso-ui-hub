import { Badge } from '../../../ui/badge';

export default function SquareBadge() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Badge variant="default" className="rounded-none px-3">
        Default
      </Badge>

      <Badge variant="secondary" className="rounded-none px-3">
        Secondary
      </Badge>

      <Badge variant="destructive" className="rounded-none px-3">
        Destructive
      </Badge>

      <Badge variant="outline" className="rounded-none px-3">
        Outline
      </Badge>
    </div>
  );
}
