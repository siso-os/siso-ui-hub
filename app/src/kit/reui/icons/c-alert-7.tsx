import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "./alert"

import { IconPlaceholder } from "@/arc-shims/icon-placeholder"

export function Pattern() {
  return (
    <Alert variant="warning">
      <IconPlaceholder
        lucide="AlertTriangleIcon"
        tabler="IconAlertTriangle"
        hugeicons="Alert02Icon"
        phosphor="WarningIcon"
        remixicon="RiAlertLine"
      />
      <AlertTitle>Warning! Something is wrong</AlertTitle>
      <AlertDescription>
        Please check your settings. If the problem persists, contact support.
      </AlertDescription>
    </Alert>
  )
}