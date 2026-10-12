// /data/*: his full build for him (kept at /me/data), the public build for anyone else. Never cached across people.
import { isHis, type Env } from "../_clerk"

export const onRequest = async (ctx: { request: Request; env: Env; next: () => Promise<Response> }) => {
  const his = await isHis(ctx.request, ctx.env)
  let r: Response
  if (his) {
    const u = new URL(ctx.request.url)
    u.pathname = "/me" + u.pathname
    r = await ctx.env.ASSETS.fetch(new Request(u.toString(), ctx.request))
  } else r = await ctx.next()
  const out = new Response(r.body, r)
  // a hashed name (scripts/hash-data.py) never changes content: the browser keeps it a year; anything else is asked again
  out.headers.set("cache-control", /\.[0-9a-f]{12}\.json$/.test(new URL(ctx.request.url).pathname) && r.ok ? "private, max-age=31536000, immutable" : "private, no-cache")
  out.headers.set("vary", "cookie")
  out.headers.set("x-hub-view", his ? "his" : "public")
  return out
}
