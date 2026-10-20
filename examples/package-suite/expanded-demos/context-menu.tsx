// uihub: siso:package-workbench
// Hand-wired: Arc's docs example plus the state and sample data it references
import { useState } from "react";
import { Copy, Trash2 } from "lucide-react";
import { ContextMenu } from "@siso/ui/blocks/source";

type FileRow = { id: string; name: string; kind: string; size: string };

const SAMPLE_FILES: FileRow[] = [
  { id: "f1", name: "brand-kit.fig", kind: "Figma file", size: "4.2 MB" },
  { id: "f2", name: "logo-marks.svg", kind: "Vector", size: "18 KB" },
  { id: "f3", name: "q4-campaign.docx", kind: "Document", size: "312 KB" },
  { id: "f4", name: "site-backup.zip", kind: "Archive", size: "88 MB" },
];

function FilePreview({ file }: { file: FileRow }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
        padding: 12,
        borderRadius: 12,
        border: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 500 }}>{file.name}</span>
      <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
        {file.kind} · {file.size}
      </span>
    </div>
  );
}

export default function ContextMenuDemo() {
  const [files, setFiles] = useState<FileRow[]>(SAMPLE_FILES);
  const [copied, setCopied] = useState<string | null>(null);

  function copyLink(file: FileRow) {
    console.info("Copied the link for", file.name);
    setCopied(file.name);
  }

  function remove(file: FileRow) {
    console.info("Removed", file.name);
    setFiles((prev) => prev.filter((row) => row.id !== file.id));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 520 }}>
      <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)" }}>Right-click a tile (or focus it and press Shift+F10) for its menu.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {files.map((file) => (
          <ContextMenu
            key={file.id}
            label={`Actions for ${file.name}`}
            items={[
              { id: "copy", label: "Copy link", icon: <Copy size={15} />, onSelect: () => copyLink(file) },
              { id: "delete", label: "Delete file", icon: <Trash2 size={15} />, destructive: true, onSelect: () => remove(file) },
            ]}
          >
            <FilePreview file={file} />
          </ContextMenu>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)" }}>
        {copied ? `Link copied for ${copied}` : `${files.length} files`}
      </p>
    </div>
  );
}
