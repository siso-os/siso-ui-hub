// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/industries/hub/SitesGlobe.tsx)
'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent as RPointerEvent } from 'react';
import createGlobe, { type Globe, type Marker } from 'cobe';
import SITES from '../../../../data/agency-sites.json';

// The cobe globe from the Agency home card (home-products/agency/AgencyDemo.tsx), reused here to show where the sites
// our agents built actually are (spec §3). Same construction, trimmed to this page's job: sites only, no industries
// mode, no in-page browser — a light you hover to read and click to open.
//
// cobe 2 is MIT and draws the sphere in WebGL; its own marker projection is copied below so a pin can be hovered and
// clicked at the right place on screen. Real pins sit at the business's own address; Shaan asked for the rest to be
// spread "for visual sake" (9 Oct), so nothing here names a place.
//
// No lag: one requestAnimationFrame loop that only runs while something moves and the globe is on screen, markers
// rebuilt only when they change, and the canvas never resized after it is made (resizing clears it, which reads as a
// flicker — UI standard §4.6).

type Site = (typeof SITES.sites)[number];
const ALL = SITES.sites as Site[];
type Pin = { site: number; lat: number; lng: number; real: boolean; hero?: boolean };

// Real pins: Corner Café at its address, the rest of its city's sites on a small golden-angle spiral round it, so each light
// can still be picked (at this zoom a whole city is a few pixels). Spread pins keep the coordinates from the data file.
const PINS: Pin[] = (() => {
  const c = ALL[0].at;
  const out: Pin[] = [{ site: 0, lat: c[0], lng: c[1], real: true, hero: true }];
  const real: Pin[] = [], spread: Pin[] = [];
  ALL.forEach((s, i) => {
    if (s.k === 'look') return; // the 7 looks share Corner Café's address; its own pin stands for them
    if (s.k === 'client') return;
    if (s.real) {
      const r = real.length + 1, a = r * 2.39996, d = .45 + Math.sqrt(r) * .44;
      real.push({ site: i, lat: c[0] + Math.sin(a) * d, lng: c[1] + Math.cos(a) * d / Math.cos(c[0] * Math.PI / 180), real: true });
    } else spread.push({ site: i, lat: s.at[0], lng: s.at[1], real: false });
  });
  return out.concat(real, spread);
})();

const V = (lat: number, lng: number) => {
  const r = lat * Math.PI / 180, a = lng * Math.PI / 180 - Math.PI, c = Math.cos(r);
  return [-c * Math.cos(a), Math.sin(r), c * Math.sin(a)];
};
const XYZ = new Float32Array(PINS.flatMap(p => V(p.lat, p.lng)));
const TAU = Math.PI * 2;

// cobe's own marker projection (dist/index.esm.js, O and W): globe radius .8, square canvas, scale 1, no offset.
function project(i: number, phi: number, theta: number, out: number[]) {
  const cp = Math.cos(phi), sp = Math.sin(phi), ct = Math.cos(theta), st = Math.sin(theta);
  const x0 = XYZ[i * 3] * .8, y0 = XYZ[i * 3 + 1] * .8, z0 = XYZ[i * 3 + 2] * .8;
  const x = cp * x0 + sp * z0, y = sp * st * x0 + ct * y0 - cp * st * z0;
  out[0] = (x + 1) / 2; out[1] = (1 - y) / 2; out[2] = -sp * ct * x0 + st * y0 + cp * ct * z0;
  return out;
}
const aim = (lat: number, lng: number) => ({ phi: 1.5 * Math.PI - lng * Math.PI / 180, theta: Math.max(-.6, Math.min(.75, lat * Math.PI / 180)) });
const rgb = (hex: string): [number, number, number] => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number];
const GOLD = rgb('#FFC24B'), HOT = rgb('#fff3d6'), MINT = rgb('#9ff0cf'), WHITE: [number, number, number] = [1, 1, 1];
const mix = (a: number[], b: number[], k: number) => a.map((v, i) => v + (b[i] - v) * k) as [number, number, number];

