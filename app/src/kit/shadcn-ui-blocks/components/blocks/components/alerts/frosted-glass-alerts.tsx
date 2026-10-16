import { Alert, AlertDescription, AlertTitle } from "../../../ui/alert";
import { AlertCircle, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function FrostedGlassAlerts() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Alert className="bg-white/70 dark:bg-gray-950/70 backdrop-blur-md border border-white/20 dark:border-gray-800/30 shadow-sm">
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This alert has a frosted glass appearance with backdrop blur.
        </AlertDescription>
      </Alert>

      <Alert
        variant="destructive"
        className="bg-red-500/10 backdrop-blur-md border border-red-500/20 shadow-sm"
      >
        <XCircle className="h-4 w-4" />
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>
          This alert has a frosted glass appearance with backdrop blur.
        </AlertDescription>
      </Alert>

      <Alert className="border-green-500/50 text-green-700 dark:border-green-500 dark:text-green-400 [&>svg]:text-green-500 bg-green-500/10 backdrop-blur-md border border-green-500/20 shadow-sm">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success Alert</AlertTitle>
        <AlertDescription>
          This alert has a frosted glass appearance with backdrop blur.
        </AlertDescription>
      </Alert>

      <Alert className="border-yellow-500/50 text-yellow-700 dark:border-yellow-500 dark:text-yellow-400 [&>svg]:text-yellow-500 bg-yellow-500/10 backdrop-blur-md border border-yellow-500/20 shadow-sm">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>
          This alert has a frosted glass appearance with backdrop blur.
        </AlertDescription>
      </Alert>

      <Alert className="border-blue-500/50 text-blue-700 dark:border-blue-500 dark:text-blue-400 [&>svg]:text-blue-500 bg-blue-500/10 backdrop-blur-md border border-blue-500/20 shadow-sm">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Info Alert</AlertTitle>
        <AlertDescription>
          This alert has a frosted glass appearance with backdrop blur.
        </AlertDescription>
      </Alert>
    </div>
  );
}
