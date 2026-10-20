// From Arc's docs page (Usage), imports pointed at the copied source
import { UsageMeter } from "@siso/atoms/source";

export function StorageCard() {
  return (
    <UsageMeter
      label="Workspace storage"
      unit="GB"
      limit={50}
      segments={[
        { id: "files", label: "Files", value: 21.4 },
        { id: "media", label: "Media", value: 14.2 },
        { id: "backups", label: "Backups", value: 6.8 },
      ]}
    />
  );
}

// uihub: siso:package-workbench
