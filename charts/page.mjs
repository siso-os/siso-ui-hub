// Curated charts page (UI-HUB, 16 Oct): reads curated.json + not-charts.jsonl + the build's manifest, copies the pictures, writes site/index.html.
import fs from "node:fs"
import path from "node:path"
const D = `${process.env.HOME}/SISO_Workspace/_data/charts-curate`
const HERE = path.dirname(new URL(import.meta.url).pathname)
const cur = JSON.parse(fs.readFileSync(`${HERE}/curated.json`, "utf8"))
const nc = fs.readFileSync(`${HERE}/not-charts.jsonl`, "utf8").trim().split("\n").map((l) => JSON.parse(l))
const man = JSON.parse(fs.readFileSync(`${D}/site/manifest.json`, "utf8"))
// drawn blank in the headless check (cells take their colour from a theme variable the host lacks): shown as a picture
const BLANK = { "p21--bankkroll__contribution-graph": 1 }
const good = new Set(man.good.filter((k) => !BLANK[k]))
fs.mkdirSync(`${D}/site/p`, { recursive: true })
const thumb = (id, src) => {
  const rel = `p/${id.replace(/[^\w.-]/g, "_")}.webp`
  if (fs.existsSync(`${D}/site/${rel}`)) return rel // copied on an earlier run (the 21st bank's previews are no longer on disk)
  if (!src || !fs.existsSync(src)) return null
  if (!fs.existsSync(`${D}/site/${rel}`)) fs.copyFileSync(src, `${D}/site/${rel}`)
  return rel
}
const slim = (f) => ({ id: f.id, lib: f.lib, name: f.name, k: f.k && good.has(f.k) ? f.k : null, thumb: thumb(f.id, f.pic), kind: f.g, n: f.n || f.desc || "", why: f.why || null, members: f.members || 0, libs: f.libs || [f.lib] })
let pics = 0, live = 0
const groups = cur.groups.map((g) => {
  const top = g.top.filter((f) => (f.k && good.has(f.k)) || (f.pic && fs.existsSync(f.pic)) || fs.existsSync(`${D}/site/p/${f.id.replace(/[^\w.-]/g, "_")}.webp`)).map((f) => ({ ...slim(f), variants: (f.variants || []).slice(0, 24).map(slim) }))
  const more = g.more.map(slim).filter((x) => x.k || x.thumb)
  for (const x of [...top, ...more]) { x.k ? live++ : x.thumb && pics++ }
  return { key: g.key, title: g.title, families: g.families, parts: g.parts, more_total: g.more_total, top, more }
})
const notCharts = {}; for (const r of nc) notCharts[r.belongs] = (notCharts[r.belongs] || 0) + 1
const DATA = { groups, notCharts, totals: { parts: cur.groups.reduce((a, g) => a + g.parts, 0), families: cur.groups.reduce((a, g) => a + g.families, 0), nonCharts: nc.length, ours: cur.groups.reduce((a, g) => a + g.parts, 0) - (JSON.parse(fs.readFileSync(`${D}/all.json`, "utf8")).length - nc.length) } }
const html = fs.readFileSync(`${HERE}/template.html`, "utf8").replace("/*DATA*/", "window.DATA=" + JSON.stringify(DATA).replace(/</g, "\\u003c"))
fs.writeFileSync(`${D}/site/index.html`, html)
console.log({ groups: groups.length, live, pics, totals: DATA.totals })
