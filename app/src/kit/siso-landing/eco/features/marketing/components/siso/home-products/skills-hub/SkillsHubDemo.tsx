// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/home-products/skills-hub/SkillsHubDemo.tsx)
'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import HUB from '../../../../data/skills-hub.json';
import { ProductGlyph, type Product } from '../../ProductGlyph';
import { GitHubMark } from '../../ui/GitHubButton';
import { SkillsHubMark } from './SkillsHubIcon';

// A working miniature of the Skills Hub (sisodias/siso-skills-hub). Shaan, 9 Oct: "Agent Skills Hub where we've indexed every
// single skill on the planet and MCP and then distilled it and we're using it in our systems and we give you our agent stack".
// Truth first: every skill, category, tag and command below comes from skills-hub.json (the public registry, 54 skills). The
// lifecycle checks are computed from those fields here, not scored. Nothing claims the index of every public skill; that is
// the "Indexing" row on the card, with no number.
// The stage is drawn at 752x640 and scaled to fit, so every position below is in stage pixels.

export const SH_TABS = [
  { key: 'hub', label: 'Every skill in one hub', desc: 'Browse the 54 by category, then click one to open its card.' },
  { key: 'install', label: 'Install in one line', desc: 'The real CLI. One command puts a skill in your agent’s kit.' },
  { key: 'checked', label: 'Distilled and checked', desc: 'Each skill is written, registered, installed and health-checked.' },
  { key: 'stack', label: 'Our agent stack', desc: 'Skills Hub, Agent Base, UI Hub, Great Library and SISO Voice. Open source.' },
] as const;
export const SH_DUR = 9000;

type Skill = (typeof HUB.skills)[number];
const SKILLS: Skill[] = HUB.skills;
const BY_ID = new Map(SKILLS.map(s => [s.skill_id, s]));
const skill = (id: string) => BY_ID.get(id) ?? SKILLS[0];
const CATS = (Object.entries(HUB.categories) as [string, number][]).sort((a, b) => b[1] - a[1]);
const CAT_NAME: Record<string, string> = {
  global: 'Global', code: 'Code', devops: 'DevOps', system: 'System', pipeline: 'Pipeline', communication: 'Comms', data: 'Data', testing: 'Testing',
};
const IDS_UNIQUE = new Set(SKILLS.map(s => s.skill_id)).size;
const install = (id: string) => `python3 scripts/skills install ${id}`;
const REPO_PATH = HUB.repo.replace('https://github.com/', '');

// The hub view walks three shelves, then opens a card.
const WALK = ['code', 'devops', 'global'];
const WALK_OPEN = 'prove-before-claim';
// Install view: two real skills per pass, and the registry's own commands beside them.
const INSTALL_IDS = ['gitsearch', 'playwright', 'websearch', 'prove-before-claim', 'publish'];
// Lifecycle view: the four steps, each drawn from the registry fields.
const STAGES = [
  { key: 'author', label: 'Author', sub: 'SKILL.md' },
  { key: 'register', label: 'Register', sub: 'registry entry' },
  { key: 'install', label: 'Install', sub: 'one command' },
  { key: 'health', label: 'Health', sub: 'checks pass' },
] as const;
const LIFE_IDS = ['prove-before-claim', 'gitsearch', 'playwright'];

type Layer = { name: string; role: string; href: string; glyph: Product | 'skills'; color: string };
const STACK: Layer[] = [
  { name: 'SISO Voice', role: 'Talk to your agents instead of typing', href: '/voice/', glyph: 'voice', color: '#e0336a' },
  { name: 'Agent Base', role: 'The OS they run in, every agent in one place', href: '/agent-base/', glyph: 'os', color: '#ed615a' },
  { name: 'Skills Hub', role: 'What they know how to do: 54 skills', href: HUB.repo, glyph: 'skills', color: '#f5a524' },
  { name: 'UI Hub', role: 'The UI they reuse, from credited libraries', href: '/ui-hub/', glyph: 'ui-hub', color: '#1f69ff' },
  { name: 'Great Library', role: 'The research behind it: rated repos and people', href: '/great-library/', glyph: 'library', color: '#7540b7' },
];

