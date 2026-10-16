// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/os-top/SisoOsTop.tsx)
'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { MotionConfig, useInView, useReducedMotion } from 'framer-motion';
import SisoOsDemo from '../home-hero/SisoOsDemo';
// The demo's own CSS ships in the home hero's stylesheet; inject it here too or the window renders blank.
import { homeHeroStyles } from '../home-hero/styles';
import { osTopStyles } from './styles';

// Layout: Foreplay Spyder hero/comparison. Interaction: copy/08 §1, §2, §4.
// Copy and counts: copy/02-os.md §1–2; no individual app ratings were supplied.
// uihub: existing SisoOsDemo; the supplied Foreplay and BridgeMind layouts own this slot.
const PROOF = ['25 apps studied', '5 sources read', '100 findings', '1,630 commits and 44 releases in 7 days'];
const NEEDS = ['Many local agents', 'A live sidebar', 'Live transcripts', 'Sub-agents', 'Keeps running when the window closes', 'Reachable from a phone'];
const BEATS = [
  ['The field', '25 agent apps scored on six needs: many local agents, a live sidebar, live transcripts, sub-agents, keeps running when the window closes, reachable from a phone.'],
  ['The reasoning', 'We read the source of T3 Code, OpenCode, Grok Build, Conductor and Vibe Kanban: 100 findings in 21 themes.'],
  ['The different light', 'None of them run a whole company. Agent Base gives every project a lead agent, writes every hand-off down, and keeps the browser, voice and estate in the same window.'],
] as const;
const INSIDE = [
  { name: 'Claude Code', org: 'anthropics', url: 'https://github.com/anthropics/claude-code' },
  { name: 'Codex', org: 'openai', url: 'https://github.com/openai/codex' },
];
const BUILT = [
  { name: 'T3 Code', org: 'pingdotgg', url: 'https://github.com/pingdotgg/t3code' },
  { name: 'OpenCode', org: 'anomalyco', url: 'https://github.com/anomalyco/opencode' },
  { name: 'cmux', org: 'manaflow-ai', url: 'https://github.com/manaflow-ai/cmux' },
  { name: 'Tauri', org: 'tauri-apps', url: 'https://github.com/tauri-apps/tauri' },
  // zachlatta.png was downloaded and inspected: a personal photo, never used as a logo.
  { name: 'FreeFlow', org: null, url: 'https://github.com/zachlatta/freeflow' },
];

