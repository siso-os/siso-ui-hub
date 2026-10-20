// uihub: siso:package-workbench
// Hand-wired: Arc's docs example plus the state and sample data it references
// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { Archive, Check, CopyPlus, Link, Pin, Trash2 } from "lucide-react";
import { ButtonGroup } from "@siso/atoms/source";

type Doc = { id: string; url: string };

export function DocumentActions({ doc }: { doc: Doc }) {
  const [copied, setCopied] = useState(false);
  return (
    <ButtonGroup
      label="Document actions"
      items={[
        {
          id: "share",
          label: copied ? "Copied" : "Share",
          reserve: ["Share", "Copied"],
          icon: copied ? <Check /> : <Link />,
          onSelect: async () => {
            await navigator.clipboard.writeText(doc.url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          },
        },
        { id: "duplicate", label: "Duplicate", icon: <CopyPlus />, onSelect: () => duplicate(doc.id) },
        { id: "archive", label: "Archive", icon: <Archive />, onSelect: () => archive(doc.id) },
      ]}
      menu={{
        label: "More actions",
        items: [
          { id: "pin", label: "Pin to sidebar", icon: <Pin />, onSelect: () => pin(doc.id) },
          { id: "delete", label: "Delete", icon: <Trash2 />, destructive: true, onSelect: () => remove(doc.id) },
        ],
      }}
    />
  );
}

function duplicate(id: string) {
  console.info(`button-group: duplicate ${id}`);
}

function archive(id: string) {
  console.info(`button-group: archive ${id}`);
}

function pin(id: string) {
  console.info(`button-group: pin ${id} to sidebar`);
}

function remove(id: string) {
  console.info(`button-group: delete ${id}`);
}

const demoDoc: Doc = { id: "doc_7ac21", url: "https://uiarc.dev/docs/launch-brief" };

export default function ButtonGroupDemo() {
  return <DocumentActions doc={demoDoc} />;
}

// uihub: siso:package-workbench
