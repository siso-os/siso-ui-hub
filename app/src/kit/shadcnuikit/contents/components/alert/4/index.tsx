import { Alert, AlertTitle } from "../../../../../shadcn/ui/alert";
import { XCircleIcon } from "lucide-react";

export default function AlertComponent() {
  return (
    <Alert variant="destructive">
      <XCircleIcon className="size-4" />
      <AlertTitle>Unable to process your payment.</AlertTitle>
    </Alert>
  );
}
