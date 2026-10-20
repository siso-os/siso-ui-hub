import { lazy, Suspense, createElement } from "react"
export default function dynamic(load: any) { const C = lazy(async () => { const m = await load(); return { default: m.default || m } }); return (p: any) => createElement(Suspense, { fallback: null }, createElement(C, p)) }
