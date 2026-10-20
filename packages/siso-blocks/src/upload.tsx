'use client';
// uihub: siso:blocks
import * as React from 'react';
export interface SisoFileRejection { file: File; reason: 'type' | 'size' | 'count' }
export interface SisoFileDropzoneProps {
  onFiles: (files: File[]) => void;
  onReject?: (rejections: SisoFileRejection[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSizeBytes?: number;
  maxFiles?: number;
  disabled?: boolean;
  label?: string;
  description?: string;
}
/** Validate selections and drops consistently. Upload transport and storage belong to the consumer. */
export function sisoValidateFiles(files: readonly File[], { accept = '', multiple = true, maxSizeBytes = Infinity, maxFiles = Infinity }: Pick<SisoFileDropzoneProps, 'accept' | 'multiple' | 'maxSizeBytes' | 'maxFiles'> = {}) {
  const rules = accept.split(',').map(value => value.trim().toLowerCase()).filter(Boolean);
  const accepted: File[] = [], rejected: SisoFileRejection[] = [];
  const limit = multiple ? Math.max(0, maxFiles) : Math.min(1, Math.max(0, maxFiles));
  for (const file of files) {
    const type = file.type.toLowerCase(), name = file.name.toLowerCase();
    const matches = !rules.length || rules.some(rule => rule.startsWith('.') ? name.endsWith(rule) : rule.endsWith('/*') ? type.startsWith(rule.slice(0, -1)) : type === rule);
    const reason = !matches ? 'type' : file.size > maxSizeBytes ? 'size' : accepted.length >= limit ? 'count' : null;
    if (reason) rejected.push({ file, reason }); else accepted.push(file);
  }
  return { accepted, rejected };
}
export function SisoFileDropzone({ onFiles, onReject, accept, multiple = true, maxSizeBytes, maxFiles, disabled = false, label = 'Choose files', description = 'Drop files here or choose from your device' }: SisoFileDropzoneProps) {
  const input = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const [error, setError] = React.useState('');
  const descriptionId = React.useId(), errorId = React.useId();
  function process(files: File[]) {
    if (disabled) return;
    const { accepted, rejected } = sisoValidateFiles(files, { accept, multiple, maxSizeBytes, maxFiles });
    setError(rejected.length ? rejected.map(item => `${item.file.name}: ${item.reason === 'type' ? 'file type not accepted' : item.reason === 'size' ? 'file too large' : 'too many files'}`).join('; ') : '');
    if (accepted.length) onFiles(accepted);
    if (rejected.length) onReject?.(rejected);
  }
  return <div className="siso-blocks siso-blocks-dropzone" data-dragging={dragging} data-disabled={disabled}
    onDragOver={e => { e.preventDefault(); if (!disabled) setDragging(true); }}
    onDragLeave={e => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDragging(false); }}
    onDrop={e => { e.preventDefault(); setDragging(false); process(Array.from(e.dataTransfer.files)); }}>
    <input ref={input} className="siso-blocks-sr-only" tabIndex={-1} type="file" aria-label={label} accept={accept} multiple={multiple} disabled={disabled} onChange={e => { process(Array.from(e.target.files ?? [])); e.target.value = ''; }} />
    <button type="button" className="siso-blocks-button" disabled={disabled} aria-describedby={`${descriptionId} ${errorId}`} onClick={() => input.current?.click()}>{label}</button>
    <p id={descriptionId} className="siso-blocks-muted">{description}</p><p id={errorId} className="siso-blocks-error" role="status">{error}</p>
  </div>;
}
