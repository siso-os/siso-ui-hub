'use client'

import { useEffect, useRef, useState } from 'react'
import './LiquidTransition.css'

/* =========================================================
   LiquidTransition
   Wraps content that changes — a route, a step, a tab. When
   transitionKey changes, a slug of fluid a little longer than
   the box is pushed across it: its front edge covers what was
   there, for a beat the box is full and the new content is
   swapped in underneath, and its back edge uncovers that on
   its way out the other side, shedding droplets.

   A wipe is a straight edge moving at an eased speed. Liquid
   never has a straight edge, and nobody hands it a speed.
   Three things shape a real one, and all three are simulated
   here.

   The walls drag. Fluid pushed along a channel sticks to its
   sides (no-slip), so the middle outruns the edges — the
   parabolic Poiseuille profile, u ∝ x(1 − x). The faster the
   slug moves, the further its middle leads, and as it slows
   the edges catch up.

   The same drag sets the timing. A pump pushing at speed U
   against it does not get the fluid moving at once; the flow
   comes up to speed as

     τ·dv/dt = U − v

   so the cover starts from rest the frame the key changes and
   gathers — what was there is taken away accelerating. The
   pump runs only until the fluid has the momentum to clear
   the box by itself, then cuts out, and the same equation
   with U = 0 coasts the drain to the far wall, slowing all
   the way: what is new is uncovered gently, and takes a
   little longer about it than the cover did.

   No easing curve is involved, so there is nothing to
   restart, and a key that changes again mid-sweep is only a
   different thing asked of the pump. While the fluid is
   covering, it carries on, and swaps in whatever is newest
   when it gets there. If the key goes back to what is still
   on show, nothing is owed any more: the pump reverses and
   the slug backs out the way it came, with no swap. And if
   the key changes while the fluid is draining, the pump
   reverses then too — the edge slows, turns, and runs back
   over what it had uncovered, from where it is, at the speed
   it has. Having covered it the slug simply keeps going, and
   leaves by the wall it came in at: it turns round once, not
   twice, so a change made late costs no more than one made
   at rest.

   The surface has tension. An edge is a line with tension σ
   and a little mass per length μ, so its departures from the
   profile obey the damped wave equation

     ∂²h/∂t² = (σ/μ)·∂²h/∂x² − γ·∂h/∂t

   and ring at f = (1/2L)·√(σ/μ): raise the tension and the
   wobble quickens, which is exactly what surface tension does
   to a real meniscus. The acceleration of the flow is what
   plucks it — the pump starting, cutting out, reversing — so
   a turn-round sloshes harder than a start. Both ends of the
   slug are plucked by the same flow, so they ring alike.
   The pluck levels off where the wave it raises would outgrow
   the box's margin: a real surface thrown that hard breaks up
   rather than stands, so a very short duration or a very
   slack surface rings as far as that and no further.

   Droplets break off the uncovering edge while it runs fast,
   so many to a length of it: a wide edge sheds more than a
   narrow one. Each leaves with the speed the fluid had where
   it broke, which is the Poiseuille profile again — quick
   from the middle, slow by the walls — and after that has
   only its own drag. While it slides it is drawn out along
   its path, and as it stops the tension that rings the edge
   pulls it back into a bead. A droplet is mostly surface, so
   the small ones stop and dry almost at once and the large
   ones carry on. Full cover swallows any still in the air.

   The swap is waited for. The slug is held at full cover
   until the new content is actually in the document, so the
   old is never uncovered however long the render takes, and
   the canvas takes the pointer only until then: nothing can
   be pressed on content that is about to go, and everything
   can the moment its replacement is there.

   Under reduced motion, in a hidden tab, or with the box off
   screen there is nobody to watch, so the content is swapped
   at once and both callbacks still fire. The same goes where
   there is no canvas to draw on: the change is never held up
   for a sweep that cannot be shown.
   ========================================================= */

