// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/home-products/agent-base/AgentBaseDemo.tsx)
'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { ProductGlyph } from '../../ProductGlyph';
import { GitHubMark } from '../../ui/GitHubButton';
import { AgentFace, LivingIcon, WorkspaceMark, type LivingIconName } from '../../living/living-assets';
import type { AgentStatus, FaceFamily } from '../../living/identity';

// A working miniature of Agent Base, the app Shaan lives in. His words, 9 Oct: "what I see in my app right now as an
// interactable demo", "our thing has actual agent faces, you should put those agent faces in there ... the way we've wired it
// up is way cooler", "show off the modules, like the browser module ... and show our Arc side nav", "the voice app is built
// in", "mention that you can use Claude, Codex and as many more ... their icons and their CLI", "make the chat look nicer".
// Real parts, copied from Agent Base (siso/living/): WorkspaceMark (the Agent Base and SISO Agency lions), LivingIcon (the
// rail), AgentFace (every agent's face). The tree is drawn the way Agent Base's side nav draws it: Agent Zero on top, a
// coloured line per project, counts in green. Agent names are SISO's own lanes; the chats are illustrative.
// Voice is real when you click the mic: it records here and /api/transcribe turns it into text with Groq.
// The stage is drawn at 752x640 and scaled to fit, so every position below is in stage pixels.

export const AB_TABS = [
  { key: 'agents', label: 'Every agent in one place', desc: 'Agent Zero on top, every other agent under the project it works for, live.' },
  { key: 'cli', label: 'Claude, Codex and more', desc: 'Run Claude Code, Codex or any terminal agent, each in its own chat.' },
  { key: 'browser', label: 'Browser built in', desc: 'An Arc-style browser beside your agents, with their pages as tabs.' },
  { key: 'voice', label: 'Voice built in', desc: 'Talk instead of typing. Try it: click the mic.' },
] as const;
// The product page's bigger demo adds the old /agent-base/ demo's best part: modules you switch on and off around the core.
export const AB_PAGE_TABS = [
  ...AB_TABS,
  { key: 'modules', label: 'Modules you can swap', desc: 'WhatsApp, Estate and the Great Library sit on the rail. Switch them on or off.' },
] as const;
export type AbTab = { key: 'agents' | 'cli' | 'browser' | 'voice' | 'modules'; label: string; desc: string };
export const AB_DUR = 9000;

type Mark = 'working' | 'needs' | 'idle';
type Agent = { id: string; name: string; nice: string; mark: Mark; family: FaceFamily; ago: string };
const A = (id: string, name: string, mark: Mark, family: FaceFamily, ago: string, nice = name): Agent => ({ id, name, nice, mark, family, ago });
const AGENTS = {
  zero: A('zero', 'Agent Zero', 'idle', 'codex', 'now'),
  landing: A('landing', 'SISO-LANDING', 'working', 'claude', '2m', 'SISO Landing'),
  image: A('image', 'IMAGE-BRAIN', 'idle', 'codex', '1h', 'Image Brain'),
  base: A('base', 'AGENT-BASE', 'working', 'codex', '4m', 'Agent Base'),
  uihub: A('uihub', 'UI-HUB', 'needs', 'claude', 'now', 'UI Hub'),
  research: A('research', 'RESEARCH', 'working', 'codex', '6m', 'Research'),
};
type AgentId = keyof typeof AGENTS;
const STATUS: Record<Mark, AgentStatus> = { working: 'working', needs: 'needs-shaan', idle: 'waiting' };

type Turn = { you: string; steps: string[]; title: string; points: string[]; ask?: string[] };
const CHATS: Record<AgentId, Turn> = {
  zero: { you: 'Where are we?', steps: ['Read 5 agents', 'Read the task board'], title: 'Where things stand', points: ['3 agents working', 'UI-HUB needs you: picks are ready', 'Blog preview is up'] },
  landing: { you: 'Make the beam fall from the divider onto the lion.', steps: ['Read Footer/Beam.tsx', 'Edited Signature.tsx +38 −12', 'Ran next build ✓'], title: 'Done', points: ['The beam lands on the lion', 'Checked at 1440 and 390', 'Preview deployed'] },
  image: { you: 'Make the blog header backgrounds.', steps: ['Generated 12 images', 'Wrote the contact sheet'], title: 'Saved', points: ['12 backgrounds, no text', 'Contact sheet beside them'] },
  base: { you: 'Make the rail icons play once on hover.', steps: ['Edited LivingIcon.tsx', 'Ran the Agent Base tests ✓'], title: 'Live', points: ['Each icon plays one gesture', 'Then it settles and stays still'] },
  uihub: { you: 'Find us a command palette for the docs.', steps: ['Searched the catalogue', 'Rated 3 picks'], title: 'Three fit', points: ['Pick one and I install it'], ask: ['Minimal', 'Grouped', 'Compact'] },
  research: { you: 'Which agent apps ship a browser inside?', steps: ['Read the READMEs', 'Opened 6 repos'], title: 'Drafting', points: ['Comparison table next', 'Sources linked per row'] },
};

const RAIL: { key: string; label: string; icon?: LivingIconName }[] = [
  { key: 'agents', label: 'Agents' }, { key: 'voice', label: 'Voice', icon: 'siso-voice' },
  { key: 'web', label: 'Browser', icon: 'web' }, { key: 'library', label: 'Library', icon: 'library' },
];

// The CLI views: what each harness looks like in its own terminal. Same request, two harnesses.
const ASK = 'Check the footer at 1440 and 390';
const CLI = {
  claude: { name: 'Claude Code', logo: '/logos/os-top/anthropics.png', accent: '#d97757', model: 'Claude Opus 5.5',
    head: ['✻ Welcome to Claude Code!', '  /help for help · cwd: ~/siso-labs'], prompt: '>',
    lines: [['⏺', 'Read(Footer/Signature.tsx)'], ['  ⎿', 'Read the file'], ['⏺', 'Bash(heavy -- pnpm exec next build)'], ['  ⎿', '✓ Compiled successfully'], ['⏺', 'Shot footer-1440.png and footer-390.png'], ['⏺', 'Both widths are clean. The shots are on its page.']] },
  codex: { name: 'Codex', logo: '/logos/os-top/openai.png', accent: '#9fb4ff', model: 'Codex · Astra',
    head: ['>_ OpenAI Codex', '  model: astra · directory: ~/siso-labs'], prompt: '›',
    lines: [['•', 'Explored Footer/Signature.tsx'], ['•', 'Ran heavy -- pnpm exec next build'], ['  └', '✓ Compiled successfully'], ['•', 'Shot footer-1440.png and footer-390.png'], ['•', 'Both widths are clean. The shots are on its page.']] },
} as const;

