#!/usr/bin/env node
// Writes research/library.json: every source from research/sources/*.jsonl, deduped by URL,
// with its distilled claims from research/claims/*.jsonl attached, plus counts the hub shows.
// Fails on a malformed line or a missing field so a bad harvest never ships silently; a reused id gets a suffix.
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const NEED = ['id', 'title', 'org', 'family', 'kind', 'url'];
const KINDS = { theory: 'paper', research: 'paper', study: 'paper', tool: 'article', report: 'article', 'case-study': 'article' };

function lines(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter(f => f.endsWith('.jsonl')).sort().flatMap(f =>
    readFileSync(join(dir, f), 'utf8').split('\n').filter(l => l.trim()).map((l, i) => {
      try { return JSON.parse(l); } catch { throw new Error(`${f}:${i + 1}: not JSON`); }
    }));
}

const ALIASES = Object.entries(JSON.parse(readFileSync(join(root, 'research/orgs.json'), 'utf8')))
  .filter(([k]) => !k.startsWith('_')).flatMap(([name, keys]) => keys.map(k => [k, name]));
const orgName = o => ALIASES.find(([k]) => o.toLowerCase().startsWith(k))?.[1] || o;
const norm = u => u.replace(/^https?:\/\/(www\.)?/, '').replace(/[#?].*$/, '').replace(/\/$/, '').toLowerCase();
const byUrl = new Map(), ids = new Set();
let dupes = 0;
for (const s of lines(join(root, 'research/sources'))) {
  const miss = NEED.filter(k => !s[k]);
  if (miss.length) throw new Error(`${s.id || s.url}: missing ${miss.join(', ')}`);
  const key = norm(s.url);
  if (byUrl.has(key)) { dupes++; continue; }
  if (ids.has(s.id)) s.id = `${s.id}-${ids.size}`;
  ids.add(s.id);
  byUrl.set(key, { ...s, org: orgName(s.org), kind: KINDS[s.kind] || s.kind, tier: s.tier || (s.family === 'public-standards' ? 'floor' : 'core'),
    topics: s.topics || [], claims: [] });
}

const sources = [...byUrl.values()];
const byId = new Map(sources.map(s => [s.id, s]));
let claims = 0, orphan = 0;
for (const c of lines(join(root, 'research/claims'))) {
  const s = byId.get(c.source);
  if (!s) { orphan++; continue; }
  s.claims.push({ id: c.id, rule: c.rule, quote: c.quote, topics: c.topics || [] });
  claims++;
}

const count = k => Object.fromEntries(Object.entries(sources.reduce((m, s) => {
  for (const v of [].concat(s[k] ?? 'unknown')) m[v] = (m[v] || 0) + 1; return m;
}, {})).sort((a, b) => b[1] - a[1]));

writeFileSync(join(root, 'research/library.json'), JSON.stringify({
  version: 1, built: new Date().toISOString().slice(0, 10),
  totals: { sources: sources.length, claims, orgs: Object.keys(count('org')).length },
  by: { tier: count('tier'), family: count('family'), kind: count('kind'), org: count('org'), topic: count('topics'), access: count('access') },
  sources,
}, null, 1) + '\n');
console.log(`research/library.json: ${sources.length} sources (${dupes} duplicate URLs dropped), ${claims} claims` +
  (orphan ? `, ${orphan} claims with no matching source` : ''));
