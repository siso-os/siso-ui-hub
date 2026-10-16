// uihub: siso:page-kit-frame
// One kit part, alone at full size and with no hub chrome, so a device frame (an iframe at 1280×800 or 390×844)
// sees a real viewport: its breakpoints, its fixed sidebars and its h-svh all behave as they would in an app.
import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Boundary } from "@/components/kit/live"
import { kitFiles, lazyFrom } from "@/kitv1/live"
import shells from "../../../catalogue/kit-shells.json"
import { lazy } from "react"
// SISO builds a frame can show by name, with their settings in ?cfg= (JSON)
const SISO: Record<string, React.ComponentType<{ cfg?: Record<string, unknown>; only?: "sidebar"; state?: "expanded" | "collapsed" | "phone-open" }>> = { "app-frame": lazy(() => import("@/kitv1/siso/app-frame")) }

const FILE = new Map(Object.values(shells as Record<string, { parts: { id: string; file: string }[] }>).flatMap((k) => k.parts.map((p) => [p.id, p.file] as const)))

// an accent colour and corner radius set from the page, as the theme's own variables, so every part picks them up
export function accentVars(accent: string | null, radius: string | null): React.CSSProperties {
  const v: Record<string, string> = {}
  if (accent && /^#?[0-9a-f]{6}$/i.test(accent)) {
    const hex = accent.startsWith("#") ? accent : "#" + accent
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
    const fg = 0.299 * r + 0.587 * g + 0.114 * b > 150 ? "#111111" : "#ffffff"
    Object.assign(v, { "--primary": hex, "--primary-foreground": fg, "--sidebar-primary": hex, "--sidebar-primary-foreground": fg, "--ring": hex, "--sidebar-ring": hex, "--sidebar-accent-foreground": hex })
  }
  if (radius && /^[0-9.]+$/.test(radius)) v["--radius"] = radius + "rem"
  return v as React.CSSProperties
}

export default function KitFrame() {
  const [q] = useSearchParams()
  const id = q.get("id") ?? ""
  const [err, setErr] = useState<string | null>(null)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", q.get("theme") !== "light")
    // portals (menus, the phone sheet, the palette) render under body, so the accent goes on the root too
    const vars = accentVars(q.get("accent"), q.get("radius")) as Record<string, string>
    for (const [k, val] of Object.entries(vars)) document.documentElement.style.setProperty(k, val)
  }, [q])
  const siso = SISO[q.get("siso") ?? ""]
  if (siso) {
    const Siso = siso
    let cfg: Record<string, unknown> = {}
    try { cfg = JSON.parse(q.get("cfg") || "{}") } catch { /* default settings */ }
    const only = q.get("only") === "sidebar" ? "sidebar" : undefined
    const state = (q.get("state") || undefined) as "expanded" | "collapsed" | "phone-open" | undefined
    return <div className="min-h-svh bg-background text-foreground" style={accentVars(q.get("accent"), q.get("radius"))}><Suspense fallback={null}><Siso cfg={cfg} only={only} state={state} /></Suspense></div>
  }
  const file = FILE.get(id)
  if (!file) return <p className="p-6 text-sm text-muted-foreground">Not a shell part we hold: {id}</p>
  const C = lazyFrom(id, kitFiles[`../kit/${id.split("/")[0]}/${file}`])
  return (
    <div className="min-h-svh bg-background text-foreground">
      {err ? (
        <p className="p-6 text-sm text-muted-foreground">Did not draw on its own: {err}</p>
      ) : (
        <Boundary onError={(e) => setErr(String(e?.message || e).slice(0, 160))}>
          <Suspense fallback={<p className="p-6 text-xs text-muted-foreground">loading…</p>}><C /></Suspense>
        </Boundary>
      )}
    </div>
  )
}
