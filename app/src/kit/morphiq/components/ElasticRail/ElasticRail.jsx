'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import './ElasticRail.css'

/* =========================================================
   ElasticRail
   A scroll progress rail that bows when you push past the
   end of the page, and twangs back when you let go.

   The rail is a string fixed at both ends. Let go of, it
   obeys the wave equation, discretised:

     ẍᵢ = (T/μ)·(xᵢ₋₁ − 2xᵢ + xᵢ₊₁)/Δx² − damping·ẋᵢ

   with Δx the real spacing of the nodes along the rail. That
   Δx² is the whole point: leave it out and every rail rings
   at the same pitch whatever its length. With it, the pitch
   is not a constant someone chose. For a string of length L
   under tension T with mass per length μ, the fundamental is

     f = (1/2L)·√(T/μ)

   so a longer rail rings lower. On a tall page the rail is
   long and the twang is slow and deep; on a short one it is
   short and sharp. Nothing has to be tuned per page — the
   geometry does it, which is the whole reason to use a
   string rather than a spring.

   What bows it is the page being pushed past its end, and
   only some platforms report that. Safari lets the page run
   elastically past the end and says how far, so there the
   rail bows by give × that distance and nothing more is
   needed. Everywhere else the scroll position stops dead at
   the end and a rail that waited for it to go past would
   never move. So where the platform has no overscroll the
   rail stands in for it: a wheel, a finger or a scroll key
   still pushing once the page is against its end is taken
   as x px of push, and resisted the way a rubber-banding
   page resists it,

     e = c·x·R / (R + c·x)        c = 0.55

   — c px of overscroll per px at first, stiffer the further
   it goes, and never more than R, the reach. A finger is
   read as it is. A wheel has no finger to read: each notch
   arrives over a few hundredths of a second rather than in
   one frame, and a push that is not kept up leaks away, so a
   steady scroll into the end holds the rail bowed, a single
   notch knocks it, and a page thrown at its end lands as one
   swell rather than a second of momentum. Only pushes that
   were going to the tracked scroller count: one that starts
   in a scroller nested inside it, with somewhere left to
   go, is that scroller's own.

   Pushed, the string is on the hand: it sits exactly where
   the push puts it, in its fundamental — half a sine, anchor
   to anchor — and is not simulated, because a held string
   does not ring. The naive version sets the shape on every
   scroll event and lets the simulation run underneath, and
   the two fight: the bow sags away while the page is still
   held past its end, then jumps back out on the next event.
   A string caught mid-ring is drawn onto the hand over a few
   hundredths of a second from where it was and how fast it
   was going, rather than jumping to it.

   The hand has let go when the push falls back faster than a
   hand would lower it — a page springing home, a wheel gone
   quiet — or when the finger lifts. A push eased back slowly
   lowers the string with it and nothing rings. On release
   the string leaves from where it is with the hand's own
   velocity, fitted over the last 70 ms of the push rather
   than taken from one event, and from there the wave
   equation has it, stepped in slices no longer than 1/240 s
   so it rings the same at 60 Hz and 120 Hz. The loop stops
   the moment it has settled.

   The fill follows the page over about 60 ms rather than
   being set to it, so a jump to an anchor or the far end
   sweeps the rail instead of blinking across it, and a
   notched wheel does not step it.

   The rail is drawn as a quadratic through the displaced
   nodes rather than a polyline, so the curve stays smooth at
   the twenty-odd nodes the simulation actually needs.

   It takes no pointer and no focus: it reports, it is not a
   control. It is a progressbar to assistive tech, with the
   page's position as its value. Under reduced motion it is
   the progress bar and nothing else — straight, and set to
   the page rather than eased. Off screen it keeps its value
   and draws nothing.
   ========================================================= */

const clamp = (n, lo, hi) => (n < lo ? lo : n > hi ? hi : n)
const finite = (n, d) => (Number.isFinite(n) ? n : d)