const CSS = `
.shd{position:relative;width:100%;height:100%;overflow:hidden;isolation:isolate;color:#f3efe6;font-family:Inter,sans-serif;
  background:radial-gradient(55% 40% at 50% -4%,#ffe0a3a6,transparent 70%),radial-gradient(60% 50% at 80% 110%,#ffc25c66,transparent 70%),
    linear-gradient(160deg,#3a2203 0%,#9a5e08 30%,#e0921a 58%,#f5a524 72%,#b8720c 88%,#2a1a02 100%)}
.shd-stage{position:absolute;left:50%;top:50%;width:752px;height:640px;transform-origin:50% 50%}
.shd-stage *{box-sizing:border-box}
:where(.shd) button{font:inherit;color:inherit;border:0;background:none;padding:0;cursor:pointer;text-align:inherit}
:where(.shd) a{color:inherit;text-decoration:none}
.shd-crumb{position:absolute;top:18px;left:26px;right:26px;display:flex;align-items:center;gap:9px;font-size:13px;font-weight:600;color:#fff;text-shadow:0 1px 12px #0006}
.shd-crumb span{font-weight:400;color:#ffffffb3}
.shd-crumb a{margin-left:auto;display:flex;align-items:center;gap:7px;font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;color:#fff;padding:6px 9px;border-radius:8px;background:#2a1a0259;box-shadow:inset 0 0 0 1px #ffffff2e;text-shadow:none;transition:background .35s,transform .35s cubic-bezier(.19,1,.22,1)}
.shd-crumb a:hover{background:#2a1a0299;transform:translateY(-1px)}
.shd-win{position:absolute;left:24px;top:54px;width:704px;height:566px;border-radius:16px;background:#121110;overflow:hidden;
  box-shadow:0 0 0 1px #ffffff1f,0 40px 90px -20px #1a0f00,0 10px 30px -10px #0009}
.shd-bar{position:absolute;inset:0 0 auto 0;height:40px;display:flex;align-items:center;gap:10px;padding:0 12px;border-bottom:1px solid #ffffff0f;background:#171614}
.shd-lights{display:flex;gap:6px;margin-right:6px}.shd-lights i{width:9px;height:9px;border-radius:50%;background:#ffffff24}
.shd-search{flex:1;height:26px;display:flex;align-items:center;gap:8px;padding:0 10px;border-radius:8px;background:#ffffff08;box-shadow:inset 0 0 0 1px #ffffff12;font-size:11.5px;color:#f3efe673}
.shd-search b{font-weight:500;color:#f3efe6}
.shd-pill{font:500 10px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.06em;color:#ffe0a3;padding:5px 8px;border-radius:7px;background:#f5a5241a;box-shadow:inset 0 0 0 1px #f5a52459}
.shd-body{position:absolute;inset:40px 0 0 0;display:flex}
.shd-in{animation:shd-in .5s cubic-bezier(.19,1,.22,1) both}
/* hub: shelves + cards */
.shd-shelves{width:176px;flex:none;padding:12px 10px;border-right:1px solid #ffffff0d;background:#151412;display:flex;flex-direction:column;gap:2px}
.shd-shelves small{font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#f3efe666;padding:6px 8px 8px}
.shd-cat{display:flex;align-items:center;gap:8px;height:30px;padding:0 9px;border-radius:9px;font-size:12px;color:#f3efe6b3;transition:background .3s,color .3s,box-shadow .3s}
.shd-cat:hover{background:#ffffff0a;color:#fff}
.shd-cat[aria-pressed=true]{background:#f5a5241f;color:#fff;box-shadow:inset 0 0 0 1px #f5a52466}
.shd-cat em{margin-left:auto;font:500 10px/1 'Geist Mono',ui-monospace,monospace;font-style:normal;color:#f3efe680;font-variant-numeric:tabular-nums}
.shd-cat[aria-pressed=true] em{color:#ffe0a3}
.shd-cat i{width:6px;height:6px;border-radius:2px;background:#f3efe640;transition:background .3s,box-shadow .3s}
.shd-cat[aria-pressed=true] i{background:#f5a524;box-shadow:0 0 8px #f5a524}
.shd-main{flex:1;min-width:0;position:relative;padding:14px 16px}
.shd-head{display:flex;align-items:baseline;gap:10px;margin-bottom:12px}
.shd-head strong{font-size:17px;font-weight:600;letter-spacing:-.02em;color:#fff}
.shd-head span{font:500 10px/1 'Geist Mono',ui-monospace,monospace;color:#f3efe673;letter-spacing:.08em;text-transform:uppercase}
.shd-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.shd-card{position:relative;height:112px;padding:12px 13px;border-radius:12px;background:#1a1916;box-shadow:inset 0 0 0 1px #ffffff12;display:flex;flex-direction:column;gap:6px;
  animation:shd-up .45s cubic-bezier(.19,1,.22,1) both;transition:transform .35s cubic-bezier(.19,1,.22,1),box-shadow .35s,background .35s}
.shd-card:hover{transform:translateY(-2px);background:#1f1d19;box-shadow:inset 0 0 0 1px #f5a52480,0 12px 26px -14px #f5a524}
.shd-card b{font-size:12.5px;font-weight:600;color:#fff;letter-spacing:-.01em}
.shd-card p{margin:0;font-size:10.5px;line-height:1.45;color:#f3efe68c;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.shd-tags{margin-top:auto;display:flex;gap:5px;flex-wrap:nowrap;overflow:hidden}
.shd-tags span{flex:none;font:500 9px/1 'Geist Mono',ui-monospace,monospace;color:#ffe0a3cc;padding:4px 6px;border-radius:6px;background:#f5a52414}
.shd-more{position:absolute;left:16px;right:16px;bottom:14px;display:flex;justify-content:space-between;font:500 10px/1 'Geist Mono',ui-monospace,monospace;color:#f3efe666;letter-spacing:.06em}
/* the open skill card */
.shd-open{position:absolute;inset:14px 16px;border-radius:14px;padding:20px 22px;display:flex;flex-direction:column;gap:12px;
  background:radial-gradient(80% 60% at 100% 0%,#f5a52426,transparent 70%),#1a1916;box-shadow:inset 0 0 0 1px #f5a52466,0 0 40px -16px #f5a524;animation:shd-pop .5s cubic-bezier(.19,1,.22,1) both}
.shd-open .back{align-self:flex-start;font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;color:#f3efe699;padding:6px 8px;border-radius:7px;transition:background .3s,color .3s}
.shd-open .back:hover{background:#ffffff0d;color:#fff}
.shd-open h4{margin:0;font-size:26px;font-weight:600;letter-spacing:-.035em;color:#fff;line-height:1.1}
.shd-open code{font:500 11px/1 'Geist Mono',ui-monospace,monospace;color:#ffe0a3}
.shd-open p{margin:0;font-size:13px;line-height:1.6;color:#f3efe6bf;max-width:440px}
.shd-open .shd-tags{margin-top:0;flex-wrap:wrap}
.shd-open .shd-tags span{font-size:10px;padding:5px 8px}
.shd-cmd{margin-top:auto;display:flex;align-items:center;gap:10px;height:44px;padding:0 6px 0 14px;border-radius:11px;background:#0c0b0a;box-shadow:inset 0 0 0 1px #ffffff17;
  font:12px/1 'Geist Mono',ui-monospace,monospace;color:#e8e4da;white-space:nowrap;overflow:hidden}
.shd-cmd .pr{color:#f5a524}
.shd-cmd .tx{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis}
.shd-copy{flex:none;height:32px;padding:0 12px;border-radius:8px;display:flex;align-items:center;gap:6px;font:600 11px/1 Inter,sans-serif;background:#f5a524;color:#2a1a02;
  transition:transform .3s cubic-bezier(.19,1,.22,1),box-shadow .3s}
.shd-copy:hover{transform:translateY(-1px);box-shadow:0 8px 20px -8px #f5a524}
/* install */
.shd-col{flex:1;min-width:0;padding:16px 18px;display:flex;flex-direction:column;gap:12px}
.shd-picks{display:flex;gap:6px;flex-wrap:wrap}
.shd-picks button{height:28px;padding:0 10px;border-radius:8px;font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;color:#f3efe6a6;background:#ffffff08;box-shadow:inset 0 0 0 1px #ffffff14;
  transition:all .35s cubic-bezier(.19,1,.22,1)}
.shd-picks button:hover{color:#fff;transform:translateY(-1px)}
.shd-picks button[aria-pressed=true]{color:#fff;background:#f5a5241f;box-shadow:inset 0 0 0 1px #f5a524,0 0 18px -6px #f5a524}
.shd-term{position:relative;border-radius:12px;background:#0b0a09;box-shadow:inset 0 0 0 1px #ffffff14;padding:14px 16px 16px;font:12.5px/1.8 'Geist Mono',ui-monospace,monospace;color:#d8d4ca}
.shd-term .tt{display:flex;align-items:center;gap:6px;margin-bottom:10px;font-size:10px;color:#f3efe666;letter-spacing:.06em}
.shd-term .tt i{width:8px;height:8px;border-radius:50%;background:#ffffff1f}
.shd-term .tt span{margin-left:8px}
.shd-term .ln{display:flex;align-items:center;gap:10px;white-space:nowrap}
.shd-term .ln .tx{flex:1;min-width:0;overflow:hidden}
.shd-term .pr{color:#f5a524}
.shd-caret{display:inline-block;width:7px;height:14px;margin-left:1px;vertical-align:-2px;background:#ffe0a3;animation:shd-blink 1s steps(1) infinite}
.shd-entry{border-radius:12px;background:#1a1916;box-shadow:inset 0 0 0 1px #ffffff12;padding:14px 16px;animation:shd-up .45s cubic-bezier(.19,1,.22,1) both}
.shd-entry small,.shd-cli small{display:block;font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#f3efe666;margin-bottom:10px}
.shd-entry b{display:block;font-size:16px;font-weight:600;color:#fff;letter-spacing:-.02em;margin-bottom:6px}
.shd-entry p{margin:0 0 10px;font-size:12px;line-height:1.55;color:#f3efe6a6}
.shd-cli{margin-top:4px}
.shd-cli div{display:flex;flex-direction:column;gap:4px}
.shd-cli button{display:flex;align-items:center;gap:10px;height:30px;padding:0 10px;border-radius:8px;font:11px/1 'Geist Mono',ui-monospace,monospace;color:#f3efe699;transition:background .3s,color .3s}
.shd-cli button:hover,.shd-cli button[aria-pressed=true]{background:#ffffff0a;color:#fff}
.shd-cli button .pr{color:#f5a524}
.shd-cli button em{margin-left:auto;font-style:normal;opacity:0;transition:opacity .3s,transform .3s;transform:translateX(-4px)}
.shd-cli button:hover em{opacity:1;transform:none}
/* lifecycle */
.shd-life{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding-top:4px}
.shd-life::before{content:'';position:absolute;left:12%;right:12%;top:30px;height:2px;background:#ffffff14;border-radius:2px}
.shd-life .fill{position:absolute;left:12%;top:30px;height:2px;border-radius:2px;background:linear-gradient(90deg,#f5a524,#ffe0a3);box-shadow:0 0 10px #f5a524;
  transition:width .6s cubic-bezier(.19,1,.22,1)}
.shd-node{position:relative;display:flex;flex-direction:column;align-items:center;gap:8px;padding:4px 0 8px;border-radius:12px;transition:background .3s}
.shd-node:hover{background:#ffffff06}
.shd-node .dot{width:52px;height:52px;border-radius:15px;display:grid;place-items:center;background:#1a1916;box-shadow:inset 0 0 0 1px #ffffff1a;color:#f3efe680;
  transition:all .5s cubic-bezier(.19,1,.22,1)}
.shd-node[data-on] .dot{color:#2a1a02;background:#f5a524;box-shadow:0 0 0 4px #f5a5241f,0 0 26px -4px #f5a524}
.shd-node[aria-pressed=true] .dot{transform:translateY(-3px) scale(1.06)}
.shd-node b{font-size:12.5px;font-weight:600;color:#fff}
.shd-node span{font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;color:#f3efe673;letter-spacing:.06em}
.shd-file{min-height:150px;border-radius:12px;background:#0b0a09;box-shadow:inset 0 0 0 1px #ffffff14;padding:16px 18px;font:12px/1.75 'Geist Mono',ui-monospace,monospace;color:#d8d4ca;overflow:hidden;
  animation:shd-up .45s cubic-bezier(.19,1,.22,1) both}
.shd-file .fh{display:flex;justify-content:space-between;margin-bottom:10px;font-size:10px;letter-spacing:.08em;color:#f3efe666;text-transform:uppercase}
.shd-file p{margin:0;white-space:pre-wrap;word-break:break-word}
.shd-file .k{color:#f5a524}.shd-file .s{color:#ffe0a3}.shd-file .d{color:#8a857a}.shd-file .ok{color:#7fdc9a}
.shd-file .row{display:flex;gap:10px;align-items:baseline}
.shd-hub{margin-top:auto;display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.shd-hub div{padding:14px 14px 12px;border-radius:12px;background:#1a1916;box-shadow:inset 0 0 0 1px #ffffff12;transition:box-shadow .35s,transform .35s cubic-bezier(.19,1,.22,1)}
.shd-hub div:hover{transform:translateY(-2px);box-shadow:inset 0 0 0 1px #f5a52466}
.shd-hub b{display:block;font-size:26px;font-weight:600;letter-spacing:-.04em;color:#fff;font-variant-numeric:tabular-nums}
.shd-hub b span{font-size:14px;color:#f3efe666;letter-spacing:-.01em}
.shd-hub small{display:block;margin-top:6px;font:500 9.5px/1.4 'Geist Mono',ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;color:#f3efe673}
.shd-hubcap{display:flex;justify-content:space-between;align-items:center;margin-top:auto;font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#f3efe666}
.shd-hubcap+.shd-hub{margin-top:0}
.shd-sib{display:flex;flex-direction:column;gap:8px;margin-top:auto}
.shd-sib small{font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#f3efe666}
.shd-sib div{display:flex;gap:6px;flex-wrap:wrap}
.shd-sib button{height:28px;padding:0 10px;border-radius:8px;font-size:11.5px;color:#f3efe6b3;background:#ffffff08;box-shadow:inset 0 0 0 1px #ffffff14;transition:all .35s cubic-bezier(.19,1,.22,1)}
.shd-sib button:hover{color:#fff;transform:translateY(-1px);box-shadow:inset 0 0 0 1px #f5a52480}
.shd-sib+.shd-cmd{margin-top:4px}
.shd-next{align-self:flex-start;font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;color:#f3efe699;padding:7px 9px;border-radius:7px;box-shadow:inset 0 0 0 1px #ffffff14;transition:all .3s}
.shd-next:hover{color:#fff;box-shadow:inset 0 0 0 1px #f5a52480}
/* stack */
.shd-stack{flex:1;padding:22px 28px;display:flex;flex-direction:column;gap:8px;perspective:1200px}
.shd-stack .cap{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px}
.shd-stack .cap strong{font-size:18px;font-weight:600;letter-spacing:-.025em;color:#fff}
.shd-stack .cap span{font:500 10px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;color:#f3efe673}
.shd-layer{position:relative;display:flex;align-items:center;gap:14px;height:76px;padding:0 18px 0 14px;border-radius:14px;
  background:linear-gradient(90deg,color-mix(in srgb,var(--c) 14%,#1a1916),#1a1916 60%);box-shadow:inset 0 0 0 1px #ffffff12,0 10px 24px -16px #000;
  transform:rotateX(14deg) translateZ(0);transform-origin:50% 100%;animation:shd-up .5s cubic-bezier(.19,1,.22,1) both;animation-delay:var(--dl);
  transition:transform .5s cubic-bezier(.19,1,.22,1),box-shadow .5s,background .5s}
.shd-layer[data-on]{transform:rotateX(0) translateZ(24px);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c) 70%,transparent),0 18px 40px -18px var(--c)}
.shd-layer .gl{flex:none;width:48px;height:48px;display:grid;place-items:center}
.shd-layer .tx{display:flex;flex-direction:column;gap:5px;min-width:0}
.shd-layer b{font-size:15.5px;font-weight:600;color:#fff;letter-spacing:-.015em}
.shd-layer small{font-size:11.5px;color:#f3efe68c}
.shd-layer em{margin-left:auto;font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;font-style:normal;color:#f3efe666;display:flex;align-items:center;gap:6px;transition:color .3s,transform .4s cubic-bezier(.19,1,.22,1)}
.shd-layer[data-on] em{color:#fff;transform:translateX(3px)}
.shd-layer.is-us{background:linear-gradient(90deg,#f5a52433,#1f1a10 70%)}
.shd-stack .foot{margin-top:auto;font:500 10px/1.5 'Geist Mono',ui-monospace,monospace;letter-spacing:.06em;color:#f3efe666;text-align:center}
@keyframes shd-blink{50%{opacity:0}}
@keyframes shd-up{from{opacity:0;transform:translateY(6px)}to{opacity:1}}
@keyframes shd-in{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:none}}
@keyframes shd-pop{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:none}}
.shd:not([data-live]) *{animation-play-state:paused!important}
@media (max-width:991px){.shd{height:auto;aspect-ratio:752/640}}
@media (prefers-reduced-motion:reduce){.shd *{animation:none!important;transition:none!important}}
`;

