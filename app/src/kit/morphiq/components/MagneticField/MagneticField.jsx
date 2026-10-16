'use client'

import { useEffect, useRef } from 'react'
import './MagneticField.css'

/* =========================================================
   MagneticField
   Iron filings scattered on a surface, aligning to a magnet
   held under the cursor.

   The obvious version points every filing at the pointer,
   which gives a radial fan — a starburst. Real filings do
   not do that, because a bar magnet is a dipole, not a
   monopole. Its field is

     B ∝ (3(m·r̂)r̂ − m) / r³

   Off either pole the filings lie along the axis. Straight
   out to the side they lie along it too — the field there
   runs back the other way, and a filing cannot show which
   way. Between the two, 54.7° off the axis where 3cos²θ = 1,
   they stand straight across it. So walking once round the
   magnet the filings turn over twice, where a fan's turn
   over once, and that second turn is the loops everyone
   recognises from the school experiment. A fan has none.

   The magnet sits a little under the paper (`depth`), which
   is where it really is. That keeps the field finite under
   the cursor: the filings there lie back along the axis
   instead of whipping round a singular point.

   How hard a filing is pulled follows |B|, not distance.
   |B| = m·√(1 + 3cos²θ) / r³, twice as strong off a pole as
   to the side, so the grip halves at 170·(m·√(1+3cos²θ))^⅓
   px: the gripped patch reaches a quarter further along the
   axis than across it and turns with `tilt`, and `moment`
   widens it by its cube root, as a stronger magnet would.

   The magnet does not switch on. When the pointer arrives
   its reach spreads out from under it in a few frames. When
   it leaves, the hand takes the magnet with it: the pointer
   is followed off the edge while the reach draws back in, a
   little slower than it came, so the outer filings let go
   first, the ones it was holding hardest last, and the patch
   goes out the way the hand went. Parked at the last point
   inside and dissolved there, it reads as a magnet switched
   off, not taken away, and the trail it left catches up to
   it after the hand has gone. A finger has no hover to
   follow, so one lifting mid-stroke carries the magnet on at
   the speed of its last 80 ms, slowing as a hand does. Come
   back while it is still going and it carries on from where
   the reach was. Put it down somewhere else while the last
   is still letting go — a second tap, say — and that is a
   second magnet: fields add as vectors, so B is summed
   over both and the grip taken from the sum, and the first
   patch lets go on its own time while the new one arrives,
   instead of the grip leaping across the field.

   Filings only rotate; they never move. That is what they do
   on paper, and it also means the grid can be built once and
   the frame loop writes nothing but a rotation per filing.
   They are all friction and no inertia, so each closes a
   fixed fraction of its remaining turn per 60 fps frame —
   applied in real elapsed time, so a 120 Hz display does not
   run them twice as fast — and snaps home once the turn is
   too small to see, which is what lets the loop stop.

   Orientation is a director, not a vector: a filing has no
   north end, so the angle is taken modulo π and eased along
   the shorter arc. Without that they spin a full half-turn
   whenever the field crosses the ±90° seam. The magnet's
   pull and the pull back to the resting angle are added as
   directors too, on doubled angles, where a line with no
   north end is a single point on a circle. That gives each
   filing one place to settle for a given magnet. Adding the
   two turns instead gives two wherever the field stands
   across the resting angle, and a filing a moving magnet
   sweeps past can be left in the wrong one: a frozen wake
   behind the hand that a magnet set down on the same spot
   does not have.

   Touch has no hover, so the magnet comes down where a
   finger lands and lifts with it. A drag that sets off
   sideways carries the magnet; one that sets off up or down
   scrolls the page as usual (touch-action: pan-y), and the
   magnet lifts where it was. Set touch-action: none on the
   field if every drag should steer. Children render above
   the filings as real content, and a control inside that
   takes keyboard focus draws the magnet to it. It slides
   from one control to the next, critically damped and
   keeping whatever speed it had, so tabbing through reads
   as the same magnet moving rather than one per control.
   ========================================================= */

/* Director, not vector: fold an angle difference to (−π/2, π/2], the shorter
   way round for something with no north end. */