/* Whatever measures and draws runs as a layout effect, so the first paint
   already has the rail on it rather than one empty frame before it. Plain
   useEffect on the server, where there is nothing to lay out and older Reacts
   warn about it. */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/* Mass per px of rail. Chosen so the default tension rings a viewport-tall
   rail, about 800px, near 1.6 Hz; a rail half as long rings twice as high. */
const MU = 8.3e-4

const STEP = 1 / 240   // s — the longest slice the string is stepped in
const RESIST = 0.55    // px of stand-in overscroll per px of push, at first
const SWELL = 0.045    // s — how long a wheel notch takes to arrive at the string
const LEAK = 0.14      // s — how quickly a wheel's push relaxes when it is not kept up
const PICKUP = 0.035   // s — how quickly a string caught mid-ring comes onto the hand
const KEEP = 0.88      // the hand has let go once the push is below this much of its crest
const SLIP = 0.25      // s — a push eased back more slowly than this is lowered, not let go
const REGRIP = 0.15    // of the last crest: how far a let-go push must rise again to take hold
const FAINT = 0.25     // px of overscroll below which nothing is pushing
const TRAIL = 70       // ms of the push the release velocity is fitted over
const FAST = 4000      // px/s — the fastest a hand is taken to leave the string
const STILL = 0.2      // px — a ring smaller than this is over
const FOLLOW = 0.06    // s — how quickly the fill follows the page
const LINE = 100 / 3   // px per line, for a wheel that reports lines: three to a notch
const LATCH = 250      // ms — a wheel gesture belongs to the scroller it started on this long
const KEYS = { ArrowDown: 40, ArrowUp: -40, PageDown: 100, PageUp: -100, End: 100, Home: -100 }

