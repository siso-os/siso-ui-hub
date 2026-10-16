// uihub: siso:relative-time
// "3 minutes ago" that keeps itself fresh, in a real <time> element with the exact date on hover. Uses Intl, so any locale.
import { useEffect, useState } from "react"

const STEPS: [Intl.RelativeTimeFormatUnit, number][] = [["second", 60], ["minute", 60], ["hour", 24], ["day", 7], ["week", 4.35], ["month", 12], ["year", Infinity]]

export function relative(date: Date, now = Date.now(), locale = "en-GB") {
  let v = (date.getTime() - now) / 1000
  for (const [unit, n] of STEPS) {
    if (Math.abs(v) < n) return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(Math.round(v), unit)
    v /= n
  }
  return ""
}

export function RelativeTime({ date, locale = "en-GB", className }: { date: Date | string | number; locale?: string; className?: string }) {
  const d = new Date(date)
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const age = Math.abs(Date.now() - d.getTime())
    const t = setInterval(() => setNow(Date.now()), age < 60_000 ? 1_000 : age < 3_600_000 ? 30_000 : 600_000)
    return () => clearInterval(t)
  }, [d.getTime()])
  return (
    <time dateTime={d.toISOString()} title={d.toLocaleString(locale)} className={className}>
      {relative(d, now, locale)}
    </time>
  )
}
