#!/usr/bin/env node
// Groups claims that say the same thing into consensus rules: research/clusters.json.
// Per topic (a claim's first topic), Haiku sorts the claims' rules into groups, 300 at a time, then a merge pass
// joins groups from different chunks that state the same rule. The model only groups and words the rule;
// the counts that decide strength (distinct orgs, families, evidence kinds) are computed here from the members.
//   strong:   4+ orgs, at least one experiment or study
//   moderate: 2+ orgs
//   single:   one org
// --recount re-reads research/clusters.json and recomputes the counts from the current library (no model calls).
// Usage: node scripts/research-cluster.mjs [--jobs 4] [--topic T] [--recount]
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const JOBS = Number(arg('--jobs', 4)), ONLY = arg('--topic', null), CHUNK = 300;
const MODEL = 'claude-haiku-4-5-20251001';

const lib = JSON.parse(readFileSync(join(root, 'research/library.json'), 'utf8'));
const src = new Map(lib.sources.map(s => [s.id, s]));
const claimDir = join(root, 'research/claims');
const claims = readdirSync(claimDir).filter(f => f.endsWith('.jsonl')).flatMap(f =>
  readFileSync(join(claimDir, f), 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l)))
  .filter(c => src.has(c.source));

function haiku(system, prompt) {
  return new Promise((resolve, reject) => {
    const p = spawn('claude', ['-p', '--model', MODEL, '--tools', '', '--system-prompt', system,
      '--strict-mcp-config', '--no-session-persistence', '--output-format', 'json'], { cwd: '/tmp' });
    let out = '';
    p.stdout.on('data', d => out += d);
    p.on('close', code => { try { resolve(JSON.parse(out).result || ''); } catch { reject(new Error(`claude exit ${code}`)); } });
    p.stdin.end(prompt);
  });
}
const jsonLines = t => t.split('\n').map(l => l.trim()).filter(l => l.startsWith('{'))
  .map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);

const SYSTEM = 'You group design rules that say the same thing. Output only JSON lines: no prose, no code fences.';
const GROUP = `Below are numbered design rules from many sources, all on the topic "{topic}". Group the rules that state the same thing (same advice, possibly worded differently). Every number goes in exactly one group; a rule unlike any other is a group of one.

One JSON line per group:
{"title": "<the rule's name, 3 to 8 words>", "rule": "<the shared rule, one imperative sentence of at most 30 words, faithful to the members>", "members": [<numbers>]}`;
const MERGE = `Below are groups of design rules on the topic "{topic}", each with a number. Some groups state the same rule as another. Output one JSON line per merged group, covering every number exactly once:
{"title": "<3 to 8 words>", "rule": "<one imperative sentence, at most 30 words>", "groups": [<numbers>]}`;

async function topicClusters(topic, list) {
  let groups = [];
  for (let i = 0; i < list.length; i += CHUNK) {
    const part = list.slice(i, i + CHUNK);
    const out = jsonLines(await haiku(SYSTEM, GROUP.replace('{topic}', topic) + '\n\n' +
      part.map((c, k) => `${k + 1}. ${c.rule}`).join('\n')));
    const seen = new Set();
    for (const g of out) {
      const members = (g.members || []).map(n => part[n - 1]).filter(c => c && !seen.has(c.id));
      members.forEach(c => seen.add(c.id));
      if (members.length) groups.push({ title: g.title, rule: g.rule, members });
    }
    for (const c of part) if (!seen.has(c.id)) groups.push({ title: c.rule.slice(0, 60), rule: c.rule, members: [c] });
  }
  const multi = groups.filter(g => g.members.length > 1);
  if (list.length > CHUNK && multi.length > 1) {
    const out = jsonLines(await haiku(SYSTEM, MERGE.replace('{topic}', topic) + '\n\n' +
      multi.map((g, k) => `${k + 1}. ${g.title}: ${g.rule}`).join('\n')));
    const used = new Set(), merged = [];
    for (const m of out) {
      const parts = (m.groups || []).map(n => multi[n - 1]).filter(g => g && !used.has(g));
      parts.forEach(g => used.add(g));
      if (parts.length) merged.push({ title: m.title, rule: m.rule, members: parts.flatMap(g => g.members) });
    }
    groups = [...merged, ...multi.filter(g => !used.has(g)), ...groups.filter(g => g.members.length === 1)];
  }
  return groups;
}

