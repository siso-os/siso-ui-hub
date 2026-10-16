'use client'

import { useEffect, useRef } from 'react'
import './DepthOfField.css'

/* =========================================================
   DepthOfField
   A stack of cards at different depths, blurred by the same
   equation a camera uses, and focused by where you point: a
   card sharpens as the pointer nears it and softens as the
   pointer leaves.

   Most "depth" effects ramp blur linearly with an index,
   which looks wrong in a specific way: real defocus is not
   symmetric. The circle of confusion for a lens with an
   aperture diameter A and focal length f, focused at z_f, is

     c = A·f·|z − z_f| / (z_f·(z − f)),   A = f / N

   where N is the f-number — the number a photographer
   actually sets. Put N where A goes and the dial runs
   backwards: stopping down to f/16 would blur more.

   The (z − f) in the denominator is what breaks the symmetry:
   something the same distance in front of the focal plane is
   blurred more than something behind it, because the near
   side runs out of room toward the lens. That asymmetry is
   most of what makes a photograph read as a photograph.

   The only thing the pointer chooses is z_f, and it chooses
   it by where it is among the cards. Two versions are
   tempting and both read wrong. Map the pointer's position
   across the stack to a depth, near at the left edge and far
   at the right, and nothing ties a card's place on screen to
   its depth: on a stack that recedes to the right, that sweep
   never once has the card under the pointer as the sharp one.
   Hand the plane to whichever card is under the pointer, and
   it is right at rest and wrong on the way there: a card
   stays exactly as soft as it was until its edge is crossed,
   then clears on a timer, whatever the hand does next. Stop
   two pixels short of a card and nothing happens at all.
   Nothing approaches.

   So z_f is a continuous function of where the pointer is.
   Each card has a visible part, its own box less every card
   in front of it. The card the pointer is on holds the plane
   with a weight of 1, and any other card whose visible part
   is within a blend distance D of the pointer shares it, by
   how close it is: weight (1 − d/D)², the plane at the
   weighted mean of the cards' marks on the focus ring. On the
   edge between two cards both weigh 1 and the plane is
   half-way between them. A blend distance in from that edge
   it is on the one card alone. In between it slides, easing
   out of the one and into the other, and the slope meets
   across the edge. A card therefore sharpens as the pointer
   nears it and softens as the pointer leaves, by where the
   pointer is and not by how long it has been there: stop
   part-way and the blur stays part-way. The rule has no
   memory, so there is nothing to flip-flop: the same point
   always gives the same plane, and a pixel of travel moves it
   by a pixel's worth.

   D comes from the cards themselves: `blend`, two fifths, of
   how deep a pointer can get into the thinnest visible card.
   So every card keeps a middle where it is in focus exactly,
   the same travel blends every edge in the stack, and a stack
   drawn at twice the size blends over twice the travel. Where
   a band of a card narrower than 2D runs between two other
   cards, pointing along it pulls the plane toward that card
   and never all of the way: its middle is somewhere wider.

   The same rule covers a gap. Off every card the nearest one
   leads, and a card no more than D farther off shares the
   plane with it, so between two cards the plane sits between
   them by which is nearer, and a gap up to 2D wide is crossed
   without the plane falling back to rest on the way, which
   would turn one pull into two. Past its last edge a card
   holds the plane for one blend distance and lets it go over
   the next. Beyond that the pointer is on nothing, and the
   plane is where it rests.

   Front to back is the order of the children, the first child
   in front: the stack writes each card's z-index in that
   order, so the part of a card that counts is the part that
   is seen.

   The cards are measured where they rest, with the shift this
   component wrote taken back out. Measure them where parallax
   has leaned them and focus feeds back on itself: a card
   slides under a still pointer, takes the plane, slides back
   out, and the lens hunts at every edge. Resting geometry
   does not move, so a still pointer never starts a rack. A
   card is its border box as its own transform draws it:
   turned, scaled or skewed, it is that parallelogram. A
   rounded corner is squared off, which is lost inside the
   blend, and a child spilling out of its card is not part of
   it. A transform this cannot read (a 3D one, or a turn on an
   ancestor) falls back to the upright box around the card,
   which is checked: the corners are believed only if they
   fill the box the browser reports. The measuring is done
   when a pointer arrives or a finger lands, when the stack or
   a card changes size, when a card is added or removed and
   when the stack scrolls inside itself, never in the frame
   and not on a move. A move costs one read of the stack's own
   box and about fifty multiplications a card: no hit test,
   nothing asked of the cards. A card moved without being
   resized while the pointer stays over the stack is seen when
   the pointer next arrives.

   Position says where the plane should be. It does not put it
   there. A puller's hand on a follow-focus, and the drag of
   the ring under it, make a rack a damped second-order move,
   and it is stepped as one: critically damped, from wherever
   the plane is and however fast it is already travelling. So
   a slow hand is followed closely and the blur reads as
   position, a quick one is followed as one eased pull, and a
   sweep across five cards is one pull to the last of them,
   passing the depths between because they are between, not
   five late racks in a row. A lens that hunts past its mark
   reads as autofocus failing, and critical damping is what
   rules it out: from rest the plane never passes a mark, nor
   one that keeps moving the same way, and a new mark mid-rack
   bends the pull rather than restarting it. The spring is
   solved exactly each frame, not integrated, so it pulls the
   same at 60 Hz and 120 Hz, and a slow frame is stepped in
   full instead of being clamped into slow motion. Only a gap
   long enough to be a hidden tab is cut short, so coming back
   never lands a whole rack in one frame.

   What the spring moves is the ring, not the plane. A focus
   scale is engraved in diopters, 1/z, and rewrite c above as
   A·f·z/(z − f) · |1/z_f − 1/z| and it is linear in exactly
   that: each card's blur is a fixed multiple of how far the
   ring is from that card's mark. That is also why the cards
   share the plane on the ring. Blend, or ease, the plane in z
   and the near card, where 1/z is steep, stays soft for most
   of the way and then snaps sharp at the end of it. On the
   ring every card's blur follows the pointer's share, and the
   spring's own curve, in proportion. `smoothing` keeps its
   old meaning, the fraction of the gap one 60 fps frame
   closes, and sets the spring so its lag behind a moving mark
   is exactly that ease's: at the default a rack is within 1%
   of its mark in about 430 ms. Once every card is within a
   hair of its mark the loop stops.

   The ring is also where the cards stand. Spread them evenly
   in z and they are nowhere near even on the ring: from 200
   to 900 the front card is three fifths of the ring from the
   second, and the last two are a fifteenth of it apart. The
   front card then lives by a rule of its own. Point at it and
   the whole stack goes to the ceiling, point anywhere else
   and it stays there, and its edge is crossed with eleven
   pixels of blur at stake where the last card's has one: a
   jump, where every other card has an approach. So the cards
   are placed the way a focus scale is engraved, at even steps
   of the ring: the first at `near`, the last at `far`, and
   the ones between where equal turns put them, 200, 248, 327,
   480 and 900 for five. Every card is then one equal turn
   from its neighbour, and each sharpens and softens under the
   pointer by the same amount, the front one included. What is
   left of the difference is the lens's own: one turn in front
   of the plane blurs a little harder than one turn behind.
   `focus` is a place on the same ring, so 0 rests the plane
   on the first card, 1 on the last and 0.5 on the middle one.

   The blur ceiling is a shoulder, not a wall: blur is exact
   up to 70% of the ceiling and rolls off toward it above
   that, the way film rolls off a highlight, so a card coming
   down off the ceiling starts gently instead of leaving it at
   full speed. But a shoulder is still flat on top, and a card
   far above it does not answer the ring until the plane is
   nearly on it. That is what the default range is set
   against. From 120 to 900 one step of the ring is 7 to 11 px
   of blur, and a card two steps from the plane is already on
   the shoulder. From 200 a step is about 4 px, a card two
   steps off is still under the knee, and only the far end of
   the stack rolls off.

   Parallax is measured from the plane in focus, the way a
   camera tracking round its subject sees it: a card shifts by
   1/z − 1/z_f, the same diopter distance its blur is made of,
   so the card in focus holds still, cards in front of it lean
   with the pointer and cards behind lean against it. Shift
   every card by its own 1/z instead and the card you are
   pointing at slides under the pointer as you move across it.

   That shift is a product, the eye's offset times a distance
   from the plane, and it is eased as the product. Spring the
   eye and read the plane off the focus pull, and two moves at
   two rates are multiplied together: on a rack from the far
   card to the near one, the near card's lean runs past zero
   and comes back to it, a wobble in what should be one move.
   So the eye carries the pivot with it. The eye's
   offset and that offset times the pivot's 1/z are each on a
   spring at one rate, aimed at where the pointer is and at
   the plane the pointer is asking for, and a card's shift is
   its own 1/z times the first, less the second. Two springs
   at one rate add up to one spring, so every card's shift is
   a single critically damped move to where it will rest, and
   a new mark mid-move bends it the way it bends the pull.
   While the pointer travels, where a card will rest travels
   with it: a card the pointer passes over comes to stillness
   and leans away again, which is position and not a wobble.
   That rate is twice the pull's: the frame moves first and
   focus follows, the way an operator pans and the puller
   catches up. The shift goes on the separate `translate`
   property, so a card's own transform (a centring translate,
   a tilt) is left alone. The price of resting geometry is a
   sliver along an edge where a nearer card leans over the one
   in focus and is drawn under the pointer: as wide as that
   card's lean, a few px at the defaults, and inside the blend
   in any case.

   The plane rests at `focus`. A pointer leaving the stack
   eases it back there, and the eye back to centre, instead of
   freezing wherever it left.

   Keyboard focus inside a card racks to that card's depth,
   since the card being read should be the one in focus: the
   rack is the focus indicator, on top of whatever ring the
   card draws itself. A key has no position, so it takes the
   card whole. Only keyboard focus does it (:focus-visible,
   which a text field also matches when it is clicked, being
   about to be typed in); a click that merely happens to focus
   a card leaves the pointer in charge. Whichever input spoke
   last wins, and a key pressed inside a card counts, so
   nobody types into a blur because the mouse was resting
   somewhere else. A modifier on its own is not a key pressed.
   The pointer takes focus back by actually moving: a nudged
   mouse is not a decision. Focus leaving the stack eases back
   to where the pointer is or the rest position, and while a
   card holds keyboard focus that card, not `focus`, is where
   a pointer on nothing lets the plane go.

   A touch has no hover. A finger that lands has not yet said
   whether it is a tap, a drag or the start of a scroll, so
   nothing moves until it has: lifted where it landed, focus
   racks to the card that was tapped, all of the way, since a
   tap is a choice and not a place; dragged sideways, the
   plane follows the finger as it follows a pointer, card to
   card; moved up or down, the page scrolls and the stack is
   left exactly as it was. A second finger landing makes it a
   pinch, which is the browser's too. A finger lifting from a
   drag leaves the plane on the card it was on or nearest,
   and a finger is not asked to find an edge: a tap or a lift
   just off a card still counts for it, out to where rest has
   the larger share. Focus stays there until a tap beside the
   cards sends it back to rest or `focus` itself changes.
   Nothing parallaxes under a finger: there is no eye to
   follow, and nothing should drift when it lifts.

   Layers that cover one another completely leave nothing to
   point at but the front one. For those, turn `followPointer`
   off and drive `focus` yourself: it rides the same pull.

   A change of aperture, focal length, range, ceiling or
   parallax rides the same kind of pull, about 80 ms behind,
   rather than snapping. Under reduced motion the plane still
   goes where you point, because that change is yours, but it
   is there at once with nothing easing after it, and nothing
   parallaxes.
   ========================================================= */

