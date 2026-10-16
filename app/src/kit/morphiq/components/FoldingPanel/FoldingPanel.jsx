'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import './FoldingPanel.css'

/* =========================================================
   FoldingPanel
   A panel that folds along real crease lines, each facet
   catching light correctly as its angle changes.

   The usual accordion scales its panels, or turns each one
   about its own edge, and it cannot close: the facets come
   apart and pass through one another, because nothing
   tracks where the previous crease ended up. A folded sheet
   is a zigzag, and its creases lie in two planes. Every
   other one stays where the flat sheet was; the ones between
   fall back from it by w·sin θ. So each facet here is a
   single turn about a crease that stays on the panel's own
   plane — an even facet about its leading crease, an odd one
   about its trailing crease — and the crease that falls back
   between two neighbours is reached from both sides at once.
   The paper stays connected however far it closes, and there
   is nothing to measure: the whole fold is written in
   percentages of a facet, so a resize costs nothing.

   Two things make it read as paper rather than as rotated
   divs:

   · the accordion foreshortens. A facet of width w tilted by
     θ occupies w·cos θ across the panel, so the whole thing
     narrows as it folds — exactly as a folded map does —
     about `anchor`, the one point of it that stays put.
   · each facet shades by Lambert's cosine law, I = N·L, with
     the normal taken from the facet's own angle. Alternate
     facets tilt opposite ways, so they alternate light and
     dark on their own rather than from a hardcoded stripe.

   perspective sits on the container, not the facets, so all
   of them share one vanishing point. Per-element perspective
   gives each facet its own, and the fold visibly comes apart.
   The fold falls back from the panel's plane, so it closes
   in on that point and never outgrows its box. (A negative
   maxAngle folds it toward the eye instead, where it can.)

   A new fold does not arrive in one frame. The crease angle
   rides a spring,

     θ″ = −k·(θ − θ₀) − c·θ′

   critically damped at the defaults: it sets off at once,
   is there in about a third of a second and does not swing
   past, because heavy paper has no bounce in it. Opening
   reads quicker than closing, and nothing was tuned to make
   it so: width goes as cos θ, which is all but flat near
   θ = 0, so the panel is at full width well before the angle
   has finished arriving. A change that lands mid-move only
   moves θ₀ — the angle and its rate carry on — so a fold
   told to close and then to open turns round in one motion
   instead of starting again. The spring is solved rather
   than stepped: each frame takes the exact solution over the
   time that really passed, so it is the same curve at 60 Hz
   and at 120 Hz and it holds at any stiffness. The loop
   stops the moment the fold has settled. Out of view, or
   under reduced motion, there is no move to watch and the
   fold is simply at its new angle. The light, the ambient
   floor and the anchor ease over ~80 ms rather than snap.

   With `drag`, a hand folds it, and the foreshortening law
   is the whole mapping. A point of the sheet m from the
   anchor sits at m·cos θ, so for it to stay under the finger
   cos θ has to move by the finger's travel over m: pull out
   and the fold opens, push in and it closes, and the paper
   you took hold of stays in your hand — as nearly as the
   vanishing point allows: the law is the flat one, and a
   crease that has fallen back is drawn a little nearer the
   middle than it lies. Paper does not stretch, so the pull
   stops dead at flat. Taken mid-move, the fold stops where
   it was caught; a press that never travels takes nothing
   else, so a click cannot crease it, and a pull is not a
   click: the one the browser makes of it is swallowed, so a
   panel inside a link can be folded. Let go and it carries
   on the way the hand was going — the hand's speed fitted
   over the last 70 ms of the stroke, not one event — with
   the spring picking up from that angle and that rate.
   Under reduced motion the fold still follows the hand —
   that motion is yours — and stays where it is let go.

   The panel never keeps a fold of its own. A hand, or a key,
   asks for one through onFoldChange, and `fold` stays the
   truth: answer and the paper stays where it was left, don't
   and it springs back. The drag takes one axis and leaves
   the page the other and the pinch. Its keyboard twin is a
   real range input laid unseen over the panel — arrows,
   Page Up and Down, Home and End, the name and value a
   screen reader expects — there only when there is an
   onFoldChange for it to work.

   The content is painted once per facet but exists once. The
   first facet holds the real copy; the others are aria-hidden
   and inert, so a screen reader reads it once and Tab stops
   in it once. That makes the children artwork: a control in
   them works only where the first facet shows it.
   ========================================================= */

