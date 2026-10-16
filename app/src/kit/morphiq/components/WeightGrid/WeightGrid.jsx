'use client'

import { useEffect, useRef } from 'react'
import './WeightGrid.css'

/* =========================================================
   WeightGrid
   A bento grid where the cell under the cursor takes area
   from its neighbours and the total never changes.

   The trick is PressureText's, moved into two dimensions.
   Each row and column has a weight; the cursor raises the
   weights it is near, and then every weight is divided by
   the sum of its axis:

     wᵢ ← wᵢ / Σw   ·   n

   Because the fractions are renormalised, the tracks always
   sum to the same total — so the grid never changes size and
   nothing outside it moves. Growing a cell is not growing
   the grid; it is taking space off the cells beside it.

   Written as `fr` values on grid-template-rows/columns, which
   means the browser does the layout and the cells keep real
   flow content. A transform-based version would be cheaper
   per frame but would scale the text inside each cell, and a
   bento grid whose type warps under the cursor reads as a
   bug rather than as weight. Each track is minmax(0, w fr),
   not a bare fr: a bare fr refuses to shrink below its
   content, so one long word would freeze its track mid-glide
   and hand the difference to the others — a visible hitch,
   and a grid that no longer divides its box by the weights.

   The cursor is read in the grid's RESTING geometry, not the
   stretched one on screen. Measured against the live tracks,
   a cell that grows moves the cursor's place within it,
   which changes the growth, which moves it again — a loop
   that swims. Resting coordinates hold still, which is the
   standard fisheye construction for the same reason.

   Each weight chases its target exponentially, closing a
   fixed share of the gap per 60th of a second of REAL time;
   stepped per frame, it would settle twice as fast on a
   120 Hz screen. There is deliberately no mass: a layout
   that overshot would read as the grid wobbling, not as
   weight. So a track eases out from wherever it is, and a
   change of mind mid-glide simply continues from there. A
   change of track count keeps the weights of the axis it did
   not touch, and the axis it did lands already weighted. An
   exponential never quite arrives, though, and its tail is
   the edges creeping for a second after the eye has moved
   on — so the last two pixels close at the speed it reached
   them with, the grid lands, and the loop stops.

   Attention is not only a mouse. Keyboard focus inside a
   cell weights that cell, as hovering its centre would. On
   touch, a tap weights the cell tapped, and it stays until
   you tap outside; a sideways drag scrubs the weight under
   the finger and, on lift, settles onto the cell let go
   over, so a drag ends where a tap would have. Vertical
   drags still scroll the page (touch-action: pan-y), and a
   press waits 100 ms before it moves anything — the pause a
   native list uses to tell a tap from a scroll — so flicking
   the page past the grid does not reshape it; a scroll that
   starts after the pause hands the old selection back.

   Under reduced motion the cursor's continuous pull is gone
   — a layout reshaping under a sweeping pointer IS the
   motion — but a deliberate choice, focus or a tap, still
   weights its cell, instantly.
   ========================================================= */

const clampN = (n, lo, hi) => (n < lo ? lo : n > hi ? hi : n)

const FALLOFF = {
  linear: (t) => t,
  smooth: (t) => t * t * (3 - 2 * t),
  sharp: (t) => t * t,
}

const FAR = -1e5          // "no attention": far enough that every bump is zero
const MAX_DT = 1 / 30     // a backgrounded tab resumes from where it was, not a jump
const LAND_PX = 0.1       // closer than this to its target, a track snaps and rests
const CRAWL_PX = 2        // below this gap the approach turns from halving to arriving
const HOLD_MS = 100       // tap-versus-scroll pause before a touch moves anything

// A track count the maths can survive: whole, at least one, and not absurd.
const tracks = (v, d) => {
  const n = typeof v === 'string' && v.trim() !== '' ? Number(v) : v   // columns="3" worked before; keep it working
  return typeof n === 'number' && Number.isFinite(n) ? clampN(Math.floor(n), 1, 128) : d
}

const pad = (cs, side) => parseFloat(cs[`padding${side}`]) || 0
const gapOf = (v) => parseFloat(v) || 0