const clamp = (n, lo, hi) => (n < lo ? lo : n > hi ? hi : n)
const finite = (n, d) => (Number.isFinite(n) ? n : d)
// Hundredths of a pixel, which is as fine as a card is ever written. Never −0, never NaN.
const px = (n) => (Number.isFinite(n) ? Math.round(n * 100) / 100 : 0) || 0

const EASE = 0.08  // s: how far the lens trails a change of aperture, focal length, range, ceiling or parallax
const DT_MAX = 0.1 // s: the longest step one frame may take. The spring is exact at any step, so this only stops a tab coming back from landing a whole rack at once
const EPS = 5e-4   // of the ring's travel: how close the plane must be to its mark to count as there (~0.02px of blur)
const PX = 4.1     // screen px per unit of confusion: f/2.8 at 50mm reads as a shallow lens on a stack a few hundred px across
const KNEE = 0.7   // of the blur ceiling: where the shoulder starts
const GRID = 9     // points tried along each side of a card when its deepest visible point is looked for
const MODIFIER = /^(Shift|Control|Alt|Meta|AltGraph|CapsLock|Fn)$/
const SLOP = 8     // px: what a finger travels before it is a drag or a scroll, and a pointer before it takes focus back from the keyboard

/* The focus ring, in diopters: q runs 0 at `near` to 1 at `far`, linear in
   1/z, and `depth` takes a place on it back to a distance. The cards and
   `focus` are both places on the ring. A range that reaches the lens has no
   diopters to speak of, so there the ring simply runs in z. Past the far end
   the ring runs out at infinity, and stays there. */