const TABS_ARC = [
  { title: 'SISO Labs', icon: 'lion' }, { title: 'Agent Base · GitHub', icon: 'gh' }, { title: 'Claude Code docs', icon: '/logos/os-top/anthropics.png' },
  { title: 'Codex docs', icon: '/logos/os-top/openai.png' }, { title: 'Tauri 2', icon: '/logos/os-top/tauri-apps.png' },
];
const PINS = ['gh', '/logos/os-top/openai.png', '/logos/os-top/anthropics.png', '/logos/os-top/tauri-apps.png', 'lion', 'web'];
const URL = 'www.sisolabs.space';
// Modules view (from the old /agent-base/ demo): sample connection, sample pinning, sample search. Copy as on the old page.
type ModKey = 'whatsapp' | 'estate' | 'library';
const MODS: { key: ModKey; name: string; sub: string }[] = [
  { key: 'whatsapp', name: 'WhatsApp', sub: 'scan the QR and it’s in' },
  { key: 'estate', name: 'Estate', sub: 'every repo, pinned nightly' },
  { key: 'library', name: 'Great Library', sub: '23,778 rated repos' },
];
const PINNED = ['sisodias/siso-agency-lp', 'sisodias/siso-internal-labs-agent-base', 'sisodias/siso-internal-labs-agents'];
const FOUND = [['pacocoursey/cmdk', 'Command menu primitive'], ['shadcn-ui/ui', 'Composable command component'], ['radix-ui/primitives', 'Accessible foundations']] as const;
const QUERY = 'command palette';
const SAID = 'Ask UI Hub to install the grouped palette on the docs.';

