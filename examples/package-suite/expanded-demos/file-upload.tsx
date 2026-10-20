import { uploadWithProgress } from "./preview-host";
// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { FileUpload } from "@siso/ui/blocks/source";

export function Attachments() {
  return (
    <FileUpload
      accept="image/*,.pdf"
      maxSize={10 * 1024 * 1024}
      onUpload={async (file, { onProgress, signal }) => {
        await uploadWithProgress(file, onProgress, signal);
      }}
    />
  );
}
