// uihub: siso:package-workbench
// The page-wide transition Arc's site runs when a theme switch flips (its docs call runThemeTransition, which is not in
// the registry). Here it plays inside a small preview panel, so each variant's card shows what makes it different.
import { useRef, useState, type ReactNode } from "react"
import type { Theme, ThemeSwitchVariant } from "@siso/ui/atoms/source"

const ease = "cubic-bezier(.2,.8,.2,1)"

function frames(v: ThemeSwitchVariant, x: number, y: number): [Keyframe[], number] {
  switch (v) {
    case "eclipse": // a disc slides across the panel and covers it
      return [[{ clipPath: `circle(0% at -20% 50%)` }, { clipPath: `circle(150% at 50% 50%)` }], 700]
    case "split": // two halves open from the middle
      return [[{ clipPath: "inset(0 50% 0 50%)" }, { clipPath: "inset(0 0% 0 0%)" }], 560]
    case "rise": // the new theme rises from the bottom edge
      return [[{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)" }], 620]
    default: // reveal: a circle grows from the switch
      return [[{ clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(150% at ${x}px ${y}px)` }], 600]
  }
}

function Panel({ theme, children }: { theme: Theme; children?: ReactNode }) {
  return (
    <div data-theme={theme} className="absolute inset-0 flex flex-col gap-3 p-4" style={{ background: theme === "dark" ? "#141414" : "#f6f5f2", color: theme === "dark" ? "#eee" : "#1a1a1a" }}>
      <div className="flex items-center justify-between">
        <div className="h-2.5 w-24 rounded-full" style={{ background: "currentColor", opacity: 0.7 }} />
        {children}
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg" style={{ background: theme === "dark" ? "#222" : "#fff", boxShadow: theme === "dark" ? "inset 0 0 0 1px #2c2c2c" : "inset 0 0 0 1px #e6e3dc" }} />
        ))}
      </div>
    </div>
  )
}

export function ThemeStage({ variant, children }: { variant: ThemeSwitchVariant; children: (theme: Theme, change: (next: Theme, v: ThemeSwitchVariant, trigger: HTMLElement) => void) => ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")
  const [next, setNext] = useState<Theme | null>(null)
  const box = useRef<HTMLDivElement>(null)
  const layer = useRef<HTMLDivElement>(null)
  const change = (to: Theme, v: ThemeSwitchVariant, trigger: HTMLElement) => {
    const b = box.current!.getBoundingClientRect(), t = trigger.getBoundingClientRect()
    setNext(to)
    requestAnimationFrame(() => {
      const [kf, ms] = frames(v ?? variant, t.left - b.left + t.width / 2, t.top - b.top + t.height / 2)
      const a = layer.current!.animate(kf, { duration: ms, easing: ease, fill: "forwards" })
      a.onfinish = () => (setTheme(to), setNext(null))
    })
  }
  return (
    <div ref={box} className="relative h-44 w-full max-w-sm overflow-hidden rounded-xl">
      <Panel theme={theme}>{children(theme, change)}</Panel>
      {next && (
        <div ref={layer} className="absolute inset-0" style={{ clipPath: "inset(100% 0 0 0)" }}>
          <Panel theme={next}>{children(next, () => {})}</Panel>
        </div>
      )}
    </div>
  )
}
