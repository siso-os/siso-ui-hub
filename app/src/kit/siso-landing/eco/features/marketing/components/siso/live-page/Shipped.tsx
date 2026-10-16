// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/live-page/Shipped.tsx)
'use client';

import { memo, useEffect, useRef, useState, type CSSProperties } from 'react';
import { Head, Rail, Tag, useLive } from './base';
import SHIPPED from './liveShipped.json';

// Just shipped: this site's own git log (liveShipped.json, subjects verbatim, with lines added and removed). The feed replays
// the run: it opens a few commits back and lands one newer commit on top per tick, then rests on the newest. A commit that
// names a product's lane wears that product's colour (UI standard §3: product colours on that product's things only).

type Commit = (typeof SHIPPED.commits)[number];
const COMMITS: Commit[] = SHIPPED.commits;
const ROWS = 9, ROW_H = 46, TICK = 2600, REPLAY = 8;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// Authors commit from different time zones; show every time in UTC so the order reads true. getUTC* keeps SSR and client equal.
const when = (iso: string) => { const d = new Date(iso); return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`; };
const LANES: [RegExp, string, string][] = [
  [/ui-hub|UI Hub/i, 'UI Hub', '#1f69ff'],
  [/library/i, 'Great Library', '#7540b7'],
  [/skills/i, 'Skills Hub', '#f5a524'],
  [/agency/i, 'SISO Agency', '#00a879'],
  [/voice/i, 'Voice', '#e0336a'],
  [/agent base|spyder/i, 'Agent Base', '#ed615a'],
];
const lane = (s: string) => LANES.find(([re]) => re.test(s.split(':')[0]));
const MAX_LINES = Math.max(...COMMITS.map(c => c.add + c.del));
const TOTAL = COMMITS.reduce((m, c) => ({ files: m.files + c.files, add: m.add + c.add, del: m.del + c.del }), { files: 0, add: 0, del: 0 });
const fmt = (n: number) => n.toLocaleString('en-US');
const SRC = `Source: ${SHIPPED._source}`;

const CSS = `
.lvs-grid{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:24px;align-items:start}
.lvs-feed{position:relative;border-radius:24px;background:#0a0b0f;box-shadow:inset 0 0 0 1px #ffffff14,0 40px 100px -50px #FF6A1A66;overflow:hidden}
.lvs-bar{display:flex;align-items:center;gap:10px;padding:14px 18px;border-bottom:1px solid #ffffff12}
.lvs-bar code{font:500 11px/1 'Geist Mono',ui-monospace,monospace;color:rgba(255,255,255,.6)}
.lvs-bar code b{color:#FFC24B;font-weight:500}
.lvs-bar .lvs-src{margin-left:auto;font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;color:rgba(255,255,255,.45);cursor:help}
.lvs-dots{display:flex;gap:6px}.lvs-dots i{width:10px;height:10px;border-radius:50%;background:#ffffff1a}
.lvs-win{height:${ROWS * ROW_H + 12}px;overflow:hidden;padding:6px 8px;-webkit-mask-image:linear-gradient(180deg,#000 78%,transparent);mask-image:linear-gradient(180deg,#000 78%,transparent)}
.lvs-win ol{list-style:none;margin:0;padding:0}
.lvs-win ol.is-push{animation:lvs-push .8s var(--lvp-ease) both}
@keyframes lvs-push{from{transform:translateY(-${ROW_H}px)}to{transform:none}}
.lvs-row{display:grid;grid-template-columns:70px minmax(0,1fr) 120px 92px;align-items:center;gap:14px;height:${ROW_H}px;padding:0 12px;border-radius:12px;
  transition:background .3s,transform .35s var(--lvp-ease)}
.lvs-row:hover{background:#ffffff08;transform:translateX(3px)}
.lvs-row code{font:500 11px/1 'Geist Mono',ui-monospace,monospace;color:#FFC24B;transition:text-shadow .3s}
.lvs-row:hover code{text-shadow:0 0 12px #FFC24B}
.lvs-subj{display:flex;align-items:center;gap:9px;min-width:0;font-size:13.5px;color:rgba(255,255,255,.8)}
.lvs-subj span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lvs-row:hover .lvs-subj{color:#fff}
.lvs-lane{flex:none;display:inline-flex;align-items:center;gap:6px;height:20px;padding:0 8px;border-radius:99px;font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase;
  color:color-mix(in srgb,var(--c) 55%,#fff);background:color-mix(in srgb,var(--c) 16%,transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c) 45%,transparent)}
.lvs-lane i{width:6px;height:6px;border-radius:2px;background:var(--c);box-shadow:0 0 8px var(--c)}
.lvs-diff{display:flex;flex-direction:column;gap:5px}
.lvs-diff small{display:flex;gap:8px;font:500 10px/1 'Geist Mono',ui-monospace,monospace;color:rgba(255,255,255,.45)}
.lvs-diff small b{font-weight:500;color:#7ee2a0}.lvs-diff small em{font-style:normal;color:#ff7a8a}
.lvs-diff i{display:flex;height:4px;border-radius:99px;background:#ffffff0d;overflow:hidden}
.lvs-diff i::before,.lvs-diff i::after{content:'';display:block;height:100%}
.lvs-diff i::before{width:calc(var(--a) * 100%);background:#6fdc95}
.lvs-diff i::after{width:calc(var(--d) * 100%);background:#FF2D55}
.lvs-row time{font:10.5px/1 'Geist Mono',ui-monospace,monospace;color:rgba(255,255,255,.45);text-align:right;white-space:nowrap}
.lvs-row.is-new{animation:lvs-land 1.2s var(--lvp-ease) both}
@keyframes lvs-land{from{background:#FFC24B1f}to{background:transparent}}
.lvs-side{display:flex;flex-direction:column;gap:12px}
.lvs-stat{display:flex;flex-direction:column;gap:8px;padding:20px 22px;border-radius:20px;background:#0a0b0f;box-shadow:inset 0 0 0 1px #ffffff14}
.lvs-stat b{font:600 38px/1 'Inter Display',Inter,sans-serif;letter-spacing:-.035em;color:#fff;font-variant-numeric:tabular-nums}
.lvs-stat b.is-add{color:#9ff0c0;text-shadow:0 0 30px #6fdc9555}.lvs-stat b.is-del{color:#ff9aa8}
.lvs-stat small{font-size:13px;color:rgba(255,255,255,.55)}
.lvs-newest{padding:20px 22px;border-radius:20px;background:linear-gradient(160deg,#1c1209,#0a0b0f 60%);box-shadow:inset 0 0 0 1px #FFC24B33}
.lvs-newest p{margin:10px 0 0;font:500 16px/1.4 Inter,sans-serif;letter-spacing:-.01em;color:#fff}
.lvs-newest code{display:block;margin-top:12px;font:500 11px/1 'Geist Mono',ui-monospace,monospace;color:#FFC24B}
@media (max-width:991px){.lvs-grid{grid-template-columns:1fr}.lvs-side{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.lvs-newest{grid-column:1 / -1}}
@media (max-width:767px){
  .lvs-row{grid-template-columns:58px minmax(0,1fr);row-gap:0;height:${ROW_H}px}
  .lvs-diff,.lvs-row time,.lvs-lane{display:none}
  .lvs-bar code{display:none}
  .lvs-stat{padding:16px}.lvs-stat b{font-size:28px}
}
@media (prefers-reduced-motion:reduce){.lvs-win ol.is-push,.lvs-row.is-new{animation:none}}
`;

const Row = memo(function Row({ c, fresh }: { c: Commit; fresh: boolean }) {
  const l = lane(c.subject);
  return (
    <li className={`lvs-row${fresh ? ' is-new' : ''}`} title={c.subject}>
      <code>{c.hash}</code>
      <span className="lvs-subj">{l && <span className="lvs-lane" style={{ ['--c' as string]: l[2] } as CSSProperties}><i />{l[1]}</span>}<span>{c.subject}</span></span>
      <span className="lvs-diff" aria-label={`${c.files} files, ${c.add} lines added, ${c.del} removed`}>
        <small><span>{c.files} file{c.files > 1 ? 's' : ''}</span><b>+{fmt(c.add)}</b><em>−{fmt(c.del)}</em></small>
        <i style={{ ['--a' as string]: Math.sqrt(c.add / MAX_LINES), ['--d' as string]: Math.sqrt(c.del / MAX_LINES) } as CSSProperties} />
      </span>
      <time dateTime={c.at}>{when(c.at)}</time>
    </li>
  );
});

export default function Shipped() {
  const ref = useRef<HTMLElement>(null);
  const { live } = useLive(ref, 0.2);
  const [step, setStep] = useState(0);
  const [held, setHeld] = useState(false);
  const top = Math.max(0, REPLAY - step);
  useEffect(() => {
    if (!live || held || top === 0) return;
    const id = window.setTimeout(() => setStep(s => s + 1), TICK);
    return () => window.clearTimeout(id);
  }, [live, held, top]);
  const pushed = step > 0;
  const newest = COMMITS[0];

  return (
    <section ref={ref} id="lvp-shipped" className="lvp-band lvs" data-live={live || undefined} data-shot="shipped" aria-labelledby="lvs-title">
      <style>{CSS}</style>
      <Rail />
      <div className="lvp-wrap">
        <Head id="lvs-title" over="Just shipped" tag={<Tag kind="data" src={SRC} />} title="This site, commit by commit."
          line="The newest changes to the page you are reading, straight from its git log. Most subjects open with the name of the lane that wrote them." />
        <div className="lvs-grid">
          <div className="lvs-feed" onPointerEnter={() => setHeld(true)} onPointerLeave={() => setHeld(false)}>
            <div className="lvs-bar">
              <span className="lvs-dots" aria-hidden="true"><i /><i /><i /></span>
              <code>git log --no-merges <b>{SHIPPED.repo}</b></code>
              <span className="lvs-src is-right" tabIndex={0} data-src={SRC}>source · times in UTC</span>
            </div>
            <div className="lvs-win">
              <ol key={top} className={pushed ? 'is-push' : undefined}>
                {COMMITS.slice(top, top + ROWS + 1).map((c, i) => <Row key={c.hash} c={c} fresh={pushed && i === 0} />)}
              </ol>
            </div>
          </div>
          <aside className="lvs-side" aria-label={`Totals for these ${COMMITS.length} commits`}>
            <div className="lvs-newest lvp-neon" tabIndex={0}>
              <span className="lvp-label">Newest</span>
              <p>{newest.subject}</p>
              <code>{newest.hash} · {when(newest.at)} UTC</code>
            </div>
            <div className="lvs-stat"><span className="lvp-label">Lines added</span><b className="is-add">+{fmt(TOTAL.add)}</b><small>in the last {COMMITS.length} commits</small></div>
            <div className="lvs-stat"><span className="lvp-label">Lines removed</span><b className="is-del">−{fmt(TOTAL.del)}</b><small>across {fmt(TOTAL.files)} file changes</small></div>
          </aside>
        </div>
      </div>
    </section>
  );
}