const flat = (n, fa) => !(n > 0 && fa > 0) || n === fa
const depth = (q, n, fa) => {
  if (flat(n, fa)) return n + (fa - n) * q
  const u = 1 / n + (1 / fa - 1 / n) * q
  return u > 1e-9 ? 1 / u : 1e9
}

// The card an element sits in: the stack's direct child above it, or null.
const cardOf = (root, el) => {
  while (el && el.parentElement !== root) el = el.parentElement
  return el
}
// Keyboard focus, as opposed to a click that happened to focus something.
const keyed = (el) => {
  try { return el.matches(':focus-visible') } catch { return true }
}

/* Circle of confusion, in the same units as the depths. The near/far
   asymmetry lives entirely in the (z − f) term. A card at the focal length,
   or a plane at the lens, is infinitely soft, which the blur ceiling keeps a card. */
const coc = (z, zFocus, A, f) => {
  const den = zFocus * (z - f)
  if (Math.abs(den) < 1e-9) return Math.abs(z - zFocus) < 1e-9 ? 0 : Infinity
  return Math.abs((A * f * (z - zFocus)) / den)
}

/* The ceiling: c itself up to the knee, then an exponential roll-off that
   meets it there in value and slope and never passes `max`. */
const shoulder = (c, max) => {
  const knee = KNEE * max
  return c <= knee ? c : max - (max - knee) * Math.exp(-(c - knee) / (max - knee))
}

/* One exact step of a critically damped spring toward `to`, at natural
   frequency w: x(t) = to + (e + (v + w·e)·t)·e^(−w·t), e the offset. */
