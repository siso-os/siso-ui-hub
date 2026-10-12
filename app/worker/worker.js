// UI Hub on Cloudflare, private: HTTP Basic Auth (user "shaan") in front of everything, the way the estate world does it
// (siso-estate plan/world/app/deploy/worker.js). It holds his bookmarks and notes, so it is never served without the
// password. Static files come from the ASSETS binding (app/dist); /api/bookmarks keeps bookmarks in KV, and
// `uihub sync` pulls them into catalogue/bookmarks.json, where every agent reads them.
const enc = new TextEncoder()
function same(a, b) {                       // constant-time compare
  const x = enc.encode(a), y = enc.encode(b)
  let d = x.length ^ y.length
  for (let i = 0; i < Math.max(x.length, y.length); i++) d |= (x[i] || 0) ^ (y[i] || 0)
  return d === 0
}
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } })

async function bookmarks(req, env) {
  const all = (await env.BOOKMARKS.get('items', 'json')) || {}
  if (req.method === 'GET') return json({ items: all, store: 'kv' })
  if (req.method !== 'POST') return json({ error: 'GET or POST' }, 405)
  let b; try { b = await req.json() } catch { return json({ error: 'json' }, 400) }
  if (typeof b.id !== 'string' || !/^[\w.@:-]+$/.test(b.id) || b.id.length > 200) return json({ error: 'id' }, 400)
  const at = new Date().toISOString().slice(0, 19)
  all[b.id] = b.on === false ? { by: 'site', at, off: true }
    : Object.fromEntries(Object.entries({ by: 'site', at, note: b.note, signal: b.signal }).filter(([, v]) => v))
  await env.BOOKMARKS.put('items', JSON.stringify(all))
  return json({ ok: true, item: all[b.id] })
}

export default {
  async fetch(req, env) {
    if (!env.HUB_PASSWORD) return new Response('Not configured.', { status: 503 })   // never open without a secret
    const auth = req.headers.get('authorization') || ''
    const [scheme, b64] = auth.split(' ')
    let ok = false
    if (scheme === 'Basic' && b64) { try { ok = same(atob(b64), 'shaan:' + env.HUB_PASSWORD) } catch { ok = false } }
    if (!ok) return new Response('SISO UI Hub is private.', { status: 401, headers: { 'www-authenticate': 'Basic realm="SISO UI Hub", charset="UTF-8"', 'cache-control': 'no-store' } })
    const url = new URL(req.url)
    if (url.pathname === '/api/bookmarks') return bookmarks(req, env)
    const res = await env.ASSETS.fetch(req)
    const h = new Headers(res.headers)
    h.set('x-robots-tag', 'noindex')
    h.set('cache-control', url.pathname.startsWith('/a/') || url.pathname.startsWith('/assets/') ? 'private, max-age=86400' : 'private, no-cache')
    return new Response(res.body, { status: res.status, headers: h })
  },
}