function Svg({ children, size = 15 }: { children: ReactNode; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
}
const STAGE_ICONS = [
  <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></>,
  <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M7 9h10M7 13h6M7 17h8" /></>,
  <><path d="m5 8 4 4-4 4M12 17h7" /></>,
  <><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
];

function useCopy() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return [copied, (text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true); window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setCopied(false), 1600);
  }] as const;
}

function Copy({ text }: { text: string }) {
  const [copied, copy] = useCopy();
  return <button type="button" className="shd-copy" onClick={() => copy(text)} aria-label={`Copy ${text}`}>
    {copied ? <Svg size={13}><path d="m5 12 5 5 9-10" /></Svg> : <Svg size={13}><rect x="8" y="8" width="12" height="12" rx="2.5" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></Svg>}
    {copied ? 'Copied' : 'Copy'}
  </button>;
}

function Tags({ tags, n = 3 }: { tags: string[]; n?: number }) {
  return <span className="shd-tags">{tags.slice(0, n).map(t => <span key={t}>{t}</span>)}</span>;
}

/** t: ms since this tab began (held at SH_DUR when reduced motion). running: in view, so loops may play. */
export default function SkillsHubDemo({ tab, t, running }: { tab: number; t: number; running: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [cat, setCat] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null | undefined>(undefined);
  const [pick, setPick] = useState<string | null>(null);
  const [cmd, setCmd] = useState<string | null>(null);
  const [since, setSince] = useState(0);
  const [stage, setStage] = useState<number | null>(null);
  const [life, setLife] = useState(0);
  const [layer, setLayer] = useState<number | null>(null);

  useEffect(() => {
    const el = box.current; if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(e.contentRect.width / 752, e.contentRect.height / 640)));
    ro.observe(el); return () => ro.disconnect();
  }, []);
  useEffect(() => { setCat(null); setOpen(undefined); setPick(null); setCmd(null); setStage(null); setLayer(null); }, [tab]);

  const key = SH_TABS[tab].key;
  const tc = Math.min(t, SH_DUR);

  // Every skill in one hub: walk three shelves, then open a card. A click takes over from the walk.
  const autoCat = tc >= 6200 ? 'global' : WALK[Math.min(2, Math.floor(tc / 2100))];
  const shelf = cat ?? autoCat;
  const shelfSkills = shelf === 'all' ? SKILLS : SKILLS.filter(s => s.category === shelf);
  const opened = open === undefined ? (tc >= 6200 && cat === null ? WALK_OPEN : null) : open;
  const openSkill = opened ? skill(opened) : null;

  // Install: two skills per pass, each command typed out.
  const autoPick = INSTALL_IDS[tc < 4500 ? 0 : 1];
  const pid = pick ?? autoPick;
  const line = cmd ?? install(pid);
  const lt = pick || cmd ? (running ? t - since : 1e6) : Math.min(tc, SH_DUR - 1) % 4500;
  const typed = line.slice(0, Math.max(0, Math.floor((lt - 300) / 38)));
  const done = typed.length >= line.length;
  const entry = cmd ? null : skill(pid);

  // Distilled and checked: the four steps light in turn for one skill.
  const lid = LIFE_IDS[life % LIFE_IDS.length];
  const ls = skill(lid);
  const autoStage = Math.min(3, Math.floor(tc / 2100));
  const st = stage ?? autoStage;
  const unique = SKILLS.filter(s => s.skill_id === lid).length === 1;

  // Our agent stack: a light walks down the layers; the pointer takes over.
  const autoLayer = Math.min(STACK.length - 1, Math.floor(tc / 1700));
  const lit = layer ?? autoLayer;

  const crumb = key === 'hub' ? (openSkill ? openSkill.name : CAT_NAME[shelf] ?? 'All') : key === 'install' ? 'Install' : key === 'checked' ? ls.name : 'Agent stack';

  return (
    <div ref={box} className="shd" data-live={running || undefined}>
      <style>{CSS}</style>
      <div className="shd-stage" style={{ transform: `translate(-50%,-50%) scale(${scale})` }}>
        <div className="shd-crumb"><SkillsHubMark size={20} />Skills Hub <span>/ {crumb}</span>
          <a href={HUB.repo} target="_blank" rel="noopener noreferrer"><GitHubMark size={12} />{REPO_PATH}</a>
        </div>

        <div className="shd-win">
          <div className="shd-bar">
            <span className="shd-lights"><i /><i /><i /></span>
            <span className="shd-search"><Svg size={13}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4-4" /></Svg>
              {key === 'hub' && openSkill ? <b>{openSkill.skill_id}</b> : <>Search {HUB.total_in_registry} skills</>}</span>
            <span className="shd-pill">{HUB.total_in_registry} skills · open source</span>
          </div>

          <div className="shd-body">
            {key === 'hub' && <>
              <div className="shd-shelves">
                <small>Categories</small>
                <button type="button" className="shd-cat" aria-pressed={shelf === 'all'} onClick={() => { setCat('all'); setOpen(null); }}><i />All<em>{HUB.total_in_registry}</em></button>
                {CATS.map(([c, n]) => <button type="button" key={c} className="shd-cat" aria-pressed={shelf === c} onClick={() => { setCat(c); setOpen(null); }}>
                  <i />{CAT_NAME[c] ?? c}<em>{n}</em></button>)}
              </div>
              <div className="shd-main">
                {openSkill ? <div className="shd-open" key={openSkill.skill_id}>
                  <button type="button" className="back" onClick={() => { setOpen(null); setCat(c => c ?? shelf); }}>← {CAT_NAME[openSkill.category] ?? openSkill.category}</button>
                  <code>{openSkill.skill_id}</code>
                  <h4>{openSkill.name}</h4>
                  <p>{openSkill.description}</p>
                  <Tags tags={openSkill.tags} n={6} />
                  <div className="shd-sib"><small>More in {CAT_NAME[openSkill.category] ?? openSkill.category}</small>
                    <div>{SKILLS.filter(s => s.category === openSkill.category && s.skill_id !== openSkill.skill_id).slice(0, 5).map(s =>
                      <button type="button" key={s.skill_id} onClick={() => setOpen(s.skill_id)}>{s.name}</button>)}</div>
                  </div>
                  <div className="shd-cmd"><span className="pr">$</span><span className="tx">{install(openSkill.skill_id)}</span><Copy text={install(openSkill.skill_id)} /></div>
                </div> : <div key={shelf}>
                  <div className="shd-head"><strong>{shelf === 'all' ? 'Every skill' : CAT_NAME[shelf]}</strong><span>{shelfSkills.length} skills</span></div>
                  <div className="shd-grid">
                    {shelfSkills.slice(0, 6).map((s, i) => <button type="button" key={s.skill_id} className="shd-card" style={{ animationDelay: `${i * 50}ms` }} onClick={() => setOpen(s.skill_id)}>
                      <b>{s.name}</b><p>{s.description}</p><Tags tags={s.tags} />
                    </button>)}
                  </div>
                  <div className="shd-more"><span>{shelfSkills.length > 6 ? `+${shelfSkills.length - 6} more in ${shelf === 'all' ? 'the hub' : CAT_NAME[shelf]}` : 'All shown'}</span><span>Click a skill to open it</span></div>
                </div>}
              </div>
            </>}

            {key === 'install' && <div className="shd-col shd-in">
              <div className="shd-picks" role="group" aria-label="Pick a skill">
                {INSTALL_IDS.map(id => <button type="button" key={id} aria-pressed={!cmd && pid === id} onClick={() => { setPick(id); setCmd(null); setSince(t); }}>{id}</button>)}
              </div>
              <div className="shd-term">
                <div className="tt"><i /><i /><i /><span>~/your-agent</span></div>
                <div className="ln"><span className="pr">$</span><span className="tx">{typed}{!done && <span className="shd-caret" />}</span><Copy text={line} /></div>
              </div>
              {entry && done && <div className="shd-entry" key={entry.skill_id}>
                <small>From the registry · {entry.category}</small>
                <b>{entry.name}</b>
                <p>{entry.description}</p>
                <Tags tags={entry.tags} n={5} />
              </div>}
              <div className="shd-cli">
                <small>More from the same CLI</small>
                <div>{HUB.cli.map(c => <button type="button" key={c} aria-pressed={cmd === c} onClick={() => { setCmd(c); setSince(t); }}><span className="pr">$</span>{c}<em>Run →</em></button>)}</div>
              </div>
            </div>}

            {key === 'checked' && <div className="shd-col shd-in">
              <div className="shd-life">
                <span className="fill" style={{ width: `${(st / 3) * 76}%` }} />
                {STAGES.map((s, i) => <button type="button" key={s.key} className="shd-node" data-on={i <= st || undefined} aria-pressed={i === st} onClick={() => setStage(i)}>
                  <span className="dot"><Svg size={22}>{STAGE_ICONS[i]}</Svg></span><b>{s.label}</b><span>{s.sub}</span>
                </button>)}
              </div>
              <div className="shd-file" key={`${lid}-${st}`}>
                {st === 0 && <><div className="fh"><span>skills/{lid}/SKILL.md</span><span>written by us</span></div>
                  <p><span className="d">---</span>{'\n'}<span className="k">name:</span> <span className="s">{ls.name}</span>{'\n'}<span className="k">description:</span> {ls.description}{'\n'}<span className="d">---</span></p></>}
                {st === 1 && <><div className="fh"><span>registry/skills_registry.json</span><span>one entry</span></div>
                  <p>{'{'}{'\n'}  <span className="k">&quot;skill_id&quot;</span>: <span className="s">&quot;{ls.skill_id}&quot;</span>,{'\n'}  <span className="k">&quot;category&quot;</span>: <span className="s">&quot;{ls.category}&quot;</span>,{'\n'}  <span className="k">&quot;tags&quot;</span>: [{ls.tags.map(x => `"${x}"`).join(', ')}]{'\n'}{'}'}</p></>}
                {st === 2 && <><div className="fh"><span>terminal</span><span>one line</span></div>
                  <p><span className="k">$</span> {install(lid)}</p></>}
                {st === 3 && <><div className="fh"><span>health</span><span>read from the registry fields</span></div>
                  {[
                    [unique, 'id is unique in the registry', lid],
                    [!!ls.name, 'has a name', ls.name],
                    [ls.description.length > 0, 'has a description', `${ls.description.length} chars`],
                    [!!HUB.categories[ls.category as keyof typeof HUB.categories], 'sits in a known category', ls.category],
                    [ls.tags.length > 0, 'is tagged', `${ls.tags.length} tags`],
                  ].map(([ok, label, val]) => <div className="row" key={String(label)}><span className={ok ? 'ok' : 'd'}>{ok ? '✓' : '·'}</span>{String(label)}<span className="d">{String(val)}</span></div>)}</>}
              </div>
              <div className="shd-hubcap"><span>Same checks, whole registry</span><span>computed from skills-hub.json</span></div>
              <div className="shd-hub">
                <div><b>{IDS_UNIQUE}<span> / {SKILLS.length}</span></b><small>unique ids</small></div>
                <div><b>{SKILLS.filter(s => s.description.length > 0).length}<span> / {SKILLS.length}</span></b><small>with a description</small></div>
                <div><b>{SKILLS.filter(s => s.tags.length > 0).length}<span> / {SKILLS.length}</span></b><small>tagged</small></div>
              </div>
              <button type="button" className="shd-next" onClick={() => { setLife(v => v + 1); setStage(null); }}>Try another skill →</button>
            </div>}

            {key === 'stack' && <div className="shd-stack">
              <div className="cap"><strong>The stack we give you</strong><span>top to bottom</span></div>
              {STACK.map((l, i) => {
                const ext = l.href.startsWith('http');
                return <a key={l.name} href={l.href} className={`shd-layer${l.glyph === 'skills' ? ' is-us' : ''}`} data-on={lit === i || undefined}
                  {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  style={{ ['--c' as string]: l.color, ['--dl' as string]: `${i * 70}ms` } as CSSProperties}
                  onPointerEnter={() => setLayer(i)} onFocus={() => setLayer(i)}>
                  <span className="gl">{l.glyph === 'skills' ? <SkillsHubMark size={44} /> : <ProductGlyph product={l.glyph} size={44} playing={lit === i && running} />}</span>
                  <span className="tx"><b>{l.name}</b><small>{l.role}</small></span>
                  <em>{ext ? 'GitHub' : 'Open'} →</em>
                </a>;
              })}
              <div className="foot">Each piece opens on GitHub as it ships</div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}
