// uihub: siso:render-service
// The App Factory's render service (spec §7): renders any component from its own source, no install, no build.
// TSX/TS is transpiled here with vendored Sucrase; bare imports go to esm.sh on one pinned React; local imports
// (relative, "@/", and workspace packages like "@siso/shell") are served from the source repos read-only.
// Run: node server.mjs  (RENDER_PORT=8850). Source files are never copied or changed.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from './vendor/sucrase.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PORT = +(process.env.RENDER_PORT || 8850);
const HOST = process.env.RENDER_HOST || '127.0.0.1';
const CONF = () => JSON.parse(fs.readFileSync(path.join(HERE, 'roots.json'), 'utf8'));
const t0 = Date.now();

const REACT_V = '19.1.0';
const IMPORTMAP = {
  imports: {
    react: `https://esm.sh/react@${REACT_V}`,
    'react/': `https://esm.sh/react@${REACT_V}/`,
    'react-dom': `https://esm.sh/react-dom@${REACT_V}?external=react`,
    'react-dom/': `https://esm.sh/react-dom@${REACT_V}&external=react/`,
    'react-dom/client': `https://esm.sh/react-dom@${REACT_V}/client?external=react`,
  },
};

// root name -> absolute dir; "~" expanded
function roots() {
  const c = CONF();
  const out = {};
  for (const [k, v] of Object.entries(c.roots)) out[k] = { ...v, dir: v.dir.replace(/^~/, process.env.HOME) };
  return { roots: out, pins: c.pins || {}, aliases: c.aliases || {} };
}

const EXTS = ['', '.tsx', '.ts', '.jsx', '.js', '.mjs', '/index.tsx', '/index.ts', '/index.js'];
function resolveFile(abs) {
  for (const e of EXTS) {
    const p = abs + e;
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
  }
  return null;
}

// absolute path -> /f/<root>/<rel>
function urlFor(abs, R) {
  for (const [name, r] of Object.entries(R.roots)) {
    if (abs.startsWith(r.dir + '/')) return `/f/${name}/${abs.slice(r.dir.length + 1)}`;
  }
  return null;
}

function esm(spec, R) {
  // split "pkg/sub" or "@scope/pkg/sub"
  const parts = spec.split('/');
  const pkg = spec.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
  const sub = spec.slice(pkg.length);
  if (pkg === 'react' || pkg === 'react-dom') return spec; // importmap
  const pin = R.pins[pkg] || '';
  const [ver, extra] = pin.split('?');
  const q = ['external=react,react-dom', extra].filter(Boolean).join('&');
  return `https://esm.sh/${pkg}${ver ? '@' + ver : ''}${sub}?${q}`;
}

