import { forwardRef, type SVGProps } from "react";

export interface RotateCcwProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  size?: number | string;
  title?: string;
}

const styles = "/* Framework-neutral motion trigger. Import once in the consuming app. */\n:root {\n  --mi-time: 1;\n  --mi-ease: cubic-bezier(0.32, 0.72, 0.24, 1);\n  --mi-ease-spring: linear(0, 0.032 2%, 0.12 4%, 0.31 7%, 0.56 10.5%, 0.76 13.5%, 0.9 16.5%, 0.988 19.5%, 1.042 22.5%, 1.07 26%, 1.078 30%, 1.062 36%, 1.03 44%, 1.008 52%, 0.997 62%, 0.998 74%, 1);\n  --mi-ease-pop: linear(0, 0.04 2%, 0.15 4.5%, 0.4 8%, 0.68 11.5%, 0.9 14.5%, 1.06 17.5%, 1.15 21%, 1.185 25%, 1.17 29.5%, 1.11 35.5%, 1.04 42%, 0.985 49%, 0.962 55.5%, 0.965 62%, 0.985 70%, 1.002 82%, 1);\n  --mi-ease-bounce: linear(0, 0.2 5%, 0.65 11%, 1.05 17%, 1.35 22%, 1.52 26%, 1.55 29%, 1.44 34%, 1.2 41%, 1 48%, 0.88 55%, 0.86 59%, 0.92 66%, 1 74%, 1.04 81%, 1.01 90%, 1);\n}\n\n@media (hover: hover) {\n  :where(button:not(:disabled), [role=\"button\"]:not([aria-disabled=\"true\"]), [role=\"menuitem\"]:not([aria-disabled=\"true\"]), [role=\"tab\"]:not([aria-disabled=\"true\"]), [role=\"option\"]:not([aria-disabled=\"true\"]), a:not([aria-disabled=\"true\"]), summary:not([aria-disabled=\"true\"]), label:not([aria-disabled=\"true\"]), .mi-trigger:not([aria-disabled=\"true\"])):hover .mi {\n    --mi-progress: 1;\n  }\n}\n\n:where(button:not(:disabled), [role=\"button\"]:not([aria-disabled=\"true\"]), [role=\"menuitem\"]:not([aria-disabled=\"true\"]), [role=\"tab\"]:not([aria-disabled=\"true\"]), [role=\"option\"]:not([aria-disabled=\"true\"]), a:not([aria-disabled=\"true\"]), summary:not([aria-disabled=\"true\"]), label:not([aria-disabled=\"true\"]), .mi-trigger:not([aria-disabled=\"true\"])):focus-visible .mi {\n  --mi-progress: 1;\n}\n\n:where(button, [role=\"button\"], [role=\"menuitem\"], [role=\"tab\"], [role=\"option\"], a, summary, label, .mi-trigger):not(:hover):not(:focus-visible) .mi,\n:where(button:disabled, [aria-disabled=\"true\"]) .mi {\n  --mi-progress: 0;\n}\n\n.mi-play .mi,\n.mi.mi-play { --mi-progress: 1; }\n.mi { overflow: visible; }\n\n\n@media (prefers-reduced-motion: no-preference) {\n  .mi-rotate-ccw .mi-rotate-ccw-glyph {\n    transform-box: view-box;\n    transform-origin: 12px 12px;\n    transform: rotate(calc(var(--mi-progress, 0) * var(--mi-rotate-ccw-windup, 14deg)));\n    transition: transform calc(300ms * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n}";

export const RotateCcw = forwardRef<SVGSVGElement, RotateCcwProps>(function RotateCcw(
  { size = 24, strokeWidth = 2, className, title, "aria-label": ariaLabel, ...props },
  ref,
) {
  const accessibleTitle = title ?? ariaLabel;

  return (
    <>
      <style>{styles}</style>
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden={accessibleTitle ? undefined : true}
        aria-label={ariaLabel}
        role={accessibleTitle ? "img" : undefined}
        className={["mi", "mi-rotate-ccw", className].filter(Boolean).join(" ")}
        dangerouslySetInnerHTML={{
          __html: `${title ? `<title>${escapeText(title)}</title>` : ""}<g class="mi-rotate-ccw-glyph"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></g>`,
        }}
        {...props}
      />
    </>
  );
});

RotateCcw.displayName = "RotateCcw";

function escapeText(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export default RotateCcw;
