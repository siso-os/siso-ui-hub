// Hand-wired: Arc's docs example plus the state and sample data it references
import { useState } from "react";
// From Arc's docs page (Usage), imports pointed at the copied source
import { HoldToConfirm } from "../hold-to-confirm/hold-to-confirm";

export function DeleteProject({ onDelete }: { onDelete: () => void }) {
  return (
    <HoldToConfirm
      label="Hold to delete project"
      confirmedLabel="Deleted"
      duration={1500}
      onConfirm={onDelete}
    />
  );
}

export default function HoldToConfirmDemo() {
  const [deletedAt, setDeletedAt] = useState<string | null>(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <DeleteProject
        onDelete={() => {
          console.info("hold-to-confirm: hold completed, project deleted");
          setDeletedAt(new Date().toISOString());
        }}
      />
      <p>{deletedAt ? `Deleted at ${deletedAt}.` : "Press and hold for 1.5 seconds to confirm."}</p>
    </div>
  );
}
