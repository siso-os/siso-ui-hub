// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { Switch } from "../switch/switch";

export function NotificationsToggle() {
  const [enabled, setEnabled] = useState(true);
  return <Switch label="Email notifications" checked={enabled} onCheckedChange={setEnabled} />;
}
