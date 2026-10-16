// From Arc's docs page (Usage), imports pointed at the copied source
import { Breadcrumb } from "../breadcrumb/breadcrumb";

export function SettingsPath() {
  return (
    <Breadcrumb
      items={[
        { label: "Workspace", href: "/" },
        { label: "Settings", href: "/settings" },
        { label: "Billing" },
      ]}
    />
  );
}