const pull = (s, to, w, dt) => {
  const e = s.x - to
  const a = s.v + w * e
  const d = Math.exp(-w * dt)
  s.x = to + (e + a * dt) * d
  s.v = (s.v - w * a * dt) * d
}
// On its mark and all but stopped. A spring crossing its mark at speed is not there yet.
const there = (s, to, tol) => Math.abs(s.x - to) <= tol && Math.abs(s.v) <= tol * 60

/* Signed distance from a point to a card's box as it is drawn: four corners
   in order, wound so the inside is to the left of every edge. Negative inside. */
const signed = (q, x, y) => {
  let d2 = Infinity, inside = true
  for (let k = 0; k < 8; k += 2) {
    const x0 = q[k], y0 = q[k + 1]
    const ex = q[(k + 2) & 7] - x0, ey = q[(k + 3) & 7] - y0
    const dx = x - x0, dy = y - y0
    const t = clamp((dx * ex + dy * ey) / (ex * ex + ey * ey), 0, 1)
    const rx = dx - ex * t, ry = dy - ey * t
    const r2 = rx * rx + ry * ry
    if (r2 < d2) d2 = r2
    if (ex * dy - ey * dx < 0) inside = false
  }
  return inside ? -Math.sqrt(d2) : Math.sqrt(d2)
}

