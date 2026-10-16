// From Arc's docs page (Usage), imports pointed at the copied source
import { FileDropzone } from "../file-dropzone/file-dropzone";

export function AttachmentUpload() {
  return (
    <FileDropzone
      accept=".pdf,image/*"
      maxFiles={3}
      maxSize={10 * 1024 * 1024}
      onUpload={async (item, { onProgress, signal }) => {
        await uploadFile(item.file!, { onProgress, signal });
      }}
    />
  );
}
