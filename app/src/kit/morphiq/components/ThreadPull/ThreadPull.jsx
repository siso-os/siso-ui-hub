'use client'

import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import './ThreadPull.css'

/* =========================================================
   ThreadPull
   A thread strung under a line of text. Hook it and pull —
   it hangs in a real catenary, and the letters above lean
   into the slope beneath them.

   A hanging chain is not a parabola. It is

     y = a·cosh(x/a)

   and the two only agree for small sag; pull the thread far
   and a parabola is visibly too full through the middle and
   too slack at the anchors. Since the whole point of the
   component is the shape, it solves the real one. At rest it
   is one curve, anchor to anchor, with slack × span of
   thread in it: sinh(u)/u = slack for u = span/2a, solved by
   Newton from the small-sag seed. It hangs down, away from
   the text — cosh is drawn with y pointing up, the way
   gravity sees it, not the way the screen counts.

   A finger under a thread is a hook, and a smooth hook lets
   the thread slide over it until the tension is the same on
   both sides. The tension anywhere on a hanging chain is its
   weight per length times its height above the curve's
   directrix, the line a below its lowest point — so equal
   tension at the hook means both segments share a
   directrix. Each segment, spanning w with its ends v apart
   vertically and arc length ℓ, is its own catenary,

     √(ℓ² − v²) = 2a·sinh(w / 2a)

   solved for a by Newton, and the length is shared out
   between them until the tensions meet. The effect is the
   one a real thread has: drag toward one anchor and the near
   segment starves and goes taut while the far one takes up
   the length and hangs deeper. The split is searched from
   the last frame's, downhill, so on a very slack thread —
   where the even split turns unstable and the chain would
   rather run off to one side — it stays in whichever valley
   it is in instead of flickering between them.

   Past the point where both segments are straight there is
   no length left to give, and a thread does not stop dead:
   it stretches a little, and harder the further it goes.
   The pull past taut is resisted as e·E/(e + E), so the
   thread follows your finger at first and never gives more
   than a few percent of its length however far you go.

   Letting go leaves a kink where the finger was, and the
   kink springs back to the nearest point of the hanging
   curve, carrying the finger's velocity — a fit over the
   last 70 ms of the stroke, not one event — into the swing.
   The spring is stepped in slices no longer than 1/240 s, so
   it rings the same at 60 Hz and 120 Hz, and the loop stops
   the moment it has settled. A slack, lean or rise change
   eases in over ~80 ms rather than snapping the shape.

   Each letter rests on the thread at its two feet, so it
   tilts to the chord beneath it rather than the slope at its
   centre: where the thread kinks, neighbours open like a
   hinge instead of crossing.

   Only the thread takes the pointer. A finger that lands on
   the text scrolls the page as it would anywhere; one that
   lands on the thread pulls it, and a second finger still
   pinches the page — the thread lets go rather than hold a
   zoom hostage. It takes no focus either: there is nothing
   here to operate, and a tab stop that only wobbles is a
   keypress taken from someone for nothing. Under reduced
   motion the thread still follows your finger — that motion
   is yours — but it settles at once on release.
   ========================================================= */

const clamp = (n, lo, hi) => (n < lo ? lo : n > hi ? hi : n)
const finite = (n, d) => (Number.isFinite(n) ? n : d)

/* Whatever measures and draws runs as a layout effect, so the first paint
   already has the thread hanging and the letters on it: a frame of flat text
   and no thread before the hung one reads as a flicker, on mount and again on
   every change of text. Plain useEffect on the server, where there is nothing
   to lay out and older Reacts warn about it. */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

const GAP = 16        // px from the foot of the line of text down to the anchors
const PICKUP = 0.04   // s — how quickly a grabbed thread slides the last few px onto the finger
const GIVE = 0.06     // how far past taut a pull can stretch the thread, as a fraction of its length
const TAUT = 12000    // 1/s² — how hard the thread catches a swing that would carry it past taut
const EASE = 0.08     // s — how quickly the shape follows a change of slack, lean or rise
const STEP = 1 / 240  // s — the longest slice the spring is stepped in
const TRAIL = 70      // ms of stroke the release velocity is fitted over
const CROWD = 0.12    // rad — the most a letter may turn toward its right-hand neighbour
const GRID = 2        // px between samples of a handed-off swing, at most
const FAST = 4000     // px/s — the fastest a thread is taken to be moving, flung or caught

