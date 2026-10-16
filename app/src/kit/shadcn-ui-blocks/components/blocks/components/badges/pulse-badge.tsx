import { Badge } from '../../../ui/badge';

{
  /* Add this to your global CSS file:
@keyframes pulse-subtle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
*/
}

export default function PulseBadge() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Badge variant="default" className="animate-pulse-subtle">
        Default
      </Badge>

      <Badge variant="secondary" className="animate-pulse-subtle">
        Secondary
      </Badge>

      <Badge variant="destructive" className="animate-pulse-subtle">
        Destructive
      </Badge>

      <Badge variant="outline" className="animate-pulse-subtle">
        Outline
      </Badge>
    </div>
  );
}
