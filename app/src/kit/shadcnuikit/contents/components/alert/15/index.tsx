import { Alert, AlertDescription } from "../../../../../shadcn/ui/alert";
import { Button } from "../../../../../shadcn/ui/button";
import { XIcon } from "lucide-react";

export default function AlertComponent() {
  return (
    <Alert className="grid-cols-[auto_1fr_auto]! items-center">
      <AlertDescription>A friend request has been sent.</AlertDescription>
      <Button variant="ghost" size="icon-sm" className="ms-auto">
        <XIcon />
      </Button>
    </Alert>
  );
}
