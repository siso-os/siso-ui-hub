// uihub: siso:hub-bookmarks
// Bookmarks: GET/POST /api/bookmarks (serve.mjs or the worker). When the API is absent, localStorage, and the UI says so once.
import { useSyncExternalStore } from "react"
import { loadIndex, type Row, type Signal } from "./data"

export interface Mark { by?: string; at?: string; note?: string; signal?: Signal; off?: boolean }
interface State { items: Record<string, Mark>; store: "api" | "local" | "loading" | "off"; noticeShown: boolean }

const LS = "uihub.bookmarks.v1"
let state: State = { items: {}, store: "loading", noticeShown: false }
const subs = new Set<() => void>()
const emit = () => subs.forEach((f) => f())
const set = (s: Partial<State>) => {
  state = { ...state, ...s }
  emit()
}

function readLocal(): Record<string, Mark> {
  try {
    return JSON.parse(localStorage.getItem(LS) || "{}")
  } catch {
    return {}
  }
}

let started = false
function start() {
  if (started) return
  started = true
  // the public build never has bookmarks and never calls the API
  loadIndex()
    .then((idx) => {
      if (idx.public) set({ store: "off" })
      else load()
    })
    .catch(() => load())
}

function load() {
  fetch("/api/bookmarks", { headers: { accept: "application/json" } })
    .then(async (r) => {
      const ct = r.headers.get("content-type") || ""
      if (!r.ok || !ct.includes("json")) throw new Error(String(r.status))
      const d = await r.json()
      set({ items: d.items || {}, store: "api" })
    })
    .catch(() => set({ items: readLocal(), store: "local" }))
}

export async function setBookmark(id: string, on: boolean, extra: { note?: string; signal?: Signal } = {}) {
  if (state.store === "off") return
  const at = new Date().toISOString().slice(0, 19)
  const mark: Mark = on ? { by: "site", at, ...extra } : { by: "site", at, off: true }
  set({ items: { ...state.items, [id]: mark } })
  if (state.store === "api") {
    try {
      const r = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, on, ...extra }),
      })
      if (!r.ok) throw new Error(String(r.status))
      return
    } catch {
      set({ store: "local" })
    }
  }
  localStorage.setItem(LS, JSON.stringify(state.items))
}

export function markNoticeShown() {
  state = { ...state, noticeShown: true }
}

export function useBookmarks() {
  start()
  return useSyncExternalStore(
    (f) => {
      subs.add(f)
      return () => subs.delete(f)
    },
    () => state,
  )
}

/** On if a mark says on, otherwise his picks (b:1) are bookmarks by default. */
export function isMarked(row: Pick<Row, "id" | "b">, items: Record<string, Mark>): boolean {
  const m = items[row.id]
  if (m) return !m.off
  return !!row.b
}