export default function DepthOfField({
  aperture = 2.8,        // f-number: smaller is a shallower depth of field
  focal = 50,            // mm
  near = 200,            // depth of the frontmost card, in the same units
  far = 900,             // depth of the rearmost; the cards between stand at even steps of the focus ring
  focus = 0.35,          // where the focal plane rests on that ring: 0 the first card, 1 the last
  followPointer = true,  // focus by where the pointer is among the cards, or a finger
  followKeyboard = true, // rack to a card while keyboard focus is inside it
  blend = 0.4,           // how far a neighbour's pull reaches into a card: a fraction of the way to the middle of the thinnest one, 0 switches at the edge
  maxBlur = 14,          // px, so a wildly out-of-focus card stays a card
  parallax = 0.04,       // how much depth shifts a card with the pointer, either side of the plane in focus
  smoothing = 0.12,      // how closely the pull follows: the gap one 60 fps frame closes, 1 is instant
  children,
  className = '',
  style,
  ...rest
}) {
  const rootRef = useRef(null)
  const live = useRef({})
  const wake = useRef(null)
  // Synced after every render and before the effect below, so the loop reads
  // current props without being torn down and restarted. A prop change is not
  // a pointer move, so it also wakes the loop to re-aim and repaint.
  useEffect(() => {
    live.current = {
      aperture, focal, near, far, focus, followPointer, followKeyboard, blend, maxBlur, parallax, smoothing,
    }
    wake.current?.()
  })

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    // Live: a card added or removed is picked up on the next frame.
    const cards = root.children
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    let still = mq.matches

    // What the props ask of the lens, and what it is set to on the way there (N as ln N, in stops).
    const aim = { lnN: 0, f: 0, n: 0, fa: 0, mb: 0, pk: 0 }
    const lens = {}
    for (const key in aim) lens[key] = { x: 0, v: 0 }
    const plane = { x: 0, v: 0 }               // focal plane, on the ring: 0..1 in diopters, near..far
    const eyeX = { x: 0.5, v: 0 }, eyeY = { x: 0.5, v: 0 }  // parallax eye, normalised
    const pivX = { x: 0, v: 0 }, pivY = { x: 0, v: 0 }      // the eye's offset times far/z of the plane it pivots on

    let lx = 0.5, ly = 0.5     // the pointer, normalised to the stack
    const at = { x: 0, y: 0 }  // where a pointer or a dragging finger last was, in the window
    let over = false           // a mouse or pen is over the stack
    let finger = null          // a finger that has landed and not yet said what it is: { id, x, y }
    let drag = null            // the id of a finger dragging across the cards
    let kept = null            // the card a finger chose and lifted from, which keeps the plane
    let held = null            // the card keyboard focus is inside
    let byKey = false          // the keyboard spoke more recently than the pointer
    let from = null            // where the pointer first moved after that, which it must leave: { x, y }
    let resting = NaN          // `focus`, as last seen
    let raf = 0, last = 0
    let onScreen = true

    // The cards where they rest, in the stack's own box: per card, four corners
    // and the upright box around them, or null for a card that is not drawn.
    const quads = []
    let stale = true           // the cards have not been measured since they last may have moved
    let thin = 0               // px: how deep a pointer can get into the thinnest visible card
    // What the pointer's place asks for: the cards sharing the plane and their
    // weights, the bare stage's share of it, and the card it is on or nearest.
    const share = [], weight = [], dist = []
    let shares = 0, bare = 1, lead = -1

    // Each card's own inline values, restored on unmount, and what was last
    // written, so an unchanged card is not written again.
    const saved = new WeakMap()

    const target = () => {
      const L = live.current
      aim.lnN = Math.log(Math.max(0.1, finite(L.aperture, 2.8)))
      aim.f = finite(L.focal, 50)
      aim.n = finite(L.near, 200)
      aim.fa = finite(L.far, 900)
      aim.mb = Math.max(0, finite(L.maxBlur, 14))
      aim.pk = still ? 0 : finite(L.parallax, 0.04)
    }

    /* How deep a point is inside card i's visible part: inside its own box and
       outside every box in front. Stops early once it cannot beat `floor`. */
    const depthIn = (i, x, y, floor) => {
      let d = -signed(quads[i], x, y)
      for (let j = 0; j < i && d > floor; j++) {
        const q = quads[j]
        // Further outside the box around a card than d is no nearer to the card.
        if (!q || x < q[8] - d || x > q[10] + d || y < q[9] - d || y > q[11] + d) continue
        const s = signed(q, x, y)
        if (s < d) d = s
      }
      return d
    }

    /* The deepest point of card i's visible part: the best of a grid across
       the card, crowded toward its edges, where what shows of an overlapped
       card is, then climbed from there in halving steps. 0 if none of it shows. */
    const deepest = (i) => {
      const q = quads[i]
      const cx = (q[0] + q[4]) / 2, cy = (q[1] + q[5]) / 2
      const ax = (q[2] - q[0]) / 2, ay = (q[3] - q[1]) / 2
      const bx = (q[6] - q[0]) / 2, by = (q[7] - q[1]) / 2
      let best = 0, bs = 0, bt = 0
      const tryAt = (s, t) => {
        const d = depthIn(i, cx + s * ax + t * bx, cy + s * ay + t * by, best)
        if (d > best) { best = d; bs = s; bt = t; return true }
        return false
      }
      const node = (k) => -Math.cos((Math.PI * (k + 0.5)) / GRID)
      for (let m = 0; m < GRID; m++) {
        for (let k = 0; k < GRID; k++) tryAt(node(k), node(m))
      }
      if (!(best > 0)) return 0
      for (let step = 1 / GRID, tries = 0; step > 1 / 512 && tries < 96; tries++) {
        const s0 = bs, t0 = bt
        let deeper = false
        for (let m = -1; m <= 1; m++) {
          for (let k = -1; k <= 1; k++) if ((k || m) && tryAt(s0 + k * step, t0 + m * step)) deeper = true
        }
        if (!deeper) step /= 2
      }
      return best
    }

    /* The cards where they rest. Layout is read here and nowhere else, and
       only from a handler or an observer, never from the frame. */
    const measure = () => {
      stale = false
      const b = root.getBoundingClientRect()
      // A shift is written in layout px and drawn at the ancestors' scale.
      const zx = root.offsetWidth ? b.width / root.offsetWidth || 1 : 1
      const zy = root.offsetHeight ? b.height / root.offsetHeight || 1 : 1
      const count = cards.length
      quads.length = count
      for (let i = 0; i < count; i++) {
        const el = cards[i], rec = saved.get(el), r = el.getBoundingClientRect()
        quads[i] = null
        const hw = r.width / 2, hh = r.height / 2
        if (!(hw > 0 && hh > 0)) continue   // not drawn, so nothing to point at
        const cx = r.left + hw - b.left - (rec ? rec.dx * zx : 0)
        const cy = r.top + hh - b.top - (rec ? rec.dy * zy : 0)
        // Half its width and half its height, as vectors: upright unless its own transform turns them.
        let ax = hw, ay = 0, bx = 0, by = hh
        const w = el.offsetWidth / 2, h = el.offsetHeight / 2
        if (w > 0 && h > 0) {
          const cs = getComputedStyle(el)
          const m = /^matrix\(([^)]+)\)/.exec(cs.transform)
          const t = m ? m[1].split(',').map(Number) : [1, 0, 0, 1]
          const sc = cs.scale && cs.scale !== 'none' ? cs.scale.split(' ').map(Number) : [1]
          const sx = sc[0], sy = sc.length > 1 ? sc[1] : sc[0]
          const turn = ((parseFloat(cs.rotate) || 0) * Math.PI) / 180
          const co = Math.cos(turn), si = Math.sin(turn)
          // `transform`, then `scale`, then `rotate`, then the ancestors' zoom.
          const drawn = (x, y) => {
            const u = (t[0] * x + t[2] * y) * sx, v = (t[1] * x + t[3] * y) * sy
            return [(u * co - v * si) * zx, (u * si + v * co) * zy]
          }
          const p = drawn(w, 0), q = drawn(0, h)
          // Believed only if they fill the box the browser measured: a 3D
          // transform or a turned ancestor does not, and keeps the upright box.
          // Then fitted to that box exactly, since layout sizes are whole px.
          const fx = hw / (Math.abs(p[0]) + Math.abs(q[0])), fy = hh / (Math.abs(p[1]) + Math.abs(q[1]))
          const tol = 0.02 + 1 / Math.max(hw, hh)
          if (Math.abs(fx - 1) <= tol && Math.abs(fy - 1) <= tol) {
            ax = p[0] * fx; ay = p[1] * fy; bx = q[0] * fx; by = q[1] * fy
          }
        }
        const wind = ax * by - ay * bx
        if (!wind) continue                 // squashed flat
        if (wind < 0) { bx = -bx; by = -by }   // mirrored: wind it the other way round
        const ex = Math.abs(ax) + Math.abs(bx), ey = Math.abs(ay) + Math.abs(by)
        quads[i] = [
          cx - ax - bx, cy - ay - by, cx + ax - bx, cy + ay - by,
          cx + ax + bx, cy + ay + by, cx - ax + bx, cy - ay + by,
          cx - ex, cy - ey, cx + ex, cy + ey,
        ]
      }
      thin = Infinity
      for (let i = 0; i < count; i++) {
        const d = quads[i] ? deepest(i) : 0
        if (d > 0 && d < thin) thin = d
      }
      if (thin === Infinity) thin = 0
    }

    /* What a place in the window asks of the plane. A card's distance to its
       visible part is taken as the larger of two: the distance to its own
       box, and how deep the point is inside a box in front of it. That is
       exact inside the visible part, never more than the true distance
       outside it, and continuous everywhere, so the shares are too. Run from
       a handler or an observer, like `measure`. */
    const ask = (x, y) => {
      if (stale) measure()
      const b = root.getBoundingClientRect()
      const D = Math.max(0, finite(live.current.blend, 0.4)) * thin
      const count = quads.length
      let front = Infinity, lo = Infinity
      lead = -1
      for (let i = 0; i < count; i++) {
        const q = quads[i]
        if (!q) { dist[i] = Infinity; continue }
        const s = signed(q, x - b.left, y - b.top)
        const v = s > -front ? s : -front
        dist[i] = v
        if (s < front) front = s
        if (v < lo) { lo = v; lead = i }
      }
      // On a card, a neighbour counts by how far its visible part is. Off them
      // all, by how much farther it is than the nearest. The two agree on an edge.
      const level = lo > 0 ? lo : 0
      shares = 0
      if (lead >= 0 && D > 0) {
        for (let i = 0; i < count; i++) {
          const u = (dist[i] - level) / D
          if (u < 1) { share[shares] = i; weight[shares++] = u > 0 ? (1 - u) * (1 - u) : 1 }
        }
      } else if (lead >= 0) { share[0] = lead; weight[0] = 1; shares = 1 }
      // Off every card the lead holds the plane for D and lets it go over the next D.
      // With no blend it is let go at the edge as drawn, which is snapped to whole
      // pixels: a box measured a fraction of a pixel short still has the pointer on it.
      const out = lead < 0 ? 1 : D > 0 ? clamp((lo - D) / D, 0, 1) : lo > 0.5 ? 1 : 0
      bare = out * out * (3 - 2 * out)
      return b
    }

    // Where the plane is aimed, on the ring: the card holding keyboard focus,
    // else where the pointer's place puts it, else the rest position.
    const mark = () => {
      const L = live.current
      const count = cards.length
      const fo = finite(L.focus, 0.35)
      // A new rest position is the author speaking, and outranks an old tap.
      if (fo !== resting) { resting = fo; kept = null }
      // A card's mark is its place in the stack: even steps of the ring, front to back.
      const mk = (i) => (count > 1 ? i / (count - 1) : 0)
      const markOf = (card) => mk(Array.prototype.indexOf.call(cards, card))
      const key = L.followKeyboard && held
      if (key && byKey) return markOf(held)
      // With nothing pointed at, the plane goes to the card being read, or to rest.
      const base = key ? markOf(held) : fo
      if (!L.followPointer) return base
      if (over || drag !== null) {
        let sum = 0, q = 0
        for (let k = 0; k < shares; k++) {
          if (share[k] < count) { sum += weight[k]; q += weight[k] * mk(share[k]) }
        }
        return sum > 0 ? q / sum + bare * (base - q / sum) : base
      }
      return kept ? markOf(kept) : base
    }

    const paint = () => {
      const f = lens.f.x, n = lens.n.x, fa = lens.fa.x, pk = lens.pk.x
      const mb = Math.max(0, lens.mb.x)
      const count = cards.length
      const zf = depth(plane.x, n, fa)
      const A = f / Math.exp(lens.lnN.x)
      // The eye's shift per unit of 1/z, and the pivot's own share of it, which
      // every card gives back.
      const ex = (eyeX.x - 0.5) * pk * fa * 100, ey = (eyeY.x - 0.5) * pk * fa * 40
      const bx = pivX.x * pk * 100, by = pivY.x * pk * 40
      for (let i = 0; i < count; i++) {
        const el = cards[i]
        let rec = saved.get(el)
        if (!rec) {
          rec = { filter: el.style.filter, translate: el.style.translate, zIndex: el.style.zIndex, b: null, dx: 0, dy: 0, t: null }
          saved.set(el, rec)
          el.style.zIndex = String(count - i)
        }
        // Each card at its mark: even steps of the ring from near to far, front card first.
        const z = count === 1 ? n : depth(i / (count - 1), n, fa)
        const blur = shoulder(coc(z, zf, A, f) * PX, mb)
        // Parallax is the diopter distance from the pivot, signed: in front of
        // it leans with the eye, behind it against, on it not at all.
        const u = z ? 1 / z : 0
        rec.dx = px(ex * u - bx)
        rec.dy = px(ey * u - by)
        const b = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : ''
        const t = `${rec.dx}px ${rec.dy}px`
        if (b !== rec.b) { el.style.filter = b; rec.b = b }
        if (t !== rec.t) { el.style.translate = t; rec.t = t }
        const zi = String(count - i)
        if (el.style.zIndex !== zi) el.style.zIndex = zi
      }
    }

    const frame = (now) => {
      raf = 0
      const dt = last ? clamp((now - last) / 1000, 0, DT_MAX) : 1 / 60
      last = now
      const s = clamp(finite(live.current.smoothing, 0.12), 0.01, 1)
      const snap = still || s >= 1
      let moving = false

      // The lens first, so the mark is read off the ring as it now stands.
      target()
      for (const key in aim) {
        const sp = lens[key], to = aim[key]
        if (!snap) pull(sp, to, 2 / EASE, dt)
        if (snap || there(sp, to, 1e-4 * (Math.abs(to) + 1))) { sp.x = to; sp.v = 0 }
        else moving = true
      }

      // The eye follows a mouse or pen while it is over, and nothing else.
      const to = mark()
      const ex = over ? lx : 0.5, ey = over ? ly : 0.5
      // The pivot is the plane's mark, not the plane on its way there. A mark
      // resting outside the stack pivots on the nearer end of it, so a plane
      // parked at the lens throws nothing.
      const n = lens.n.x, fa = lens.fa.x
      const zp = clamp(depth(to, n, fa), Math.min(n, fa), Math.max(n, fa))
      const g = zp ? fa / zp : 0
      const bx = (ex - 0.5) * g, by = (ey - 0.5) * g
      if (!snap) {
        // The pull's lag behind a moving mark is 2/w, the one-frame ease's τ.
        const w = -120 * Math.log(1 - s)
        pull(plane, to, w, dt)
        // The eye and its pivot share one rate, so each card's shift, which is
        // linear in the two, is itself one spring and cannot double back.
        pull(eyeX, ex, 2 * w, dt)
        pull(eyeY, ey, 2 * w, dt)
        pull(pivX, bx, 2 * w, dt)
        pull(pivY, by, 2 * w, dt)
        if (!there(plane, to, EPS) || !there(eyeX, ex, EPS) || !there(eyeY, ey, EPS) ||
            !there(pivX, bx, EPS) || !there(pivY, by, EPS)) moving = true
      }
      // Settled, or told to land at once: sit exactly on the marks, at rest.
      if (!moving) {
        plane.x = to; eyeX.x = ex; eyeY.x = ey; pivX.x = bx; pivY.x = by
        plane.v = eyeX.v = eyeY.v = pivX.v = pivY.v = 0
      }

      paint()
      if (moving && onScreen) raf = requestAnimationFrame(frame)
      else last = 0
    }

    const kick = () => {
      if (raf || !onScreen) return
      raf = requestAnimationFrame(frame)
    }

    // The same place asked again, after the cards or `blend` may have changed.
    const again = () => {
      if (over || drag !== null) ask(at.x, at.y)
      kick()
    }
    const moved = () => {
      stale = true
      again()
    }

    const onDown = (e) => {
      if (e.pointerType === 'touch') {
        // Not yet a tap, a drag or a scroll, so nothing moves. A second finger
        // makes it a pinch, and the first is no longer about to be a tap.
        if (e.isPrimary) { finger = { id: e.pointerId, x: e.clientX, y: e.clientY }; drag = null }
        else finger = null
        stale = true
        return
      }
      byKey = false
      onMove(e)
    }
    // A move, or the page scrolling a card in under a pointer that has not moved.
    const onMove = (e) => {
      if (e.pointerType === 'touch') {
        if (e.type !== 'pointermove') return
        if (finger && e.pointerId === finger.id) {
          const dx = e.clientX - finger.x, dy = e.clientY - finger.y
          if (Math.hypot(dx, dy) < SLOP) return
          finger = null
          // Up or down is a scroll, and the page's. Sideways is ours.
          if (Math.abs(dx) <= Math.abs(dy) || !live.current.followPointer) return
          drag = e.pointerId
        }
        if (e.pointerId !== drag) return
        at.x = e.clientX
        at.y = e.clientY
        ask(at.x, at.y)
        kept = null
        byKey = false
        kick()
        return
      }
      // A pointer arriving measures the cards afresh: they may have moved while it was away.
      if (!over) stale = true
      at.x = e.clientX
      at.y = e.clientY
      // Read in the handler, before the frame writes anything, so the layout is clean.
      const b = ask(at.x, at.y)
      lx = clamp((at.x - b.left) / Math.max(1, b.width), 0, 1)
      ly = clamp((at.y - b.top) / Math.max(1, b.height), 0, 1)
      over = true
      kept = null
      if (byKey) {
        // The keyboard has the plane until the pointer has really moved.
        if (!from) from = { x: e.clientX, y: e.clientY }
        else if (Math.hypot(e.clientX - from.x, e.clientY - from.y) > SLOP) byKey = false
      }
      kick()
    }
    // A finger has no hover to leave with: focus stays on the card it left.
    const onLift = (e) => {
      if (e.pointerType !== 'touch') return
      if (finger && e.pointerId === finger.id) {
        finger = null
        // Lifted where it landed is a tap. A cancel was the browser taking the gesture.
        if (e.type !== 'pointerup' || !live.current.followPointer) return
        ask(e.clientX, e.clientY)
      } else if (e.pointerId === drag) drag = null   // where the drag last was still stands
      else return
      // On a card or within its hold, the plane goes there and stays. Beside them all, it goes home.
      kept = lead >= 0 && bare < 0.5 ? cards[lead] : null
      byKey = false
      kick()
    }
    const onLeave = (e) => {
      if (e.pointerType === 'touch') return
      over = false
      kick()
    }
    const byKeyboard = (card) => {
      held = card
      byKey = true
      from = null
      kick()
    }
    // Keyboard focus racks to its card. A click that focuses a card is the
    // pointer's business, unless it lands in the card already held, which is
    // also how the window regaining focus arrives.
    const onFocusIn = (e) => {
      const card = cardOf(root, e.target)
      if (!card) return
      if (keyed(e.target)) byKeyboard(card)
      else {
        if (card !== held) { held = null; byKey = false }
        kick()
      }
    }
    const onFocusOut = (e) => {
      if (!document.hasFocus()) return   // the window lost focus; the card has not
      if (e.relatedTarget && root.contains(e.relatedTarget)) return   // focusin re-aims
      held = null
      byKey = false
      kick()
    }
    // A key pressed inside a card is that card being used, however focus got
    // there. Shift or Cmd going down alone is only a hand resting on the keys.
    const onKeyDown = (e) => {
      if (MODIFIER.test(e.key)) return
      const card = cardOf(root, e.target)
      if (card) byKeyboard(card)
    }
    const onMotionPref = () => {
      still = mq.matches
      kick()
    }

    const io = new IntersectionObserver(([en]) => {
      onScreen = en.isIntersecting
      if (!onScreen) {
        if (raf) cancelAnimationFrame(raf)
        raf = 0
        last = 0
      } else kick()   // resume a rack that was cut off, from where it stood
    })
    io.observe(root)
    // The stack or a card changing size moves the edges the pointer is measured against.
    const ro = new ResizeObserver(moved)
    const watch = () => {
      ro.disconnect()
      ro.observe(root)
      for (let i = 0; i < cards.length; i++) ro.observe(cards[i])
    }
    watch()
    // A card that was tapped or held keyboard focus, and has been removed, holds nothing.
    const mo = new MutationObserver(() => {
      if (held && held.parentElement !== root) held = null
      if (kept && kept.parentElement !== root) kept = null
      watch()
      moved()
    })
    mo.observe(root, { childList: true })

    // First paint lands on the rest position, settled.
    target()
    for (const key in aim) lens[key].x = aim[key]
    plane.x = mark()
    paint()

    root.addEventListener('pointerdown', onDown, { passive: true })
    root.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerover', onMove, { passive: true })
    root.addEventListener('pointerup', onLift)
    root.addEventListener('pointercancel', onLift)
    root.addEventListener('pointerleave', onLeave)
    root.addEventListener('focusin', onFocusIn)
    root.addEventListener('focusout', onFocusOut)
    root.addEventListener('keydown', onKeyDown)
    // Cards scrolled inside the stack have moved under the pointer; the page scrolling moves them with it.
    root.addEventListener('scroll', moved, { capture: true, passive: true })
    mq.addEventListener('change', onMotionPref)
    wake.current = again

    return () => {
      wake.current = null
      io.disconnect()
      ro.disconnect()
      mo.disconnect()
      mq.removeEventListener('change', onMotionPref)
      root.removeEventListener('pointerdown', onDown)
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerover', onMove)
      root.removeEventListener('pointerup', onLift)
      root.removeEventListener('pointercancel', onLift)
      root.removeEventListener('pointerleave', onLeave)
      root.removeEventListener('focusin', onFocusIn)
      root.removeEventListener('focusout', onFocusOut)
      root.removeEventListener('keydown', onKeyDown)
      root.removeEventListener('scroll', moved, { capture: true })
      if (raf) cancelAnimationFrame(raf)
      for (const el of Array.from(cards)) {
        const rec = saved.get(el)
        if (!rec) continue
        el.style.filter = rec.filter
        el.style.translate = rec.translate
        el.style.zIndex = rec.zIndex
      }
    }
  }, [])

  const cls = ['depth-of-field', followPointer && 'depth-of-field--follow', className]
    .filter(Boolean).join(' ')

  return (
    <div ref={rootRef} className={cls} style={style} {...rest}>
      {children}
    </div>
  )
}