const CSS = `
.ihg{position:relative;width:100%;aspect-ratio:1;max-width:520px;margin:0 auto;touch-action:pan-y;
  contain:layout size;overflow:hidden}
.ihg-c{position:absolute;inset:0;cursor:grab;overflow:hidden}
.ihg-c[data-drag]{cursor:grabbing}
.ihg-c[data-on]{cursor:pointer}
/* cobe writes its own width/height attributes on the canvas; the box it is laid out in is ours */
.ihg-c>canvas{display:block;width:100%;height:100%;max-width:100%;max-height:100%}
.ihg-ring{position:absolute;inset:4%;border-radius:50%;pointer-events:none;
  box-shadow:inset 0 0 60px -20px #00a87966,0 0 70px -24px #00a87959}
.ihg-chip{position:absolute;left:0;top:0;z-index:3;display:flex;flex-direction:column;gap:3px;padding:9px 12px;border-radius:10px;
  background:#060a08f2;border:1px solid #9ff0cf3d;box-shadow:0 10px 30px -10px #000,0 0 22px -12px #00a879;
  pointer-events:none;opacity:0;transform:translate(-50%,calc(-100% - 12px)) scale(.96);
  transition:opacity .18s,transform .22s cubic-bezier(.19,1,.22,1);white-space:nowrap}
.ihg-chip[data-show]{opacity:1;transform:translate(-50%,calc(-100% - 14px)) scale(1)}
.ihg-chip b{font:600 13px/1.2 'Inter Display',Inter,sans-serif;letter-spacing:-.01em;color:#fff}
.ihg-chip i{font:500 10px/1.3 'Geist Mono',ui-monospace,monospace;letter-spacing:.07em;text-transform:uppercase;color:#9ff0cf;font-style:normal}
.ihg-chip u{font:400 10.5px/1.3 'Geist Mono',ui-monospace,monospace;color:#ffffff6b;text-decoration:none;letter-spacing:.02em}
.ihg-none{position:absolute;inset:0;display:grid;place-items:center;border-radius:50%;
  background:radial-gradient(60% 60% at 38% 34%,#0e4a35,#04201700 72%),#030b08;border:1px solid #9ff0cf1f}
.ihg-none span{font:500 11px/1.6 'Geist Mono',ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;color:#ffffff59;text-align:center;max-width:60%}
.ihg-hint{margin:18px 0 0;text-align:center;font:500 10.5px/1.6 'Geist Mono',ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;color:#ffffff4d}
@media (prefers-reduced-motion:reduce){.ihg-chip{transition:none}}
`;