function rewriteImports(code, fromAbs, rootName, R) {
  const root = R.roots[rootName];
  const dir = path.dirname(fromAbs);
  const atRoot = (code.match(/\/\*\s*@root\s+(\w+)\s*\*\//) || [])[1];
  const fix = (spec) => {
    if (/^https?:/.test(spec) || spec.startsWith('/f/') || spec.startsWith('/css/')) return spec;
    // workspace aliases: exact ("@siso/shell") or wildcard ("@/components/ui/*" -> "hub:_reference/shadcn/ui/*/ui/*")
    let abs = null;
    let target = R.aliases[spec];
    if (!target) {
      const w = Object.keys(R.aliases).find((k) => k.endsWith('*') && spec.startsWith(k.slice(0, -1)));
      if (w) target = R.aliases[w].replaceAll('*', spec.slice(w.length - 1));
    }
    if (target) {
      const i = target.indexOf(':');
      abs = path.join(R.roots[target.slice(0, i)].dir, target.slice(i + 1));
    } else if (spec.startsWith('@/') && (root.at || atRoot)) {
      // "@/": the file's own root, or for a demo the root it names in /* @root lp */
      abs = atRoot ? path.join(R.roots[atRoot].dir, R.roots[atRoot].at || '', spec.slice(2)) : path.join(root.dir, root.at, spec.slice(2));
    } else if (spec.startsWith('.')) {
      abs = path.resolve(dir, spec);
    } else {
      return esm(spec, R);
    }
    if (/\.css$/.test(abs)) return '/css' + (urlFor(abs, R) || '/missing').slice(2);
    const f = resolveFile(abs);
    if (!f) return `/missing?spec=${encodeURIComponent(spec)}&from=${encodeURIComponent(fromAbs)}`;
    if (/\.css$/.test(f)) return '/css' + urlFor(f, R).slice(2);
    return urlFor(f, R) || `/missing?outside=${encodeURIComponent(f)}`;
  };
  return code
    .replace(/(\bfrom\s*["'])([^"']+)(["'])/g, (m, a, s, z) => a + fix(s) + z)
    .replace(/(\bimport\s*["'])([^"']+)(["'])/g, (m, a, s, z) => a + fix(s) + z)
    .replace(/(\bimport\(\s*["'])([^"']+)(["']\s*\))/g, (m, a, s, z) => a + fix(s) + z);
}

function transpile(abs, rootName, R) {
  const raw = fs.readFileSync(abs, 'utf8');
  if (abs.endsWith('.json')) return `export default ${raw};`;
  let code = raw;
  if (/\.(tsx?|jsx)$/.test(abs)) {
    code = transform(raw, {
      transforms: abs.endsWith('.ts') ? ['typescript'] : ['typescript', 'jsx'],
      jsxRuntime: 'automatic',
      filePath: abs,
      production: true,
    }).code;
  }
  return rewriteImports(code, abs, rootName, R);
}

function harness(name, R, rel) {
  rel = rel || `render/demos/${name}.tsx`;
  const demo = path.join(HERE, '..', rel);
  if (!fs.existsSync(demo)) return null;
  const head = fs.readFileSync(demo, 'utf8').match(/\/\*\s*@css([\s\S]*?)\*\//);
  const css = head ? head[1].trim().split(/\s+/) : [];
  const src = fs.readFileSync(demo, 'utf8');
  const theme = /\/\*\s*@light\s*\*\//.test(src) ? 'light' : 'dark';
  const jsm = src.match(/\/\*\s*@js([\s\S]*?)\*\//);
  const js = jsm ? jsm[1].trim().split(/\s+/) : [];
  return `<!doctype html><html class="${theme}" data-theme="${theme}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<script type="importmap">${JSON.stringify(IMPORTMAP)}</script>
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
${css.map((c) => `<link rel="stylesheet" href="/raw/${c.replace(':', '/')}">`).join('\n')}
<link rel="stylesheet" href="/raw/factory/render/harness.css">
${js.map((c) => `<script src="/raw/${c.replace(':', '/')}"></script>`).join('\n')}
</head><body>
<div id="err"></div><div id="root"></div>
<script>
function fail(m){var d=document.getElementById('err');d.style.display='block';d.textContent='LIVE RENDER FAILED: '+m;}
window.addEventListener('error',function(e){fail(e.message||String(e.error))});
window.addEventListener('unhandledrejection',function(e){fail((e.reason&&e.reason.message)||String(e.reason))});
</script>
<script type="module">
import { createRoot } from 'react-dom/client';
import { jsx } from 'react/jsx-runtime';
import('/f/factory/${rel}')
  .then((m) => createRoot(document.getElementById('root')).render(jsx(m.default, {})))
  .catch((e) => fail(e && e.message || String(e)));
</script></body></html>`;
}

function send(res, code, type, body) {
  res.writeHead(code, { 'content-type': type, 'cache-control': 'no-store', 'access-control-allow-origin': '*' });
  res.end(body);
}

http
  .createServer(async (req, res) => {
    const u = new URL(req.url, 'http://x');
    const p = decodeURIComponent(u.pathname);
    try {
      const R = roots();
      if (p === '/api/picks' || p === '/api/pick') {
        // his take/skip per candidate, last word wins (factory/siso-ui/picks.jsonl, append-only)
        const f = path.join(HERE, '..', 'siso-ui', 'picks.jsonl');
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (c) => (body += c));
          req.on('end', () => {
            const b = JSON.parse(body || '{}');
            if (!b.id || !['take', 'skip'].includes(b.verdict)) return send(res, 400, 'application/json', '{"ok":false}');
            const row = { at: new Date().toISOString(), id: String(b.id), verdict: b.verdict, words: String(b.words || ''), by: 'Shaan (pick page)' };
            fs.appendFileSync(f, JSON.stringify(row) + '\n');
            send(res, 200, 'application/json', JSON.stringify({ ok: true, row }));
          });
          return;
        }
        const last = {};
        if (fs.existsSync(f)) for (const l of fs.readFileSync(f, 'utf8').split('\n').filter(Boolean)) { const r = JSON.parse(l); last[r.id] = r; }
        return send(res, 200, 'application/json', JSON.stringify(Object.values(last)));
      }
      if (p === '/api/health') return send(res, 200, 'application/json', JSON.stringify({ ok: true, uptime_s: Math.round((Date.now() - t0) / 1000) }));
      if (p === '/' || p.endsWith('.html')) {
        const f = path.join(HERE, 'public', p === '/' ? 'index.html' : p.slice(1));
        if (fs.existsSync(f)) return send(res, 200, 'text/html; charset=utf-8', fs.readFileSync(f));
      }
      if (p.startsWith('/bundle/')) {
        // a 21st component's own built preview (registry/21st/harvest/<id>/bundle.html): already self-contained
        const id = p.slice(8).replace(/[^\w.@-]/g, '');
        const f = path.join(R.roots.bank.dir, '21st/harvest', id, 'bundle.html');
        return fs.existsSync(f) ? send(res, 200, 'text/html; charset=utf-8', fs.readFileSync(f)) : send(res, 404, 'text/plain', 'no bundle ' + id);
      }
      if (p === '/app') return send(res, 200, 'text/html; charset=utf-8', harness('app', R, 'app/App.tsx').replace('<title>', '<title>'));
      const lab = p.match(/^\/lab\/([\w-]+)$/);
      if (lab) {
        const h = harness(lab[1], R, `lab/${lab[1]}.tsx`);
        return h ? send(res, 200, 'text/html; charset=utf-8', h) : send(res, 404, 'text/plain', 'no lab sample');
      }
      // Agent Base's live data for the lab's sample, read only: three GETs, nothing else passes
      const ab = p.match(/^\/ab-api\/(agents|org|ended)$/);
      if (ab) {
        try {
          const r = await fetch(`http://127.0.0.1:5401/api/${ab[1]}`, { signal: AbortSignal.timeout(4000) });
          return send(res, r.status, 'application/json', Buffer.from(await r.arrayBuffer()));
        } catch (e) { return send(res, 502, 'application/json', JSON.stringify({ error: 'Agent Base is not answering' })); }
      }
      if (p.startsWith('/demo/')) {
        const h = harness(p.slice(6), R);
        return h ? send(res, 200, 'text/html; charset=utf-8', h) : send(res, 404, 'text/plain', 'no demo');
      }
      const m = p.match(/^\/(f|css|raw)\/([^/]+)\/(.+)$/);
      if (m) {
        const [, kind, rn, rel] = m;
        const r = R.roots[rn];
        if (!r) return send(res, 404, 'text/plain', 'no root ' + rn);
        const abs = path.resolve(r.dir, rel);
        if (!abs.startsWith(r.dir + '/') || !fs.existsSync(abs)) return send(res, 404, 'text/plain', 'not found ' + rel);
        if (kind === 'raw') {
          const type = abs.endsWith('.css') ? 'text/css' : abs.endsWith('.svg') ? 'image/svg+xml' : abs.endsWith('.js') ? 'text/javascript' : /\.(png)$/.test(abs) ? 'image/png' : /\.webp$/.test(abs) ? 'image/webp' : /\.jpe?g$/.test(abs) ? 'image/jpeg' : 'text/plain';
          return send(res, 200, type, fs.readFileSync(abs));
        }
        if (kind === 'css') {
          // CSS imported from a module: inject a <link> once
          const href = `/raw/${rn}/${rel}`;
          return send(res, 200, 'text/javascript', `if(!document.querySelector('link[href="${href}"]')){const l=document.createElement('link');l.rel='stylesheet';l.href=${JSON.stringify(href)};document.head.appendChild(l);}`);
        }
        return send(res, 200, 'text/javascript', transpile(abs, rn, R));
      }
      if (p === '/missing') return send(res, 200, 'text/javascript', `throw new Error(${JSON.stringify('cannot resolve ' + (u.searchParams.get('spec') || u.searchParams.get('outside')) + ' from ' + (u.searchParams.get('from') || ''))});`);
      send(res, 404, 'text/plain', 'not found');
    } catch (e) {
      send(res, 500, 'text/javascript', `throw new Error(${JSON.stringify('render service: ' + e.message)});`);
    }
  })
  .listen(PORT, HOST, () => console.log(`render service http://${HOST}:${PORT}`));
