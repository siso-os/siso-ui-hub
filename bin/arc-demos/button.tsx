// Hand-wired: Arc's docs example plus the state and sample data it references
import { useState } from "react";
import { Button } from "../button/button";

export default function ButtonDemo() {
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    const at = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    console.info("Saved the changes at", at);
    setSaving(false);
    setSavedAt(at);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <Button variant="primary" loading={saving} onClick={save}>
        Save changes
      </Button>
      <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{savedAt ? `Saved at ${savedAt}` : "No changes saved yet"}</p>
    </div>
  );
}
