// Cold-context route measurements and a before/after screenshot gallery.
// Usage: node scripts/performance.mjs --base URL --label before --out /absolute/gallery
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'
const arg = (key, fallback) => process.argv.includes(key) ? process.argv[process.argv.indexOf(key) + 1] : fallback
const base = arg('--base', 'http://127.0.0.1:8790')
const label = arg('--label', 'before')
const out = arg('--out', '/Users/shaansisodia/SISO_Workspace/_data/ui-hub/astra-gallery')
fs.mkdirSync(out, { recursive: true })
const routes = ['/', '/browse', '/libraries', '/c/21st%3Ajatin-yadav05__sign-in-card-2', '/themes', '/templates', '/discover', '/shells', '/authors', '/tools', '/agents']
const shots = new Set(routes.slice(0, 4))
const browser = await chromium.launch({ headless: true })
const results = []
try {
  for (const width of [1440, 390]) {
    for (const route of routes.filter(r => width === 1440 || shots.has(r))) {
      const context = await browser.newContext({ viewport: { width, height: width === 1440 ? 900 : 844 }, colorScheme: 'dark' })
      const page = await context.newPage()
      const errors = []
      page.on('pageerror', e => errors.push(String(e)))
      let itemDataPending = route.startsWith('/c/')
      page.on('response', async response => {
        if (response.url().includes('/data/item/')) {
          await response.finished()
          await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
          itemDataPending = false
        }
      })
      const started = Date.now()
      await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 30000 })
      await page.waitForSelector('main h1', { timeout: 30000 })
      const shellMs = Date.now() - started
      const inspect = () => page.evaluate(() => {
        const visible = el => { const b = el.getBoundingClientRect(); return b.width > 0 && b.height > 0 && b.top < innerHeight && b.bottom > 0 }
        const cards = [...document.querySelectorAll('[data-verify-card]')].filter(visible)
        const imgs = [...document.querySelectorAll('main img')].filter(visible)
        const loaded = el => el.complete && el.naturalWidth > 0
        return { cards: cards.length, previews: cards.filter(c => [...c.querySelectorAll('img')].some(loaded)).length,
          images: imgs.length, loaded: imgs.filter(loaded).length,
          overflow: document.documentElement.scrollWidth > innerWidth,
          pending: !!document.querySelector('main [aria-busy=true]'),
          bytes: performance.getEntriesByType('resource').reduce((n, r) => n + (r.transferSize || 0), 0) }
      })
      let current = await inspect()
      let readySince = null, settledMs = null, atTwoSeconds = null
      while (Date.now() - started < 25000) {
        const elapsed = Date.now() - started
        const ready = current.images === current.loaded && !current.pending && !itemDataPending
        if (ready) {
          if (readySince === null) readySince = elapsed
          if (elapsed - readySince >= 200 && settledMs === null) settledMs = readySince
        } else { readySince = null; settledMs = null }
        if (elapsed >= 2000 && atTwoSeconds === null) atTwoSeconds = current
        if (atTwoSeconds && settledMs !== null) break
        await page.waitForTimeout(50)
        current = await inspect()
      }
      const result = { route, width, shellMs, settledMs,
        atTwoSeconds: atTwoSeconds || current, final: current, errors }
      if (shots.has(route)) {
        const name = route === '/' ? 'home' : route.startsWith('/c/') ? 'item' : route.slice(1)
        result.screenshot = `${label}-${name}-${width}.png`
        await page.screenshot({ path: path.join(out, result.screenshot) })
      }
      results.push(result)
      fs.writeFileSync(path.join(out, `${label}.json`), JSON.stringify({ base, label, measuredAt: new Date().toISOString(), definition: 'Fresh browser context per route. Heading ready, item shard received and rendered where applicable, plus all viewport images decoded. No CPU/network throttle. At-two-seconds sampled at 2s or after heading if heading is later.', results }, null, 2))
      console.log(JSON.stringify(result))
      await context.close()
    }
  }
} finally { await browser.close() }
