import { Badge } from '../../../ui/badge';

// Add this to your global CSS file:
// @keyframes bounce {
//   0%, 100% {
//     transform: translateY(0);
//   }
//   50% {
//     transform: translateY(-5px);
//   }
// }
//
// .animate-bounce-badge {
//   animation: bounce 2s ease infinite;
// }
//
// .animate-bounce-badge-delay-1 {
//   animation-delay: 0.2s;
// }
//
// .animate-bounce-badge-delay-2 {
//   animation-delay: 0.4s;
// }
//
// .animate-bounce-badge-delay-3 {
//   animation-delay: 0.6s;
// }

export default function BounceBadge() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Badge variant="default" className="animate-bounce-badge">
        Default
      </Badge>

      <Badge
        variant="secondary"
        className="animate-bounce-badge animate-bounce-badge-delay-1"
      >
        Secondary
      </Badge>

      <Badge
        variant="destructive"
        className="animate-bounce-badge animate-bounce-badge-delay-2"
      >
        Destructive
      </Badge>

      <Badge
        variant="outline"
        className="animate-bounce-badge animate-bounce-badge-delay-3"
      >
        Outline
      </Badge>
    </div>
  );
}
