'use client'

import { useEffect, useRef } from 'react'
import './GravityMenu.css'

/* =========================================================
   GravityMenu
   Menu items holding stable orbits until the cursor arrives
   as a mass and bends their paths past it.

   Each item is a real two-body problem against the pointer:

     F = G·m₁m₂·r / (r² + ε²)^(3/2)

   which is the inverse square with Plummer softening. The ε
   is not a fudge — an unsoftened 1/r² goes to infinity as an
   item passes through the cursor, which in a discrete
   integrator means one frame where the item is flung off
   screen and never returns. Softening caps the force at
   close range; it is what N-body codes do, for exactly this
   reason.

   Items also feel a spring back to their orbital slot, so
   the menu is stable without the cursor and cannot be
   permanently scattered. Take the spring to zero and it
   really does become a free two-body system — items will
   slingshot past the pointer and keep going, which is
   correct and useless as a menu.

   The two pulls are only worth watching when they are of a
   size. Close in, the softened force is itself a spring,
   G·m/ε³ per pixel, and the item comes to rest where that
   one balances the one to its slot: at G·m = spring·ε³ it
   sits halfway between the two, and that is where the
   defaults put it. A mass a hundred times lighter moves
   nothing you could see. One five times heavier gives an
   item two places to rest, and it snaps from one to the
   other — captured — which is the black hole end of the
   softening slider and is meant to be there.

   The orbit itself is kinematic: items advance along a
   circle at an angular rate, and gravity displaces them from
   it. Simulating true orbital mechanics would require the
   menu to have a stable configuration to begin with, and a
   ring of equal masses does not.

   Being kinematic, the orbit is ours to brake, and a menu
   has to be. A target that slides out from under a resting
   cursor is the one thing a menu may not do, so while the
   pointer is on an item, or an item is being pressed, or
   one shows keyboard focus, the ring's rate eases to zero
   and the item is simply there to be clicked; let go and it
   eases back up to speed. The rate goes through two lags
   in series rather than one, so the ring neither stops nor
   starts with a jerk. An item still arriving under a
   pointer that was waiting for it is let in the rest of the
   way, slowing as it comes, so it seats under the cursor
   instead of snagging on its own edge — but it is never
   carried the other way. Which item the pointer is on is
   worked out from the positions the loop has just drawn,
   not from hover events: a browser does not reliably send
   those when it is the item that moved and the mouse that
   stayed.

   The pull helps too: the item you are on is drawn under
   the pointer, never away from it. A push would do the
   opposite, so with repel on the push lets go of the one
   item the pointer has actually reached — it shies off as
   you approach, and gives in when you arrive. A menu that
   can outrun the hand is a toy.

   A press is answered by the loop as well: the item dips
   three percent within 80 ms and comes back over about
   170 ms, as a scale written last in its transform. Left to
   the stylesheet, a scale would be taken about a fixed
   origin and drag the item toward the middle of the ring —
   a few pixels of sideways slip under the finger, on exactly
   the frame it is meant to feel solid.

   The mass does not switch on. It fades in over ~80 ms as
   the pointer enters and out over ~200 ms from wherever it
   left, so nothing is yanked and nothing is dropped. A
   finger has no hover, so its mass arrives with the press
   and leaves with it, and the page still scrolls and
   pinches from anywhere on the ring.

   A change of spin goes through the same two lags. A change
   of orbit moves the slots at once and leaves the items
   where they are, so each rides its own spring out to the
   new ring; a change of items does the same, and keeps the
   ring's phase — a parent that re-renders with a fresh
   array must not send the ring back to its start.

   The springs are stepped in slices no longer than 1/240 s —
   shorter if the props make the well stiffer than that can
   resolve — with the damping applied as an exact decay, so
   the menu moves the same at 60 Hz and 120 Hz. Past what the
   shortest slice resolves, the spring is capped and the
   softening raised to match: a pathological prop set gets a
   stiff menu, not a scattered one. The loop stops when
   nothing is moving — a held ring at rest costs nothing —
   and while the ring is scrolled out of view.

   Arrow keys move focus to whichever ring neighbour lies in
   that direction on screen, since "next" means right at the
   top of a ring and left at the bottom of it. Tab still
   visits every item in order. Under reduced motion the ring
   is drawn once and stays put — no orbit, no pull — and
   everything else works as it did.
   ========================================================= */

const clamp = (n, lo, hi) => (n < lo ? lo : n > hi ? hi : n)
/* A number, or a string that reads as one; anything else is d. */
const finite = (n, d) => {
  const v = typeof n === 'string' ? parseFloat(n) : n
  return Number.isFinite(v) ? v : d
}

