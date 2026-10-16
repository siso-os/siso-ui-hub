import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "./alert"

import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <Alert variant="destructive">
      <IconPlaceholder
        lucide="CircleAlertIcon"
        tabler="IconAlertCircle"
        hugeicons="AlertCircleIcon"
        phosphor="WarningCircleIcon"
        remixicon="RiErrorWarningLine"
      />
      <AlertTitle>Error! Something went wrong</AlertTitle>
      <AlertDescription>
        Please try again. If the problem persists, contact support.
      </AlertDescription>
    </Alert>
  )
}