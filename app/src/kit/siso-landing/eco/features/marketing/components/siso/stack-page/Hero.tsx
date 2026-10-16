// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/stack-page/Hero.tsx)
'use client';

import { useRef, type CSSProperties } from 'react';
import { WorkspaceMark } from '../living/living-assets';
import RESEARCH from '../../../data/agent-base-research.json';
import OPEN from '../../../data/siso-open-source.json';
import { COUNTS, GROUPS, PRODUCTS, PRODUCT_KEYS, UPDATED, hitProps, useLive, usePick, type ProductKey, type StackItem } from './base';

// The hero: the SISO lion with everything it is built on in orbit. Three rings, drawn from stack.json: agents and models
// closest, then research and infra, then the open UI that UI Hub indexes. One logo per project, the GitHub org avatar already
// in public/logos/. Each ring is one CSS rotation, each logo one counter-rotation so it stays upright; all of it stops off
// screen, while you point at the orbit, and for reduced motion. The product chips pick a product: everything it doesn't use
// steps back, here and in every card below.

const byGroup = (keys: string[]) => GROUPS.filter(g => keys.includes(g.key)).flatMap(g => g.items);
function uniqueLogos(items: StackItem[], seen: Set<string>) {
  return items.filter(i => i.logo && !seen.has(i.logo) && seen.add(i.logo));
}
const SEEN = new Set<string>();
const RINGS = [
  { k: 0.25, dur: 60, items: uniqueLogos(byGroup(['agents', 'models']), SEEN) },
  { k: 0.37, dur: 90, items: uniqueLogos(byGroup(['infra', 'research']), SEEN) },
  { k: 0.49, dur: 140, items: uniqueLogos(byGroup(['ui']), SEEN) },
];
const PRIMARY = (i: StackItem) => PRODUCTS[i.used[0]].color;

const PROOF = [
  { n: COUNTS.items, label: 'projects and tools' },
  { n: COUNTS.groups, label: 'groups' },
  { n: COUNTS.licensed, label: 'licences' },
  { n: COUNTS.products, label: 'products' },
  { n: `~${RESEARCH.counts.repos_checked}`, label: 'repos checked' },
  { n: OPEN.publicRepos, label: 'repos open' },
];