const NODES = 48
const MARGIN = 0.14     // of the box length: the most an edge may bow or ring
const SLUG = 1.4        // box lengths of fluid: the box, both edges at their furthest out of true, and a beat over
const VISCOUS = 0.285   // τ as a share of duration: how long the flow takes to answer the pump
const PUMP = 6          // U in box lengths per duration; with τ, it lands the end of the drain on `duration`
const CLEAR = 0.2       // how far past a wall the last edge is sent, so it leaves at speed instead of creeping
const SHED = 300        // px/s an edge must be uncovering at before droplets break off it
const SPRAY = 5e-5      // droplets shed per px² the edge uncovers, at droplets = 1: one to a patch about 140 px square
const SMEAR = 800       // px/s of sliding that draws a droplet out by its own length again
const MAX_DROPS = 400

/* How unevenly an edge lags the flow, built from the free string's own modes,
   cos(nπs). A uniform part would only shift the edge, not ring it. */
const LAG = Float32Array.from({ length: NODES }, (_, i) => {
  const s = i / (NODES - 1)
  return 0.55 * Math.cos(2 * Math.PI * s) + 0.3 * Math.cos(3 * Math.PI * s) + 0.15 * Math.cos(5 * Math.PI * s)
})

const clamp = (n, lo, hi) => (n < lo ? lo : n > hi ? hi : n)
const finite = (n, d) => (Number.isFinite(n) ? n : d)

