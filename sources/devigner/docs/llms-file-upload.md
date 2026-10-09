# File Upload

> An upload panel whose files drip out of the dropzone as liquid, then queue, pause, fail and retry in compact cards before you submit them.

- Page: https://ui.devigner.cc/components/file-upload
- Category: Forms
- Requirements: React 18 or 19, Tailwind CSS v4
- Install: `npx devignerui add file-upload` (writes components/ui/file-upload.tsx)
- Packages it needs: cn, motion, @devigner-ui/icons, devignerui

## What the demo shows

The live demo is an upload panel with fake uploads. Drag files over it and a badge with the file type and count follows the cursor; drop them and each card fades in as its row opens, then they upload two at a time. Remove one and it fades out as its row closes. Hover a card to pause it. Every third upload fails once, so Retry has something to do. A file over 25 MB or of the wrong type turns the dropzone red instead.

## When to use it

- Attaching files to a form or a message, where people want to see each file's progress and fix failures in place.
- Large uploads where pause, resume and a queue matter.

## When to reach for something else

- A single avatar or logo picker. A plain button and an image preview are lighter.
- Hundreds of files at once. The cards animate one by one; use a compact table with totals.

## Usage

```tsx
import { FileUploader } from "@/components/ui/file-upload";

<FileUploader upload={upload} accept=".zip,.pdf" maxSize={25 * 1024 * 1024} onSubmit={save} onCancel={close} />
```

Custom composition:

```tsx
<FileUploader upload={upload} accept="image/*" maxFiles={5} concurrency={3} resumable name="attachments" onDownload={download} />
```

### Upload with fetch-like progress

XMLHttpRequest reports upload progress; the signal cancels it.

```tsx
import { FileUploader, type FileUploaderContext } from "@/components/ui/file-upload";

function upload(file: File, { onProgress, signal }: FileUploaderContext) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (e) => onProgress(e.loaded / e.total);
    xhr.onload = () => (xhr.status < 400 ? resolve() : reject(new Error("Upload failed")));
    xhr.onerror = () => reject(new Error("Network error"));
    signal.addEventListener("abort", () => xhr.abort());
    xhr.open("POST", "/api/upload");
    xhr.send(file);
  });
}

export function Attachments() {
  return <FileUploader upload={upload} accept=".zip,.pdf,.ai,.cdr" maxSize={25 * 1024 * 1024} />;
}
```

### Your own list

The dropzone validates, you keep the files, and the card shows whatever state you hand it.

