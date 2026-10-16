import { Badge } from "../../../../shadcn/ui/badge";
import { Separator } from "../../../../shadcn/ui/separator";

const WithBadgeDemo = () => {
  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <Badge className="h-6 shrink-0 rounded-full px-4 text-xs font-medium">
          New Features
        </Badge>
        <Separator className="flex-1" />
      </div>
    </div>
  );
};

export default WithBadgeDemo;
