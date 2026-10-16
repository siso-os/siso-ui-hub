import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "./alert"
import { Frame, FramePanel } from "./frame"

import { Button } from "../../shadcn/ui/button"
import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <div className="mx-auto mb-auto w-full max-w-lg">
      <Frame>
        <FramePanel className="overflow-hidden p-0!">
          <Alert
            variant="destructive"
            className="bg-destructive/5 border-0 shadow-none"
          >
            <IconPlaceholder
              lucide="CreditCardIcon"
              tabler="IconCreditCard"
              hugeicons="CreditCardIcon"
              phosphor="CreditCardIcon"
              remixicon="RiBankCardLine"
            />
            <AlertTitle>Subscription Expiring</AlertTitle>
            <AlertAction>
              <Button size="xs" variant="destructive">
                Renew Now
              </Button>
            </AlertAction>
            <AlertDescription>
              Your annual subscription will expire in 3 days. Renew now to avoid
              service interruption and data loss.
            </AlertDescription>
          </Alert>
        </FramePanel>
      </Frame>
    </div>
  )
}