```tsx
import { useState } from "react";
import { FileDropzone, FileUpload } from "@/components/ui/file-upload";

export function Picker() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className="flex flex-col gap-3">
      <FileDropzone accept="image/*" maxSize={5 * 1024 * 1024} onFiles={(ok) => setFiles((f) => [...f, ...ok])} />
      {files.map((file) => (
        <FileUpload
          key={file.name}
          name={file.name}
          size={file.size}
          status="queued"
          onCancel={() => setFiles((f) => f.filter((x) => x !== file))}
        />
      ))}
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| upload | `(file, { onProgress, signal }) => Promise<void>` | - | Uploads one file; reject to show the error state. |
| accept | `string` | - | Allowed types, as on <input accept>. |
| maxSize | `number` | - | Largest file, in bytes. |
| maxFiles | `number` | - | Most files in the list. |
| multiple | `boolean` | true | More than one file per drop. |
| concurrency | `number` | 2 | Uploads at once; the rest queue. |
| resumable | `boolean` | false | Shows pause and resume. |
| name | `string` | - | Form field name for the listed files. |
| title | `ReactNode` | Upload Files | Header title. |
| description | `ReactNode` | Select the files you want to upload. | Header line under the title. |
| onClose | `() => void` | - | Shows the header close button. |
| onCancel | `() => void` | - | Shows Cancel; clears the list first. |
| onSubmit | `(files) => void` | - | Shows Submit; gets the completed files. |
| cancelLabel | `string` | Cancel | Cancel button text. |
| submitLabel | `string` | Submit Files | Submit button text. |
| onUploaded | `(file) => void` | - | Fires when a file finishes. |
| onDownload | `(file) => void` | - | Adds Download to finished files. |
| label | `ReactNode` | Drag and drop files or | Dropzone first line. |
| chooseLabel | `ReactNode` | choose | The picker link. |
| hint | `ReactNode` | from maxSize and accept | Dropzone second line. |
| disabled | `boolean` | false | Disables the dropzone. |
| classNames | `FileUploaderClassNames` | - | Slot classes. |

## Keyboard

| Keys | Action |
| --- | --- |
| Tab | Moves to the choose link, then through each card's pause or play, Retry, close or trash, and Download. |
| Space / Enter | On the choose link, opens the file picker; on a card button, presses it. |
| Ctrl/Cmd + V | With focus in the dropzone, adds files from the clipboard (a copied screenshot, for example). |

## Accessibility

- The panel is a role="group" labelled by its title, and the header close button is labelled Close.
- The choose link is a real button, so the dropzone works without a mouse or drag and drop.
- Validation errors on the dropzone are role="alert" and read out as they appear.
- Each card's status word (Queued, Uploading, Paused, Completed, or the error) is aria-live="polite"; the percent is not, so it does not talk over everything. The bar is a role="progressbar" labelled with the file name.
- Icon buttons carry aria-labels: Pause upload, Resume upload, Start upload, Cancel upload, Dismiss and Remove file.
- On a mouse the pause button stays hidden until the card is hovered, but it shows on keyboard focus. On touch it is always visible.
- Honors prefers-reduced-motion and an ancestor <MotionConfig reducedMotion="always">, so an in-app motion switch works too.

## Theming

- Progress, the trail behind it, the choose link and the drag-over state use var(--primary). Paused, the fill turns var(--foreground) and the trail goes grey with a dashed edge.
- Errors use var(--destructive): a red dropzone, or a red-ringed card with Retry.
- The panel is var(--card) on a var(--muted) shell that holds Cancel (var(--foreground) at 6%) and Submit (var(--primary)).
- Badges are colored by file family (archives amber, RAR violet, PDF red, design files orange, images blue, video pink, audio sky, documents indigo, sheets emerald, slides orange), each with its own glyph, and fall back to var(--primary). Image files show a thumbnail instead.
- Queued is Tailwind amber-600 and the completed tick emerald-500, since shadcn/ui has no warning or success token.
- classNames: FileUploader targets root, panel, header, dropzone, list and footer; FileDropzone targets root, icon, label and hint; FileUpload targets root, card, badge, name, status, track, fill and actions.

## Edge cases

- Browsers hide file names and sizes during a drag, so the drag badge shows a type read from the MIME type and a count. Size and type checks run on drop.
- A drop with some bad files keeps the good ones and shows the problem on the dropzone: a single file is named (setup.exe: Only ZIP or PDF are allowed.), several read as the first reason and how many were left out. The next drag, pick or paste clears it.
- The same file (name, size and modified date) can't be listed twice; dropping it again reads Already in the list.
- Files dropped together drip out one after another, 80ms apart. Earlier cards stack above later ones, so a drop falls behind them to the end of the list. Removing a card reverses it: the card melts into the drop, which rises behind the cards above into the dropzone, and the slot closes after it. With reduced motion there is no drop; cards simply appear and disappear.
- The bar and the tinted wash behind the card show the reported progress as is, with no easing, and the wash ends exactly at the bar head. How smooth they look depends on how often upload calls onProgress.
- Submit stays disabled until at least one file is done and nothing is uploading or queued; it receives only the completed files. Cancel stops every upload and clears the list before calling onCancel. The header close button only calls onClose.
- The header shows while title or onClose is set, and the footer while onCancel or onSubmit is; pass title={null} and no onClose for a bare panel.
- Thumbnails the browser can't decode (HEIC in most browsers) fall back to the type badge.
- maxFiles counts the whole list. A drop bigger than the room left keeps what fits and says how many more could be added. Once full, the dropzone stays live: its hint reads 5 of 5 files added, and a drop, paste or click shakes it with the limit instead of opening the picker. Removing a file clears the message.
- FileDropzone takes validate(file, accepted) for your own per-file checks (return a message to reject) and blocked, a message that refuses everything while keeping the zone live.
- Pause aborts the upload's signal. Resume calls upload again, so resumable should only be on when upload can continue where it stopped; the demo keeps its own byte count to fake that.
- The play button on a queued card starts it right away, ahead of the queue and above concurrency.
- Retry resets the bar and calls upload again. The error text is the rejection's message, or Upload failed.
- With name set, a hidden file input carries every listed file, so a native form submit includes them. It does not wait for uploads to finish.
- Thumbnails use object URLs that are revoked when a card is removed and when the uploader unmounts.
- FileDropzone and FileUpload are exported too, for a list you manage yourself: the dropzone hands you accepted and rejected files, and the card is fully controlled by status and progress.

## Troubleshooting

**There is no pause button.**
Pause needs resumable on FileUploader (or onPause on FileUpload). On a mouse it also stays hidden until the card is hovered or focused.

**The drag badge says FILE instead of the type.**
Some types have no MIME type the browser will name during a drag (.cdr, for one). The real name and badge appear on the card after the drop.

**Resume starts the file over.**
Resume calls upload again. Report progress for the whole file and continue from the server's offset (tus, S3 multipart), or leave resumable off.

**The component renders with no background or the wrong colors.**
Colors use the standard shadcn/ui tokens only (background, foreground, primary, secondary, muted, accent, border, input, ring, destructive), so a project set up with shadcn/ui needs nothing extra and the component follows its theme, dark mode included. Without shadcn/ui, define those CSS variables for :root and .dark and map them in your Tailwind v4 @theme, or run npx shadcn init.