const clamp = (n, lo, hi) => (n < lo ? lo : n > hi ? hi : n)
const finite = (n, d) => (Number.isFinite(n) ? n : d)

/* The fold is posed in a layout effect, so a change of axis or facet count is
   never painted half-applied. Plain useEffect on the server, where there is
   nothing to lay out and older Reacts warn about it. */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

const RAD = Math.PI / 180
const HALF = Math.PI / 2
const MOST = 64       // facets, at most
const EASE = 0.08     // s — how quickly the light, the ambient floor and the anchor follow a change
const REST = 3e-4     // rad — closer to its target than this, and slow, the fold is there
const RIGID = 1e5     // 1/s² — a spring this stiff is there within a frame, and is taken to be rigid
const TRAIL = 70      // ms of stroke the release speed is fitted over
const FAST = 4000     // px/s — the fastest a hand is taken to be moving
const REACH = 0.12    // the nearest to the anchor a hand is taken to hold the sheet, as a fraction of the panel
const SLOP = 3        // px a press may wander before it is a pull
const STEP = 0.05     // fold per arrow key
const LEAP = 0.2      // fold per Page Up or Page Down

// Something in the artwork that wants the press for itself.
const CONTROLS = 'a, button, input, select, textarea, label, summary, [contenteditable]'

// The props as the fold uses them: in range, and a number wherever one is needed.
function read(p) {
  const top = clamp(finite(p.maxAngle, 78), -90, 90) * RAD
  const k = p.stiffness === Infinity ? Infinity : Math.max(1, finite(p.stiffness, 400))
  return {
    top,
    to: clamp(finite(p.fold, 0), 0, 1) * top,
    light: clamp(finite(p.light, 0.55), 0, 1),
    ambient: clamp(finite(p.ambient, 0.42), 0, 1),
    anchor: clamp(finite(p.anchor, 0.5), 0, 1),
    k,
    c: clamp(finite(p.damping, 40), 1, 1e4), // a fold always loses something on the way
    rigid: k >= RIGID,
    horizontal: p.axis !== 'y',
  }
}

/* Facet i of n at crease angle t: its transform and its shade.

   Crease j of the flat sheet sits j facets along. Folded, it sits j·cos t
   along, plus whatever keeps the anchor where it was — so the facet's hinge,
   crease i for an even facet and i + 1 for an odd one, has moved by
   (anchor·n − j)·(1 − cos t) facets, which as a percentage is in the facet's
   own width and needs no measuring. Flat, there is no transform at all, and
   the facets are plain boxes that meet on whole pixels. */
function pose(i, n, t, anchor, light, ambient, horizontal) {
  const odd = i & 1
  const a = odd ? -t : t
  const shift = ((anchor * n - (i + odd)) * (1 - Math.cos(t)) * 100).toFixed(3)
  const deg = (a / RAD).toFixed(3)
  const transform = !t
    ? 'none'
    : horizontal
      ? `translateX(${shift}%) rotateY(${deg}deg)`
      : `translateY(${shift}%) rotateX(${-deg}deg)`

  /* Lambert: the facet normal turns with the facet, so the dot product with a
     fixed light gives alternating bright and dark automatically. */
  const lx = (light - 0.5) * 2
  const lz = Math.sqrt(Math.max(0, 1 - lx * lx))
  const lambert = clamp(Math.sin(a) * lx + Math.cos(a) * lz, 0, 1)
  return [transform, (ambient + (1 - ambient) * lambert).toFixed(3)]
}

