import { Badge } from "../../../../../shadcn/ui/badge";
import { Spinner } from "../../../../../shadcn/ui/spinner";

export default function Component() {
  return (
    <div className="flex items-center">
      <Badge>
        <Spinner data-icon="inline-start" />
        Syncing
      </Badge>
    </div>
  );
}