export function SisoOsHero() {
  const preview = useRef<HTMLDivElement>(null);
  const visible = useInView(preview, { amount: 0.2 });
  const [exploring, setExploring] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const explore = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  useEffect(() => {
    if (!exploring) return;
    const node = dialog.current;
    if (!node) return;
    node.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [exploring]);
  function close() { dialog.current?.close(); }
  return <MotionConfig reducedMotion="user">
    <style>{homeHeroStyles}</style>
    <style>{osTopStyles}</style>
    <section id="product-hero-section" className="section relative sot-hero">
      <div className="dot-bg" />
      <div className="container">
        <div className="product-hero">
          <div className="product-hero-content sot-copy">
            <div className="text-overline">SISO OS</div>
            <div className="hero-text">
              <h1 className="text-display-h1 hero-title">The best agent base we could build. Opening on GitHub.</h1>
              <div className="max-w-lg"><p className="text-body-l text-white-84">We studied 25 agent apps and read the source of the best 5, for 100 findings. Then we built Agent Base: every agent, its browser, its voice and its memory in one window. Our agency runs on it every day.</p></div>
            </div>
            <div className="sot-actions">
              <a href="https://github.com/siso-os" className="button-dark button-primary w-inline-block"><span className="text-heading-m">Opening on github.com/siso-os</span><span aria-hidden="true">↗</span></a>
              <a href="/book-demo/" className="button-dark button-ghost w-inline-block"><span className="text-heading-m">Work with us</span></a>
            </div>
            <ul className="sot-proof" aria-label="Research and release receipts">{PROOF.map(proof => <li key={proof}>{proof}</li>)}</ul>
          </div>
          <div ref={preview} className="product-hero-preview sot-preview" data-running={visible}>
            <img className="sot-backdrop" src="/siso-img/home/web/10-hero-glow.webp" width={1600} height={900} alt="" aria-hidden="true" />
            <div className="sot-rim">{!exploring && <SisoOsDemo />}</div>
          </div>
          <div className="sot-caption"><p>Not a screenshot: the window is live. Click around it.</p><button ref={explore} type="button" className="sot-explore" aria-haspopup="dialog" onClick={() => setExploring(true)}>Explore <span aria-hidden="true">⤢</span></button></div>
        </div>
      </div>
    </section>
    <dialog ref={dialog} className="sot-dialog" aria-labelledby={titleId} onCancel={event => { event.preventDefault(); close(); }} onClose={() => { setExploring(false); explore.current?.focus(); }}>
      <header><h2 id={titleId} className="text-heading-m">SISO OS · Interactive demo · sample data</h2><button type="button" autoFocus onClick={close} className="sot-explore">Close <span aria-hidden="true">×</span></button></header>
      <div className="sot-dialog-demo">{exploring && <SisoOsDemo />}</div>
      <p>Not a screenshot: the window is live. Click around it.</p>
    </dialog>
  </MotionConfig>;
}

function LogoRow({ items, label, reverse = false, running }: { items: typeof BUILT; label: string; reverse?: boolean; running: boolean }) {
  const cards = items.length < 3 ? [...items, ...items, ...items] : items;
  return <div className="sot-logo-row" aria-label={label}>
    <span className="sot-row-label text-overline">{label}</span>
    <div className="sot-logo-window"><div className={`sot-logo-track${reverse ? ' sot-reverse' : ''}`} style={{ animationPlayState: running ? 'running' : 'paused' }}>
      {[false, true].map(duplicate => <div className="sot-logo-group" key={String(duplicate)} aria-hidden={duplicate || undefined}>
        {cards.map((item, index) => <a key={`${item.name}-${index}`} href={item.url} tabIndex={duplicate || index >= items.length ? -1 : undefined} aria-hidden={index >= items.length || undefined} className="sot-logo">
          {item.org && <img src={`/logos/os-top/${item.org}.png`} width={30} height={30} alt="" loading="lazy" />}<span>{item.name}</span><span className="sot-credit-arrow" aria-hidden="true">↗</span>
        </a>)}
      </div>)}
    </div></div>
  </div>;
}

export function SisoOsMarquee() {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { amount: 0.2 });
  const reduced = useReducedMotion();
  return <MotionConfig reducedMotion="user"><style>{osTopStyles}</style>
    <section ref={ref} className="section sot-marquee"><div className="container section-container">
      <p className="text-body-l sot-marquee-line">Every agent in one window, built from the best open source, credited.</p>
      <LogoRow items={INSIDE} label="Runs inside" running={visible && !reduced} />
      <LogoRow items={BUILT} label="Built from" reverse running={visible && !reduced} />
    </div></section>
  </MotionConfig>;
}

