// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/Footer/Lights.tsx)
'use client';

import { useEffect, useRef } from 'react';

// The footer's ambience (Shaan, 9 Oct: "something a bit more like how the top nav is ... permanent ambience ... the background's
// just black with some lines going through on the background zigzagging"). Black base, faint zigzag traces pushed back and
// softly blurred ("too much in the foreground ... a bit more background blur"), a rare ember pulse, lit around the pointer.

// The section partitions carry the neon (Shaan, 9 Oct: "these three div lines ... that's where that line goes"; "I thought the
// div lines would be in the middle"; "partitions ... not like straight lines", after terminal-industries.com). Agent Base's
// rail edge (siso-tokens --crm-gradient-rail-edge: a hairline that fades out at both ends and burns brightest in the middle),
// stepped down in a chamfered notch at the centre, with a spark that runs along it and a soft bloom under the notch.
// With a label, the notch drops deeper into a tab that holds a link (the first divider carries "All projects": Shaan, 9 Oct,
// "you can put the all projects up above that notch ... where the divider is, where the scrolly things is").
export function Rail({ label, href }: { label?: string; href?: string }) {
  return (
    <div className={label ? 'sf-rail is-tab' : 'sf-rail'} aria-hidden={label ? undefined : true}>
      <i><span /></i>
      {label && href && <a className="sf-rail-tab" href={href}>{label}<b aria-hidden="true">→</b></a>}
    </div>
  );
}

// Zigzag traces across a 1440x720 field: long runs with 45° steps, like circuit lines.
const TRACES = [
  'M-40 96 H260 l48 48 H640 l48 -48 H1480',
  'M-40 232 H120 l64 64 H520 l40 -40 H900 l64 64 H1480',
  'M-40 388 H340 l56 -56 H780 l56 56 H1120 l48 -48 H1480',
  'M-40 520 H200 l40 40 H600 l72 -72 H1040 l40 40 H1480',
  'M-40 648 H420 l48 -48 H860 l48 48 H1480',
];
const PULSES = [
  { d: TRACES[1], dur: 9, delay: -2 },
  { d: TRACES[3], dur: 12, delay: -7 },
  { d: TRACES[4], dur: 10, delay: -4 },
];

function Traces({ lit }: { lit?: boolean }) {
  return (
    <svg className={lit ? 'sf-traces sf-traces-lit' : 'sf-traces'} viewBox="0 0 1440 720" preserveAspectRatio="none">
      {TRACES.map(d => <path key={d} d={d} vectorEffect="non-scaling-stroke" />)}
      {!lit && PULSES.map(p => (
        <path key={p.d} className="sf-pulse" d={p.d} pathLength={1000} vectorEffect="non-scaling-stroke"
          style={{ animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }} />
      ))}
    </svg>
  );
}

export default function FooterLights() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const footer = ref.current?.parentElement;
    if (!footer) return;
    // The chat orb steps aside while the footer is on screen (Shaan, 9 Oct: "the AI orb chat on the bottom right should hide
    // itself when we're on the footer").
    const io = new IntersectionObserver(([e]) => {
      footer.toggleAttribute('data-live', e.isIntersecting);
      document.documentElement.toggleAttribute('data-footer-in', e.isIntersecting);
    });
    io.observe(footer);
    let raf = 0;
    const move = (ev: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = footer.getBoundingClientRect();
        footer.style.setProperty('--sf-x', `${Math.round(ev.clientX - r.left)}px`);
        footer.style.setProperty('--sf-y', `${Math.round(ev.clientY - r.top)}px`);
        footer.setAttribute('data-pointer', '');
      });
    };
    const leave = () => footer.removeAttribute('data-pointer');
    footer.addEventListener('pointermove', move, { passive: true });
    footer.addEventListener('pointerleave', leave);
    return () => { io.disconnect(); document.documentElement.removeAttribute('data-footer-in'); cancelAnimationFrame(raf); footer.removeEventListener('pointermove', move); footer.removeEventListener('pointerleave', leave); };
  }, []);
  return (
    <div ref={ref} className="sf-lights" aria-hidden="true">
      <style>{LIGHTS_CSS}</style>
      <Traces />
      <Traces lit />
    </div>
  );
}

