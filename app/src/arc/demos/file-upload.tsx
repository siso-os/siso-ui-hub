// From Arc's docs page (Usage), imports pointed at the copied source
import { FileUpload } from "../file-upload/file-upload";

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
