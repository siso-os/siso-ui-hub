// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/home-hero/SisoOsDemo.tsx)
'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';

type Pane = 'Home' | 'Agents' | 'Voice' | 'WhatsApp' | 'Browser' | 'Estate' | 'Library';
type Module = 'Voice' | 'WhatsApp' | 'Estate' | 'Library';
const MODULES: Module[] = ['Voice', 'WhatsApp', 'Estate', 'Library'];
const TOUR: Pane[] = ['Voice', 'WhatsApp', 'Browser', 'Estate', 'Library'];
const PROMPT = 'Find the best open-source command palette and add it to the UI Hub.';
const TRANSCRIPT = 'move the pricing section above the FAQ';
// Great_Library_of_SISO/banks/siso-ui-hub/catalogue/picks.json, navigation/command-palette.
const PICK = {
  id: 'arc:command-palette',
  install: 'npx shadcn@latest add @uiarc/command-palette',
  why: 'keyboard-driven, grouped results; compare with our WorkspaceCommandPalette',
};
const CATALOGUE = [
  ['Command palette', PICK.id], ['Hover card', 'arc:hover-card'],
  ['Agent activity', 'easyui:ai-agent-activity'], ['Date range', 'arc:date-range-picker'],
  ['Timeline', 'arc:timeline'], ['Data table', 'arc:sortable-data-table'],
] as const;
const REPOS = [
  ['radix-ui/primitives', 'Accessible foundations'],
  ['motiondivision/motion', 'Interaction and animation'],
  ['lucide-icons/lucide', 'Consistent stroke icons'],
] as const;
const PALETTE_REPOS = [
  ['pacocoursey/cmdk', 'Command menu primitive'],
  ['shadcn-ui/ui', 'Composable command component'],
  ['radix-ui/primitives', 'Accessible foundations'],
] as const;
const ICONS: Record<Pane, string> = {
  Home: 'M3 10 12 3l9 7v11h-6v-7H9v7H3Z',
  Agents: 'M9 3h6v6H9ZM3 15h6v6H3Zm12 0h6v6h-6ZM12 9v3M6 15v-3h12v3',
  Voice: 'M9 4a3 3 0 0 1 6 0v8a3 3 0 0 1-6 0ZM5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8',
  WhatsApp: 'M21 11a9 9 0 0 1-13 8l-5 2 2-5a9 9 0 1 1 16-5ZM8 8c0 4 4 8 8 8M8 8l2-1 2 3-2 1m3 3 1-2 3 2-1 2',
  Browser: 'M3 5h18v15H3ZM3 9h18M6 7h.01M9 7h.01M12 7h.01',
  Estate: 'M3 4h18v6H3Zm0 10h18v6H3ZM6 7h.01M6 17h.01M10 7h8M10 17h8',
  Library: 'M3 3h4v18H3Zm7 0h4v18h-4Zm7 1 4-1 3 17-4 1Z',
};

function Icon({ name }: { name: Pane }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONS[name]} /></svg>;
}

