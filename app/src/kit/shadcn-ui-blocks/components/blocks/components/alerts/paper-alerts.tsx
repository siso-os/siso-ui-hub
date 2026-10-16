import { Alert, AlertDescription, AlertTitle } from "../../../ui/alert";
import { AlertCircle, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function PaperAlerts() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Alert className="bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWY1ZjUiPjwvcmVjdD4KPC9zdmc+')] border-2 shadow-md">
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This alert has a paper-like texture background.
        </AlertDescription>
      </Alert>

      <Alert
        variant="destructive"
        className="bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWY1ZjUiPjwvcmVjdD4KPC9zdmc+')] border-2 shadow-md"
      >
        <XCircle className="h-4 w-4" />
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>
          This alert has a paper-like texture background.
        </AlertDescription>
      </Alert>

      <Alert className="border-green-500/50 text-green-700 dark:border-green-500 dark:text-green-400 [&>svg]:text-green-500 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWY1ZjUiPjwvcmVjdD4KPC9zdmc+')] border-2 shadow-md">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success Alert</AlertTitle>
        <AlertDescription>
          This alert has a paper-like texture background.
        </AlertDescription>
      </Alert>

      <Alert className="border-yellow-500/50 text-yellow-700 dark:border-yellow-500 dark:text-yellow-400 [&>svg]:text-yellow-500 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWY1ZjUiPjwvcmVjdD4KPC9zdmc+')] border-2 shadow-md">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>
          This alert has a paper-like texture background.
        </AlertDescription>
      </Alert>

      <Alert className="border-blue-500/50 text-blue-700 dark:border-blue-500 dark:text-blue-400 [&>svg]:text-blue-500 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWY1ZjUiPjwvcmVjdD4KPC9zdmc+')] border-2 shadow-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Info Alert</AlertTitle>
        <AlertDescription>
          This alert has a paper-like texture background.
        </AlertDescription>
      </Alert>
    </div>
  );
}
