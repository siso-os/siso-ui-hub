// Hand-wired: Arc's docs example plus the state and sample data it references
import { useState } from "react";
import { ActionButton } from "@siso/atoms/source";

export default function ActionButtonDemo() {
  const [publishedAt, setPublishedAt] = useState<string | null>(null);

  async function publish() {
    await new Promise((resolve) => setTimeout(resolve, 900));
    const at = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    console.info("Publish: the post is live as of", at);
    setPublishedAt(at);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <ActionButton
        label="Publish"
        pendingLabel="Publishing"
        successLabel="Published"
        onAction={publish}
        onActionError={(error) => console.error("Publish failed:", error)}
      />
      <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{publishedAt ? `Last published at ${publishedAt}` : "Not published yet"}</p>
    </div>
  );
}

// uihub: siso:package-workbench
