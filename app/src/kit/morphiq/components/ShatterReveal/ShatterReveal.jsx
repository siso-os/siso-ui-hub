'use client'

import { useEffect, useRef, useState } from 'react'
import './ShatterReveal.css'

/* =========================================================
   ShatterReveal
   An image over some content. Strike it and it breaks into
   shards that tumble away, uncovering what was underneath.

   Shatter effects usually slice the image into a grid, or
   into triangles, and fling every piece with the same random
   spin. Two things give that away: real fracture cells are
   irregular but roughly even in size, and a piece's motion
   comes from its own shape.

   The cells are a Voronoi diagram — each shard is the region
   closer to its seed than to any other — seeded densely near
   the point of impact, where glass breaks finest. Raw random
   seeds make slivers, so the seeds are Lloyd-relaxed: moved
   to the centroid of their own cell and the diagram rebuilt,
   which evens the cells out the way stress relief does. It
   is the image that breaks, not the box: under fit="contain"
   the diagram covers the picture and leaves the margins be.

   Each shard is then a rigid body. Its mass is its area and
   its moment of inertia is the polygon's own,

     I = Σ (xᵢyᵢ₊₁ − xᵢ₊₁yᵢ)(xᵢ² + xᵢxᵢ₊₁ + xᵢ₊₁² + yᵢ² + yᵢyᵢ₊₁ + yᵢ₊₁²) / 12

   The strike is an impulse J away from the impact point,
   applied at the shard's nearest corner rather than its
   centre, so it also imparts angular momentum r × J — big
   shards far from the impact barely turn, small ones near it
   spin. In flight, gravity and quadratic drag,
   F = −c·|v|·v·√A: drag grows with cross-section but inertia
   with area, so small shards slow first and flutter down
   behind the large ones. The drag is integrated exactly —
   dv/dt = −k·v² has the solution v/(1 + k·v·t) — in slices
   no longer than 1/240 s, so a shard flies the same arc at
   60 Hz and 120 Hz and no drag setting can make it diverge.

   Nothing breaks all at once. A crack is a front that leaves
   the impact at a finite speed, and a shard is only free
   once the front has passed it; so the lines race outward
   first, fading toward their tips, and the pieces let go
   behind them, nearest first, a beat after the crack that
   freed them. Fracture outruns flight. A shard is freed at
   the instant the front reaches it, not at the next frame:
   it flies only what is left of the frame it let go in.

   That front is also the press state. Pointer down starts
   the cracks from under the pointer, on the very cells that
   will fall, and they creep out to a short reach and stop:
   the glass is cracked but still held. Letting go is the
   strike — the front runs on from where it stood. Sliding
   off before letting go takes the pressure away and the
   cracks draw back in; sliding back on while still holding
   starts them again. Space does the same from the centre,
   Enter strikes outright, and a finger gets a moment's grace
   before the first crack so a scroll that happens to begin
   on the image does not flash one.

   Putting the image back is not physics and does not pretend
   to be: glass does not unbreak. Each shard is drawn home by
   a critically damped spring — no overshoot, solved exactly,
   so it lands the same at any frame rate — from wherever it
   is and with whatever velocity it has, which is what lets a
   restore interrupt a fall without a jump. The far shards
   are pulled a little harder, so the pane closes inward and
   the piece that was struck is the last to seat; then the
   seams fade. Press the pane while it is closing and the
   pull lets go: the shards coast to a stop and hang there,
   as the cracks do on whole glass, until the strike or until
   the pointer slides off and they carry on home. Strike it
   again and it is the same broken glass, hit again: the
   cells are kept, and the new impulse is added to whatever
   each piece was doing.

   The loop only runs while something is moving, and out of
   view the model runs on without being drawn, so the
   callbacks still come on time. Under reduced motion the
   cracks still answer a press, since that is state and not
   travel, but a strike uncovers the content and a restore
   covers it at once.
   ========================================================= */

const TAU = Math.PI * 2
const SLICE = 1 / 240          // longest flight step, s
const BEAT = 0.07              // how long a shard hangs after its crack arrives, s
const CATCH = 0.05             // how quickly a press stills shards on their way home, s
const HELD = 0, LOOSE = 1, GONE = 2

