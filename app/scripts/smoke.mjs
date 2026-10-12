// UI Hub smoke: loads the main routes at 1440 and 390, asserts the contract the spec names, saves screenshots.
// Usage: node scripts/smoke.mjs [--base http://127.0.0.1:8790]   (serve first: node serve.mjs --port 8790)
//        node scripts/smoke.mjs --public [--base http://127.0.0.1:8792]   (node serve.mjs --port 8792 --dist dist-public)
// Exit 0 when every assertion passes; prints one JSON line per check and a summary.
import { chromium } from "playwright"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
const shots = path.join(here, "shots")
fs.mkdirSync(shots, { recursive: true })
const ai = process.argv.indexOf("--base")
const PUBLIC = process.argv.includes("--public")
const BASE = ai > 0 ? process.argv[ai + 1] : PUBLIC ? "http://127.0.0.1:8792" : "http://127.0.0.1:8790"
const SHOT = PUBLIC ? "pub-" : ""

const results = []
const check = (name, ok, detail = "") => {
  results.push({ name, ok: !!ok, detail })
  console.log(JSON.stringify({ check: name, ok: !!ok, detail }))
}

const browser = await chromium.launch({ headless: true })
try {
  const index = await (await fetch(`${BASE}/data/index.json`)).json()
  if (index.chunks) index.items = (await Promise.all(Array.from({ length: index.chunks }, async (_, k) => (await fetch(`${BASE}/data/index-${k + 1}.json`)).json()))).flat()
  const total = index.stats.total
  check("index.public matches the mode", !!index.public === PUBLIC, `public=${index.public}`)
  const cat = Object.entries(index.groups.marketing || index.groups[Object.keys(index.groups)[0]]).sort((a, b) => b[1] - a[1])[0][0]
  const [g, c] = cat.split("/")
  const catRoute = `/browse/${encodeURIComponent(g)}/${encodeURIComponent(c)}`
  const ITEM = "21st:jatin-yadav05__sign-in-card-2"
  const THEME = index.items.find((i) => i.k === "theme" && (i.p || i.pl))
  check("index has themes and templates", !!THEME && index.items.some((i) => i.c === "pages/templates"), THEME?.id)
  if (THEME?.p) {
    // a held preview: /a/x/<kind>-<id> locally; in --public it is 21st's CDN URL
    const u = THEME.p.startsWith("http") ? THEME.p : BASE + THEME.p
    const res = await fetch(u).catch(() => null)
    check(`theme preview image returns 200 (${PUBLIC ? "CDN" : "/a/x/"})`, res?.status === 200 && THEME.p.startsWith("/a/p/"), `${res?.status} ${u.slice(0, 80)}`)
  }
  const routes = [
    ["home", "/"],
    ["browse", "/browse"],
    ["hero", "/browse/s/heroes"],
    ["category", catRoute],
    ["component", `/c/${encodeURIComponent(ITEM)}`],
    ...(PUBLIC ? [] : [["bookmarks", "/bookmarks"]]),
    ["industries", "/industries"],
    ["industry", "/industries/hospitality"],
    ["agents", "/agents"],
    ["discover", "/discover"],
    ["libraries", "/libraries"],
    ["shells", "/shells"],
    ["templates", "/templates"],
    ["themes", "/themes"],
    ...(THEME ? [["theme-item", `/c/${encodeURIComponent(THEME.id)}`]] : []),
  ]

  for (const width of [1440, 390]) {
    const ctx = await browser.newContext({ viewport: { width, height: width > 500 ? 900 : 844 }, colorScheme: "dark" })
    const page = await ctx.newPage()
    const errors = []
    page.on("pageerror", (e) => errors.push(String(e)))
    const apiCalls = []
    page.on("request", (q) => q.url().includes("/api/bookmarks") && apiCalls.push(q.url()))
    for (const [name, route] of routes) {
      await page.goto(BASE + route, { waitUntil: "domcontentloaded" })
      await page.waitForSelector("main h1", { timeout: 20000 }).catch(() => {})
      if (name === "home") {
        const ok = await page
          .waitForFunction((t) => [...document.querySelectorAll("[data-verify-stat]")].some((e) => e.getAttribute("data-verify-stat") === String(t)), total, { timeout: 15000 })
          .then(() => true, () => false)
        check(`${width} home shows stats.total ${total}`, ok)
        const widgets = await page.locator("[data-widget]").count()
        check(`${width} home has widgets`, widgets >= 6, `${widgets} widgets`)
      }
      if (width === 1440 && name === "home") {
        const root = await page.locator('aside nav[data-verify-nav-level="root"]').count()
        const links = await page.locator("aside nav").getByRole("link", { name: "Libraries" }).count()
        check("1440 sidebar shows the root links on /", root === 1 && links > 0)
        const cov = await page.waitForSelector("[data-widget=coverage] [data-verify-coverage]", { timeout: 10000 }).then(() => true, () => false)
        check("1440 home shows the Coverage widget", cov)
      }
      if (name === "home" && width !== 1440) {
        check(`${width} home shows the Coverage widget`, (await page.locator("[data-widget=coverage]").count()) === 1)
      }
      if (width === 1440 && name === "browse") {
        const sec = await page.locator('aside [data-verify-nav-section="What it does"]').count()
        check('1440 sidebar shows "What it does" (components by job) on /browse', sec === 1)
      }
      if (PUBLIC) {
        const marks = await page.locator('a[href="/bookmarks"], [data-verify-bookmark]').count()
        if (marks) check(`${width} public ${name}: no Bookmarks link or button`, false, `${marks} found`)
      }
      if (PUBLIC && name === "hero") {
        const links = await page.locator("[data-verify-card] [data-verify-preview-link]").count()
        const embeds = await page.locator('[data-verify-card] img[src^="https://cdn.21st.dev"]').count()
        check(`${width} public restricted previews link to their source with credit`, links > 0 && embeds === 0)
      }
      if (name === "hero") {
        const ok = await page.waitForSelector("[data-verify-card]", { timeout: 15000 }).then(() => true, () => false)
        const n = await page.locator("[data-verify-card]").count()
        const title = await page.locator("main h1").first().innerText().catch(() => "")
        check(`${width} /browse/s/heroes has cards`, ok && n > 0 && /hero/i.test(title), `${n} cards; title "${title.replace(/\s+/g, " ")}"`)
      }
      if (name === "industry") {
        const procs = await page.locator("[data-verify-process]").count()
        const best = await page.locator("[data-verify-screens] [data-verify-card]").count()
        const heading = await page.getByRole("heading", { name: "Screens this industry needs" }).count()
        check(`${width} /industries/hospitality shows "Screens this industry needs" with cards and the processes`, heading === 1 && procs > 0 && best > 0, `${procs} processes, ${best} screen cards`)
        if (width === 1440) {
          const researched = await page.locator('aside [data-verify-nav-section="Researched"]').count()
          const active = await page.locator('aside [data-verify-nav-section="Researched"] [data-active]').innerText().catch(() => "")
          check("1440 sidebar on an industry shows Researched with the row active", researched === 1 && /hotels/i.test(active), active)
        }
      }
      if (name === "category") {
        const ok = await page.waitForSelector("[data-verify-card]", { timeout: 15000 }).then(() => true, () => false)
        const n = await page.locator("[data-verify-card]").count()
        const title = await page.locator("main h1").first().innerText().catch(() => "")
        check(`${width} browse ${route} has cards`, ok && n > 0, `${n} cards; title "${title.replace(/\s+/g, " ")}"`)
      }
      if (name === "component" && PUBLIC) {
        await page.waitForSelector("[data-verify-preview] [data-verify-preview-link]", { timeout: 15000 })
        check(`${width} public component has credited source link without restricted iframe`,
          (await page.locator("[data-verify-preview] [data-verify-preview-link]").count()) === 1 && (await page.locator("iframe[data-verify-iframe]").count()) === 0)
      }
      if (name === "component" && !PUBLIC) {
        const ok = await page.waitForSelector("iframe[data-verify-iframe]", { timeout: 15000 }).then(() => true, () => false)
        let loaded = false
        if (ok) {
          const frame = await (await page.locator("iframe[data-verify-iframe]").elementHandle()).contentFrame()
          loaded = !!frame && (await frame.waitForFunction(() => document.body && document.body.children.length > 0, null, { timeout: 15000 }).then(() => true, () => false))
          await page.waitForTimeout(1500)
        }
        const src = ok ? await page.locator("iframe[data-verify-iframe]").getAttribute("src") : ""
        check(`${width} component iframe exists and loads`, ok && loaded && (!PUBLIC || src.startsWith("https://cdn.21st.dev")), src)
      }
      if (name === "bookmarks") {
        const ok = await page.waitForSelector("[data-verify-signal=love] [data-verify-card]", { timeout: 15000 }).then(() => true, () => false)
        const notes = await page.waitForSelector("[data-verify-note]", { timeout: 15000 }).then(() => true, () => false)
        check(`${width} bookmarks grouped by signal with his notes`, ok && notes)
      }
      if (name === "industries" && width === 1440) {
        check("1440 sidebar on /industries shows Researched", (await page.locator('aside [data-verify-nav-section="Researched"]').count()) === 1)
      }
      if (name === "industries") {
        const v = await page.locator("[data-verify-vertical]").count()
        const ind = await page.locator("[data-verify-industry]").count()
        check(`${width} industries shows ${PUBLIC ? "industries, no verticals" : "verticals and industries"}`, (PUBLIC ? v === 0 : v > 0) && ind > 0, `${v} verticals, ${ind} industries`)
      }
      if (name === "agents") {
        const txt = await page.locator("main").innerText()
        const ro = await page.locator("[data-verify-readonly]").count()
        if (PUBLIC) check(`${width} public agents: read-only, no bookmark tools`, !/bookmark_item|list_bookmarks|uihub bookmark|uihub sync/.test(txt) && ro === 1)
        else check(`${width} private agents keeps the bookmark tools`, /bookmark_item/.test(txt) && ro === 0)
      }
      if (name === "agents") {
        check(`${width} agents shows CLI`, (await page.locator("[data-verify-cli]").count()) > 3)
      }
      if (name === "libraries") {
        await page.waitForSelector("[data-verify-library-inventory]", { timeout: 15000 })
        const inventory = (await (await fetch(`${BASE}/data/meta.json`)).json()).library_inventory
        check(`${width} extended library inventory is present`, inventory.libraries.length > 11 && (await page.locator("[data-verify-library]").count()) > 0)
        await page.locator("main select").first().selectOption("shadcn-reference")
        await page.waitForTimeout(100)
        check(`${width} library filter reaches newly ingested shadcn snapshot`, (await page.locator("[data-verify-library]").count()) === 1 && (await page.getByRole("link", { name: "Browse catalogued items →" }).count()) === 1)
        await page.locator("main select").first().selectOption("all")
      }
      if (name === "discover") {
        const n = await page.waitForSelector("[data-verify-resource]", { timeout: 15000 }).then(() => page.locator("[data-verify-resource]").count(), () => 0)
        check(`${width} discover shows resources`, n > 0, `${n} cards`)
      }
      if (name === "templates" || name === "themes") {
        await page.waitForSelector("[data-verify-card]", { timeout: 15000 }).catch(() => {})
        const n = await page.locator("[data-verify-card]").count()
        const wide = await page.locator("[data-verify-card] [data-wide]").count()
        const img = PUBLIC ? (await page.locator("[data-verify-card] [data-verify-preview-link]").count()) > 0 : await page
          .waitForFunction(() => [...document.querySelectorAll("[data-verify-card] img")].some((i) => i.complete && i.naturalWidth > 0), null, { timeout: 15000 })
          .then(() => true, () => false)
        check(`${width} /${name} renders a bounded viewport of wide cards with images or attributed links`, n >= (width === 1440 ? 9 : 2) && n <= 60 && wide === n && img, `${n} cards, ${wide} wide`)
      }
      if (name === "theme-item") {
        await page.waitForSelector("[data-verify-details-inline]", { timeout: 15000 })
        const inline = await page.locator("[data-verify-details-inline]").count()
        const tablist = await page.getByRole("tablist").count()
        const ids = await page.locator("[data-verify-more-like] [data-verify-card]").evaluateAll((els) => els.map((e) => e.getAttribute("data-verify-card")))
        const rows = ids.map((id) => index.items.find((i) => i.id === id)).filter(Boolean)
        const key = (x) => (x.a === THEME.a ? 0 : 2) + (/remix/i.test(x.t) ? 1 : 0)
        const ordered = rows.every((x, i) => i === 0 || key(rows[i - 1]) <= key(x))
        const same = rows.every((x) => x.c === THEME.c)
        check(`${width} picture-only page: details inline, no tab bar, More like this (1-12, same category, author then originals first)`, inline === 1 && tablist === 0 && rows.length >= 1 && rows.length <= 12 && same && ordered, `${rows.length} cards, ordered=${ordered}`)
      }
      if (name === "theme-item") {
        const img = PUBLIC ? (await page.locator("[data-verify-preview] [data-verify-preview-link]").count()) === 1 : await page
          .waitForFunction(() => { const i = document.querySelector("[data-verify-still-image]"); return !!i && i.complete && i.naturalWidth > 0 }, null, { timeout: 15000 })
          .then(() => true, () => false)
        const open = await page.getByRole("link", { name: "Open on 21st" }).count()
        const code = await page.getByRole("tab", { name: "Code" }).count()
        const lic = await page.locator("[data-verify-licence]").count()
        check(`${width} theme page: preview or source link, "Open on 21st", licence, no Code`, img && open === 1 && code === 0 && lic === 1, `img=${img} open=${open} code=${code} licence=${lic}`)
      }
      if (width === 390 && name === "home") {
        const row = page.locator('[data-verify-topnav="phone"]')
        const vis = await row.isVisible()
        const links = await row.getByRole("link").allInnerTexts()
        await row.getByRole("link", { name: "Sites" }).click()
        await page.waitForURL("**/templates", { timeout: 10000 }).catch(() => {})
        const went = new URL(page.url()).pathname === "/templates"
        const want = PUBLIC ? "Components,Sites,Apps,Looks" : "Components,Sites,Apps,Looks,Projects"
        check(`390 phone top bar reaches ${want}`, vis && links.join(",") === want && went, links.join(","))
        await page.goto(BASE + "/", { waitUntil: "domcontentloaded" })
        await page.waitForSelector("main h1", { timeout: 15000 }).catch(() => {})
      }
      if (width === 1440 && name === "home") {
        check("1440 phone link row hidden, desktop links shown", !(await page.locator('[data-verify-topnav="phone"]').isVisible()) && (await page.locator('[data-verify-topnav="desktop"]').isVisible()))
      }
      if (width === 390 && ["home", "templates", "theme-item", "agents", "shells"].includes(name)) {
        await page.waitForTimeout(500)
        const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
        check(`390 no horizontal scroll on ${route}`, over <= 0, `overflow ${over}px`)
      }
      if (width === 1440 && name === "browse") {
        check('1440 nav shows "The library"', (await page.locator('aside [data-verify-nav-section="The library"]').count()) === 1)
      }
      if (name === "shells") {
        const tmplCards = await page.locator('[data-verify-card^="21st-template:"]').count()
        const link = await page.locator("[data-verify-templates-link] a").first()
        const txt = await link.innerText().catch(() => "")
        const href = await link.getAttribute("href").catch(() => "")
        const n = index.items.filter((i) => i.id.startsWith("21st-template:")).length
        check(`${width} shells: no 21st templates, link "${n} templates from 21st" to /templates`, tmplCards === 0 && href === "/templates" && txt.replace(/,/g, "").startsWith(`${n} templates from 21st`), `${tmplCards} template cards; "${txt}"`)
      }
      if (name === "shells") {
        check(`${width} shells shows siso-shell families`, (await page.locator("[data-verify-shell]").count()) > 0)
        await page.waitForTimeout(2500) // live iframes
      }
      await page.waitForTimeout(600)
      await page.screenshot({ path: path.join(shots, `${SHOT}${name}-${width}.png`), fullPage: false })
    }

    if (width === 1440) {
      // drag a widget by its handle: the saved layout must change
      await page.goto(BASE + "/", { waitUntil: "domcontentloaded" })
      await page.waitForSelector("[data-widget=total] .widget-handle", { timeout: 15000 })
      await page.waitForTimeout(500)
      const before = await page.evaluate(() => localStorage.getItem("uihub.board.v2"))
      const h = await page.locator("[data-widget=total] .widget-handle").boundingBox()
      await page.mouse.move(h.x + h.width / 2, h.y + h.height / 2)
      await page.mouse.down()
      for (let i = 1; i <= 12; i++) await page.mouse.move(h.x + h.width / 2 + i * 50, h.y + h.height / 2 + i * 30)
      await page.mouse.up()
      await page.waitForTimeout(500)
      const after = await page.evaluate(() => localStorage.getItem("uihub.board.v2"))
      const pos = (s) => {
        try {
          const t = JSON.parse(s).layouts.lg.find((x) => x.i === "total")
          return `x${t.x},y${t.y}`
        } catch {
          return "x0,y0" // default position before any save
        }
      }
      check("1440 widget drag changes saved layout", after && pos(after) !== pos(before), `${pos(before)} -> ${pos(after)}`)
      await page.screenshot({ path: path.join(shots, `${SHOT}home-dragged-1440.png`) })

      // ⌘K search opens and finds an item
      await page.keyboard.press("Meta+k")
      await page.keyboard.type("sign in card")
      const hit = await page.waitForSelector("[cmdk-item]", { timeout: 5000 }).then(() => true, () => false)
      check("1440 command search returns hits", hit)
      await page.screenshot({ path: path.join(shots, `${SHOT}search-1440.png`) })
      await page.keyboard.press("Escape")

      // light theme
      await page.evaluate(() => localStorage.setItem("uihub.theme", "light"))
      await page.goto(BASE + `/c/${encodeURIComponent(ITEM)}`, { waitUntil: "domcontentloaded" })
      await page.waitForSelector("main h1", { timeout: 15000 })
      await page.waitForTimeout(1500)
      check("1440 light theme applies", !(await page.evaluate(() => document.documentElement.classList.contains("dark"))))
      await page.screenshot({ path: path.join(shots, `${SHOT}component-light-1440.png`) })
      await page.goto(BASE + "/", { waitUntil: "domcontentloaded" })
      await page.waitForSelector("[data-widget]", { timeout: 15000 })
      await page.waitForTimeout(800)
      await page.screenshot({ path: path.join(shots, `${SHOT}home-light-1440.png`) })
    }
    if (PUBLIC) {
      await page.goto(BASE + "/bookmarks", { waitUntil: "domcontentloaded" })
      await page.waitForTimeout(800)
      check(`${width} public /bookmarks redirects home`, new URL(page.url()).pathname === "/")
      check(`${width} public never calls /api/bookmarks`, apiCalls.length === 0, apiCalls.slice(0, 2).join(" "))
      if (width === 1440) check("1440 public sidebar footer line", (await page.locator("aside [data-verify-public]").count()) === 1)
    }
    check(`${width} no page errors`, errors.length === 0, errors.slice(0, 3).join(" | "))
    await ctx.close()
  }
} finally {
  await browser.close()
}

const failed = results.filter((r) => !r.ok)
console.log(JSON.stringify({ summary: `${results.length - failed.length}/${results.length} passed`, failed: failed.map((f) => f.name), shots }))
process.exit(failed.length ? 1 : 0)