export default function SisoOsDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const reduce = useReducedMotion();
  const [fit, setFit] = useState({ scale: 1, left: 0 });
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [selected, setSelected] = useState<Pane>('Home');
  const [tourMs, setTourMs] = useState(0);
  const [paneMs, setPaneMs] = useState(0);
  const [enabled, setEnabled] = useState<Module[]>([...MODULES]);
  const [installing, setInstalling] = useState<Partial<Record<Module, number>>>({});
  const [tray, setTray] = useState(false);
  const [webOpen, setWebOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [talked, setTalked] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const [detail, setDetail] = useState<string | null>(null);
  const pendingInstall = Object.keys(installing).length > 0;
  const running = inView && !hovered && !focused && !reduce;
  const autoPane: Pane = tourMs < 6500 ? 'Home' : TOUR[Math.floor((tourMs - 6500) / 3500)];
  const active = touched || reduce ? selected : autoPane;
  const elapsed = reduce ? 9000 : touched ? paneMs : tourMs < 6500 ? tourMs : (tourMs - 6500) % 3500;
  const chatMs = touched || reduce ? 9000 : elapsed;
  const chatEnd = chatMs >= 5000;
  const transcript = reduce || talked ? TRANSCRIPT : TRANSCRIPT.slice(0, Math.floor(elapsed / 55));
  const libraryQuery = query ?? (reduce || touched ? 'command palette' : 'command palette'.slice(0, Math.floor(elapsed / 85)));

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () => {
      // Foreplay's 1400:730 footprint is preserved. Contain the full 1200x750 stage.
      const width = node.getBoundingClientRect().width;
      const scale = Math.min(width / 1200, (width * 730 / 1400) / 750);
      setFit({ scale, left: (width - 1200 * scale) / 2 });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Tour and streams pause on hover/focus. An explicit installation can still settle.
    if (!running && !(inView && pendingInstall)) return;
    const timer = window.setInterval(() => {
      if (running) {
        if (!touched) setTourMs(ms => (ms + 100) % 24000);
        setPaneMs(ms => Math.min(9000, ms + 100));
      }
      setInstalling(current => {
        const next: Partial<Record<Module, number>> = {};
        for (const module of MODULES) {
          const remaining = current[module];
          if (remaining && remaining > 100) next[module] = remaining - 100;
        }
        return Object.keys(current).length ? next : current;
      });
    }, 100);
    return () => window.clearInterval(timer);
  }, [running, touched, inView, pendingInstall]);

  useEffect(() => { if (active === 'Browser') setWebOpen(true); }, [active]);
  useEffect(() => { if (reduce) setInstalling({}); }, [reduce]);

  function visit(pane: Pane) {
    setTouched(true);
    setSelected(pane);
    setPaneMs(0);
    setDetail(null);
    if (pane === 'Browser') setWebOpen(true);
    if (pane === 'WhatsApp') setConnected(false);
    if (pane === 'Voice') setTalked(false);
  }
  function takeControl() {
    if (touched) return;
    setSelected(active);
    setPaneMs(elapsed);
    setTouched(true);
  }
  function reset() {
    setTouched(false); setSelected('Home'); setTourMs(0); setPaneMs(0);
    setEnabled([...MODULES]); setInstalling({}); setTray(false);
    setWebOpen(false); setConnected(false); setTalked(false); setQuery(null); setDetail(null);
  }
  function toggle(module: Module) {
    const isOn = enabled.includes(module);
    if (isOn) {
      setEnabled(current => current.filter(item => item !== module));
      setInstalling(current => { const next = { ...current }; delete next[module]; return next; });
      if (active === module) visit('Home');
    } else {
      setEnabled(current => [...current, module]);
      if (!reduce) setInstalling(current => ({ ...current, [module]: 1200 }));
    }
  }
  const rail: Pane[] = ['Home', 'Agents', ...(['Voice', 'WhatsApp'] as const).filter(m => enabled.includes(m)), 'Browser', ...(['Estate', 'Library'] as const).filter(m => enabled.includes(m))];
  const isChat = active === 'Home' || active === 'Agents';
  const fade = { initial: reduce ? false as const : { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: reduce ? 0 : 0.22 } };

  return (
    <div ref={ref} className="hh-demo" aria-label="Interactive SISO OS demo with sample data"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onPointerDownCapture={takeControl} onKeyDownCapture={event => { takeControl(); if (event.key === 'Escape') { setTray(false); setDetail(null); } }}>
      <div className="hh-stage" style={{ transform: `translateX(${fit.left}px) scale(${fit.scale})` }}>
        <div className="hh-demo-heading"><span><i /> Interactive demo · sample data</span><button type="button" onClick={reset}>↺ Reset</button></div>
        <div className="hh-window">
          <div className="hh-titlebar">
            <div className="hh-traffic" aria-hidden="true"><i /><i /><i /></div>
            <button type="button" className={`hh-tab ${isChat ? 'hh-active' : ''}`} onClick={() => visit('Home')}>⌘ Agent Zero</button>
            <button type="button" className={`hh-tab ${active === 'Estate' ? 'hh-active' : ''}`} onClick={() => visit(enabled.includes('Estate') ? 'Estate' : 'Home')}>Where things stand</button>
            <button type="button" className="hh-tab" onClick={() => visit('Browser')}>◎ siso.dev</button>
            <AnimatePresence initial={false}>{webOpen && <motion.button {...fade} type="button" className={`hh-tab ${active === 'Browser' ? 'hh-active' : ''}`} onClick={() => visit('Browser')}>◎ UI Hub</motion.button>}</AnimatePresence>
            <span className="hh-title-spacer" />
            <button type="button" className="hh-modules-button" aria-expanded={tray} aria-controls="hh-module-tray" onClick={() => setTray(value => !value)}>⊞ Modules</button>
          </div>
          <nav className="hh-rail" aria-label="Demo modules">
            <AnimatePresence initial={false}>
              {rail.map(name => <motion.button layout={!reduce} {...fade} type="button" key={name} className={`hh-rail-button ${active === name ? 'hh-active' : ''}`} title={name === 'Library' ? 'Great Library' : name} aria-label={name === 'Library' ? 'Great Library' : name} aria-pressed={active === name} onClick={() => visit(name)}><Icon name={name} /></motion.button>)}
            </AnimatePresence>
            <div className="hh-rail-bottom"><img src="/brand/siso-mark.png" alt="SISO" width={26} height={26} /></div>
          </nav>
          <aside className="hh-sidebar">
            <div className="hh-brand"><img src="/brand/siso-mark.png" alt="" width={26} height={26} />Agent Base <span>⌄</span></div>
            <button type="button" className="hh-lead" onClick={() => visit('Home')}><span className="hh-agent-mark">⌘</span><span>Agent Zero<small>keeps every project</small></span></button>
            <div className="hh-group">⌄ &nbsp; SISO Labs</div>
            <button type="button" onClick={() => visit('Browser')}>▱ &nbsp; UI Hub</button>
            <button type="button" onClick={() => visit(enabled.includes('Library') ? 'Library' : 'Browser')}>▱ &nbsp; Great Library</button>
            <button type="button" onClick={() => visit('Agents')}>▱ &nbsp; Research</button>
            <div className="hh-group">⌄ &nbsp; SISO Agency</div>
            <button type="button" onClick={() => visit('Home')}>▱ &nbsp; Corner Café</button>
            <div className="hh-sidebar-foot"><i /> Agent Infrastructure</div>
          </aside>
          <main className="hh-main">
            <header className="hh-pane-heading"><span className="hh-agent-mark"><Icon name={isChat ? 'Agents' : active} /></span><strong>{isChat ? 'Agent Zero' : active === 'Library' ? 'Great Library' : active}</strong><span>{isChat ? 'keeps every project' : active === 'Browser' ? 'built in' : 'swappable workspace'}</span><small>Sample</small></header>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active} {...fade} className="hh-pane">
                {isChat && <div className="hh-chat">
                  <div className="hh-user-label">You · scripted request</div>
                  <p className="hh-user-message">{chatEnd ? PROMPT : PROMPT.slice(0, Math.floor(chatMs / 22))}{!chatEnd && <span className="hh-caret" aria-hidden="true" style={{ animationPlayState: running ? 'running' : 'paused' }} />}</p>
                  {chatMs >= 1600 && <motion.div {...fade} className="hh-work-step"><i /><span>Searched 23,778 rated repos</span><small>Scripted step · sample</small></motion.div>}
                  {chatMs >= 2700 && <motion.div {...fade} className="hh-work-step"><i /><span>Compared source libraries</span><small>Scripted step · sample</small></motion.div>}
                  {chatMs >= 3600 && <motion.div {...fade} className="hh-pick"><span className="hh-eyebrow">UI Hub · best in category</span><h3>{PICK.id}</h3><p>{PICK.why}</p><code>{PICK.install}</code><a href="/ui-hub/">Explore the UI Hub ↗</a></motion.div>}
                  {chatEnd && <motion.div {...fade} className="hh-complete">✓ Added to the catalogue <span>sample action</span></motion.div>}
                </div>}
                {active === 'Voice' && <div className="hh-center">
                  <span className="hh-eyebrow">Voice module · sample transcript</span><h2>Say it. Keep building.</h2>
                  <div className="hh-wave" aria-hidden="true">{Array.from({ length: 31 }, (_, i) => <span key={i} style={{ height: `${16 + ((i * 17) % 64)}px`, animationDelay: `${i * -0.07}s`, animationPlayState: running ? 'running' : 'paused' }} />)}</div>
                  <button type="button" className="hh-action" onPointerDown={() => setTalked(true)} onClick={() => setTalked(true)}>Hold to talk <Icon name="Voice" /></button>
                  <p className="hh-transcript">“{transcript}”</p><small>Demo only · your microphone stays off</small>
                </div>}
                {active === 'WhatsApp' && <div className="hh-center">
                  <span className="hh-eyebrow">WhatsApp module · sample connection</span><h2>{connected || (!touched && elapsed > 1800) || reduce ? 'Connected' : 'Scan to connect'}</h2>
                  <div className={`hh-qr ${connected || (!touched && elapsed > 1800) || reduce ? 'hh-connected' : ''}`} aria-label="Illustrative QR code, demo only">
                    {connected || (!touched && elapsed > 1800) || reduce ? <span>✓</span> : <><div className="hh-qr-pixels">{Array.from({ length: 169 }, (_, i) => <i key={i} style={{ opacity: (i * 7 + Math.floor(i / 13) * 3) % 5 < 3 ? 1 : 0 }} />)}</div><b /><b /><b /></>}
                  </div>
                  <button type="button" className="hh-action" onClick={() => setConnected(value => !value)}>{connected ? 'Replay connection' : 'Try sample connection'} →</button><small>Illustration only · no account is connected</small>
                </div>}
                {active === 'Browser' && <div className="hh-browser">
                  <div className="hh-address">← &nbsp; → &nbsp; ↻ <span>◎ &nbsp; UI Hub / catalogue</span><span>built in</span></div>
                  <div className="hh-browser-body"><span className="hh-eyebrow">The best, kept together</span><h2>UI Hub</h2><p>28 best-in-category picks · 5 libraries</p>
                    <div className="hh-catalogue">{CATALOGUE.map(([name, id], i) => <motion.button type="button" key={id} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduce ? 0 : i * 0.06 }} onClick={() => setDetail(detail === id ? null : id)} className={detail === id ? 'hh-selected' : ''}><div className="hh-mini-preview"><span /><span /><span /><b>⌘</b></div><strong>{name}</strong><small>{id}</small></motion.button>)}</div>
                    {detail && <div className="hh-catalogue-detail">{detail === PICK.id ? <><strong>{PICK.id}</strong><code>{PICK.install}</code><p>{PICK.why}</p></> : <><strong>{detail}</strong><span>Best-in-category catalogue pick</span></>}</div>}
                  </div>
                </div>}
                {active === 'Estate' && <div className="hh-estate">
                  <span className="hh-eyebrow">Estate module · sample pinning</span><h2>A home for every repo.</h2><p>Repos pinned, nightly</p>
                  <div className="hh-repos">{REPOS.map(([repo, label], i) => <motion.div {...fade} key={repo} transition={{ duration: reduce ? 0 : 0.22, delay: reduce ? 0 : i * 0.12 }}><Icon name="Estate" /><strong>{repo}</strong><small>{label}</small><span className="hh-pin">{reduce || touched || elapsed > 650 + i * 400 ? '✓ Pinned' : 'Pinning…'}</span></motion.div>)}</div>
                </div>}
                {active === 'Library' && <div className="hh-library">
                  <span className="hh-eyebrow">Great Library · sample search</span><h2>Keep the best.</h2><label className="hh-search">⌕ <input aria-label="Search the sample library" value={libraryQuery} onChange={event => setQuery(event.target.value)} placeholder="command palette" /></label>
                  <p>23,778 rated repos · sample source comparison</p>
                  {PALETTE_REPOS.filter(([repo, label]) => `${repo} ${label} command palette`.toLowerCase().includes(libraryQuery.toLowerCase())).map(([repo, label], i) => <motion.div {...fade} key={repo} className="hh-result" transition={{ duration: reduce ? 0 : 0.22, delay: reduce ? 0 : i * 0.08 }}><span><strong>{repo}</strong><small>{label}</small></span><div className="hh-rating" aria-label="Illustrative comparison bar, not a repo score"><i /></div><span>Compared</span></motion.div>)}
                  <div className="hh-library-pick">Catalogue pick <strong>{PICK.id}</strong></div>
                </div>}
              </motion.div>
            </AnimatePresence>
            <div className="hh-composer"><span>♧</span><span>Message, or / for commands</span><button type="button" aria-label="Show completed sample request" onClick={() => visit('Home')}>↑</button></div>
            <div className="hh-status"><span>Agent model · sample</span><span className="hh-ctx"><i /></span><span>ctx · sample</span><span>tokens · sample</span><span>Agent Base</span></div>
          </main>
          <AnimatePresence>
            {tray && <motion.div id="hh-module-tray" {...fade} className="hh-tray" role="region" aria-label="Module settings">
              <div className="hh-tray-heading"><strong>Your OS. Your modules.</strong><button type="button" aria-label="Close module settings" onClick={() => setTray(false)}>×</button></div><p>Swap the tools around the core.</p>
              <div className="hh-module-row"><Icon name="Browser" /><span>Browser<small>built in · locked</small></span><span className="hh-locked">⌑</span></div>
              {MODULES.map(module => <div key={module} className="hh-module-row"><Icon name={module} /><span>{module === 'Library' ? 'Great Library' : module}<small>{installing[module] ? 'Adding…' : enabled.includes(module) ? '✓ Enabled' : 'Hidden'}</small></span><button type="button" role="switch" aria-checked={enabled.includes(module)} aria-label={`${module === 'Library' ? 'Great Library' : module} module`} className={`hh-toggle ${enabled.includes(module) ? 'hh-on' : ''}`} onClick={() => toggle(module)}><i /></button></div>)}
              <small className="hh-tray-note">Sample settings · resets with the demo</small>
            </motion.div>}
          </AnimatePresence>
        </div>
        {!touched && <div className="hh-try">← <strong>Try it</strong> · click a module</div>}
      </div>
    </div>
  );
}
