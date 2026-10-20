#!/usr/bin/env node
// Second, deeper read of the sources the first pass cut short. research-fetch.mjs kept only the first
// 6,000 characters of each page; this re-fetches the main content (up to --max-chars, default 20,000) of
// the core sources whose page was longer, and asks Haiku for the rules the first pass missed.
// Same gates as research-distil.mjs: a claim is kept only if its quote is in the page word for word and
// shares two content words with its rule. New claim ids carry a "#dN" suffix so they never collide.
// Writes research/_text_deep/<id>.txt (not in git), appends to research/claims/<family>.jsonl and records
// finished sources in research/claims/_done-deep.txt so a re-run resumes.
// Usage: node scripts/research-deepen.mjs [--fetch-only] [--batch 3] [--jobs 6] [--limit N] [--ids file]
import { readFileSync, writeFileSync, existsSync, mkdirSync, appendFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv;
const arg = (k, d) => { const i = argv.indexOf(k); return i > 0 ? argv[i + 1] : d; };
const BATCH = Number(arg('--batch', 3)), JOBS = Number(arg('--jobs', 6)), LIMIT = Number(arg('--limit', Infinity));
const MAX = Number(arg('--max-chars', 20000)), IDS = arg('--ids', null), MODEL = 'claude-haiku-4-5-20251001';
const FAMILIES = new Set(['psychology', 'experiments', 'engagement', 'craft', 'ux-research', 'design-systems', 'hci-papers', 'dataviz-motion']);
const textDir = join(root, 'research/_text_deep'), claimDir = join(root, 'research/claims');
const doneFile = join(claimDir, '_done-deep.txt');
mkdirSync(textDir, { recursive: true });

const TOPICS = new Set(JSON.parse(readFileSync(join(root, 'research/topics.json'), 'utf8')));
const lib = JSON.parse(readFileSync(join(root, 'research/library.json'), 'utf8'));
const verify = new Map(readFileSync(join(root, 'research/verify.jsonl'), 'utf8').split('\n').filter(Boolean)
  .map(l => { const v = JSON.parse(l); return [v.id, v]; }));
const claims = readdirSync(claimDir).filter(f => f.endsWith('.jsonl')).flatMap(f =>
  readFileSync(join(claimDir, f), 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l)));
const have = claims.reduce((m, c) => ((m[c.source] ||= []).push(c), m), {});
const done = new Set(existsSync(doneFile) ? readFileSync(doneFile, 'utf8').split('\n').filter(Boolean) : []);

// The first pass truncated a page when it had more than 6,000 characters of text.
const only = IDS ? new Set(readFileSync(IDS, 'utf8').split('\n').filter(Boolean)) : null;
const todo = lib.sources.filter(s => !done.has(s.id) && s.access === 'open' && (only ? only.has(s.id)
  : FAMILIES.has(s.family) && s.tier === 'core' && verify.get(s.id)?.verdict === 'ok' && (verify.get(s.id)?.chars || 0) > 6500))
  .slice(0, LIMIT);