const finite = (n, d) => (Number.isFinite(n) ? n : d)

// Deterministic, so the same seed always breaks the same way.
function random(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Sutherland–Hodgman against the half-plane nearer a than b.
function clip(poly, ax, ay, bx, by) {
  const nx = bx - ax, ny = by - ay
  const mx = (ax + bx) / 2, my = (ay + by) / 2
  const side = (p) => (p[0] - mx) * nx + (p[1] - my) * ny
  const out = []
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i], q = poly[(i + 1) % poly.length]
    const sp = side(p), sq = side(q)
    if (sp <= 0) out.push(p)
    if ((sp <= 0) !== (sq <= 0)) {
      const t = sp / (sp - sq)
      out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t])
    }
  }
  return out
}

function cell(seeds, i, W, H) {
  let poly = [[0, 0], [W, 0], [W, H], [0, H]]
  const [sx, sy] = seeds[i]
  for (let j = 0; j < seeds.length && poly.length; j++) {
    if (j !== i) poly = clip(poly, sx, sy, seeds[j][0], seeds[j][1])
  }
  return poly
}

// Area, centroid and moment of inertia about the centroid (unit density).
function body(poly) {
  let a = 0, cx = 0, cy = 0
  for (let i = 0; i < poly.length; i++) {
    const [x0, y0] = poly[i], [x1, y1] = poly[(i + 1) % poly.length]
    const c = x0 * y1 - x1 * y0
    a += c; cx += (x0 + x1) * c; cy += (y0 + y1) * c
  }
  a /= 2
  if (Math.abs(a) < 1e-6) return null
  cx /= 6 * a; cy /= 6 * a
  const rel = poly.map(([x, y]) => [x - cx, y - cy])
  let inertia = 0
  for (let i = 0; i < rel.length; i++) {
    const [x0, y0] = rel[i], [x1, y1] = rel[(i + 1) % rel.length]
    inertia += (x0 * y1 - x1 * y0) * (x0 * x0 + x0 * x1 + x1 * x1 + y0 * y0 + y0 * y1 + y1 * y1)
  }
  return { area: Math.abs(a), cx, cy, rel, inertia: Math.abs(inertia / 12) }
}

// The pane is [left, top, width, height] in the box; the impact is in box px.
function fracture([left, top, W, H], count, relax, ix, iy, seed) {
  const rand = random(seed)
  const n = Math.max(2, Math.min(240, Math.floor(count) || 2))
  const passes = Math.max(0, Math.min(12, Math.floor(relax) || 0))
  const reach = Math.hypot(W, H) * 0.55
  const px = ix - left, py = iy - top
  const seeds = []
  for (let i = 0; i < n; i++) {
    if (i < n * 0.65) {
      // Dense near the impact: radius drawn from a skewed distribution.
      const r = reach * rand() ** 1.8
      const a = rand() * TAU
      seeds.push([Math.min(W, Math.max(0, px + Math.cos(a) * r)), Math.min(H, Math.max(0, py + Math.sin(a) * r))])
    } else {
      seeds.push([rand() * W, rand() * H])
    }
  }
  for (let k = 0; k < passes; k++) {
    for (let i = 0; i < n; i++) {
      const b = body(cell(seeds, i, W, H))
      if (b) seeds[i] = [b.cx, b.cy]
    }
  }
  // An edge lying along the pane's own border is not a crack.
  const rim = (p, q, axis, at) => Math.abs(p[axis] - at) < 1e-6 && Math.abs(q[axis] - at) < 1e-6
  const out = []
  for (let i = 0; i < n; i++) {
    const poly = cell(seeds, i, W, H)
    const b = body(poly)
    if (!b) continue
    out.push({
      ...b,
      cx: b.cx + left,
      cy: b.cy + top,
      size: Math.sqrt(b.area),
      radius: Math.sqrt(b.rel.reduce((m, [x, y]) => Math.max(m, x * x + y * y), 0)),
      crack: poly.map((p, k) => {
        const q = poly[(k + 1) % poly.length]
        return !(rim(p, q, 0, 0) || rim(p, q, 0, W) || rim(p, q, 1, 0) || rim(p, q, 1, H))
      }),
    })
  }
  return out
}