export default function LiquidTransition({
  transitionKey,
  direction = 'up',      // the way the front travels: 'up' | 'down' | 'left' | 'right'
  color = '#e8e4dc',     // the fluid
  duration = 1100,       // ms, cover and drain together; never under 200
  tension = 1,           // surface tension; the wobble frequency goes as √tension
  lead = 1,              // how far the middle outruns the walls
  droplets = 1,          // how many break off, to a length of edge; 0 for none
  onCovered,             // () => void, at full cover, as the content swaps
  onComplete,            // () => void, once the fluid has gone
  children,
  className = '',
  style,
  ...rest
}) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const api = useRef(null)

  /* What is on screen. It follows children while the key holds still, and
     keeps the old content when the key changes, until the fluid covers it. */
  const [view, setView] = useState({ key: transitionKey, children })
  const shown = Object.is(transitionKey, view.key)    // not ===: a NaN key must still equal itself
  if (shown && children !== view.children) {
    setView({ key: transitionKey, children })
  }

  const live = useRef(null)
  // Synced after every render and before the effects below, so the sweep reads
  // current props — and the newest children — without restarting.
  useEffect(() => {
    live.current = { transitionKey, children, direction, color, duration, tension, lead, droplets, onCovered, onComplete }
  })

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!root || !ctx) {
      // Nothing to draw on. The change is still made, only unaccompanied.
      api.current = {
        request: () => {
          const p = live.current
          setView({ key: p.transitionKey, children: p.children })
          p.onCovered?.()
          p.onComplete?.()
        },
        cancel: () => {},
        land: () => {},
      }
      return () => {
        api.current = null
      }
    }

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    let W = 1, H = 1, dpr = 1
    let raf = 0, last = 0
    let phase = 'idle'        // 'idle' | 'cover' (a swap owed) | 'hold' (covered, waiting on the swap) | 'drain'
    let way = 1               // the way the pump pushes: 1 along the sweep, −1 back the way it came
    let coasting = false      // the pump has cut out
    let owed = false          // a swap asked for and not yet made
    let landed = true         // the swapped content is in the document
    let full = false          // both ends of the slug are outside the box: nothing shows through
    let seen = true           // the box is on screen
    let dir = 'up'            // held for the whole sweep, so a prop change cannot turn it mid-air
    let x = 0, v = 0, drive = 0   // the slug's front end and the flow behind it, in box lengths (per second)
    const h = new Float32Array(NODES)       // departure of an edge from its profile, px
    const hv = new Float32Array(NODES)
    const off = new Float32Array(NODES)     // where an edge lies from its end of the slug, px: the bow and the ring
    const drops = []

    const size = () => (dir === 'up' || dir === 'down' ? [H, W] : [W, H])   // [along the sweep, across it]

    const swap = () => {
      const p = live.current
      owed = false
      landed = false
      setView({ key: p.transitionKey, children: p.children })
      p.onCovered?.()
    }

    const advance = (dt) => {
      const p = live.current
      const [along, span] = size()
      const T = Math.max(0.2, finite(p.duration, 1100) / 1000)
      const tau = VISCOUS * T
      const pump = PUMP / T
      const room = MARGIN * along

      // The new content is in: the slug may move on and let it show.
      if (phase === 'hold' && landed) {
        phase = 'drain'
        coasting = false
        root.classList.remove('is-covering')
      }

      if (phase !== 'idle') {
        /* The pump. Up to full cover it simply runs. Draining, it runs until
           the fluid's own momentum — v·τ of travel left in it — will carry the
           slug's last edge clear of the wall it is leaving by, and then cuts
           out. It only comes back on if that stops being true, which a
           duration changed mid-coast can do. */
        if (phase === 'drain') {
          const reach = way > 0 ? x + v * tau - (SLUG + 1) : -(x + v * tau)
          if (reach >= CLEAR) coasting = true
          else if (reach < MARGIN) coasting = false
          drive = coasting ? 0 : way * pump
        } else drive = way * pump

        // τ·dv/dt = U − v, integrated exactly over the frame: the same sweep at any refresh rate.
        const decay = Math.exp(-dt / tau)
        const v0 = v
        x += drive * dt + (v - drive) * tau * (1 - decay)
        v = drive + (v - drive) * decay
        const accel = ((v - v0) / dt) * along      // px/s²

        /* The departure h rings under tension: ∂²h/∂t² = c²·∂²h/∂x² − γ·∂h/∂t,
           free at both walls, plucked by the flow's acceleration through the
           uneven lag. Substeps keep c·dt/dx below 1 and are no longer than
           1/240 s, so it rings the same at 60 Hz and 120 Hz; only on an edge a
           few pixels long does the tension have to give instead. */
        const dx = span / (NODES - 1)
        const c = Math.sqrt(2.5e6 * clamp(finite(p.tension, 1), 0.01, 100))
        const sub = Math.min(96, Math.max(1, Math.ceil(dt * 240), Math.ceil((c * dt) / (0.8 * dx))))
        const k = dt / sub
        const c2 = Math.min(c * c, ((0.8 * dx) / k) ** 2)
        /* The pluck levels off. The lag's main mode answers a steady shove a
           with a wave about 0.77·a/ω² tall at its first swing, ω² = c²·(2π/L)²,
           so the shove is eased toward room·ω² — the one that fills the margin.
           A short duration or a slack surface then rings as far as that and no
           further, where a real one thrown harder would break up, not stand. */
        const brim = room * c2 * ((2 * Math.PI) / span) ** 2
        const pluck = 0.7 * brim * Math.tanh(accel / brim)
        for (let n = 0; n < sub; n++) {
          for (let i = 0; i < NODES; i++) {
            const lap = (h[Math.max(0, i - 1)] - 2 * h[i] + h[Math.min(NODES - 1, i + 1)]) / (dx * dx)
            hv[i] += (c2 * lap - 2.4 * hv[i] - pluck * LAG[i]) * k
          }
          for (let i = 0; i < NODES; i++) h[i] += hv[i] * k
        }
      }

      /* No-slip walls: the middle leads the edges by a Poiseuille parabola, in
         whichever direction the fluid is going. The bow grows with the flow
         and levels off inside the margin, and the ring is eased to stay inside
         it too, so an edge sent past a wall always clears it and neither ever
         shows a flat where a limit cut it off. */
      const most = 0.8 * room
      const bow = most * Math.tanh((v * along * 0.05 * Math.max(0, finite(p.lead, 1))) / most)
      const swing = 0.9 * room
      let lo = Infinity, hi = -Infinity
      for (let i = 0; i < NODES; i++) {
        const s = i / (NODES - 1)
        const o = bow * (4 * s * (1 - s) - 1) + swing * Math.tanh(h[i] / swing)
        off[i] = o
        if (o < lo) lo = o
        if (o > hi) hi = o
      }

      /* The gate. Until the swap has landed the slug is not let past full
         cover: the end that would uncover is stopped just outside its wall. */
      const len = SLUG * along
      if (phase === 'cover' || phase === 'hold') {
        x = way > 0 ? Math.min(x, (len - hi) / along - 1e-6) : Math.max(x, (along - lo) / along + 1e-6)
      }
      const front = x * along
      const tail = front - len
      full = front + lo >= along && tail + hi <= 0

      /* Droplets break off the edge that is uncovering while it runs fast: so
         many to the area it uncovers, anywhere along it, and whole inside the
         walls. Each takes the speed of the fluid where it broke — the profile
         again, quick in the middle and slow by the walls — and its drag and
         its drying both go as 1/r: the small ones stop first. */
      const speed = v * along
      const many = Math.max(0, finite(p.droplets, 1))
      if (phase === 'drain' && many > 0 && speed * way > SHED) {
        const from = way > 0 ? tail : front
        const rate = many * speed * way * dt * span * SPRAY
        let count = Math.floor(rate)
        if (Math.random() < rate - count) count++
        count = Math.min(count, MAX_DROPS - drops.length)
        for (let n = 0; n < count; n++) {
          const s = Math.random()
          const at = s * (NODES - 1)
          const i = Math.min(NODES - 2, Math.floor(at))
          const a = from + off[i] + (off[i + 1] - off[i]) * (at - i)
          if (a < 0 || a > along) continue
          const r = 2 + Math.random() * 6
          drops.push({
            a,
            b: clamp(s * span, Math.min(r, span / 2), Math.max(span - r, span / 2)),
            va: speed * (0.45 + 0.55 * 4 * s * (1 - s)) * (0.85 + Math.random() * 0.15),
            r,
            life: 1,
          })
        }
      }
      let kept = 0
      for (const d of drops) {
        const kd = (1 + 4 / d.r) / tau
        const keep = Math.exp(-kd * dt)
        d.a += (d.va * (1 - keep)) / kd
        d.va *= keep
        d.life -= dt * (1.1 + 2.5 / d.r)
        if (d.life > 0) drops[kept++] = d
      }
      drops.length = kept

      if (phase === 'cover' && full) {
        phase = 'hold'
        drops.length = 0
        swap()
      } else if (phase === 'drain' && (way > 0 ? tail + lo >= along : front + hi <= 0)) {
        // Gone: every part of the slug's last edge is out of the box.
        phase = 'idle'
        v = 0
        drive = 0
      }
    }

    const draw = () => {
      const p = live.current
      const [along, span] = size()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Sweep coordinates — a along the travel, b across it — laid onto the box.
      if (dir === 'up') ctx.setTransform(0, -dpr, dpr, 0, 0, H * dpr)
      else if (dir === 'down') ctx.setTransform(0, dpr, dpr, 0, 0, 0)
      else if (dir === 'left') ctx.setTransform(-dpr, 0, 0, dpr, W * dpr, 0)
      else ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = p.color
      if (phase !== 'idle') {
        // The slug, back edge to front edge. Whatever of it lies outside the box is simply not seen.
        const front = x * along
        const tail = front - SLUG * along
        ctx.beginPath()
        for (let i = 0; i < NODES; i++) ctx.lineTo(tail + off[i], (i / (NODES - 1)) * span)
        for (let i = NODES - 1; i >= 0; i--) ctx.lineTo(front + off[i], (i / (NODES - 1)) * span)
        ctx.closePath()
        ctx.fill()
      }
      for (const d of drops) {
        // Whole for most of its life, then drying to nothing rather than ghosting.
        ctx.globalAlpha = Math.min(1, d.life * 2.5)
        /* A droplet that is sliding is drawn out along its path and trails
           behind its own nose; as drag stops it, tension rounds it into a bead
           again. Drawing it out leaves its volume, length × width², as it was. */
        const r = d.r * (0.4 + 0.6 * d.life)
        const drawn = 1 + Math.min(1.6, Math.abs(d.va) / SMEAR)
        ctx.beginPath()
        ctx.ellipse(d.a - Math.sign(d.va) * r * (drawn - 1), d.b, r * drawn, r / Math.sqrt(drawn), 0, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const finish = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      last = 0
      phase = 'idle'
      full = false
      v = 0
      drive = 0
      drops.length = 0
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      root.classList.remove('is-moving', 'is-covering')
      live.current.onComplete?.()
    }

    const frame = (now) => {
      // Real elapsed time, held to 1/30 s so a stalled tab does not lurch on return.
      const dt = last ? Math.min(1 / 30, (now - last) / 1000) : 1 / 60
      last = now
      if (dt > 0) advance(dt)
      if (phase === 'idle' && !drops.length) {
        raf = 0
        finish()
        return
      }
      draw()
      raf = requestAnimationFrame(frame)
    }

    // Nobody is watching, or nobody wants the motion: make the change and be done.
    const settle = () => {
      const busy = owed || raf !== 0
      if (owed) swap()
      if (busy) finish()
    }

    const fit = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      // Sizing a canvas wipes it; mid-sweep that would flash the content through the fluid.
      if (raf) {
        advance(1e-4)
        draw()
      }
    }

    const request = () => {
      owed = true
      if (calm.matches || !seen || document.hidden) {
        settle()
        return
      }
      if (phase === 'idle') {
        const d = live.current.direction
        const next = d === 'up' || d === 'down' || d === 'left' ? d : 'right'
        if (next !== dir) drops.length = 0    // any still drying were laid out along the last sweep
        dir = next
        way = 1
        x = 0
        v = 0
        h.fill(0)
        hv.fill(0)
        if (Math.min(2, window.devicePixelRatio || 1) !== dpr) fit()    // the window has changed screens
      } else if (phase === 'drain' && !full) {
        way = -way            // turn round and cover again from here
      }
      // Covering already, or still full: carry on. The swap takes whatever is newest when it comes.
      phase = 'cover'
      coasting = false
      root.classList.add('is-moving', 'is-covering')
      if (!raf) {
        last = 0
        raf = requestAnimationFrame(frame)
      }
    }

    // The key is back to what is on show before the fluid covered it: back out, and swap nothing.
    const cancel = () => {
      if (!owed) return
      owed = false
      if (phase !== 'cover') return
      if (!full) way = -way
      phase = 'drain'
      coasting = false
      root.classList.remove('is-covering')
    }

    /* The canvas is measured rather than the root: it fills the root's padding
       box, and its own content box is that size exactly, whatever border the
       root has and whatever transform it sits under. */
    const ro = new ResizeObserver((entries) => {
      const box = entries[entries.length - 1].contentRect
      W = Math.max(1, box.width)
      H = Math.max(1, box.height)
      fit()
    })
    ro.observe(canvas)

    const io = new IntersectionObserver((entries) => {
      seen = entries[entries.length - 1].isIntersecting
      if (!seen) settle()
    })
    io.observe(root)

    const onHide = () => {
      if (document.hidden) settle()
    }
    const onCalm = () => {
      if (calm.matches) settle()
    }
    document.addEventListener('visibilitychange', onHide)
    calm.addEventListener('change', onCalm)

    api.current = { request, cancel, land: () => { landed = true } }

    return () => {
      api.current = null
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onHide)
      calm.removeEventListener('change', onCalm)
      if (raf) cancelAnimationFrame(raf)
      root.classList.remove('is-moving', 'is-covering')
    }
  }, [])

  // What was swapped in has reached the document: the drain may begin. Declared
  // before the request below, so a key that changes in the same render as a
  // swap lands asks for its own swap after this, and is waited for in turn.
  useEffect(() => {
    api.current?.land()
  }, [view])

  // A new key asks for a sweep; the swap happens inside it, at full cover. A
  // key that returns to the one on show before then takes the request back.
  useEffect(() => {
    if (shown) api.current?.cancel()
    else api.current?.request()
  }, [shown, transitionKey, view.key])

  return (
    <div
      ref={rootRef}
      className={`liquid-transition ${className}`.trim()}
      aria-busy={!shown || undefined}
      style={style}
      {...rest}
    >
      <div className="liquid-transition__content">{view.children}</div>
      <canvas ref={canvasRef} className="liquid-transition__canvas" aria-hidden="true" />
    </div>
  )
}
