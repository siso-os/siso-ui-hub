// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { RichTextEditor, type RichTextValue } from "@siso/ui/blocks/source";

export function PostEditor() {
  const [doc, setDoc] = useState<RichTextValue | null>(null);
  return (
    <>
      <RichTextEditor
        aria-label="Post body"
        placeholder="Write your update"
        defaultMarkdown={"# Release notes\n\n- Faster search\n- New **dark** theme"}
        onChange={setDoc}
      />
      <button type="button" disabled={!doc || doc.empty} onClick={() => save(doc!.markdown)}>
        Publish
      </button>
    </>
  );
}

declare function save(markdown: string): void;
