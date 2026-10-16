'use client'

import { useEffect, useRef } from 'react'
import './SmearCursor.css'

/* =========================================================
   SmearCursor
   A cursor trail that is motion blur rather than a string of
   dots: thin and stretched when the pointer is fast, round
   and compact when it is slow.

   A camera's blur is an exposure integral — the sensor
   collects the subject's whole path across the shutter
   interval, so a fast subject smears over a long thin region
   and a slow one stacks up in a small bright one. The area
   is roughly conserved, which is why fast motion looks faint
   and stretched rather than long and solid.

   So the trail is a disc swept along the pointer's recent
   path, with its radius

     r ∝ 1 / (1 + speed·k)

   The sweep is drawn as what it is: a disc at every sample
   and, between neighbours, the hull of the two discs — the
   quad on their outer tangents. All of it is wound the same
   way and filled once, so the nonzero rule paints the union
   with no seams. That gives round joins and corners that
   keep their thickness; the naive version, a polyline
   stroked with a varying lineWidth, pinches at every corner,
   and a single offset polygon folds over itself on tight
   turns.

   The shutter is time, not frames. `samples` counts 60 fps
   frames (26 ≈ 0.43 s) at any refresh rate, the easing and
   the speed are measured against elapsed time, and a fast
   stroke is integrated in sub-steps along the pointer's
   coalesced path — otherwise a flick is sampled once a frame
   and the ribbon is a polygon of long straight chords.

   Both ends of an exposure are the disc's own edge, and that
   is what keeps it honest when the pointer stops. Ground
   near either end of the path is under the disc for only
   part of its passage, and the line of half exposure there
   is the disc's own arc, drawn through the end of the path.
   So the smear starts tangent to the tail, where the shutter
   opened, and ends tangent to the pointer: its radius is
   never more than its distance to either. A slow stroke is a
   droplet, round at the pointer, and one shorter than the
   disc is a smaller disc. Ramp the ends in more gently than
   that and they are wedges — a slow stroke is a dart, a stop
   a diamond. The naive version caps only the tail and lets
   speed alone set the head, and speed is lowest exactly when
   you stop: the head swells into a full-width blob that sits
   on the cursor for the whole shutter, then pops. Capped at
   both ends, the head closes onto the pointer as the easing
   lands on it, the tail runs in behind, and age tapers what
   is left, so the smear drains into the cursor with nothing
   parked.

   Leaving and coming back are separate exposures, and the
   pointer is still moving when it crosses either way. Going
   out, the last 60 ms of input give the velocity it left
   with, and the pointer is carried on past the edge at that
   speed, braking over about a tenth of a second — so the
   head sails out through the edge and the smear runs off
   after it. The naive version eases the head onto the last
   point it saw, which is on the edge: the head brakes
   against a wall that is not there, and the slow ink piles
   into a blob that sits on the edge for the whole shutter.
   Coming in, the new stroke waits for its first few
   coalesced points, reads the speed from them, and starts
   where a head that had been following all along would be —
   one easing lag behind the entry point, at that speed. It
   slides in from the edge instead of starting from a
   standing blob, and it never joins the old stroke, which
   drains on its own. The old stroke keeps its head, too.
   Whatever flight that head had left is run at once and
   laid down ahead of time, each sample stamped with when
   the head will be there, and a stroke is shown only as far
   as the present — so one that is caught mid-flight goes on
   arriving. Hand its head to the new stroke instead and it
   stops dead where it was: out and straight back in, or one
   flick of a finger after another, and every throw but the
   last is cut short.

   Not every way out has an edge to cross. A frame inside the
   host is another document: the pointer goes into it and the
   moves stop coming, with no leave to mark it, since the
   frame is the host's own child. So going onto a frame is
   leaving, at the speed it went in with, and coming off it
   is coming in — and the frame is a hole in the exposure.
   The ink stops at its edge, the head sails on under it
   unseen, and the new stroke slides out from under the side
   the pointer comes out of. Drawn, the guess is a droplet
   landing well inside the frame, somewhere the pointer may
   never have been. And a pointer that falls silent and then
   turns up somewhere else — after a context menu, another
   tab, a pointer lock — got there unseen, which is no
   exposure at all: that is a new stroke too. The naive
   version joins the two points it has, and paints a dead
   straight streak across everything the pointer was hidden
   behind.

   The blur is the cursor's, and the cursor lives on the
   screen, not on the page. When the host moves under it —
   the page scrolls, the layout shifts — the pointer has not
   moved, so everything held in the host's coordinates is
   carried back by as much: the ink holds its place on
   screen, and a stroke drawn while the page scrolls is the
   path the hand took. Left on the host instead, a scroll is
   a jump, and the next nudge draws it as one streak across
   the content; cut the stroke at every scroll event to avoid
   that, and moving while the page coasts chops the ribbon
   into a string of beads.

   hideNative swaps the system cursor for a disc: the head
   held open to the rest width. The system cursor is hidden
   only while that disc is there to stand in for it — not
   before the script has run, not until the pointer has been
   seen, never under reduced motion — so there is always
   exactly one. The disc gives a little under a press, and it
   steps aside wherever the page shows a cursor of its own —
   a link's hand, a field's caret, or everywhere for a reader
   who has asked for forced colours or more contrast and is
   given the system's back — so the one you see tells the
   truth.

   Touch has no cursor to smear, and claiming the gesture
   would steal the page's scroll, so by default fingers are
   left alone. With `touch`, a drag that sets off sideways
   smears under the finger, and one that sets off up or down
   scrolls the page as usual (touch-action: pan-y). A finger
   does not hover, so lifting it is leaving: a flick throws
   the head on at the speed it was let go with, as it would
   past an edge. Set touch-action: none on the host if every
   drag should smear.

   The buffer is a ring and every scratch array is allocated
   once, so nothing is allocated per frame, and the loop
   parks as soon as the last stroke has drained — or at
   once, dropping it, when the host scrolls out of view. The
   canvas is as large as the host, so wrap a section rather
   than a long page. For a trail over the whole page, give a
   fixed, viewport-sized host data-global="true" and
   pointer-events: none: it listens on the window instead,
   and follows the pointer over everything. A host like that
   is never under the pointer, so it has no cursor of its own
   to hide: there, hideNative draws its disc wherever the
   page itself has set cursor: none.
   ========================================================= */