const TAB = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='30'%3E%3Cpath d='M0 .5H52l28 28h160l28-28h52' fill='none' stroke='%23000'/%3E%3C/svg%3E")`;
const NOTCH = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='12'%3E%3Cpath d='M0 .5H40l10 10h160l10-10h40' fill='none' stroke='%23000'/%3E%3C/svg%3E")`;

const LIGHTS_CSS = `
.sf{position:relative;isolation:isolate;overflow:hidden;--sf-x:50%;--sf-y:-400px}
.sf-lights{position:absolute;inset:0;z-index:-1;pointer-events:none}
.sf-traces{position:absolute;inset:0;width:100%;height:100%;fill:none;filter:blur(.8px)}
.sf-traces path{stroke:#ffffff08;stroke-width:1}
.sf-traces .sf-pulse{stroke:#FF6A1A;stroke-width:1.5;stroke-linecap:round;stroke-dasharray:70 930;stroke-dashoffset:1000;
  stroke-opacity:.32;filter:drop-shadow(0 0 6px #FF6A1A66);animation:sf-pulse 10s linear infinite}
@keyframes sf-pulse{to{stroke-dashoffset:0}}
.sf-traces-lit{opacity:0;transition:opacity .5s;filter:blur(1.2px);-webkit-mask-image:radial-gradient(260px circle at var(--sf-x) var(--sf-y),#000,transparent 70%);
  mask-image:radial-gradient(260px circle at var(--sf-x) var(--sf-y),#000,transparent 70%)}
.sf-traces-lit path{stroke:#FFB547;stroke-opacity:.3}
.sf[data-pointer] .sf-traces-lit{opacity:1}
.sf-rail{position:relative;height:12px;margin:-4px 0 -8px}
.sf-rail>i{position:absolute;inset:0;filter:drop-shadow(0 0 5px #FF6A1A99)}
.sf-rail::after{content:"";position:absolute;left:50%;top:0;width:min(640px,90%);height:110px;transform:translateX(-50%);pointer-events:none;
  background:radial-gradient(50% 55% at 50% 0,#FF6A1A1c,#FF2D550a 55%,transparent 80%)}
.sf-rail>i>span{position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,#fff7e8,transparent) -30% 0/16% 100% no-repeat,
    linear-gradient(90deg,transparent,#FF6A1A40 16%,#FFC24B99 38%,#fff3d6 50%,#FF2D5599 62%,#FF6A1A40 84%,transparent);
  -webkit-mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  animation:sf-spark 7s cubic-bezier(.45,0,.55,1) infinite}
.sf-rail.is-tab{height:30px;margin:-4px 0 -12px}
.sf-rail.is-tab>i>span{
  -webkit-mask:linear-gradient(#000 0 0) left top/calc(50% - 160px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 160px) 1px no-repeat,${TAB} center top/320px 30px no-repeat;
  mask:linear-gradient(#000 0 0) left top/calc(50% - 160px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 160px) 1px no-repeat,${TAB} center top/320px 30px no-repeat}
.sf-rail-tab{position:absolute;left:50%;top:3px;transform:translateX(-50%);display:flex;align-items:center;gap:8px;height:22px;padding:0 10px;border-radius:8px;
  font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#FFB547;white-space:nowrap;
  transition:color .25s,text-shadow .25s,background .25s}
.sf-rail-tab b{font-weight:500;transition:transform .3s cubic-bezier(.19,1,.22,1)}
.sf-rail-tab:hover,.sf-rail-tab:focus-visible{color:#fff;background:#FF6A1A14;text-shadow:0 0 12px #FF6A1A}
.sf-rail-tab:hover b,.sf-rail-tab:focus-visible b{transform:translateX(4px)}
.sf-rail:nth-of-type(2n)>i>span{animation-delay:-2.4s}
@keyframes sf-spark{to{background-position:130% 0,0 0}}
.siso-chat-orb{transition:opacity .35s,transform .45s cubic-bezier(.19,1,.22,1)}
html[data-footer-in] .siso-chat-orb{opacity:0;transform:translateY(16px) scale(.9);pointer-events:none}
.sf:not([data-live]) .sf-pulse,.sf:not([data-live]) .sf-rail>i>span{animation-play-state:paused}
@media (prefers-reduced-motion:reduce){.sf-pulse,.sf-rail>i>span{animation:none}.sf-pulse{display:none}.sf-traces-lit{display:none}}
`;
