import { Badge } from '../../../ui/badge';

export default function ExtraLargeBadge() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Badge variant="default" className="px-6 py-2 text-base font-medium">
        Default
      </Badge>

      <Badge variant="secondary" className="px-6 py-2 text-base font-medium">
        Secondary
      </Badge>

      <Badge variant="destructive" className="px-6 py-2 text-base font-medium">
        Destructive
      </Badge>

      <Badge variant="outline" className="px-6 py-2 text-base font-medium">
        Outline
      </Badge>
    </div>
  );
}
