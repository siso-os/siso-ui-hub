import { Alert, AlertDescription, AlertTitle } from "../../../ui/alert";
import { AlertCircle, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function CompactAlerts() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Alert className="py-2 px-3 text-sm">
        <AlertTitle className="text-sm font-medium">Default Alert</AlertTitle>
        <AlertDescription className="text-xs">
          This is a compact alert with less padding and smaller text.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive" className="py-2 px-3 text-sm">
        <XCircle className="h-3 w-3" />
        <AlertTitle className="text-sm font-medium">
          Destructive Alert
        </AlertTitle>
        <AlertDescription className="text-xs">
          This is a compact alert with less padding and smaller text.
        </AlertDescription>
      </Alert>

      <Alert className="border-green-500/50 text-green-700 dark:border-green-500 dark:text-green-400 [&>svg]:text-green-500 py-2 px-3 text-sm">
        <CheckCircle className="h-3 w-3" />
        <AlertTitle className="text-sm font-medium">Success Alert</AlertTitle>
        <AlertDescription className="text-xs">
          This is a compact alert with less padding and smaller text.
        </AlertDescription>
      </Alert>

      <Alert className="border-yellow-500/50 text-yellow-700 dark:border-yellow-500 dark:text-yellow-400 [&>svg]:text-yellow-500 py-2 px-3 text-sm">
        <AlertTriangle className="h-3 w-3" />
        <AlertTitle className="text-sm font-medium">Warning Alert</AlertTitle>
        <AlertDescription className="text-xs">
          This is a compact alert with less padding and smaller text.
        </AlertDescription>
      </Alert>

      <Alert className="border-blue-500/50 text-blue-700 dark:border-blue-500 dark:text-blue-400 [&>svg]:text-blue-500 py-2 px-3 text-sm">
        <AlertCircle className="h-3 w-3" />
        <AlertTitle className="text-sm font-medium">Info Alert</AlertTitle>
        <AlertDescription className="text-xs">
          This is a compact alert with less padding and smaller text.
        </AlertDescription>
      </Alert>
    </div>
  );
}
