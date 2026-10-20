// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { Switch } from "@siso/atoms/source";

export function NotificationsToggle() {
  const [enabled, setEnabled] = useState(true);
  return <Switch label="Email notifications" checked={enabled} onCheckedChange={setEnabled} />;
}

// uihub: siso:package-workbench