/* sinh(u)/u = t for u, with t ≥ 1. Seeded from the small-sag series or, for a
   deep loop, from sinh(u)/u ≈ eᵘ/2u. The function is convex and increasing, so
   Newton from above walks straight down to the root. */
function solveU(t) {
  if (!(t > 1)) return 0
  let u = t < 3 ? Math.sqrt(6 * (t - 1)) : Math.log(2 * t) + Math.log(Math.log(2 * t))
  for (let i = 0; i < 32; i++) {
    const sh = Math.sinh(u)
    const ch = Math.cosh(u)
    const next = Math.max(1e-9, u - (sh / u - t) / ((ch * u - sh) / (u * u)))
    const done = Math.abs(next - u) < 1e-12 * u
    u = next
    if (done) break
  }
  return u
}

/* The rest shape's sag, as a fraction of the span. */
const sagOf = (slack) => {
  const u = solveU(slack)
  return u ? (Math.cosh(u) - 1) / (2 * u) : 0
}

/* One segment of hanging thread from (0, 0) to (w, V), in a y-up frame, with
   arc length len: Y = c + a·cosh((X − xv)/a). Null when it is pulled taut —
   a straight line is what a chain does at full extension, so that is drawn. */
function hang(w, V, len) {
  const aw = Math.max(w, 1e-3)
  const s2 = len * len - V * V
  if (!(s2 > aw * aw)) return null
  const u = solveU(Math.sqrt(s2) / aw)
  if (!(u > 0)) return null
  const a = aw / (2 * u)
  const xv = aw / 2 - a * Math.asinh(V / (2 * a * Math.sinh(u)))
  if (!Number.isFinite(xv)) return null
  return { a, xv, c: -a * Math.cosh(xv / a) }
}

/* Share the length L over a hook: the left segment spans w1 and rises V1 to
   the hook, the right spans w2 and rises V2 from it. Returns the left
   segment's length s and both curves (null when that side is taut). */
function hook(w1, V1, w2, V2, L, s0) {
  const c1 = Math.hypot(w1, V1)
  const c2 = Math.hypot(w2, V2)
  if (c1 + c2 >= L) return { s: (L * c1) / Math.max(1e-9, c1 + c2), h1: null, h2: null }

  // Tension at the hook from each side is the hook's height above that side's
  // directrix. Positive when the left side pulls harder, so thread slides left.
  const pull = (s) => {
    const h1 = hang(w1, V1, s)
    const h2 = hang(w2, V2, L - s)
    const t1 = h1 ? h1.a * Math.cosh((Math.max(w1, 1e-3) - h1.xv) / h1.a) : Infinity
    const t2 = h2 ? h2.a * Math.cosh(h2.xv / h2.a) : Infinity
    return t1 - t2
  }

  // March downhill from last frame's split to the nearest stable balance —
  // where the left side's excess pull changes from positive to negative —
  // then bisect it. At lo the left is taut (+∞) and at hi the right is (−∞).
  const lo = c1, hi = L - c2, span = hi - lo, step = span / 32
  let a = clamp(finite(s0, (lo + hi) / 2), lo + span * 1e-6, hi - span * 1e-6)
  let b = a
  if (pull(a) > 0) {
    for (;;) { b = Math.min(hi, a + step); if (b >= hi || pull(b) <= 0) break; a = b }
  } else {
    for (;;) { a = Math.max(lo, b - step); if (a <= lo || pull(a) > 0) break; b = a }
  }
  for (let i = 0; i < 28; i++) {
    const m = (a + b) / 2
    if (pull(m) > 0) a = m; else b = m
  }
  const s = (a + b) / 2
  return { s, h1: hang(w1, V1, s), h2: hang(w2, V2, L - s) }
}

