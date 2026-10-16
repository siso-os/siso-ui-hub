'use client'

import { useEffect, useRef, useState } from 'react'
import './FerrofluidNav.css'

/* =========================================================
   FerrofluidNav
   A nav whose active pill does not slide. It stretches out of
   the item it is leaving, thins to a neck, and gathers back
   into the one it is entering — the way a drop of ferrofluid
   is drawn between two magnets.

   Measured over the four-item demo bar at the defaults: the
   pill rests at 114 × 54px on "Overview" — the item's box
   plus `padding`, exactly. Sent to the far end it draws out to
   about 260px, slims to 48px, necks to three quarters of that
   at the middle, and gathers to 124 × 54px on "Changelog". It
   stays one connected body; drop `blend` and `stretch` to zero
   and the two ends only touch, which reads as a glitch on a
   nav and as physics on a cursor.

   The whole effect is one function. Two capsules — one per
   end of the fluid — are blended with a polynomial smooth-min:

     smin(a, b, k) = min(a, b) − h²k/4,  h = max(k − |a−b|, 0)/k

   `smin` is what a plain `min` is to a hard union: below the
   blend radius k two separate fields fuse into one surface
   with a real neck between them. That neck is the entire
   point — a sliding pill is a translate, and a translate has
   no surface tension.

   Applied naively, smin inflates. Where the two capsules
   overlap, a ≈ b, and the surface is pushed out by the full
   k/4 — so a pill that should stretch and thin instead
   balloons while it moves, and sits k/4 fatter than its own
   `padding` at rest. Surface tension acts across a gap, not
   through fluid that is already joined, so the blend here is
   limited by the gap g between the capsules' facing ends. A
   blend of 4(√(r² + g²/4) − r) would lift the middle of the
   join exactly level with lobes of radius r; k is held to
   four fifths of that. Overlapping, the union is exact;
   pulled apart, the join sits just below the lobes' surface,
   which is what makes it a neck rather than a bulge.

   The two ends are not placed, they are coupled. The leading
   one rides a damped spring toward the item being entered and
   carries whatever velocity it already had, so a second click
   mid-travel bends the path instead of restarting it. The
   trailing one has inertia of its own: it is a critically
   damped follower of the leader (ω 18 rad/s), so it holds in
   the item being left for the first beat, is drawn out after
   the leader, and lands a beat behind it. The naive version,
   which offsets the tail by velocity, throws it backwards on
   the first frame and brings both ends in together, which
   reads as a shape rather than a liquid. The neck can only
   open so far: a full-speed blend k lets go at a gap of
   2r + k/2, the gap is held to 2r + 0.6·k/2, and past that the
   neck drags the tail at the leader's speed — so a long run
   necks without snapping, whatever the item widths.

   Volume is roughly kept: the longer the body is drawn, the
   thinner it gets, (L / (L + s))^0.15 for a lobe of rest
   length L drawn s apart, and it fattens back as the tail
   gathers in. Each lobe takes the size of whatever it is
   passing over, interpolated between item centres, so leaving
   a short label for a long one grows the body as it travels
   rather than snapping to the new width at the click.

   The blend radius is not constant either. It opens with
   travel speed, so a fast body holds together across a
   longer neck and a slow one lets it close up.

   A hovered item is a weaker magnet. The leading end is drawn
   toward it by `reach`, and while it is pressed by twice that
   — the draw that precedes the break, begun inside a frame of
   the press. The far end stays put, so the pill never looks as
   if it is leaving the item it is on; it only reaches. That
   draw answers on a critically damped spring, quick to engage
   and slower to let go. The labels are inked by the fluid
   itself: each one brightens by how much of it the field
   covers, so text turns light as the liquid floods under it,
   not before; a hovered or pressed label lifts part of the way
   on its own, so a touch gets the same acknowledgement a
   cursor does. A label that has just been chosen keeps that
   lift until the liquid arrives to carry it the rest of the
   way, so it never dims between the tap and the fill.

   Drawing it means evaluating that field per pixel and
   shading where it crosses zero. Only the blob's own bounding
   box is visited, which on a nav bar is a few thousand pixels
   — cheaper than it sounds, and exact, where tracing the
   isoline on a grid would have to reassemble loose segments
   into a fillable loop first. The edge is `smoothstep` across
   one device pixel of distance, so it is genuinely antialiased
   rather than stair-stepped. It has to be true distance: in
   the blend, smin's gradient is shorter than 1, so the field
   is divided by it there, or the neck's edge would go soft
   just where the eye is. The keyboard focus ring is the
   same field read a few pixels further out, so it follows the
   liquid through its neck instead of drawing a box around it.
   Under reduced motion the fluid is simply wherever it is
   going; the inks and the ring still answer, without motion.
   ========================================================= */

