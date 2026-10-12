// UI Hub, served locally: app/dist (built site + exported data) with the SPA fallback, and /api/bookmarks backed by
// catalogue/bookmarks.json, so a bookmark made here is in the file every agent reads (uihub, the MCP) at once.
// The hosted twin is app/worker/ (same routes; bookmarks in KV, pulled into the file by `uihub sync`).
// Usage: node serve.mjs [--port 8790] [--host 127.0.0.1] [--dist DIR]
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d }
const port = Number(arg('--port', process.env.PORT || 8790))
const host = arg('--host', process.env.HOST || '127.0.0.1')
const dist = path.resolve(arg('--dist', process.env.UIHUB_DIST || path.join(here, 'dist')))
const marks = path.resolve(here, '..', 'catalogue', 'bookmarks.json')
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.avif': 'image/avif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.txt': 'text/plain' }

const readMarks = () => JSON.parse(fs.readFileSync(marks, 'utf8'))
function writeMarks(d) {  // write then rename, so a reader never sees half a file
  const tmp = marks + '.tmp'
  fs.writeFileSync(tmp, JSON.stringify(d, null, 1) + '\n'); fs.renameSync(tmp, marks)
}

function api(req, res) {
  const send = (code, body) => { res.writeHead(code, { 'content-type': 'application/json', 'cache-control': 'no-store' }); res.end(JSON.stringify(body)) }
  if (req.method === 'GET') return send(200, { items: readMarks().items, store: 'file' })
  if (req.method !== 'POST') return send(405, { error: 'GET or POST' })
  let body = ''
  req.on('data', c => { body += c; if (body.length > 1e5) req.destroy() })
  req.on('end', () => {
    let b; try { b = JSON.parse(body) } catch { return send(400, { error: 'json' }) }
    if (typeof b.id !== 'string' || !/^[\w.@:-]+$/.test(b.id) || b.id.length > 200) return send(400, { error: 'id' })
    const d = readMarks()
    const at = new Date().toISOString().slice(0, 19)
    // off is kept rather than deleted: his picks are bookmarks by default, so un-bookmarking one must be recorded
    d.items[b.id] = b.on === false ? { by: 'site', at, off: true }
      : Object.fromEntries(Object.entries({ by: 'site', at, note: b.note, signal: b.signal }).filter(([, v]) => v))
    writeMarks(d)
    send(200, { ok: true, item: d.items[b.id] })
  })
}

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x')
  if (url.pathname === '/api/bookmarks') return api(req, res)
  let p = path.join(dist, decodeURIComponent(url.pathname))
  if (!p.startsWith(dist)) { res.writeHead(403); return res.end() }
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) {
    const asset = /\.\w+$/.test(url.pathname) && !url.pathname.endsWith('.html')
    if (asset) { res.writeHead(404); return res.end('not found') }   // a missing file is a 404, never the app shell
    p = path.join(dist, 'index.html')
  }
  const ext = path.extname(p)
  res.writeHead(200, { 'content-type': types[ext] || 'application/octet-stream',
    'cache-control': p.includes(`${path.sep}a${path.sep}`) || p.includes(`${path.sep}assets${path.sep}`) ? 'public, max-age=86400' : 'no-cache' })
  fs.createReadStream(p).pipe(res)
}).listen(port, host, () => console.log(`UI Hub on http://${host}:${port} (dist ${dist}; bookmarks ${marks})`))
