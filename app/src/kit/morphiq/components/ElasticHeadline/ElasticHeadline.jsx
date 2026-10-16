'use client'

import { useEffect, useMemo, useRef } from 'react'
import './ElasticHeadline.css'

/* =========================================================
   ElasticHeadline
   A headline strung on an elastic. Grab a letter and drag —
   the whole line deforms behind your hand, and letting go
   lets it ring out through its own modes before settling.

   The letters are nodes on a one-dimensional mass-spring
   chain, pinned one letter-pitch beyond each end, so every
   glyph you can see is one you can pull. A headline that
   wraps is several strings, one per row, each pinned past
   its own ends: a chain run through the line break would
   have a pull at the end of one row tug the far start of the
   next. Each node feels:

     · its neighbours          k(yᵢ₋₁ − 2yᵢ + yᵢ₊₁)
     · the elastic's friction  η(ẏᵢ₋₁ − 2ẏᵢ + ẏᵢ₊₁)
     · a pull back to its slot  −kₐ·yᵢ
     · air                      −c·ẏᵢ

   The first term is the discrete Laplacian, which is what
   makes this a wave rather than a row of independent springs.
   Displace one node and the disturbance travels outward to
   its neighbours and reflects off the pinned ends — that
   travelling-and-reflecting is the whole reason it reads as
   one object rather than as letters that each happen to
   wobble. A row of independent springs gives you a Mexican
   wave; a coupled chain gives you a guitar string.

   The second term is why it reads as rubber and not wire.
   Air damps every mode at the same rate, so with air alone
   the short, fast ripples a release throws off chatter for as
   long as the slow sway of the whole line does, and the rest
   looks like fizz. Friction inside the elastic acts on how
   fast neighbours move apart, so it barely touches the sway
   and kills the ripples — the way a real band goes quiet.

   The hand. Grabbing takes hold of the nearest letter where
   it is, mid-swing or not — never the space between words,
   which has nothing to lift in answer to the press — and it
   then moves by the pointer's travel rather than jumping to
   the pointer; a grab that teleports the letter reads as a
   glitch. That travel is measured in the headline's own
   pixels, so inside a scaled container the letter still stays
   under the hand. The glyph in the hand lifts a little toward
   it, quickly on the press and more slowly on the release —
   the only motion here that is not the chain's. And the hand
   is trusted only while it is really there: a cancelled
   gesture, a window that loses focus, or a mouse whose button
   turns out to be up all let go, so a letter is never left
   stuck to a cursor that has stopped holding it.

   The chain is linear, which is only true of a string at
   small slopes — pulled further, a real elastic stiffens as
   it stretches — so the hand's travel goes through
   y = s·asinh(u/s): one-to-one for small pulls,
   only logarithmic past `stretch`, with no wall to hit. On
   release the letter keeps the pointer's velocity, fitted
   over its last 70 ms rather than taken from one event, so a
   flick throws the line and a still hand simply lets go.

   The glyphs are solid. Each one stands on the line and
   leans with the slope under it, pivoting on its baseline, so
   where the line folds into a valley — the hand's V, a
   ripple's trough — neighbouring tops lean toward each other.
   Left alone they pass straight through one another, which
   reads as a rendering bug, not as crowding. So every pair of
   neighbours is a contact: their ink extents come from the
   font, and when the facing edges would close by more than
   the gap they had at rest, both leans are relaxed, weighted
   by lever arm, until they only just touch. Peaks, where the
   tops fan apart, are never touched. This shapes only how a
   glyph is drawn; the chain beneath it is left alone.

   Reduced motion keeps the line pullable but takes away its
   inertia. A held letter bends the line into the chain's
   static shape — the same forces with the mass removed, so
   yᵢ falls off as sinh toward the pins and nothing travels or
   rings — and letting go leaves it flat at once. Everything
   that moves, moves only because the hand did.

   Nothing is reset under the reader. New text takes up the
   swing the old text was in, letter for letter, and a resize
   that re-wraps the line re-pins its rows around the motion
   rather than stopping it.

   Integration is semi-implicit Euler, each frame's real
   elapsed time cut into equal substeps no longer than 1/120 s
   — and no longer than 1/ω of the fastest mode the props
   allow, so a stiff, light chain stays stable instead of
   exploding. Both friction terms are solved implicitly for
   the same reason. Explicit Euler on a stiff chain gains
   energy every step, and stepping by the raw frame time would
   make the same drag ring differently at 60 and 120 Hz.
   ========================================================= */