const clamp = (n, lo, hi) => (n < lo ? lo : n > hi ? hi : n)
const finite = (n, fallback) => (Number.isFinite(n) ? n : fallback)
const smooth01 = (t) => {
  const u = t < 0 ? 0 : t > 1 ? 1 : t
  return u * u * (3 - 2 * u)
}

const TAIL_OMEGA = 18    // rad/s, the trailing end's critically damped follow
const NECK_STRAIN = 0.6  // share of the full-speed blend's reach the neck may open to
const FILLET = 0.8       // share of the blend that would lift the join level with the lobes
const THIN = 0.15        // exponent of the thinning a drawn-out body does
const SUBSTEP = 1 / 240  // s, the coarsest slice the travel is integrated in
const MAX_DT = 1 / 30    // s, a backgrounded tab resumes rather than leaping
const FULL_SPEED = 900   // px/s at which all of `stretch` is spent
const ENGAGE = 45        // rad/s, the lean reaching toward a magnet (~85 ms)
const RELEASE = 22       // rad/s, the lean letting go (~180 ms)
const INK_IN = 0.035     // s, a hovered label brightening
const INK_OUT = 0.07     // s, and dimming again
const HOVER_INK = 0.4    // how far a hover lifts a label toward full ink
const INK_SAMPLES = [-0.3, 0, 0.3] // across each label, as fractions of its width
const RING_TAU = 0.04    // s, the focus ring fading in or out
const RING_GAP = 2.5     // px between the liquid's surface and its focus ring
const RING_W = 2         // px, the focus ring's width
const MAX_PAD = 120      // px, keeps the canvas and its pixel buffer a size a browser will allocate

/* Signed distance to a horizontal capsule: a segment thickened by r.
   Negative inside. A circle cannot represent a nav item — items are wider
   than they are tall, so the lobe has to be a pill, and a pill is a segment
   with a radius. */
function sdCapsule(px, py, x0, x1, y, r) {
  const qx = px < x0 ? x0 - px : px > x1 ? px - x1 : 0
  return Math.hypot(qx, py - y) - r
}

/** Polynomial smooth-minimum. k is the blend radius, in px. */
function smin(a, b, k) {
  if (k <= 0) return Math.min(a, b)
  const h = Math.max(k - Math.abs(a - b), 0) / k
  return Math.min(a, b) - h * h * k * 0.25
}

/* The same blended field, divided by the length of its own gradient so it
   reads as a true distance near the surface. Inside the blend, smin mixes two
   unit gradients that point different ways, (1 − h/2)∇a + (h/2)∇b, and the
   result is shorter than 1, most of all in the throat of the neck. Shaded
   raw, a one-pixel feather there spreads over one and a half, and the focus
   ring drifts out from the surface. Used for painting; the label inks read
   the plain field, where a pixel either way does not show. */
function sdPair(px, py, a, b, k) {
  const ax = px < a.x0 ? px - a.x0 : px > a.x1 ? px - a.x1 : 0
  const ay = py - a.y
  const la = Math.sqrt(ax * ax + ay * ay)
  const da = la - a.r
  const bx = px < b.x0 ? px - b.x0 : px > b.x1 ? px - b.x1 : 0
  const by = py - b.y
  const lb = Math.sqrt(bx * bx + by * by)
  const db = lb - b.r
  const diff = da - db
  if (k <= 0 || diff >= k || diff <= -k) return diff < 0 ? da : db
  const h = (k - Math.abs(diff)) / k
  const wa = diff < 0 ? 1 - h * 0.5 : h * 0.5
  const ia = la > 1e-6 ? wa / la : 0
  const ib = lb > 1e-6 ? (1 - wa) / lb : 0
  const gx = ax * ia + bx * ib
  const gy = ay * ia + by * ib
  return (Math.min(da, db) - h * h * k * 0.25) / Math.max(0.2, Math.sqrt(gx * gx + gy * gy))
}

