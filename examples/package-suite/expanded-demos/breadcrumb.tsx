// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { Breadcrumb } from "@siso/ui/blocks/source";

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
