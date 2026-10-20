// uihub: siso:package-workbench
// Hand-wired: Arc's docs example plus the state and sample data it references
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { ConfirmMorph } from "@siso/atoms/source";

type FileRow = { id: string; name: string };

const SAMPLE_FILES: FileRow[] = [
  { id: "f1", name: "brand-kit.fig" },
  { id: "f2", name: "logo-marks.svg" },
  { id: "f3", name: "q4-campaign.docx" },
  { id: "f4", name: "site-backup.zip" },
];

export default function ConfirmMorphDemo() {
  const [files, setFiles] = useState<FileRow[]>(SAMPLE_FILES);
  const [trashed, setTrashed] = useState<FileRow[]>([]);
  // The selection the button acts on: the first three files still on the page.
  const ids = files.slice(0, 3).map((file) => file.id);

  async function deleteFiles(selected: string[]) {
    await new Promise((resolve) => setTimeout(resolve, 900));
    const gone = files.filter((file) => selected.includes(file.id));
    setFiles((prev) => prev.filter((file) => !selected.includes(file.id)));
    setTrashed((prev) => [...prev, ...gone]);
    console.info("Deleted", gone.map((file) => file.name).join(", ") || "nothing");
  }

  async function restoreFiles(selected: string[]) {
    await new Promise((resolve) => setTimeout(resolve, 900));
    const back = trashed.filter((file) => selected.includes(file.id));
    setTrashed((prev) => prev.filter((file) => !selected.includes(file.id)));
    setFiles((prev) =>
      [...prev, ...back].sort((a, b) => SAMPLE_FILES.findIndex((f) => f.id === a.id) - SAMPLE_FILES.findIndex((f) => f.id === b.id)),
    );
    console.info("Restored", back.map((file) => file.name).join(", ") || "nothing");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, width: "100%", maxWidth: 420 }}>
      <ConfirmMorph
        label="Delete files"
        icon={<Trash2 size={16} strokeWidth={1.75} />}
        prompt={`Delete ${ids.length} files?`}
        confirmMode="hold"
        onConfirm={() => deleteFiles(ids)}
        onUndo={() => restoreFiles(ids)}
      />
      <ul style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", padding: 0, margin: 0, listStyle: "none" }}>
        {files.map((file) => (
          <li key={file.id} style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface)", fontSize: 13 }}>
            {file.name}
          </li>
        ))}
      </ul>
      <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
        {files.length === 0
          ? `${trashed.length} files in the trash — hold the button to restore`
          : trashed.length > 0
            ? `${files.length} files left, ${trashed.length} in the trash`
            : `${files.length} files`}
      </p>
    </div>
  );
}

// uihub: siso:package-workbench
