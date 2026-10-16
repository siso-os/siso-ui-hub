// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/ui/SourceMark.tsx)
'use client';

import { useState, type ReactNode } from 'react';

// Where a number or a section's data comes from, as a small mark instead of a line of text (Shaan, 9 Oct: "you can have like
// pop and you hover over them and it gives you the source ... you shouldn be wasting UI space showing source"). Hover or focus
// shows it on a desktop and a tap toggles it on a phone. The word "Source" is drawn by CSS (globals.css .smk-tip::before), so
// the page carries no inline Source label.
export function SourceMark({ children, className }: { children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className={className ? `smk ${className}` : 'smk'} data-open={open || undefined}>
      <button type="button" className="smk-btn" aria-label="Show the source" aria-expanded={open}
        onClick={() => setOpen(v => !v)} onBlur={() => setOpen(false)}>
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <circle cx="8" cy="8" r="6.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8 7.3v3.9M8 4.8v.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <span className="smk-tip" role="tooltip">{children}</span>
    </span>
  );
}