export default function ElasticRail({
  nodes = 24,          // simulation nodes along the string
  tension = 5200,      // T — wave speed is √(T/μ), and the pitch follows from that and the length
  damping = 4.5,       // 1/s — the ring dies as e^(−damping·t/2)
  give = 0.42,         // px of bulge per px of overscroll
  reach = 120,         // px — the most overscroll the rail stands in for where the platform has none; 0 for none
  thickness = 3,       // stroke width, px
  progressColor,       // the fill; currentColor when unset
  trackColor,          // the track, drawn at 18%; currentColor when unset
  vertical = false,    // run top to bottom rather than left to right
  target,              // element to track; defaults to the page
  className = '',
  style,
  ...rest
}) {
  const rootRef = useRef(null)
  const svgRef = useRef(null)
  const trackRef = useRef(null)
  const fillRef = useRef(null)

  const live = useRef({})
  // Synced after every render and before the effect below, so the loop reads
  // current props without being torn down and restarted.
  useIsomorphicLayoutEffect(() => {
    live.current = { tension, damping, give, reach, vertical }
  })

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current
    const svg = svgRef.current
    const track = trackRef.current
    const fill = fillRef.current
    if (!root || !svg || !track || !fill) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let still = motion.matches
    let seen = true

    const read = () => {
      const p = live.current
      return {
        T: Math.max(0, finite(p.tension, 5200)),
        d: Math.max(0.1, finite(p.damping, 4.5)),   // a string always loses something to the air
        give: finite(p.give, 0.42),
        reach: Number.isNaN(+p.reach) ? 120 : Math.max(0, +p.reach),   // Infinity is no limit at all
      }
    }

    const n = clamp(Math.round(finite(nodes, 24)), 4, 256)
    const y = new Float64Array(n)
    const v = new Float64Array(n)
    // The fundamental: half a sine, anchor to anchor. The shape a push holds
    // the string in, so that let go it rings in one clean mode.
    const s = new Float64Array(n)
    for (let i = 1; i < n - 1; i++) s[i] = Math.sin((i / (n - 1)) * Math.PI)
    // What a caught string had that the hand had not: how far off it stood
    // and how fast it was moving, node by node.
    const o0 = new Float64Array(n)
    const w0 = new Float64Array(n)

    let W = 0, H = 0, L = 0
    let top = 0, max = 0             // the scroll position and its range, as last read
    let progress = 0, shown = 0      // where the page is, and where the fill has got to
    let drawn = -1, pct = -1         // the fill and the aria value as last written
    let native = 0                   // overscroll the platform reports, px
    let travel = 0                   // a finger's travel past the end, px
    let wq = 0, wx = 0, wt = 0       // a wheel's push: still to arrive, arrived, and as of when
    let fingers = 0, fid = -1, fx = 0, fy = 0, shut = false
    let latched = false, latchDir = 0, latchT = -1e9

    // The hand. Holding, the string sits at bulge × s; crest is the push's
    // high-water mark, eased down behind a push that is being lowered. Let
    // go, trough is how far the push has fallen back since.
    let held = false, side = 1, bulge = 0, push = 0
    let crest = 0, trough = 0, regrip = FAINT, felt = 0
    let caught = 0, catching = false, slackest = 0
    let trail = []                   // [t, bulge] along the push
    let ringing = false
    let dirty = true                 // the string's shape has changed since it was drawn
    let raf = 0, last = 0
    let tick = 1 / 60                // the display's frame interval, as last measured

    const scroller = () => target || document.scrollingElement || document.documentElement

    const measure = () => {
      W = root.offsetWidth
      H = root.offsetHeight
      L = live.current.vertical ? H : W
      svg.setAttribute('viewBox', `0 0 ${Math.max(1, W)} ${Math.max(1, H)}`)
      dirty = true
    }

    const locate = () => {
      const el = scroller()
      max = Math.max(0, el.scrollHeight - el.clientHeight)
      top = el.scrollTop
      progress = max > 0 ? clamp(top / max, 0, 1) : 0
      // Past either end is the platform's own elastic overscroll. Under a
      // pixel is a fractional scroll position, not a push.
      const out = top < 0 ? top : top > max ? top - max : 0
      native = Math.abs(out) < 1 ? 0 : out
    }

    // x px of push past the end, as overscroll: RESIST of it at first, less
    // the further it goes, and never more than R.
    const band = (x, R) => (R > 0 ? (RESIST * x) / (1 + (RESIST * Math.abs(x)) / R) : 0)

    // A wheel's push as of t. What a notch brings arrives over SWELL and what
    // has arrived leaks away over LEAK; both in closed form, so it is the same
    // push however many frames it is read in.
    const relax = (t) => {
      const dt = Math.max(0, t - wt) / 1000
      wt = Math.max(wt, t)
      if (!wq && !wx) return
      const a = Math.exp(-dt / SWELL)
      const b = Math.exp(-dt / LEAK)
      wx = wx * b + wq * (LEAK / (LEAK - SWELL)) * (b - a)
      wq *= a
      if (Math.abs(wq) < 0.05 && Math.abs(wx) < 0.05) wq = wx = 0
    }

    // The hand's velocity over the end of the push, by least squares.
    const fling = (t) => {
      let m = 0, mt = 0, mb = 0
      for (const q of trail) if (q[0] >= t - TRAIL) { m++; mt += q[0]; mb += q[1] }
      if (m < 2) return 0
      mt /= m; mb /= m
      let tt = 0, tb = 0
      for (const q of trail) {
        if (q[0] < t - TRAIL) continue
        const d = q[0] - mt
        tt += d * d; tb += d * (q[1] - mb)
      }
      return tt > 1 ? clamp((tb / tt) * 1000, -FAST, FAST) : 0
    }

    // How far the caught string still stands off the hand, and how fast that
    // is closing: a critically damped approach from (o0, w0), in closed form.
    const fade = (t) => {
      const u = Math.max(0, t - caught) / 1000
      return [u, catching ? Math.exp(-u / PICKUP) : 0]
    }

    // The hand, at bulge b, takes the string. Whatever the string has that
    // the hand has not — how far off it stands, how fast it is going — is
    // kept, and closes over PICKUP, so the first frame draws exactly what was
    // there.
    const grab = (t, sg, b) => {
      held = true
      side = sg
      ringing = false
      caught = t
      trail = []
      slackest = 0
      for (let i = 1; i < n - 1; i++) {
        o0[i] = y[i] - b * s[i]
        w0[i] = v[i]
        v[i] = 0
        slackest = Math.max(slackest, Math.abs(o0[i]) + Math.abs(w0[i]) * PICKUP)
      }
      catching = slackest > 0.05
    }

    const release = (t) => {
      if (!held) return
      const vb = fling(t)
      const [u, e] = fade(t)
      for (let i = 1; i < n - 1; i++) {
        v[i] = vb * s[i] + e * (w0[i] - ((w0[i] + o0[i] / PICKUP) * u) / PICKUP)
      }
      held = false
      catching = false
      trough = Math.abs(push)
      regrip = Math.max(FAINT, REGRIP * crest)
      ringing = true
    }

    // Read the push as of t and decide whether the hand is on the string.
    const feel = (t) => {
      relax(t)
      const p = read()
      if (still || !seen || native) travel = wq = wx = 0
      const e = still || !seen ? 0 : native || band(travel + wx, p.reach)
      const a = Math.abs(e)
      const sg = e < 0 ? -1 : e > 0 ? 1 : side
      const dt = Math.max(0, t - felt) / 1000
      felt = Math.max(felt, t)
      // A finger on the glass is holding it for as long as it is there.
      const pinned = fingers > 0 && (native !== 0 || travel !== 0)

      if (held) {
        // Nothing left of it, unless that is a notch which has yet to arrive.
        const gone = a < FAINT && Math.abs(wq) < 0.5
        // A push that has vanished or changed ends is not somewhere the hand
        // went: the page was taken from under it. Fitting the release through
        // that reading would throw the string with a speed no hand had.
        const off = gone || sg !== side
        if (!off) {
          trail.push([t, p.give * e])
          while (trail.length > 2 && trail[0][0] < t - 200) trail.shift()
        }
        crest = a + Math.max(0, crest - a) * Math.exp(-dt / SLIP)
        if (off || (!pinned && a < crest * KEEP)) release(t)
      }
      push = e
      if (!held) {
        trough = Math.min(trough, a)
        if (a < FAINT) { trough = 0; regrip = FAINT }
        else if (pinned || sg !== side || a > trough + regrip) { crest = a; grab(t, sg, p.give * e) }
      }
      if (held) bulge = p.give * e
    }

    // Let go, if holding, before a push is taken away outright — a finger
    // lifted, a page that has left its end — so that the string leaves with
    // the hand's velocity rather than with the push's sudden absence.
    const drop = (t) => {
      release(t)
      travel = wq = wx = 0
    }

    const place = (t) => {
      const [u, e] = fade(t)
      if (catching && e * (1 + u / PICKUP) * slackest < 0.05) catching = false
      for (let i = 1; i < n - 1; i++) {
        y[i] = bulge * s[i] + (catching ? e * (o0[i] + (w0[i] + o0[i] / PICKUP) * u) : 0)
      }
      dirty = true
    }

    const rest0 = () => {
      y.fill(0)
      v.fill(0)
      ringing = false
      dirty = true
    }

    // The free string, advanced by dt. Returns whether it is still ringing.
    const ring = (dt) => {
      const { T, d } = read()
      const dx = Math.max(1, L) / (n - 1)
      const c2 = T / MU / (dx * dx)
      // The discrete string's own fundamental, to weigh speed against offset.
      const w1 = 2 * Math.sqrt(c2) * Math.sin(Math.PI / (2 * (n - 1)))
      if (!(w1 > 0)) return false               // no tension: nothing to carry it back
      // Explicit, so each slice is split under the stability limit c·Δt/Δx ≤ 1.
      const slices = Math.max(1, Math.ceil(dt / STEP))
      const parts = slices * Math.max(1, Math.ceil((Math.sqrt(c2) * dt) / slices / 0.9))
      if (!(parts <= 4096)) return false         // pitched far above anything a display can show
      const h = dt / parts
      for (let k = 0; k < parts; k++) {
        for (let i = 1; i < n - 1; i++) {
          v[i] += (c2 * (y[i - 1] - 2 * y[i] + y[i + 1]) - d * v[i]) * h
        }
        for (let i = 1; i < n - 1; i++) y[i] += v[i] * h
      }
      dirty = true
      let size = 0
      for (let i = 1; i < n - 1; i++) size = Math.max(size, Math.abs(y[i]), Math.abs(v[i]) / w1)
      return size >= STILL                       // NaN, should it ever come to that, is not ringing
    }

    const draw = () => {
      if (dirty) {
        dirty = false
        const vert = live.current.vertical
        const half = (vert ? W : H) / 2
        const dx = L / (n - 1)
        const at = (a, o) => (vert ? `${o.toFixed(2)},${a.toFixed(2)}` : `${a.toFixed(2)},${o.toFixed(2)}`)
        let d = `M${at(0, half)}`
        let pa = 0, po = half
        for (let i = 1; i < n; i++) {
          // Quadratic through the midpoint of each pair keeps a coarse node
          // count looking like a string rather than a chain of segments.
          const a = i * dx
          const o = half + y[i]
          d += `Q${at(pa, po)} ${at((a + pa) / 2, (o + po) / 2)}`
          pa = a; po = o
        }
        d += `L${at(pa, po)}`                    // and on to the far anchor
        track.setAttribute('d', d)
        fill.setAttribute('d', d)
      }
      if (shown !== drawn) {
        drawn = shown
        // The fill's length is normalised to 1, so the dash is the progress
        // whatever length the bowed path has come to.
        fill.setAttribute('stroke-dashoffset', (1 - shown).toFixed(5))
      }
    }

    // The value assistive tech reads is the page's, not the eased fill's, and
    // is kept whether or not the rail is on screen.
    const report = () => {
      const now = Math.round(progress * 100)
      if (now !== pct) { pct = now; root.setAttribute('aria-valuenow', String(now)) }
    }

    const frame = (now) => {
      raf = 0
      // Back-to-back frames measure the display, 60 Hz or 120 Hz alike. The
      // first frame after the loop has been idle advances one frame of that,
      // not the idle time; a stall mid-ring, like a return to the tab,
      // advances at most 1/30 s.
      const gap = last ? (now - last) / 1000 : 0
      const dt = gap > 0 ? Math.min(gap, 1 / 30) : tick
      if (gap > 0 && gap < 1 / 40) tick += (gap - tick) * 0.5
      last = now
      let busy = false

      feel(now)
      if (wq || wx) busy = true                  // a wheel's push, still arriving or leaking away
      if (held) {
        place(now)
        if (catching) busy = true
      } else if (ringing) {
        if (!still && seen && ring(dt)) busy = true
        else rest0()
      }

      // The fill follows the page, and is simply set to it when there is no
      // one to see it move or they would rather it did not.
      const k = still || !seen ? 1 : 1 - Math.exp(-dt / FOLLOW)
      shown += (progress - shown) * k
      if (Math.abs(progress - shown) * Math.max(1, L) < 0.25) shown = progress
      else busy = true

      report()
      if (seen) draw()
      if (busy) raf = requestAnimationFrame(frame)
      else last = 0
    }

    const kick = () => {
      if (!raf) { last = 0; raf = requestAnimationFrame(frame) }
    }

    const stamp = (e) => (e && e.timeStamp) || performance.now()

    const onScroll = (e) => {
      const t = stamp(e)
      locate()
      // A push lasts only while the page is against the end being pushed.
      const x = travel + wx + wq
      if ((x > 0 && top < max - 1) || (x < 0 && top >= 1)) drop(t)
      feel(t)
      kick()
    }

    // Whether a push from this element is some nested scroller's own: one with
    // somewhere left to go that way, or one that keeps its overscroll to
    // itself. A wheel gesture stays with whichever it started on, as the
    // browser's own scroll does, so the verdict holds while the events keep
    // coming. dir 0 asks for a finger, which may yet go either way.
    const barred = (from, dir, t) => {
      if (dir && dir === latchDir && t - latchT < LATCH) { latchT = t; return latched }
      const stop = target || document.body
      let no = false
      for (let el = from; el && el.nodeType === 1 && el !== stop && el !== document.documentElement; el = el.parentElement) {
        const range = el.scrollHeight - el.clientHeight
        if (dir && range < 1) continue
        const cs = getComputedStyle(el)
        // A finger on something that has claimed vertical drags is not scrolling.
        const ta = cs.touchAction
        if (!dir && ta !== 'auto' && ta !== 'manipulation' && !ta.includes('pan-y')) { no = true; break }
        if (range < 1 || (cs.overflowY !== 'auto' && cs.overflowY !== 'scroll')) continue
        if (!dir || (dir > 0 ? el.scrollTop < range - 1 : el.scrollTop >= 1) || cs.overscrollBehaviorY !== 'auto') { no = true; break }
      }
      if (dir) { latched = no; latchDir = dir; latchT = t }
      return no
    }

    // dy px of scroll asked for, by a wheel or a key, from this element.
    const shove = (dy, from, t) => {
      if (still || !seen || !Number.isFinite(dy) || !dy || !(read().reach > 0)) return
      locate()
      if (native) return                         // the platform is already saying how far
      const dir = dy > 0 ? 1 : -1
      relax(t)
      if ((wx + wq) * dir < 0) drop(t)           // a push back the other way is the hand coming off
      if (dir > 0 ? top < max - 1 : top >= 1) return
      if (barred(from, dir, t)) return
      // A string at rest is taken the moment the push is made, before any of
      // it has arrived, so that it rises with the push rather than after it.
      if (!held && !ringing) {
        const p = read()
        crest = 0
        grab(t, dir, p.give * band(travel + wx, p.reach))
      }
      wq += dy
      feel(t)
      kick()
    }

    const onWheel = (e) => {
      // Ctrl is a pinch on a trackpad, and a wheel someone else has taken is theirs.
      if (e.ctrlKey || e.defaultPrevented || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      const unit = e.deltaMode === 1 ? LINE : e.deltaMode === 2 ? scroller().clientHeight : 1
      shove(e.deltaY * unit, e.target, stamp(e))
    }

    // The keys that scroll, pressed with the page already against its end,
    // knock the rail as a wheel notch would. Keys being typed are not scrolling.
    const onKey = (e) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey) return
      const el = e.target
      if (!el || el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return
      // Space scrolls only when nothing that takes it has the focus.
      const bare = el === document.body || el === document.documentElement || el === target
      const dy = e.key === ' ' ? (bare ? (e.shiftKey ? -100 : 100) : 0) : KEYS[e.key]
      if (dy) shove(dy, el, stamp(e))
    }

    const anchor = (e) => {
      fingers = e.touches.length
      if (fingers !== 1) return false
      const p = e.touches[0]
      const same = p.identifier === fid
      if (!same) { fid = p.identifier; fx = p.clientX; fy = p.clientY }
      return same
    }

    const onTouchStart = (e) => {
      const was = fingers
      anchor(e)
      // A second finger is a pinch, and the page keeps that.
      if (fingers > 1) { drop(stamp(e)); kick() }
      else if (!was) shut = barred(e.target, 0, stamp(e))
    }

    const onTouchMove = (e) => {
      const t = stamp(e)
      if (!anchor(e) || shut || e.defaultPrevented) return
      const p = e.touches[0]
      const dx = fx - p.clientX
      const dy = fy - p.clientY
      fx = p.clientX; fy = p.clientY
      locate()
      // The finger's travel past the end, once the page has nowhere left to
      // go that way; coming back, it gives up the push before anything else.
      const steep = Math.abs(dy) >= Math.abs(dx)
      if (still || !seen || native) travel = 0
      else if (travel > 0 || (dy > 0 && steep && top >= max - 1)) travel = Math.max(0, travel + dy)
      else if (travel < 0 || (dy < 0 && steep && top < 1)) travel = Math.min(0, travel + dy)
      feel(t)
      kick()
    }

    const onTouchEnd = (e) => {
      anchor(e)
      if (fingers) return
      fid = -1
      const t = stamp(e)
      if (e.type === 'touchcancel') trail = []   // taken away, not let go: nothing to carry
      // The finger was still where it last was when it lifted, so one that
      // stopped before lifting does not throw the string with a stale speed.
      else if (held) trail.push([t, bulge])
      release(t)
      travel = 0
      feel(t)
      kick()
    }

    const onMotion = () => { still = motion.matches; kick() }

    const ro = new ResizeObserver(() => { measure(); locate(); kick() })
    ro.observe(root)
    // The page growing or the scroller resizing moves the progress without a
    // scroll event to say so.
    if (target instanceof Element) ro.observe(target)
    else if (!target) ro.observe(document.documentElement)

    // Off screen there is no one to bow for: the string rests, and nothing is
    // drawn until the rail is back in view.
    const io = typeof IntersectionObserver === 'function'
      ? new IntersectionObserver((entries) => {
        seen = entries[entries.length - 1].isIntersecting
        if (seen) { dirty = true; drawn = -1 }
        kick()
      })
      : null
    io?.observe(root)

    // First paint: the rail as it stands, with no sweep up from empty.
    measure()
    locate()
    shown = progress
    report()
    draw()

    const src = target || window
    const quiet = { passive: true }
    src.addEventListener('scroll', onScroll, quiet)
    src.addEventListener('wheel', onWheel, quiet)
    src.addEventListener('keydown', onKey)
    src.addEventListener('touchstart', onTouchStart, quiet)
    src.addEventListener('touchmove', onTouchMove, quiet)
    src.addEventListener('touchend', onTouchEnd, quiet)
    src.addEventListener('touchcancel', onTouchEnd, quiet)
    window.addEventListener('resize', onScroll, quiet)
    motion.addEventListener?.('change', onMotion)

    return () => {
      ro.disconnect()
      io?.disconnect()
      src.removeEventListener('scroll', onScroll)
      src.removeEventListener('wheel', onWheel)
      src.removeEventListener('keydown', onKey)
      src.removeEventListener('touchstart', onTouchStart)
      src.removeEventListener('touchmove', onTouchMove)
      src.removeEventListener('touchend', onTouchEnd)
      src.removeEventListener('touchcancel', onTouchEnd)
      window.removeEventListener('resize', onScroll)
      motion.removeEventListener?.('change', onMotion)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [nodes, target])

  return (
    <div
      ref={rootRef}
      className={`elastic-rail${vertical ? ' is-vertical' : ''} ${className}`.trim()}
      style={style}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      {...rest}
    >
      <svg ref={svgRef} className="elastic-rail__svg" preserveAspectRatio="none" aria-hidden="true">
        <path ref={trackRef} fill="none" strokeWidth={thickness}
              stroke={trackColor || 'currentColor'} strokeOpacity="0.18" strokeLinecap="round" />
        <path ref={fillRef} fill="none" strokeWidth={thickness} pathLength="1"
              strokeDasharray="1" strokeDashoffset="1"
              stroke={progressColor || 'currentColor'} strokeLinecap="round" />
      </svg>
    </div>
  )
}
