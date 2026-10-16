import { Badge } from '../../../ui/badge';
import { CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';

export default function IconBadge() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Badge variant="default" className="flex items-center gap-1 px-2 py-1">
        <CheckCircle2 className="h-3.5 w-3.5" />
        <span>Default</span>
      </Badge>

      <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1">
        <Info className="h-3.5 w-3.5" />
        <span>Secondary</span>
      </Badge>

      <Badge
        variant="destructive"
        className="flex items-center gap-1 px-2 py-1"
      >
        <XCircle className="h-3.5 w-3.5" />
        <span>Destructive</span>
      </Badge>

      <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
        <AlertTriangle className="h-3.5 w-3.5" />
        <span>Outline</span>
      </Badge>
    </div>
  );
}