const N = 2048          // ring capacity: a 90-frame shutter at the densest sampling, twice over
const SUB_RATE = 480    // most sub-steps a second, however fast the stroke
const FLIGHT = 960      // most sub-steps a closing stroke's head is run on for (2 s)
const SPACING = 0.75    // px the eased pointer travels before a sample is kept
const FRAME = 1 / 60    // "per frame" in the props means a 60 fps frame
const ENTRY = 0.008     // s of entry points that set a new stroke's speed
const ENTRY_WAIT = 0.05 // s to wait for them before starting from rest
const VMAX = 4000       // px/s, the fastest speed carried across the edge, in or out
const HIST = 128        // recent input points kept to read the exit velocity from
const WINDOW = 0.06     // s of input the exit velocity is read over
const COAST = 0.1       // s, how long the pointer is carried on past the edge, beyond the easing lag
const BLINK = 0.1       // s of silence after which a pointer found elsewhere got there unseen
const LEAP = 64         // px, how far elsewhere
const PRESS = 0.2       // how far the resting disc gives under a press

const pos = (n) => (Number.isFinite(n) && n > 0 ? n : 0)

// A frame is another document: over it the pointer is no longer ours to see.
const framed = (el) => !!el && /^(IFRAME|FRAME|OBJECT|EMBED)$/.test(el.tagName)

// An event's time in seconds on the frame clock's timebase, if it has a sane one.
const stamp = (e) => {
  const now = performance.now()
  const t = e.timeStamp
  return (t > 0 && Math.abs(t - now) < 1000 ? t : now) / 1000
}

