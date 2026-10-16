// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/home-products/library/LibraryDemo.tsx)
'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import STATS from '../../../../data/siso-stats.json';
import { ProductGlyph } from '../../ProductGlyph';
import { GitHubMark, SISO_GITHUB } from '../../ui/GitHubButton';
import { AgentFace, LivingIcon } from '../../living/living-assets';
import type { FaceFamily } from '../../living/identity';
import { CATEGORIES, CITE, GQ, ORGS, PEOPLE, RATED, RECORD_URL, SEARCHES, TAG_COUNT, TOPIC_LINKS, WORKS, type Repo } from './libraryData';

// A working miniature of the Great Library, one console that follows the card's open clickable. Shaan, 9 Oct: the library and
// research merged; research "links to our god questions ... token spend, things done ... what this is powered by".
// Four views, every part clickable, every value from libraryData.ts (generated from the rated bank, the People Graph build and
// the public Frontier Question records) or siso-stats.json:
//  1. repos: a search types a query and the bank's top rated repos for it stream in with their reuse scores;
//  2. people: the People Graph as organisations and their repos, sized by how many repos the graph holds for each (no people);
//  3. questions: the ranked god questions; one opens and four agents (Claude and Codex faces) each take a thread while the rated
//     repos they read stream in as sources;
//  4. answers: the evidence brief for that question builds up with citation chips; point at a chip to see its source. Under it,
//     what powers it: tokens spent (live, as in the footer), repos indexed, and the two model families.
// The stage is drawn at 752x640 and scaled to fit, so every position below is in stage pixels.

export const LIB_TABS = [
  { key: 'repos', label: 'Every repo worth using, rated', desc: `${RATED.toLocaleString('en-US')} repos scored for reuse. Type what you need.` },
  { key: 'people', label: 'The People Graph', desc: 'Who built what: the organisations and the work behind modern software.' },
  { key: 'questions', label: 'The god questions', desc: 'What our agents find out next. Open one and watch them split it up.' },
  { key: 'answers', label: 'Every answer cited', desc: 'Findings come back with their sources. Point at one to read it.' },
] as const;
export const LIB_DUR = 9000;

