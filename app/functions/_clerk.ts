// Who is asking, for the hosted UI Hub (Cloudflare Pages, ui.sisolabs.space). The Clerk session is the __session cookie
// clerk-js keeps fresh; its signature is checked against the SISO Labs instance's public keys. A person is on the hub's
// list when a verified email of theirs is in HUB_ALLOW, or when they are the instance's first user (the live instance had
// no users when the hub moved here, 10 Oct 2026, so its first user is Shaan). Secrets live in the Pages project, never here.

export type Env = { CLERK_SECRET_KEY: string; CLERK_FAPI: string; HUB_ALLOW?: string; ASSETS: any; BOOKMARKS?: any }

const b64u = (s: string) =>
  Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4)), (c) => c.charCodeAt(0))
const text = (s: string) => JSON.parse(new TextDecoder().decode(b64u(s)))

let keys: { at: number; byKid: Record<string, CryptoKey> } | null = null
const verdicts = new Map<string, { ok: boolean; at: number }>()

async function keyFor(env: Env, kid: string): Promise<CryptoKey | undefined> {
  if (!keys || Date.now() - keys.at > 3_600_000 || !keys.byKid[kid]) {
    const r = await fetch(`https://${env.CLERK_FAPI}/.well-known/jwks.json`)
    const d = (await r.json()) as { keys: (JsonWebKey & { kid: string })[] }
    const byKid: Record<string, CryptoKey> = {}
    for (const k of d.keys || [])
      byKid[k.kid] = await crypto.subtle.importKey("jwk", k, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"])
    keys = { at: Date.now(), byKid }
  }
  return keys.byKid[kid]
}

/** the signed-in user's id, or null; a token up to an hour past expiry still counts (clerk-js renews it every minute
 * while the tab is open; an hour covers a tab that slept) */
export async function userOf(req: Request, env: Env): Promise<string | null> {
  const cookie = req.headers.get("cookie") || ""
  for (const m of cookie.matchAll(/(?:^|;\s*)__session(?:_[A-Za-z0-9_-]+)?=([^;]+)/g)) {
    const [h, p, s] = m[1].split(".")
    if (!s) continue
    try {
      const head = text(h), body = text(p)
      const k = await keyFor(env, head.kid)
      if (!k) continue
      const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", k, b64u(s), new TextEncoder().encode(`${h}.${p}`))
      const now = Date.now() / 1000
      const azp = !body.azp || /(^|\.)sisolabs\.space$/.test(new URL(body.azp).hostname)
      if (ok && azp && body.iss === `https://${env.CLERK_FAPI}` && body.exp + 3600 > now && (body.nbf || 0) - 60 < now) return body.sub
    } catch {
      /* a malformed cookie is no session */
    }
  }
  return null
}

/** whether this user may see his full build */
export async function allowed(sub: string, env: Env): Promise<boolean> {
  const seen = verdicts.get(sub)
  if (seen && Date.now() - seen.at < 600_000) return seen.ok
  // a yes is kept a day in KV, so a fresh Worker answers without asking Clerk's API (11 Oct: every data file paid for it)
  const kept = env.BOOKMARKS ? await env.BOOKMARKS.get(`verdict:${sub}`) : null
  if (kept === "1") {
    verdicts.set(sub, { ok: true, at: Date.now() })
    return true
  }
  const H = { authorization: `Bearer ${env.CLERK_SECRET_KEY}` }
  const u = (await (await fetch(`https://api.clerk.com/v1/users/${encodeURIComponent(sub)}`, { headers: H })).json()) as any
  const list = (env.HUB_ALLOW || "").toLowerCase().split(",").map((x) => x.trim()).filter(Boolean)
  const mails = (u?.email_addresses || [])
    .filter((e: any) => e?.verification?.status === "verified")
    .map((e: any) => String(e.email_address).toLowerCase())
  let ok = mails.some((m: string) => list.includes(m))
  if (!ok) {
    const first = (await (await fetch("https://api.clerk.com/v1/users?order_by=%2Bcreated_at&limit=1", { headers: H })).json()) as any
    ok = Array.isArray(first) && first[0]?.id === sub
  }
  verdicts.set(sub, { ok, at: Date.now() })
  if (ok && env.BOOKMARKS) await env.BOOKMARKS.put(`verdict:${sub}`, "1", { expirationTtl: 86400 })
  return ok
}

export async function isHis(req: Request, env: Env): Promise<boolean> {
  const sub = await userOf(req, env)
  return !!sub && (await allowed(sub, env))
}
