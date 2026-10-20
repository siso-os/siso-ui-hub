#!/usr/bin/env node
// Fetches every source in research/sources/*.jsonl once, verifies it, and keeps its text for the distil pass.
//   verdict ok        page loads and its title shares a word with the line's title
//   verdict mismatch  page loads but its title shares nothing with the line; resolved after the run:
//                     a real page the harvester paraphrased becomes ok ("title from page"), and a
//                     single-page app serving one title for every URL becomes walled
//   verdict dead      404/410 or the host doesn't resolve
//   verdict walled    a bot wall (Cloudflare and the like) or 403/429: unknown until a browser pass
//   verdict error     anything else (timeout, non-HTML)
// Writes research/verify.jsonl (one verdict per id, in git) and research/_text/<id>.txt (trimmed text, not in git).
// --quarantine moves dead lines into research/sources/_unverified/<file> and retitles paraphrased ones.
// Re-runs skip ids already verified unless --recheck.
// Usage: node scripts/research-fetch.mjs [--quarantine] [--recheck] [--max-chars 6000] [--jobs 12]
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync, appendFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const flag = k => process.argv.includes(k);
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? Number(process.argv[i + 1]) : d; };
const MAX = arg('--max-chars', 6000), JOBS = arg('--jobs', 12);
const srcDir = join(root, 'research/sources'), textDir = join(root, 'research/_text');
const verifyFile = join(root, 'research/verify.jsonl');
mkdirSync(textDir, { recursive: true });

const verified = new Map(existsSync(verifyFile)
  ? readFileSync(verifyFile, 'utf8').split('\n').filter(Boolean).map(l => { const v = JSON.parse(l); return [v.id, v]; })
  : []);
const files = readdirSync(srcDir).filter(f => f.endsWith('.jsonl'));
const sources = files.flatMap(f => readFileSync(join(srcDir, f), 'utf8').split('\n').filter(Boolean)
  .map(l => ({ ...JSON.parse(l), _file: f })));
const todo = sources.filter(s => s.url && (flag('--recheck') || !verified.has(s.id)));

const STOP = new Set(['the', 'and', 'for', 'with', 'from', 'your', 'design', 'guide', 'guidelines', 'what', 'how', 'why', 'best', 'practices']);
const words = t => new Set((t || '').toLowerCase().normalize('NFKD').match(/[a-z0-9]{3,}/g)?.filter(w => !STOP.has(w)) || []);
const WALL = /just a moment|attention required|access denied|captcha|are you a robot|enable javascript and cookies/i;

function toText(html) {
  const main = html.match(/<(main|article)[\s\S]*?<\/\1>/i)?.[0] || html;
  return main
    .replace(/<(script|style|nav|header|footer|svg|noscript)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<\/(p|li|h[1-6]|tr|div|section)>|<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#39;|&rsquo;/g, "'").replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
}

async function check(s) {
  const v = { id: s.id, url: s.url, checked: new Date().toISOString().slice(0, 10) };
  try {
    const res = await fetch(s.url, { signal: AbortSignal.timeout(20000), redirect: 'follow',
      headers: { 'user-agent': 'Mozilla/5.0 (Macintosh) SISO-research/1.0', accept: 'text/html,application/xhtml+xml,application/pdf' } });
    v.status = res.status;
    const type = (res.headers.get('content-type') || '').split(';')[0];
    if (res.status === 404 || res.status === 410) return { ...v, verdict: 'dead' };
    if ([401, 403, 429, 503].includes(res.status)) return { ...v, verdict: 'walled' };
    if (!res.ok) return { ...v, verdict: 'error' };
    if (type === 'application/pdf') return { ...v, verdict: 'ok', note: 'pdf' };
    if (!type.includes('html')) return { ...v, verdict: 'error', note: type };
    const html = await res.text();
    const title = toText(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '').slice(0, 200);
    const h1 = toText(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '').slice(0, 200);
    v.page_title = title || h1;
    if (WALL.test(title) || WALL.test(html.slice(0, 3000))) return { ...v, verdict: 'walled' };
    const page = words(`${title} ${h1} ${s.url.replace(/[-_/.]/g, ' ')}`);
    const shared = [...words(s.title)].filter(w => page.has(w)).length;
    const text = toText(html);
    if (s.access === 'open') writeFileSync(join(textDir, `${s.id}.txt`), `${s.title}\n${s.org} · ${s.url}\n\n${text.slice(0, MAX)}\n`);
    return { ...v, verdict: shared ? 'ok' : 'mismatch', chars: text.length };
  } catch (e) {
    return { ...v, verdict: /ENOTFOUND|EAI_AGAIN/.test(String(e.cause?.code)) ? 'dead' : 'error', note: e.cause?.code || e.name };
  }
}

const queue = [...todo];
await Promise.all(Array.from({ length: JOBS }, async () => {
  while (queue.length) { const s = queue.shift(); verified.set(s.id, await check(s)); }
}));

// A mismatch is either a real page the harvester paraphrased, or a single-page app that serves
// one generic title for every URL (so the URL may be guessed). Same title on 3+ URLs of a host = generic.
const host = u => new URL(u).hostname;
const seen = {};
for (const v of verified.values()) if (v.page_title) {
  const k = `${host(v.url)}\t${v.page_title}`; seen[k] = (seen[k] || 0) + 1;
}
for (const v of verified.values()) if (v.verdict === 'mismatch') {
  const generic = seen[`${host(v.url)}\t${v.page_title}`] >= 3;
  Object.assign(v, generic ? { verdict: 'walled', note: 'generic title (single-page app)' } : { verdict: 'ok', note: 'title from page' });
}
writeFileSync(verifyFile, [...verified.values()].map(v => JSON.stringify(v)).join('\n') + '\n');

const tally = {};
for (const s of sources) { const k = verified.get(s.id)?.verdict || 'unchecked'; tally[k] = (tally[k] || 0) + 1; }
console.log(`checked ${todo.length}; across ${sources.length} sources:`, tally);

if (flag('--quarantine')) {
  mkdirSync(join(srcDir, '_unverified'), { recursive: true });
  let moved = 0;
  for (const f of files) {
    const keep = [], out = [];
    for (const l of readFileSync(join(srcDir, f), 'utf8').split('\n').filter(Boolean)) {
      const s = JSON.parse(l), v = verified.get(s.id);
      if (v?.verdict === 'dead') { out.push(l); continue; }
      if (v?.note === 'title from page') {
        // keep the line, under the title the page itself carries (site suffix trimmed)
        keep.push(JSON.stringify({ ...s, title: v.page_title.replace(/\s+[|–—-]\s+[^|–—-]{2,40}$/, '') }));
      } else keep.push(l);
    }
    if (!out.length) continue;
    writeFileSync(join(srcDir, f), keep.join('\n') + '\n');
    appendFileSync(join(srcDir, '_unverified', f), out.join('\n') + '\n');
    moved += out.length;
  }
  console.log(`quarantined ${moved} lines into research/sources/_unverified/`);
}