export default function ThreadPull({
  text = 'Pull the thread',

  slack = 1.06,       // thread length as a multiple of the span, at rest
  stiffness = 160,    // pull-back spring on the hooked point once released, 1/s²
  damping = 13,       // its damping, 1/s — at the defaults one swing just past rest, then still
  lean = 0.9,         // how much the thread's slope beneath a letter tilts it
  rise = 0.35,        // how much the thread's sag pulls the letters down with it
  thickness = 2,      // stroke width, px — a quarter more under a hovering pointer, a half more held
  steps = 48,         // samples per catenary segment
  color,              // stroke colour; currentColor when unset

  className = '',
  style,
  ...rest
}) {
  const rootRef = useRef(null)
  const lineRef = useRef(null)
  const svgRef = useRef(null)
  const pathRef = useRef(null)
  const hitRef = useRef(null)
  const api = useRef(null)

  const label = String(text ?? '')
  const chars = useMemo(() => Array.from(label), [label])

  // The rest sag, reserved below the text as a fraction of its own width, so
  // the box holds the hanging thread from the first paint.
  const hang0 = useMemo(() => sagOf(clamp(finite(slack, 1.06), 1, 10)), [slack])

  const width = Math.max(0, finite(thickness, 2))

  const live = useRef({})
  // Synced after every render and before the effects below, so the loop reads
  // current props without being torn down and restarted.
  useIsomorphicLayoutEffect(() => {
    live.current = { slack, stiffness, damping, lean, rise, steps }
  })

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current
    const line = lineRef.current
    const svg = svgRef.current
    const thread = pathRef.current
    const hit = hitRef.current
    if (!root || !line || !svg || !thread || !hit) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let still = motion.matches

    const read = () => {
      const p = live.current
      return {
        slack: clamp(finite(p.slack, 1.06), 1, 10),
        k: Math.max(0, finite(p.stiffness, 160)),
        c: Math.max(0.5, finite(p.damping, 13)),   // a thread always loses something to the air
        lean: finite(p.lean, 0.9),
        rise: finite(p.rise, 0.35),
        steps: clamp(Math.round(finite(p.steps, 48)), 2, 512),
      }
    }

    let cells = []
    let feet = []                 // [left, right] of each letter, cached — never read per frame
    let tilt = [], drops = [], pool = [], size = []
    let W = 0, H = 0, y0 = 0
    let box = null, scale = 1     // root rect, cached for the length of a drag
    let cx = 0, cy = 0            // last pointer position, client px

    // Displayed parameters, eased toward the props.
    const p0 = read()
    let sl = p0.slack, ln = p0.lean, rs = p0.rise

    // The hooked point. Held, it follows the finger through the pickup offset
    // (kx, ky). Released, it is a spring offset (ox, oy) from the point of the
    // hanging curve at phi·W.
    let held = false, pid = -1
    let px = 0, py = 0, kx = 0, ky = 0, kt = 0
    let phi = 0.5, ox = 0, oy = 0, vx = 0, vy = 0
    let gx = 0, gy = 0, split = NaN
    let trail = []                // [t, x, y] of the hooked point along the stroke
    let xs = [], ys = []          // the thread as last drawn, at t1 ms
    let xs0 = [], ys0 = []        // and the frame before, at t0
    let t1 = 0, t0 = 0
    // A swing handed off by a re-grab, sampled across the span: how far the
    // thread stood from the new hold (rg) and how fast it was moving (vg).
    // Every x rings out from there on the same spring, which for all of them
    // at once is rg·fa + vg·fb — fa the spring let go from 1 at rest, fb the
    // spring set moving at 1/s from 0 — so two numbers carry the whole field.
    let rg = new Float64Array(2), vg = new Float64Array(2)
    let fa = 0, fa1 = 0, fb = 0, fb1 = 0
    let ramp = 0, vamp = 0        // the largest |rg| and |vg|
    let raf = 0, last = 0
    let tick = 1 / 60             // the display's frame interval, as last measured

    // The hanging curve at rest, for the current width and eased slack.
    const rest0 = () => {
      const u = solveU(sl)
      const a = u ? W / (2 * u) : 0
      return {
        y: (x) => (a ? y0 + a * (Math.cosh(u) - Math.cosh((x - W / 2) / a)) : y0),
        arc: (x) => (a ? a * (Math.sinh((x - W / 2) / a) + Math.sinh(u)) : x),
      }
    }

    // How much longer than the thread the straight path anchor → (x, y) →
    // anchor is; positive only once it would have to stretch.
    const stretch = (x, y) => Math.hypot(x, y - y0) + Math.hypot(x - W, y - y0) - W * sl

    // Walk (x, y) back toward the middle of the span until its stretch is want.
    const toward = (x, y, want) => {
      const mx = W / 2
      let lo = 0, hi = 1
      for (let i = 0; i < 30; i++) {
        const t = (lo + hi) / 2
        if (stretch(mx + (x - mx) * t, y0 + (y - y0) * t) > want) hi = t; else lo = t
      }
      return [mx + (x - mx) * lo, y0 + (y - y0) * lo]
    }

    // Past taut, the finger's pull stretches the thread by e·E/(e + E): soft at
    // first, stiffer the further it goes, and never more than E.
    const soften = (x, y) => {
      const e = stretch(x, y)
      if (!(e > 0)) return [x, y]
      const E = GIVE * W * sl
      return toward(x, y, (e * E) / (e + E))
    }

    const fade = (t) => (still ? 0 : Math.exp(-Math.max(0, t - kt) / 1000 / PICKUP))

    // The thread hooked at (gx, gy): y(x) either side of the hook.
    const solve = () => {
      const w1 = Math.abs(gx), w2 = Math.abs(W - gx)
      const d1 = gx < 0 ? -1 : 1, d2 = W < gx ? -1 : 1
      const { s, h1, h2 } = hook(w1, y0 - gy, w2, gy - y0, W * sl, split)
      split = s
      const f1 = h1
        ? (x) => y0 - (h1.c + h1.a * Math.cosh((d1 * x - h1.xv) / h1.a))
        : (x) => y0 + (gy - y0) * (w1 > 1e-6 ? (d1 * x) / w1 : 0)
      const f2 = h2
        ? (x) => gy - (h2.c + h2.a * Math.cosh((d2 * (x - gx) - h2.xv) / h2.a))
        : (x) => gy + (y0 - gy) * (w2 > 1e-6 ? (d2 * (x - gx)) / w2 : 0)
      return [f1, f2]
    }

    // A field sampled evenly across the span, read at x.
    const along = (A, x) => {
      const m = A.length - 1
      const t = clamp(x / W, 0, 1) * m
      const i = Math.min(m - 1, Math.floor(t))
      return A[i] + (A[i + 1] - A[i]) * (t - i)
    }

    // The handed-off swing at x, as it stands now.
    const swing = (x) => ((fa || fb) && W > 0 ? fa * along(rg, x) + fb * along(vg, x) : 0)

    const draw = (steps, now) => {
      if (W < 2) { thread.setAttribute('d', ''); hit.setAttribute('d', ''); return }
      const [f1, f2] = solve()
      const at = (x) => (x <= gx ? f1(x) : f2(x)) + swing(x)

      ;[xs0, xs, ys0, ys, t0, t1] = [xs, xs0, ys, ys0, t1, now]
      xs.length = 0; ys.length = 0
      let d = ''
      for (let i = 0; i <= 2 * steps; i++) {
        const x = i <= steps ? (gx * i) / steps : gx + ((W - gx) * (i - steps)) / steps
        let y = (i <= steps ? f1(x) : f2(x)) + swing(x)
        if (!Number.isFinite(y)) y = y0
        xs.push(x); ys.push(y)
        d += `${i ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`
      }
      thread.setAttribute('d', d)
      hit.setAttribute('d', d)

      const n = cells.length
      for (let i = 0; i < n; i++) {
        const [l, r] = feet[i]
        const yl = finite(at(l), y0), yr = finite(at(r), y0)
        tilt[i] = Math.atan2(yr - yl, Math.max(1e-3, r - l)) * ln + i * CROWD
        drops[i] = ((yl + yr) / 2 - y0) * rs
      }
      // Tilt with i·CROWD added must not fall from one letter to the next.
      // Pool adjacent violators gives the nearest tilts that satisfy it.
      let top = 0
      for (let i = 0; i < n; i++) {
        pool[top] = tilt[i]; size[top] = 1; top++
        while (top > 1 && pool[top - 2] / size[top - 2] > pool[top - 1] / size[top - 1]) {
          pool[top - 2] += pool[top - 1]; size[top - 2] += size[top - 1]; top--
        }
      }
      for (let b = 0, i = 0; b < top; b++) {
        const mean = pool[b] / size[b]
        for (let j = 0; j < size[b]; j++, i++) tilt[i] = mean - i * CROWD
      }
      for (let i = 0; i < n; i++) {
        cells[i].style.transform = `translateY(${drops[i].toFixed(2)}px) rotate(${tilt[i].toFixed(4)}rad)`
      }
    }

    // Where the hooked point sits now, without advancing time.
    const place = (now) => {
      if (held) {
        const f = fade(now)
        ;[gx, gy] = soften(px + kx * f, py + ky * f)
      } else {
        const x = clamp(phi, 0.02, 0.98) * W
        gx = x + ox
        gy = rest0().y(x) + oy
      }
    }

    const frame = (now) => {
      raf = 0
      // Back-to-back frames measure the display, 60 Hz or 120 Hz alike. The
      // first frame after the loop has been idle — a release, a prop change —
      // advances one frame of that, not the idle time; a stall mid-swing, like
      // a return to the tab, advances at most 1/30 s.
      const gap = last ? (now - last) / 1000 : 0
      const dt = gap > 0 ? Math.min(gap, 1 / 30) : tick
      if (gap > 0 && gap < 1 / 40) tick += (gap - tick) * 0.5
      last = now
      const p = read()
      let busy = false

      // Ease the displayed parameters toward the props.
      const e = still ? 1 : 1 - Math.exp(-dt / EASE)
      sl += (p.slack - sl) * e
      ln += (p.lean - ln) * e
      rs += (p.rise - rs) * e
      if (Math.abs(p.slack - sl) < 1e-5) sl = p.slack; else busy = true
      if (Math.abs(p.lean - ln) < 1e-4) ln = p.lean; else busy = true
      if (Math.abs(p.rise - rs) < 1e-4) rs = p.rise; else busy = true

      if (held) {
        if (fade(now) * Math.hypot(kx, ky) > 0.05) busy = true
      } else if (still) {
        ox = oy = vx = vy = 0
      } else {
        // Spring the kink back to the hanging curve. A swing that would carry
        // it past taut is caught by the thread itself — and a thread is not a
        // rubber band: what it gives past taut it does not give back. So the
        // catch is a brake, not a force: it takes outward speed away, harder
        // the further past taut, and never more than there is, so it cannot
        // throw the kink back. A kink let go while still being pulled outward
        // just stops at the give and swings home on the spring alone.
        const x = clamp(phi, 0.02, 0.98) * W
        const y = rest0().y(x)
        const E = GIVE * W * sl
        const n = Math.max(1, Math.ceil(dt / STEP))
        const h = dt / n
        let ax = 0, ay = 0
        for (let i = 0; i < n; i++) {
          let qx = x + ox, qy = y + oy
          ax = -p.k * ox - p.c * vx
          ay = -p.k * oy - p.c * vy
          vx += ax * h; vy += ay * h
          // Outward normal of the taut limit: the sum of the unit vectors from
          // each anchor, which is also the direction the thread pulls back.
          const da = Math.max(1e-6, Math.hypot(qx, qy - y0))
          const db = Math.max(1e-6, Math.hypot(qx - W, qy - y0))
          let nx = qx / da + (qx - W) / db
          let ny = (qy - y0) / da + (qy - y0) / db
          const nl = Math.hypot(nx, ny)
          if (nl > 1e-9) { nx /= nl; ny /= nl } else { nx = ny = 0 }
          const over = stretch(qx, qy)
          const out = vx * nx + vy * ny
          if (over > 0 && out > 0) {
            const cut = Math.min(out, TAUT * over * h)
            vx -= cut * nx; vy -= cut * ny
          }
          ox += vx * h; oy += vy * h
          qx = x + ox; qy = y + oy
          if (stretch(qx, qy) > E) {
            ;[qx, qy] = toward(qx, qy, E)
            ox = qx - x; oy = qy - y
            const on = vx * nx + vy * ny
            if (on > 0) { vx -= on * nx; vy -= on * ny }
          }
        }
        const speed = Math.hypot(vx, vy)
        const off = Math.hypot(ox, oy)
        if (speed < 2 && off < 0.3) { ox = oy = vx = vy = 0 }
        else if (speed < 2 && Math.hypot(ax, ay) < 1) { vx = vy = 0 }   // no spring to return on
        else busy = true
      }

      // A handed-off swing rings out on the same spring, held or not.
      if (still) fa = fa1 = fb = fb1 = 0
      if (fa || fb) {
        const n = Math.max(1, Math.ceil(dt / STEP))
        const h = dt / n
        for (let i = 0; i < n; i++) {
          fa1 += (-p.k * fa - p.c * fa1) * h; fa += fa1 * h
          fb1 += (-p.k * fb - p.c * fb1) * h; fb += fb1 * h
        }
        const off = Math.abs(fa) * ramp + Math.abs(fb) * vamp
        const speed = Math.abs(fa1) * ramp + Math.abs(fb1) * vamp
        if (speed < 2 && off < 0.25) fa = fa1 = fb = fb1 = 0
        else if (speed < 2 && p.k * off < 1) fa1 = fb1 = 0          // no spring to return on
        else busy = true
      }

      place(now)
      draw(p.steps, now)
      if (busy) raf = requestAnimationFrame(frame)
    }

    const kick = () => {
      if (!raf) { last = 0; raf = requestAnimationFrame(frame) }
    }

    const measure = () => {
      W = root.offsetWidth
      H = root.offsetHeight
      y0 = line.offsetTop + line.offsetHeight + GAP
      const lx = line.offsetLeft
      feet = cells.map((el) => [lx + el.offsetLeft, lx + el.offsetLeft + el.offsetWidth])
      tilt = new Float64Array(cells.length)
      drops = new Float64Array(cells.length)
      pool = new Float64Array(cells.length)
      size = new Float64Array(cells.length)
      svg.setAttribute('viewBox', `0 0 ${Math.max(1, W)} ${Math.max(1, H)}`)
    }

    const redraw = () => {
      const now = performance.now()
      measure()
      place(now)
      draw(read().steps, now)
    }

    const remeasure = () => {
      cells = Array.from(line.querySelectorAll('.thread-pull__char'))
      redraw()
    }

    const toLocal = () => {
      px = (cx - box.left) / scale
      py = (cy - box.top) / scale
    }

    const locate = () => {
      box = root.getBoundingClientRect()
      scale = root.offsetWidth ? box.width / root.offsetWidth || 1 : 1
    }

    // The point of the drawn thread nearest (x, y), and how far along it is.
    const nearest = (x, y) => {
      let best = Infinity, bx = x, by = y, bs = 0, run = 0, total = 0
      for (let i = 1; i < xs.length; i++) total += Math.hypot(xs[i] - xs[i - 1], ys[i] - ys[i - 1])
      for (let i = 1; i < xs.length; i++) {
        const ax = xs[i - 1], ay = ys[i - 1]
        const dx = xs[i] - ax, dy = ys[i] - ay
        const len2 = dx * dx + dy * dy
        const t = len2 ? clamp(((x - ax) * dx + (y - ay) * dy) / len2, 0, 1) : 0
        const qx = ax + dx * t, qy = ay + dy * t
        const dd = (qx - x) ** 2 + (qy - y) ** 2
        const seg = Math.sqrt(len2)
        if (dd < best) { best = dd; bx = qx; by = qy; bs = run + seg * t }
        run += seg
      }
      return [bx, by, total ? (bs / total) * W * sl : NaN]
    }

    // A drawn thread's height at m + 1 even steps across the span, or null
    // when it doubles back past an anchor and has no one height at each x.
    const sample = (X, Y, m) => {
      if (X.length < 2) return null
      for (let j = 1; j < X.length; j++) if (X[j] < X[j - 1]) return null
      const out = new Float64Array(m + 1)
      for (let i = 0, j = 1; i <= m; i++) {
        const x = (W * i) / m
        while (j < X.length - 1 && X[j] < x) j++
        const xa = X[j - 1], xb = X[j]
        out[i] = finite(xb > xa ? Y[j - 1] + ((Y[j] - Y[j - 1]) * (x - xa)) / (xb - xa) : Y[j], y0)
      }
      return out
    }

    // Re-hook a swinging thread at (nx, ny), s along it, at time t. Whatever
    // the thread as drawn has that the newly hooked one lacks — the old kink,
    // and any swing handed off before it — is handed off in turn, with the
    // rate each part of it was already moving at, measured over the last
    // frame. So the first frame draws exactly what was there, moving exactly
    // as it was, and the old kink carries on and rings out under the hold
    // instead of stalling or sliding over to the finger.
    const handoff = (drawn, nx, ny, s, t) => {
      const m = drawn.length - 1
      const was = t1 > t0 && t - t1 < 50 ? sample(xs0, ys0, m) : null
      const dt = (t1 - t0) / 1000
      gx = nx; gy = ny
      if (Number.isFinite(s)) split = s
      const [f1, f2] = solve()
      rg = drawn
      vg = new Float64Array(m + 1)
      for (let i = 0; i <= m; i++) {
        const x = (W * i) / m
        vg[i] = was ? clamp(finite((drawn[i] - was[i]) / dt, 0), -FAST, FAST) : 0
        rg[i] = finite(drawn[i] - (x <= gx ? f1(x) : f2(x)), 0)
      }
      // The hold pins its point: whatever was moving there stops dead, and
      // the catch runs out straight to each anchor, the way a pinned thread
      // pivots about the finger.
      const r0 = along(rg, gx), v0 = along(vg, gx)
      ramp = vamp = 0
      for (let i = 0; i <= m; i++) {
        const x = (W * i) / m
        const pin = x <= gx ? (gx > 0 ? x / gx : 0) : (W > gx ? (W - x) / (W - gx) : 0)
        rg[i] -= r0 * pin
        vg[i] -= v0 * pin
        ramp = Math.max(ramp, Math.abs(rg[i]))
        vamp = Math.max(vamp, Math.abs(vg[i]))
      }
      fa = 1; fa1 = 0; fb = 0; fb1 = 1
    }

    const record = (t, x, y) => {
      const f = fade(t)
      const [dx, dy] = soften(x + kx * f, y + ky * f)
      trail.push([t, dx, dy])
      while (trail.length > 2 && trail[0][0] < t - 200) trail.shift()
    }

    // Least-squares velocity of the hooked point over the end of the stroke.
    const fling = (t) => {
      const win = trail.filter((q) => q[0] >= t - TRAIL)
      if (win.length < 2 || t - win[win.length - 1][0] > 40) return [0, 0]
      const n = win.length
      let mt = 0, mx = 0, my = 0
      for (const q of win) { mt += q[0] / n; mx += q[1] / n; my += q[2] / n }
      let tt = 0, tx = 0, ty = 0
      for (const q of win) {
        const d = q[0] - mt
        tt += d * d; tx += d * (q[1] - mx); ty += d * (q[2] - my)
      }
      if (tt < 1e-6) return [0, 0]
      let fx = (tx / tt) * 1000, fy = (ty / tt) * 1000
      const sp = Math.hypot(fx, fy)
      if (sp > FAST) { fx *= FAST / sp; fy *= FAST / sp }
      return [fx, fy]
    }

    const onScroll = () => { locate(); toLocal(); kick() }

    const onDown = (e) => {
      if (held || (e.pointerType === 'mouse' && e.button !== 0)) return
      e.preventDefault()
      locate()
      cx = e.clientX; cy = e.clientY
      toLocal()

      // The finger hooks the thread where it touched it, swinging or not; a
      // swing still in the thread is handed off to ring out under the hold.
      // Only a kink flung out past an anchor — where the thread doubles back
      // and has no one height at each x to hand off — slides to the finger.
      const settled = !ox && !oy && !vx && !vy && !fa && !fb
      const drawn = settled ? null : sample(xs, ys, clamp(Math.ceil(W / GRID), 64, 1024))
      let qx = gx, qy = gy
      if (settled || drawn) {
        const [nx, ny, s] = nearest(px, py)
        if (drawn) handoff(drawn, nx, ny, s, e.timeStamp)
        qx = nx; qy = ny
        if (Number.isFinite(s)) split = s
      }

      held = true
      pid = e.pointerId
      kx = qx - px; ky = qy - py; kt = e.timeStamp
      vx = vy = ox = oy = 0
      trail = [[kt, qx, qy]]
      try { root.setPointerCapture(pid) } catch { /* capture is a nicety */ }
      grip(true)
      kick()
    }

    const onMove = (e) => {
      if (!held || e.pointerId !== pid) return
      const list = e.getCoalescedEvents?.()
      for (const c of list && list.length ? list : [e]) {
        record(c.timeStamp, (c.clientX - box.left) / scale, (c.clientY - box.top) / scale)
      }
      cx = e.clientX; cy = e.clientY
      toLocal()
      kick()
    }

    const onUp = (e) => {
      if (!held || (e.pointerId != null && e.pointerId !== pid)) return
      const t = e.timeStamp
      if (e.type === 'pointerup') {
        cx = e.clientX; cy = e.clientY
        toLocal()
        record(t, px, py)
      }
      const [fx, fy] = e.type === 'pointerup' ? fling(t) : [0, 0]
      held = false
      pid = -1
      grip(false)
      try { root.releasePointerCapture(e.pointerId) } catch { /* already gone */ }

      // Where the finger left the thread, and the nearest point of the hanging
      // curve — the kink springs from one to the other.
      const f = fade(t)
      ;[gx, gy] = soften(px + kx * f, py + ky * f)
      const r = rest0()
      let best = Infinity
      for (let i = 0; i <= 96; i++) {
        const x = (0.02 + (0.96 * i) / 96) * W
        const dd = (x - gx) ** 2 + (r.y(x) - gy) ** 2
        if (dd < best) { best = dd; phi = x / Math.max(1, W) }
      }
      const x = phi * W
      ox = gx - x
      oy = gy - r.y(x)
      vx = fx; vy = fy
      if (still) { ox = oy = vx = vy = 0; split = r.arc(x) }
      kick()
    }

    // The window hears about a hold only while there is one: the scroll that
    // moves the page under a still finger, and the release, should the capture
    // have been refused.
    const grip = (on) => {
      const act = on ? 'addEventListener' : 'removeEventListener'
      window[act]('scroll', onScroll, { capture: true, passive: true })
      window[act]('pointerup', onUp)
      window[act]('pointercancel', onUp)
      root.classList.toggle('is-held', on)
    }

    // One finger on the thread pulls it and must not scroll the page: that is
    // touch-action's job, done again here for a browser that will not read
    // touch-action off an SVG path. Two fingers are a pinch, and the page
    // keeps that.
    const onTouch = (e) => { if (e.cancelable && e.touches.length < 2) e.preventDefault() }

    const onMotion = () => { still = motion.matches; kick() }

    const ro = new ResizeObserver(() => { if (held) { locate(); toLocal() } redraw() })
    ro.observe(root)
    remeasure()

    hit.addEventListener('pointerdown', onDown)
    hit.addEventListener('touchmove', onTouch, { passive: false })
    root.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerup', onUp)
    root.addEventListener('pointercancel', onUp)
    root.addEventListener('lostpointercapture', onUp)
    motion.addEventListener?.('change', onMotion)

    let dead = false
    document.fonts?.ready?.then(() => { if (!dead) remeasure() })

    api.current = { kick, remeasure }

    return () => {
      dead = true
      api.current = null
      ro.disconnect()
      grip(false)
      hit.removeEventListener('pointerdown', onDown)
      hit.removeEventListener('touchmove', onTouch)
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerup', onUp)
      root.removeEventListener('pointercancel', onUp)
      root.removeEventListener('lostpointercapture', onUp)
      motion.removeEventListener?.('change', onMotion)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // New text means new letters to measure, before they are painted unplaced;
  // the thread keeps its state.
  useIsomorphicLayoutEffect(() => {
    api.current?.remeasure()
  }, [chars])

  // A prop change eases the shape toward it, even with the thread at rest.
  useEffect(() => {
    api.current?.kick()
  }, [slack, lean, rise, steps])

  return (
    <div
      ref={rootRef}
      className={`thread-pull ${className}`.trim()}
      style={style}
      role={label ? 'img' : undefined}   // no text, no thread: nothing to name
      aria-label={label || undefined}
      {...rest}
    >
      <span ref={lineRef} className="thread-pull__line" aria-hidden="true">
        {chars.map((ch, i) => (
          <span
            key={i}
            className={`thread-pull__char${ch === ' ' ? ' is-space' : ''}`}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </span>
      <span
        className="thread-pull__hang"
        aria-hidden="true"
        style={{ '--thread-pull-hang': hang0 }}
      />
      <svg ref={svgRef} className="thread-pull__svg" aria-hidden="true" preserveAspectRatio="none">
        <path ref={hitRef} className="thread-pull__hit" fill="none" />
        <path
          ref={pathRef}
          className="thread-pull__thread"
          fill="none"
          stroke={color || 'currentColor'}
          strokeWidth={width}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ '--thread-pull-w': `${width}px` }}
        />
      </svg>
    </div>
  )
}
