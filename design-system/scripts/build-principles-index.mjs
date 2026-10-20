#!/usr/bin/env node
// Writes principles/index.json: every SISO UI rule as one flat list.
// Two sets: this repo's evidence rules (principles/P*.md, front matter) and the
// UI hub's house rules (banks/siso-ui-hub/principles/NNNN-*.md), referenced, not copied.
// Hub location: $SISO_UI_HUB, else ~/SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-hub.
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const hub = process.env.SISO_UI_HUB || join(homedir(), 'SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-hub');
const LIST_FIELDS = new Set(['applies_to', 'nodes', 'shaan', 'papers', 'sources', 'corpus']);

// Parses the front matter subset described in principles/README.md.
function frontMatter(text, file) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) throw new Error(`${file}: no front matter`);
  const out = {};
  let key = null;
  for (const raw of m[1].split('\n')) {
    const line = raw.replace(/\s+#.*$/, '');
    if (!line.trim()) continue;
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && key) { out[key].push(item[1].trim()); continue; }
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) throw new Error(`${file}: cannot read "${raw}"`);
    key = kv[1];
    const v = kv[2].trim();
    if (v.startsWith('[')) out[key] = v.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
    else if (v === '') out[key] = [];
    else out[key] = v;
  }
  for (const f of LIST_FIELDS) out[f] ??= [];
  for (const f of ['sources', 'corpus']) {
    out[f] = out[f].map(s => {
      const [a, b, c] = s.split('|').map(x => x.trim());
      return f === 'sources' ? { source: a, says: b, url: c } : { file: a, finding: b, measured: c };
    });
  }
  return out;
}

const rules = [];
const dir = join(root, 'principles');
for (const f of readdirSync(dir).filter(f => /^P\d{4}-.*\.md$/.test(f)).sort()) {
  const fm = frontMatter(readFileSync(join(dir, f), 'utf8'), f);
  for (const need of ['id', 'title', 'rule', 'layer', 'strength', 'status', 'check']) {
    if (!fm[need] || !fm[need].length) throw new Error(`${f}: missing ${need}`);
  }
  rules.push({ set: 'evidence', ...fm, repo: 'siso-design-system', path: `principles/${f}` });
}

let hubCount = 0;
const hubDir = join(hub, 'principles');
if (existsSync(hubDir)) {
  for (const f of readdirSync(hubDir).filter(f => /^\d{4}-.*\.md$/.test(f)).sort()) {
    const text = readFileSync(join(hubDir, f), 'utf8');
    const title = (text.match(/^# ADR \d+:\s*(.+)$/m) || [])[1] || f;
    const status = /Status:\s*accepted/i.test(text) ? 'accepted' : 'draft';
    rules.push({ set: 'house', id: `hub-${f.slice(0, 4)}`, title, status, repo: 'siso-ui-hub', path: `principles/${f}` });
    hubCount++;
  }
} else {
  console.warn(`hub not found at ${hubDir}; index has evidence rules only`);
}

writeFileSync(join(dir, 'index.json'), JSON.stringify({ version: 1, rules }, null, 2) + '\n');
console.log(`principles/index.json: ${rules.length - hubCount} evidence + ${hubCount} house rules`);
