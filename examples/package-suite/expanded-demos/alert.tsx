// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { Alert } from "@siso/atoms/source";

export function BillingNotice() {
  return (
    <Alert tone="warning" title="Card expires soon" onDismiss={() => track("dismissed")}>
      Update your payment method before March 1 to avoid interruption.
    </Alert>
  );
}

function track(event: string) { console.info("alert:", event); }

// uihub: siso:package-workbench
