import { Alert, AlertDescription, AlertTitle } from "../../../ui/alert";
import { AlertCircle, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function InsetAlerts() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Alert className="shadow-inner bg-gray-50 dark:bg-gray-900 border-2">
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This alert has an inset shadow to appear pressed into the page.
        </AlertDescription>
      </Alert>

      <Alert
        variant="destructive"
        className="shadow-inner bg-gray-50 dark:bg-gray-900 border-2"
      >
        <XCircle className="h-4 w-4" />
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>
          This alert has an inset shadow to appear pressed into the page.
        </AlertDescription>
      </Alert>

      <Alert className="border-green-500/50 text-green-700 dark:border-green-500 dark:text-green-400 [&>svg]:text-green-500 shadow-inner bg-gray-50 dark:bg-gray-900 border-2">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success Alert</AlertTitle>
        <AlertDescription>
          This alert has an inset shadow to appear pressed into the page.
        </AlertDescription>
      </Alert>

      <Alert className="border-yellow-500/50 text-yellow-700 dark:border-yellow-500 dark:text-yellow-400 [&>svg]:text-yellow-500 shadow-inner bg-gray-50 dark:bg-gray-900 border-2">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>
          This alert has an inset shadow to appear pressed into the page.
        </AlertDescription>
      </Alert>

      <Alert className="border-blue-500/50 text-blue-700 dark:border-blue-500 dark:text-blue-400 [&>svg]:text-blue-500 shadow-inner bg-gray-50 dark:bg-gray-900 border-2">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Info Alert</AlertTitle>
        <AlertDescription>
          This alert has an inset shadow to appear pressed into the page.
        </AlertDescription>
      </Alert>
    </div>
  );
}
