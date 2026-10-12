// /me/*: his full build. Only for him.
import { isHis, type Env } from "../_clerk"

export const onRequest = async (ctx: { request: Request; env: Env; next: () => Promise<Response> }) => {
  if (!(await isHis(ctx.request, ctx.env))) return new Response("Not on the UI Hub's list.", { status: 403 })
  const r = await ctx.next()
  const out = new Response(r.body, r)
  out.headers.set("cache-control", "private, no-cache")
  return out
}
