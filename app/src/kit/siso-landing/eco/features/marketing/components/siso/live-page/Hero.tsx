// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/live-page/Hero.tsx)
'use client';

import STATS from '../../../data/siso-stats.json';
import ACTIVITY from '../../../data/agent-base-activity.json';
import SKILLS from '../../../data/skills-hub.json';
import TokenDial, { TOKENS_SOURCE } from '../home-hero/TokenDial';
import { heroV2Styles } from '../home-hero/heroV2Styles';
import SHIPPED from './liveShipped.json';
import { Tag } from './base';

// The hero: hero v2's dial (home-hero/TokenDial, the one Shaan signed off) counting tokens live from siso-stats.json
// tokensLive, then one pill per panel below it. Each pill is a jump link with its real number and its source on hover.

const stat = (key: string) => STATS.stats.find(s => s.key === key)!;
const day = (iso: string) => Number(iso.slice(8, 10));

const JUMPS = [
  { href: '#lvp-tree', n: '6', label: 'agents in the tree', src: 'Agent Base lanes as in home-products/agent-base/AgentBaseDemo.tsx. Their chats are examples.' },
  { href: '#lvp-city', n: ACTIVITY.total.toLocaleString('en-US'), label: `commits, ${day(ACTIVITY.first)}–${day(ACTIVITY.last)} Oct`, src: `Agent Base: ${ACTIVITY._source}` },
  { href: '#lvp-shipped', n: String(SHIPPED.commits.length), label: 'latest changes to this site', src: SHIPPED._source },
  { href: '#lvp-reading', n: stat('repos').n, label: 'repos indexed', src: stat('repos').source },
  { href: '#lvp-reading', n: String(SKILLS.total_in_registry), label: 'skills shipped', src: SKILLS._source },
];

const CSS = `
.lvp-hero.v2{padding:150px 24px 90px}
.lvp-hero .lvp-hero-over{display:flex;justify-content:center;align-items:center;gap:12px;margin-bottom:22px;font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#FFC24B}
.lvp-hero h1{font-size:clamp(44px,6.4vw,88px);line-height:.98;letter-spacing:-.05em}
.lvp-hero h1 span{display:block;background:linear-gradient(100deg,#fff 15%,#FFC24B 55%,#FF6A1A 90%);-webkit-background-clip:text;background-clip:text;color:transparent}
.lvp-key{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:22px}
.lvp-key small{font-size:12.5px;color:rgba(255,255,255,.5);align-self:center}
.lvp-hero .v2-dial{margin-top:40px}
.lvp-jumps{position:relative;z-index:4;display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:28px auto 0;padding:0;list-style:none;max-width:1100px}
.lvp-jumps li{animation:v2-up .9s var(--ease) both;animation-delay:calc(.3s + var(--i) * 70ms)}
.lvp-jumps a{display:flex;align-items:baseline;gap:9px;padding:11px 18px;border-radius:99px;background:#0a0b0f;box-shadow:inset 0 0 0 1px #ffffff1f}
.lvp-jumps b{font:600 17px/1 'Inter Display',Inter,sans-serif;letter-spacing:-.01em;font-variant-numeric:tabular-nums;color:#fff}
.lvp-jumps span{font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.55)}
.lvp-jumps a::after{top:auto!important;bottom:calc(100% + 10px)}
@media(max-width:767px){
  .lvp-hero.v2{padding:116px 16px 56px}
  .lvp-hero h1{font-size:40px}
  .lvp-jumps{display:grid;grid-template-columns:1fr 1fr;gap:8px}
  .lvp-jumps li:last-child{grid-column:1 / -1}
  .lvp-jumps a{flex-direction:column;align-items:flex-start;gap:6px;padding:11px 13px;border-radius:14px;height:100%}
  .lvp-jumps span{font-size:9.5px;letter-spacing:.1em;line-height:1.3;text-align:left}
  .lvp-jumps a::after{left:0!important;translate:none!important}
  .lvp-jumps li:nth-child(even) a::after{left:auto!important;right:0}
}
@media(prefers-reduced-motion:reduce){.lvp-jumps li{animation:none}}
`;

export default function Hero() {
  return (
    <section className="v2 lvp-hero" aria-labelledby="lvp-title" data-shot="hero">
      <style>{heroV2Styles}</style>
      <style>{CSS}</style>
      <div className="v2-copy">
        <span className="lvp-hero-over">The lab, live</span>
        <h1 id="lvp-title">SISO Labs,<span>working right now.</span></h1>
        <p className="v2-sub">Our agents run in Agent Base all day. Here is what that looks like: the tokens they spend, the agent tree, the commits, what just shipped, and what we have read.</p>
        <div className="lvp-key">
          <Tag kind="live" src={`Counts on in your browser. ${TOKENS_SOURCE}`} />
          <Tag kind="data" src="Read from a sourced file in this repo. Point at any number for its source." />
          <Tag kind="illustrative" src="Real lanes and real faces; the chats are examples." />
          <small>Every panel wears one of these.</small>
        </div>
      </div>

      <TokenDial />

      <ul className="lvp-jumps" aria-label="On this page">
        {JUMPS.map((j, i) => (
          <li key={j.label} style={{ ['--i' as string]: i }}>
            <a href={j.href} className="lvp-neon" data-src={`Source: ${j.src}`}><b>{j.n}</b><span>{j.label}</span></a>
          </li>
        ))}
      </ul>
    </section>
  );
}
