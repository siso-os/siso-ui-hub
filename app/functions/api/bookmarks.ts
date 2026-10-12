// His bookmarks, in the same KV the Worker uses (worker/worker.js), so `uihub sync` and every agent still read them.
import { isHis, type Env } from "../_clerk"

const json = (d: unknown, status = 200) => new Response(JSON.stringify(d), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } })

export const onRequest = async ({ request, env }: { request: Request; env: Env }) => {
  if (!(await isHis(request, env))) return json({ error: "not on the list" }, 403)
  if (!env.BOOKMARKS) return json({ error: "no store" }, 503)
  const all = ((await env.BOOKMARKS.get("items", "json")) as Record<string, unknown>) || {}
  if (request.method === "GET") return json({ items: all, store: "kv" })
  if (request.method !== "POST") return json({ error: "GET or POST" }, 405)
  let b: any
  try {
    b = await request.json()
  } catch {
    return json({ error: "json" }, 400)
  }
  if (typeof b.id !== "string" || !/^[\w.@:/-]+$/.test(b.id) || b.id.length > 200) return json({ error: "id" }, 400)
  const at = new Date().toISOString().slice(0, 19)
  all[b.id] = b.on === false ? { by: "site", at, off: true } : Object.fromEntries(Object.entries({ by: "site", at, note: b.note, signal: b.signal }).filter(([, v]) => v))
  await env.BOOKMARKS.put("items", JSON.stringify(all))
  return json({ ok: true, item: all[b.id] })
}
