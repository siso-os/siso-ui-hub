// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { FileDropzone } from "@siso/blocks/source";

export function AttachmentUpload() {
  return (
    <FileDropzone
      description="Demonstration upload only — files stay in this browser"
      accept=".pdf,image/*"
      maxFiles={3}
      maxSize={10 * 1024 * 1024}
      onUpload={async (item, { onProgress, signal }) => {
        await uploadFile(item.file!, { onProgress, signal });
      }}
    />
  );
}

/** Original docs transport placeholder completed with an explicit local-only progress demonstration. */
async function uploadFile(_file: File, { onProgress, signal }: { onProgress: (percent: number) => void; signal: AbortSignal }) {
  for (let percent = 0; percent <= 100; percent += 10) {
    if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
    onProgress(percent);
    await new Promise<void>((resolve, reject) => {
      const aborted = () => { clearTimeout(timer); reject(new DOMException('Aborted', 'AbortError')); };
      const timer = setTimeout(() => { signal.removeEventListener('abort', aborted); resolve(); }, 90);
      signal.addEventListener('abort', aborted, { once: true });
    });
  }
}