const CSS = `
.abd{position:relative;width:100%;height:100%;overflow:hidden;isolation:isolate;color:#eeebe4;font-family:Inter,sans-serif;
  background:radial-gradient(55% 40% at 50% -4%,#ffc0b880,transparent 70%),radial-gradient(60% 50% at 80% 110%,#ff8a7066,transparent 70%),
    linear-gradient(160deg,#3d0f0c 0%,#9e352c 30%,#e2584f 58%,#ed615a 72%,#b8443a 88%,#2a0907 100%)}
.abd-stage{position:absolute;left:50%;top:50%;width:752px;height:640px;transform-origin:50% 50%}
.abd-stage *{box-sizing:border-box}
:where(.abd) button{font:inherit;color:inherit;border:0;background:none;padding:0;cursor:pointer;text-align:inherit}
.abd-crumb{position:absolute;top:20px;left:26px;display:flex;align-items:center;gap:9px;font-size:13px;font-weight:600;color:#fff;text-shadow:0 1px 12px #0006}
.abd-crumb span{font-weight:400;color:#ffffffa6}
.abd-win{position:absolute;left:24px;top:54px;width:704px;height:566px;border-radius:16px;background:#121214;overflow:hidden;
  box-shadow:0 0 0 1px #ffffff1f,0 40px 90px -20px #1a0302,0 10px 30px -10px #0009}
.abd-zone{transition:opacity .6s cubic-bezier(.19,1,.22,1),filter .6s}
.abd-win[data-focus] .abd-zone{opacity:.4;filter:saturate(.4)}
.abd-win[data-focus~=side] [data-zone=side],.abd-win[data-focus~=main] [data-zone=main],.abd-win[data-focus~=rail] [data-zone=rail]{opacity:1;filter:none}
.abd-bar{position:absolute;inset:0 0 auto 0;height:36px;display:flex;align-items:center;gap:4px;padding:0 12px;border-bottom:1px solid #ffffff0f;background:#161619}
.abd-lights{display:flex;gap:6px;margin-right:14px}.abd-lights i{width:9px;height:9px;border-radius:50%;background:#ffffff24}
.abd-tab{display:flex;align-items:center;gap:6px;height:24px;padding:0 10px;border-radius:7px;font-size:11px;color:#eeebe48c;white-space:nowrap;transition:background .3s,color .3s,box-shadow .3s}
.abd-tab:hover{color:#eeebe4;background:#ffffff0a}
.abd-tab[aria-selected=true]{background:#ffffff10;color:#eeebe4;box-shadow:inset 0 0 0 1px #ffffff17}
.abd-tab img{width:12px;height:12px;border-radius:3px}
.abd-tab.is-new{animation:abd-in .6s cubic-bezier(.19,1,.22,1)}
.abd-body{position:absolute;inset:36px 0 0 0;display:flex}
.abd-rail{width:50px;flex:none;border-right:1px solid #ffffff0d;display:flex;flex-direction:column;align-items:center;gap:6px;padding-top:12px;background:#0f0f11}
.abd-ri{position:relative;width:36px;height:36px;border-radius:11px;display:grid;place-items:center;transition:background .35s,box-shadow .35s,transform .35s cubic-bezier(.19,1,.22,1)}
.abd-ri:hover{background:#ffffff0d;transform:translateY(-1px)}
.abd-ri[aria-pressed=true]{background:#ffffff12;box-shadow:inset 0 0 0 1px #ffffff26,0 0 18px -6px #8fb4ff}
.abd-ri[data-name]:hover::after{content:attr(data-name);position:absolute;left:44px;top:50%;transform:translateY(-50%);z-index:9;white-space:nowrap;padding:5px 8px;border-radius:7px;
  background:#1c1c20;box-shadow:0 0 0 1px #ffffff1f;font-size:10px;color:#fff}
.abd-rail hr{width:22px;border:0;border-top:1px solid #ffffff14;margin:4px 0}
/* the side nav: Agent Base's tree */
.abd-side{width:240px;flex:none;border-right:1px solid #ffffff0d;padding:10px 10px 0;background:#141416;position:relative;overflow:hidden}
.abd-side-head{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;padding:2px 4px 10px}
.abd-side-head .chev{opacity:.5;font-weight:400}
.abd-side-head .grid{margin-left:auto;width:14px;height:14px;opacity:.45;background:conic-gradient(from 0deg,#fff 0 0) 0 0/6px 6px,conic-gradient(#fff 0 0) 8px 0/6px 6px,conic-gradient(#fff 0 0) 0 8px/6px 6px,conic-gradient(#fff 0 0) 8px 8px/6px 6px;background-repeat:no-repeat;border-radius:2px;-webkit-mask:linear-gradient(#000 0 0);opacity:.25}
.abd-panel{position:relative;border-radius:14px;padding:10px 8px 10px 8px;border:1.5px solid transparent;
  background:linear-gradient(#18181b,#18181b) padding-box,linear-gradient(165deg,#e8c27c,#a08a5c 35%,#5fa9cf 75%,#d9b06c) border-box;
  box-shadow:0 0 26px -8px #e8c27c55;transition:box-shadow .6s}
.abd-win[data-focus~=side] .abd-panel{box-shadow:0 0 34px -6px #e8c27c88}
.abd-row{position:relative;display:flex;align-items:center;gap:7px;width:100%;height:26px;padding:0 6px;border-radius:8px;font-size:11.5px;white-space:nowrap;color:#eeebe4cc;
  transition:background .25s,color .25s}
.abd-row:hover{background:#ffffff0b;color:#fff}
.abd-row[aria-current=true]{background:#2c2723;color:#fff}
.abd-row.is-zero{height:36px;font-size:13px;font-weight:500;color:#fff}
.abd-row.is-agent{font:600 10px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.06em}
.abd-row .ago{margin-left:auto;display:flex;align-items:center;gap:5px;font:500 10px/1 'Geist Mono',ui-monospace,monospace;color:#63b3ed}
.abd-count{margin-left:auto;min-width:18px;height:18px;padding:0 5px;border-radius:99px;display:grid;place-items:center;font:600 10px/1 Inter,sans-serif;background:#1d3a28;color:#6fdc95}
.abd-chev{opacity:.4;font-size:10px;margin-left:6px}
.abd-tree,.abd-tree ul{list-style:none;margin:0;padding:0}
.abd-tree ul{margin-left:8px}
.abd-tree li{position:relative;padding-left:13px}
.abd-tree li::before{content:'';position:absolute;left:0;top:0;width:11px;height:13px;border-left:1.5px solid var(--l);border-bottom:1.5px solid var(--l);border-bottom-left-radius:8px}
.abd-tree li::after{content:'';position:absolute;left:0;top:12px;bottom:0;border-left:1.5px solid var(--l)}
.abd-tree li:last-child::after{display:none}
.abd-side-foot{margin-top:12px;display:flex;flex-direction:column;gap:2px;font:500 10px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#eeebe466}
.abd-side-foot span{display:flex;justify-content:space-between;padding:8px 6px}
.abd-side-foot b{color:#63b3ed;font-weight:500}
.abd-mk{display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid #63b3ed;border-top-color:transparent;animation:abd-spin 1s linear infinite}
/* the Arc side nav (browser module) */
.abd-arc{display:flex;flex-direction:column;gap:10px;animation:abd-in .5s cubic-bezier(.19,1,.22,1)}
.abd-arc-nav{display:flex;gap:12px;padding:2px 4px;color:#eeebe466;font-size:12px}
.abd-arc-url{height:30px;border-radius:9px;background:#ffffff0d;display:flex;align-items:center;padding:0 10px;font:10px/1 'Geist Mono',ui-monospace,monospace;color:#eeebe4cc;overflow:hidden;white-space:nowrap}
.abd-pins{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}
.abd-pins span{height:40px;border-radius:10px;background:#ffffff0a;display:grid;place-items:center;transition:background .3s,transform .3s cubic-bezier(.19,1,.22,1)}
.abd-pins span:hover{background:#ffffff14;transform:translateY(-1px)}
.abd-pins img{width:18px;height:18px;border-radius:5px}
.abd-arc-new{font-size:11.5px;color:#eeebe499;padding:4px 6px;border-top:1px solid #ffffff0f;padding-top:10px}
.abd-arc-tab{display:flex;align-items:center;gap:9px;height:30px;padding:0 8px;border-radius:9px;font-size:11.5px;color:#eeebe4bf;transition:background .25s}
.abd-arc-tab:hover{background:#ffffff0a}
.abd-arc-tab[aria-current=true]{background:#ffffff14;color:#fff}
.abd-arc-tab img{width:14px;height:14px;border-radius:4px}
/* main: chat */
.abd-main{flex:1;min-width:0;position:relative;display:flex;flex-direction:column;background:#111113}
.abd-mhead{margin:10px 12px 0;height:42px;flex:none;display:flex;align-items:center;gap:9px;padding:0 10px;border-radius:14px;border:1px solid #ed615a59;background:#16161a;
  box-shadow:0 0 22px -10px #ed615a}
.abd-name{font:600 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.07em}
.abd-state{font-size:10.5px;color:#eeebe480;display:flex;align-items:center;gap:6px}
.abd-state i{width:5px;height:5px;border-radius:50%;background:#eeebe466}
.abd-hbtn{margin-left:auto;display:flex;gap:6px}.abd-hbtn i{width:24px;height:24px;border-radius:8px;box-shadow:inset 0 0 0 1px #ffffff17}
.abd-chat{flex:1;min-height:0;position:relative;padding:12px 16px 8px;display:flex;flex-direction:column;justify-content:flex-end;gap:9px;overflow:hidden}
.abd-chat>*{animation:abd-up .45s cubic-bezier(.19,1,.22,1) both}
.abd-you{align-self:flex-end;max-width:84%;padding:8px 12px;border-radius:14px 14px 4px 14px;background:#25252b;font-size:11.5px;line-height:1.45}
.abd-steps{display:flex;align-items:center;gap:8px;font:10px/1 'Geist Mono',ui-monospace,monospace;color:#eeebe47a}
.abd-steps b{font-weight:500;color:#eeebe4b3}
.abd-steps i{flex:1;height:1px;background:#ffffff12}
.abd-card{border-radius:12px;background:#18181c;box-shadow:inset 0 0 0 1px #ffffff14;padding:11px 13px}
.abd-card small{display:block;font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#eeebe473;margin-bottom:8px}
.abd-card li{position:relative;list-style:none;padding-left:13px;font-size:11.5px;line-height:1.6;color:#eeebe4e0}
.abd-card ul{margin:0;padding:0}
.abd-card li::before{content:'';position:absolute;left:0;top:.62em;width:5px;height:5px;border-radius:50%;background:#ed615a}
.abd-ask{display:flex;gap:6px;margin-top:9px}
.abd-ask button{flex:1;padding:7px 6px;border-radius:9px;background:#ffffff08;box-shadow:inset 0 0 0 1px #ffffff1a;font-size:10.5px;text-align:center;color:#eeebe4cc;
  transition:all .35s cubic-bezier(.19,1,.22,1)}
.abd-ask button:hover{transform:translateY(-2px);box-shadow:inset 0 0 0 1px #ed615a88,0 8px 20px -10px #ed615a;color:#fff}
.abd-ask button[aria-pressed=true]{background:#ed615a24;box-shadow:inset 0 0 0 1px #ed615a;color:#fff}
.abd-comp{position:relative;margin:0 12px 6px;height:54px;flex:none;border-radius:16px;border:1px solid transparent;display:flex;align-items:center;gap:10px;padding:0 8px 0 12px;font-size:11.5px;
  background:linear-gradient(#18181c,#18181c) padding-box,linear-gradient(120deg,#ed615a,#ffc0b8 30%,#ed615a66 60%,#ed615a) border-box;box-shadow:0 0 26px -10px #ed615a}
.abd-comp .ico{display:flex;gap:9px;color:#eeebe466}
.abd-comp .txt{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.abd-comp .ph{color:#eeebe452}
.abd-mic{width:28px;height:28px;border-radius:9px;display:grid;place-items:center;color:#eeebe499;transition:all .3s}
.abd-mic:hover,.abd-mic[aria-pressed=true]{color:#fff;background:#e0336a33;box-shadow:inset 0 0 0 1px #e0336a99}
.abd-caret{display:inline-block;width:1.5px;height:13px;margin-left:1px;vertical-align:-2px;background:#ffc0b8;animation:abd-blink 1s steps(1) infinite}
.abd-send{width:30px;height:30px;flex:none;border-radius:50%;display:grid;place-items:center;background:#ed615a;color:#1a0605;transition:transform .3s cubic-bezier(.19,1,.22,1)}
.abd-send:hover{transform:scale(1.08)}
.abd-hud{height:32px;flex:none;display:flex;align-items:center;gap:10px;padding:0 12px 8px;font:9.5px/1 'Geist Mono',ui-monospace,monospace;color:#eeebe480}
.abd-model{display:flex;align-items:center;gap:6px;padding:5px 8px;border-radius:8px;background:#ffffff0a;box-shadow:inset 0 0 0 1px #ffffff17;color:#eeebe4dd}
.abd-model img{width:12px;height:12px;border-radius:3px}
.abd-ring{display:inline-block;width:13px;height:13px;border-radius:50%;background:conic-gradient(#6fdc95 calc(var(--p)*1%),#ffffff1c 0);
  -webkit-mask:radial-gradient(circle,transparent 3.5px,#000 4px);mask:radial-gradient(circle,transparent 3.5px,#000 4px)}
.abd-hud .sp{display:flex;align-items:center;gap:5px}
.abd-hud .rt{margin-left:auto;color:#63b3ed}
/* main: CLI */
.abd-cli{flex:1;min-height:0;margin:10px 12px 12px;display:flex;flex-direction:column;gap:8px}
.abd-harness{display:flex;gap:6px}
.abd-harness button,.abd-harness span{display:flex;align-items:center;gap:7px;height:30px;padding:0 11px;border-radius:9px;font-size:11px;color:#eeebe4a6;background:#ffffff08;
  box-shadow:inset 0 0 0 1px #ffffff14;transition:all .35s cubic-bezier(.19,1,.22,1)}
.abd-harness button:hover{color:#fff;transform:translateY(-1px)}
.abd-harness button[aria-pressed=true]{color:#fff;background:#ffffff12;box-shadow:inset 0 0 0 1px var(--a),0 0 18px -6px var(--a)}
.abd-harness img{width:14px;height:14px;border-radius:4px}
.abd-harness span{color:#eeebe470;box-shadow:inset 0 0 0 1px #ffffff12;border-style:dashed}
.abd-term{flex:1;min-height:0;border-radius:12px;background:#0b0b0d;box-shadow:inset 0 0 0 1px #ffffff14;padding:16px 18px;font:11.5px/1.85 'Geist Mono',ui-monospace,monospace;color:#d8d6d0;overflow:hidden}
.abd-term .box{border:1px solid var(--a);border-radius:8px;padding:6px 12px;margin-bottom:12px;color:#eeebe4b3;white-space:pre}
.abd-term .box b{color:var(--a);font-weight:500}
.abd-term p{margin:0;white-space:pre;animation:abd-up .35s cubic-bezier(.19,1,.22,1) both}
.abd-term .pr{color:var(--a)}
.abd-term .dim{color:#8a8880}
.abd-term .ok{color:#6fdc95}
/* main: a page in the browser */
.abd-page{flex:1;position:relative;overflow:hidden;margin:10px 12px 12px;border-radius:12px;box-shadow:0 0 0 1px #ffffff14;
  background:radial-gradient(70% 60% at 50% 115%,#FF6A1A4d,transparent 70%),#00030a;transition:opacity .6s;animation:abd-in .5s cubic-bezier(.19,1,.22,1)}
.abd-load{position:absolute;left:0;top:0;height:2px;width:100%;background:linear-gradient(90deg,#ed615a,#FF6A1A,#FFC24B);transform-origin:0 50%;transition:transform .2s linear,opacity .5s}
.abd-pnav{display:flex;align-items:center;gap:10px;margin:14px 16px;padding:8px 12px;border-radius:10px;box-shadow:inset 0 0 0 1px #FF2D5559,0 0 18px -6px #FF2D55}
.abd-pnav i{width:26px;height:4px;border-radius:2px;background:#ffffff26}.abd-pnav b{margin-left:auto;width:46px;height:14px;border-radius:5px;background:#fff}
.abd-ph{text-align:center;margin-top:46px;font-size:22px;font-weight:600;letter-spacing:-.035em;line-height:1.15;color:#fff}
.abd-pp{text-align:center;margin:10px auto 0;max-width:280px;font-size:10.5px;line-height:1.5;color:#eeebe480}
.abd-pcards{position:absolute;left:22px;right:22px;bottom:22px;display:flex;gap:10px}
.abd-pcards span{flex:1;height:90px;border-radius:10px;background:#ffffff08;box-shadow:inset 0 0 0 1px #ffffff14;display:grid;place-items:center}
/* voice: SISO Voice's floating bar */
.abd-voice{position:absolute;left:50%;top:12px;z-index:8;display:flex;align-items:center;gap:10px;height:40px;padding:0 6px 0 14px;border-radius:99px;transform:translateX(-50%);
  background:#1a1a20f2;box-shadow:0 0 0 1px #ffffff1f,0 14px 34px -10px #000,0 0 30px -8px #e0336a;animation:abd-pop .45s cubic-bezier(.19,1,.22,1)}
.abd-voice .dot{width:8px;height:8px;border-radius:50%;background:#ff5d8f;box-shadow:0 0 10px #ff5d8f;animation:abd-blink 1.2s steps(1) infinite}
.abd-wave{display:flex;align-items:center;gap:2px;height:22px}
.abd-wave i{width:2px;border-radius:2px;background:linear-gradient(#ff8fb1,#b45cff);height:var(--h);animation:abd-wave .9s ease-in-out infinite alternate;animation-delay:var(--d)}
.abd-voice time{font:500 11px/1 'Geist Mono',ui-monospace,monospace;color:#eeebe4cc;min-width:28px}
.abd-voice .x,.abd-voice .ok{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-size:13px}
.abd-voice .x{background:#ffffff12;color:#eeebe4b3}.abd-voice .ok{background:#FFB547;color:#1a0d00}
.abd-voice-note{position:absolute;left:50%;top:58px;z-index:8;transform:translateX(-50%);font-size:10px;color:#eeebe499;white-space:nowrap}
/* modules (the old demo's tray, now the side nav) */
.abd-mods{display:flex;flex-direction:column;gap:6px;animation:abd-in .5s cubic-bezier(.19,1,.22,1)}
.abd-mods>small{font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#eeebe466;padding:4px 6px 6px}
.abd-mod{display:flex;align-items:center;gap:9px;width:100%;padding:7px 8px;border-radius:11px;transition:background .25s,box-shadow .25s}
.abd-mod:hover{background:#ffffff0a}
.abd-mod[aria-current=true]{background:#ffffff10;box-shadow:inset 0 0 0 1px #ffffff1a}
.abd-mod span:nth-child(2){display:flex;flex-direction:column;gap:3px;flex:1;min-width:0;font-size:11.5px;color:#fff}
.abd-mod small{font-size:9.5px;color:#eeebe47a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.abd-sw{flex:none;width:26px;height:15px;border-radius:99px;background:#ffffff1f;position:relative;transition:background .3s}
.abd-sw::after{content:'';position:absolute;left:2px;top:2px;width:11px;height:11px;border-radius:50%;background:#eeebe4;transition:transform .3s cubic-bezier(.19,1,.22,1)}
.abd-sw[aria-checked=true]{background:#ed615a}.abd-sw[aria-checked=true]::after{transform:translateX(11px)}
.abd-mod-core{margin-top:6px;padding:9px 8px;border-radius:11px;border:1px dashed #ffffff1f;font-size:10.5px;color:#eeebe48c;display:flex;align-items:center;gap:8px}
.abd-pane{flex:1;margin:10px 12px 12px;border-radius:12px;background:#0d0d10;box-shadow:inset 0 0 0 1px #ffffff12;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:18px;text-align:center;animation:abd-up .45s cubic-bezier(.19,1,.22,1) both}
.abd-pane small{font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#eeebe466}
.abd-pane h4{margin:0;font:600 20px/1.15 Inter,sans-serif;letter-spacing:-.03em;color:#fff}
.abd-pane .off{font-size:11px;color:#eeebe48c}
.abd-qr{position:relative;width:132px;height:132px;border-radius:14px;background:#eeebe4;padding:10px;display:grid;place-items:center;transition:background .5s}
.abd-qr.ok{background:#1d3a28}
.abd-qr .px{display:grid;grid-template-columns:repeat(13,1fr);gap:1px;width:100%;height:100%}
.abd-qr .px i{background:#111}
.abd-qr .ok-mark{font-size:44px;color:#6fdc95;animation:abd-pop2 .5s cubic-bezier(.19,1,.22,1)}
.abd-act{padding:7px 12px;border-radius:9px;background:#ffffff0d;box-shadow:inset 0 0 0 1px #ffffff1f;font-size:11px;transition:all .3s cubic-bezier(.19,1,.22,1)}
.abd-act:hover{transform:translateY(-2px);box-shadow:inset 0 0 0 1px #ed615a99,0 8px 18px -10px #ed615a}
.abd-list{width:100%;display:flex;flex-direction:column;gap:6px;text-align:left}
.abd-li{display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:10px;background:#ffffff07;box-shadow:inset 0 0 0 1px #ffffff12;font-size:11px;animation:abd-up .4s cubic-bezier(.19,1,.22,1) both}
.abd-li b{font:500 10.5px/1.2 'Geist Mono',ui-monospace,monospace;color:#fff;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.abd-li em{font-style:normal;color:#eeebe47a;font-size:10px}
.abd-li .pin{font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;color:#63b3ed}.abd-li .pin.ok{color:#6fdc95}
.abd-search{width:100%;height:34px;border-radius:10px;background:#ffffff0a;box-shadow:inset 0 0 0 1px #7540b799,0 0 18px -8px #7540b7;display:flex;align-items:center;gap:8px;padding:0 12px;font-size:11.5px;text-align:left}
@keyframes abd-pop2{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:none}}
@keyframes abd-spin{to{transform:rotate(360deg)}}
@keyframes abd-blink{50%{opacity:0}}
@keyframes abd-up{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes abd-in{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:none}}
@keyframes abd-pop{from{opacity:0;transform:translate(-50%,-8px) scale(.94)}to{opacity:1;transform:translate(-50%,0)}}
@keyframes abd-wave{from{transform:scaleY(.25)}to{transform:scaleY(1)}}
.abd:not([data-live]) *{animation-play-state:paused!important}
@media (max-width:991px){.abd{height:auto;aspect-ratio:752/640}}
@media (prefers-reduced-motion:reduce){.abd *{animation:none!important;transition:none!important}}
`;

