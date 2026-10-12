// uihub: siso:icon-placeholder
// shadcn's Create screen swaps icon libraries through <IconPlaceholder lucide="XIcon" .../>; we use lucide.
import * as L from "lucide-react";
export function IconPlaceholder({ lucide, ...rest }: { lucide: string; [k: string]: unknown }) {
  const I = (L as Record<string, any>)[lucide] || (L as Record<string, any>)[lucide.replace(/Icon$/, "")];
  return I ? <I {...rest} /> : null;
}
