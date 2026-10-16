import { Badge } from '../../../ui/badge';

export default function LargeBadge() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Badge variant="default" className="px-4 py-1 text-sm">
        Default
      </Badge>

      <Badge variant="secondary" className="px-4 py-1 text-sm">
        Secondary
      </Badge>

      <Badge variant="destructive" className="px-4 py-1 text-sm">
        Destructive
      </Badge>

      <Badge variant="outline" className="px-4 py-1 text-sm">
        Outline
      </Badge>
    </div>
  );
}
