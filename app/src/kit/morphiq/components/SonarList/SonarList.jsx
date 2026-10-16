'use client'

import { useEffect, useRef } from 'react'
import './SonarList.css'

/* =========================================================
   SonarList
   Press the list and a ping leaves the press point; each row
   rings as the wavefront reaches it, then decays.

   Two pieces of physics, and the second is what stops this
   being a stagger.

   · arrival — the front is a circle of radius c·t, so a row
     is struck when that circle first touches it: at t = d/c,
     with d the distance to the nearest point of the row, not
     to its centre. Press the bottom of the list and the
     bottom rings first, which a per-index stagger cannot do;
     and the row under the press is struck at once (d = 0),
     which a centre distance cannot do — on a wide row it
     would take a third of a second to answer its own press.
     The front is drawn, faintly, at exactly that radius, so
     the circle touches each row as the row starts to move,
     and fades out once it has struck the last row.

   · ringing — each row is its own damped oscillator,

       x'' + 2ζωx' + ω²x = 0

     and a strike is an impulse: it adds velocity, directed
     away from the source along the row's axis, sized so that
     a row struck from rest peaks at exactly the amplitude.
     Between strikes (x, v) is carried forward by the exact
     solution over each frame's dt — underdamped, critical or
     overdamped — so it is frame-rate independent without
     being integrated, and it is linear, so pings superpose.
     Press again while the list still rings and every row
     takes the new kick on top of the motion it already has.

   The naive version evaluates A·e^(−ζωt)·sin(ω√(1−ζ²)·t)
   from each row's strike time. That is right after arrival
   and badly wrong before it: at negative t the envelope
   grows, so rows the wave has not reached swing early and,
   at low speeds, are thrown off the page. It cannot
   superpose either — a second ping can only overwrite the
   first, and every row jumps to the new phase.

   Rows carry their own frequency, rising by index, so the
   list rings as a chord rather than in unison. Superposition
   is honest but unbounded — pings that land in phase add —
   so what is drawn is tethered past the amplitude: linear up
   to A, then easing towards 2A, never a hard stop.

   A press is a primary pointer going down, or Enter or Space
   on anything focused in the list, which pings from its
   centre. Neither is prevented, so rows that are links or
   buttons still do their job.
   ========================================================= */

const MAX_DT = 1 / 30   // s — a tab coming back resumes rather than jumping
const REST = 0.1        // px — equivalent amplitude below which a row is at rest
const LINE = 1.25       // px — half-width of the drawn front
const FAR_TAIL = 1.5    // the front fades out at this multiple of the last row's distance
const FAR_MIN = 48      // px — so a press on a lone row still leaves a small ring

const num = (v, d) => (Number.isFinite(v) ? v : d)
const clamp = (n, lo, hi) => (n < lo ? lo : n > hi ? hi : n)

/* Carry s = (x, v) forward by dt under x'' + 2ζωx' + ω²x = 0, exactly. */
function carry(s, dt, w, z) {
  if (dt <= 0) return
  const { x, v } = s
  if (z < 0.999) {
    const wd = w * Math.sqrt(1 - z * z)
    const e = Math.exp(-z * w * dt), c = Math.cos(wd * dt), sn = Math.sin(wd * dt)
    s.x = e * (x * c + ((v + z * w * x) / wd) * sn)
    s.v = e * (v * c - ((w * w * x + z * w * v) / wd) * sn)
  } else if (z > 1.001) {
    const q = w * Math.sqrt(z * z - 1)
    const r1 = -z * w + q, r2 = -z * w - q
    const a = (v - r2 * x) / (r1 - r2), b = x - a
    const e1 = Math.exp(r1 * dt), e2 = Math.exp(r2 * dt)
    s.x = a * e1 + b * e2
    s.v = r1 * a * e1 + r2 * b * e2
  } else {
    const e = Math.exp(-w * dt), k = v + w * x
    s.x = e * (x + k * dt)
    s.v = e * (v - w * k * dt)
  }
}

/* Peak of the unit-impulse response, so a strike can be sized to peak at A
   whatever the damping — the same kick over ζ = 1 would barely move a row. */