const TURN = Math.PI * 2
const STEP = 1 / 240    // s — the longest slice the springs are stepped in
const SLICES = 48       // the most slices one frame is cut into, however stiff the props
const STIFF = 1e6       // 1/s² — the stiffest spring those slices resolve; nothing is let past it
const BRAKE = 0.06      // s — each of the two lags the ring's rate passes through, stopping under a hand
const RESUME = 0.22     // s — and getting back up to speed, or following a change of spin
const ARRIVE = 0.08     // s — how quickly the pointer's mass comes on as it enters
const DEPART = 0.2      // s — and fades from where it left
const GRIP = 0.1        // s — how quickly a push lets go of the item the pointer is on
const DIP = 0.03        // how far a pressed item shrinks, as a fraction of its size
const SINK = 0.025      // s — the lag it goes down on: there within 80 ms
const RISE = 0.055      // s — and comes back up on, over about 170 ms, without overshoot
const REACH = 22        // px — half the smallest target an item offers; the CSS pads it out to match
const SEAT = 3          // px — how far short of centred under the pointer an arriving item stops
const FAR = 600         // px — the furthest an item may be thrown from its slot
const FAST = 6000       // px/s — and the fastest it may be going
const REST_V = 0.4      // px/s — an item slower than this, and
const REST_A = 1        // px/s² — pushed no harder than this, is at rest

/* :focus-visible, for the browsers that have it; where the selector does not
   parse, any focus counts. */
const shown = (el) => {
  try { return el.matches(':focus-visible') } catch { return true }
}