/* A damped spring's offset x and rate v after h seconds, for stiffness k and
   damping c: the exact solution, in whichever of its three forms the damping
   calls for — it rings below critical, creeps above it. */
function spring(x, v, k, c, h) {
  const s = c / 2
  const d = s * s - k
  if (Math.abs(d) < 1e-6 * k) {
    const b = v + s * x
    const e = Math.exp(-s * h)
    return [(x + b * h) * e, (v - s * b * h) * e]
  }
  if (d < 0) {
    const w = Math.sqrt(-d)
    const b = (v + s * x) / w
    const e = Math.exp(-s * h)
    const cs = Math.cos(w * h), sn = Math.sin(w * h)
    return [e * (x * cs + b * sn), e * (v * cs - (s * b + w * x) * sn)]
  }
  const q = Math.sqrt(d)
  const r1 = -s + q, r2 = -s - q
  const a = (v - r2 * x) / (2 * q), b = x - a
  const e1 = Math.exp(r1 * h), e2 = Math.exp(r2 * h)
  return [a * e1 + b * e2, a * r1 * e1 + b * r2 * e2]
}

export default function FoldingPanel({
  facets = 6,          // how many facets the panel is creased into, 1–64
  fold = 0,            // 0 flat, 1 fully closed
  maxAngle = 78,       // degrees each facet tilts at fold = 1, up to 90; negative folds toward the eye
  perspective = 1200,  // px
  light = 0.55,        // direction of the key light, 0..1 across the panel
  ambient = 0.42,      // floor brightness, so a dark facet is not black
  axis = 'x',          // fold across the width, or down the height

  anchor = 0.5,        // the point of the panel that stays put as it narrows, 0..1 along the fold
  stiffness = 400,     // spring carrying the crease angle to a new fold, 1/s² — Infinity follows the prop exactly
  damping = 40,        // its damping, 1/s — at the defaults critical: there in a third of a second, never past

  drag = false,        // let a hand fold it: the paper it takes hold of stays under it
  onFoldChange,        // called with the fold, 0..1, that a hand or a key is asking for
  dragLabel = 'Fold',  // accessible name of the slider that stands in for the drag on a keyboard

  children,
  className = '',
  style,
  ...rest
}) {
  const rootRef = useRef(null)
  const api = useRef(null)

  const n = clamp(Math.floor(finite(facets, 6)), 1, MOST)
  const strips = useMemo(() => Array.from({ length: n }, (_, i) => i), [n])
  const upright = axis === 'y'
  const at = clamp(finite(fold, 0), 0, 1)

  // The fold as first rendered, so the server's markup is already folded. After
  // that the loop owns the facets' transforms and React leaves them alone.
  const [first] = useState(() => read({ fold, maxAngle, light, ambient, anchor, axis }))

  const live = useRef({})
  // Synced after every render and before the effects below, so the loop reads
  // current props without being torn down and restarted.
  useIsomorphicLayoutEffect(() => {
    live.current = { fold, maxAngle, light, ambient, axis, anchor, stiffness, damping, drag, onFoldChange }
  })

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let still = motion.matches
    let seen = true               // false once the panel is known to be out of view

    let cells = []
    const p0 = read(live.current)
    let x = p0.to, v = 0          // the crease angle, rad, and its rate
    let li = p0.light, am = p0.ambient, an = p0.anchor   // as displayed, eased toward the props
    let raf = 0, last = 0
    let tick = 1 / 60             // the display's frame interval, as last measured

    // The hand. Held, the crease angle is whatever keeps the paper under it.
    let held = false, pid = -1
    let box = null, scale = 1     // root rect, cached for the length of a drag
    let wide = true               // the axis it was taken along
    let taken = false             // the press has travelled, and is a pull
    let h0 = 0, c0 = 1            // where along the panel it took hold, and cos θ then
    let lever = 1                 // how far along the flat sheet from the anchor, signed, px
    let floor = 0, sign = 1       // cos θ at the far end of the pull, and which way the fold tilts
    let trail = []                // [t, px along the panel] of the stroke
    let told = NaN                // the fold last asked for
    let pulled = -1               // when a pull was last let go, ms — the click that follows it is not one

    const paint = (horizontal) => {
      const count = cells.length
      for (let i = 0; i < count; i++) {
        const [transform, shade] = pose(i, count, x, an, li, am, horizontal)
        cells[i].style.transform = transform
        cells[i].style.setProperty('--fp-shade', shade)
      }
    }

    const frame = (now) => {
      raf = 0
      // Back-to-back frames measure the display, 60 Hz or 120 Hz alike. The
      // first frame after the loop has been idle advances one frame of that,
      // not the idle time; a stall mid-move, like a return to the tab,
      // advances at most 1/30 s.
      const gap = last ? (now - last) / 1000 : 0
      const dt = gap > 0 ? Math.min(gap, 1 / 30) : tick
      if (gap > 0 && gap < 1 / 40) tick += (gap - tick) * 0.5
      last = now
      const p = read(live.current)
      const quick = still || !seen
      let busy = false

      if (!held) {
        if (!quick && !p.rigid) {
          ;[x, v] = spring(x - p.to, v, p.k, p.c, dt)
          x += p.to
          // Edge-on, the facets have met: a swing cannot carry them through
          // one another, and stops there.
          if (Math.abs(x) > HALF) { x = clamp(x, -HALF, HALF); v = 0 }
        }
        if (quick || p.rigid || (Math.abs(x - p.to) < REST && Math.abs(v) < REST * 20)) { x = p.to; v = 0 }
        else busy = true
      }

      const e = quick ? 1 : 1 - Math.exp(-dt / EASE)
      li += (p.light - li) * e
      am += (p.ambient - am) * e
      an += (p.anchor - an) * e
      if (Math.abs(p.light - li) < 1e-3) li = p.light; else busy = true
      if (Math.abs(p.ambient - am) < 1e-3) am = p.ambient; else busy = true
      if (Math.abs(p.anchor - an) < 1e-4) an = p.anchor; else busy = true

      paint(p.horizontal)
      if (busy) raf = requestAnimationFrame(frame)
    }

    const kick = () => {
      if (!raf) { last = 0; raf = requestAnimationFrame(frame) }
    }

    // A change with no move to make of it — reduced motion, out of view, a
    // rigid spring — is posed before the browser paints, not a frame later.
    const follow = () => {
      if (raf) return
      if (still || !seen || read(live.current).rigid) { last = 0; frame(performance.now()) }
      else kick()
    }

    const rebuild = () => {
      cells = Array.from(root.querySelectorAll(':scope > .folding-panel__facet'))
      // Every copy but the first is paint. Set here, not in the markup: React
      // 18 and 19 disagree about how `inert` is written.
      for (let i = 1; i < cells.length; i++) cells[i].inert = true
      paint(read(live.current).horizontal)
    }

    const locate = () => {
      box = root.getBoundingClientRect()
      scale = root.offsetWidth ? box.width / root.offsetWidth || 1 : 1
    }

    const along = (e) => (wide ? e.clientX - box.left : e.clientY - box.top) / scale

    // The crease angle that keeps the paper under a hand at h.
    const grasp = (h) => sign * Math.acos(clamp(c0 + (h - h0) / lever, floor, 1))

    const ask = (t) => {
      const tell = live.current.onFoldChange
      const { top } = read(live.current)
      if (typeof tell !== 'function' || !top) return
      const f = clamp(t / top, 0, 1)
      if (f !== told) { told = f; tell(f) }
    }

    // Least-squares speed of the hand over the end of the stroke, px/s.
    const fling = (t) => {
      const win = trail.filter((q) => q[0] >= t - TRAIL)
      if (win.length < 2) return 0
      let mt = 0, mh = 0
      for (const q of win) { mt += q[0] / win.length; mh += q[1] / win.length }
      let tt = 0, th = 0
      for (const q of win) { tt += (q[0] - mt) ** 2; th += (q[0] - mt) * (q[1] - mh) }
      return tt < 1e-6 ? 0 : clamp((th / tt) * 1000, -FAST, FAST)
    }

    const onDown = (e) => {
      const p = read(live.current)
      if (!live.current.drag || held || (e.pointerType === 'mouse' && e.button !== 0)) return
      if (e.target.closest?.(CONTROLS)) return
      wide = p.horizontal
      const size = wide ? root.offsetWidth : root.offsetHeight
      if (!(size > 0)) return
      e.preventDefault()          // the press is the panel's: no selection started from it
      locate()

      // The fold stops where it is caught, and the hand takes the sheet where
      // it touched it: that far from the anchor once the fold is undone. Too
      // near the anchor and a hair's travel would close the panel, so the
      // hold is never taken to be nearer than REACH, nor past the sheet's end.
      const pin = an * size
      h0 = along(e)
      c0 = Math.cos(x)
      sign = (x || p.top) < 0 ? -1 : 1
      floor = Math.cos(Math.max(Math.abs(p.top), Math.abs(x)))
      lever = (h0 < pin ? -1 : 1)
        * clamp(Math.abs(h0 - pin) / Math.max(c0, 0.05), REACH * size, Math.max(pin, size - pin))

      held = true
      taken = false
      pid = e.pointerId
      v = 0
      told = NaN
      trail = [[e.timeStamp, h0]]
      try { root.setPointerCapture(pid) } catch { /* capture is a nicety */ }
      grip(true)
    }

    const onMove = (e) => {
      if (!held || e.pointerId !== pid) return
      const list = e.getCoalescedEvents?.()
      for (const c of list && list.length ? list : [e]) trail.push([c.timeStamp, along(c)])
      while (trail.length > 2 && trail[0][0] < e.timeStamp - 200) trail.shift()
      const h = along(e)
      if (!taken) {
        // The pull starts from the edge of the slop, so the paper does not
        // jump it when it does, and trails the hand by no more than that.
        if (Math.abs(h - h0) < SLOP) return
        taken = true
        h0 += Math.sign(h - h0) * SLOP
      }
      const t = grasp(h)
      if (t === x) return
      x = t
      ask(x)
      kick()
    }

    const onUp = (e) => {
      if (!held || (e.pointerId != null && e.pointerId !== pid)) return
      const up = e.type === 'pointerup'
      if (up) trail.push([e.timeStamp, along(e)])
      held = false
      pid = -1
      grip(false)
      try { root.releasePointerCapture(e.pointerId) } catch { /* already gone */ }

      // The paper carries on the way the hand was going. A critically damped
      // spring let go at speed u, toward a point u·c/k ahead, runs onto it and
      // stops without turning back, so that is where the hand is taken to
      // land, and the fold that puts the paper there is the one asked for. Up
      // against flat or closed there is less room than that, and the rate is
      // cut to what the room allows — the fold slows into the stop rather
      // than swinging through it.
      const p = read(live.current)
      if (taken) {
        const h = trail[trail.length - 1][1]
        const u = up && !still && !p.rigid ? fling(e.timeStamp) : 0
        const land = grasp(h + (u * p.c) / p.k)
        const most = Math.sqrt(p.k) * Math.abs(land - x)
        v = clamp((grasp(h + u * tick) - x) / tick, -most, most)
        ask(land)
        if (up) pulled = e.timeStamp
      } else if (x !== p.to) {
        ask(x)                    // caught mid-move and let go: it stays where it was caught
      }
      kick()
    }

    // A pull ends in a click, on the panel or on whatever link or card it sits
    // in. It was not one, and goes no further.
    const onClick = (e) => {
      if (e.detail && e.timeStamp - pulled < 60) { e.preventDefault(); e.stopPropagation() }
      pulled = -1
    }

    // The browser's own drag, of an image or a link in the artwork, would
    // take the stroke away mid-pull.
    const onDragStart = (e) => { if (live.current.drag) e.preventDefault() }

    const onScroll = () => { locate() }

    // The window hears about a hold only while there is one: the scroll that
    // moves the page under a still hand, and the release, should the capture
    // have been refused.
    const grip = (on) => {
      const act = on ? 'addEventListener' : 'removeEventListener'
      window[act]('scroll', onScroll, { capture: true, passive: true })
      window[act]('pointerup', onUp)
      window[act]('pointercancel', onUp)
      root.classList.toggle('is-held', on)
    }

    const onMotion = () => { still = motion.matches; follow() }

    const io = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver((entries) => { seen = entries[entries.length - 1].isIntersecting })
    io?.observe(root)

    root.addEventListener('pointerdown', onDown)
    root.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerup', onUp)
    root.addEventListener('pointercancel', onUp)
    root.addEventListener('lostpointercapture', onUp)
    root.addEventListener('click', onClick, true)
    root.addEventListener('dragstart', onDragStart)
    motion.addEventListener?.('change', onMotion)

    rebuild()
    api.current = { follow, rebuild }

    return () => {
      api.current = null
      io?.disconnect()
      grip(false)
      root.removeEventListener('pointerdown', onDown)
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerup', onUp)
      root.removeEventListener('pointercancel', onUp)
      root.removeEventListener('lostpointercapture', onUp)
      root.removeEventListener('click', onClick, true)
      root.removeEventListener('dragstart', onDragStart)
      motion.removeEventListener?.('change', onMotion)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // New facets, or the other axis, are posed where the fold is now, before
  // they are painted flat; the fold keeps its angle and its rate.
  useIsomorphicLayoutEffect(() => {
    api.current?.rebuild()
  }, [strips, upright])

  // A prop change moves the spring's target; the fold goes there from where
  // it is, at the rate it has.
  useIsomorphicLayoutEffect(() => {
    api.current?.follow()
  }, [fold, maxAngle, light, ambient, anchor, stiffness, damping])

  const keyed = drag && typeof onFoldChange === 'function'

  const onKeyDown = (e) => {
    const by = { ArrowRight: STEP, ArrowUp: STEP, ArrowLeft: -STEP, ArrowDown: -STEP, PageUp: LEAP, PageDown: -LEAP }[e.key]
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? 1 : by ? clamp(Math.round((at + by) * 1e4) / 1e4, 0, 1) : null
    if (next === null || e.altKey || e.ctrlKey || e.metaKey) return
    e.preventDefault()
    if (next !== at) onFoldChange(next)
  }

  return (
    <div
      ref={rootRef}
      className={`folding-panel folding-panel--${upright ? 'y' : 'x'}${drag ? ' folding-panel--drag' : ''} ${className}`.trim()}
      style={{ perspective: `${Math.max(1, finite(perspective, 1200))}px`, ...style }}
      {...rest}
    >
      {strips.map((i) => {
        const [transform, shade] = pose(i, n, first.to, first.anchor, first.light, first.ambient, first.horizontal)
        return (
          <div
            className={`folding-panel__facet${i % 2 ? ' is-odd' : ''}`}
            key={i}
            aria-hidden={i ? 'true' : undefined}
            style={{ '--fp-i': i, '--fp-n': n, '--fp-shade': shade, transform }}
          >
            <div className="folding-panel__inner">{children}</div>
          </div>
        )
      })}
      {keyed ? (
        <input
          className="folding-panel__range"
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(at * 100)}
          aria-label={dragLabel}
          aria-valuetext={`${Math.round(at * 100)}%`}
          onChange={(e) => onFoldChange(clamp(e.target.valueAsNumber / 100, 0, 1))}
          onKeyDown={onKeyDown}
        />
      ) : null}
    </div>
  )
}