const arc = (d) => {
  d %= Math.PI
  if (d > Math.PI / 2) d -= Math.PI
  if (d < -Math.PI / 2) d += Math.PI
  return d
}

// A finite number, or the fallback. One NaN angle would poison a filing for good.
const num = (v, d) => (typeof v === 'number' && Number.isFinite(v) ? v : d)

// Focus the browser would ring, from the keyboard; a click's focus is the pointer's business.
const keyboard = (el) => {
  try { return el.matches(':focus-visible') } catch { return false }
}

const REACH = 170     // px where a unit moment's grip is half, across the axis
const ARRIVE = 0.06   // s, time constant of the reach spreading out on arrival
const RELEASE = 0.16  // s, and of it drawing back in on departure
const COAST = 0.1     // s, time constant of a lifted magnet slowing with the hand that lifted it
const TRAIL = 80      // ms of stroke a lift's speed is measured over
const FLING = 3000    // px/s, the most a lift carries on at
const GLIDE = 20      // rad/s, the magnet sliding to a focused control (critically damped)
const HANDOFF = 24    // px; come back further than this from a magnet letting go and it is a new one
const LEAVING = 3     // magnets still letting go at once; past that the faintest is dropped
const GONE = 1e-3     // a reach this small grips nothing visible
const SETTLED = 1.5e-3 // rad; the tip of a 34 px filing moves 1/40 px. Snap and rest

/* A magnet let go: it carries on at its speed, slowing exponentially. The
   exact solution of dv/dt = −v/COAST over dt, so no frame rate changes how
   far it goes. */
const coast = (g, dt) => {
  const f = Math.exp(-dt / COAST)
  const d = COAST * (1 - f)
  g.x += g.vx * d; g.y += g.vy * d
  g.vx *= f; g.vy *= f
}