function Svg({ children, size = 15 }: { children: ReactNode; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
}
const MicIcon = () => <Svg><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></Svg>;

function Favicon({ src }: { src: string }) {
  if (src === 'lion') return <WorkspaceMark brand="siso-agency" size={18} />;
  if (src === 'gh') return <span style={{ color: '#fff', display: 'grid' }}><GitHubMark size={15} /></span>;
  if (src === 'web') return <LivingIcon name="web" size={20} variant="glyph" />;
  return <img loading="lazy" decoding="async" src={src} alt="" />;
}

function Face({ id, size = 18, paused }: { id: AgentId; size?: number; paused: boolean }) {
  const a = AGENTS[id];
  return <AgentFace name={a.name} family={a.family} status={STATUS[a.mark]} size={size} paused={paused} />;
}

const WAVE = Array.from({ length: 26 }, (_, i) => ({ h: 6 + ((i * 37) % 17), d: (i * 73) % 900 }));

type Voice = 'idle' | 'rec' | 'sending' | 'error';

/** t: ms since this tab began (held at AB_DUR when reduced motion). running: in view, so loops may play. */
export default function AgentBaseDemo({ tab, t, running, onVoice, tabs = AB_TABS }: { tab: number; t: number; running: boolean; onVoice?: () => void; tabs?: readonly AbTab[] }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [picked, setPicked] = useState<AgentId | null>(null);
  const [answer, setAnswer] = useState<number | null>(null);
  const [harness, setHarness] = useState<'claude' | 'codex' | null>(null);
  const [rail, setRail] = useState<number | null>(null);
  const [mod, setMod] = useState<ModKey | null>(null);
  const [modsOn, setModsOn] = useState<Record<ModKey, boolean>>({ whatsapp: true, estate: true, library: true });
  const [linked, setLinked] = useState<boolean | null>(null);
  // The real voice try-out: recorder state, elapsed seconds, and what Groq heard.
  const [voice, setVoice] = useState<Voice>('idle');
  const [secs, setSecs] = useState(0);
  const [heard, setHeard] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const rec = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const started = useRef(0);

  useEffect(() => {
    const el = box.current; if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(e.contentRect.width / 752, e.contentRect.height / 640)));
    ro.observe(el); return () => ro.disconnect();
  }, []);
  useEffect(() => { setPicked(null); setAnswer(null); setHarness(null); setMod(null); setLinked(null); }, [tab]);
  useEffect(() => {
    if (voice !== 'rec') return;
    const id = window.setInterval(() => {
      const s = Math.floor((Date.now() - started.current) / 1000); setSecs(s);
      if (s >= 15) rec.current?.stop();
    }, 250);
    return () => window.clearInterval(id);
  }, [voice]);
  useEffect(() => () => { rec.current?.stream.getTracks().forEach(track => track.stop()); }, []);

  async function startVoice() {
    onVoice?.();
    if (voice === 'rec') { rec.current?.stop(); return; }
    setHeard(null); setNote('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const r = new MediaRecorder(stream); rec.current = r; chunks.current = [];
      r.ondataavailable = e => { if (e.data.size) chunks.current.push(e.data); };
      r.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());
        if (voiceCancelled.current) { voiceCancelled.current = false; setVoice('idle'); return; }
        setVoice('sending');
        const blob = new Blob(chunks.current, { type: r.mimeType || 'audio/webm' });
        const form = new FormData(); form.append('file', blob, `clip.${(r.mimeType || 'audio/webm').includes('mp4') ? 'mp4' : 'webm'}`);
        try {
          const res = await fetch('/api/transcribe', { method: 'POST', body: form });
          const data = await res.json() as { text?: string; error?: string };
          if (!res.ok || !data.text) { setVoice('error'); setNote(data.error ?? 'Didn’t catch that'); return; }
          setHeard(data.text); setVoice('idle');
        } catch { setVoice('error'); setNote('Voice is offline here'); }
      };
      started.current = Date.now(); setSecs(0); r.start(); setVoice('rec');
    } catch { setVoice('error'); setNote('Allow the microphone to try it'); }
  }
  const voiceCancelled = useRef(false);
  function cancelVoice() { voiceCancelled.current = true; rec.current?.stop(); }

  const key = (tabs[tab] ?? tabs[0]).key;
  const tc = Math.min(t, AB_DUR);
  // Every agent in one place: walk the tree. Voice: talk to UI-HUB. Otherwise SISO-LANDING is open.
  const auto: AgentId = key === 'agents' ? (['landing', 'uihub', 'base'] as const)[Math.min(2, Math.floor(tc / 3000))] : key === 'voice' ? 'uihub' : 'landing';
  const open = picked ?? auto;
  const agent = AGENTS[open];
  const chat = CHATS[open];
  const browsing = key === 'browser';
  const cli = key === 'cli';
  const h = harness ?? (tc < 4500 ? 'claude' : 'codex');
  const hc = CLI[h];
  const ht = harness ? tc : tc % 4500;
  const typedAsk = ASK.slice(0, Math.max(0, Math.floor((ht - 400) / 45)));
  const cliLines = (hc.lines as readonly (readonly [string, string])[]).filter((_, i) => ht >= 1900 + i * 400);
  const pageTab = browsing && tc >= 600;
  const typedUrl = URL.slice(0, Math.max(0, Math.floor((tc - 900) / 40)));
  const load = Math.max(0, Math.min(1, (tc - 2200) / 1400));
  // Voice demo: the bar records for four seconds, the words land in the composer, then it sends.
  const demoRec = key === 'voice' && voice === 'idle' && heard === null && tc >= 500 && tc < 4300;
  const demoTyped = key === 'voice' && voice === 'idle' && heard === null && tc >= 4300 ? SAID.slice(0, Math.floor((tc - 4300) / 28)) : '';
  const demoSent = key === 'voice' && voice === 'idle' && heard === null && tc >= 6600;
  const showBar = demoRec || voice === 'rec' || voice === 'sending';
  const barSecs = voice === 'rec' || voice === 'sending' ? secs : Math.floor((tc - 500) / 1000);
  const modules = key === 'modules';
  // Modules: the tour shows each module for three seconds; clicking one keeps it open.
  const tourMod = MODS[Math.min(2, Math.floor(tc / 3000))].key;
  const shownMod: ModKey = mod ?? tourMod;
  const mt = mod ? tc : tc % 3000;
  const isLinked = linked ?? mt > 1600;
  const typedQuery = mod ? QUERY : QUERY.slice(0, Math.max(0, Math.floor((mt - 300) / 60)));
  const focus = key === 'agents' ? 'side' : key === 'cli' ? 'main' : key === 'browser' || modules ? 'side main' : 'main rail';
  const working = Object.values(AGENTS).filter(a => a.mark === 'working').length;

  const row = (id: AgentId) => <button type="button" className="abd-row is-agent" aria-current={open === id && !browsing} onClick={() => setPicked(id)}>
    <Face id={id} size={16} paused={!running} />{AGENTS[id].name}
  </button>;

  return (
    <div ref={box} className="abd" data-live={running || undefined}>
      <style>{CSS}</style>
      <div className="abd-stage" style={{ transform: `translate(-50%,-50%) scale(${scale})` }}>
        <div className="abd-crumb"><WorkspaceMark brand="agent-base" size={20} paused={!running} />Agent Base <span>/ {modules ? 'Modules' : browsing ? 'Browser' : agent.name}</span></div>

        <div className="abd-win" data-focus={focus}>
          <div className="abd-bar abd-zone" data-zone="main">
            <span className="abd-lights"><i /><i /><i /></span>
            <span className="abd-tab" aria-selected={!browsing}><Face id={open} size={13} paused={!running} />{agent.name}</span>
            {pageTab && <span className="abd-tab is-new" aria-selected><WorkspaceMark brand="siso-agency" size={12} />SISO Labs</span>}
            <span className="abd-tab" aria-hidden="true">+</span>
          </div>

          <div className="abd-body">
            <div className="abd-rail abd-zone" data-zone="rail">
              {RAIL.map((r, i) => <button type="button" key={r.key} className="abd-ri" data-name={r.label} aria-label={r.label}
                aria-pressed={(r.key === 'agents' && (key === 'agents' || key === 'cli')) || (r.key === 'web' && browsing) || (r.key === 'voice' && key === 'voice')}
                onPointerEnter={() => setRail(i)} onPointerLeave={() => setRail(null)} onClick={r.key === 'voice' ? startVoice : undefined}>
                {r.icon ? <LivingIcon name={r.icon} size={24} variant="glyph" active={rail === i} paused={!running} />
                  : <WorkspaceMark brand="agent-base" size={24} paused={!running} />}
              </button>).flatMap((b, i) => i === 1 ? [<hr key="hr" />, b] : [b])}
              {modules && MODS.filter(m => modsOn[m.key]).map(m => <button type="button" key={m.key} className="abd-ri" data-name={m.name} aria-label={m.name}
                aria-pressed={shownMod === m.key} onClick={() => setMod(m.key)}>
                <LivingIcon name={m.key} size={24} variant="glyph" active={shownMod === m.key} paused={!running} />
              </button>)}
            </div>

            <div className="abd-side abd-zone" data-zone="side">
              {modules ? <div className="abd-mods" key="mods">
                <small>Modules</small>
                {MODS.map(m => <div key={m.key} className="abd-mod" aria-current={shownMod === m.key && modsOn[m.key]}>
                  <button type="button" style={{ display: 'contents' }} onClick={() => { setMod(m.key); setModsOn(v => ({ ...v, [m.key]: true })); }}>
                    <LivingIcon name={m.key} size={26} paused={!running} />
                    <span>{m.name}<small>{m.sub}</small></span>
                  </button>
                  <button type="button" role="switch" className="abd-sw" aria-checked={modsOn[m.key]} aria-label={`${m.name} module`}
                    onClick={() => setModsOn(v => ({ ...v, [m.key]: !v[m.key] }))} />
                </div>)}
                <div className="abd-mod-core"><LivingIcon name="web" size={18} variant="glyph" paused={!running} />Browser and Voice: built in</div>
              </div> : browsing ? <div className="abd-arc" key="arc">
                <div className="abd-arc-nav"><span>◫</span><span>←</span><span>→</span><span>↻</span></div>
                <div className="abd-arc-url">{URL}</div>
                <div className="abd-pins">{PINS.map(p => <span key={p}><Favicon src={p} /></span>)}</div>
                <div className="abd-arc-new">+ New Tab</div>
                {TABS_ARC.map((tb, i) => <div key={tb.title} className="abd-arc-tab" aria-current={i === 0}><Favicon src={tb.icon} />{tb.title}</div>)}
              </div> : <div key="tree">
                <div className="abd-side-head"><WorkspaceMark brand="agent-base" size={20} paused={!running} />Agent Base <span className="chev">⌄</span></div>
                <div className="abd-panel">
                  <button type="button" className="abd-row is-zero" aria-current={open === 'zero'} onClick={() => setPicked('zero')}>
                    <Face id="zero" size={26} paused={!running} />Agent Zero<span className="ago"><span className="abd-mk" />now</span>
                  </button>
                  <ul className="abd-tree" style={{ ['--l' as string]: '#5fb3e8', marginLeft: 18 } as CSSProperties}>
                    <li><div className="abd-row"><WorkspaceMark brand="siso-agency" size={18} paused={!running} />SISO Agency<span className="abd-count">3</span><span className="abd-chev">⌄</span></div>
                      <ul style={{ ['--l' as string]: '#d4895a' } as CSSProperties}>
                        <li>{row('landing')}</li>
                        <li>{row('image')}</li>
                        <li><div className="abd-row"><WorkspaceMark brand="agent-base" size={18} paused={!running} />Agent Base<span className="abd-count">1</span></div>
                          <ul style={{ ['--l' as string]: '#7aa2ff' } as CSSProperties}><li>{row('base')}</li></ul></li>
                      </ul></li>
                    <li><div className="abd-row"><ProductGlyph product="ui-hub" size={18} />UI Hub<span className="abd-count">1</span></div>
                      <ul style={{ ['--l' as string]: '#8fb4ff' } as CSSProperties}><li>{row('uihub')}</li></ul></li>
                    <li><div className="abd-row"><LivingIcon name="web" size={20} variant="glyph" paused={!running} />Research<span className="abd-count">1</span></div>
                      <ul style={{ ['--l' as string]: '#5fb3e8' } as CSSProperties}><li>{row('research')}</li></ul></li>
                  </ul>
                </div>
                <div className="abd-side-foot"><span>› Agents <b>{working} working</b></span><span>› Agencies <b>1 working</b></span></div>
              </div>}
            </div>

            <div className="abd-main abd-zone" data-zone="main">
              {showBar && <div className="abd-voice" role="status" aria-label="Recording">
                <span className="dot" /><span className="abd-wave">{WAVE.map((w, i) => <i key={i} style={{ ['--h' as string]: `${w.h}px`, ['--d' as string]: `-${w.d}ms` } as CSSProperties} />)}</span>
                <time>0:{String(Math.max(0, barSecs)).padStart(2, '0')}</time>
                <button type="button" className="x" aria-label="Cancel" onClick={cancelVoice}>✕</button>
                <button type="button" className="ok" aria-label="Done" onClick={() => rec.current?.stop()}>{voice === 'sending' ? '…' : '✓'}</button>
              </div>}
              {(voice === 'error' || (key === 'voice' && !showBar && heard === null && voice === 'idle')) && <div className="abd-voice-note">{voice === 'error' ? note : 'Click the mic to try it yourself'}</div>}

              {modules ? (!modsOn[shownMod] ? <div className="abd-pane" key="off"><small>{MODS.find(m => m.key === shownMod)?.name}</small><h4>Switched off</h4><p className="off">Off the rail until you switch it back on.</p></div>
                : shownMod === 'whatsapp' ? <div className="abd-pane" key="wa">
                  <small>WhatsApp · sample connection</small><h4>{isLinked ? 'Connected' : 'Scan to connect'}</h4>
                  <div className={isLinked ? 'abd-qr ok' : 'abd-qr'} aria-label="Illustrative QR code">{isLinked ? <span className="ok-mark">✓</span>
                    : <div className="px">{Array.from({ length: 169 }, (_, i) => <i key={i} style={{ opacity: (i * 7 + Math.floor(i / 13) * 3) % 5 < 3 ? 1 : 0 }} />)}</div>}</div>
                  <button type="button" className="abd-act" onClick={() => { setMod('whatsapp'); setLinked(!isLinked); }}>{isLinked ? 'Replay connection' : 'Try sample connection'} →</button>
                </div>
                : shownMod === 'estate' ? <div className="abd-pane" key="es">
                  <small>Estate · sample pinning</small><h4>A home for every repo.</h4>
                  <div className="abd-list">{PINNED.map((r, i) => <div className="abd-li" key={r} style={{ animationDelay: `${i * 120}ms` }}>
                    <LivingIcon name="estate" size={18} variant="glyph" paused={!running} /><b>{r}</b>
                    <span className={mt > 700 + i * 450 ? 'pin ok' : 'pin'}>{mt > 700 + i * 450 ? '✓ Pinned' : 'Pinning…'}</span></div>)}</div>
                  <p className="off">Pinned nightly, on every machine</p>
                </div>
                : <div className="abd-pane" key="lib">
                  <small>Great Library · sample search</small><h4>Keep the best.</h4>
                  <div className="abd-search"><LivingIcon name="library" size={18} variant="glyph" paused={!running} />{typedQuery}{typedQuery.length < QUERY.length && <span className="abd-caret" />}</div>
                  <div className="abd-list">{typedQuery.length >= QUERY.length && FOUND.map(([r, why], i) => <div className="abd-li" key={r} style={{ animationDelay: `${i * 110}ms` }}><b>{r}</b><em>{why}</em></div>)}</div>
                  <p className="off">23,778 rated repos</p>
                </div>)
              : browsing ? <div className="abd-page" style={{ opacity: load >= 1 ? 1 : 0.35 }}>
                <span className="abd-load" style={{ transform: `scaleX(${load})`, opacity: load >= 1 ? 0 : 1 }} />
                <div className="abd-pnav"><WorkspaceMark brand="siso-agency" size={14} /><i /><i /><i /><b /></div>
                <div className="abd-ph">Build on everything<br />that already works.</div>
                <div className="abd-pp">{typedUrl.length < URL.length ? `Opening ${typedUrl}…` : 'The UI we reuse, the OS our agents run on, and the library behind both.'}</div>
                <div className="abd-pcards">{(['ui-hub', 'os', 'library'] as const).map(p => <span key={p}><ProductGlyph product={p} size={40} /></span>)}</div>
              </div> : cli ? <div className="abd-cli">
                <div className="abd-harness">
                  {(['claude', 'codex'] as const).map(k => <button type="button" key={k} aria-pressed={h === k} style={{ ['--a' as string]: CLI[k].accent } as CSSProperties}
                    onClick={() => setHarness(k)}><img loading="lazy" decoding="async" src={CLI[k].logo} alt="" />{CLI[k].name}</button>)}
                  <span>+ any terminal agent</span>
                </div>
                <div className="abd-term" key={h} style={{ ['--a' as string]: hc.accent } as CSSProperties}>
                  <div className="box"><b>{hc.head[0]}</b>{'\n'}{hc.head[1]}</div>
                  <p><span className="pr">{hc.prompt}</span> {typedAsk}{typedAsk.length < ASK.length && <span className="abd-caret" />}</p>
                  {cliLines.map(([m, text], i) => <p key={i} className={m.trim() === '⎿' || m.trim() === '└' ? 'dim' : undefined}>
                    <span className={i === cliLines.length - 1 && cliLines.length === hc.lines.length ? 'ok' : 'pr'}>{m}</span> {text}</p>)}
                </div>
              </div> : <>
                <div className="abd-mhead">
                  <Face id={open} size={22} paused={!running} />
                  <span className="abd-name">{agent.name.toUpperCase()}</span>
                  <span className="abd-state"><i />{agent.mark === 'working' ? 'Working · ' + agent.ago : agent.mark === 'needs' ? 'Needs you' : 'Idle · ' + agent.ago}</span>
                  <span className="abd-hbtn"><i /><i /></span>
                </div>
                <div className="abd-chat" key={open + (demoSent ? '-v' : '') + (heard ?? '')}>
                  <div className="abd-you">{chat.you}</div>
                  <div className="abd-steps"><b>{chat.steps.length} steps</b><i />{chat.steps[chat.steps.length - 1]}</div>
                  <div className="abd-card"><small>{chat.title}</small><ul>{chat.points.map(p => <li key={p}>{p}</li>)}</ul>
                    {chat.ask && <div className="abd-ask">{chat.ask.map((o, j) => <button type="button" key={o} aria-pressed={answer === j} onClick={() => setAnswer(j)}>{o}</button>)}</div>}
                  </div>
                  {answer !== null && <div className="abd-you">{chat.ask?.[answer]}, please.</div>}
                  {(demoSent || heard) && <div className="abd-you">{heard ?? SAID}</div>}
                  {(demoSent || heard) && <div className="abd-steps"><b>On it</b><i />{heard ? 'Heard you through SISO Voice' : 'Installing the grouped palette'}</div>}
                </div>
                <div className="abd-comp">
                  <span className="ico"><Svg size={14}><path d="m21 12-8.5 8.5a6 6 0 0 1-8.5-8.5L13 3.5a4 4 0 0 1 5.7 5.7L10 18" /></Svg></span>
                  <span className="txt">{demoTyped && !demoSent ? <>{demoTyped}<span className="abd-caret" /></> : <span className="ph">Ask {agent.nice} anything</span>}</span>
                  <button type="button" className="abd-mic" aria-label={voice === 'rec' ? 'Stop recording' : 'Talk with SISO Voice'} aria-pressed={voice === 'rec'} onClick={startVoice}><MicIcon /></button>
                  <span className="abd-send"><Svg size={14}><path d="M12 19V5M6 11l6-6 6 6" /></Svg></span>
                </div>
                <div className="abd-hud">
                  <span className="abd-model"><img loading="lazy" decoding="async" src={agent.family === 'claude' ? CLI.claude.logo : CLI.codex.logo} alt="" />{agent.family === 'claude' ? CLI.claude.model : CLI.codex.model} · 1M</span>
                  <span className="sp">ctx 6%</span>
                  <span className="sp"><span className="abd-ring" style={{ ['--p' as string]: 41 } as CSSProperties} />41%</span>
                  <span className="sp"><span className="abd-ring" style={{ ['--p' as string]: 63 } as CSSProperties} />63%</span>
                  <span className="rt">{working} working</span>
                </div>
              </>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
