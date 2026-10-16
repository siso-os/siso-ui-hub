// uihub: siso:progress-ring
// A circular progress: value 0 to 100, or indeterminate when value is null. One SVG, no chart library.
import { cn } from "@/arc-shims/kit-utils"

export function ProgressRing({ value, size = 48, stroke = 4, label, showValue = true, className }: { value: number | null; size?: number; stroke?: number; label?: string; showValue?: boolean; className?: string }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const v = value == null ? null : Math.max(0, Math.min(100, value))
  return (
    <div
      className={cn("relative inline-grid place-items-center", className)}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={v ?? undefined}
    >
      <svg width={size} height={size} className={cn("-rotate-90", v == null && "animate-spin motion-reduce:animate-none")}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-muted" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="stroke-primary transition-[stroke-dashoffset] duration-500 motion-reduce:transition-none"
          strokeDasharray={c}
          strokeDashoffset={v == null ? c * 0.7 : c * (1 - v / 100)}
        />
      </svg>
      {showValue && v != null && <span className="absolute text-[11px] font-medium tabular-nums">{Math.round(v)}%</span>}
    </div>
  )
}
