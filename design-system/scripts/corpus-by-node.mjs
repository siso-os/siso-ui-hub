#!/usr/bin/env node
// Writes research/corpus-nodes.json: for each UI hub ontology node, what our own corpus
// (siso-ui-code types.jsonl, 102k typed parts rated 1–5 by a model classifier) says about looks and motion.
// Slots in the corpus map onto hub node ids by SLOT_NODE below; a node can draw on several slots.
// A look or motion style is reported only with 30+ parts behind it.
// Usage: node scripts/corpus-by-node.mjs [path/to/types.jsonl]
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const file = process.argv[2] || join(homedir(), 'SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-code/types.jsonl');
const MIN = 30;

const SLOT_NODE = {
  'landing:hero': 'section/hero', 'landing:features': 'section/features', 'landing:showcase': 'section/showcase',
  'landing:nav': 'section/nav', 'landing:cta': 'section/cta', 'landing:pricing': 'section/pricing',
  'landing:faq': 'section/faq', 'landing:testimonials': 'section/testimonials', 'landing:footer': 'section/footer',
  'landing:blog': 'section/blog', 'landing:stats': 'section/stats', 'landing:about': 'section/about',
  'landing:contact': 'section/contact', 'landing:logos': 'section/logos', 'landing:announcement': 'section/announcement',
  'landing:team': 'section/team', 'landing:comparison': 'section/comparison', 'landing:how-it-works': 'section/how',
  'landing:error-page': 'page/not-found',
  'dashboard:chart': 'component/chart', 'dashboard:table': 'component/table', 'dashboard:list': 'component/list',
  'dashboard:kpi': 'section/kpis', 'dashboard:shell': 'section/shell', 'dashboard:sidebar': 'section/sidebar',
  'dashboard:top-bar': 'section/top-bar', 'dashboard:page-header': 'section/page-header', 'dashboard:filters': 'section/filters',
  'dashboard:detail': 'section/detail', 'dashboard:settings': 'section/settings-panel', 'dashboard:auth': 'section/auth',
  'dashboard:onboarding': 'section/onboarding', 'dashboard:empty': 'component/empty', 'dashboard:loading': 'atom/loader',
  'dashboard:form': 'component/form', 'dashboard:calendar': 'component/calendar', 'dashboard:map': 'component/map',
  'dashboard:kanban': 'component/board', 'dashboard:command': 'component/command', 'dashboard:inbox': 'component/inbox',
  'dashboard:chat': 'section/chat', 'dashboard:notifications': 'component/toast',
  'ai:message': 'component/message', 'ai:thread': 'section/chat', 'ai:composer': 'component/composer',
  'ai:agent-status': 'component/agent-parts', 'ai:tool-call': 'component/agent-parts', 'ai:sources': 'component/agent-parts',
  'content:code': 'component/code', 'content:toc': 'component/toc', 'content:article': 'page/article',
  'any:field': 'component/field', 'any:action': 'atom/button', 'any:navigation': 'component/menu',
  'any:overlay': 'component/dialog', 'any:feedback': 'component/alert', 'any:layout': 'atom/layout', 'any:media': 'atom/image',
};

const acc = {};
for (const line of readFileSync(file, 'utf8').split('\n')) {
  if (!line) continue;
  const d = JSON.parse(line);
  if (typeof d.rating !== 'number') continue;
  for (const slot of d.slots || []) {
    const node = SLOT_NODE[slot];
    if (!node) continue;
    const a = acc[node] ||= { slots: new Set(), all: [], look: {}, motion: {} };
    a.slots.add(slot); a.all.push(d.rating);
    for (const l of d.look || []) (a.look[l] ||= []).push(d.rating);
    if (d.motion) (a.motion[d.motion] ||= []).push(d.rating);
  }
}

const mean = xs => Math.round(xs.reduce((s, x) => s + x, 0) / xs.length * 100) / 100;
const rank = m => Object.entries(m).filter(([, xs]) => xs.length >= MIN)
  .map(([k, xs]) => ({ style: k, mean: mean(xs), n: xs.length })).sort((a, b) => b.mean - a.mean);

const nodes = {};
for (const [node, a] of Object.entries(acc).sort()) {
  const looks = rank(a.look), motions = rank(a.motion), avg = mean(a.all);
  const best = looks[0], worst = looks.at(-1), bestM = motions[0], worstM = motions.at(-1);
  nodes[node] = {
    slots: [...a.slots], n: a.all.length, mean: avg, looks, motion: motions,
    finding: best && worst && best !== worst
      ? `${a.all.length.toLocaleString('en')} parts (mean ${avg}): ${best.style} rates ${best.mean} vs ${worst.style} ${worst.mean}` +
        (bestM && worstM && bestM !== worstM ? `; ${bestM.style} motion ${bestM.mean} vs ${worstM.style} ${worstM.mean}` : '')
      : null,
  };
}

writeFileSync(join(root, 'research/corpus-nodes.json'), JSON.stringify({
  version: 1, built: new Date().toISOString().slice(0, 10),
  source: 'siso-ui-code types.jsonl (ratings 1–5 by a model classifier, not people)', min_n: MIN, nodes,
}, null, 1) + '\n');
console.log(`research/corpus-nodes.json: ${Object.keys(nodes).length} nodes`);
