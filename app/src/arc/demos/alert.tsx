// From Arc's docs page (Usage), imports pointed at the copied source
import { Alert } from "../alert/alert";

export function BillingNotice() {
  return (
    <Alert tone="warning" title="Card expires soon" onDismiss={() => track("dismissed")}>
      Update your payment method before March 1 to avoid interruption.
    </Alert>
  );
}