const MAX_STEP = 1 / 120   // longest substep the chain is ever advanced by, s
const MAX_SUBSTEPS = 64    // per frame; only degenerate props ever get near it
const MAX_DT = 1 / 30      // a tab coming back from the background resumes, not lurches
const FLICK = 70           // ms of pointer history the release velocity is fitted over
const LEAN = 0.4           // em of run a glyph's tilt is measured against
const PRESS = 0.06         // how far a held glyph lifts toward the hand, as scale
const PRESS_IN = 0.035     // s, time constant of that lift when a letter is taken
const PRESS_OUT = 0.08     // s, and of its fall when it is let go
const REST = 0.15          // px; below this the line is flat, so it is made flat
const CONTACT_PASSES = 48  // most sweeps of the contact solve per frame, alternating direction

const fin = (x, d) => (Number.isFinite(x) ? x : d)

/* The hand's soft limit: one-to-one near rest, logarithmic past s. */
const soft = (u, s) => (s === Infinity ? u : s * Math.asinh(u / s))
const unsoft = (y, s) => (s === Infinity ? y : s * Math.sinh(Math.max(-30, Math.min(30, y / s))))
const softSlope = (u, s) => (s === Infinity ? 1 : 1 / Math.hypot(1, u / s))

export default function ElasticHeadline({
  text = 'Interfaces that move',

  /* --- the string --- */
  stiffness = 900,      // neighbour coupling
  anchor = 120,         // pull back to the resting slot
  damping = 5.2,        // air: damps every mode alike
  viscosity = 3,        // the elastic's own friction: damps ripples, spares the sway
  mass = 1,

  /* --- what a drag does --- */
  grab = 1,             // how much of the pointer's travel a held letter takes
  stretch = 1.2,        // em a held letter follows one-to-one before the elastic resists
  reach = 2,            // how far a nudge spreads on hover, in letters
  nudge = 0,            // vertical push from hovering, px (0 = drag only)
  lift = 0.35,          // how much vertical displacement tilts a glyph

  className = '',
  style,
  ...rest
}) {
  const rootRef = useRef(null)

  // Runs of letters, each an array of glyphs, and single whitespace characters
  // between them. Every glyph and every space is one node of the chain.
  // Anything that is not a string is read as one, so a null or a number
  // handed in by mistake draws what it can instead of throwing.
  const label = typeof text === 'string' ? text : text == null ? '' : String(text)
  const words = useMemo(() => {
    const out = []
    let word = null
    for (const ch of Array.from(label)) {
      if (/\s/.test(ch)) { word = null; out.push(' ') }
      else if (word) word.push(ch)
      else { word = [ch]; out.push(word) }
    }
    return out
  }, [label])

  // The swing in progress when the text changes, so the new letters take it up
  // rather than the line snapping flat under the reader.
  const carry = useRef(null)

  const live = useRef({})
  // Synced after every render and before the effect below, so the loop reads
  // current props without being torn down and restarted.
  useEffect(() => {
    live.current = {
      stiffness, anchor, damping, viscosity, mass, grab, stretch, reach, nudge, lift,
    }
  })

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const cells = Array.from(root.querySelectorAll('.elastic-headline__char'))
    const n = cells.length
    if (!n) return
    // Spaces are nodes too — the elastic runs through the gap — but they have
    // no glyph to draw, lift or take hold of.
    const solid = cells.map((el) => !el.classList.contains('is-space'))

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    let still = mq.matches

    // Vertical displacement and velocity, one per letter, down is positive.
    const y = new Float64Array(n)
    const v = new Float64Array(n)
    const vNext = new Float64Array(n)   // Jacobi: every node sees the same old state
    const press = new Float64Array(n)   // 0..1, how far each glyph is lifted
    const lean = new Float64Array(n)    // rad, each glyph's tilt as drawn
    const drawn = new Array(n).fill('')

    // A text change mid-swing hands the new letters the old ones' motion.
    let carried = false
    const was = carry.current
    if (was) {
      for (let i = 0; i < Math.min(n, was.y.length); i++) {
        y[i] = was.y[i]
        v[i] = was.v[i]
        if (y[i] || v[i]) carried = true
      }
    }

    // Resting layout, in the root's own box and free of the transforms below.
    const cx = new Float64Array(n)
    const cy = new Float64Array(n)
    // Each wrapped row is its own string, pinned one pitch past its own ends:
    // link[i] says node i is tied to node i − 1 rather than to a pin.
    const link = new Uint8Array(n)
    let longest = n           // nodes on the longest row
    let em = 16
    let pitch = 16            // mean letter advance, px
    let rowH = 16

    // Ink, for the contacts: how far each glyph's ink reaches above (up) and
    // above-or-below (dn) its pivot, and out past the pivot on each side; and
    // for each pair of neighbouring inked glyphs on a row, the gap at rest.
    const up = new Float64Array(n)
    const dn = new Float64Array(n)
    const outL = new Float64Array(n)
    const outR = new Float64Array(n)
    let pairA = []
    let pairB = []
    let pairGap = []
    let pen = null
    try { pen = document.createElement('canvas').getContext('2d') } catch { /* no canvas: no contacts */ }

    let held = -1             // index of the letter under a held pointer
    let pid = null            // and which pointer holds it
    let zoom = 1              // screen px per layout px, if an ancestor is scaled
    let py0 = 0               // pointer y when it took hold, layout px
    let py = 0                // pointer y now, layout px
    let u0 = 0                // the letter's unsoftened displacement at the grab
    let give = Infinity       // stretch in px for this hold
    let target = 0            // where the hand put the held letter last frame
    let trail = []            // [timeStamp, clientY] of the recent drag
    let hoverX = null

    let raf = 0
    let last = 0
    let lastDt = 1 / 60       // the display's frame time, as last seen
    let onScreen = true

    const measure = () => {
      const cs = getComputedStyle(root)
      em = parseFloat(cs.fontSize) || 16
      // offset* ignores transforms. The root is position: relative so they are
      // measured from it; if a consumer overrides that, subtract its own offset.
      const own = cells[0].offsetParent === root
      const ox = own ? 0 : root.offsetLeft
      const oy = own ? 0 : root.offsetTop
      let w = 0
      let hSum = 0
      for (let i = 0; i < n; i++) {
        const el = cells[i]
        cx[i] = el.offsetLeft - ox + el.offsetWidth / 2
        cy[i] = el.offsetTop - oy + el.offsetHeight / 2
        w += el.offsetWidth
        hSum += el.offsetHeight
      }
      pitch = Math.max(1, w / n)
      rowH = Math.max(1, hSum / n)

      // A node more than half a row below the one before it starts a new row.
      longest = 0
      for (let i = 0, run = 0; i < n; i++) {
        link[i] = i > 0 && Math.abs(cy[i] - cy[i - 1]) < rowH / 2 ? 1 : 0
        run = link[i] ? run + 1 : 1
        if (run > longest) longest = run
      }

      pairA = []
      pairB = []
      pairGap = []
      const c0 = cells[solid.indexOf(true)]
      if (!pen || !c0) return
      // The pivot is the CSS transform-origin, read back rather than assumed,
      // and the baseline sits half the leading below the top of each cell.
      const [oX, oY] = getComputedStyle(c0).transformOrigin.split(' ').map(parseFloat)
      const fx = c0.offsetWidth ? fin(oX, c0.offsetWidth / 2) / c0.offsetWidth : 0.5
      const fy = c0.offsetHeight ? fin(oY, c0.offsetHeight * 0.9) / c0.offsetHeight : 0.9
      pen.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
      const probe = pen.measureText('x')
      const fa = fin(probe.fontBoundingBoxAscent, 0.8 * em)
      const fd = fin(probe.fontBoundingBoxDescent, 0.2 * em)
      let prev = -1
      let prevRight = 0
      for (let i = 0; i < n; i++) {
        if (!link[i]) prev = -1                             // a new row: nothing to its left
        up[i] = dn[i] = 0
        if (!solid[i]) continue
        const el = cells[i]
        const h = el.offsetHeight
        const left = el.offsetLeft - ox
        const pivotX = left + fx * el.offsetWidth
        const below = fy * h - ((h - fa - fd) / 2 + fa)   // pivot below the baseline, px
        const m = pen.measureText(el.textContent)
        const inkL = left - fin(m.actualBoundingBoxLeft, 0)
        const inkR = left + fin(m.actualBoundingBoxRight, 0)
        if (!(inkR > inkL)) continue                        // no ink to touch
        up[i] = below + fin(m.actualBoundingBoxAscent, 0.7 * em)
        dn[i] = below - fin(m.actualBoundingBoxDescent, 0)
        outL[i] = Math.max(0, pivotX - inkL)
        outR[i] = Math.max(0, inkR - pivotX)
        if (prev >= 0) {
          pairA.push(prev)
          pairB.push(i)
          pairGap.push(inkL - prevRight)
        }
        prev = i
        prevRight = inkR
      }
    }

    /* The pointer in the headline's own layout px. The letters are laid out
       and moved in those; the pointer arrives in screen px, and the two part
       ways when an ancestor is scaled — a zoomed preview, a card that grows on
       hover. The root's drawn width over its laid-out width is that scale, and
       dividing the hand's travel by it keeps the letter under the hand rather
       than lagging it or running ahead. offsetWidth is whole pixels, so a
       ratio within a couple of percent of 1 is read as 1. */
    const local = (e) => {
      const b = root.getBoundingClientRect()
      const z = root.offsetWidth ? b.width / root.offsetWidth : 1
      zoom = Number.isFinite(z) && z > 0.01 && Math.abs(z - 1) > 0.02 ? z : 1
      return [(e.clientX - b.left) / zoom - root.clientLeft, (e.clientY - b.top) / zoom - root.clientTop]
    }

    // The letter drawn nearest the pointer — where it is now, not its slot, so
    // a grab mid-swing takes the glyph under the finger. Never a space: a grab
    // between words takes the nearer letter, so there is always a glyph to lift
    // in answer to the press.
    const anySolid = solid.includes(true)
    const pick = (x, yy) => {
      let best = 0
      let bd = Infinity
      for (let i = 0; i < n; i++) {
        if (anySolid && !solid[i]) continue
        const dx = cx[i] - x
        const dy = cy[i] + y[i] - yy
        const d = dx * dx + dy * dy
        if (d < bd) { bd = d; best = i }
      }
      return best
    }

    /* Neighbours as contacts. Heights are measured down from the resting
       pivot line, so a glyph's pivot sits at y[i]; a point ℓ above it moves
       sideways by ℓ·sin(lean) when the glyph tilts. Over the band of height
       both glyphs have ink in, the facing edges close by a linear function
       of height, so the worse end of the band is where they meet. Past the
       room they had at rest, the excess is taken off both leans in
       proportion to their lever arms — the least tilt that makes them just
       touch — and alternating sweeps, until nothing overlaps by more than a
       twentieth of a pixel, let a crowded valley settle. The held glyph is
       in the hand and does not yield, so its neighbours do. */
    const contact = () => {
      const count = pairA.length
      for (let pass = 0, worst = Infinity; pass < CONTACT_PASSES && worst > 0.05; pass++) {
        worst = 0
        for (let q = 0; q < count; q++) {
          const p = pass & 1 ? count - 1 - q : q
          const a = pairA[p]
          const b = pairB[p]
          // The grip is as firm as the lift, so a letter let go rejoins the
          // crowd over the same quarter-second its lift falls away.
          const wa = 1 - press[a]
          const wb = 1 - press[b]
          const sa = 1 + PRESS * press[a]
          const sb = 1 + PRESS * press[b]
          const top = Math.max(y[a] - up[a] * sa, y[b] - up[b] * sb)
          const bot = Math.min(y[a] - dn[a] * sa, y[b] - dn[b] * sb)
          if (!(top < bot)) continue          // one has swung clear of the other
          const sinA = Math.sin(lean[a])
          const sinB = Math.sin(lean[b])
          let la = y[a] - top
          let lb = y[b] - top
          let close = la * sinA - lb * sinB
          const closeBot = (y[a] - bot) * sinA - (y[b] - bot) * sinB
          if (closeBot > close) { la = y[a] - bot; lb = y[b] - bot; close = closeBot }
          // A lifted glyph is a little wider, so it has a little less room.
          const room = Math.max(0, pairGap[p] - PRESS * (press[a] * outR[a] + press[b] * outL[b]))
          const over = close - room
          if (over <= 0) continue
          if (over > worst) worst = over
          const d = over / (wa * la * la + wb * lb * lb || 1)
          lean[a] -= wa * d * la
          lean[b] += wb * d * lb
        }
      }
    }

    const paint = () => {
      const lk = fin(live.current.lift, 0.35)
      const run = LEAN * em
      // Tilt from the local slope, so a letter leans into the curve it sits on.
      // Measured in em, so a small and a large headline lean alike.
      for (let i = 0; i < n; i++) {
        const l = link[i] ? y[i - 1] : 0
        const r = i < n - 1 && link[i + 1] ? y[i + 1] : 0
        lean[i] = Math.atan2((r - l) * lk, run)
      }
      contact()
      for (let i = 0; i < n; i++) {
        if (!solid[i]) continue                  // an inline space takes no transform
        const s = press[i]
        let t = ''
        if (y[i] || lean[i] || s) {
          t = `translateY(${y[i].toFixed(2)}px) rotate(${lean[i].toFixed(4)}rad)`
          if (s) t += ` scale(${(1 + PRESS * s).toFixed(4)})`
        }
        if (t !== drawn[i]) { cells[i].style.transform = t; drawn[i] = t }
      }
    }

    /* The chain's static shape with node h held at Y: every other node on its
       row obeys k(yᵢ₋₁ − 2yᵢ + yᵢ₊₁) = kₐ·yᵢ, whose solutions are sinh(μ·j)
       with cosh μ = 1 + kₐ/2k, j counted from the pin one pitch past each end
       of the row. The other rows are other strings, and lie flat. */
    const bend = (h, Y, k, ka) => {
      const mu = k > 0 ? Math.acosh(1 + ka / (2 * k)) : Infinity
      // sinh(μa)/sinh(μb) for 0 < a ≤ b, in a form a long line cannot overflow.
      const fall = (a, b) => {
        if (a === b) return 1
        if (mu === Infinity) return 0
        if (mu < 1e-9) return a / b                 // no anchor: straight lines
        return Math.exp(mu * (a - b)) * (Math.expm1(-2 * mu * a) / Math.expm1(-2 * mu * b))
      }
      let a = h
      while (link[a]) a--
      let b = h
      while (b < n - 1 && link[b + 1]) b++
      y.fill(0)
      for (let i = a; i <= b; i++) {
        y[i] = i < h ? Y * fall(i - a + 1, h - a + 1) : i > h ? Y * fall(b - i + 1, b - h + 1) : Y
      }
    }

    const step = (h, k, ka, c, eta, m) => {
      for (let i = 0; i < n; i++) {
        if (i === held) { vNext[i] = v[i]; continue }
        const tl = link[i]
        const tr = i < n - 1 && link[i + 1]
        const l = tl ? y[i - 1] : 0
        const r = tr ? y[i + 1] : 0
        const vl = tl ? v[i - 1] : 0
        const vr = tr ? v[i + 1] : 0
        // Discrete Laplacian — this is the term that makes it a wave. The
        // friction's own-velocity part and the air go on the implicit side.
        const f = k * (l - 2 * y[i] + r) - ka * y[i] + eta * (vl + vr)
        vNext[i] = (v[i] + (h * f) / m) / (1 + (h * (c + 2 * eta)) / m)
      }
      for (let i = 0; i < n; i++) {
        if (i === held) continue
        v[i] = vNext[i]
        y[i] += v[i] * h
      }
    }

    const frame = (now) => {
      raf = 0
      const p = live.current
      const m = Math.max(0.05, fin(p.mass, 1))
      let k = Math.max(0, fin(p.stiffness, 900))
      let ka = Math.max(0, fin(p.anchor, 120))
      const c = Math.max(0, fin(p.damping, 5.2))
      const eta = Math.max(0, fin(p.viscosity, 3))

      if (still) {
        // No inertia: the line takes its static shape around the hand, or lies
        // flat without it, and nothing is left running.
        if (held >= 0) {
          target = soft(u0 + fin(p.grab, 1) * (py - py0), give)
          bend(held, target, k, ka)
        } else y.fill(0)
        v.fill(0)
        for (let i = 0; i < n; i++) press[i] = i === held ? 1 : 0
        paint()
        last = 0
        return
      }

      // Real elapsed time; the first frame after a rest borrows the last one's,
      // and so does a frame whose clock has not advanced, which has no speed.
      const dt = last && now > last ? Math.min(MAX_DT, (now - last) / 1000) : lastDt
      if (last && dt < MAX_DT) lastDt = dt
      last = now

      // Equal slices of real time, none longer than the fastest mode can take.
      const wMax = Math.sqrt((4 * k + ka) / m)
      const steps = Math.min(MAX_SUBSTEPS, Math.max(1, Math.ceil(dt / Math.min(MAX_STEP, 1 / (wMax || 1)))))
      const h = dt / steps
      // Only a degenerate chain lands here: soften it to what the step can hold.
      if (wMax * h > 1.5) {
        const s = (1.5 / (wMax * h)) ** 2
        k *= s
        ka *= s
      }

      // The held letter is kinematic: it goes where the hand goes, and the
      // chain has to deal with it. Spreading the frame's hand motion across the
      // substeps keeps its neighbours from being kicked once per frame.
      const from = target
      if (held >= 0) target = soft(u0 + fin(p.grab, 1) * (py - py0), give)
      const to = held >= 0 ? target : from

      for (let s = 0; s < steps; s++) {
        if (held >= 0) {
          y[held] = from + ((to - from) * (s + 1)) / steps
          v[held] = (to - from) / dt
        }
        step(h, k, ka, c, eta, m)
      }

      // The lift eases on real time: quick to answer a grab, slower to let go.
      const kIn = 1 - Math.exp(-dt / PRESS_IN)
      const kOut = 1 - Math.exp(-dt / PRESS_OUT)
      let lifting = false
      for (let i = 0; i < n; i++) {
        const goal = i === held ? 1 : 0
        press[i] += (goal - press[i]) * (goal ? kIn : kOut)
        if (Math.abs(goal - press[i]) < 0.002) press[i] = goal
        else lifting = true
      }

      let sum = 0
      for (let i = 0; i < n; i++) sum += y[i] + v[i]
      if (!Number.isFinite(sum)) { y.fill(0); v.fill(0) }

      paint()

      /* Settled when no letter could still move by a visible fraction of a pixel:
         each node's amplitude, bounded using the slowest mode, is under REST. A
         held line only has to stop moving, since the hand is keeping it bent —
         and so does one with no stiffness and no anchor, which has nothing to
         bring it back and is left where it stopped rather than pulled flat. */
      const w1 = Math.max(1, Math.sqrt((ka + 4 * k * Math.sin(Math.PI / (2 * (longest + 1))) ** 2) / m))
      const parked = held >= 0 || !(k + ka > 0)
      let quiet = !lifting && to === from
      for (let i = 0; quiet && i < n; i++) {
        if (i === held) continue
        const a = v[i] / w1
        if (parked ? Math.abs(a) > 0.02 : y[i] * y[i] + a * a > REST * REST) quiet = false
      }
      if (quiet) {
        if (!parked) {
          y.fill(0)
          v.fill(0)
          paint()
        }
        last = 0
        return
      }
      raf = requestAnimationFrame(frame)
    }

    const kick = () => {
      if (raf || !onScreen) return
      last = 0
      raf = requestAnimationFrame(frame)
    }

    /* Release velocity: a least-squares fit of the pointer's y over the last
       FLICK ms. One event's delta is noise; a hand that stopped before letting
       go has no samples in the window and throws nothing. */
    const flick = (tEnd) => {
      let i = trail.length
      while (i > 0 && trail[i - 1][0] >= tEnd - FLICK) i--
      const pts = trail.slice(i)
      if (pts.length < 2 || pts[pts.length - 1][0] - pts[0][0] < 8) return 0
      let mt = 0
      let my = 0
      for (const [t, yy] of pts) { mt += t; my += yy }
      mt /= pts.length
      my /= pts.length
      let num = 0
      let den = 0
      for (const [t, yy] of pts) { num += (t - mt) * (yy - my); den += (t - mt) ** 2 }
      return den ? (num / den) * 1000 : 0
    }

    const letGo = (tEnd, fling) => {
      if (held < 0) return
      const i = held
      let vel = 0
      if (fling) {
        const g = fin(live.current.grab, 1)
        vel = flick(tEnd) * g * softSlope(u0 + g * (py - py0), give)
        const cap = 80 * em
        vel = Math.max(-cap, Math.min(cap, vel))
      }
      held = -1
      // It keeps the place the hand left it and the hand's speed.
      v[i] = vel
      target = y[i]
      trail = []
      try { if (root.hasPointerCapture?.(pid)) root.releasePointerCapture(pid) } catch { /* already gone */ }
      pid = null
      root.classList.remove('is-held')
      kick()
    }

    const onDown = (e) => {
      if (held >= 0 || e.button !== 0) return
      measure()
      const [x, yy] = local(e)
      held = pick(x, yy)
      pid = e.pointerId
      py0 = py = e.clientY / zoom
      const s = live.current.stretch
      give = s === Infinity ? Infinity : Math.max(0.01, fin(s, 1.2)) * em
      // Take hold of the letter where it is: the pointer's travel is added to
      // the displacement it already had, so nothing jumps.
      u0 = unsoft(y[held], give)
      target = y[held]
      trail = [[e.timeStamp, py]]
      try { root.setPointerCapture(e.pointerId) } catch { /* synthetic pointer */ }
      root.classList.add('is-held')
      kick()
    }

    const onMove = (e) => {
      if (held >= 0) {
        if (e.pointerId !== pid) return
        // A mouse with its button up is holding nothing, whatever we were last
        // told: a release that landed in another window must not leave the
        // letter stuck to the cursor.
        if (e.pointerType === 'mouse' && !(e.buttons & 1)) { letGo(e.timeStamp, false); return }
        const evs = e.getCoalescedEvents?.()
        if (evs?.length) for (const ev of evs) trail.push([ev.timeStamp, ev.clientY / zoom])
        else trail.push([e.timeStamp, e.clientY / zoom])
        while (trail.length > 2 && trail[0][0] < e.timeStamp - 4 * FLICK) trail.shift()
        py = e.clientY / zoom
        kick()
        return
      }

      // Hovering only does anything if `nudge` is on, only for a pointer that
      // can hover, and never under reduced motion, where a pluck nobody held
      // would ring on its own. The push is paid per letter crossed, not per
      // event, so a 1000 Hz mouse and a 60 Hz trackpad pluck the line alike,
      // and it is scaled by the chain's own frequency so a brisk pass lifts
      // about `nudge` px.
      const { nudge: nu0, reach: r0, stiffness: k0, anchor: a0, mass: m0 } = live.current
      const nu = Math.max(0, fin(nu0, 0))
      if (!nu || still || e.pointerType === 'touch') { hoverX = null; return }
      const [x, yy] = local(e)
      const dx = hoverX === null ? 0 : Math.abs(x - hoverX)
      hoverX = x
      if (!dx) return
      const rr = Math.max(0, fin(r0, 2))
      const span = (rr + 1) * pitch
      const w = Math.sqrt(
        (Math.max(0, fin(a0, 120)) + Math.max(0, fin(k0, 900))) / Math.max(0.05, fin(m0, 1)),
      )
      const push = (nu * w * (dx / pitch)) / (rr + 1)
      for (let i = 0; i < n; i++) {
        if (i === held || Math.abs(cy[i] - yy) > rowH) continue
        const f = 1 - Math.abs(cx[i] - x) / span
        if (f > 0) v[i] += push * f
      }
      kick()
    }

    const onLeave = () => { hoverX = null }
    const onUp = (e) => {
      if (e.pointerId !== pid) return
      trail.push([e.timeStamp, e.clientY / zoom])
      letGo(e.timeStamp, true)
    }
    // A cancel's coordinates are often junk, and the browser took the gesture
    // back; the line just lets go where it is. So does a window that loses
    // focus mid-drag, since it may never hear the button come up.
    const onCancel = (e) => { if (e.pointerId === pid) letGo(e.timeStamp, false) }
    const onLost = (e) => { if (e.pointerId === pid) letGo(e.timeStamp, true) }
    const onBlur = () => letGo(0, false)

    // Switching either way mid-gesture keeps the hold: the next frame simply
    // draws the line the new way, starting from where it is.
    const onMotionPref = () => {
      still = mq.matches
      if (still) v.fill(0)
      kick()
    }

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen) kick()
      else if (raf) { cancelAnimationFrame(raf); raf = 0 }
    })
    io.observe(root)

    const ro = new ResizeObserver(() => { measure(); paint() })
    ro.observe(root)

    measure()
    // Taking over a swing: draw it now, in this commit, so the new glyphs never
    // show a flat frame, and let the loop carry it on.
    if (carried) { paint(); kick() }

    root.addEventListener('pointerdown', onDown)
    root.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerleave', onLeave)
    root.addEventListener('lostpointercapture', onLost)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onCancel)
    window.addEventListener('blur', onBlur)
    mq.addEventListener?.('change', onMotionPref)

    let dead = false
    document.fonts?.ready?.then(() => { if (!dead) { measure(); paint() } })

    return () => {
      dead = true
      io.disconnect()
      ro.disconnect()
      root.removeEventListener('pointerdown', onDown)
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
      root.removeEventListener('lostpointercapture', onLost)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onCancel)
      window.removeEventListener('blur', onBlur)
      mq.removeEventListener?.('change', onMotionPref)
      if (raf) cancelAnimationFrame(raf)
      if (held >= 0) {
        try { if (root.hasPointerCapture?.(pid)) root.releasePointerCapture(pid) } catch { /* gone */ }
        root.classList.remove('is-held')
      }
      // React keeps these spans when the text changes, so a line torn down
      // mid-swing must not leave its last pose on the glyphs that replace it;
      // the motion itself is handed on to whichever line comes next.
      for (const el of cells) el.style.transform = ''
      carry.current = still ? null : { y: Array.from(y), v: Array.from(v) }
    }
  }, [words])

  return (
    <span
      ref={rootRef}
      className={`elastic-headline ${className}`.trim()}
      style={style}
      /* Every glyph is hidden below, so this is the only accessible name —
         and a bare span's generic role cannot carry one. */
      role="img"
      aria-label={label}
      {...rest}
    >
      {/* Letters are grouped into unbreakable words, and a space is a real,
          breakable space: a line of inline-blocks alone would wrap mid-word
          and start its next row with an indent. */}
      {words.map((w, i) =>
        typeof w === 'string' ? (
          <span key={i} className="elastic-headline__char is-space" aria-hidden="true">{w}</span>
        ) : (
          <span key={i} className="elastic-headline__word" aria-hidden="true">
            {w.map((ch, j) => (
              <span key={j} className="elastic-headline__char">{ch}</span>
            ))}
          </span>
        ),
      )}
    </span>
  )
}
