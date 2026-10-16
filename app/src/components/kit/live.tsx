// uihub: siso:kit-live
// The pieces every live browser in the hub shares (Arc, charts, icons): mount a part only when it nears the screen,
// catch a part that throws and say so, report when one has rendered.
import { Component, useEffect, useRef, useState, type ComponentType, type ReactNode } from "react"
import { AlertTriangle } from "lucide-react"

export type Status = "rendered" | "failed"

export // the component a demo file shows: its default export, else its first exported component
function pickExport(m: Record<string, unknown>): ComponentType | null {
  const isComp = (v: unknown) => typeof v === "function" || (typeof v === "object" && v !== null && "$$typeof" in v)
  if (isComp(m.default)) return m.default as ComponentType
  const c = Object.entries(m).find(([k, v]) => /^[A-Z]/.test(k) && isComp(v))
  return c ? (c[1] as ComponentType) : null
}

export class Boundary extends Component<{ onError: (e: Error) => void; children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  componentDidCatch(error: Error) {
    this.props.onError(error)
  }
  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="flex max-w-md flex-col items-center gap-2 p-6 text-center" data-render-failed>
        <AlertTriangle className="size-5 text-amber-400" />
        <p className="text-sm font-medium text-foreground">This part did not render</p>
        <p className="text-xs text-muted-foreground">{String(this.state.error.message || this.state.error).slice(0, 220)}</p>
      </div>
    )
  }
}

export /** mounts its children once the box comes within a screen of the viewport, and keeps them */
function WhenNear({ children, minH, className = "flex w-full items-center justify-center" }: { children: ReactNode; minH: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || near) return
    const io = new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && setNear(true), { rootMargin: "600px 0px" })
    io.observe(el)
    return () => io.disconnect()
  }, [near])
  return (
    <div ref={ref} style={{ minHeight: minH }} className={className}>
      {near ? children : null}
    </div>
  )
}

export /** reports once its children have mounted without throwing */
function Rendered({ children, onShown }: { children: ReactNode; onShown: () => void }) {
  useEffect(() => {
    const t = setTimeout(onShown, 400)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <>{children}</>
}