export default function SitesGlobe({ live, reduce }: { live: boolean; reduce: boolean }) {
  const holder = useRef<HTMLDivElement>(null);
  const chip = useRef<HTMLDivElement>(null);
  const globe = useRef<Globe | null>(null);
  const tmp = useRef([0, 0, 0]);
  const [ready, setReady] = useState<'wait' | 'gl' | 'none'>('wait');
  const [hover, setHover] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);

  const S = useRef({
    phi: aim(16, 108).phi - .9, theta: .28, vel: 0,
    drag: null as null | { x: number; y: number; phi: number; theta: number; moved: boolean; lx: number },
    over: false, hover: null as number | null, dirty: true, raf: 0, last: 0, live: false, reduce: false,
  });
  const s0 = S.current;
  s0.live = live; s0.reduce = reduce;

  const markers = useCallback((): Marker[] => {
    const s = S.current;
    return PINS.map((p, i) => {
      const on = s.hover === i;
      return {
        location: [p.lat, p.lng] as [number, number],
        size: (p.hero ? .05 : p.real ? .024 : .027) * (on ? 1.8 : 1),
        color: on ? WHITE : p.hero ? HOT : p.real ? GOLD : mix(HOT, GOLD, .35),
      };
    });
  }, []);

  // Put the hover chip over the pin it belongs to, in the holder's own coordinates.
  const place = useCallback(() => {
    const s = S.current, c = chip.current, h = holder.current;
    if (!c || !h || s.hover === null) return;
    const p = project(s.hover, s.phi, s.theta, tmp.current);
    const w = h.clientWidth;
    c.style.transform = `translate(${(p[0] * w).toFixed(1)}px,${(p[1] * w).toFixed(1)}px)`;
  }, []);

  const frame = useCallback((now: number) => {
    const s = S.current, g = globe.current;
    s.raf = 0;
    if (!g) return;
    if (s.last && now - s.last < 11) { if (s.live) s.raf = requestAnimationFrame(frame); return; }
    const dt = Math.min(50, s.last ? now - s.last : 16); s.last = now;
    let moving = false;
    if (!s.drag) {
      if (Math.abs(s.vel) > .0002) { s.phi += s.vel; s.vel *= .94; moving = true; }
      else if (!s.reduce && !s.over && s.live) { s.phi += .00011 * dt; moving = true; }
    } else moving = true;
    s.phi = ((s.phi % TAU) + TAU) % TAU;
    const upd: Parameters<Globe['update']>[0] = { phi: s.phi, theta: s.theta };
    if (s.dirty) { upd.markers = markers(); s.dirty = false; }
    g.update(upd);
    place();
    if (moving && s.live) s.raf = requestAnimationFrame(frame);
  }, [markers, place]);
  const kick = useCallback(() => { const s = S.current; if (!s.raf && globe.current) { s.last = 0; s.raf = requestAnimationFrame(frame); } }, [frame]);

  // Make the globe the first time it is seen, at the size it is then. Never resized after (that clears the canvas).
  useEffect(() => {
    const host = holder.current;
    if (!host || globe.current || !(live || reduce)) return;
    const px = Math.round(host.clientWidth);
    if (!px) return;
    const c = document.createElement('canvas');
    // cobe multiplies width/height by devicePixelRatio itself, so these are CSS pixels, not device pixels. Passing the
    // doubled size here as well drew the sphere at twice the box and spilled it over the numbers below.
    c.style.width = '100%';
    c.style.height = '100%';
    host.append(c);
    const g = createGlobe(c, {
      devicePixelRatio: Math.min(2, window.devicePixelRatio || 1),
      width: px, height: px, phi: S.current.phi, theta: S.current.theta,
      dark: 1, diffuse: 1.25, mapSamples: 16000, mapBrightness: 7, mapBaseBrightness: .02,
      baseColor: MINT, markerColor: GOLD, glowColor: rgb('#7ff5c8'), markers: [], opacity: .96, markerElevation: 0,
    });
    // cobe hands back a no-op globe when WebGL is missing: show the static sphere instead.
    if (!c.getContext('webgl2') && !c.getContext('webgl')) { g.destroy(); host.replaceChildren(); setReady('none'); return; }
    globe.current = g;
    S.current.dirty = true;
    setReady('gl');
    kick();
  }, [live, reduce, kick]);
  useEffect(() => () => { globe.current?.destroy(); globe.current = null; cancelAnimationFrame(S.current.raf); }, []);
  useEffect(() => { kick(); }, [kick, live, hover]);
  useLayoutEffect(() => { place(); }, [hover, place]);

  const pickAt = (fx: number, fy: number, radius: number) => {
    const s = S.current, p = tmp.current;
    let best: number | null = null, bd = radius * radius;
    PINS.forEach((_, i) => {
      project(i, s.phi, s.theta, p);
      const dd = (p[0] - fx) ** 2 + (p[1] - fy) ** 2;
      if (p[2] > .05 && dd < bd) { bd = dd; best = i; }
    });
    return best;
  };
  const toFrac = (e: RPointerEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    return { fx: (e.clientX - r.left) / r.width, fy: (e.clientY - r.top) / r.height, w: r.width };
  };
  const setHv = (i: number | null) => {
    const s = S.current;
    if (s.hover === i) return;
    s.hover = i; s.dirty = true; setHover(i); kick();
  };
  const onDown = (e: RPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const s = S.current;
    s.drag = { x: e.clientX, y: e.clientY, phi: s.phi, theta: s.theta, moved: false, lx: e.clientX };
    s.vel = 0;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* a pointer the browser no longer tracks */ }
    setDragging(true); kick();
  };
  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    const s = S.current, { fx, fy, w } = toFrac(e);
    s.over = true;
    if (s.drag) {
      const dx = e.clientX - s.drag.x, dy = e.clientY - s.drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 5) s.drag.moved = true;
      if (s.drag.moved) {
        s.phi = s.drag.phi + dx / w * Math.PI * 1.1;
        if (e.pointerType === 'mouse') s.theta = Math.max(-.6, Math.min(.85, s.drag.theta + dy / w * Math.PI * .7));
        s.vel = (e.clientX - s.drag.lx) / w * Math.PI * 1.1 * .6; s.drag.lx = e.clientX;
        kick();
        return;
      }
    }
    setHv(pickAt(fx, fy, 16 / w));
  };
  const onUp = (e: RPointerEvent<HTMLDivElement>) => {
    const s = S.current, d = s.drag;
    s.drag = null; setDragging(false);
    if (!d || d.moved) { kick(); return; }
    const { fx, fy, w } = toFrac(e);
    const i = pickAt(fx, fy, 18 / w);
    if (i !== null) window.open(ALL[PINS[i].site].u, '_blank', 'noopener,noreferrer');
  };
  const onLeave = () => { const s = S.current; s.over = false; setHv(null); kick(); };

  const hv = hover !== null ? ALL[PINS[hover].site] : null;
  const host = (u: string) => u.replace(/^https:\/\//, '').replace(/\/$/, '');

  return (
    <div className="ihg">
      <style>{CSS}</style>
      {ready === 'none'
        ? <div className="ihg-none"><span>{SITES.sites.length} sites built · this view needs WebGL</span></div>
        : <>
          <div
            ref={holder} className="ihg-c" data-drag={dragging || undefined} data-on={hover !== null || undefined}
            onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onPointerLeave={onLeave}
            role="group" aria-label={`A globe of the ${ALL.length} sites our agents built. Drag to turn it; click a light to open that site.`}
          />
          <div className="ihg-ring" aria-hidden="true" />
          <div ref={chip} className="ihg-chip" data-show={hv ? true : undefined} aria-hidden="true">
            {hv && <><i>{hv.k === 'client' ? 'Live client site' : hv.real ? 'Real preview' : 'Preview'}</i><b>{hv.n}</b><u>{host(hv.u)}</u></>}
          </div>
        </>}
    </div>
  );
}

export const SITE_COUNT = ALL.length;
export const SITE_FUNNEL = SITES.funnel;
