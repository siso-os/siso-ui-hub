// uihub: siso:landing (a stand-in for next/dynamic, which the landing runs on and the hub does not)
import { lazy, Suspense, type ComponentType, type ReactNode } from "react"
type Loaded = ComponentType<any> | { default: ComponentType<any> }
export default function dynamic(load: () => Promise<Loaded>, opts?: { loading?: () => ReactNode; ssr?: boolean }) {
  const C = lazy(async () => { const m = await load(); return { default: "default" in m ? m.default : m } })
  return function Dynamic(props: Record<string, unknown>) {
    return <Suspense fallback={opts?.loading?.() ?? null}><C {...props} /></Suspense>
  }
}