export default function GravityMenu({
  items = [],
  orbit = 130,         // orbital radius, px — `radius` means corner radius library-wide
  spin = 0.16,         // radians per second
  mass = 2.6e6,        // G·m of the pointer, px³/s² — spring·ε³ puts an item halfway to it
  softening = 46,      // ε, px — the reason nothing gets flung away
  spring = 26,         // pull back to the orbital slot, 1/s²
  damping = 7.6,       // 1/s — 2·√spring is critical; this is three quarters of it
  repel = false,       // push instead of pull
  value,               // id of the current item, if the menu has one
  onSelect,
  className = '',
  style,
  ...rest
}) {
  const rootRef = useRef(null)
  const sim = useRef(null)    // the ring's own state, kept across a change of items
  const wake = useRef(null)   // restarts a stopped loop

  const live = useRef({})
  // Synced after every render and before the effect below, so the loop reads
  // current props without being torn down and restarted.
  useEffect(() => {
    live.current = { orbit, spin, mass, softening, spring, damping, repel }
    wake.current?.()
  })

  const list = Array.isArray(items) ? items : []
  // The loop is rebuilt when the set of items changes, not when the array does.
  const order = list.map((item, i) => item.id ?? i).join('\n')

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cells = Array.from(root.querySelectorAll('.gravity-menu__item'))
    const n = cells.length
    if (!n) return

    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    let still = query.matches

    const s = (sim.current ??= {
      phase: 0,
      rate: finite(live.current.spin, 0),   // rad/s the ring is actually turning at
      lead: finite(live.current.spin, 0),   // the first of the two lags it follows
      radius: Math.max(0, finite(live.current.orbit, 0)),
      weight: 0,                            // 0…1 — how much of the pointer's mass has arrived
      px: 0, py: 0,                         // the pointer, from the ring's centre
      inside: false,
      left: null,                           // where the last set of items was left, by element
    })

    // Displacement from the orbital slot, and its velocity.
    const dx = new Float32Array(n)
    const dy = new Float32Array(n)
    const vx = new Float32Array(n)
    const vy = new Float32Array(n)
    const grip = new Float32Array(n)            // 0…1 — how far a push has let go of this item
    const sink = new Float32Array(n)            // 0…1 — how far down a press has taken it
    const x = new Float32Array(n)               // where each item was last drawn, from the centre
    const y = new Float32Array(n)
    const hw = new Float32Array(n).fill(REACH)  // half its target, never less than REACH
    const hh = new Float32Array(n).fill(REACH)

    /* Items that were already on the ring stay where they were drawn and ride
       their springs to the new spacing; only the new ones start on a slot. */
    for (const was of s.left ?? []) {
      const i = cells.indexOf(was.cell)
      if (i < 0) continue
      const a = s.phase + (i / n) * TURN
      dx[i] = was.x - Math.cos(a) * s.radius
      dy[i] = was.y - Math.sin(a) * s.radius
      vx[i] = was.u
      vy[i] = was.v
    }
    s.left = null

    let aim = -1        // the item the pointer is on
    let pressed = -1    // the item being pressed, by pointer or key
    let keyed = false   // whether that press came from the keyboard
    let focused = -1    // the item showing keyboard focus
    let visible = true
    let raf = 0
    let last = 0

    const place = () => {
      for (let i = 0; i < n; i++) {
        const a = s.phase + (i / n) * TURN
        x[i] = Math.cos(a) * s.radius + dx[i]
        y[i] = Math.sin(a) * s.radius + dy[i]
        cells[i].style.transform =
          `translate3d(${x[i].toFixed(2)}px, ${y[i].toFixed(2)}px, 0) translate(-50%, -50%)` +
          (sink[i] > 0 ? ` scale(${(1 - DIP * sink[i]).toFixed(4)})` : '')
      }
    }

    /* The topmost item under the pointer, from the positions just drawn. Later
       siblings paint over earlier ones, so the search runs from the end. */
    const hit = () => {
      if (!s.inside) return -1
      for (let i = n - 1; i >= 0; i--) {
        if (Math.abs(s.px - x[i]) <= hw[i] && Math.abs(s.py - y[i]) <= hh[i]) return i
      }
      return -1
    }

    const mark = (i) => {
      if (i === aim) return
      if (aim >= 0) cells[aim].classList.remove('is-near')
      if (i >= 0) cells[i].classList.add('is-near')
      aim = i
    }

    /* The attribute is there for a stylesheet that wants more of a pressed
       state than the dip the loop draws. */
    const press = (i) => {
      if (i === pressed) return
      if (pressed >= 0) cells[pressed].removeAttribute('data-pressed')
      if (i >= 0) cells[i].setAttribute('data-pressed', '')
      pressed = i
    }

    /* Advance everything by dt. Returns whether anything is still moving. */
    const step = (dt) => {
      const p = live.current
      const whole = Math.max(0, finite(p.mass, 0))   // the pointer's G·m, all of it
      /* Close in, gravity is a spring of G·m/ε³. Softening is what keeps that
         finite, so it is held to at least what the integrator can resolve —
         which only a pathological mass ever reaches. */
      const eps = Math.max(1, finite(p.softening, 0), Math.cbrt(whole / STIFF))
      const k = clamp(finite(p.spring, 0), 0, STIFF)
      const c = Math.max(0, finite(p.damping, 0))
      const push = !!p.repel
      const orbitTo = Math.max(0, finite(p.orbit, 0))

      const spin = finite(p.spin, 0)

      /* A change of orbit moves the slots at once and leaves the items where
         they are, so each rides its own spring out to the new ring. */
      if (orbitTo !== s.radius) {
        for (let i = 0; i < n; i++) {
          const a = s.phase + (i / n) * TURN
          dx[i] += Math.cos(a) * (s.radius - orbitTo)
          dy[i] += Math.sin(a) * (s.radius - orbitTo)
        }
        s.radius = orbitTo
      }

      mark(hit())
      const held = aim >= 0 || pressed >= 0 || focused >= 0
      /* Held, the ring stops — except that an item still arriving under a
         resting pointer is let in the rest of the way, slowing as it comes, so
         it seats under the cursor instead of snagging on its own edge. It is
         never carried the other way: once the pointer is behind its centre,
         or it is pressed or focused, the ring is simply stopped. */
      let coast = 0
      if (aim >= 0 && pressed < 0 && focused < 0) {
        const a = s.phase + (aim / n) * TURN
        const ahead = Math.sign(spin) * ((s.py - y[aim]) * Math.cos(a) - (s.px - x[aim]) * Math.sin(a))
        coast = Math.sqrt(clamp((ahead - SEAT) / REACH, 0, 1))
      }
      const rateTo = held ? spin * coast : spin
      const weightTo = s.inside ? 1 : 0

      // Two lags in series: the rate has no corner in it, stopping or starting.
      const follow = 1 - Math.exp(-dt / (held ? BRAKE : RESUME))
      s.lead += (rateTo - s.lead) * follow
      s.rate += (s.lead - s.rate) * follow
      s.phase = (s.phase + s.rate * dt) % TURN
      s.weight += (weightTo - s.weight) * (1 - Math.exp(-dt / (s.inside ? ARRIVE : DEPART)))

      const GM = whole * s.weight                    // and as much of it as has arrived
      const e2 = eps * eps
      // The slice has to resolve the stiffer of the two springs.
      const stiff = Math.sqrt(k + GM / (e2 * eps))
      const slices = clamp(Math.ceil(dt * Math.max(1 / STEP, stiff * 4)), 1, SLICES)
      const h = dt / slices
      const keep = Math.exp(-c * h)
      const loosen = 1 - Math.exp(-dt / GRIP)

      let moving =
        Math.abs(s.rate - rateTo) > 1e-4 || Math.abs(s.lead - rateTo) > 1e-4 || Math.abs(rateTo) > 1e-4 ||
        Math.abs(s.weight - weightTo) > 0.002

      for (let i = 0; i < n; i++) {
        const a = s.phase + (i / n) * TURN
        const sx = Math.cos(a) * s.radius
        const sy = Math.sin(a) * s.radius

        const gripTo = i === aim || i === pressed ? 1 : 0
        grip[i] += (gripTo - grip[i]) * loosen
        // A pull keeps hold of the item the pointer is on; a push lets go of it.
        const g = push ? -GM * (1 - grip[i]) : GM

        let ex = dx[i], ey = dy[i], u = vx[i], v = vy[i]
        let ax = 0, ay = 0
        for (let m = 0; m < slices; m++) {
          const rx = s.px - sx - ex
          const ry = s.py - sy - ey
          /* Softened inverse square. Without the ε² the force diverges as an
             item crosses the pointer and one frame throws it off screen. */
          const q = rx * rx + ry * ry + e2
          const f = g / (q * Math.sqrt(q))
          ax = rx * f - k * ex
          ay = ry * f - k * ey
          u = (u + ax * h) * keep
          v = (v + ay * h) * keep
          ex += u * h
          ey += v * h
        }

        // A hard cap, so a pathological prop set cannot launch the menu.
        dx[i] = clamp(ex, -FAR, FAR)
        dy[i] = clamp(ey, -FAR, FAR)
        vx[i] = clamp(u, -FAST, FAST)
        vy[i] = clamp(v, -FAST, FAST)

        /* The press, last in the transform so the item shrinks about its own
           centre wherever the ring has put it. */
        const sinkTo = i === pressed ? 1 : 0
        sink[i] += (sinkTo - sink[i]) * (1 - Math.exp(-dt / (sinkTo ? SINK : RISE)))
        if (Math.abs(sink[i] - sinkTo) < 0.01) sink[i] = sinkTo

        if (u * u + v * v > REST_V * REST_V || ax * ax + ay * ay > REST_A * REST_A ||
            (push && Math.abs(grip[i] - gripTo) > 0.01) || sink[i] !== sinkTo) moving = true
      }

      if (!moving) {
        // Settled: land exactly, so nothing creeps while the loop is stopped.
        s.rate = s.lead = rateTo
        s.weight = weightTo
        vx.fill(0)
        vy.fill(0)
        if (!weightTo) { dx.fill(0); dy.fill(0) }
      }
      return moving
    }

    const frame = (now) => {
      const dt = last ? clamp((now - last) / 1000, 0, 1 / 30) : 1 / 60
      last = now
      const moving = step(dt)
      place()
      raf = moving ? requestAnimationFrame(frame) : 0
    }

    const kick = () => {
      if (raf || still || !visible) return
      last = 0
      raf = requestAnimationFrame(frame)
    }

    // Something changed: run the loop, or under reduced motion just redraw.
    const stir = () => (still ? settle() : kick())

    const halt = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    /* Reduced motion: the ring as it stands, every item on its slot. */
    const settle = () => {
      s.rate = s.lead = 0
      s.weight = 0
      s.radius = Math.max(0, finite(live.current.orbit, 0))
      for (const arr of [dx, dy, vx, vy, grip, sink]) arr.fill(0)
      if (pressed >= 0) sink[pressed] = 1
      place()
      mark(hit())
    }

    const point = (e) => {
      const b = root.getBoundingClientRect()
      s.px = e.clientX - b.left - root.clientLeft - root.clientWidth / 2
      s.py = e.clientY - b.top - root.clientTop - root.clientHeight / 2
      s.inside = true
    }

    const onMove = (e) => {
      if (!e.isPrimary) return
      point(e)
      if (still) mark(hit())
      else kick()
    }

    const onLeave = (e) => {
      if (!e.isPrimary) return
      s.inside = false
      if (still) mark(-1)
      else kick()
    }

    const onUp = (e) => {
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      press(-1)
      // A lifted finger is gone; a mouse is still where it was.
      if (e.pointerType === 'touch') s.inside = false
      stir()
    }

    const onDown = (e) => {
      if (!e.isPrimary || e.button > 0) return
      point(e)
      // A finger has no hover: the press is the first the menu hears of it.
      mark(hit())
      keyed = false
      press(cells.indexOf(e.target.closest('.gravity-menu__item')))
      window.addEventListener('pointerup', onUp)
      window.addEventListener('pointercancel', onUp)
      stir()
    }

    // A touch the browser has taken for a scroll: the mass goes with it.
    const onCancel = (e) => {
      if (e.isPrimary) onLeave(e)
    }

    const onKeyDown = (e) => {
      const i = cells.indexOf(e.target)
      if (i < 0 || e.altKey || e.ctrlKey || e.metaKey) return
      if (e.key === 'Enter' || e.key === ' ') {
        keyed = true
        press(i)
        stir()
        return
      }
      const ux = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
      const uy = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0
      if (!ux && !uy) return
      /* Of the two ring neighbours, the one further along the arrow — and only
         if it really is that way. At the top of the ring nothing is further up,
         and the key is left alone to do what it does for the page. */
      const along = (j) => (x[j] - x[i]) * ux + (y[j] - y[i]) * uy
      const next = (i + 1) % n
      const prev = (i + n - 1) % n
      const j = along(next) >= along(prev) ? next : prev
      if (j === i || along(j) < 1) return
      e.preventDefault()
      cells[j].focus()
    }

    const onKeyUp = () => {
      if (keyed) press(-1)
      stir()
    }

    const onFocusIn = (e) => {
      const i = cells.indexOf(e.target)
      focused = i >= 0 && shown(e.target) ? i : -1
      kick()
    }

    // Pressing one item takes focus from another: only a key's press ends here.
    const onFocusOut = () => {
      focused = -1
      if (keyed) press(-1)
      kick()
    }

    const onMotion = () => {
      still = query.matches
      if (still) { halt(); settle() }
      else kick()
    }

    // An item's own size sets its target, and a label can change under it.
    const sizes = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const i = cells.indexOf(entry.target)
        if (i < 0) continue
        const box = entry.borderBoxSize?.[0]
        hw[i] = Math.max(REACH, (box ? box.inlineSize : entry.contentRect.width) / 2)
        hh[i] = Math.max(REACH, (box ? box.blockSize : entry.contentRect.height) / 2)
      }
    })
    for (const cell of cells) sizes.observe(cell)

    // An orbit nobody can see is not worth a frame.
    const seen = typeof IntersectionObserver === 'function'
      ? new IntersectionObserver((entries) => {
          visible = entries[entries.length - 1].isIntersecting
          if (visible) kick()
          else halt()
        })
      : null
    seen?.observe(root)

    const active = document.activeElement
    focused = active && shown(active) ? cells.indexOf(active) : -1

    root.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerdown', onDown, { passive: true })
    root.addEventListener('pointerleave', onLeave, { passive: true })
    root.addEventListener('pointercancel', onCancel, { passive: true })
    root.addEventListener('keydown', onKeyDown)
    root.addEventListener('keyup', onKeyUp)
    root.addEventListener('focusin', onFocusIn)
    root.addEventListener('focusout', onFocusOut)
    query.addEventListener?.('change', onMotion)

    wake.current = stir

    if (still) settle()
    else { place(); kick() }

    return () => {
      wake.current = null
      halt()
      sizes.disconnect()
      seen?.disconnect()
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerdown', onDown)
      root.removeEventListener('pointerleave', onLeave)
      root.removeEventListener('pointercancel', onCancel)
      root.removeEventListener('keydown', onKeyDown)
      root.removeEventListener('keyup', onKeyUp)
      root.removeEventListener('focusin', onFocusIn)
      root.removeEventListener('focusout', onFocusOut)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      query.removeEventListener?.('change', onMotion)
      mark(-1)
      press(-1)
      s.left = cells.map((cell, i) => ({ cell, x: x[i], y: y[i], u: vx[i], v: vy[i] }))
    }
  }, [order])

  return (
    <div
      ref={rootRef}
      className={`gravity-menu ${className}`.trim()}
      style={{ '--gravity-menu-orbit': `${Math.max(0, finite(orbit, 0))}px`, ...style }}
      {...rest}
    >
      {list.map((item, i) => {
        const id = item.id ?? i
        return (
          <button
            key={id}
            type="button"
            className="gravity-menu__item"
            // Where the item sits before the loop has run: the stylesheet lays
            // the ring out from this, so it is there in server-rendered markup.
            style={{ '--gravity-menu-angle': `${(i / list.length) * 360}deg` }}
            aria-current={value !== undefined && value === id ? 'true' : undefined}
            onClick={() => onSelect?.(id, item, i)}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