export default function SmearCursor({
  samples = 26,        // the shutter, in 60 fps frames of travel (26 ≈ 0.43 s)
  width = 15,          // half-width at rest, px
  stretch = 0.035,     // how hard speed thins the ribbon
  smoothing = 0.32,    // pointer easing per 60 fps frame, 0..1 — lower lags further behind
  color = '#e8e4dc',   // any canvas fill colour
  blend = 'lighter',   // canvas composite op: how separate strokes combine where they cross
  hideNative = false,  // replace the system cursor; a disc marks the pointer at rest
  touch = false,       // let a finger smear too: sideways drags are its, vertical ones still scroll
  className = '',
  style,
  children,
  ...rest
}) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)

  const live = useRef({})
  const wake = useRef(null)
  // Synced after every render and before the effect below, so the loop reads
  // current props without being torn down and restarted — and wakes, if it
  // was parked, to show them.
  useEffect(() => {
    live.current = { samples, width, stretch, smoothing, color, blend, hideNative, touch }
    if (wake.current) wake.current()
  })

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    // Where the stylesheet hands the system cursor back, whatever hideNative says.
    const plain = window.matchMedia('(forced-colors: active), (prefers-contrast: more)')
    let still = motion.matches
    const global = root.dataset.global === 'true'   // listen on the window, not the host

    // Kept samples, oldest at `tail`, each stroke's in the order its head made
    // them. pb marks the first sample of a stroke.
    const px = new Float32Array(N)
    const py = new Float32Array(N)
    const pw = new Float32Array(N)   // radius the speed allowed when it was laid down
    const pg = new Float32Array(N)   // how far ahead of it the pointer was
    const pu = new Uint8Array(N)     // laid down under a frame, out of sight
    const pt = new Float64Array(N)   // when, on the loop's own clock
    const pb = new Uint8Array(N)
    let tail = 0
    let count = 0

    // Scratch for one stroke's discs while painting: centre, radius, arc length,
    // and whether it is under a frame.
    const qx = new Float32Array(N + 2)
    const qy = new Float32Array(N + 2)
    const qr = new Float32Array(N + 2)
    const qs = new Float32Array(N + 2)
    const qu = new Uint8Array(N + 2)

    const raw = []                   // pointer positions since the last frame, flat x,y
    const seed = []                  // a new stroke's first points, flat x,y,t
    const hx = new Float32Array(HIST)   // recent input, a ring, for the exit velocity
    const hy = new Float32Array(HIST)
    const ht = new Float64Array(HIST)   // event time, s
    let hn = 0                       // how many are held
    let hi = 0                       // where the next one goes
    let coasting = false             // the pointer has left and is being carried on
    let cx = 0, cy = 0               // where it left
    let cvx = 0, cvy = 0             // at what velocity, px/s
    let cs = 0                       // when, on the loop's clock
    let ctau = 0                     // and how long it takes to brake
    let wx = 0, wy = 0               // where it has been carried to
    let landed = false               // and whether that is as far as it goes
    let adrift = false               // the head is following a pointer it can no longer see
    let hole = false                 // there is a frame the pointer has gone into, or come out of
    let fl = 0, ft = 0, fr = 0, fb = 0   // where that frame is, in the host's coordinates
    let lost = false                 // the head has followed the pointer under it
    let ox = 0, oy = 0               // where the raw path stood at the last frame
    let tx = 0, ty = 0               // latest raw position — the pointer itself
    let x = 0, y = 0                 // eased pointer — the head of the smear
    let kx = 0, ky = 0               // last kept sample
    let v = 0                        // speed of the eased pointer, px/s
    let started = false
    let inside = false
    let entering = false             // inside, but the new stroke has no speed yet
    let kind = ''                    // pointerType of the current stroke

    let show = 0                     // 0..1, how far the disc that stands in for the cursor is out
    let press = 0                    // 0..1, how far that disc has given
    let pressed = false
    let over = null                  // element under the pointer
    let native = false               // it shows a cursor of its own
    let restyle = false              // `native` needs reading again

    let seen = true                  // on screen
    let bx = 0, by = 0               // where the host stood on screen when last looked at
    let clock = 0                    // seconds the loop has run for; it stops while parked
    let at = 0                       // the clock when the head was last moved
    let last = -1
    let raf = 0
    let W = 0, H = 0, dpr = 1

    const span = (L) => pos(L.samples) * FRAME
    const widthAt = (speed, L) => pos(L.width) / (1 + speed * FRAME * pos(L.stretch) * 10)
    const ease = (L) => (Number.isFinite(L.smoothing) ? Math.min(1, Math.max(0.01, L.smoothing)) : 0.32)
    // How far behind a steadily moving pointer the eased head runs, in seconds.
    const lagOf = (L) => {
      const s = ease(L)
      return s < 1 ? FRAME / -Math.log(1 - s) : 0
    }
    // A finger is taken only when asked for, and only the first one down.
    const skip = (e) => e.pointerType === 'touch' && !(live.current.touch && e.isPrimary)
    // There is a cursor over the host, a stroke under it for a disc to head,
    // and a disc of some size to draw.
    const bare = (L) => !!L.hideNative && inside && !entering && kind !== 'touch' && pos(L.width) > 0
    // The resting disc shows only while it is the one cursor over the host.
    const shown = (L) => (bare(L) && !native ? 1 : 0)

    /* Hide the system cursor only while a disc is there to replace it. Left to
       the markup, it would be gone from first paint: before the script has
       run, and with the pointer resting over the host and nothing yet drawn
       under it. An attribute rather than a class, so a render that rewrites
       the class list cannot bring the cursor back for a frame. */
    const veil = () => {
      const on = bare(live.current)
      if (root.hasAttribute('data-bare') === on) return
      root.toggleAttribute('data-bare', on)
      restyle = true
    }

    const record = (sx, sy, t) => {
      hx[hi] = sx; hy[hi] = sy; ht[hi] = t
      hi = (hi + 1) % HIST
      if (hn < HIST) hn++
    }

    /* The pointer's velocity as it left: the chord across the last WINDOW of
       input, which a single event's step is too noisy to stand in for. Too
       short a span, or a pointer that had stopped, reads as none. */
    const readExit = () => {
      cvx = 0
      cvy = 0
      if (hn < 2) return
      const a = (hi - 1 + HIST) % HIST
      let b = a
      for (let j = 1; j < hn; j++) {
        const c = (a - j + HIST) % HIST
        if (ht[a] - ht[c] > WINDOW) break
        b = c
      }
      const dur = ht[a] - ht[b]
      if (dur < ENTRY / 2) return
      cvx = (hx[a] - hx[b]) / dur
      cvy = (hy[a] - hy[b]) / dur
      const sp = Math.hypot(cvx, cvy)
      if (sp > VMAX) { cvx *= VMAX / sp; cvy *= VMAX / sp }
    }

    const within = (sx, sy) => hole && sx > fl && sx < fr && sy > ft && sy < fb

    /* Under the frame, ink is out of sight (see header). A head that got there
       by following a pointer it could no longer see stays out of sight,
       wherever the guess takes it next — out of the far side, say. */
    const under = (sx, sy) => {
      if (adrift && !lost && within(sx, sy)) lost = true
      return lost || within(sx, sy)
    }

    const keep = (sx, sy, w, t, first, ahead) => {
      if (count === N) { tail = (tail + 1) % N; count-- }
      const i = (tail + count) % N
      px[i] = sx; py[i] = sy; pw[i] = w; pg[i] = ahead; pt[i] = t; pb[i] = first ? 1 : 0
      pu[i] = under(sx, sy) ? 1 : 0
      count++
      kx = sx; ky = sy
    }

    /* Drop what the shutter has closed on. The newest sample older than the
       shutter stays, so the tail can be pinned exactly at its edge instead of
       stepping back one sample per frame. */
    const trim = (T) => {
      while (count > 0 && clock - pt[tail] >= T) {
        const next = (tail + 1) % N
        if (count > 1 && !pb[next] && clock - pt[next] < T) break
        tail = next
        count--
      }
    }

    // Outer-tangent hull of two discs, wound like the discs are (see header).
    const hull = (ax, ay, ra, bx, by, rb) => {
      const dx = bx - ax, dy = by - ay
      const len = Math.hypot(dx, dy)
      if (len <= Math.abs(ra - rb) + 1e-3) return   // one disc holds the other
      const ux = dx / len, uy = dy / len
      const sn = (ra - rb) / len
      const cs = Math.sqrt(1 - sn * sn)
      const lx = sn * ux - cs * uy, ly = sn * uy + cs * ux
      const rx = sn * ux + cs * uy, ry = sn * uy - cs * ux
      ctx.moveTo(ax + ra * lx, ay + ra * ly)
      ctx.lineTo(bx + rb * lx, by + rb * ly)
      ctx.lineTo(bx + rb * rx, by + rb * ry)
      ctx.lineTo(ax + ra * rx, ay + ra * ry)
      ctx.closePath()
    }

    /* One stroke: hold every radius to its distance from either end of the
       exposure — the tail, and `gap` beyond the head, where the pointer is —
       so both ends are the disc's own arc, then fill the union of discs and
       hulls. `disc` is the resting disc that stands in for a hidden cursor:
       the head is held open to it, and nothing just behind the head is
       pinched narrower than it. A stroke that is `cut` runs under the frame:
       that part is left out, and the frame's edge clips the rest. */
    const flush = (n, disc, gap, cut) => {
      if (n === 0) return
      qs[0] = 0
      for (let i = 1; i < n; i++) qs[i] = qs[i - 1] + Math.hypot(qx[i] - qx[i - 1], qy[i] - qy[i - 1])
      const S = qs[n - 1] + gap
      for (let i = 0; i < n; i++) {
        const r = Math.min(qr[i], qs[i], S - qs[i] + disc)
        qr[i] = i === n - 1 ? Math.max(r, disc) : r
      }
      const clip = cut && hole
      if (clip) {
        ctx.save()
        ctx.beginPath()
        ctx.rect(0, 0, W, H)
        ctx.rect(fl, ft, fr - fl, fb - ft)
        ctx.clip('evenodd')
      }
      ctx.beginPath()
      for (let i = 0; i < n; i++) {
        const r = qr[i]
        if (r > 0.05 && !qu[i]) {
          ctx.moveTo(qx[i] + r, qy[i])
          ctx.arc(qx[i], qy[i], r, 0, Math.PI * 2, true)
        }
        if (i && !(qu[i] && qu[i - 1])) hull(qx[i - 1], qy[i - 1], qr[i - 1], qx[i], qy[i], r)
      }
      ctx.fill()
      if (clip) ctx.restore()
    }

    const paint = () => {
      const L = live.current
      ctx.clearRect(0, 0, W, H)
      if (!started) return
      const T = span(L)
      // Any composite operation the canvas knows; one it does not is ignored, and leaves 'lighter'.
      ctx.globalCompositeOperation = 'lighter'
      if (typeof L.blend === 'string') ctx.globalCompositeOperation = L.blend
      ctx.fillStyle = L.color

      let n = 0
      let ahead = 0         // a closed stroke's head: how far it still is from where it is going
      let pending = false   // the rest of this stroke has not happened yet
      let cut = false       // some of it is under the frame
      for (let i = 0; i < count; i++) {
        const a = (tail + i) % N
        if (pb[a]) {
          if (n) flush(n, 0, ahead, cut)
          n = 0
          ahead = 0
          pending = false
          cut = false
        }
        if (pending) continue
        const age = clock - pt[a]
        if (age < 0) {
          /* Laid down ahead of time (finish): the head is still on its way
             here from the sample before, and this is as far as it has got. */
          pending = true
          if (!i || pb[a]) continue
          const p = (a + N - 1) % N
          const f = (clock - pt[p]) / (pt[a] - pt[p])
          qx[n] = px[p] + (px[a] - px[p]) * f
          qy[n] = py[p] + (py[a] - py[p]) * f
          qr[n] = pw[p] + (pw[a] - pw[p]) * f
          qu[n] = pu[a]
          ahead = pg[p] + (pg[a] - pg[p]) * f
          if (pu[a]) cut = true
          n++
          continue
        }
        if (age >= T) {
          /* Past the shutter. The last such sample of a stroke is pinned at
             its edge; any before it, or with nothing after, are gone, and wait
             only for trim() to reach them behind an older stroke. */
          const b = (a + 1) % N
          if (i + 1 === count || pb[b] || clock - pt[b] >= T) continue
          const nb = clock - pt[b]
          const f = (age - T) / (age - nb)
          qx[n] = px[a] + (px[b] - px[a]) * f
          qy[n] = py[a] + (py[b] - py[a]) * f
          qr[n] = 0
        } else {
          qx[n] = px[a]
          qy[n] = py[a]
          qr[n] = pw[a] * (1 - age / T)
        }
        qu[n] = pu[a]
        if (pu[a]) cut = true
        n++
      }
      // The live stroke ends at the eased pointer itself, at age zero, with the
      // real pointer `gap` ahead of it.
      const R = widthAt(v, L)
      let gap = Math.hypot(tx - x, ty - y)
      qx[n] = x; qy[n] = y; qr[n] = R
      qu[n] = lost || within(x, y) ? 1 : 0
      if (qu[n]) cut = true
      n++
      /* Standing in for the cursor, the ink runs on across that gap to the
         pointer itself (see header). The line there is the one the head is
         travelling along, so it joins the ribbon without a corner. */
      if (show > 0 && gap > 0) {
        qx[n] = x + (tx - x) * show; qy[n] = y + (ty - y) * show; qr[n] = R
        qu[n] = lost || within(qx[n], qy[n]) ? 1 : 0
        n++
        gap *= 1 - show
      }
      flush(n, R * show * (1 - PRESS * press), gap, cut)
      ctx.globalCompositeOperation = 'source-over'
    }

    /* One sub-step of the head toward (gx, gy): eased, its speed measured, and
       a sample kept once it has travelled far enough to need one. */
    const advance = (gx, gy, h, k, kv, t, L) => {
      const nx = x + (gx - x) * k
      const ny = y + (gy - y) * k
      const d = Math.hypot(nx - x, ny - y)
      x = nx; y = ny
      v += (h > 0 ? d / h - v : 0) * kv
      if (Math.hypot(x - kx, y - ky) >= SPACING) keep(x, y, widthAt(v, L), t, false, Math.hypot(gx - x, gy - y))
    }

    /* Advance the eased pointer across this frame's raw path. The raw points
       are spread evenly over the frame, and the easing runs in sub-steps along
       them, so a flick lays down a curve instead of a few long chords. */
    const step = (dt, L) => {
      const s = ease(L)
      const q = raw.length / 2

      let travel = Math.hypot(ox - x, oy - y)
      for (let i = 0; i < q; i++) {
        const ax = i ? raw[2 * i - 2] : ox, ay = i ? raw[2 * i - 1] : oy
        travel += Math.hypot(raw[2 * i] - ax, raw[2 * i + 1] - ay)
      }
      const m = Math.max(1, Math.min(Math.round(dt * SUB_RATE) || 1, Math.ceil(travel / 4)))
      const h = dt / m
      const k = 1 - (1 - s) ** (h / FRAME)
      const kv = 1 - Math.exp(-h / 0.02)

      for (let j = 1; j <= m; j++) {
        let gx = tx, gy = ty
        if (q) {
          const u = (j / m) * q
          const i = Math.min(q - 1, Math.floor(u))
          const f = u - i
          const ax = i ? raw[2 * i - 2] : ox, ay = i ? raw[2 * i - 1] : oy
          gx = ax + (raw[2 * i] - ax) * f
          gy = ay + (raw[2 * i + 1] - ay) * f
        }
        advance(gx, gy, h, k, kv, clock - dt + j * h, L)
      }
      raw.length = 0
      ox = tx; oy = ty
      at = clock

      // Settle exactly, so the loop can tell it is done and nothing creeps.
      if (Math.abs(tx - x) < 0.01 && Math.abs(ty - y) < 0.01) { x = tx; y = ty }
      if (v < 1 && x === tx && y === ty) v = 0

      /* The resting disc grows in a touch slower than it goes, since exits are
         shorter; a press lands inside 100 ms and lets go over about 200. With
         no disc on screen to give, a press has nothing to ease and is taken as
         read, so a click on a bare trail does not keep the loop awake. */
      const goal = shown(L)
      show += (goal - show) * (1 - Math.exp(-dt / (goal > show ? 0.045 : 0.03)))
      if (Math.abs(goal - show) < 0.002) show = goal
      const firm = pressed ? 1 : 0
      press += (firm - press) * (1 - Math.exp(-dt / (firm > press ? 0.03 : 0.07)))
      if (Math.abs(firm - press) < 0.002 || (!goal && !show)) press = firm
    }

    /* Where the pointer has been carried to by time t on the loop's clock: on
       from where it left at the velocity it left with, braking exponentially,
       so its path is cx + cv·τ(1 − e^(−t/τ)) and it comes to rest cv·τ beyond
       the edge. Four time constants in, what is left is under 2% and the eased
       head absorbs the step; by then a fast exit is far past the edge anyway. */
    const carry = (t) => {
      const e = Math.max(0, t - cs)
      const f = Math.exp(-e / ctau)
      landed = e > 4 * ctau || Math.hypot(cvx, cvy) * ctau * f < 0.05
      const g = landed ? 1 : 1 - f
      wx = cx + cvx * ctau * g
      wy = cy + cvy * ctau * g
    }

    /* The stroke that is ending may still have its head in flight — carried on
       past an edge, or easing onto the last place the pointer was seen — and
       the new stroke is about to take the head. So the rest of that flight is
       run here, at the loop's own sub-step, and laid down ahead of time: each
       sample stamped with when the head will get there and how far it will
       still be from the pointer. paint() shows a stroke only up to the
       present, so the old one goes on arriving exactly as it would have. */
    const finish = (L) => {
      if (!started || !count) return
      const h = 1 / SUB_RATE
      const k = 1 - (1 - ease(L)) ** (h / FRAME)
      const kv = 1 - Math.exp(-h / 0.02)
      let t = at
      wx = tx
      wy = ty
      keep(x, y, widthAt(v, L), t, false, Math.hypot(wx - x, wy - y))
      for (let i = 0; i < FLIGHT; i++) {
        if (!coasting && Math.abs(wx - x) < 0.01 && Math.abs(wy - y) < 0.01) break
        t += h
        if (coasting) {
          carry(t)
          coasting = !landed
        }
        advance(wx, wy, h, k, kv, t, L)
      }
      if (x !== kx || y !== ky) keep(x, y, widthAt(v, L), t, false, Math.hypot(wx - x, wy - y))
    }

    /* A new exposure. Let the old stroke finish on its own, and put the new
       head where one that had been following the pointer all along would be:
       an easing lag behind it, already at its speed. */
    const begin = (ex, ey, vx, vy) => {
      const L = live.current
      finish(L)
      adrift = false
      lost = false
      const lag = lagOf(L)
      coasting = false
      x = ex - vx * lag
      y = ey - vy * lag
      v = Math.hypot(vx, vy)
      tx = ox = ex
      ty = oy = ey
      raw.length = 0
      seed.length = 0
      entering = false
      keep(x, y, 0, clock, true, 0)
      started = true
      veil()
    }

    /* An entry becomes a stroke once its points span long enough to show the
       pointer's speed — or, if it came in and held still, from rest. */
    const enter = (now) => {
      const q = seed.length / 3
      if (!q) return
      const lx = seed[3 * q - 3], ly = seed[3 * q - 2]
      const dur = seed[3 * q - 1] - seed[2]
      const waited = now - seed[2] > ENTRY_WAIT
      if (dur < ENTRY && !waited) return
      // Too short a span to read a speed from is read as none.
      let vx = 0, vy = 0
      if (dur >= ENTRY / 4) {
        vx = (lx - seed[0]) / dur
        vy = (ly - seed[1]) / dur
        const sp = Math.hypot(vx, vy)
        if (sp > VMAX) { vx *= VMAX / sp; vy *= VMAX / sp }
      }
      begin(lx, ly, vx, vy)
    }

    const frame = (now) => {
      raf = 0
      const L = live.current
      /* The easing takes a late frame in a step no longer than two, so the
         head does not leap; the ink ages by the whole of it, so a tab that was
         hidden mid-stroke comes back to a clean host, not a stale smear. */
      const gone = last < 0 ? FRAME : Math.max(0, (now - last) / 1000)
      const dt = Math.min(1 / 30, gone)
      last = now
      clock += gone
      if (coasting) coast()
      if (entering) enter(now / 1000)
      if (restyle) {
        restyle = false
        native = bare(L) && over !== null && over.nodeType === 1 && getComputedStyle(over).cursor !== 'none'
      }
      step(dt, L)
      trim(span(L))
      paint()
      // Park once the pointer has stopped and the last stroke has drained.
      if (!entering && !coasting && x === tx && y === ty && v === 0 && count === 0 &&
          show === shown(L) && press === (pressed ? 1 : 0)) {
        last = -1
        return
      }
      raf = requestAnimationFrame(frame)
    }

    const kick = () => {
      if (!raf && !still) raf = requestAnimationFrame(frame)
    }

    /* The host has moved on screen since it was last looked at — a scroll, a
       shift in the layout — and the pointer has not. Carry everything held in
       the host's coordinates back by as much, so the ink stays where it was on
       screen and the move is not read as the pointer's (see header). */
    const hold = (b) => {
      const dx = b.left - bx, dy = b.top - by
      bx = b.left
      by = b.top
      if (!dx && !dy) return false
      for (let i = 0; i < count; i++) {
        const a = (tail + i) % N
        px[a] -= dx; py[a] -= dy
      }
      for (let i = 0; i < raw.length; i += 2) { raw[i] -= dx; raw[i + 1] -= dy }
      for (let i = 0; i < seed.length; i += 3) { seed[i] -= dx; seed[i + 1] -= dy }
      for (let i = 0; i < HIST; i++) { hx[i] -= dx; hy[i] -= dy }
      x -= dx; y -= dy
      tx -= dx; ty -= dy
      ox -= dx; oy -= dy
      kx -= dx; ky -= dy
      cx -= dx; cy -= dy
      fl -= dx; fr -= dx
      ft -= dy; fb -= dy
      return true
    }

    /* The pointer is gone. Given where it crossed out, and when, it is carried
       on from there at the velocity it left with; without them — a cancel, a
       change of device, the host scrolled away — the head settles where it
       was going. Either way the stroke then drains. */
    const out = (lx, ly, t) => {
      if (!inside) return
      inside = false
      adrift = true
      coasting = false
      if (entering) {
        entering = false
        seed.length = 0
      } else if (lx !== undefined) {
        record(lx, ly, t)
        readExit()
        cx = lx
        cy = ly
        // On the loop's clock, which stands at the last frame: the event came after it.
        cs = last < 0 ? clock : clock + Math.max(0, t - last / 1000)
        ctau = COAST + lagOf(live.current)
        coasting = true
        raw.push(lx, ly)
        tx = lx
        ty = ly
      }
      veil()
      kick()
    }

    // Carry the pointer on past the edge; the head follows it as it would the real thing.
    const coast = () => {
      carry(clock)
      coasting = !landed
      raw.push(wx, wy)
      tx = wx
      ty = wy
    }

    /* A move — or a press, which is a position too: a finger's first, and a
       mouse's if it has been resting over the host since before it mounted. */
    const onMove = (e) => {
      if (still || !seen || skip(e)) return
      // On a frame's own border, it is as good as in it.
      if (framed(e.target)) { onLeave(e); return }
      if (inside && e.pointerType !== kind) out()   // a pen taking over from a mouse starts afresh
      kind = e.pointerType
      const b = root.getBoundingClientRect()
      hold(b)
      const list = typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : null
      const n = list && list.length ? list.length : 0
      /* Silent, then somewhere else: it got there unseen (see header), and the
         ground between was never exposed. A pointer that had only been resting
         picks up within a few pixels of where it stopped. */
      const p0 = n ? list[0] : e
      if (inside && !entering && hn && stamp(p0) - ht[(hi - 1 + HIST) % HIST] > BLINK &&
          Math.hypot(p0.clientX - b.left - tx, p0.clientY - b.top - ty) > LEAP) out()
      if (!inside) {
        inside = true
        entering = true
        seed.length = 0
      }
      for (let i = 0; i < (n || 1); i++) {
        const p = n ? list[i] : e
        const sx = p.clientX - b.left, sy = p.clientY - b.top, t = stamp(p)
        record(sx, sy, t)
        if (entering) seed.push(sx, sy, t)
        else raw.push(sx, sy)
      }
      if (raw.length > 8192) raw.splice(0, raw.length - 8192)   // a stalled loop never hoards
      // Seen where the frame was: it has moved, or gone, and that is no hole now.
      if (within(e.clientX - b.left, e.clientY - b.top)) hole = false
      if (!entering) {
        tx = raw[raw.length - 2]
        ty = raw[raw.length - 1]
      }
      pressed = e.buttons !== 0
      if (e.target !== over) { over = e.target; restyle = true }
      kick()
    }

    // With no pointer over the host and no ink on it, there is nothing to hold.
    const onScroll = () => {
      if ((inside || count) && hold(root.getBoundingClientRect())) kick()
    }

    const onLeave = (e) => {
      if (skip(e)) return
      if (Number.isFinite(e.clientX)) {
        const b = root.getBoundingClientRect()
        hold(b)
        out(e.clientX - b.left, e.clientY - b.top, stamp(e))
      } else {
        out()
      }
    }
    const onUp = (e) => {
      if (still || skip(e)) return
      pressed = e.buttons !== 0
      // A finger does not hover: lifting it is leaving, at the speed it had.
      if (e.pointerType === 'touch') onLeave(e)
      else kick()
    }
    const onCancel = (e) => { if (!skip(e)) out() }

    /* Onto a frame — or, listening on the window, off the page — is out. Going
       under a frame or coming out from under one, note where it is: that is
       where the ink stops. */
    const onOut = (e) => {
      if (skip(e)) return
      const to = e.relatedTarget
      const f = framed(to) ? to : framed(e.target) ? e.target : null
      if (f) {
        const b = root.getBoundingClientRect()
        const r = f.getBoundingClientRect()
        hold(b)
        fl = r.left - b.left; ft = r.top - b.top
        fr = r.right - b.left; fb = r.bottom - b.top
        hole = true
      }
      if (framed(to) || (global && !to)) onLeave(e)
    }

    // Nothing left to show: forget every stroke and park.
    const drop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0; last = -1
      count = 0; started = false; inside = false; entering = false; coasting = false
      adrift = false; lost = false
      seed.length = 0; raw.length = 0; hn = 0
      show = 0; press = 0
      veil()
      ctx.clearRect(0, 0, W, H)
    }

    const onMotion = () => {
      still = motion.matches
      if (still) drop()
    }
    // The cursor under a resting pointer may just have changed: look again.
    const onPlain = () => { restyle = true; kick() }

    const resize = () => {
      const b = root.getBoundingClientRect()
      W = b.width; H = b.height
      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.max(1, Math.round(W * dpr))
      canvas.height = Math.max(1, Math.round(H * dpr))
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      paint()   // resizing clears the canvas; a parked resting disc must survive it
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(root)

    // Scrolled out of view, there is nothing left to see drain: stop now.
    const io = typeof IntersectionObserver === 'function'
      ? new IntersectionObserver((entries) => {
        seen = entries[entries.length - 1].isIntersecting
        if (!seen) drop()
      })
      : null
    if (io) io.observe(root)

    const target = global ? window : root
    target.addEventListener('pointermove', onMove, { passive: true })
    target.addEventListener('pointerdown', onMove, { passive: true })
    target.addEventListener('pointerup', onUp, { passive: true })
    target.addEventListener('pointercancel', onCancel, { passive: true })
    target.addEventListener('pointerout', onOut, { passive: true })
    if (!global) root.addEventListener('pointerleave', onLeave, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true, capture: true })
    motion.addEventListener('change', onMotion)
    plain.addEventListener('change', onPlain)
    wake.current = () => { veil(); restyle = true; kick() }

    return () => {
      wake.current = null
      ro.disconnect()
      if (io) io.disconnect()
      target.removeEventListener('pointermove', onMove)
      target.removeEventListener('pointerdown', onMove)
      target.removeEventListener('pointerup', onUp)
      target.removeEventListener('pointercancel', onCancel)
      target.removeEventListener('pointerout', onOut)
      if (!global) root.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onScroll, { capture: true })
      motion.removeEventListener('change', onMotion)
      plain.removeEventListener('change', onPlain)
      if (raf) cancelAnimationFrame(raf)
      root.removeAttribute('data-bare')
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className={`smear-cursor${touch ? ' is-touch' : ''} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
      <canvas ref={canvasRef} className="smear-cursor__canvas" aria-hidden="true" />
    </div>
  )
}
