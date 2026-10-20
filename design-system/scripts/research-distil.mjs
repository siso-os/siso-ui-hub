#!/usr/bin/env node
// Distils each fetched source (research/_text/<id>.txt) into claims: one rule an interface builder can obey,
// an exact supporting quote, and the measured finding if the source reports one.
// One headless Haiku call per batch of sources (claude -p, no tools, no MCP). A claim whose quote is not
// found word for word in its source text is dropped, so every quote in the library can be checked; so is one
// whose quote shares fewer than two content words with its rule (a real quote that doesn't support it).
// Appends to research/claims/<family>.jsonl; research/claims/_done.txt records sources already distilled
// (including those that held no UI rule), so a re-run picks up where the last stopped.
// Usage: node scripts/research-distil.mjs [--batch 6] [--jobs 6] [--limit N] [--family F]
import { readFileSync, writeFileSync, existsSync, mkdirSync, appendFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv;
const arg = (k, d) => { const i = argv.indexOf(k); return i > 0 ? argv[i + 1] : d; };
const BATCH = Number(arg('--batch', 6)), JOBS = Number(arg('--jobs', 6)), LIMIT = Number(arg('--limit', Infinity));
const FAMILY = arg('--family', null), MODEL = 'claude-haiku-4-5-20251001';
const textDir = join(root, 'research/_text'), claimDir = join(root, 'research/claims');
const doneFile = join(claimDir, '_done.txt');
mkdirSync(claimDir, { recursive: true });

const TOPICS = new Set(JSON.parse(readFileSync(join(root, 'research/topics.json'), 'utf8')));
const done = new Set(existsSync(doneFile) ? readFileSync(doneFile, 'utf8').split('\n').filter(Boolean) : []);
const lib = JSON.parse(readFileSync(join(root, 'research/library.json'), 'utf8'));
const todo = lib.sources
  .filter(s => !done.has(s.id) && existsSync(join(textDir, `${s.id}.txt`)) && (!FAMILY || s.family === FAMILY))
  .slice(0, LIMIT);

const SYSTEM = `You distil published UI research into rules for people who build interfaces. Output only JSON lines: no prose, no code fences.`;
const ASK = `For each SOURCE below, output 0 to 8 JSON lines, one per distinct rule or measured finding about designing user interfaces (screens, flows, components, motion, copy, or the psychology of the people using them). Ignore site navigation, cookie banners, marketing, author bios and course ads. If a source holds no such rule, output nothing for it.

Each line:
{"source": "<the SOURCE id>", "rule": "<one imperative sentence a builder can obey, at most 30 words, plain English>", "quote": "<6 to 30 words copied exactly, character for character, from that source's text, that themselves state the rule or the finding>", "finding": "<the measured result with its numbers if the source reports one, else null>", "topics": [<1 to 3 of: ${[...TOPICS].join(', ')}>], "strength": "must" | "should" | "may", "evidence": "experiment" | "study" | "guideline" | "expert"}

Only output a rule the source itself states: if you cannot find words in the text that say it, leave it out. Never write a rule from general knowledge.

evidence: experiment = a controlled test with users or traffic; study = observational or lab research; guideline = a published design-system or standards rule; expert = a practitioner's argued opinion.`;

const STOP = new Set('the and for with that this from your you are can its into more than when what which their them they will have has not but all any use used using make sure should must may each how why'.split(' '));
const content = t => new Set(squash(t).match(/[a-z0-9]{3,}/g)?.filter(w => !STOP.has(w)).map(w => w.replace(/(ing|ed|es|s)$/, '')) || []);
const supports = (rule, quote) => { const q = content(quote); return [...content(rule)].filter(w => q.has(w)).length >= 2; };
const decode = t => t.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));
const squash = t => decode(t).toLowerCase().replace(/[‘’“”"'`]/g, '').replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim();

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

const tally = { batches: 0, sources: 0, claims: 0, badQuote: 0, unsupported: 0, malformed: 0, failed: 0, cost: 0 };
async function run(batch) {
  const texts = Object.fromEntries(batch.map(s => [s.id, decode(readFileSync(join(textDir, `${s.id}.txt`), 'utf8'))]));
  const prompt = `${ASK}\n\n` + batch.map(s => `=== SOURCE ${s.id}\n${texts[s.id]}`).join('\n\n');
  let res;
  try { res = await haiku(prompt); } catch (e) { tally.failed++; console.error(e.message); return; }
  tally.cost += res.cost;
  const n = {}, byFamily = {};
  for (const line of res.text.split('\n').map(l => l.trim()).filter(l => l.startsWith('{'))) {
    let c; try { c = JSON.parse(line); } catch { tally.malformed++; continue; }
    const s = batch.find(b => b.id === c.source);
    if (!s || !c.rule || !c.quote) { tally.malformed++; continue; }
    if (!squash(texts[s.id]).includes(squash(c.quote))) { tally.badQuote++; continue; }
    if (!supports(c.rule, c.quote)) { tally.unsupported++; continue; }
    n[s.id] = (n[s.id] || 0) + 1;
    const claim = { id: `${s.id}#${n[s.id]}`, source: s.id, rule: c.rule, quote: c.quote, finding: c.finding ?? null,
      topics: (c.topics || []).filter(t => TOPICS.has(t)), strength: c.strength, evidence: c.evidence };
    (byFamily[s.family] ||= []).push(JSON.stringify(claim));
    tally.claims++;
  }
  for (const [f, rows] of Object.entries(byFamily)) appendFileSync(join(claimDir, `${f}.jsonl`), rows.join('\n') + '\n');
  appendFileSync(doneFile, batch.map(s => s.id).join('\n') + '\n');
  tally.batches++; tally.sources += batch.length;
  if (tally.batches % 10 === 0) console.log(JSON.stringify(tally));
}

const batches = [];
for (let i = 0; i < todo.length; i += BATCH) batches.push(todo.slice(i, i + BATCH));
await Promise.all(Array.from({ length: JOBS }, async () => { while (batches.length) await run(batches.shift()); }));
tally.cost = Number(tally.cost.toFixed(2));
console.log('done', JSON.stringify(tally));