export default function MagneticField({
  cell = 22,            // filing spacing, px
  length = 11,          // filing length, px
  thickness = 1.6,      // filing stroke, px
  moment = 1,           // dipole strength; the gripped patch grows as its cube root
  tilt = 0,             // dipole axis, radians — 0 lies along x
  falloff = 2.2,        // how fast alignment gives way to the resting angle
  rest = 0,             // resting angle when the magnet is far away, radians
  smoothing = 0.22,     // share of the remaining turn a filing closes per 60 fps frame
  depth = 10,           // how far under the paper the magnet sits, px
  color = '#e8e4dc',    // filing colour
  background = 'transparent', // behind the filings
  className = '',
  style,
  children,
  ...rest_
}) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const api = useRef(null)

  const live = useRef({})
  // Synced after every render and before the effect below, so the loop reads
  // current props without the grid being rebuilt.
  useEffect(() => {
    live.current = { cell, length, thickness, moment, tilt, falloff, rest, smoothing, depth, color }
  })

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const ctx = canvas && canvas.getContext('2d')
    if (!root || !ctx) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let still = motion.matches

    let W = 0, H = 0, dpr = 0
    let c = 0, cols = 0, rows = 0, ox = 0, oy = 0
    // Filing centres and current angle.
    let xs = new Float32Array(0), ys = new Float32Array(0), ang = new Float32Array(0)

    /* The magnet in hand: where it is, how fast it is moving, and how much
       of its reach has arrived (0..1) and is heading for. It follows the
       pointer while one is over the field, else a control inside that has
       keyboard focus, else, while it is being taken away, the pointer that
       left; (tx, ty) is where that is. */
    const M = { x: 0, y: 0, vx: 0, vy: 0, reach: 0, goal: 0, gliding: false }
    let tx = 0, ty = 0
    // Magnets put down elsewhere, each carrying on from where it was, letting go.
    const leaving = []
    // This frame's magnets, flat: position and m·reach³ scaled so |B| = 1 at the half-grip.
    const sx = new Float64Array(LEAVING + 1)
    const sy = new Float64Array(LEAVING + 1)
    const ss = new Float64Array(LEAVING + 1)

    // pointer: one is over the field. away: it has left, and is followed while the reach draws in.
    let pointer = false, away = false, px = 0, py = 0
    let focused = null
    // The last few pointer samples, [ms, x, y] in client px, for the speed a lift carries.
    const trail = new Float64Array(8 * 3)
    let tn = 0

    let raf = 0, last = 0
    let onScreen = true

    const size = () => {
      const b = root.getBoundingClientRect()
      const d = Math.min(2, window.devicePixelRatio || 1)
      if (b.width === W && b.height === H && d === dpr) return
      W = b.width; H = b.height; dpr = d
      canvas.width = Math.max(1, Math.round(W * dpr))
      canvas.height = Math.max(1, Math.round(H * dpr))
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const layout = () => {
      const nc = Math.max(4, num(live.current.cell, 22))
      const nCols = Math.max(1, Math.floor(W / nc))
      const nRows = Math.max(1, Math.floor(H / nc))
      const nox = (W - nCols * nc) / 2 + nc / 2
      const noy = (H - nRows * nc) / 2 + nc / 2
      if (nc === c && nCols === cols && nRows === rows && nox === ox && noy === oy) return

      const n = nCols * nRows
      const nxs = new Float32Array(n), nys = new Float32Array(n), nang = new Float32Array(n)
      const r0 = arc(num(live.current.rest, 0))
      for (let j = 0, i = 0; j < nRows; j++) {
        for (let k = 0; k < nCols; k++, i++) {
          const x = nox + k * nc, y = noy + j * nc
          nxs[i] = x; nys[i] = y
          /* A resize or a new spacing takes each filing's angle from the
             nearest one already on screen, so the field carries on turning
             from what was showing instead of snapping back to rest. */
          if (ang.length) {
            const ok = Math.min(cols - 1, Math.max(0, Math.round((x - ox) / c)))
            const oj = Math.min(rows - 1, Math.max(0, Math.round((y - oy) / c)))
            nang[i] = ang[oj * cols + ok]
          } else nang[i] = r0
        }
      }
      xs = nxs; ys = nys; ang = nang
      c = nc; cols = nCols; rows = nRows; ox = nox; oy = noy
    }

    const paint = () => {
      const p = live.current
      const h = Math.max(0, num(p.length, 11)) / 2
      const lw = Math.max(0, num(p.thickness, 1.6))
      ctx.clearRect(0, 0, W, H)
      // A zero lineWidth is ignored by canvas, not drawn as nothing.
      if (!h || !lw) return
      ctx.strokeStyle = p.color
      ctx.lineWidth = lw
      ctx.lineCap = 'round'
      ctx.beginPath()
      for (let i = 0; i < xs.length; i++) {
        const cs = Math.cos(ang[i]) * h
        const sn = Math.sin(ang[i]) * h
        ctx.moveTo(xs[i] - cs, ys[i] - sn)
        ctx.lineTo(xs[i] + cs, ys[i] + sn)
      }
      ctx.stroke()
    }

    const step = (dt) => {
      const p = live.current
      const th = num(p.tilt, 0)
      const hx = Math.cos(th), hy = Math.sin(th)
      const e = Math.max(0.1, num(p.falloff, 2.2)) / 3
      const r0 = num(p.rest, 0)
      // The resting angle as a director: doubled, so r0 and r0 + π are one point.
      const rc = Math.cos(2 * r0), rs = Math.sin(2 * r0)
      const sm = Math.min(1, Math.max(0.01, num(p.smoothing, 0.22)))
      const dz = Math.max(0, num(p.depth, 10))
      let moving = false

      // Reach arriving or drawing back in, in real time.
      if (still) { M.reach = M.goal; leaving.length = 0 }
      else {
        if (M.reach !== M.goal) {
          M.reach += (M.goal - M.reach) * (1 - Math.exp(-dt / (M.goal > M.reach ? ARRIVE : RELEASE)))
          if (Math.abs(M.goal - M.reach) < GONE) M.reach = M.goal
          else moving = true
        }
        const fade = Math.exp(-dt / RELEASE)
        for (let j = leaving.length - 1; j >= 0; j--) {
          const g = leaving[j]
          g.reach *= fade
          coast(g, dt)
          if (g.reach < GONE) leaving.splice(j, 1)
          else moving = true
        }
      }

      // Nothing to slide to once the magnet is let go; it keeps the speed it had.
      if (!M.goal || still) M.gliding = false

      if (M.gliding) {
        /* Sliding to a focused control. The exact critically damped step, so
           it cannot overshoot the control or go unstable on a slow frame, and
           it starts from whatever velocity the magnet already had. */
        const f = Math.exp(-GLIDE * dt)
        const ex = M.x - tx, ey = M.y - ty
        const cx = M.vx + GLIDE * ex, cy = M.vy + GLIDE * ey
        const nx = (ex + cx * dt) * f, ny = (ey + cy * dt) * f
        M.vx = (M.vx - GLIDE * cx * dt) * f
        M.vy = (M.vy - GLIDE * cy * dt) * f
        if (Math.hypot(nx, ny) < 0.25 && Math.hypot(M.vx, M.vy) < 4) {
          M.gliding = false; M.x = tx; M.y = ty; M.vx = 0; M.vy = 0
        } else { M.x = tx + nx; M.y = ty + ny; moving = true }
      }
      // Lifted by a finger mid-stroke: the hand carries it on, slowing.
      else if (!M.goal && !away && !still) coast(M, dt)
      // Held, being taken away, or just arrived: exactly where it is aimed.
      else { M.x = tx; M.y = ty; M.vx = 0; M.vy = 0 }

      // Strength m·reach³, since reach is a length and |B| goes as m/r³.
      const s0 = Math.abs(num(p.moment, 1)) * REACH ** 3
      let n = 0
      if (M.reach > 0) { sx[n] = M.x; sy[n] = M.y; ss[n] = s0 * M.reach ** 3; n++ }
      for (const g of leaving) { sx[n] = g.x; sy[n] = g.y; ss[n] = s0 * g.reach ** 3; n++ }

      const k = still ? 1 : 1 - Math.pow(1 - sm, dt * 60)
      const dz2 = dz * dz

      for (let i = 0; i < xs.length; i++) {
        const a = ang[i]
        let bx = 0, by = 0, bz = 0
        for (let j = 0; j < n; j++) {
          const dx = xs[i] - sx[j]
          const dy = ys[i] - sy[j]
          const r2 = dx * dx + dy * dy + dz2
          if (r2 < 1e-6) continue
          const r = Math.sqrt(r2)
          // r̂ is 3D — the magnet is dz under the paper — and m lies flat.
          const ux = dx / r, uy = dy / r, uz = dz / r
          // Dipole: 3(m·r̂)r̂ − m. The dot product is what creates the lobes.
          const dot = hx * ux + hy * uy
          const f = ss[j] / (r2 * r)
          bx += f * (3 * dot * ux - hx)
          by += f * (3 * dot * uy - hy)
          bz += f * 3 * dot * uz
        }

        /* Grip from |B|: a half at the half-grip, giving way at a rate set by
           falloff — exposed because the visual reach matters more here than
           the physical constant. With no magnet w is exactly 0. */
        const q = Math.sqrt(bx * bx + by * by + bz * bz)
        const w = q > 0 ? 1 / (1 + Math.pow(q, -e)) : 0

        /* Where the filing settles: the field's direction along the paper
           and the resting angle, weighted by the grip and averaged as
           directors — each as a unit vector at twice its angle, halved back
           after. One answer for each filing, whatever the magnet did before;
           blending the two turns instead has a second, and a filing swept
           into it by a passing magnet stays there. Where the paper sees no
           field (straight down through it) only the resting angle pulls. */
        const bp = bx * bx + by * by
        let dc = (1 - w) * rc, ds = (1 - w) * rs
        if (bp > 0) { dc += w * (bx * bx - by * by) / bp; ds += w * 2 * bx * by / bp }
        const turn = dc * dc + ds * ds > 1e-12 ? arc(Math.atan2(ds, dc) / 2 - a) : 0
        if (Math.abs(turn) > SETTLED) {
          ang[i] = arc(a + turn * k)
          moving = true
        } else ang[i] = arc(a + turn)
      }
      return moving
    }

    const frame = (now) => {
      raf = 0
      // Real elapsed time, clamped so a backgrounded tab does not lurch on return.
      const dt = last ? Math.min(1 / 30, Math.max(0, (now - last) / 1000)) : 1 / 60
      last = now
      let moving = step(dt)
      // Reduced motion: no easing, just the settled field, in this one frame.
      if (still) for (let n = 0; moving && n < 4; n++) moving = step(dt)
      paint()
      // Taken away and gone: stop following the pointer round the page.
      if (away && !M.reach) follow(false)
      if (moving && !still) raf = requestAnimationFrame(frame)
      else last = 0
    }

    const kick = () => {
      if (raf || !onScreen) return
      raf = requestAnimationFrame(frame)
    }

    /* Where the magnet should be, from whatever it is following: the pointer
       over the field, else a focused control, else the pointer that left
       with it. Only the first two hold it; the last is taking it away. */
    const aim = () => {
      // A focused control removed from the page takes its focus with it, unannounced.
      if (focused && !focused.isConnected) focused = null
      M.goal = pointer || focused ? 1 : 0
      if (!M.goal && !away) return
      const b = root.getBoundingClientRect()
      if (focused && !pointer) {
        const f = focused.getBoundingClientRect()
        tx = f.left + f.width / 2 - b.left
        ty = f.top + f.height / 2 - b.top
      } else {
        tx = px - b.left
        ty = py - b.top
      }
    }

    const note = (e) => {
      const j = (tn++ % 8) * 3
      trail[j] = e.timeStamp; trail[j + 1] = e.clientX; trail[j + 2] = e.clientY
    }
    /* The stroke's speed as it ended: the distance back to the oldest sample
       within TRAIL ms of the last, over the time between them. One event's
       delta is noise; this is what the hand was doing. A stroke that had
       already stopped carries nothing. */
    const fling = () => {
      if (tn < 2) return [0, 0]
      const j1 = ((tn - 1) % 8) * 3
      let j0 = -1
      for (let k = 2; k <= Math.min(tn, 8); k++) {
        const j = ((tn - k) % 8) * 3
        if (trail[j1] - trail[j] > TRAIL) break
        j0 = j
      }
      const s = j0 < 0 ? 0 : (trail[j1] - trail[j0]) / 1000
      if (s < 0.008) return [0, 0]
      const vx = (trail[j1 + 1] - trail[j0 + 1]) / s
      const vy = (trail[j1 + 2] - trail[j0 + 2]) / s
      const v = Math.hypot(vx, vy)
      return v > FLING ? [vx * FLING / v, vy * FLING / v] : [vx, vy]
    }

    // Follow a pointer that has left, for as long as the magnet is still going.
    const onAway = (e) => {
      if (e.pointerType === 'touch') return
      px = e.clientX; py = e.clientY
      aim(); kick()
    }
    const follow = (on) => {
      if (on === away) return
      away = on
      if (on) window.addEventListener('pointermove', onAway, { passive: true })
      else window.removeEventListener('pointermove', onAway)
    }

    /* Put the magnet on its target. The pointer is the hand holding it, so it
       is always exactly under the pointer; a move of focus is the only thing
       it slides for, and only with a magnet on screen to slide. One coming
       down away from where the last is still letting go is a new magnet: the
       old one is left to let go where it is, and this one arrives from
       nothing. */
    const place = (slide, arrive) => {
      if (slide && M.reach > 0.05 && !still) { M.gliding = true; return }
      if (arrive && !still && M.reach > GONE && Math.hypot(tx - M.x, ty - M.y) > HANDOFF) {
        if (leaving.length >= LEAVING) {
          let f = 0
          for (let j = 1; j < leaving.length; j++) if (leaving[j].reach < leaving[f].reach) f = j
          leaving.splice(f, 1)
        }
        leaving.push({ x: M.x, y: M.y, vx: M.vx, vy: M.vy, reach: M.reach })
        M.reach = 0
      }
      M.gliding = false; M.x = tx; M.y = ty; M.vx = 0; M.vy = 0
    }

    const onPointer = (e) => {
      if (!e.isPrimary) return // a second finger does not pull the magnet between the two
      const arriving = !pointer
      // A new stroke's speed is its own: a quick second tap must not be
      // measured against where the last one lifted.
      if (arriving) tn = 0
      note(e)
      pointer = true
      follow(false)
      px = e.clientX
      py = e.clientY
      aim(); place(false, arriving); kick()
    }

    /* The hand lets go. A mouse or pen leaving is followed off the field; a
       finger lifting carries the magnet on at its speed; a touch the page has
       taken to scroll just lifts, its coordinates meaning nothing. With a
       control focused the magnet goes back to it instead, from that speed. */
    const release = (e) => {
      if (!pointer || !e.isPrimary) return
      pointer = false
      let v = [0, 0]
      if (e.type !== 'pointercancel') {
        note(e); v = fling()
        px = e.clientX; py = e.clientY
      }
      const hover = e.type === 'pointerleave' && e.pointerType !== 'touch'
      if (hover && !focused && !still) follow(true)
      aim()
      if (!away) { M.vx = v[0]; M.vy = v[1] }
      if (focused) place(true, true)
      kick()
    }
    // A finger lifting takes the magnet with it; a mouse or pen still hovers.
    const onUp = (e) => { if (e.pointerType === 'touch') release(e) }

    const onFocusIn = (e) => {
      focused = keyboard(e.target) ? e.target : null
      if (!pointer) {
        if (focused) follow(false)
        aim(); if (focused) place(true, true); kick()
      }
    }
    const onFocusOut = (e) => {
      if (e.relatedTarget && root.contains(e.relatedTarget)) return // focusin follows
      focused = null
      if (!pointer) { aim(); kick() }
    }

    // The page scrolling under a still cursor moves the paper, not the hand.
    const onScroll = () => {
      if (!pointer && !focused && !away) return
      aim(); if (M.goal) place(M.gliding, false); kick()
    }

    const onMotion = (e) => { still = e.matches; kick() }

    const io = new IntersectionObserver(([en]) => {
      onScreen = en.isIntersecting
      if (onScreen) kick()
      else {
        if (raf) { cancelAnimationFrame(raf); raf = 0; last = 0 }
        follow(false)
      }
    })
    io.observe(root)

    const ro = new ResizeObserver(() => {
      size(); layout(); paint()
      if (pointer || focused || away) { aim(); if (M.goal) place(M.gliding, false) }
      kick()
    })
    ro.observe(root)

    size(); layout(); paint()

    api.current = { sync: () => { layout(); kick() } }

    root.addEventListener('pointerenter', onPointer, { passive: true })
    root.addEventListener('pointermove', onPointer, { passive: true })
    root.addEventListener('pointerdown', onPointer, { passive: true })
    root.addEventListener('pointerup', onUp, { passive: true })
    root.addEventListener('pointercancel', release, { passive: true })
    root.addEventListener('pointerleave', release, { passive: true })
    root.addEventListener('focusin', onFocusIn)
    root.addEventListener('focusout', onFocusOut)
    window.addEventListener('scroll', onScroll, { passive: true, capture: true })
    motion.addEventListener?.('change', onMotion)

    return () => {
      api.current = null
      io.disconnect(); ro.disconnect()
      root.removeEventListener('pointerenter', onPointer)
      root.removeEventListener('pointermove', onPointer)
      root.removeEventListener('pointerdown', onPointer)
      root.removeEventListener('pointerup', onUp)
      root.removeEventListener('pointercancel', release)
      root.removeEventListener('pointerleave', release)
      root.removeEventListener('focusin', onFocusIn)
      root.removeEventListener('focusout', onFocusOut)
      window.removeEventListener('scroll', onScroll, { capture: true })
      motion.removeEventListener?.('change', onMotion)
      follow(false)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // A prop change carries on from the field on screen: a new rest angle or
  // tilt is eased into, a new colour is painted, a new spacing is re-gridded.
  useEffect(() => {
    api.current?.sync()
  }, [cell, length, thickness, moment, tilt, falloff, rest, smoothing, depth, color])

  return (
    <div
      ref={rootRef}
      className={`magnetic-field ${className}`.trim()}
      style={{ background, ...style }}
      {...rest_}
    >
      <canvas ref={canvasRef} className="magnetic-field__canvas" aria-hidden="true" />
      {children}
    </div>
  )
}
