// uihub: siso:charts
"use client"
import { useId, type CSSProperties, type ReactNode } from 'react'
export interface SisoSpecialChartProps {
  title?: string
  description?: string
  className?: string
  style?: CSSProperties
  height?: number
  emptyLabel?: string
}
export const specialColors = ['#38bdf8', '#a78bfa', '#34d399', '#fb923c', '#f472b6', '#facc15']
export function SpecialFrame({ title = 'Chart', description, className, style, height = 260, emptyLabel = 'No valid data', empty, children, summary }: SisoSpecialChartProps & { empty: boolean; children: ReactNode; summary: string }) {
  const id = useId()
  return <div className={className} style={{ color: 'var(--foreground, #e4e4e7)', ...style }}>
    {empty ? <p role="status">{emptyLabel}</p> : <svg role="img" aria-labelledby={`${id}-title ${id}-description`} viewBox="0 0 600 300" width="100%" height={Number.isFinite(height) && height > 0 ? height : 260} style={{ display: 'block' }}>
      <title id={`${id}-title`}>{title}</title><desc id={`${id}-description`}>{[description, summary].filter(Boolean).join('. ')}</desc>{children}
    </svg>}
  </div>
}