const VIEW = ['Repos', 'People Graph', 'God questions', 'Answers'];
const REPO_URL = (n: string) => `https://github.com/${n}`;
const LIB_HREF = `${SISO_GITHUB}/${STATS.repos.greatLibrary.repo}`;
const LIVE = STATS.tokensLive;
const INDEXED = STATS.stats.find(s => s.key === 'repos')!;
const liveTokens = (now: number) => Math.floor(LIVE.base + ((now - Date.parse(LIVE.from)) * LIVE.perDay) / 86_400_000);
const fmt = (n: number) => n.toLocaleString('en-US');
const kStars = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 100000 ? 0 : 1)}k` : String(n));

// The four agents that split a question. Names are SISO's own lanes; faces are Agent Base's.
const AGENTS: { name: string; family: FaceFamily }[] = [
  { name: 'RESEARCH', family: 'codex' }, { name: 'FOUNDRY', family: 'claude' }, { name: 'EVIDENCE', family: 'codex' }, { name: 'READER', family: 'claude' },
];
const OPEN_GQ = GQ.findIndex(q => q.id === 'GQ-012');

// The People Graph: the hub, then organisations round it, sized by repos held; each org's top three repos fan outwards.
const HUB = { x: 358, y: 224 };
const NODES = ORGS.map((o, i) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / ORGS.length;
  const x = HUB.x + Math.cos(a) * 204, y = HUB.y + Math.sin(a) * 143;
  const size = Math.round(30 + 20 * Math.sqrt(o.n / ORGS[0].n));
  const repos = o.top.map((n, k) => {
    const b = a + (k - 1) * 0.42;
    return { n, x: x + Math.cos(b) * (size / 2 + 34), y: y + Math.sin(b) * (size / 2 + 26) };
  });
  return { ...o, x, y, size, a, repos };
});
const LOGO: Record<string, string> = {
  microsoft: '/logos/home-hero/microsoft.png', google: '/logos/library/google.png', facebookresearch: '/logos/library/facebookresearch.png',
  apache: '/logos/library/apache.png', cloudflare: '/logos/home-hero/cloudflare.png', github: '/logos/home-weapon/github.png',
  openai: '/logos/home-hero/openai.png', huggingface: '/logos/library/huggingface.png', vercel: '/logos/home-hero/vercel.png', anthropics: '/logos/home-hero/anthropics.png',
};
const AUTO_ORGS = ['microsoft', 'openai', 'anthropics', 'huggingface'].map(o => ORGS.findIndex(x => x.o === o));
// Anonymous dust: the people are in the graph but never named here.
const DUST = Array.from({ length: 84 }, (_, i) => {
  const h = Math.imul(i + 7, 2654435761) >>> 0, g = Math.imul(i + 13, 1597334677) >>> 0;
  return { x: 18 + (h % 618), y: 14 + (g % 400), r: 0.8 + ((h >>> 8) % 10) / 9, d: (g >>> 6) % 4000 };
});

// The evidence brief for GQ-012. Every sentence is read from a source in the list; [n] is that source.
type Src = { kind: 'record'; title: string; sub: string; href: string } | { kind: 'repo'; repo: Repo };
const Q12 = GQ[OPEN_GQ];
const SOURCES: Src[] = [
  { kind: 'record', title: 'frontier-question-gq-012.json', sub: 'Great Library registry · public', href: RECORD_URL + Q12.f },
  ...['oraios/serena', 'mem0ai/mem0', 'getzep/graphiti', 'HKUDS/RAG-Anything', 'HKUDS/LightRAG'].map(n => ({ kind: 'repo' as const, repo: CITE[n] })),
];
const LINES: { text: string; cite: number[] }[] = [
  { text: `The question: ${Q12.q}`, cite: [1] },
  { text: 'Success: a cold read recovers the correct source, current constraint, owner and next action.', cite: [1] },
  { text: `Stop if: ${Q12.stop.replace(/^./, c => c.toLowerCase())}`, cite: [1] },
  { text: `For code, Serena gives agents semantic retrieval and editing over MCP, rated ${CITE['oraios/serena'].r} of 100 for reuse.`, cite: [2] },
  { text: `For memory, mem0 and Graphiti lead the ${TAG_COUNT['agent-memory']} agent-memory repos we rate, both ${CITE['mem0ai/mem0'].r} and ${CITE['mem0ai/mem0'].l}.`, cite: [3, 4] },
  { text: `Retrieval comes last: RAG-Anything rates ${CITE['HKUDS/RAG-Anything'].r} and LightRAG ${CITE['HKUDS/LightRAG'].r} of the ${TAG_COUNT.rag} RAG repos we rate.`, cite: [5, 6] },
];

export const LIB_TAB_ICONS = [
  <><circle cx="8.5" cy="8.5" r="5" /><path d="m12.5 12.5 4.5 4.5" /><path d="M6.5 8.5h4" /></>,
  <><circle cx="10" cy="10" r="2.2" /><circle cx="4" cy="5" r="1.6" /><circle cx="16" cy="5" r="1.6" /><circle cx="4.5" cy="15.5" r="1.6" /><circle cx="15.5" cy="15.5" r="1.6" /><path d="m5.3 6 3 2.6M14.7 6l-3 2.6M5.8 14.4l2.6-2.6M14.2 14.4l-2.6-2.6" /></>,
  <><path d="M10 2.5 12 7l4.8.5-3.6 3.2 1 4.8L10 13l-4.2 2.5 1-4.8L3.2 7.5 8 7z" /></>,
  <><path d="M5 2.5h7l3 3v12H5z" /><path d="M12 2.5v3h3M7.5 9.5h5M7.5 12.5h3" /></>,
];

const CSS = `
.lbd{position:relative;width:100%;height:100%;overflow:hidden;isolation:isolate;color:#eeebe4;font-family:Inter,sans-serif;
  background:radial-gradient(55% 40% at 50% -4%,#d2b6ff80,transparent 70%),radial-gradient(60% 50% at 80% 110%,#b98cff66,transparent 70%),
    linear-gradient(160deg,#21093f 0%,#5a2a9e 30%,#8a52d8 58%,#9a63ea 72%,#6b36b4 88%,#1a0833 100%)}
.lbd-stage{position:absolute;left:50%;top:50%;width:752px;height:640px;transform-origin:50% 50%}
.lbd-stage *{box-sizing:border-box}
:where(.lbd) button{font:inherit;color:inherit;border:0;background:none;padding:0;cursor:pointer;text-align:inherit}
:where(.lbd) a{color:inherit;text-decoration:none}
.lbd a:focus-visible,.lbd button:focus-visible{outline:2px solid #d2b6ff;outline-offset:2px}
.lbd-crumb{position:absolute;top:18px;left:26px;display:flex;align-items:center;gap:9px;font-size:13px;font-weight:600;color:#fff;text-shadow:0 1px 12px #0006}
.lbd-crumb span{font-weight:400;color:#ffffffa6}
.lbd-win{position:absolute;left:24px;top:54px;width:704px;height:566px;border-radius:16px;background:#121117;overflow:hidden;
  box-shadow:0 0 0 1px #ffffff1f,0 40px 90px -20px #0d0420,0 10px 30px -10px #0009}
.lbd-bar{position:absolute;inset:0 0 auto 0;height:36px;display:flex;align-items:center;gap:4px;padding:0 12px;border-bottom:1px solid #ffffff0f;background:#16151b}
.lbd-lights{display:flex;gap:6px;margin-right:14px}.lbd-lights i{width:9px;height:9px;border-radius:50%;background:#ffffff24}
.lbd-tab{display:flex;align-items:center;gap:6px;height:24px;padding:0 10px;border-radius:7px;font-size:11px;color:#eeebe4;background:#ffffff10;box-shadow:inset 0 0 0 1px #ffffff17;white-space:nowrap}
.lbd-tab svg{color:#d2b6ff}
.lbd-k{margin-left:auto;display:flex;align-items:center;gap:8px;height:24px;padding:0 6px 0 10px;border-radius:7px;font-size:11px;color:#eeebe480;box-shadow:inset 0 0 0 1px #ffffff12;transition:color .3s,box-shadow .3s}
.lbd-k:hover{color:#fff;box-shadow:inset 0 0 0 1px #a46bff80}
.lbd-k kbd{font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;padding:3px 5px;border-radius:5px;background:#ffffff0d}
.lbd-body{position:absolute;inset:36px 0 0 0;display:flex}
.lbd-rail{width:50px;flex:none;border-right:1px solid #ffffff0d;display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 0;background:#0f0e13}
.lbd-ri{position:relative;width:36px;height:36px;border-radius:11px;display:grid;place-items:center;color:#eeebe48c;transition:background .35s,box-shadow .35s,transform .35s cubic-bezier(.19,1,.22,1),color .35s}
.lbd-ri:hover{background:#ffffff0d;color:#fff;transform:translateY(-1px)}
.lbd-ri[aria-pressed=true]{background:#7540b733;color:#d2b6ff;box-shadow:inset 0 0 0 1px #a46bff80,0 0 18px -6px #a46bff}
.lbd-ri[data-name]:hover::after{content:attr(data-name);position:absolute;left:44px;top:50%;transform:translateY(-50%);z-index:9;white-space:nowrap;padding:5px 8px;border-radius:7px;
  background:#1c1b22;box-shadow:0 0 0 1px #ffffff1f;font-size:10px;color:#fff}
.lbd-rail hr{width:22px;border:0;border-top:1px solid #ffffff14;margin:4px 0}
.lbd-rail .gh{margin-top:auto}
.lbd-main{flex:1;min-width:0;position:relative;background:#111016;animation:lbd-in .5s cubic-bezier(.19,1,.22,1)}
.lbd-mono{font-family:'Geist Mono',ui-monospace,monospace}
/* 1. repos */
.lbd-search{position:relative;margin:14px 16px 0;height:48px;border-radius:14px;border:1px solid transparent;display:flex;align-items:center;gap:10px;padding:0 10px 0 14px;font-size:15px;
  background:linear-gradient(#18171d,#18171d) padding-box,linear-gradient(120deg,#a46bff,#d2b6ff 30%,#7540b766 60%,#a46bff) border-box;box-shadow:0 0 26px -10px #a46bff}
.lbd-search svg{color:#d2b6ff;flex:none}
.lbd-search .q{flex:1;white-space:nowrap;overflow:hidden}
.lbd-search .ph{color:#eeebe452}
.lbd-search kbd{font:500 10px/1 'Geist Mono',ui-monospace,monospace;color:#eeebe480;padding:5px 7px;border-radius:7px;box-shadow:inset 0 0 0 1px #ffffff1a}
.lbd-caret{display:inline-block;width:1.5px;height:16px;margin-left:1px;vertical-align:-3px;background:#d2b6ff;animation:lbd-blink 1s steps(1) infinite}
.lbd-chips{display:flex;align-items:center;gap:6px;margin:10px 16px 0}
.lbd-chip{height:28px;padding:0 11px;white-space:nowrap;border-radius:9px;font-size:11px;color:#eeebe4a6;background:#ffffff08;box-shadow:inset 0 0 0 1px #ffffff14;transition:all .35s cubic-bezier(.19,1,.22,1)}
.lbd-chip:hover{color:#fff;transform:translateY(-1px);box-shadow:inset 0 0 0 1px #a46bff80}
.lbd-chip[aria-pressed=true]{color:#fff;background:#7540b72e;box-shadow:inset 0 0 0 1px #a46bff,0 0 18px -6px #a46bff}
.lbd-foot b{color:#d2b6ff;font-weight:500}
.lbd-rhead{display:flex;align-items:center;gap:12px;margin:16px 24px 6px;font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#eeebe466}
.lbd-rhead span:first-child{flex:1}.lbd-rhead span:first-child b{color:#eeebe4cc;font-weight:500}
.lbd-rhead .c1{width:80px;text-align:center}.lbd-rhead .c2{width:64px;text-align:right}.lbd-rhead .c3{width:58px;text-align:right}
.lbd-rows{margin:0 12px;display:flex;flex-direction:column;gap:4px}
.lbd-row{display:flex;align-items:center;gap:12px;height:64px;padding:0 12px 0 10px;border-radius:12px;background:#ffffff05;box-shadow:inset 0 0 0 1px #ffffff0d;
  animation:lbd-up .45s cubic-bezier(.19,1,.22,1) both;transition:background .3s,box-shadow .3s,transform .3s cubic-bezier(.19,1,.22,1)}
.lbd-row:hover{background:#7540b71a;box-shadow:inset 0 0 0 1px #a46bff66;transform:translateX(2px)}
.lbd-mono-tile{flex:none;width:36px;height:36px;border-radius:10px;display:grid;place-items:center;font:600 14px/1 Inter,sans-serif;color:#d2b6ff;background:#7540b726;box-shadow:inset 0 0 0 1px #a46bff40}
.lbd-rt{flex:1;min-width:0}
.lbd-rt b{display:block;font-size:13px;font-weight:600;letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lbd-rt small{display:block;margin-top:4px;font-size:11px;color:#eeebe480;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lbd-lic{width:80px;text-align:center;font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;color:#eeebe4a6}
.lbd-lic span{display:inline-block;padding:4px 6px;border-radius:6px;box-shadow:inset 0 0 0 1px #ffffff1a}
.lbd-stars{width:64px;text-align:right;font:500 11px/1 'Geist Mono',ui-monospace,monospace;color:#eeebe4b3;font-variant-numeric:tabular-nums}
.lbd-score{position:relative;width:58px;display:flex;justify-content:flex-end}
.lbd-ring{position:relative;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font:600 12.5px/1 Inter,sans-serif;color:#fff;font-variant-numeric:tabular-nums}
.lbd-ring::before{content:'';position:absolute;inset:0;border-radius:50%;background:conic-gradient(#d2b6ff calc(var(--p)*1%),#ffffff14 0);
  -webkit-mask:radial-gradient(circle,transparent 15.5px,#000 16px);mask:radial-gradient(circle,transparent 15.5px,#000 16px);filter:drop-shadow(0 0 5px #a46bff99)}
.lbd-foot{position:absolute;left:16px;right:16px;bottom:12px;display:flex;justify-content:space-between;font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;color:#eeebe459}
/* 2. people */
.lbd-graph{position:absolute;inset:0 0 78px 0}
.lbd-graph svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.lbd-dust{animation:lbd-tw 4s ease-in-out infinite}
.lbd-edge{stroke:#a46bff;stroke-opacity:.28;stroke-width:1.2;transition:stroke-opacity .5s,stroke-width .5s}
.lbd-edge.on{stroke:#d2b6ff;stroke-opacity:.85;stroke-width:1.8}
.lbd-pulse{stroke:#fff3d6;stroke-width:2;stroke-linecap:round;stroke-dasharray:3 140;animation:lbd-flow 3.2s linear infinite;opacity:.8}
.lbd-sub{stroke:#d2b6ff;stroke-opacity:.18;stroke-width:1;transition:stroke-opacity .5s}
.lbd-sub.on{stroke-opacity:.7}
.lbd-dot{fill:#d2b6ff;fill-opacity:.45;transition:fill-opacity .5s}
.lbd-dot.on{fill:#fff3d6;fill-opacity:1;filter:drop-shadow(0 0 4px #d2b6ff)}
.lbd-hub{position:absolute;width:72px;height:72px;margin:-36px 0 0 -36px;border-radius:16px;display:grid;place-items:center;
  box-shadow:0 0 0 1px #d2b6ff66,0 0 40px -6px #a46bff;animation:lbd-breath 4s ease-in-out infinite}
.lbd-hub-l{position:absolute;transform:translate(-50%,46px);white-space:nowrap;font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#d2b6ff}
.lbd-org{position:absolute;border-radius:50%;padding:0;transform:translate(-50%,-50%);background:#0c0b10;box-shadow:0 0 0 1.5px #a46bff66,0 0 18px -6px #a46bff;
  transition:box-shadow .5s,transform .5s cubic-bezier(.19,1,.22,1)}
.lbd-org img{display:block;width:100%;height:100%;border-radius:50%;object-fit:cover}
.lbd-org:hover,.lbd-org[aria-pressed=true]{transform:translate(-50%,-50%) scale(1.12);box-shadow:0 0 0 2px #fff3d6,0 0 30px -2px #a46bff}
.lbd-info{position:absolute;left:14px;top:12px;width:164px;padding:9px 9px 6px;border-radius:12px;background:#17161cf2;box-shadow:0 0 0 1px #a46bff59,0 14px 30px -14px #000;
  animation:lbd-in .45s cubic-bezier(.19,1,.22,1)}
.lbd-info-h{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.lbd-info-h img{width:26px;height:26px;border-radius:50%}
.lbd-info-h b{display:block;font-size:12.5px;font-weight:600;color:#fff}
.lbd-info-h small{display:block;margin-top:3px;font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;color:#d2b6ff}
.lbd-info a{display:flex;align-items:center;justify-content:flex-start;gap:7px;height:23px;padding:0 6px;border-radius:7px;font:500 10px/1 'Geist Mono',ui-monospace,monospace;color:#eeebe4cc;
  white-space:nowrap;animation:lbd-up .4s cubic-bezier(.19,1,.22,1) both;transition:background .3s,color .3s}
.lbd-info a:hover{background:#7540b72e;color:#fff}
.lbd-info a i{flex:none;width:6px;height:6px;border-radius:50%;background:#fff3d6;box-shadow:0 0 6px #d2b6ff}
.lbd-info a em{margin-left:auto;font-style:normal;color:#eeebe466}
.lbd-stats{position:absolute;left:16px;right:16px;bottom:14px;height:62px;display:flex;border-radius:14px;background:#ffffff06;box-shadow:inset 0 0 0 1px #ffffff12}
.lbd-stats a{flex:1;display:flex;flex-direction:column;justify-content:center;gap:7px;padding:0 18px;transition:background .3s}
.lbd-stats a+a{border-left:1px solid #ffffff0f}
.lbd-stats a:hover{background:#7540b714}
.lbd-stats b{font:600 22px/1 'Inter Display',Inter,sans-serif;letter-spacing:-.03em;color:#fff;font-variant-numeric:tabular-nums;animation:lbd-num .6s cubic-bezier(.19,1,.22,1) both}
.lbd-stats small{font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#eeebe473}
/* 3. questions */
.lbd-gql{position:absolute;left:0;top:0;bottom:0;width:248px;border-right:1px solid #ffffff0d;padding:12px 8px;background:#131218;overflow:hidden}
.lbd-gql-h{display:flex;align-items:center;gap:8px;padding:2px 8px 10px;font-size:12.5px;font-weight:600}
.lbd-gql-h span{margin-left:auto;font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#eeebe466}
.lbd-gq{display:flex;align-items:center;gap:8px;width:100%;height:26px;padding:0 8px;border-radius:8px;font-size:11.5px;color:#eeebe4bf;white-space:nowrap;transition:background .25s,color .25s}
.lbd-gq:hover{background:#ffffff0b;color:#fff}
.lbd-gq[aria-current=true]{background:#7540b733;color:#fff;box-shadow:inset 0 0 0 1px #a46bff73}
.lbd-gq em{font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;font-style:normal;color:#eeebe466;width:42px;flex:none}
.lbd-gq[aria-current=true] em{color:#d2b6ff}
.lbd-gq span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis}
.lbd-st{flex:none;width:7px;height:7px;border-radius:50%;box-shadow:inset 0 0 0 1.5px #d2b6ff80}
.lbd-st[data-st=partial]{background:#a46bff;box-shadow:0 0 6px #a46bff}
.lbd-st[data-st=researching]{background:#FFC24B;box-shadow:0 0 6px #FFC24B}
.lbd-gqd{position:absolute;left:248px;right:0;top:0;bottom:0;padding:16px 20px;animation:lbd-in .5s cubic-bezier(.19,1,.22,1)}
.lbd-gqd-h{display:flex;align-items:center;gap:8px;font:500 10px/1 'Geist Mono',ui-monospace,monospace;color:#d2b6ff}
.lbd-pill{display:inline-flex;align-items:center;gap:5px;padding:4px 7px;border-radius:99px;font:500 9px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;color:#eeebe4b3;box-shadow:inset 0 0 0 1px #ffffff1f}
.lbd-gqd-h a{margin-left:auto;display:flex;align-items:center;gap:6px;color:#eeebe480;transition:color .3s}
.lbd-gqd-h a:hover{color:#fff}
.lbd-gqd h4{margin:10px 0 6px;font:600 19px/1.2 'Inter Display',Inter,sans-serif;letter-spacing:-.025em;color:#fff}
.lbd-gqd p{margin:0;font-size:11.5px;line-height:1.5;color:#eeebe4a6}
.lbd-stop{display:flex;gap:8px;margin-top:10px;padding:8px 10px;border-radius:10px;background:#ffffff06;box-shadow:inset 0 0 0 1px #ffffff12;font-size:11px;line-height:1.45;color:#eeebe4b3}
.lbd-stop b{flex:none;font:500 9px/1.6 'Geist Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#d2b6ff}
.lbd-fan{position:relative;margin-top:14px;padding-left:12px}
.lbd-fan-root{display:flex;align-items:center;gap:7px;margin-left:-12px;font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#eeebe480}
.lbd-fan-root i{width:9px;height:9px;border-radius:50%;background:#d2b6ff;box-shadow:0 0 10px #a46bff}
.lbd-tree{list-style:none;margin:0;padding:0 0 0 0}
.lbd-tree li{position:relative;padding:8px 0 0 18px;animation:lbd-up .5s cubic-bezier(.19,1,.22,1) both}
.lbd-tree li::before{content:'';position:absolute;left:-8px;top:0;width:20px;height:22px;border-left:1.5px solid #a46bff;border-bottom:1.5px solid #a46bff;border-bottom-left-radius:9px;opacity:.8}
.lbd-tree li::after{content:'';position:absolute;left:-8px;top:20px;bottom:-2px;border-left:1.5px solid #a46bff;opacity:.8}
.lbd-tree li:last-child::after{display:none}
.lbd-ag{display:flex;align-items:center;gap:8px;font-size:11.5px;color:#eeebe4cc;white-space:nowrap}
.lbd-ag b{font:600 10px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.06em;color:#fff}
.lbd-ag em{font-style:normal;color:#eeebe466;font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;margin-left:auto}
.lbd-src{display:flex;gap:5px;margin-top:6px;min-height:22px;min-width:0}
.lbd-src a{flex:0 1 auto;min-width:0;display:flex;align-items:center;justify-content:flex-start;gap:6px;height:22px;padding:0 7px;border-radius:7px;font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;color:#eeebe4cc;
  background:#ffffff08;box-shadow:inset 0 0 0 1px #ffffff17;animation:lbd-pop .4s cubic-bezier(.19,1,.22,1) both;transition:all .3s cubic-bezier(.19,1,.22,1)}
.lbd-src a:hover{color:#fff;transform:translateY(-1px);box-shadow:inset 0 0 0 1px #d2b6ff,0 6px 16px -8px #a46bff}
.lbd-src a span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lbd-src a i{flex:none;font-style:normal;color:#d2b6ff}
.lbd-back{display:flex;align-items:center;gap:8px;margin-top:12px;padding:7px 10px;border-radius:10px;font-size:11px;color:#fff;background:#7540b72e;box-shadow:inset 0 0 0 1px #a46bff80;
  width:max-content;animation:lbd-pop .45s cubic-bezier(.19,1,.22,1) both}
/* 4. answers */
.lbd-doc{position:absolute;left:0;top:0;bottom:72px;width:412px;padding:18px 22px;border-right:1px solid #ffffff0d}
.lbd-doc-h{display:flex;align-items:center;gap:7px;font:500 10px/1 'Geist Mono',ui-monospace,monospace;color:#d2b6ff}
.lbd-doc h4{margin:10px 0 12px;font:600 19px/1.2 'Inter Display',Inter,sans-serif;letter-spacing:-.025em;color:#fff}
.lbd-doc ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:9px}
.lbd-doc li{position:relative;padding-left:14px;font-size:11.5px;line-height:1.55;color:#eeebe4d9;animation:lbd-up .5s cubic-bezier(.19,1,.22,1) both}
.lbd-doc li::before{content:'';position:absolute;left:0;top:.62em;width:5px;height:5px;border-radius:50%;background:#a46bff}
.lbd-note{margin-top:12px;font-size:10.5px;color:#eeebe466;font-style:italic;animation:lbd-up .5s cubic-bezier(.19,1,.22,1) both}
.lbd-cite{position:relative;display:inline-block;margin-left:3px;vertical-align:1px}
.lbd-cite>a{display:inline-grid;place-items:center;min-width:17px;height:16px;padding:0 4px;border-radius:5px;font:600 9px/1 'Geist Mono',ui-monospace,monospace;color:#d2b6ff;
  background:#7540b733;box-shadow:inset 0 0 0 1px #a46bff80;transition:all .3s cubic-bezier(.19,1,.22,1)}
.lbd-cite>a:hover,.lbd-cite[data-on]>a{color:#16091f;background:#d2b6ff;box-shadow:0 0 12px #a46bff;transform:translateY(-1px)}
.lbd-pop{position:absolute;left:50%;bottom:24px;z-index:20;width:236px;transform:translateX(-50%);padding:11px 12px;border-radius:12px;background:#1b1a21f7;
  box-shadow:0 0 0 1px #a46bff8c,0 18px 40px -12px #000,0 0 30px -10px #a46bff;text-align:left;white-space:normal;animation:lbd-popup .35s cubic-bezier(.19,1,.22,1);pointer-events:none}
.lbd-pop.is-below{bottom:auto;top:24px}
.lbd-pop b{display:flex;align-items:center;gap:7px;font-size:12px;font-weight:600;color:#fff}
.lbd-pop p{margin:6px 0 0;font-size:10.5px;line-height:1.45;color:#eeebe4a6}
.lbd-pop small{display:flex;gap:10px;margin-top:8px;font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;color:#d2b6ff}
.lbd-srcs{position:absolute;left:412px;right:0;top:0;bottom:72px;padding:18px 12px 0}
.lbd-srcs-h{padding:0 6px 10px;font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#eeebe466}
.lbd-s{display:flex;align-items:center;justify-content:flex-start;gap:9px;padding:7px 6px;border-radius:9px;transition:background .3s,box-shadow .3s}
.lbd-s:hover,.lbd-s[data-on]{background:#7540b724;box-shadow:inset 0 0 0 1px #a46bff59}
.lbd-s>i{flex:none;display:grid;place-items:center;width:20px;height:20px;border-radius:6px;font:600 9.5px/1 'Geist Mono',ui-monospace,monospace;font-style:normal;color:#d2b6ff;background:#7540b733}
.lbd-s span{min-width:0}
.lbd-s b{display:block;font-size:11px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lbd-s small{display:block;margin-top:3px;font:500 9px/1 'Geist Mono',ui-monospace,monospace;color:#eeebe466;white-space:nowrap}
.lbd-power{position:absolute;left:0;right:0;bottom:0;height:72px;display:flex;align-items:center;gap:22px;padding:0 20px;border-top:1px solid #ffffff0f;background:#0f0e13}
.lbd-power>small{font:500 9px/1.4 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#eeebe459;width:52px}
.lbd-pw{display:flex;flex-direction:column;gap:6px}
.lbd-pw b{font:600 19px/1 'Inter Display',Inter,sans-serif;letter-spacing:-.025em;color:#fff;font-variant-numeric:tabular-nums}
.lbd-pw small{font:500 9px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#eeebe473}
.lbd-pw.tok b{min-width:176px}
.lbd-pw.tok small i{display:inline-block;width:6px;height:6px;border-radius:50%;margin-right:6px;background:#FF6A1A;box-shadow:0 0 8px #FF6A1A;animation:lbd-blink 1.6s steps(1) infinite}
.lbd-models{margin-left:auto;display:flex;gap:6px}
.lbd-models span{display:flex;align-items:center;gap:7px;height:30px;padding:0 11px;border-radius:9px;font-size:11px;color:#eeebe4cc;background:#ffffff08;box-shadow:inset 0 0 0 1px #ffffff17;
  transition:all .35s cubic-bezier(.19,1,.22,1)}
.lbd-models span:hover{color:#fff;transform:translateY(-1px);box-shadow:inset 0 0 0 1px #a46bff99}
.lbd-models img{width:14px;height:14px;border-radius:4px}
@keyframes lbd-blink{50%{opacity:0}}
@keyframes lbd-up{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes lbd-in{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:none}}
@keyframes lbd-pop{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:none}}
@keyframes lbd-popup{from{opacity:0;transform:translate(-50%,6px)}to{opacity:1;transform:translate(-50%,0)}}
@keyframes lbd-num{from{opacity:0;transform:translateY(8px);filter:blur(5px)}}
@keyframes lbd-flow{from{stroke-dashoffset:143}to{stroke-dashoffset:0}}
@keyframes lbd-tw{0%,100%{opacity:.25}50%{opacity:.8}}
@keyframes lbd-breath{0%,100%{box-shadow:0 0 0 1px #d2b6ff66,0 0 34px -8px #a46bff}50%{box-shadow:0 0 0 1px #d2b6ffaa,0 0 48px -4px #a46bff}}
.lbd:not([data-live]) *{animation-play-state:paused!important}
@media (max-width:991px){.lbd{height:auto;aspect-ratio:752/640}}
@media (prefers-reduced-motion:reduce){.lbd *{animation:none!important;transition:none!important}}
`;

function Svg({ children, size = 15 }: { children: ReactNode; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
}
function TabIcon({ i, size = 18 }: { i: number; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{LIB_TAB_ICONS[i]}</svg>;
}
const SearchIcon = () => <Svg size={17}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></Svg>;

function Ring({ v }: { v: number }) {
  return <span className="lbd-ring" style={{ ['--p' as string]: v } as CSSProperties} title={`Reuse score ${v} of 100`}>{v}</span>;
}

/** t: ms since this tab began (held at LIB_DUR when reduced motion). running: in view and moving. onPick: open another tab. */
export default function LibraryDemo({ tab, t, running, onPick }: { tab: number; t: number; running: boolean; onPick: (i: number) => void }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  // What the visitor picked inside a view, and when (in card time), so its story replays from there.
  const [query, setQuery] = useState<{ i: number; at: number } | null>(null);
  const [org, setOrg] = useState<number | null>(null);
  const [gq, setGq] = useState<{ i: number; at: number } | null>(null);
  const [cite, setCite] = useState<{ li: number; n: number } | null>(null);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const el = box.current; if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(e.contentRect.width / 752, e.contentRect.height / 640)));
    ro.observe(el); return () => ro.disconnect();
  }, []);
  useEffect(() => { setQuery(null); setOrg(null); setGq(null); setCite(null); }, [tab]);
  // The tokens counter only ticks on the answers view, and only in the browser (it reads the clock).
  useEffect(() => {
    if (LIB_TABS[tab].key !== 'answers') return;
    setNow(Date.now());
    if (!running) return;
    const id = window.setInterval(() => setNow(Date.now()), 150);
    return () => window.clearInterval(id);
  }, [tab, running]);

  const key = LIB_TABS[tab].key;
  const tc = Math.min(t, LIB_DUR);
  const since = (at: number) => (running ? t - at : 1e9);

  // 1. Repos: two searches per pass; a picked chip replays from its click.
  const qi = query ? query.i : tc < 4600 ? 0 : 1;
  const qt = query ? since(query.at) : tc < 4600 ? tc : tc - 4600;
  const search = SEARCHES[qi];
  const typed = search.q.slice(0, Math.max(0, Math.floor((qt - 250) / 48)));
  const typedDone = typed.length >= search.q.length;
  const rowsAt = 250 + search.q.length * 48 + 250;
  const rows = search.rows.filter((_, i) => qt >= rowsAt + i * 230);

  // 2. People: focus walks four organisations unless one is picked.
  const focus = org ?? AUTO_ORGS[Math.min(AUTO_ORGS.length - 1, Math.floor(tc / 2250))];
  const fn = NODES[focus];

  // 3. Questions: GQ-012 opens; agents branch off one by one, then their sources stream in.
  const gi = gq ? gq.i : OPEN_GQ;
  const gt = gq ? since(gq.at) : tc;
  const open = GQ[gi];
  const agentsIn = (i: number) => gt >= 700 + i * 260;
  const srcIn = (i: number, k: number) => gt >= 1900 + (k * 4 + i) * 360;
  const backIn = gt >= 1900 + 12 * 360 + 300;

  // 4. Answers: the brief builds line by line, then each citation lights in turn unless the pointer is on one.
  const linesIn = LINES.filter((_, i) => tc >= 300 + i * 520).length;
  const autoN = tc >= 3000 ? (Math.floor((tc - 3000) / 1000) % SOURCES.length) + 1 : null;
  const onN = cite?.n ?? autoN;
  // One card at a time: the chip under the pointer, or on its own the first chip that cites the lit source.
  const popAt = cite ?? (autoN ? { li: LINES.findIndex(l => l.cite.includes(autoN)), n: autoN } : null);

  const chip = (li: number) => (n: number) => <span key={n} className="lbd-cite" data-on={onN === n || undefined}
    onPointerEnter={() => setCite({ li, n })} onPointerLeave={() => setCite(null)}>
    <a href={srcHref(SOURCES[n - 1])} target="_blank" rel="noopener noreferrer" aria-label={`Source ${n}`}
      onFocus={() => setCite({ li, n })} onBlur={() => setCite(null)}>{n}</a>
    {popAt?.li === li && popAt.n === n && <SourceCard s={SOURCES[n - 1]} below={li < 3} />}
  </span>;

  return (
    <div ref={box} className="lbd" data-live={running || undefined}>
      <style>{CSS}</style>
      <div className="lbd-stage" style={{ transform: `translate(-50%,-50%) scale(${scale})` }}>
        <div className="lbd-crumb"><LivingIcon name="library" size={22} variant="glyph" paused={!running} />Great Library <span>/ {VIEW[tab]}</span></div>

        <div className="lbd-win">
          <div className="lbd-bar">
            <span className="lbd-lights"><i /><i /><i /></span>
            <span className="lbd-tab"><TabIcon i={tab} size={13} />{VIEW[tab]}</span>
            <a className="lbd-k" href="/great-library/"><SearchIcon />Search everything<kbd>⌘K</kbd></a>
          </div>

          <div className="lbd-body">
            <div className="lbd-rail">
              {VIEW.map((v, i) => <button type="button" key={v} className="lbd-ri" data-name={v} aria-label={v} aria-pressed={tab === i} onClick={() => onPick(i)}>
                <TabIcon i={i} /></button>)}
              <hr />
              <a className="lbd-ri gh" data-name="Open on GitHub" aria-label="Great Library of SISO on GitHub" href={LIB_HREF} target="_blank" rel="noopener noreferrer"><GitHubMark size={16} /></a>
            </div>

            {key === 'repos' && <div className="lbd-main" key="repos">
              <div className="lbd-search" role="search">
                <SearchIcon />
                <span className="q">{typed ? typed : <span className="ph">Search {fmt(RATED)} rated repos</span>}{!typedDone && <span className="lbd-caret" />}</span>
                <kbd>↵</kbd>
              </div>
              <div className="lbd-chips">
                {SEARCHES.map((s, i) => <button type="button" key={s.q} className="lbd-chip" aria-pressed={qi === i} onClick={() => setQuery({ i, at: t })}>{s.q}</button>)}
              </div>
              <div className="lbd-rhead"><span><b>{fmt(search.total)}</b> rated · {search.q}</span><span className="c1">Licence</span><span className="c2">Stars</span><span className="c3">Reuse</span></div>
              <div className="lbd-rows" key={`${qi}-${query?.at ?? 0}`}>
                {rows.map(r => <a key={r.n} className="lbd-row" href={REPO_URL(r.n)} target="_blank" rel="noopener noreferrer" title={r.s}>
                  <span className="lbd-mono-tile" aria-hidden="true">{r.n[0].toUpperCase()}</span>
                  <span className="lbd-rt"><b>{r.n}</b><small>{r.s}</small></span>
                  <span className="lbd-lic"><span>{r.l}</span></span>
                  <span className="lbd-stars">★ {kStars(r.st)}</span>
                  <span className="lbd-score"><Ring v={r.r} /></span>
                </a>)}
              </div>
              <div className="lbd-foot"><span><b>{fmt(RATED)}</b> rated · {CATEGORIES} categories · best reuse first</span><span>{fmt(Number(INDEXED.n.replace(/,/g, '')))} repos indexed</span></div>
            </div>}

            {key === 'people' && <div className="lbd-main" key="people">
              <div className="lbd-graph">
                <svg viewBox="0 0 654 452" aria-hidden="true">
                  {DUST.map((d, i) => <circle key={i} className="lbd-dust" cx={d.x} cy={d.y} r={d.r} fill="#d2b6ff" style={{ animationDelay: `-${d.d}ms` }} />)}
                  {NODES.map((n, i) => <g key={n.o}>
                    <line className={`lbd-edge${i === focus ? ' on' : ''}`} x1={HUB.x} y1={HUB.y} x2={n.x} y2={n.y} />
                    <line className="lbd-pulse" x1={HUB.x} y1={HUB.y} x2={n.x} y2={n.y} style={{ animationDelay: `-${(i * 730) % 3200}ms` }} />
                    {n.repos.map(r => <g key={r.n}>
                      <line className={`lbd-sub${i === focus ? ' on' : ''}`} x1={n.x} y1={n.y} x2={r.x} y2={r.y} />
                      <circle className={`lbd-dot${i === focus ? ' on' : ''}`} cx={r.x} cy={r.y} r={i === focus ? 4 : 3} />
                    </g>)}
                  </g>)}
                </svg>
                <div className="lbd-hub" style={{ left: HUB.x, top: HUB.y }}><ProductGlyph product="library" size={72} playing={running} /></div>
                <div className="lbd-hub-l" style={{ left: HUB.x, top: HUB.y }}>People Graph</div>
                {NODES.map((n, i) => <button type="button" key={n.o} className="lbd-org" aria-pressed={i === focus} aria-label={`${n.o}: ${fmt(n.n)} repos in the graph`}
                  style={{ left: n.x, top: n.y, width: n.size, height: n.size }} onPointerEnter={() => setOrg(i)} onFocus={() => setOrg(i)} onClick={() => setOrg(i)}>
                  <img loading="lazy" decoding="async" src={LOGO[n.o]} alt="" />
                </button>)}
                <div className="lbd-info" key={`i${focus}`}>
                  <div className="lbd-info-h"><img loading="lazy" decoding="async" src={LOGO[fn.o]} alt="" /><span><b>{fn.o}</b><small>{fmt(fn.n)} repos</small></span></div>
                  {fn.repos.map((r, k) => <a key={r.n} href={REPO_URL(r.n)} target="_blank" rel="noopener noreferrer" style={{ animationDelay: `${120 + k * 110}ms` }}>
                    <i />{r.n.split('/')[1]}<em>↗</em></a>)}
                </div>
              </div>
              <div className="lbd-stats">
                {[[PEOPLE, 'people'], [WORKS, 'works'], [TOPIC_LINKS, 'topic links']].map(([v, l], i) =>
                  <a key={l} href="/great-library/"><b style={{ animationDelay: `${i * 90}ms` }}>{fmt(v as number)}</b><small>{l}</small></a>)}
              </div>
            </div>}

            {key === 'questions' && <div className="lbd-main" key="questions">
              <div className="lbd-gql">
                <div className="lbd-gql-h"><TabIcon i={2} size={15} />God questions<span>{GQ.length} ranked</span></div>
                {GQ.map((q, i) => <button type="button" key={q.id} className="lbd-gq" aria-current={i === gi} onClick={() => setGq({ i, at: t })} title={q.q}>
                  <em>{q.id}</em><span>{q.t}</span><i className="lbd-st" data-st={q.st} title={q.st} />
                </button>)}
              </div>
              <div className="lbd-gqd" key={`${gi}-${gq?.at ?? 0}`}>
                <div className="lbd-gqd-h">{open.id}<span className="lbd-pill">{open.st}</span>
                  <a href={RECORD_URL + open.f} target="_blank" rel="noopener noreferrer"><GitHubMark size={12} />Record</a></div>
                <h4>{open.t}</h4>
                <p>{open.q}</p>
                <div className="lbd-stop"><b>Stop if</b>{open.stop}</div>
                <div className="lbd-fan">
                  <div className="lbd-fan-root"><i />Four agents, one thread each</div>
                  <ul className="lbd-tree">
                    {open.threads.map((th, i) => agentsIn(i) && <li key={th.tag}>
                      <div className="lbd-ag"><AgentFace name={AGENTS[i].name} family={AGENTS[i].family} status={backIn ? 'done' : 'working'} size={20} paused={!running} />
                        <b>{AGENTS[i].name}</b>{th.t}<em>{fmt(th.n)} rated</em></div>
                      <div className="lbd-src">{th.src.map((s, k) => srcIn(i, k) && <a key={s.n} href={REPO_URL(s.n)} target="_blank" rel="noopener noreferrer" title={s.s}>
                        <span>{s.n.split('/')[1]}</span><i>{s.r}</i></a>)}</div>
                    </li>)}
                  </ul>
                  {backIn && <button type="button" className="lbd-back" onClick={() => onPick(3)}>
                    <LivingIcon name="library" size={16} variant="glyph" paused={!running} />{open.threads.reduce((a, th) => a + th.src.length, 0)} sources back into the library →</button>}
                </div>
              </div>
            </div>}

            {key === 'answers' && <div className="lbd-main" key="answers">
              <div className="lbd-doc">
                <div className="lbd-doc-h">{Q12.id}<span className="lbd-pill">Evidence brief</span><span className="lbd-pill">{Q12.st}</span></div>
                <h4>{Q12.t}</h4>
                <ol>{LINES.slice(0, linesIn).map((l, li) => <li key={l.text}>{l.text}{l.cite.map(chip(li))}</li>)}</ol>
                {linesIn >= LINES.length && <div className="lbd-note">Proposed criteria and evidence, not yet an accepted answer.</div>}
              </div>
              <div className="lbd-srcs">
                <div className="lbd-srcs-h">Sources · {SOURCES.length}</div>
                {SOURCES.map((s, i) => <a key={i} className="lbd-s" data-on={onN === i + 1 || undefined} href={srcHref(s)}
                  target="_blank" rel="noopener noreferrer" onPointerEnter={() => setCite({ li: -1, n: i + 1 })} onPointerLeave={() => setCite(null)}>
                  <i>{i + 1}</i>
                  {s.kind === 'repo' ? <span><b>{s.repo.n}</b><small>{s.repo.l} · ★ {kStars(s.repo.st)} · {s.repo.r}</small></span>
                    : <span><b>{s.title}</b><small>{s.sub}</small></span>}
                </a>)}
              </div>
              <div className="lbd-power">
                <small>Powered by</small>
                <a className="lbd-pw tok" href="/agent-base/" title={LIVE._readme}><b>{now === null ? '522B+' : fmt(liveTokens(now))}</b><small><i />tokens spent, live</small></a>
                <a className="lbd-pw" href={INDEXED.href} title={INDEXED.source}><b>{INDEXED.n}</b><small>{INDEXED.label}</small></a>
                <span className="lbd-models">
                  <span><img loading="lazy" decoding="async" src="/logos/os-top/anthropics.png" alt="" />Claude</span>
                  <span><img loading="lazy" decoding="async" src="/logos/os-top/openai.png" alt="" />Codex</span>
                </span>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

const srcHref = (s: Src) => (s.kind === 'repo' ? REPO_URL(s.repo.n) : s.href);

function SourceCard({ s, below }: { s: Src; below: boolean }) {
  const cls = below ? 'lbd-pop is-below' : 'lbd-pop';
  if (s.kind === 'record') return <span className={cls} role="tooltip"><b><LivingIcon name="library" size={16} variant="glyph" />{s.title}</b><p>{s.sub}. The question, its success criteria and its falsifiers, as published.</p><small><span>{Q12.id}</span><span>{Q12.st}</span></small></span>;
  const r = s.repo;
  return <span className={cls} role="tooltip"><b><GitHubMark size={13} />{r.n}</b><p>{r.s}</p><small><span>{r.l}</span><span>★ {fmt(r.st)}</span><span>{r.lg}</span><span>reuse {r.r}</span></small></span>;
}