export default function ShatterReveal({
  src,
  alt = '',
  shattered,             // controlled; leave undefined to shatter on click
  defaultShattered = false,
  onShatter,             // (point: { x, y }) => void
  onSettle,              // () => void, once the last shard has left
  onRestore,             // () => void, once the image is whole again
  shards = 56,           // how many pieces
  relax = 2,             // Lloyd iterations; 0 leaves slivers
  impulse = 560,         // strike speed at the point of impact, px/s
  gravity = 2400,        // px/s²
  drag = 0.0011,         // quadratic drag coefficient
  crack = 5200,          // crack front speed, px/s; shards let go as it passes
  mend = 0.5,            // s for the struck shard to come home on restore; 0 is instant
  sheen = 0.08,          // light under a hovering pointer, 0–1; 0 turns it off
  seed = 7,
  fit = 'cover',         // 'cover' | 'contain'
  children,
  className = '',
  style,
  ...rest
}) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const contentRef = useRef(null)
  const coverRef = useRef(null)
  const impact = useRef(null)
  const down = useRef(null)      // where the pointer went down, while a click may still follow
  const handoff = useRef(false)  // the cover held focus when it was struck
  const api = useRef(null)
  const [inner, setInner] = useState(defaultShattered)
  const isShattered = shattered ?? inner

  const live = useRef(null)
  // Synced after every render and before the effects below, so a strike reads
  // current props without the canvas being rebuilt.
  useEffect(() => {
    live.current = { shards, relax, impulse, gravity, drag, crack, mend, sheen, seed, fit, onSettle, onRestore }
  })

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!root || !ctx) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let W = 1, H = 1, dpr = 1
    let image = null
    let pane = [0, 0, 1, 1]    // where the image sits in the box: the part that breaks
    let pieces = null          // null is one sheet, or none at all once broken
    let broken = false
    let mode = 'idle'          // 'idle' | 'break' | 'mend' | 'seal'
    let ix = NaN, iy = NaN     // the impact
    let front = 0              // how far the cracks have run from it, px
    let far = 0                // where the front may stop
    let running = false        // struck: the front is on its way out
    let cracked = false        // it has crossed the whole pane
    let pressed = false, hold = 0
    let spot = null            // where the press in hand went down
    let ink = 1                // crack opacity, which fades as mended glass seals
    let hx = 0, hy = 0, lit = false, glow = 0
    let seen = true            // in view; out of it the model runs on undrawn
    let raf = 0, last = 0

    const rect = () => {
      const iw = image.naturalWidth || W, ih = image.naturalHeight || H
      const s = live.current.fit === 'contain' ? Math.min(W / iw, H / ih) : Math.max(W / iw, H / ih)
      return [(W - iw * s) / 2, (H - ih * s) / 2, iw * s, ih * s]
    }

    // The pane follows the image through a resize, and takes any shards with it.
    const refit = () => {
      let next = [0, 0, W, H]
      if (image) {
        const [dx, dy, dw, dh] = rect()
        const x = Math.max(0, dx), y = Math.max(0, dy)
        next = [x, y, Math.max(1, Math.min(W, dx + dw) - x), Math.max(1, Math.min(H, dy + dh) - y)]
      }
      const sx = next[2] / pane[2], sy = next[3] / pane[3]
      if (pieces && next.some((v, i) => Math.abs(v - pane[i]) > 1e-3)) {
        const s = Math.max(sx, sy)
        for (const p of pieces) {
          p.cx = (p.cx - pane[0]) * sx + next[0]; p.cy = (p.cy - pane[1]) * sy + next[1]
          p.x = (p.x - pane[0]) * sx + next[0]; p.y = (p.y - pane[1]) * sy + next[1]
          p.vx *= sx; p.vy *= sy
          p.rel = p.rel.map(([x, y]) => [x * sx, y * sy])
          p.area *= sx * sy; p.size = Math.sqrt(p.area); p.inertia *= (sx * sy) ** 2
          p.radius *= s; p.d *= s
        }
        ix = (ix - pane[0]) * sx + next[0]; iy = (iy - pane[1]) * sy + next[1]
        front *= s; far *= s
      }
      pane = next
    }

    const centre = () => ({ x: pane[0] + pane[2] / 2, y: pane[1] + pane[3] / 2 })
    const reach = () => Math.hypot(pane[2], pane[3]) * 0.2    // how far a press alone cracks
    const pace = () => { const v = finite(live.current.crack, 0); return v > 0 ? Math.min(1e6, Math.max(100, v)) : 1e6 }
    const tone = (rgb, a) => {
      if (cracked) return `rgba(${rgb},${a * ink})`
      // Not yet across: a crack narrows to nothing at its tip.
      const g = ctx.createRadialGradient(ix, iy, 0, ix, iy, Math.max(1, front))
      g.addColorStop(0, `rgba(${rgb},${a * ink})`)
      g.addColorStop(0.55, `rgba(${rgb},${a * ink})`)
      g.addColorStop(1, `rgba(${rgb},0)`)
      return g
    }

    const paint = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      if (!image) return
      const [dx, dy, dw, dh] = rect()
      if (!pieces) {
        if (broken) return
        ctx.drawImage(image, dx, dy, dw, dh)
      } else {
        // Everything still in place is drawn through one clip, so neighbours
        // meet without a seam and the only lines are the cracks drawn on top.
        let held = 0
        ctx.beginPath()
        for (const p of pieces) {
          if (p.state !== HELD) continue
          held++
          p.rel.forEach(([x, y], i) => (i ? ctx.lineTo(x + p.cx, y + p.cy) : ctx.moveTo(x + p.cx, y + p.cy)))
          ctx.closePath()
        }
        if (held) {
          ctx.save()
          ctx.clip()
          ctx.drawImage(image, dx, dy, dw, dh)
          ctx.restore()
          if (cracked || front > 0) {
            ctx.beginPath()
            for (const p of pieces) {
              if (p.state !== HELD) continue
              for (let i = 0; i < p.rel.length; i++) {
                if (!p.crack[i]) continue
                const a = p.rel[i], b = p.rel[(i + 1) % p.rel.length]
                ctx.moveTo(a[0] + p.cx, a[1] + p.cy)
                ctx.lineTo(b[0] + p.cx, b[1] + p.cy)
              }
            }
            // Dark under light, so a crack reads on a pale image and a dark one.
            ctx.lineWidth = 1.75
            ctx.strokeStyle = tone('0,0,0', 0.26)
            ctx.stroke()
            ctx.lineWidth = 0.75
            ctx.strokeStyle = tone('255,255,255', 0.5)
            ctx.stroke()
          }
        }
        for (const p of pieces) {
          if (p.state !== LOOSE) continue
          const r = p.radius + 1
          if (p.x + r < 0 || p.x - r > W || p.y + r < 0 || p.y - r > H) continue
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.angle)
          ctx.beginPath()
          p.rel.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
          ctx.closePath()
          ctx.save()
          ctx.clip()
          ctx.drawImage(image, dx - p.cx, dy - p.cy, dw, dh)
          ctx.restore()
          // A hairline on each fracture face, which is what catches the light.
          ctx.strokeStyle = 'rgba(255,255,255,0.28)'
          ctx.lineWidth = 0.75
          ctx.stroke()
          ctx.restore()
        }
      }
      const shine = Math.max(0, Math.min(1, finite(live.current.sheen, 0))) * glow
      if (shine > 0) {
        // Only where there is glass to light: the margins and the gaps stay dark.
        const r = Math.hypot(pane[2], pane[3]) * 0.3
        const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, r)
        g.addColorStop(0, `rgba(255,255,255,${shine})`)
        g.addColorStop(0.4, `rgba(255,255,255,${shine * 0.42})`)
        g.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.globalCompositeOperation = 'source-atop'
        ctx.fillStyle = g
        ctx.fillRect(hx - r, hy - r, r * 2, r * 2)
        ctx.globalCompositeOperation = 'source-over'
      }
    }

    // Impulse away from the strike, fading with distance, delivered per unit
    // mass (so v = J/m) at the shard's corner nearest the impact, and added to
    // whatever the shard was already doing.
    const kick = (p, J0, spread) => {
      const dx = p.x - ix, dy = p.y - iy
      const d = Math.hypot(dx, dy) || 1
      const J = J0 * Math.exp(-d / spread) * p.area
      const jx = (dx / d) * J, jy = (dy / d) * J - J * 0.35
      const cos = Math.cos(p.angle), sin = Math.sin(p.angle)
      let rx = 0, ry = 0, best = Infinity
      for (const [x, y] of p.rel) {
        const wx = x * cos - y * sin, wy = x * sin + y * cos
        const q = (wx + dx) ** 2 + (wy + dy) ** 2
        if (q < best) { best = q; rx = wx; ry = wy }
      }
      p.vx += jx / p.area
      p.vy += jy / p.area
      p.spin += (rx * jy - ry * jx) / Math.max(1, p.inertia)
      p.hit = true
      p.state = LOOSE
    }

    // One slice of flight. Drag is solved exactly and the position takes the
    // mean of the old and new velocity, which is exact under gravity alone.
    const fly = (p, h, g, c) => {
      const f = 1 / (1 + (c * Math.hypot(p.vx, p.vy) * h) / p.size)
      const vx = p.vx * f, vy = p.vy * f + g * h
      p.x += (p.vx + vx) * 0.5 * h
      p.y += (p.vy + vy) * 0.5 * h
      p.vx = vx
      p.vy = vy
      const spin = p.spin / (1 + c * 40 * Math.abs(p.spin) * h)
      p.angle += (p.spin + spin) * 0.5 * h
      p.spin = spin
    }
    const coast = (p, t, g, c) => {
      const n = Math.ceil(t / SLICE)
      for (let i = 0; i < n; i++) fly(p, t / n, g, c)
    }

    // Out of the box on a side it cannot come back from.
    const gone = (p, g) => {
      const r = p.radius
      return (p.x + r < 0 && p.vx <= 0) || (p.x - r > W && p.vx >= 0) ||
        (p.y - r > H && p.vy >= 0 && g >= 0) || (p.y + r < 0 && p.vy <= 0 && g <= 0)
    }
    // A shard is found gone a little after it left, and how long after depends
    // on the frame. It rests where it crossed the edge, not where it was found,
    // so a restore brings it back from the same place at any frame rate.
    const rest = (p, g, t) => {
      const r = p.radius
      const s = Math.min(t, Math.max(
        p.vx < 0 ? (p.x + r) / p.vx : 0,
        p.vx > 0 ? (p.x - r - W) / p.vx : 0,
        p.vy > 0 && g >= 0 ? (p.y - r - H) / p.vy : 0,
        p.vy < 0 && g <= 0 ? (p.y + r) / p.vy : 0,
      ))
      if (s > 0) { p.x -= p.vx * s; p.y -= p.vy * s; p.angle -= p.spin * s }
      p.state = GONE
    }
    // With no gravity a shard can simply stop where it is.
    const adrift = (p, g) => g !== 0 || Math.hypot(p.vx, p.vy) > 1 || Math.abs(p.spin) > 0.05

    const flight = () => {
      const L = live.current
      return {
        g: finite(L.gravity, 0),
        c: Math.max(0, finite(L.drag, 0)),
        J0: Math.max(0, finite(L.impulse, 0)),
        spread: Math.hypot(W, H) * 0.5,
      }
    }

    const crackAt = (at) => {
      const { shards: count, relax: passes, seed: s } = live.current
      ix = at.x; iy = at.y
      front = 0; running = false; cracked = false; ink = 1
      pieces = fracture(pane, count, passes, ix, iy, finite(s, 0)).map((b) => ({
        ...b, x: b.cx, y: b.cy, angle: 0, vx: 0, vy: 0, spin: 0,
        state: HELD, hit: false, d: 0, turn: 0, pull: 0,
      }))
    }

    const halt = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      last = 0
    }
    const clear = () => {
      halt()
      pieces = null
      mode = 'idle'
      front = 0; running = false; cracked = false; pressed = false; ink = 1
    }

    const advance = (dt) => {
      const { g, c, J0, spread } = flight()
      const speed = pace()
      let busy = false

      // A press counts once a finger's moment of grace has run out.
      if (pressed && hold > 0) { hold -= dt; busy = true }
      const firm = pressed && hold <= 0

      if (running) {
        front += speed * dt
        if (front >= far) { running = false; cracked = true }
        busy = true
      } else if (!cracked) {
        if (firm) {
          const to = reach()
          if (front !== to) {
            // Under reduced motion the cracks are simply there once the grace is up.
            front += (to - front) * (motion.matches ? 1 : 1 - Math.exp(-dt / 0.09))
            if (Math.abs(to - front) < 0.5) front = to
            else busy = true
          }
        } else if (!pressed) {
          // Let go without a strike: the cracks draw back in, quicker than they came.
          front *= Math.exp(-dt / 0.05)
          if (front < 1) { clear(); return false }
          busy = true
        }
      }

      if (mode === 'break') {
        const freed = front - BEAT * speed
        let waiting = false, moving = false
        for (const p of pieces) {
          let t = dt
          if (!p.hit) {
            if (freed < p.d) waiting = true
            else {
              // The front passed part-way through the frame: the shard flies
              // only what was left of it, so it lets go at the same instant
              // whatever the frame rate.
              t = Math.min(dt, (freed - p.d) / speed)
              if (p.state === LOOSE) coast(p, dt - t, g, c)
              kick(p, J0, spread)
            }
          }
          if (p.state !== LOOSE) continue
          coast(p, t, g, c)
          if (gone(p, g)) rest(p, g, t)
          else if (adrift(p, g)) moving = true
        }
        if (waiting || moving) busy = true
        else {
          mode = 'idle'
          live.current.onSettle?.()
        }
      } else if (mode === 'mend') {
        let away = false, moving = false
        for (const p of pieces) {
          if (p.state !== LOOSE) continue
          if (firm) {
            // Pressed mid-way: the pull lets go and the shard coasts to a
            // stop where it is, v(t) = v₀·e^(−t/τ), to wait for the strike.
            const e = Math.exp(-dt / CATCH), s = CATCH * (1 - e)
            p.x += p.vx * s; p.y += p.vy * s; p.angle += p.spin * s
            p.vx *= e; p.vy *= e; p.spin *= e
            if (Math.hypot(p.vx, p.vy) > 2 || Math.abs(p.spin) > 0.02) moving = true
            else { p.vx = 0; p.vy = 0; p.spin = 0 }
            away = true
            continue
          }
          // Critically damped, in closed form: x(t) = (x₀ + (v₀ + ωx₀)t)·e^(−ωt).
          const w = p.pull, e = Math.exp(-w * dt)
          const ox = p.x - p.cx, oy = p.y - p.cy, oa = p.angle - p.turn
          const bx = p.vx + w * ox, by = p.vy + w * oy, ba = p.spin + w * oa
          p.x = p.cx + (ox + bx * dt) * e; p.vx = (p.vx - w * bx * dt) * e
          p.y = p.cy + (oy + by * dt) * e; p.vy = (p.vy - w * by * dt) * e
          p.angle = p.turn + (oa + ba * dt) * e; p.spin = (p.spin - w * ba * dt) * e
          if (Math.hypot(p.x - p.cx, p.y - p.cy) < 0.4 && Math.abs(p.angle - p.turn) < 0.004 &&
              Math.hypot(p.vx, p.vy) < 24 && Math.abs(p.spin) < 0.25) {
            p.x = p.cx; p.y = p.cy; p.angle = 0; p.vx = 0; p.vy = 0; p.spin = 0
            p.state = HELD
          } else { away = true; moving = true }
        }
        if (moving) busy = true
        else if (!away) mode = 'seal'
      }

      // A press on glass that is sealing opens the seams again.
      const to = mode === 'seal' && !firm ? 0 : 1
      if (ink !== to) {
        ink += (to - ink) * (1 - Math.exp(-dt / (to ? 0.03 : 0.07)))
        if (Math.abs(to - ink) < 0.02) ink = to
        busy = true
      }
      if (mode === 'seal' && ink === 0) {
        pieces = null
        mode = 'idle'
        front = 0; running = false; cracked = false; ink = 1
        live.current.onRestore?.()
        // A finger that came down in its moment of grace, just as the seams
        // closed, is still pressing: on glass that is whole now.
        if (pressed && spot && !broken) { crackAt(spot); return true }
        return false
      }
      return busy
    }

    const tick = (now) => {
      raf = 0
      const dt = last ? Math.min(1 / 30, (now - last) / 1000) : 1 / 60
      last = now
      let busy = false
      const to = lit ? 1 : 0
      if (glow !== to) {
        // In under 100 ms, out a little slower.
        glow += (to - glow) * (1 - Math.exp(-dt / (lit ? 0.035 : 0.08)))
        if (Math.abs(to - glow) < 0.01) glow = to
        else busy = true
      }
      if (pieces && advance(dt)) busy = true
      if (seen) paint()
      if (busy) raf = requestAnimationFrame(tick)
      else last = 0
    }
    const wake = () => { raf ||= requestAnimationFrame(tick) }

    const moved = (at) => Math.hypot(at.x - ix, at.y - iy) > 0.5

    const press = (point, delay) => {
      if (broken || !image) return
      const at = point ?? centre()
      // Cracks from a press that was let go belong to that spot, not this one.
      if (!pieces || (!cracked && !running && moved(at))) crackAt(at)
      pressed = true
      spot = at
      hold = delay
      // Whatever is already under way is left to finish as it began, and a
      // finger's grace is waited out by the loop even when nothing else moves.
      if (motion.matches && mode === 'idle' && !(delay > 0)) {
        halt()
        if (!cracked) front = reach()
        paint()
      } else wake()
    }

    const release = () => {
      if (!pressed) return
      pressed = false
      if (motion.matches && mode === 'idle') {
        if (pieces && !cracked && !running) clear()
        paint()
      } else wake()
    }

    const shatter = (point) => {
      if (broken) return
      broken = true
      pressed = false
      lit = false
      if (!image || motion.matches) {
        clear()
        glow = 0
        paint()
        live.current.onSettle?.()
        return
      }
      const at = point ?? centre()
      if (!pieces) crackAt(at)
      else if (cracked || running) {
        // Already in pieces: the same glass, hit somewhere new.
        cracked = true
        ix = at.x; iy = at.y; front = 0
      } else if (moved(at)) crackAt(at)
      far = Math.max(
        Math.hypot(ix - pane[0], iy - pane[1]), Math.hypot(ix - pane[0] - pane[2], iy - pane[1]),
        Math.hypot(ix - pane[0], iy - pane[1] - pane[3]), Math.hypot(ix - pane[0] - pane[2], iy - pane[1] - pane[3]),
      )
      for (const p of pieces) {
        p.hit = false
        p.d = Math.hypot(p.x - ix, p.y - iy)
        far = Math.max(far, p.d)
      }
      far += BEAT * pace() + 1
      running = true
      mode = 'break'
      wake()
    }

    // The image left with no shards to show for it — it was not loaded, or
    // motion was reduced. Break it unseen, so there is something to bring back.
    const scatter = () => {
      const { g, c, J0, spread } = flight()
      crackAt(Number.isFinite(ix) ? { x: ix, y: iy } : centre())
      for (const p of pieces) kick(p, J0, spread)
      for (let t = 0, moving = true; moving && t < 2400; t++) {
        moving = false
        for (const p of pieces) {
          if (p.state !== LOOSE) continue
          fly(p, SLICE, g, c)
          if (gone(p, g)) p.state = GONE
          else if (adrift(p, g)) moving = true
        }
      }
      cracked = true
    }

    const restore = () => {
      if (!broken) return
      broken = false
      const span = finite(live.current.mend, 0)
      if (!image || motion.matches || !(span > 0.02)) {
        clear()
        paint()
        live.current.onRestore?.()
        return
      }
      if (!pieces) scatter()
      let widest = 1
      for (const p of pieces) widest = Math.max(widest, Math.hypot(p.cx - ix, p.cy - iy))
      for (const p of pieces) {
        if (p.state === HELD) continue
        // A shard that fell out of view has landed; one still in the air keeps its velocity.
        if (p.state === GONE) { p.vx = 0; p.vy = 0; p.spin = 0 }
        p.state = LOOSE
        p.turn = Math.round(p.angle / TAU) * TAU      // the nearest way round
        p.pull = (8 / span) * (1 + 0.5 * Math.hypot(p.cx - ix, p.cy - iy) / widest)
      }
      mode = 'mend'
      ink = 1
      wake()
    }

    const ro = new ResizeObserver(() => {
      // The padding box, which is what the canvas fills, unscaled by any transform.
      W = Math.max(1, root.clientWidth)
      H = Math.max(1, root.clientHeight)
      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      refit()
      // Sizing a canvas clears it, and this runs after the frame's own paint.
      paint()
    })
    ro.observe(root)

    const io = new IntersectionObserver(([entry]) => {
      seen = entry.isIntersecting
      // Back in view: one frame is owed for the ones that went undrawn.
      if (seen) paint()
    })
    io.observe(root)

    api.current = {
      press,
      release,
      shatter,
      restore,
      hover(point) {
        lit = !!point && !broken
        if (point) { hx = point.x; hy = point.y }
        if (motion.matches) { glow = lit ? 1 : 0; paint() } else wake()
      },
      setImage(img) { image = img; refit(); paint() },
      repaint() { refit(); paint() },
    }

    return () => {
      api.current = null
      ro.disconnect()
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    if (!src) {
      api.current?.setImage(null)
      return
    }
    let cancelled = false
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => { if (!cancelled) api.current?.setImage(img) }
    img.onerror = () => { if (!cancelled) api.current?.setImage(null) }
    img.src = src
    return () => { cancelled = true }
  }, [src])

  useEffect(() => {
    api.current?.repaint()
  }, [fit])

  // Covered content is out of reach until revealed: not read, not tabbable.
  // Focus follows the swap, so it is never left on something that has gone:
  // from the struck cover into the content, and back out of content being covered.
  useEffect(() => {
    const content = contentRef.current
    const inside = !isShattered && !!content?.contains(document.activeElement)
    if (content) content.inert = !isShattered
    if (isShattered) {
      api.current?.shatter(impact.current)
      if (handoff.current && document.activeElement === document.body) content?.focus({ preventScroll: true })
    } else {
      api.current?.restore()
      if (inside) coverRef.current?.focus({ preventScroll: true })
    }
    impact.current = null
    handoff.current = false
  }, [isShattered])

  const at = (e) => ({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })

  const strike = (e) => {
    const el = e.currentTarget
    // A pointer strikes where it went down, which is where the cracks are. A
    // keyboard press has no position; it strikes the centre.
    const point = (e.detail && down.current) ||
      (e.detail ? at(e) : { x: el.clientWidth / 2, y: el.clientHeight / 2 })
    down.current = null
    impact.current = point
    handoff.current = document.activeElement === el
    onShatter?.(point)
    if (shattered === undefined) setInner(true)
  }

  return (
    <div ref={rootRef} className={`shatter-reveal ${className}`.trim()} style={style} {...rest}>
      <div ref={contentRef} className="shatter-reveal__content" tabIndex={-1}>{children}</div>
      <canvas ref={canvasRef} className="shatter-reveal__canvas" aria-hidden="true" />
      {isShattered ? null : (
        <button
          ref={coverRef}
          type="button"
          className="shatter-reveal__cover"
          aria-label={alt ? `${alt} — break to reveal` : 'Break to reveal'}
          onClick={strike}
          onPointerDown={(e) => {
            if (!e.isPrimary || e.button !== 0) return
            down.current = at(e)
            // A finger may be starting a scroll; give it a moment before cracking.
            api.current?.press(down.current, e.pointerType === 'touch' ? 0.08 : 0)
          }}
          // A second finger coming or going is not this press.
          onPointerUp={(e) => { if (e.isPrimary) api.current?.release() }}
          onPointerCancel={(e) => { if (e.isPrimary) { down.current = null; api.current?.release() } }}
          onPointerEnter={(e) => {
            if (!(e.buttons & 1)) down.current = null
            else if (down.current) api.current?.press(down.current, 0)
          }}
          onPointerMove={(e) => { if (e.pointerType !== 'touch') api.current?.hover(at(e)) }}
          onPointerLeave={(e) => { if (e.isPrimary) { api.current?.release(); api.current?.hover(null) } }}
          onKeyDown={(e) => { if (e.key === ' ' && !e.repeat) api.current?.press(null, 0) }}
          onKeyUp={(e) => { if (e.key === ' ') api.current?.release() }}
          onBlur={() => api.current?.release()}
        />
      )}
    </div>
  )
}
