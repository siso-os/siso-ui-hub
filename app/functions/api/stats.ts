// GET /api/stats: the hub's headline numbers (parts, libraries, pictures, how many are read and rated), rewritten by every
// deploy (bin/hubindex.py export -> data/stats.json, the public build's). Shaan, 11 Oct: "the landing page numbers are out
// of date ... make it so there's an API we can ping to update them". Open to any site (sisolabs.space reads it); numbers only.
import type { Env } from "../_clerk"

export const onRequestGet = async (ctx: { request: Request; env: Env }) => {
  // his build's counts (it holds the pictures); numbers only, no names. The public build's when his is missing
  const at = (p: string) => {
    const u = new URL(ctx.request.url)
    u.pathname = p
    return ctx.env.ASSETS.fetch(new Request(u.toString()))
  }
  let r = await at("/me/data/stats.json")
  if (!r.ok) r = await at("/data/stats.json")
  return new Response(r.ok ? r.body : JSON.stringify({ error: "no stats in this build" }), {
    status: r.ok ? 200 : 503,
    headers: { "content-type": "application/json", "access-control-allow-origin": "*", "cache-control": "public, max-age=300" },
  })
}
