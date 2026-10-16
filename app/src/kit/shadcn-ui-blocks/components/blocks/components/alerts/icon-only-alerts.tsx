import { Alert, AlertDescription, AlertTitle } from "../../../ui/alert";
import { AlertCircle, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function IconOnlyAlerts() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Alert className="flex items-center gap-4 py-3">
        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
          <AlertCircle className="h-6 w-6" />
        </div>
        <div>
          <AlertTitle className="font-semibold">Default Alert</AlertTitle>
          <AlertDescription className="text-xs opacity-70">
            Alert with a prominent icon.
          </AlertDescription>
        </div>
      </Alert>

      <Alert variant="destructive" className="flex items-center gap-4 py-3">
        <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
          <XCircle className="h-6 w-6" />
        </div>
        <div>
          <AlertTitle className="font-semibold">Destructive Alert</AlertTitle>
          <AlertDescription className="text-xs opacity-70">
            Alert with a prominent icon.
          </AlertDescription>
        </div>
      </Alert>

      <Alert className="border-green-500/50 text-green-700 dark:border-green-500 dark:text-green-400 [&>svg]:text-green-500 flex items-center gap-4 py-3">
        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
          <CheckCircle className="h-6 w-6" />
        </div>
        <div>
          <AlertTitle className="font-semibold">Success Alert</AlertTitle>
          <AlertDescription className="text-xs opacity-70">
            Alert with a prominent icon.
          </AlertDescription>
        </div>
      </Alert>

      <Alert className="border-yellow-500/50 text-yellow-700 dark:border-yellow-500 dark:text-yellow-400 [&>svg]:text-yellow-500 flex items-center gap-4 py-3">
        <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <div>
          <AlertTitle className="font-semibold">Warning Alert</AlertTitle>
          <AlertDescription className="text-xs opacity-70">
            Alert with a prominent icon.
          </AlertDescription>
        </div>
      </Alert>

      <Alert className="border-blue-500/50 text-blue-700 dark:border-blue-500 dark:text-blue-400 [&>svg]:text-blue-500 flex items-center gap-4 py-3">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
          <AlertCircle className="h-6 w-6" />
        </div>
        <div>
          <AlertTitle className="font-semibold">Info Alert</AlertTitle>
          <AlertDescription className="text-xs opacity-70">
            Alert with a prominent icon.
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}