/* One exact step of a critically damped spring, x″ = −ω²(x − goal) − 2ωx′.
   Closed form rather than integrated, so it takes the same time at 60 Hz and
   120 Hz, and it cannot overshoot a fixed goal. */
function critical(s, goal, omega, dt) {
  const d = s.x - goal
  const c = s.v + omega * d
  const e = Math.exp(-omega * dt)
  s.x = goal + (d + c * dt) * e
  s.v = (s.v - omega * c * dt) * e
}

/* Any CSS colour to straight RGBA bytes, by letting the browser paint it. A
   regex over hex and rgb() silently turns every hsl(), oklch() or named
   colour into the fallback blue. */
function resolveRgba(css) {
  const probe = document.createElement('canvas')
  probe.width = probe.height = 1
  const p = probe.getContext('2d', { willReadFrequently: true })
  if (!p) return [99, 154, 255, 1]
  p.fillStyle = '#639aff'
  p.fillStyle = css
  p.fillRect(0, 0, 1, 1)
  const d = p.getImageData(0, 0, 1, 1).data
  return [d[0], d[1], d[2], d[3] / 255]
}

const focusVisible = (el) => {
  try {
    return el.matches(':focus-visible')
  } catch {
    return true
  }
}

export default function FerrofluidNav({
  items = [],
  activeId,
  defaultActiveId,
  onSelect,

  /* --- the fluid --- */
  blend = 26,          // blend radius across the neck before speed adds to it, px
  stretch = 34,        // extra blend radius at full travel speed, px
  padding = 10,        // how far the resting pill overhangs an item's box, px
  reach = 6,           // how far the fluid is drawn toward a hovered item, px (doubled while pressed)

  /* --- the spring the leading end travels on --- */
  stiffness = 210,     // spring constant, per s²
  damping = 22,        // damping coefficient, per s

  color,               // fill; overrides the --ffn-fill custom property
  className = '',
  style,
  ...rest
}) {
  const rootRef = useRef(null)
  const listRef = useRef(null)
  const canvasRef = useRef(null)
  const api = useRef(null)                         // { kick, remeasure }, set by the loop
  const pointer = useRef({ hover: -1, press: -1 }) // written by pointer handlers only

  const list = Array.isArray(items) ? items : []
  const [ownId, setOwnId] = useState(defaultActiveId ?? list[0]?.id ?? null)
  const [ringAt, setRingAt] = useState(-1)         // item showing a focus-visible ring

  const controlled = activeId !== undefined
  const currentId = controlled ? activeId : ownId
  const found = list.findIndex((item) => item.id === currentId)
  const targetIndex = Math.max(0, found)
  // The liquid wears the ring only when it is sitting on the focused item;
  // anywhere else the ring would be pointing at the wrong thing.
  const fluidRing = ringAt >= 0 && ringAt === targetIndex
  const itemsKey = list.map((item) => item.id).join('\u0000')

  const live = useRef({})
  // Synced after every render and before the effects below, so the loop reads
  // current props without being torn down and restarted.
  useEffect(() => {
    live.current = {
      blend: Math.max(0, finite(blend, 26)),
      stretch: Math.max(0, finite(stretch, 34)),
      padding: clamp(finite(padding, 10), 0, MAX_PAD),
      reach: Math.max(0, finite(reach, 6)),
      // Bounded so the integrator's slices stay affordable and stable.
      stiffness: clamp(finite(stiffness, 210), 1, 1e6),
      damping: clamp(finite(damping, 22), 1, 1e4),
      color: color || '',
      targetIndex,
      fluidRing,
    }
  })

  useEffect(() => {
    const root = rootRef.current
    const bar = listRef.current
    const canvas = canvasRef.current
    if (!root || !bar || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let still = motion.matches

    let dpr = 1
    let bleedX = 0          // how far the canvas extends past the root, px
    let bleedY = 0
    let slots = []          // per item, in root space: { c, y, w, h }
    let stops = []          // the same slots, ordered by centre
    let buf = null
    let rgba = [99, 154, 255, 1]
    let colorKey = null
    let ownColor = null
    let raf = 0
    let last = 0

    // All positions are in the root's own space, so a change to the canvas's
    // bleed never moves the liquid.
    const head = { x: 0, v: 0 }   // the leading end, px along the bar
    const tail = { x: 0, v: 0 }   // the trailing end, following it
    const lean = { x: 0, v: 0 }   // the leading end's reach toward a magnet
    let ring = 0                  // focus ring opacity
    let ink = []                  // per item, hover or press brightening 0..1
    let inked = []                // per item, the value last written to the DOM
    let cover = []                // per item, how much of its label the liquid covers

    // The fillet never rises above the lobes, so only the ring and the
    // antialiasing reach past the resting overhang.
    const bleedFor = () => Math.ceil(live.current.padding + RING_GAP + RING_W + 4)

    /* The `color` prop is checked every paint; the `--ffn-fill` fallback only
       on measure, since reading computed style mid-frame would force a style
       recalc right after the label inks were written. */
    const readColor = () => {
      ownColor = live.current.color
      const css =
        ownColor ||
        getComputedStyle(root).getPropertyValue('--ffn-fill').trim() ||
        '#639aff'
      if (css === colorKey) return
      colorKey = css
      rgba = resolveRgba(css)
    }

    /* Layout is read here and nowhere else. Rects are divided by the root's
       own scale so the pill still fits when an ancestor is transformed. */
    const measure = () => {
      const rr = root.getBoundingClientRect()
      const scale = root.offsetWidth ? rr.width / root.offsetWidth || 1 : 1
      const W = rr.width / scale
      const H = rr.height / scale
      bleedY = bleedFor()
      bleedX = bleedY + 24          // room for the spring's overshoot past an end item
      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.max(1, Math.round((W + 2 * bleedX) * dpr))
      canvas.height = Math.max(1, Math.round((H + 2 * bleedY) * dpr))
      canvas.style.left = `${-bleedX}px`
      canvas.style.top = `${-bleedY}px`
      canvas.style.width = `${W + 2 * bleedX}px`
      canvas.style.height = `${H + 2 * bleedY}px`
      buf = null

      slots = Array.from(bar.children).map((el) => {
        const b = el.getBoundingClientRect()
        const w = b.width / scale
        const h = b.height / scale
        return {
          c: (b.left - rr.left) / scale + w / 2,
          y: (b.top - rr.top) / scale + h / 2,
          w,
          h,
        }
      })
      stops = slots.slice().sort((a, b) => a.c - b.c)
      if (ink.length !== slots.length) {
        ink = slots.map(() => 0)
        inked = slots.map(() => -1)
        cover = slots.map(() => 0)
      }
      readColor()
    }

    const goalOf = () => slots[live.current.targetIndex]?.c ?? 0

    /* A lobe at x takes the size of the item under it, interpolated between
       neighbouring centres, and thins by how far the body is drawn out. */
    const lobeAt = (x, pad, drawn) => {
      const n = stops.length
      let a = stops[0]
      let b = a
      let t = 0
      if (x >= stops[n - 1].c) a = b = stops[n - 1]
      else if (x > a.c) {
        let j = 1
        while (j < n - 1 && stops[j].c < x) j++
        a = stops[j - 1]
        b = stops[j]
        t = (x - a.c) / (b.c - a.c || 1)
      }
      const w = a.w + (b.w - a.w) * t
      const h = a.h + (b.h - a.h) * t
      const y = a.y + (b.y - a.y) * t
      const r = Math.max(0.5, h / 2 + pad)
      const half = Math.max(0, w / 2 + pad - r)
      const length = 2 * (half + r)
      return { x0: x - half, x1: x + half, y, r: r * (length / (length + drawn)) ** THIN }
    }

    // The gap between two lobes' facing end-centres; ≤ 0 while they overlap.
    const gapOf = (a, b) => (a.x0 + a.x1 <= b.x0 + b.x1 ? b.x0 - a.x1 : a.x0 - b.x1)

    /* The fluid as it stands: both lobes, and the blend radius between them —
       what speed asks for, limited to what the gap can hold without the
       fillet rising above the lobes. */
    const body = () => {
      const L = live.current
      const lead = head.x + lean.x
      const drawn = Math.abs(lead - tail.x)
      const a = lobeAt(tail.x, L.padding, drawn)
      const b = lobeAt(lead, L.padding, drawn)
      const g = gapOf(a, b)
      const r = Math.min(a.r, b.r)
      const fillet = g > 0 ? FILLET * 4 * (Math.sqrt(r * r + g * g * 0.25) - r) : 0
      const k = Math.min(fillet, L.blend + L.stretch * clamp(Math.abs(head.v) / FULL_SPEED, 0, 1))
      return { a, b, k }
    }

    const field = (px, py, a, b, k) =>
      smin(sdCapsule(px, py, a.x0, a.x1, a.y, a.r), sdCapsule(px, py, b.x0, b.x1, b.y, b.r), k)

    /* Per device pixel over the blob's bounding box only, written straight
       into one canvas-sized buffer and put back as a dirty rect, so nothing
       is allocated per frame. The ring, when shown, is a band of the same
       distance field a few pixels outside the surface. */
    const drawField = ({ a, b, k }, ringAlpha) => {
      const cw = canvas.width
      const ch = canvas.height
      const out = (ringAlpha > 0.004 ? RING_GAP + RING_W : 0) + 2
      const x0 = Math.max(0, Math.floor((Math.min(a.x0 - a.r, b.x0 - b.r) - out + bleedX) * dpr))
      const x1 = Math.min(cw, Math.ceil((Math.max(a.x1 + a.r, b.x1 + b.r) + out + bleedX) * dpr))
      const y0 = Math.max(0, Math.floor((Math.min(a.y - a.r, b.y - b.r) - out + bleedY) * dpr))
      const y1 = Math.min(ch, Math.ceil((Math.max(a.y + a.r, b.y + b.r) + out + bleedY) * dpr))
      if (x1 <= x0 || y1 <= y0) return

      if (!buf || buf.width !== cw || buf.height !== ch) buf = ctx.createImageData(cw, ch)
      const px = buf.data
      const inv = 1 / dpr
      const feather = inv              // one device pixel, in CSS units
      const [R, G, B, A] = rgba
      const alpha = A * 255
      const ringMid = RING_GAP + RING_W / 2

      for (let Y = y0; Y < y1; Y++) {
        const wy = (Y + 0.5) * inv - bleedY
        let o = (Y * cw + x0) * 4
        for (let X = x0; X < x1; X++, o += 4) {
          const d = sdPair((X + 0.5) * inv - bleedX, wy, a, b, k)
          // smoothstep(feather, -feather, d) — 1 well inside, 0 well outside.
          let t = smooth01((feather - d) / (2 * feather))
          if (ringAlpha > 0.004) {
            const band = Math.abs(d - ringMid) - RING_W / 2
            const r = smooth01((feather - band) / (2 * feather)) * ringAlpha
            if (r > t) t = r
          }
          px[o] = R
          px[o + 1] = G
          px[o + 2] = B
          px[o + 3] = (t * alpha) | 0
        }
      }
      ctx.putImageData(buf, 0, 0, x0, y0, x1 - x0, y1 - y0)
    }

    /* Ink: how much of each label the liquid actually covers, sampled at
       three points across it, or a hover's brightening, whichever is more. */
    const inkLabels = ({ a, b, k }) => {
      const kids = bar.children
      for (let i = 0; i < slots.length; i++) {
        const s = slots[i]
        let covered = 0
        for (const f of INK_SAMPLES) {
          // Fully inked once the point is 8px inside the surface.
          covered += smooth01(-field(s.c + f * s.w, s.y, a, b, k) / 8)
        }
        cover[i] = covered / INK_SAMPLES.length
        const v = Math.max(cover[i], ink[i] * HOVER_INK)
        if (Math.abs(v - inked[i]) > 0.004 || (v !== inked[i] && (v === 0 || v === 1))) {
          inked[i] = v
          kids[i]?.style.setProperty('--ffn-cover', v.toFixed(3))
        }
      }
    }

    const paint = () => {
      if (bleedFor() !== bleedY || Math.min(2, window.devicePixelRatio || 1) !== dpr) measure()
      if (live.current.color !== ownColor) readColor()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (!stops.length) return
      const shape = body()
      drawField(shape, ring)
      inkLabels(shape)
    }

    /* Where the hover or press magnet wants the leading end, in px. */
    const leanGoal = () => {
      const L = live.current
      const { hover, press } = pointer.current
      const at = press >= 0 ? press : hover
      const from = slots[L.targetIndex]
      const to = slots[at]
      if (!from || !to || at === L.targetIndex) return 0
      return Math.sign(to.c - from.c) * L.reach * (press >= 0 ? 2 : 1)
    }

    const inkGoal = (i) => {
      const { hover, press } = pointer.current
      return (hover === i || press === i) && i !== live.current.targetIndex ? 1 : 0
    }

    // Jump every part of the state to where it is heading. Used on mount, on
    // resize at rest, under reduced motion, and to land a settle exactly.
    // Only the lean is motion; the inks and the ring still answer when still.
    const place = () => {
      head.x = goalOf()
      head.v = 0
      tail.x = head.x
      tail.v = 0
      lean.x = still ? 0 : leanGoal()
      lean.v = 0
      ring = live.current.fluidRing ? 1 : 0
      for (let i = 0; i < ink.length; i++) ink[i] = inkGoal(i)
    }

    /* The neck can stretch to NECK_STRAIN of the gap at which the full-speed
       blend would let go; past that it drags the tail along at the leader's
       speed rather than snapping. */
    const holdNeck = (L) => {
      if (!stops.length) return
      const drawn = Math.abs(head.x - tail.x)
      const a = lobeAt(tail.x, L.padding, drawn)
      const b = lobeAt(head.x, L.padding, drawn)
      const over = gapOf(a, b) - (2 * Math.min(a.r, b.r) + NECK_STRAIN * (L.blend + L.stretch) * 0.5)
      if (over <= 0) return
      const dir = Math.sign(head.x - tail.x)
      tail.x += dir * over
      if (dir * tail.v < dir * head.v) tail.v = head.v
    }

    const step = (dt) => {
      const L = live.current
      const goal = goalOf()

      /* The travel spring, sub-stepped finely enough for any stiffness to stay
         stable, and so a 120 Hz display integrates the same curve as a 60 Hz
         one. The tail's follow is exact per slice. */
      const n = clamp(Math.ceil(dt * Math.max(1 / SUBSTEP, 2 * Math.sqrt(L.stiffness), L.damping)), 1, 400)
      const h = dt / n
      for (let i = 0; i < n; i++) {
        head.v += (L.stiffness * (goal - head.x) - L.damping * head.v) * h
        head.x += head.v * h
        critical(tail, head.x, TAIL_OMEGA, h)
        holdNeck(L)
      }

      const lg = leanGoal()
      critical(lean, lg, Math.abs(lg) > Math.abs(lean.x) ? ENGAGE : RELEASE, dt)

      const rg = L.fluidRing ? 1 : 0
      ring += (rg - ring) * (1 - Math.exp(-dt / RING_TAU))

      let inkBusy = false
      for (let i = 0; i < ink.length; i++) {
        // A label just chosen holds its lift until the liquid covers it more.
        const g = i === L.targetIndex && ink[i] * HOVER_INK > cover[i] ? ink[i] : inkGoal(i)
        ink[i] += (g - ink[i]) * (1 - Math.exp(-dt / (g > ink[i] ? INK_IN : INK_OUT)))
        if (Math.abs(g - ink[i]) > 0.004) inkBusy = true
      }

      return (
        Math.abs(head.v) > 2 ||
        Math.abs(goal - head.x) > 0.2 ||
        Math.abs(tail.v) > 2 ||
        Math.abs(head.x - tail.x) > 0.2 ||
        Math.abs(lg - lean.x) > 0.05 ||
        Math.abs(lean.v) > 1 ||
        Math.abs(rg - ring) > 0.004 ||
        inkBusy
      )
    }

    const frame = (now) => {
      raf = 0
      // The first frame after a kick steps only the time since the kick.
      const dt = clamp((now - last) / 1000, 1 / 240, MAX_DT)
      last = now
      if (step(dt)) raf = requestAnimationFrame(frame)
      else place()          // land exactly: no creep in the last fraction of a pixel
      paint()
    }

    // Anything that changes where the liquid is heading starts the loop; it
    // stops itself once everything has arrived.
    const kick = () => {
      if (still) {
        place()
        paint()
        return
      }
      if (!raf) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }

    const onResize = () => {
      measure()
      if (!raf || still) place()
      paint()
    }

    const ro = new ResizeObserver(onResize)
    const observe = () => {
      ro.disconnect()
      ro.observe(root)
      Array.from(bar.children).forEach((el) => ro.observe(el))
    }

    const onMotion = () => {
      still = motion.matches
      if (still && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
      place()
      paint()
    }

    measure()
    place()
    paint()
    observe()
    motion.addEventListener?.('change', onMotion)

    let dead = false
    document.fonts?.ready?.then(() => {
      if (!dead) onResize()
    })

    api.current = {
      kick,
      remeasure: () => {
        observe()
        onResize()
      },
    }

    return () => {
      dead = true
      api.current = null
      ro.disconnect()
      motion.removeEventListener?.('change', onMotion)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // A new set of items needs measuring, and observing, before anything else.
  useEffect(() => {
    api.current?.remeasure()
  }, [itemsKey])

  // Anything the loop draws from has changed: let it run until it settles.
  useEffect(() => {
    api.current?.kick()
  }, [targetIndex, fluidRing, blend, stretch, padding, reach, color])

  const pick = (item, i) => {
    if (!controlled) setOwnId(item.id)
    onSelect?.(item.id, item, i)
  }

  const setPointer = (next) => {
    const p = pointer.current
    if (next.hover === p.hover && next.press === p.press) return
    pointer.current = next
    api.current?.kick()
  }

  return (
    <div
      ref={rootRef}
      className={`ferrofluid-nav ${className}`.trim()}
      style={style}
      {...rest}
    >
      <canvas ref={canvasRef} className="ferrofluid-nav__fluid" aria-hidden="true" />
      <div ref={listRef} className="ferrofluid-nav__list" role="tablist" aria-orientation="horizontal">
        {list.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={i === found}
            tabIndex={i === targetIndex ? 0 : -1}
            data-active={i === targetIndex ? 'true' : 'false'}
            data-ring={fluidRing && i === ringAt ? 'fluid' : undefined}
            className="ferrofluid-nav__item"
            onClick={() => pick(item, i)}
            onFocus={(e) => setRingAt(focusVisible(e.currentTarget) ? i : -1)}
            onBlur={() => setRingAt(-1)}
            onPointerEnter={(e) => {
              if (e.pointerType !== 'touch') setPointer({ ...pointer.current, hover: i })
            }}
            onPointerLeave={() => {
              const p = pointer.current
              setPointer({ hover: p.hover === i ? -1 : p.hover, press: p.press === i ? -1 : p.press })
            }}
            onPointerDown={(e) => {
              if (e.button === 0) setPointer({ ...pointer.current, press: i })
            }}
            onPointerUp={() => setPointer({ ...pointer.current, press: -1 })}
            onPointerCancel={() => setPointer({ hover: -1, press: -1 })}
            onKeyDown={(e) => {
              const n = list.length
              const back = getComputedStyle(e.currentTarget).direction === 'rtl' ? 1 : -1
              let to = -1
              if (e.key === 'ArrowRight') to = (i - back + n) % n
              else if (e.key === 'ArrowLeft') to = (i + back + n) % n
              else if (e.key === 'Home') to = 0
              else if (e.key === 'End') to = n - 1
              if (to < 0) return
              e.preventDefault()
              pick(list[to], to)
              e.currentTarget.parentElement?.children[to]?.focus()
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
