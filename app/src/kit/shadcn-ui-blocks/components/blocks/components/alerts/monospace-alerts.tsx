import { Alert, AlertDescription, AlertTitle } from "../../../ui/alert";
import { AlertCircle, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function MonospaceAlerts() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Alert className="font-mono border-2 bg-gray-50 dark:bg-gray-900 shadow-sm">
        <AlertTitle className="font-mono text-sm">Default Alert</AlertTitle>
        <AlertDescription className="font-mono text-xs">
          This alert uses monospace font for a code-like appearance.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive" className="font-mono border-2 shadow-sm">
        <XCircle className="h-4 w-4" />
        <AlertTitle className="font-mono text-sm">Destructive Alert</AlertTitle>
        <AlertDescription className="font-mono text-xs">
          This alert uses monospace font for a code-like appearance.
        </AlertDescription>
      </Alert>

      <Alert className="border-green-500/50 text-green-700 dark:border-green-500 dark:text-green-400 [&>svg]:text-green-500 font-mono border-2 bg-gray-50 dark:bg-gray-900 shadow-sm">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle className="font-mono text-sm">Success Alert</AlertTitle>
        <AlertDescription className="font-mono text-xs">
          This alert uses monospace font for a code-like appearance.
        </AlertDescription>
      </Alert>

      <Alert className="border-yellow-500/50 text-yellow-700 dark:border-yellow-500 dark:text-yellow-400 [&>svg]:text-yellow-500 font-mono border-2 bg-gray-50 dark:bg-gray-900 shadow-sm">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle className="font-mono text-sm">Warning Alert</AlertTitle>
        <AlertDescription className="font-mono text-xs">
          This alert uses monospace font for a code-like appearance.
        </AlertDescription>
      </Alert>

      <Alert className="border-blue-500/50 text-blue-700 dark:border-blue-500 dark:text-blue-400 [&>svg]:text-blue-500 font-mono border-2 bg-gray-50 dark:bg-gray-900 shadow-sm">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="font-mono text-sm">Info Alert</AlertTitle>
        <AlertDescription className="font-mono text-xs">
          This alert uses monospace font for a code-like appearance.
        </AlertDescription>
      </Alert>
    </div>
  );
}