const RECOUNT = process.argv.includes('--recount');
const byId = new Map(claims.map(c => [c.id, c]));
const byTopic = {};
for (const c of claims) { const t = c.topics?.[0] || 'heuristics'; (byTopic[t] ||= []).push(c); }
const topics = RECOUNT ? [] : Object.keys(byTopic).filter(t => !ONLY || t === ONLY).sort((a, b) => byTopic[b].length - byTopic[a].length);

const clusters = RECOUNT
  ? JSON.parse(readFileSync(join(root, 'research/clusters.json'), 'utf8')).clusters
    .map(g => ({ ...g, members: g.members.map(id => byId.get(id)).filter(Boolean) }))
  : [];
const queue = [...topics];
await Promise.all(Array.from({ length: JOBS }, async () => {
  while (queue.length) {
    const t = queue.shift();
    try {
      const gs = await topicClusters(t, byTopic[t]);
      gs.forEach((g, i) => clusters.push({ topic: t, n: i, ...g }));
      console.log(`${t}: ${byTopic[t].length} claims -> ${gs.length} groups`);
    } catch (e) { console.error(`${t}: ${e.message}`); }
  }
}));

const tally = (ms, f) => ms.reduce((m, c) => { const v = f(c); if (v) m[v] = (m[v] || 0) + 1; return m; }, {});
const out = clusters.map(g => {
  const orgs = [...new Set(g.members.map(c => src.get(c.source).org))];
  const evidence = tally(g.members, c => c.evidence);
  const consensus = orgs.length >= 4 && (evidence.experiment || evidence.study) ? 'strong' : orgs.length >= 2 ? 'moderate' : 'single';
  return {
    topic: g.topic, title: g.title, rule: g.rule, consensus, org_count: orgs.length, orgs,
    families: tally(g.members, c => src.get(c.source).family), evidence,
    tiers: tally(g.members, c => src.get(c.source).tier),
    findings: g.members.filter(c => c.finding).slice(0, 5).map(c => ({ claim: c.id, finding: c.finding })),
    members: g.members.map(c => c.id),
  };
}).sort((a, b) => b.org_count - a.org_count || b.members.length - a.members.length)
  .map((g, i) => ({ id: `C${String(i + 1).padStart(4, '0')}`, ...g }));

writeFileSync(join(root, 'research/clusters.json'), JSON.stringify({
  version: 1, built: new Date().toISOString().slice(0, 10), claims: claims.length,
  totals: tally(out, g => g.consensus), clusters: out,
}, null, 1) + '\n');
console.log(`research/clusters.json: ${out.length} groups from ${claims.length} claims`, JSON.stringify(tally(out, g => g.consensus)));

// research/CONSENSUS.md: the rules most organisations agree on, readable on GitHub.
const top = out.filter(g => g.consensus !== 'single').slice(0, 80);
const md = [`# What the research agrees on`, ``,
  `${out.length} rules distilled from ${claims.length} quoted claims across ${lib.totals.sources} sources (${new Date().toISOString().slice(0, 10)}). ` +
  `**Strong** = 4+ independent organisations and at least one experiment or study; **moderate** = 2+ organisations. ` +
  `Full data: \`clusters.json\` (members, quotes via \`claims/\`, findings).`, ``,
  `| # | Rule | Backing | Orgs | Measured |`, `|---|---|---|---|---|`,
  ...top.map(g => `| ${g.id} | **${g.title}.** ${g.rule.replace(/\|/g, '/')} | ${g.consensus}, ${g.org_count} orgs, ${g.members.length} claims | ${g.orgs.slice(0, 5).join(', ')}${g.orgs.length > 5 ? ' …' : ''} | ${(g.findings[0]?.finding || '').replace(/\|/g, '/').slice(0, 140)} |`)];
writeFileSync(join(root, 'research/CONSENSUS.md'), md.join('\n') + '\n');