function toText(html) {
  const main = html.match(/<(main|article)[\s\S]*?<\/\1>/i)?.[0] || html;
  return main
    .replace(/<(script|style|nav|header|footer|svg|noscript|aside|form)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<\/(p|li|h[1-6]|tr|div|section|figcaption|blockquote)>|<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#39;|&rsquo;|&#8217;/g, "'").replace(/&quot;|&ldquo;|&rdquo;|&#8220;|&#8221;/g, '"')
    .replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
}
async function fetchText(s) {
  const f = join(textDir, `${s.id}.txt`);
  if (existsSync(f)) return decode(readFileSync(f, 'utf8'));
  try {
    const res = await fetch(s.url, { signal: AbortSignal.timeout(20000), redirect: 'follow',
      headers: { 'user-agent': 'Mozilla/5.0 (Macintosh) SISO-research/1.0', accept: 'text/html,application/xhtml+xml' } });
    if (!res.ok || !(res.headers.get('content-type') || '').includes('html')) return null;
    const text = decode(toText(await res.text()));
    if (text.length < 500) return null;
    const out = `${s.title}\n${s.org} · ${s.url}\n\n${text.slice(0, MAX)}\n`;
    writeFileSync(f, out);
    return out;
  } catch { return null; }
}

const SYSTEM = `You distil published UI research into rules for people who build interfaces. Output only JSON lines: no prose, no code fences.`;
const ASK = `Each SOURCE below is the full text of a page. An earlier pass read only its opening and already took the rules listed under ALREADY; do not repeat them. For each SOURCE, output 0 to 8 JSON lines, one per further distinct rule or measured finding about designing user interfaces (screens, dashboards, tables, charts, flows, components, motion, copy, or the psychology of the people using them). Prefer rules with numbers (sizes, timings, counts, effect sizes) and measured results. Ignore site navigation, cookie banners, marketing, author bios and course ads. If a source holds nothing new, output nothing for it.

Each line:
{"source": "<the SOURCE id>", "rule": "<one imperative sentence a builder can obey, at most 30 words, plain English>", "quote": "<6 to 30 words copied exactly, character for character, from that source's text, that themselves state the rule or the finding>", "finding": "<the measured result with its numbers if the source reports one, else null>", "topics": [<1 to 3 of: ${[...TOPICS].join(', ')}>], "strength": "must" | "should" | "may", "evidence": "experiment" | "study" | "guideline" | "expert"}

Only output a rule the source itself states: if you cannot find words in the text that say it, leave it out. Never write a rule from general knowledge. Never invent a number.

evidence: experiment = a controlled test with users or traffic; study = observational or lab research; guideline = a published design-system or standards rule; expert = a practitioner's argued opinion.`;

const STOP = new Set('the and for with that this from your you are can its into more than when what which their them they will have has not but all any use used using make sure should must may each how why'.split(' '));
const decode = t => t.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d))).replace(/&rarr;/g, '→').replace(/&raquo;/g, '»').replace(/&hellip;/g, '…');
const squash = t => decode(t).toLowerCase().replace(/\u00a0|\u2011/g, ' ').replace(/[‘’“”"'`]/g, '').replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim();
const content = t => new Set(squash(t).match(/[a-z0-9]{3,}/g)?.filter(w => !STOP.has(w)).map(w => w.replace(/(ing|ed|es|s)$/, '')) || []);
const supports = (rule, quote) => { const q = content(quote); return [...content(rule)].filter(w => q.has(w)).length >= 2; };

function haiku(prompt) {
  return new Promise((resolve, reject) => {
    const p = spawn('claude', ['-p', '--model', MODEL, '--tools', '', '--system-prompt', SYSTEM,
      '--strict-mcp-config', '--no-session-persistence', '--output-format', 'json'], { cwd: '/tmp' });
    let out = '', err = '';
    p.stdout.on('data', d => out += d); p.stderr.on('data', d => err += d);
    p.on('close', code => {
      try { const r = JSON.parse(out); resolve({ text: r.result || '', cost: r.total_cost_usd || 0 }); }
      catch { reject(new Error(`claude exit ${code}: ${(err || out).slice(0, 200)}`)); }
    });
    p.stdin.end(prompt);
  });
}

const tally = { batches: 0, sources: 0, fetched: 0, unfetched: 0, claims: 0, dupQuote: 0, badQuote: 0, unsupported: 0, malformed: 0, failed: 0, cost: 0 };
async function run(batch) {
  const texts = {};
  for (const s of batch) { const t = await fetchText(s); if (t) { texts[s.id] = t; tally.fetched++; } else tally.unfetched++; }
  const live = batch.filter(s => texts[s.id]);
  if (argv.includes('--fetch-only') || !live.length) { if (!argv.includes('--fetch-only')) appendFileSync(doneFile, batch.map(s => s.id).join('\n') + '\n'); return; }
  const prompt = `${ASK}\n\n` + live.map(s => `=== SOURCE ${s.id}\nALREADY:\n${(have[s.id] || []).map(c => `- ${c.rule}`).join('\n') || '- (none)'}\nTEXT:\n${texts[s.id]}`).join('\n\n');
  let res;
  try { res = await haiku(prompt); } catch (e) { tally.failed++; console.error(e.message); return; }
  tally.cost += res.cost;
  const byFamily = {};
  for (const line of res.text.split('\n').map(l => l.trim()).filter(l => l.startsWith('{'))) {
    let c; try { c = JSON.parse(line); } catch { tally.malformed++; continue; }
    const s = live.find(b => b.id === c.source);
    if (!s || !c.rule || !c.quote) { tally.malformed++; continue; }
    if (!squash(texts[s.id]).includes(squash(c.quote))) { tally.badQuote++; continue; }
    if (!supports(c.rule, c.quote)) { tally.unsupported++; continue; }
    if ((have[s.id] || []).some(h => squash(h.quote) === squash(c.quote))) { tally.dupQuote++; continue; }
    const n = (have[s.id] || []).filter(h => /#d\d+$/.test(h.id)).length + 1;
    const claim = { id: `${s.id}#d${n}`, source: s.id, rule: c.rule, quote: c.quote, finding: c.finding ?? null,
      topics: (c.topics || []).filter(t => TOPICS.has(t)), strength: c.strength, evidence: c.evidence };
    (have[s.id] ||= []).push(claim);
    (byFamily[s.family] ||= []).push(JSON.stringify(claim));
    tally.claims++;
  }
  for (const [f, rows] of Object.entries(byFamily)) appendFileSync(join(claimDir, `${f}.jsonl`), rows.join('\n') + '\n');
  appendFileSync(doneFile, batch.map(s => s.id).join('\n') + '\n');
  tally.batches++; tally.sources += live.length;
  if (tally.batches % 20 === 0) console.log(JSON.stringify({ ...tally, cost: tally.cost.toFixed(2) }));
}

console.log(`deepen: ${todo.length} sources to read`);
const batches = [];
for (let i = 0; i < todo.length; i += BATCH) batches.push(todo.slice(i, i + BATCH));
await Promise.all(Array.from({ length: JOBS }, async () => { while (batches.length) await run(batches.shift()); }));
tally.cost = Number(tally.cost.toFixed(2));
console.log('done', JSON.stringify(tally));