const CSS = `
.stk-hero{position:relative;isolation:isolate;padding:150px 0 130px;overflow:hidden}
.stk-hero::before{content:"";position:absolute;inset:-10% -10% auto;height:120%;z-index:-1;pointer-events:none;filter:blur(40px);
  background:radial-gradient(40% 40% at 72% 45%,#ff6a1a24,transparent 70%),radial-gradient(30% 30% at 20% 20%,#ffc24b12,transparent 70%)}
.stk-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:40px}
.stk-hero-copy{display:flex;flex-direction:column;align-items:flex-start;gap:26px;position:relative;z-index:2}
.stk-hero h1{margin:0;font:600 clamp(44px,5vw,74px)/.98 'Inter Display',Inter,sans-serif;letter-spacing:-.05em;color:#fff;text-shadow:0 0 60px #ff6a1a33}
.stk-hero h1 span{display:block;background:linear-gradient(100deg,#fff 10%,#ffd59a 55%,#ff6a1a 95%);-webkit-background-clip:text;background-clip:text;color:transparent}
.stk-hero-line{margin:0;max-width:540px;font:400 18px/1.65 Inter,sans-serif;color:rgba(255,255,255,.66)}
.stk-pick{display:flex;flex-direction:column;gap:12px}
.stk-pick small{font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.45)}
.stk-pick div{display:flex;flex-wrap:wrap;gap:8px}
.stk-pick button{height:34px;padding:0 13px 0 11px;border-radius:11px;font-size:11.5px}
.stk-pick button[aria-pressed="true"]{color:#fff;background:color-mix(in srgb,var(--pc) 26%,transparent);box-shadow:inset 0 0 0 1px var(--pc),0 0 22px -6px var(--pc)}
.stk-pick button.clear{--pc:#ffffff66}
.stk-proof{display:grid;grid-template-columns:repeat(3,auto);row-gap:16px;justify-content:start;margin:6px 0 0;padding:0;list-style:none;border-top:1px solid #ffffff14}
.stk-proof li{display:flex;flex-direction:column;gap:6px;padding:18px 20px 0 0;margin-right:20px;transition:transform .35s cubic-bezier(.19,1,.22,1)}
.stk-proof li+li{padding-left:20px;border-left:1px solid #ffffff14}
.stk-proof li:hover{transform:translateY(-2px)}
.stk-proof b{font:600 34px/1 'Inter Display',Inter,sans-serif;letter-spacing:-.04em;font-variant-numeric:tabular-nums;color:#fff;
  opacity:0;filter:blur(8px);transform:translateY(10px);transition:opacity .9s cubic-bezier(.19,1,.22,1),filter .9s,transform .9s cubic-bezier(.19,1,.22,1),text-shadow .4s}
.stk-proof li:hover b{text-shadow:0 0 24px #ff6a1aaa}
[data-seen] .stk-proof b{opacity:1;filter:none;transform:none}
.stk-proof li:nth-child(2) b{transition-delay:.08s}.stk-proof li:nth-child(3) b{transition-delay:.16s}.stk-proof li:nth-child(4) b{transition-delay:.24s}
.stk-proof li:nth-child(5) b{transition-delay:.32s}.stk-proof li:nth-child(6) b{transition-delay:.4s}
.stk-proof li:nth-child(4){border-left:0;padding-left:0}
.stk-proof span{font:500 10.5px/1.3 'Geist Mono',ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.5)}
/* the orbit */
.stk-orbit{--s:500px;position:relative;width:var(--s);height:var(--s);max-width:100%;margin-left:auto}
.stk-ring{position:absolute;left:50%;top:50%;width:0;height:0;animation:stk-spin var(--dur) linear infinite}
.stk-ring::before{content:"";position:absolute;left:calc(var(--r) * -1);top:calc(var(--r) * -1);width:calc(var(--r) * 2);height:calc(var(--r) * 2);border-radius:50%;
  box-shadow:inset 0 0 0 1px #ffffff12;background:conic-gradient(from 0deg,transparent,#ff6a1a14 20%,transparent 40%)}
.stk-node{position:absolute;left:0;top:0;width:0;height:0;transform:rotate(var(--a)) translateX(var(--r))}
.stk-node>span{position:absolute;left:-22px;top:-22px;width:44px;height:44px;transform:rotate(calc(var(--a) * -1))}
.stk-node>span>a{position:absolute;inset:0;display:grid;place-items:center;border-radius:13px;background:#0d0e12;box-shadow:inset 0 0 0 1px #ffffff1f,0 10px 24px -12px #000;
  animation:stk-spin var(--dur) linear infinite reverse;transition:box-shadow .3s,opacity .4s,filter .4s}
.stk-node img{width:30px;height:30px;border-radius:8px;transition:transform .45s cubic-bezier(.19,1,.22,1)}
.stk-node a:hover,.stk-node a:focus-visible{box-shadow:inset 0 0 0 1.5px var(--c),0 0 26px -4px var(--c);z-index:4}
.stk-node a:hover img,.stk-node a:focus-visible img{transform:scale(1.14) rotate(-8deg)}
.stk-node a::after{content:attr(data-name);position:absolute;left:50%;bottom:calc(100% + 8px);transform:translate(-50%,4px);white-space:nowrap;pointer-events:none;
  padding:6px 9px;border-radius:8px;background:#0a0b0f;box-shadow:inset 0 0 0 1px var(--c);font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.04em;color:#fff;
  opacity:0;transition:opacity .25s,transform .35s cubic-bezier(.19,1,.22,1)}
.stk-node a:hover::after,.stk-node a:focus-visible::after{opacity:1;transform:translate(-50%,0)}
.stk-ring:nth-child(2) .stk-node>span{scale:.92}.stk-ring:nth-child(3) .stk-node>span{scale:.8}
.stk-core{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:grid;place-items:center;width:170px;height:170px;border-radius:50%;
  background:radial-gradient(closest-side,#ff6a1a33,transparent);z-index:2}
.stk-core::after{content:"";position:absolute;inset:-26px;border-radius:50%;box-shadow:inset 0 0 0 1px #ff6a1a33;
  background:conic-gradient(from var(--stk-ang),transparent,#ffc24b55 10%,transparent 22%);-webkit-mask:radial-gradient(closest-side,transparent calc(100% - 1.5px),#000 calc(100% - 1px));
  mask:radial-gradient(closest-side,transparent calc(100% - 1.5px),#000 calc(100% - 1px));animation:stk-ang 6s linear infinite}
@keyframes stk-spin{to{rotate:360deg}}
.stk-hero:not([data-live]) .stk-ring,.stk-hero:not([data-live]) .stk-node>span>a,.stk-hero:not([data-live]) .stk-core::after,
.stk-orbit:hover .stk-ring,.stk-orbit:hover .stk-node>span>a,.stk-orbit:focus-within .stk-ring,.stk-orbit:focus-within .stk-node>span>a{animation-play-state:paused}
@media (max-width:1100px){.stk-orbit{--s:420px}}
@media (max-width:991px){.stk-hero-grid{grid-template-columns:1fr}.stk-orbit{margin:20px auto 0}}
@media (max-width:767px){.stk-hero{padding:120px 0 80px}.stk-orbit{--s:358px}.stk-node>span{scale:.78}.stk-ring:nth-child(2) .stk-node>span{scale:.7}.stk-ring:nth-child(3) .stk-node>span{scale:.6}
  .stk-core{width:120px;height:120px}.stk-hero-line{font-size:16px}.stk-proof li{padding:16px 16px 0 0;margin-right:16px}.stk-proof li+li{padding-left:16px}.stk-proof b{font-size:28px}}
@media (max-width:520px){.stk-proof{grid-template-columns:repeat(2,auto);row-gap:14px}.stk-proof li:nth-child(odd){border-left:0;padding-left:0}
  .stk-proof li:nth-child(4){border-left:1px solid #ffffff14;padding-left:16px}}
@media (prefers-reduced-motion:reduce){.stk-ring,.stk-node>span>a,.stk-core::after{animation:none}.stk-proof b{opacity:1;filter:none;transform:none;transition:none}}
`;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { inView, live } = useLive(ref, 0.1);
  const { pick, setPick } = usePick();
  const toggle = (k: ProductKey) => setPick(pick === k ? null : k);
  return (
    <section ref={ref} className="stk-hero" data-live={live || undefined} data-seen={inView || undefined} data-shot="hero" aria-labelledby="stk-title">
      <style>{CSS}</style>
      <div className="stk-wrap stk-hero-grid">
        <div className="stk-hero-copy">
          <span className="stk-over">The stack · credited</span>
          <h1 id="stk-title">The stack we use, <span>credited.</span></h1>
          <p className="stk-hero-line">What we're built on, what we took, and who uses it.</p>
          <div className="stk-pick" role="group" aria-label="Show the stack of one product">
            <small>Pick a product to see its stack</small>
            <div>
              {PRODUCT_KEYS.map(k => <button key={k} type="button" className="stk-chip" style={{ '--pc': PRODUCTS[k].color } as CSSProperties}
                aria-pressed={pick === k} onClick={() => toggle(k)}><i />{PRODUCTS[k].name}</button>)}
              {pick && <button type="button" className="stk-chip clear" onClick={() => setPick(null)}>Show all ×</button>}
            </div>
          </div>
          <ul className="stk-proof" aria-label="Counted from the stack's data file">
            {PROOF.map(p => <li key={p.label}><b>{p.n}</b><span>{p.label}</span></li>)}
          </ul>
        </div>
        <div className="stk-orbit" aria-label="Everything SISO is built on, in orbit around the SISO lion">
          {RINGS.map((ring, ri) => (
            <div key={ri} className="stk-ring" style={{ '--r': `calc(var(--s) * ${ring.k})`, '--dur': `${ring.dur}s` } as CSSProperties}>
              {ring.items.map((it, i) => (
                <span key={it.logo} className="stk-node" style={{ '--a': `${(360 / ring.items.length) * i + ri * 17}deg`, '--c': PRIMARY(it) } as CSSProperties}>
                  <span><a href={it.url} target="_blank" rel="noopener noreferrer" data-name={it.name} aria-label={`${it.name}, opens in a new tab`} {...hitProps(it.used, pick)}>
                    <img src={it.logo} alt="" width={30} height={30} loading="lazy" /></a></span>
                </span>
              ))}
            </div>
          ))}
          <div className="stk-core"><WorkspaceMark brand="siso-agency" size={112} paused={!live} interactive /></div>
        </div>
      </div>
      <div className="stk-wrap"><p className="stk-src">From stack.json, updated {UPDATED}. Checked {RESEARCH.counts.repos_checked} repos. {OPEN.publicRepos} open repos. Logos are GitHub org avatars.</p></div>
    </section>
  );
}