function peak(w, z) {
  if (z < 0.999) return Math.exp((-z * Math.acos(z)) / Math.sqrt(1 - z * z)) / w
  if (z > 1.001) {
    const q = w * Math.sqrt(z * z - 1), r1 = -z * w + q, r2 = -z * w - q
    const t = Math.log(r2 / r1) / (r1 - r2)
    return (Math.exp(r1 * t) - Math.exp(r2 * t)) / (r1 - r2)
  }
  return 1 / (Math.E * w)
}

/* Linear to a, then easing towards 2a. C¹ at a, so one strike is untouched. */
const tether = (x, a) => {
  const m = Math.abs(x)
  return m <= a || a <= 0 ? x : Math.sign(x) * (a + a * Math.tanh((m - a) / a))
}

/* Keys pressed while typing are text, not presses. */
const typing = (el) =>
  el.isContentEditable || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' ||
  (el.tagName === 'INPUT' && !/^(button|submit|reset|checkbox|radio|image|color|file|range)$/.test(el.type))

export default function SonarList({
  speed = 900,        // wavefront, px/s
  frequency = 9,      // base angular frequency ω, rad/s
  spread = 0.35,      // how much ω rises down the list
  damping = 0.22,     // ζ — under 1 it rings, over 1 it just returns
  amplitude = 14,     // peak displacement of a row struck from rest, px
  axis = 'x',         // which way a struck row moves
  wavefront = 0.3,    // opacity of the drawn front as it leaves the press; 0 hides it
  children,
  className = '',
  style,
  ...rest
}) {
  const rootRef = useRef(null)
  const live = useRef({})
  // Synced after every render and before the effect below, so the loop reads
  // current props without being torn down — a prop change mid-ring carries on
  // from the state the rows are in.
  useEffect(() => {
    live.current = { speed, frequency, spread, damping, amplitude, axis, wavefront }
  })

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Ringing row → { x, v, f, a, y, shown, hits: [{ at, dv }] }. The axis and
    // tether are the row's own until it rests, so changing them mid-ring cannot
    // make it jump.
    const rows = new Map()
    let fronts = []         // drawn wavefronts: { x, y, c, t0, far }
    let clock = 0           // s — advances by each frame's clamped dt
    let last = 0            // performance.now() of the last frame
    let raf = 0
    let onScreen = true

    // The current props, made safe: no NaN, no ω ≤ 0, no ζ that never settles.
    const read = () => {
      const p = live.current
      return {
        c: Math.max(1, num(p.speed, 900)),
        w0: Math.max(0.1, num(p.frequency, 9)),
        sp: num(p.spread, 0.35),
        z: clamp(num(p.damping, 0.22), 0.001, 10),
        a: num(p.amplitude, 14),
        y: p.axis === 'y',
        o: clamp(num(p.wavefront, 0.3), 0, 1),
      }
    }
    const omega = (w0, sp, f) => Math.max(0.1, w0 * (1 + sp * f))

    // Everything to rest at once — offscreen, unmounting, or motion turned off.
    const settle = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      rows.forEach((_, el) => { el.style.translate = ''; el.style.willChange = '' })
      rows.clear()
      fronts = []
      root.style.removeProperty('--sonar-front')
    }

    const frame = (now) => {
      raf = 0
      const to = clock + clamp((now - last) / 1000, 0, MAX_DT)
      last = now
      const { w0, sp, z, o } = read()

      rows.forEach((s, el) => {
        // A row taken out of the list mid-ring is let go, not written to.
        if (el.parentElement !== root) {
          el.style.translate = ''
          el.style.willChange = ''
          rows.delete(el)
          return
        }
        const w = omega(w0, sp, s.f)
        let t = clock
        // Strikes that land inside this frame are applied at their own instant.
        while (s.hits.length && s.hits[0].at <= to) {
          const h = s.hits.shift()
          carry(s, h.at - t, w, z)
          t = h.at
          s.v += h.dv
        }
        carry(s, to - t, w, z)
        if (!s.hits.length && Math.hypot(s.x, s.v / w) < REST) {
          el.style.translate = ''
          el.style.willChange = ''
          rows.delete(el)
          return
        }
        if (s.x === 0 && s.v === 0) return  // the front has not reached it yet
        s.shown = tether(s.x, s.a)
        const d = s.shown.toFixed(2)
        el.style.translate = s.y ? `0 ${d}px` : `${d}px`
        el.style.willChange = 'translate'   // a layer only while it rings
      })

      // The front is the circle r = c·t itself, fading as it sweeps the list.
      fronts = fronts.filter((f) => f.c * (to - f.t0) < f.far)
      if (fronts.length && o > 0) {
        root.style.setProperty('--sonar-front', fronts.map((f) => {
          const r = f.c * (to - f.t0)
          const k = o * (1 - r / f.far) ** 2 * 100
          return `radial-gradient(circle at ${f.x.toFixed(1)}px ${f.y.toFixed(1)}px, ` +
            `transparent ${Math.max(0, r - LINE).toFixed(1)}px, ` +
            `color-mix(in srgb, currentColor ${k.toFixed(1)}%, transparent) ${r.toFixed(1)}px, ` +
            `transparent ${(r + LINE).toFixed(1)}px)`
        }).join(', '))
      } else {
        root.style.removeProperty('--sonar-front')
      }

      clock = to
      if (rows.size || fronts.length) raf = requestAnimationFrame(frame)
    }

    const ping = (px, py) => {
      if (still.matches || !onScreen) return
      const { c, w0, sp, z, a, y, o } = read()
      const now = performance.now()
      if (!raf) last = now  // idle: the clock picks up from this press
      const at0 = clock + clamp((now - last) / 1000, 0, MAX_DT)

      const kids = root.children
      const n = kids.length
      let reach = 0   // the farthest row's distance: the front has done its work there
      for (let i = 0; i < n; i++) {
        const el = kids[i]
        const s = rows.get(el) || { x: 0, v: 0, a: 0, y, shown: 0, hits: [] }
        s.f = i / Math.max(1, n - 1)
        s.a = Math.max(s.a, Math.abs(a))
        // Distance to the row's own box, not the one it is drawn in mid-ring.
        const b = el.getBoundingClientRect()
        const l = b.left - (s.y ? 0 : s.shown)
        const t = b.top - (s.y ? s.shown : 0)
        const dx = Math.max(l - px, 0, px - l - b.width)
        const dy = Math.max(t - py, 0, py - t - b.height)
        // Kicked away from the source, along the axis the row moves on.
        const away = s.y ? t + b.height / 2 - py : l + b.width / 2 - px
        const d = Math.hypot(dx, dy)
        reach = Math.max(reach, d)
        s.hits.push({
          at: at0 + d / c,
          dv: ((away < 0 ? -1 : 1) * a) / peak(omega(w0, sp, s.f), z),
        })
        s.hits.sort((m, k) => m.at - k.at)
        rows.set(el, s)
      }

      if (o > 0) {
        const r = root.getBoundingClientRect()
        const x = px - r.left - root.clientLeft + root.scrollLeft
        const yy = py - r.top - root.clientTop + root.scrollTop
        fronts.push({ x, y: yy, c, t0: at0, far: Math.max(FAR_MIN, reach * FAR_TAIL) })
        if (fronts.length > 3) fronts.shift()
      }

      if (!raf) raf = requestAnimationFrame(frame)
    }

    const onDown = (e) => {
      if (e.button === 0) ping(e.clientX, e.clientY)
    }
    // Enter or Space on anything inside the list pings from its centre. Nothing
    // is prevented, so a row that is a link or a button still does its job.
    const onKey = (e) => {
      if (e.repeat || e.isComposing || (e.key !== 'Enter' && e.key !== ' ')) return
      const el = e.target
      if (typing(el)) return
      let row = el
      while (row && row.parentElement !== root) row = row.parentElement
      const s = row && rows.get(row)
      const off = s ? s.shown : 0
      const b = el.getBoundingClientRect()
      ping(b.left + b.width / 2 - (s?.y ? 0 : off), b.top + b.height / 2 - (s?.y ? off : 0))
    }
    const onMotion = () => { if (still.matches) settle() }

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      // Nobody sees the rest of the ring; there is nothing to resume later.
      if (!onScreen) settle()
    })
    io.observe(root)

    root.addEventListener('pointerdown', onDown)
    root.addEventListener('keydown', onKey)
    still.addEventListener('change', onMotion)

    return () => {
      io.disconnect()
      root.removeEventListener('pointerdown', onDown)
      root.removeEventListener('keydown', onKey)
      still.removeEventListener('change', onMotion)
      settle()
    }
  }, [])

  return (
    <div ref={rootRef} className={`sonar-list ${className}`.trim()} style={style} {...rest}>
      {children}
    </div>
  )
}
