import { Alert, AlertDescription, AlertTitle } from "../../../ui/alert";
import { AlertCircle, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function PulseBorderAlerts() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Alert className="relative shadow-md after:absolute after:inset-0 after:border-2 after:border-current after:animate-pulse">
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This alert has a pulsing border animation.
        </AlertDescription>
      </Alert>

      <Alert
        variant="destructive"
        className="relative shadow-md after:absolute after:inset-0 after:border-2 after:border-current after:animate-pulse"
      >
        <XCircle className="h-4 w-4" />
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>
          This alert has a pulsing border animation.
        </AlertDescription>
      </Alert>

      <Alert className="border-green-500/50 text-green-700 dark:border-green-500 dark:text-green-400 [&>svg]:text-green-500 relative shadow-md after:absolute after:inset-0 after:border-2 after:border-current after:animate-pulse">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success Alert</AlertTitle>
        <AlertDescription>
          This alert has a pulsing border animation.
        </AlertDescription>
      </Alert>

      <Alert className="border-yellow-500/50 text-yellow-700 dark:border-yellow-500 dark:text-yellow-400 [&>svg]:text-yellow-500 relative shadow-md after:absolute after:inset-0 after:border-2 after:border-current after:animate-pulse">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>
          This alert has a pulsing border animation.
        </AlertDescription>
      </Alert>

      <Alert className="border-blue-500/50 text-blue-700 dark:border-blue-500 dark:text-blue-400 [&>svg]:text-blue-500 relative shadow-md after:absolute after:inset-0 after:border-2 after:border-current after:animate-pulse">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Info Alert</AlertTitle>
        <AlertDescription>
          This alert has a pulsing border animation.
        </AlertDescription>
      </Alert>
    </div>
  );
}
