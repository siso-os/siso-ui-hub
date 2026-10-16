import { Alert, AlertDescription, AlertTitle } from "../../../ui/alert";
import { AlertCircle, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function GlowBorderAlerts() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Alert className="relative shadow-md border-2 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-shadow duration-300">
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          Hover to see the border glow effect.
        </AlertDescription>
      </Alert>

      <Alert
        variant="destructive"
        className="relative shadow-md border-2 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-shadow duration-300"
      >
        <XCircle className="h-4 w-4" />
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>
          Hover to see the border glow effect.
        </AlertDescription>
      </Alert>

      <Alert className="border-green-500/50 text-green-700 dark:border-green-500 dark:text-green-400 [&>svg]:text-green-500 relative shadow-md border-2 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-shadow duration-300">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success Alert</AlertTitle>
        <AlertDescription>
          Hover to see the border glow effect.
        </AlertDescription>
      </Alert>

      <Alert className="border-yellow-500/50 text-yellow-700 dark:border-yellow-500 dark:text-yellow-400 [&>svg]:text-yellow-500 relative shadow-md border-2 hover:shadow-[0_0_15px_rgba(234,179,8,0.2)] transition-shadow duration-300">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>
          Hover to see the border glow effect.
        </AlertDescription>
      </Alert>

      <Alert className="border-blue-500/50 text-blue-700 dark:border-blue-500 dark:text-blue-400 [&>svg]:text-blue-500 relative shadow-md border-2 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-shadow duration-300">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Info Alert</AlertTitle>
        <AlertDescription>
          Hover to see the border glow effect.
        </AlertDescription>
      </Alert>
    </div>
  );
}