/* Pixel offset along one axis → fractional track coordinate, for tracks of the
   given weights. The gutter after track i maps onto line i + 1, so a cell that
   spans two tracks has its centre on the line between them. Outside the grid
   the coordinate keeps going, so a bump fades with distance rather than
   clipping at the edge. */
function toTrack(px, w, size, gap) {
  const n = w.length
  let sum = 0
  for (let i = 0; i < n; i++) sum += w[i]
  const unit = Math.max(0, size - gap * (n - 1)) / (sum || 1)
  if (unit <= 0) return FAR
  if (px < 0) return px / (unit + gap)
  let edge = 0
  for (let i = 0; i < n; i++) {
    const span = w[i] * unit
    if (px < edge + span) return i + (px - edge) / (span || 1)
    edge += span
    if (i < n - 1 && px < edge + gap) return i + 1
    edge += gap
  }
  return n + (px - size) / (unit + gap)
}

export default function WeightGrid({
  columns = 4,
  rows = 3,
  gain = 1.1,          // how much extra weight the axis nearest the cursor gets
  cursorRadius = 1.2,  // reach, in tracks
  smoothing = 0.075,   // share of the gap closed per 60 fps frame, timed by the clock
  falloff = 'smooth',
  gap = 10,
  children,
  className = '',
  style,
  ...rest
}) {
  const rootRef = useRef(null)
  const nc = tracks(columns, 4)
  const nr = tracks(rows, 3)

  const live = useRef({})
  const poke = useRef(null)
  const held = useRef({ c: null, r: null })   // weights, kept across a change of track count
  // Synced after every render and before the effects below, so the loop reads
  // current props without being torn down and restarted. A change to the shape
  // of the bump re-aims a grid that is already resting under the cursor.
  useEffect(() => {
    const was = live.current
    live.current = { gain, cursorRadius, smoothing, falloff }
    if (was.gain !== gain || was.cursorRadius !== cursorRadius || was.falloff !== falloff) {
      poke.current?.()
    }
  })

  /* Who is paying attention, kept across a change of track count so the grid
     re-aims instead of forgetting. mouse — a hovering pointer's client point;
     focus — the element with keyboard focus; touch — where a tap or drag last
     landed. `lead` is whichever spoke most recently. */
  const inputs = useRef({ mouse: null, focus: null, touch: null, lead: '' })

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    let still = mq.matches

    const kept = held.current
    const cw = kept.c && kept.c.length === nc ? kept.c : new Float32Array(nc).fill(1)
    const rw = kept.r && kept.r.length === nr ? kept.r : new Float32Array(nr).fill(1)
    const freshC = cw !== kept.c   // a new track count has nothing to glide from
    const freshR = rw !== kept.r
    kept.c = cw
    kept.r = rw
    const wantC = new Float32Array(nc)
    const wantR = new Float32Array(nr)
    const ONES_C = new Float32Array(nc).fill(1)
    const ONES_R = new Float32Array(nr).fill(1)
    let tx = FAR   // attention, in fractional track coordinates of the resting grid
    let ty = FAR
    let raf = 0
    let last = 0
    let onScreen = true

    // Content-box geometry in the grid's own px, read once per input event (the
    // layout is clean between frames, so these reads are free) rather than per
    // frame, and so it follows a className that changes padding or gap without
    // resizing anything. bw is the border-box width, to undo any CSS scale
    // between client coordinates and layout.
    const geo = { left: 0, top: 0, w: 0, h: 0, gx: 0, gy: 0, bw: 0 }
    const measure = () => {
      const cs = getComputedStyle(root)
      geo.bw = root.offsetWidth
      geo.left = root.clientLeft + pad(cs, 'Left')
      geo.top = root.clientTop + pad(cs, 'Top')
      geo.w = Math.max(0, root.clientWidth - pad(cs, 'Left') - pad(cs, 'Right'))
      geo.h = Math.max(0, root.clientHeight - pad(cs, 'Top') - pad(cs, 'Bottom'))
      geo.gx = gapOf(cs.columnGap)
      geo.gy = gapOf(cs.rowGap)
    }
    const unit = (size, gp, n) => Math.max(0, size - gp * (n - 1)) / n

    /* Weights for one axis: a bump around the attention, then renormalised so
       the axis still sums to n. The renormalisation is the whole component.
       `k` is this frame's share of the gap and `crawl` the fewest px the axis
       may close in it (see frame); `px` is px per unit of weight. */
    const axis = (out, want, at, k, crawl, px) => {
      const n = out.length
      const { gain: g0, cursorRadius: r0, falloff: f } = live.current
      const shape = FALLOFF[f] || FALLOFF.smooth
      const g = Number.isFinite(g0) ? g0 : 0
      const r = Number.isFinite(r0) ? Math.max(0.05, r0) : 1.2
      let sum = 0
      for (let i = 0; i < n; i++) {
        const d = Math.abs(i + 0.5 - at) / r
        // Floored above zero: a negative gain may shrink a track, never invert it.
        want[i] = Math.max(1e-3, 1 + g * shape(clampN(1 - d, 0, 1)))
        sum += want[i]
      }
      // Divide through: the axis sums to exactly n however hard it is pushed.
      const norm = n / (sum || 1)
      let far = 0
      for (let i = 0; i < n; i++) {
        want[i] *= norm
        far = Math.max(far, Math.abs(want[i] - out[i]) * px)
      }
      /* One share for every track on the axis, so the eased weights are a
         blend of two sets that each sum to n — and sum to n themselves. */
      const step = far > 0 ? Math.max(k, crawl / far) : 1
      if (step >= 1 || far < LAND_PX) {
        out.set(want)
        return false
      }
      for (let i = 0; i < n; i++) out[i] += (want[i] - out[i]) * step
      return true
    }

    const template = (w) => {
      let s = ''
      for (let i = 0; i < w.length; i++) s += `${i ? ' ' : ''}minmax(0, ${w[i].toFixed(4)}fr)`
      return s
    }
    const paint = () => {
      root.style.gridTemplateColumns = template(cw)
      root.style.gridTemplateRows = template(rw)
    }

    const frame = (now) => {
      const dt = last ? Math.min(MAX_DT, (now - last) / 1000) : 1 / 60
      last = now
      const s0 = live.current.smoothing
      const s = Number.isFinite(s0) ? Math.min(1, s0) : 0.075
      if (s <= 0 && !still) { raf = 0; last = 0; return }   // asked never to move: it does not
      // Frame-rate independent: the same share per 60th of a second at any Hz.
      const k = still ? 1 : 1 - (1 - s) ** (dt * 60)
      /* An exponential never arrives: taking its last pixel down to a tenth
         costs over two time constants, spent creeping the cell edges. Below
         CRAWL_PX the axis closes at a steady CRAWL_PX per time constant
         instead — the speed the exponential had on reaching it, so there is
         no kink — and lands one time constant later. */
      const tau = s >= 1 ? 0 : -1 / (60 * Math.log(1 - s))
      const crawl = tau > 0 ? (CRAWL_PX / tau) * dt : Infinity
      const a = axis(cw, wantC, tx, k, crawl, unit(geo.w, geo.gx, nc))
      const b = axis(rw, wantR, ty, k, crawl, unit(geo.h, geo.gy, nr))
      paint()
      if (!a && !b) { raf = 0; last = 0; return }
      raf = requestAnimationFrame(frame)
    }

    const kick = () => {
      if (raf || !onScreen) return
      last = 0
      raf = requestAnimationFrame(frame)
    }

    /* Client point → the grid's content box, in its own (unscaled) px. */
    const local = (x, y) => {
      const b = root.getBoundingClientRect()
      const z = geo.bw && b.width ? b.width / geo.bw : 1
      return [(x - b.left) / z - geo.left, (y - b.top) / z - geo.top]
    }

    /* Client point → resting track coordinates. */
    const restAt = (x, y) => {
      const [lx, ly] = local(x, y)
      return [toTrack(lx, ONES_C, geo.w, geo.gx), toTrack(ly, ONES_R, geo.h, geo.gy)]
    }

    // The grid child that holds `el`, or null for the root and anything outside.
    const cellOf = (el) => {
      let c = el
      while (c && c.parentElement !== root) c = c.parentElement
      return c || null
    }

    /* A cell's centre in track coordinates. Its edges sit on track lines in the
       live layout, so inverting through the live weights gives exact indices —
       a one-track cell lands on i + ½, a two-track cell on the line between. */
    const centreOf = (cell) => {
      const c = cell.getBoundingClientRect()
      const [lx, ly] = local(c.left + c.width / 2, c.top + c.height / 2)
      return [toTrack(lx, cw, geo.w, geo.gx), toTrack(ly, rw, geo.h, geo.gy)]
    }

    const aim = () => {
      measure()
      const s = inputs.current
      let at = null
      for (const key of [s.lead, 'mouse', 'focus', 'touch']) {
        if (key === 'mouse' && s.mouse && !still) at = restAt(s.mouse.x, s.mouse.y)
        else if (key === 'focus' && s.focus) {
          const cell = root.contains(s.focus) ? cellOf(s.focus) : null
          if (cell) at = centreOf(cell)
        } else if (key === 'touch' && s.touch) {
          const t = s.touch
          if (t.cell && root.contains(t.cell)) at = centreOf(t.cell)
          else if (!t.cell && !still) at = restAt(t.x, t.y)
        }
        if (at) break
      }
      tx = at ? at[0] : FAR
      ty = at ? at[1] : FAR
      kick()
    }

    /* ---- mouse and pen: hover is attention ---------------------------- */

    const onMove = (e) => {
      if (e.pointerType === 'touch') { onTouchMove(e); return }
      const s = inputs.current
      s.mouse = { x: e.clientX, y: e.clientY }
      s.touch = null   // a mouse arriving retires a sticky tap
      s.lead = 'mouse'
      aim()
    }

    const onLeave = (e) => {
      if (e.pointerType === 'touch') return   // fires after every lift; not a leave
      inputs.current.mouse = null
      aim()
    }

    /* ---- touch: a tap selects, a sideways drag scrubs ------------------ */

    let press = null   // { id, x, y, live, timer, was } — was: the selection before it

    const engage = () => {
      if (!press) return
      press.live = true
      if (still) return   // under reduced motion only the lift commits
      inputs.current.touch = { x: press.x, y: press.y, cell: null }
      inputs.current.lead = 'touch'
      aim()
    }

    const onDown = (e) => {
      if (e.pointerType !== 'touch' || press) return   // one finger drives it
      const s = inputs.current
      press = {
        id: e.pointerId, x: e.clientX, y: e.clientY, live: false, timer: 0,
        was: { touch: s.touch, lead: s.lead },
      }
      press.timer = window.setTimeout(engage, HOLD_MS)
    }

    const onTouchMove = (e) => {
      if (!press || e.pointerId !== press.id) return
      press.x = e.clientX
      press.y = e.clientY
      if (press.live && !still) {
        inputs.current.touch = { x: press.x, y: press.y, cell: null }
        aim()
      }
    }

    /* Settle onto the cell the finger left, so the grid ends in a selection
       rather than on whatever fraction of a cell the lift happened over. The
       press keeps its implicit capture on the element it began on — capturing
       to the root instead would retarget the click away from a link. */
    const land = (x, y) => {
      const hit = document.elementFromPoint(x, y)
      const cell = hit && root.contains(hit) ? cellOf(hit) : null
      const s = inputs.current
      if (cell) s.touch = { x, y, cell }
      else {
        const b = root.getBoundingClientRect()
        const inside = x >= b.left && x <= b.right && y >= b.top && y <= b.bottom
        s.touch = inside && !still ? { x, y, cell: null } : null
      }
      s.lead = 'touch'
      aim()
    }

    const onUp = (e) => {
      if (!press || e.pointerId !== press.id) return
      window.clearTimeout(press.timer)
      const { x, y } = press
      press = null
      land(x, y)
    }

    // The browser took the gesture for a scroll, so it was never a press: the
    // selection from before it comes back. Within the hold nothing had moved;
    // after it, the weight eases back from wherever the finger had pulled it.
    const onCancel = (e) => {
      if (!press || e.pointerId !== press.id) return
      window.clearTimeout(press.timer)
      const { live: moved, was } = press
      press = null
      if (!moved) return
      Object.assign(inputs.current, was)
      aim()
    }

    // A tap anywhere outside releases a sticky selection, as it would a hover.
    const onDocDown = (e) => {
      if (root.contains(e.target) || !inputs.current.touch) return
      inputs.current.touch = null
      aim()
    }

    /* ---- keyboard: focus acts as hover -------------------------------- */

    const onFocusIn = (e) => {
      let keyboard = true
      try { keyboard = e.target.matches(':focus-visible') } catch { /* old engine */ }
      const s = inputs.current
      // A click that focuses a link is already told by the pointer.
      s.focus = keyboard ? e.target : null
      if (keyboard) s.lead = 'focus'
      aim()
    }

    const onFocusOut = (e) => {
      if (e.relatedTarget && root.contains(e.relatedTarget)) return   // focusin follows
      inputs.current.focus = null
      aim()
    }

    /* ---- the page moving under a resting cursor ------------------------ */

    // Wheel-scrolling moves the grid under a pointer that sends no move of its
    // own, so the last known point is re-read against the grid's new place.
    // Scroll events fire once per frame, before its animation callbacks, so the
    // layout read here comes ahead of this frame's write rather than after it.
    const onScroll = () => {
      const s = inputs.current
      if (!s.mouse || !onScreen) return
      const b = root.getBoundingClientRect()
      const { x, y } = s.mouse
      if (x < b.left || x > b.right || y < b.top || y > b.bottom) s.mouse = null
      aim()
    }

    const onMotionPref = () => {
      still = mq.matches
      aim()
    }

    // A resize under a resting pointer re-aims it against the new geometry.
    const ro = new ResizeObserver(aim)
    ro.observe(root)

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen) kick()
      else if (raf) { cancelAnimationFrame(raf); raf = 0 }
    })
    io.observe(root)

    paint()   // right track count first, so aim() measures the new layout
    aim()
    /* An axis whose count changed lands on its target at once: the change is
       already a discrete step, and a collapse-then-regrow after it would be a
       second motion. An unchanged axis glides on from where it was. */
    if (freshC) axis(cw, wantC, tx, 1, 0, 1)
    if (freshR) axis(rw, wantR, ty, 1, 0, 1)
    paint()
    poke.current = kick

    root.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerleave', onLeave, { passive: true })
    root.addEventListener('pointerdown', onDown, { passive: true })
    root.addEventListener('pointerup', onUp, { passive: true })
    root.addEventListener('pointercancel', onCancel, { passive: true })
    root.addEventListener('focusin', onFocusIn)
    root.addEventListener('focusout', onFocusOut)
    document.addEventListener('pointerdown', onDocDown, { capture: true, passive: true })
    window.addEventListener('scroll', onScroll, { capture: true, passive: true })
    mq.addEventListener?.('change', onMotionPref)

    return () => {
      poke.current = null
      ro.disconnect()
      io.disconnect()
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
      root.removeEventListener('pointerdown', onDown)
      root.removeEventListener('pointerup', onUp)
      root.removeEventListener('pointercancel', onCancel)
      root.removeEventListener('focusin', onFocusIn)
      root.removeEventListener('focusout', onFocusOut)
      document.removeEventListener('pointerdown', onDocDown, { capture: true })
      window.removeEventListener('scroll', onScroll, { capture: true })
      mq.removeEventListener?.('change', onMotionPref)
      if (press) window.clearTimeout(press.timer)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [nc, nr])

  return (
    <div
      ref={rootRef}
      className={`weight-grid ${className}`.trim()}
      // The even grid is in CSS, so it is right before the effect runs and in
      // server-rendered HTML; the loop takes over the template from there.
      style={{ '--wg-columns': nc, '--wg-rows': nr, gap: `${gap}px`, ...style }}
      {...rest}
    >
      {children}
    </div>
  )
}
