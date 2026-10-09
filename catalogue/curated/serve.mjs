#!/usr/bin/env node
// Curated bank viewer. Zero deps. PORT (default 8812).
//   node registry/curated/serve.mjs  → http://127.0.0.1:8812/
// Routes: /            board.html
//         /api/picks   picks.jsonl as JSON array
//         /api/libs    libraries.jsonl as JSON array
//         /api/votes   GET/POST votes.json  ({ "<type>": { winner: url, note, at } , "<url>": { verdict, note, at } })
//         /harvest/<id>/<file>   preview.webp / bundle.html / demo.tsx from ../21st/harvest
//         /source/<id>/code.tsx  from ../21st-source-harvest/source
//         /streaming (/halo)     HALO Streaming board (halo/index.html): in the app · your picks · everything; marks → halo/marks.jsonl
//         /rob                   the rob board (rob/rob.html): per-surface picker over 21st corpus · shadcn · GitHub; votes in rob/votes.json
import { createServer } from 'node:http'
import { readFile, writeFile, appendFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname, extname, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
const HERE = dirname(fileURLToPath(import.meta.url))
const HARVEST = join(HERE, '..', '21st', 'harvest')
const SOURCE = join(HERE, '..', '21st-source-harvest', 'source')
const VOTES = join(HERE, 'votes.json')
const PORT = Number(process.env.PORT || 8812)
// HALO board: marks are append-only (latest line per id wins) so no click is ever lost
const MARKS = join(HERE, 'halo', 'marks.jsonl')
const CATALOG = process.env.CATALOG || join(process.env.HOME, 'SISO_Workspace/Great_Library_of_SISO/banks/siso-component-bank/catalog-site/dist/index.json')
const MIME = { '.html': 'text/html; charset=utf-8', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.tsx': 'text/plain; charset=utf-8', '.mp4': 'video/mp4', '.gif': 'image/gif', '.jpg': 'image/jpeg' }
const jsonl = async f => (await readFile(join(HERE, f), 'utf8')).split('\n').filter(Boolean).map(l => JSON.parse(l))
const send = (res, code, body, type = 'application/json') => { res.writeHead(code, { 'content-type': type, 'cache-control': 'no-store' }); res.end(body) }
const serveFile = async (res, root, rel) => {
  const safe = normalize(rel).replace(/^(\.\.[/\\])+/, '')
  const file = join(root, safe)
  if (!file.startsWith(root) || !existsSync(file)) return send(res, 404, 'not found', 'text/plain')
  send(res, 200, await readFile(file), MIME[extname(file)] || 'application/octet-stream')
}
createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)
  const p = decodeURIComponent(url.pathname)
  try {
    if (p === '/api/picks') return send(res, 200, JSON.stringify(await jsonl('picks.jsonl')))
    if (p === '/api/candidates') return send(res, 200, JSON.stringify(existsSync(join(HERE, 'scout', 'candidates.jsonl')) ? await jsonl('scout/candidates.jsonl') : []))
    if (p === '/api/libs') return send(res, 200, JSON.stringify(await jsonl('libraries.jsonl')))
    if (p === '/api/votes') {
      if (req.method === 'POST') { let b = ''; for await (const c of req) b += c; JSON.parse(b); await writeFile(VOTES, b); return send(res, 200, '{"ok":true}') }
      return send(res, 200, existsSync(VOTES) ? await readFile(VOTES, 'utf8') : '{}')
    }
    // ---- rob board: one page per models-app surface, three levels (21st corpus · shadcn · GitHub) ----
    if (p === '/rob' || p === '/rob/' || p === '/rob.html') return send(res, 200, await readFile(join(HERE, 'rob', 'rob.html')), MIME['.html'])
    if (p === '/rob/oracle-pick') return send(res, 200, await readFile(join(HERE, 'rob', 'oracle-pick.html')), MIME['.html'])
    if (p === '/rob/meetily') return send(res, 200, await readFile(join(HERE, 'rob', 'meetily.html')), MIME['.html'])
    if (p === '/rob/repos') return send(res, 200, await readFile(join(HERE, 'rob', 'repos.html')), MIME['.html'])
    if (p === '/rob/plan') return send(res, 200, await readFile(join(HERE, 'rob', 'plan.html')), MIME['.html'])
    if (p.startsWith('/rob/now/')) return serveFile(res, join(HERE, 'rob', 'now'), p.slice(9))
    if (p === '/api/rob/surfaces') return send(res, 200, await readFile(join(HERE, 'rob', 'surfaces.json'), 'utf8'))
    if (p.startsWith('/api/rob/corpus/')) {
      const id = p.slice('/api/rob/corpus/'.length)
      const m = JSON.parse(await readFile(join(HERE, 'rob', 'surfaces.json'), 'utf8'))
      const sf = m.surfaces.find(x => x.id === id); if (!sf) return send(res, 404, '[]')
      const re = new RegExp(sf.level1.match, 'i'); const ex = new RegExp(m.exclude || '$^', 'i'); const seen = new Set(); const rows = []
      for (const lane of sf.level1.lanes) {
        const f = join(HERE, 'scout', `lane-${lane}.jsonl`); if (!existsSync(f)) continue
        for (const r of await jsonl(`scout/lane-${lane}.jsonl`)) {
          if (seen.has(r.id) || ex.test(`${r.name} ${(r.tags || []).join(' ')}`)) continue
          // name/tag hits outrank description hits: a desc that merely mentions "video" is not a video comp
          const tier = re.test(`${r.name} ${(r.tags || []).join(' ')}`) ? 2 : re.test(r.desc || '') ? 1 : 0
          if (!tier) continue
          seen.add(r.id); if (existsSync(join(HARVEST, r.id, 'preview.webp'))) rows.push({ ...r, tier })
        }
      }
      rows.sort((a, b) => b.tier - a.tier || (b.usage || 0) - (a.usage || 0))
      return send(res, 200, JSON.stringify(rows.slice(0, Number(url.searchParams.get('limit') || 160))))
    }
    if (p === '/api/rob/votes') {
      const f = join(HERE, 'rob', 'votes.json')
      if (req.method === 'POST') { let b = ''; for await (const c of req) b += c; JSON.parse(b); await writeFile(f, b); return send(res, 200, '{"ok":true}') }
      return send(res, 200, existsSync(f) ? await readFile(f, 'utf8') : '{}')
    }
    // ---- HALO comp board: in the app · your picks · everything, with want/maybe/no marks agents read ----
    if (p === '/streaming' || p === '/streaming/' || p === '/halo' || p === '/halo/') return send(res, 200, await readFile(join(HERE, 'halo', 'index.html')), MIME['.html'])
    if (p === '/api/halo/data') return send(res, 200, await readFile(join(HERE, 'halo', 'data.json'), 'utf8'))
    if (p === '/api/halo/taste') return send(res, 200, existsSync(join(HERE, 'halo', 'taste.json')) ? await readFile(join(HERE, 'halo', 'taste.json'), 'utf8') : '{}')
    if (p === '/api/halo/catalog') return send(res, 200, await readFile(CATALOG, 'utf8'))
    if (p === '/api/halo/marks') {
      if (req.method === 'POST') {
        let b = ''; for await (const c of req) b += c
        const m = JSON.parse(b); if (!m.id || !['want', 'maybe', 'no', 'clear'].includes(m.verdict)) return send(res, 400, '{"ok":false}')
        await appendFile(MARKS, JSON.stringify({ ...m, at: new Date().toISOString() }) + '\n'); return send(res, 200, '{"ok":true}')
      }
      return send(res, 200, JSON.stringify(existsSync(MARKS) ? await jsonl('halo/marks.jsonl') : []))
    }
    if (p.startsWith('/halo/live/')) return serveFile(res, join(HERE, 'halo', 'live'), p.slice(11))
    if (p.startsWith('/shadcn-previews/')) return serveFile(res, join(HERE, '..', 'shadcn', 'previews'), p.slice(17))
    if (p.startsWith('/harvest/')) return serveFile(res, HARVEST, p.slice(9))
    if (p.startsWith('/source/')) return serveFile(res, SOURCE, p.slice(8))
    if (p === '/' || p === '/board.html') return send(res, 200, await readFile(join(HERE, 'board.html')), MIME['.html'])
    send(res, 404, 'not found', 'text/plain')
  } catch (e) { send(res, 500, String(e), 'text/plain') }
}).listen(PORT, '127.0.0.1', () => console.log(`curated bank → http://127.0.0.1:${PORT}/`))