function Stage({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const visible = useInView(ref, { amount: 0.2 });
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () => setScale(node.getBoundingClientRect().width / 576);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="sot-stage-box" role="group" aria-label={label} data-running={visible}>
    <div className="sot-stage" style={{ transform: `scale(${scale})` }}>{children}</div>
  </div>;
}

// The 25 products in Agent Zero's research/competitors/index.json (4 Oct), ordered by closeness score.
const STUDIED = ['T3 Code', 'Happy', 'Orbit', 'Emdash', 'Alera', 'Superset', 'OpenHands', 'Conductor', 'Sculptor', 'Pivio', 'cmux', 'Xum', 'Codex app', 'Vibe Kanban', 'opcode', 'Cursor Cloud Agents', 'Amp', 'Warp', 'Grok Build', 'Crystal', 'OpenCode', 'Claude Squad', 'Omnara', 'Jules', 'Terragon'];

function Field() {
  const [need, setNeed] = useState(0);
  return <Stage label="25-app study structure; individual scores are not shown">
    <div className="sot-scene-top"><span>25 apps · six needs</span><small>Study structure · scores not shown</small></div>
    <div className="sot-need-tabs" role="group" aria-label="Select a need">{NEEDS.map((label, index) => <button type="button" key={label} aria-label={label} aria-pressed={need === index} onClick={() => setNeed(index)}>{index + 1}</button>)}</div>
    <p className="sot-need-name">{NEEDS[need]}</p>
    <div className="sot-app-grid">{STUDIED.map((app) => <div className="sot-app-card" key={app}><span>{app}</span><div>{NEEDS.map((label, column) => <i key={label} data-selected={need === column} aria-hidden="true" />)}</div></div>)}</div>
  </Stage>;
}

function Reasoning() {
  const [selected, setSelected] = useState(0);
  const repos = ['T3 Code', 'OpenCode', 'Grok Build', 'Conductor', 'Vibe Kanban'];
  return <Stage label="Five sources feed 100 findings across 21 themes">
    <div className="sot-scene-top"><span>Source → finding → theme</span><small>Research map</small></div>
    <svg className="sot-branches" viewBox="0 0 576 262" fill="none" aria-hidden="true">{repos.map((repo, index) => <path key={repo} d={`M 150 ${67 + index * 35} C 235 ${67 + index * 35}, 215 140, 290 140 S 350 140, 396 140`} className={selected === index ? 'sot-selected-path' : ''} />)}</svg>
    <div className="sot-repos">{repos.map((repo, index) => <button type="button" key={repo} aria-pressed={selected === index} onClick={() => setSelected(index)}>{repo}<span aria-hidden="true">↗</span></button>)}</div>
    <div className="sot-findings"><strong>100</strong><span>findings</span><div className="sot-finding-grid">{Array.from({ length: 100 }, (_, index) => <i key={index} />)}</div></div>
    <div className="sot-themes"><strong>21</strong><span>themes</span><div>{Array.from({ length: 21 }, (_, index) => <i key={index} />)}</div></div>
  </Stage>;
}

function Company() {
  const [handoff, setHandoff] = useState<'Build' | 'Review'>('Build');
  return <Stage label="Illustrative company workflow; hand-offs stay written down">
    <div className="sot-scene-top"><span>One company · Agent Base</span><small>Illustrative hand-off</small></div>
    <div className="sot-lead"><span className="sot-status-dot" /><strong>Lead agent</strong><small>Every project</small></div>
    <div className="sot-handoff-line" aria-hidden="true" />
    <div className="sot-workers">{(['Build', 'Review'] as const).map(label => <button type="button" key={label} aria-pressed={handoff === label} onClick={() => setHandoff(label)}>{label}<span>{label === 'Build' ? 'Claude Code · Codex' : 'Hand-off written down'}</span></button>)}</div>
    <div className="sot-written" aria-live="polite"><span>HAND-OFF.md</span><p>{handoff === 'Build' ? 'Lead → Build · brief written down' : 'Build → Review · findings written down'}</p></div>
    <div className="sot-company-tools"><span>Browser</span><span>Voice</span><span>Estate</span></div>
  </Stage>;
}

export function SisoOsMissed() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const id = useId();
  return <MotionConfig reducedMotion="user"><style>{osTopStyles}</style>
    <section className="section sot-missed"><div className="section-padding"><div className="section-white-block sot-dark-block"><div className="container section-container">
      <div className="product-page-solution sot-solution">
        <div className="section-head sot-missed-head"><div className="section-head-wrapper"><div className="section-head_title"><h2 className="text-display-h3">What everyone else missed.</h2></div></div></div>
        <div className="sot-beats">{BEATS.map(([title, copy], index) => <article className="sot-beat" key={title}>
          <h3><button type="button" className="sot-beat-trigger" id={`${id}-button-${index}`} aria-expanded={expanded === index} aria-controls={`${id}-panel-${index}`} onClick={() => setExpanded(expanded === index ? null : index)}><span className="sot-number">0{index + 1}</span><span className="text-heading-m">{title}</span><span className="sot-toggle" aria-hidden="true">{expanded === index ? '−' : '+'}</span></button></h3>
          <div id={`${id}-panel-${index}`} role="region" aria-labelledby={`${id}-button-${index}`} hidden={expanded !== index}>
            <p className="text-body-m sot-beat-copy">{copy}</p>
            {expanded === index && (index === 0 ? <Field /> : index === 1 ? <Reasoning /> : <Company />)}
          </div>
        </article>)}</div>
      </div>
    </div></div></div></section>
  </MotionConfig>;
}
