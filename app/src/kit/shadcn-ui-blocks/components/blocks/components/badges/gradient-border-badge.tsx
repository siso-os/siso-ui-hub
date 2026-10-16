import { Badge } from '../../../ui/badge';

export default function GradientBorderBadge() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <div className="relative inline-flex">
        <div className="from-primary to-secondary absolute -inset-0.5 rounded-full bg-gradient-to-r opacity-75 blur-[1px]"></div>
        <Badge variant="secondary" className="relative border-0">
          Premium
        </Badge>
      </div>

      <div className="relative inline-flex">
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-75 blur-[1px]"></div>
        <Badge variant="secondary" className="relative border-0">
          Pro
        </Badge>
      </div>

      <div className="relative inline-flex">
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 opacity-75 blur-[1px]"></div>
        <Badge variant="secondary" className="relative border-0">
          VIP
        </Badge>
      </div>

      <div className="relative inline-flex">
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-75 blur-[1px]"></div>
        <Badge variant="secondary" className="relative border-0">
          Verified
        </Badge>
      </div>
    </div>
  );
}
