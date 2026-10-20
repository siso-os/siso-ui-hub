// uihub: siso:package-workbench
// Hand-wired: Arc's docs example plus the state and sample data it references
import { useState } from "react";
import { SplitButton } from "@siso/atoms/source";

type PullRequestState = "Open" | "Merged" | "Squash merged" | "Rebased" | "Closed";

export default function SplitButtonDemo() {
  const [state, setState] = useState<PullRequestState>("Open");

  async function run(next: PullRequestState, message: string) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.info(message);
    setState(next);
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        width: "100%",
        maxWidth: 520,
        padding: 14,
        borderRadius: 14,
        border: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 500 }}>Cable every part to Arc's theme tokens</span>
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
          #482 · {state} · 12 files changed
        </span>
      </div>
      <SplitButton
        label="Merge pull request"
        onClick={() => run("Merged", "Merged pull request #482")}
        actions={[
          { label: "Squash and merge", onSelect: () => run("Squash merged", "Squash and merged #482 into a single commit") },
          { label: "Rebase and merge", onSelect: () => run("Rebased", "Rebased and merged #482 onto main") },
          { label: "Close pull request", onSelect: () => run("Closed", "Closed #482 without merging"), destructive: true },
        ]}
      />
    </div>
  );
}

// uihub: siso:package-workbench
