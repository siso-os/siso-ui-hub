'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { createGL, createLoop, linearRGB, loadImage } from '../gl-core/gl.js'
import './HalftoneScreen.css'

// Before paint in the browser; on the server, where a layout effect only warns, a plain one.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/* =========================================================
   HalftoneScreen
   An image resolved into four-colour process halftone, the
   way a press prints it: cyan, magenta, yellow and black
   each screened into dots on its own rotated grid. Hover to
   look through a loupe.

   The common "halftone" filter draws one grid of dots sized
   by brightness. Print never looked like that, for two
   reasons this component keeps.

   Each ink is screened at its own angle — C 15°, M 75°,
   Y 0°, K 45°. Grids at close angles beat against each
   other into a coarse moiré; 30° apart, the interference is
   pushed down to a small, even rosette, which is the texture
   everyone recognises from a magazine under a loupe.

   And ink coverage is dot AREA, not radius. A dot radius r in
   a unit cell covers πr² until it touches its neighbours at
   r = ½; past that the circle is clipped by the cell, so

     A(r) = πr² − 4·(r²·acos(1/2r) − ½·√(r² − ¼))

   until the cell is solid at r = √½. Sizing radius linearly
   with tone crushes the shadows; the shader inverts A(r) by
   bisection instead, so 30% ink is 30% of the paper covered.

   Colour separation uses grey-component replacement: the
   grey that cyan, magenta and yellow share is printed as
   black instead, which is what presses do to keep shadows
   neutral and wet ink off the page. Inks are filters, so
   they compose by multiplication over the paper.

   The loupe is a glass, not a hole that opens. A magnifier
   of focal length f held a distance d above the page
   enlarges by

     m = f / (f − d)

   so lying on the paper it magnifies nothing, and raised
   toward f it magnifies without limit. A loupe that opens
   like an iris — its radius growing from nothing, at full
   power — is a hole spreading in the page, and one that
   simply appears is a sticker. This one keeps its size and
   is animated in d, the one thing a hand changes: it is on
   the picture, flat, where it cannot be seen, and it rises
   to the height that gives `magnification`; leaving, it is
   lowered again. Pressing lifts it a little further, and
   because m runs away near f a little is enough for a
   closer look.

   The same steepness makes the two ways different. Most of
   the enlargement is in the last of the lift, so it is the
   last thing to arrive on the way up and the first to go on
   the way down. Up, that is a kindness: a spring pulls its
   hardest at the start, and at the start the glass magnifies
   least, so nobody sees the jolt. Down, the same start lands
   where it magnifies most, and nearly half the enlargement
   is gone in a thirtieth of a second. That is a pop. So a
   glass being lowered is not let go of: the hand eases into
   the descent and the glass follows the hand, three lags in
   a row where the rise has two, and it is given exactly as
   long to come down as it took to come up. It never looks
   that long. With the enlargement the first thing to go, it
   reads as put down in about two thirds of the time, which
   is the head start a thing leaving ought to have.

   Height and position are critically damped springs, solved
   exactly over the real time since the last frame, so a
   120 Hz display does not run them twice as fast, a glass
   turned round mid-rise carries on from the height and
   speed it had, and nothing overshoots: glass is heavy. It
   trails the hand by `trail`, enough to read as a thing
   being carried and not enough to read as lag, and the loop
   stops when it is still. Only a glass that can be seen has
   to travel. Flat on the page it is wherever it is next
   wanted, so it comes up under the hand and never streaks
   in from where it was last put down. One still up when it
   is wanted somewhere else is brought there at the weight
   it was raised with, and a hand that takes it over
   tightens its grip as it comes.

   Touch has no hover, and a finger that lands has not yet
   said whether it is the start of a scroll, so nothing moves
   until it has. Rested as long as a long press takes
   anywhere else, or dragged sideways, it has picked the
   glass up, which then follows it in every direction, riding
   above the finger where it can be seen. Dragged up or down
   first, it scrolls the page as it would anywhere
   (touch-action: pan-y), and the rest is a long press and
   no shorter so that a thumb which hesitates before it
   scrolls is still scrolling. A tap raises the glass
   where it landed, for a moment: that is how anyone finds
   out it is there, and how it is placed by someone who
   cannot drag. However brief the touch, the look it gets is
   that long, and a tap somewhere else while it is still up
   carries it over.

   A picture with an alt takes keyboard focus, since there is
   something here to operate: the glass rises where the
   keyboard last left it, mid-picture the first time; the
   arrow keys carry it (further with Shift) — a tap of one
   nudges it, and held it gathers to a walking pace — Space
   or Enter leans in and Escape puts it down. The keys are
   only borrowed from the page. An arrow that points past the
   edge the glass is against scrolls again, and so do all of
   them once the glass is down, until Space or Enter picks
   it back up. Focus that a click left behind has not asked
   for the glass at all, and takes no keys. One with an
   empty alt is decoration and takes no focus. Under reduced
   motion the glass is simply there, at the pointer, and
   gone.
   ========================================================= */

const FRAGMENT = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;

uniform sampler2D uImage;
uniform vec2 uSize;          // CSS px
uniform vec4 uRect;          // drawn image: x, y, w, h in CSS px
uniform float uCell;         // screen period, CSS px
uniform vec4 uAngles;        // C, M, Y, K, radians
uniform float uGcr;
uniform vec3 uPaper;         // linear
uniform vec3 uInk[4];        // linear transmittance of each ink
uniform vec3 uLoupe;         // x, y, radius (px); radius 0 is off
uniform float uMagnify;      // f / (f − d) at the height the glass is at now

float coverage(float r) {
  if (r <= 0.5) return 3.14159265 * r * r;
  float seg = r * r * acos(0.5 / r) - 0.5 * sqrt(r * r - 0.25);
  return 3.14159265 * r * r - 4.0 * seg;
}

// Radius whose clipped area is a, by bisection on [0, √½]. A(r) is monotonic.
float radiusFor(float a) {
  if (a <= 0.0) return 0.0;
  if (a >= 1.0) return 0.7072;
  float lo = 0.0, hi = 0.7072;
  for (int i = 0; i < 12; i++) {
    float mid = 0.5 * (lo + hi);
    if (coverage(mid) < a) lo = mid; else hi = mid;
  }
  return 0.5 * (lo + hi);
}

vec3 sampleImage(vec2 p) {
  vec2 uv = (p - uRect.xy) / uRect.zw;
  if (any(lessThan(uv, vec2(0.0))) || any(greaterThan(uv, vec2(1.0)))) return vec3(1.0);
  return texture(uImage, vec2(uv.x, 1.0 - uv.y)).rgb;
}

vec4 separate(vec3 rgb) {
  vec3 cmy = 1.0 - rgb;
  float k = uGcr * min(cmy.r, min(cmy.g, cmy.b));
  return vec4((cmy - k) / max(1.0 - k, 1e-4), k);
}

void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uSize;

  // A loupe magnifies paper and ink together, blending to 1× across its rim.
  if (uLoupe.z > 0.0) {
    float d = distance(p, uLoupe.xy);
    float m = mix(uMagnify, 1.0, smoothstep(uLoupe.z * 0.85, uLoupe.z, d));
    p = uLoupe.xy + (p - uLoupe.xy) / m;
  }

  vec3 color = uPaper;
  for (int i = 0; i < 4; i++) {
    float a = uAngles[i];
    mat2 rot = mat2(cos(a), sin(a), -sin(a), cos(a));
    vec2 s = rot * p / uCell;
    vec2 cell = floor(s) + 0.5;

    // Tone is read where the dot sits, averaged over the cell, as a screen does.
    vec2 c = transpose(rot) * cell * uCell;
    vec2 o = transpose(rot) * vec2(0.25 * uCell);
    vec2 q = transpose(rot) * vec2(0.25 * uCell, -0.25 * uCell);
    vec3 rgb = (sampleImage(c + o) + sampleImage(c - o) + sampleImage(c + q) + sampleImage(c - q)) * 0.25;
    float ink = separate(rgb)[i];

    float d = length(s - cell);
    float r = radiusFor(clamp(ink, 0.0, 1.0));
    float aa = max(fwidth(d), 1e-4);
    // A dot finer than a pixel fades out with its size, so no ink prints nothing:
    // left alone, the edge below puts a half-tone speck at every cell of bare paper.
    float dot_ = (1.0 - smoothstep(r - aa, r + aa, d)) * smoothstep(0.0, aa, r);
    color *= mix(vec3(1.0), uInk[i], dot_);
  }
  outColor = vec4(pow(color, vec3(1.0 / 2.2)), 1.0);
}`

const DEG = Math.PI / 180
const clamp = (n, lo, hi) => (n < lo ? lo : n > hi ? hi : n)
const clamp01 = (n) => (n > 0 ? (n < 1 ? n : 1) : 0)
// A finite number, or the fallback: one NaN in a uniform blanks the whole frame.
const num = (v, d) => (typeof v === 'number' && Number.isFinite(v) ? v : d)

const SETTLE = 6.64   // ωt at which a critically damped spring is within 1% of home
const EASED = 8.41    // the same for one following an easing hand: three lags, not two
const LEAN = 0.16     // s for a press to arrive, and to let go
const SEEN = 0.002    // d/f below which a glass magnifies by less than anyone can see
const RESIZE = 0.06   // s — how quickly the glass takes a new `loupe` radius
const HOLD = 400      // ms a finger rests before it has picked the glass up: a long press
const SLOP = 8        // px a finger may wander and still be resting
const GLANCE = 1200   // ms a glass raised by touch stays up, at the least
const FINGER = 24     // px between a finger and the rim of the glass above it
const STRIDE = 320    // px/s a held arrow key carries the glass; three times that with Shift
const GATHER = 0.2    // s for a held arrow key to gather most of that pace
const NUDGE = 12      // px for the tap of an arrow key, however brief
const ARROWS = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }

/* d/f, the height of a glass as a share of its focal length, for the
   magnification wanted: m = f/(f − d) turned round. */
const heightFor = (m) => 1 - 1 / clamp(m, 1, 1000)

/* One exact step of a critically damped spring, ẍ = −ω²(x − to) − 2ω·ẋ, whose
   solution is (a + b·t)·e^(−ωt). Exact for any dt, so the frame rate is not in
   it, and it starts from the speed it had.

   `lead` is how far short of `to` the hand holding the other end still is,
   when that hand is itself closing the distance as lead·e^(−ωt): the spring
   then pulls toward the hand and not the place, which adds ½ω²·lead·t² to the
   bracket. The pull starts at nothing and builds, where a bare spring's starts
   at its hardest. The caller moves the hand on by the same e^(−ω·dt). */
function glide(s, to, w, dt, lead = 0) {
  if (!(w < 1e5)) { s.x = to; s.v = 0; return }
  const a = s.x - to
  const b = s.v + w * a
  const c = w * w * lead
  const e = Math.exp(-w * dt)
  const x = (a + b * dt + 0.5 * c * dt * dt) * e
  s.x = to + x
  s.v = (b + c * dt) * e - w * x
}

// Focus the browser would ring, from the keyboard; a click's focus is the pointer's business.
const keyboard = (el) => {
  try { return el.matches(':focus-visible') } catch { return false }
}

export default function HalftoneScreen({
  src,
  alt = '',
  cell = 6,                         // screen period, px — a coarse magazine is ~6
  angles = [15, 75, 0, 45],         // C, M, Y, K screen angles, degrees
  gcr = 0.8,                        // grey-component replacement, 0..1
  paper = '#f3eee3',
  inks = ['#12a4d9', '#dd2a82', '#f7d51d', '#1b1a1f'], // C, M, Y, K
  fit = 'cover',                    // 'cover' | 'contain'
  focusX = 0.5,
  focusY = 0.5,
  loupe = 90,                       // loupe radius under the pointer, px; 0 turns it off
  magnification = 3,
  press = 1.5,                      // how much closer a held press looks, × magnification; 1 turns it off
  rise = 280,                       // ms for the glass to come up to its height; 0 is at once
  trail = 30,                       // ms the glass trails a moving hand by; 0 pins it to the pointer
  resolution = 2,                   // device-pixel-ratio cap
  className = '',
  style,
  ...rest
}) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const api = useRef(null)
  const plain = useRef(false)  // no WebGL2: the plain image stands in

  const live = useRef(null)
  // Synced after every render and before the effects below, so a redraw reads
  // current props without the GL context being rebuilt.
  useEffect(() => {
    live.current = { cell, angles, gcr, paper, inks, fit, focusX, focusY, loupe, magnification, press, rise, trail }
  })

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const glx = root && canvas && createGL(canvas, { onRestore: () => wake() })
    if (!glx) {                      // the plain image stands in; the effect after this one keeps it there
      plain.current = true
      root?.classList.add('is-fallback')
      root?.removeAttribute('tabindex')
      return
    }

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let still = motion.matches

    const program = glx.program(FRAGMENT)
    const image = glx.texture()
    let W = 1, H = 1

    // The glass: where it is, how high it is held (d/f), and its radius.
    const X = { x: 0, v: 0 }
    const Y = { x: 0, v: 0 }
    const D = { x: 0, v: 0 }
    let hand = 0                     // the height the hand holding it has got to, which leads it down
    let rad = 0
    // Where it is wanted, and the client point of whatever hand put it there.
    let tx = 0, ty = 0, cx = 0, cy = 0
    let above = false                // carried by a finger, so it rides clear of it
    let hop = 0                      // 1 while it is being brought from somewhere else, 0 once in hand

    let hover = false                // a mouse or pen is over the picture
    let down = false                 // its button, or the pen's tip, is held
    let wait = null                  // a finger that has landed and not yet said what it is
    let finger = null                // pointerId of the finger carrying the glass
    let landed = 0                   // when the last finger landed
    let glance = 0                   // timer holding up a glass a touch has left
    let guarded = false              // touchmove is being listened for
    let keyed = false                // the keyboard has it
    let kept = null                  // where the keyboard last had it; null until it has
    let leaning = false              // Space or Enter is held
    let ax = 0, ay = 0, stride = 1   // where the held arrow keys point, and how far they reach
    let pace = 0                     // 0..1, how much of its stride a held arrow has gathered
    const arrows = new Set()
    const owned = new Set()          // arrow keys still down that went down as the glass's

    let last = 0                     // time of the last frame; 0 while the loop is stopped
    let stale = true                 // something has changed since the picture was last painted
    let seen = null                  // the props the colours below were worked out for
    let ang = [0, 0, 0, 0]
    let ink = new Array(12).fill(1)
    let stock = [0.9, 0.87, 0.8]

    const size = () => Math.max(0, num(live.current.loupe, 0))

    const draw = (now) => {
      /* A finger that has rested this long has picked the glass up. Timed
         here and not by setTimeout: a browser may hold timers back for as
         long as a touch it could still scroll with is down. While that is
         all there is to do, nothing is painted: every finger that lands on
         the picture on its way to scrolling the page is timed like this, and
         a screen this size is not cheap to paint under a scroll. */
      if (wait && now - wait.t >= HOLD) pick()
      if (!stale) return wait !== null

      const p = live.current
      // A stopped loop has no last frame: its first step is a short nominal one.
      const dt = last ? Math.min(Math.max(now - last, 0) / 1000, 1 / 30) : 1 / 120
      last = now

      // Colours go through a 2D context to be parsed: once per render, not per frame.
      if (p !== seen) {
        seen = p
        ang = Array.from({ length: 4 }, (_, i) => (Number(p.angles?.[i]) || 0) * DEG)
        ink = Array.from({ length: 4 }, (_, i) => linearRGB(p.inks?.[i], [1, 1, 1])).flat()
        stock = linearRGB(p.paper, [0.9, 0.87, 0.8])
        guard()
      }

      const iw = image.ready ? image.width : 1
      const ih = image.ready ? image.height : 1
      const scale = p.fit === 'contain' ? Math.min(W / iw, H / ih) : Math.max(W / iw, H / ih)
      const dw = iw * scale
      const dh = ih * scale

      // Held arrow keys carry the place the glass is wanted, gathering to a
      // walking pace, so the tap of one stays a nudge.
      let carried = false
      if (keyed && (ax || ay)) {
        pace += (1 - pace) * (1 - Math.exp(-dt / GATHER))
        const reach = STRIDE * stride * pace * dt
        const nx = clamp(tx + ax * reach, 0, W)
        const ny = clamp(ty + ay * reach, 0, H)
        carried = nx !== tx || ny !== ty
        tx = nx
        ty = ny
      }

      const R = size()
      const M = Math.max(1, num(p.magnification, 1))
      const up = R > 0 && (hover || finger !== null || glance !== 0 || keyed)
      const base = heightFor(M)
      const want = !up ? 0 : down || leaning ? heightFor(M * Math.max(1, num(p.press, 1))) : base
      const flat = D.x < SEEN        // asked before it is lifted this frame

      const lift = Math.max(0, num(p.rise, 280)) / 1000
      const heft = lift > 0 ? SETTLE / lift : Infinity   // ω of the spring that raises it
      // A press, and letting go of one, are quicker than the rise; nothing is slower.
      const time = want > 0 && (want > base || D.x > base) ? Math.min(lift, LEAN) : lift
      if (still || !(time > 0)) {
        D.x = hand = want; D.v = 0
      } else {
        /* Up, the hand is at the new height at once and the glass springs
           after it. Down, the hand eases off too, and is still `lead` above
           where it is going: counted from no higher than the glass, since
           one turned round on its way up was never carried the rest of the
           way, and is not carried there now. Either way is over in `time`. */
        const lead = Math.max(0, Math.min(hand, D.x) - want)
        const w = (lead > 0 ? EASED : SETTLE) / time
        glide(D, want, w, dt, lead)
        hand = want + lead * Math.exp(-w * dt)
        // Headed for the page it only has to be too low to see; anywhere else, there.
        const near = want === 0 ? SEEN : 1e-4
        if (Math.abs(want - D.x) < near && Math.abs(D.v) < near * 30 && hand - want < near) {
          D.x = hand = want; D.v = 0
        }
      }

      // Flat on the page a glass shows nothing, so it is simply wherever it is
      // wanted. Once it can be seen it has to travel to get there.
      if (still || flat) {
        X.x = tx; X.v = 0
        Y.x = ty; Y.v = 0
        if (R > 0) rad = R
        hop = 0
      } else {
        /* Led by a hand it keeps close: at a steady speed this spring sits
           2/ω behind. Wanted somewhere else while it is up, it is brought
           there at the weight it was raised with; at the pace of the first
           it would cross in six frames, a glass-width at a time. A tap sends
           it the whole way like that. A hand that takes it up from where it
           lay tightens its grip as it comes, over the time of a rise, so
           there is no moment at which one spring becomes the other. */
        const lag = Math.max(0, num(p.trail, 30)) / 1000
        const close = lag > 0 ? 2 / lag : Infinity
        if (hop > 0 && (hover || finger !== null)) {
          hop *= Math.exp(-3 * dt / lift)
          if (hop < 0.01) hop = 0
        }
        const w = hop > 0 ? heft * (close / heft) ** (1 - hop) : close
        glide(X, tx, w, dt)
        glide(Y, ty, w, dt)
        if (Math.hypot(tx - X.x, ty - Y.x) < 0.05 && Math.hypot(X.v, Y.v) < 2) {
          X.x = tx; X.v = 0
          Y.x = ty; Y.v = 0
          hop = 0
        }
        // A new radius is taken up rather than snapped to; turned off, the
        // glass is lowered at the size it was.
        if (R > 0) {
          rad += (R - rad) * (1 - Math.exp(-dt / RESIZE))
          if (Math.abs(R - rad) < 0.25) rad = R
        }
      }

      program.set({
        uImage: image,
        uSize: [W, H],
        // Until there is a picture the rect is off the page, and everywhere reads
        // as bare paper: the stand-in texel is transparent black, which the
        // separation would print as all four inks, solid.
        uRect: image.ready
          ? [(W - dw) * clamp01(p.focusX), (H - dh) * clamp01(p.focusY), dw, dh]
          : [-2, -2, 1, 1],
        uCell: Math.max(1.5, num(p.cell, 6)),
        uAngles: ang,
        uGcr: clamp01(num(p.gcr, 0.8)),
        uPaper: stock,
        uInk: ink,
        uLoupe: [X.x, Y.x, D.x > 0 ? rad : 0],
        uMagnify: 1 / (1 - D.x),
      })
      glx.draw()

      stale = D.x !== want || D.v !== 0 || hand !== want || X.x !== tx || Y.x !== ty || (R > 0 && D.x > 0 && rad !== R)
        || carried
      if (!stale) last = 0
      return stale || wait !== null
    }

    const loop = createLoop(root, draw)
    const wake = () => {
      stale = true
      loop.kick()
    }
    api.current = {
      kick: wake,
      setImage(img) {
        image.update(img)
        wake()
      },
    }

    /* Put the place the glass is wanted under the hand at (cx, cy) — or, for
       a finger, clear above it, since a glass under a fingertip shows the
       finger. It stays on the picture, so one dragged past an edge waits
       there. */
    const aim = () => {
      const b = root.getBoundingClientRect()
      tx = clamp(cx - b.left, 0, W)
      ty = clamp(cy - b.top - (above ? Math.min(size() + FINGER, H / 2) : 0), 0, H)
    }

    // The page scrolling under a still hand moves the paper, not the hand.
    const onScroll = () => { aim(); wake() }
    let watching = false
    const watch = () => {
      const on = hover || finger !== null
      if (on === watching) return
      watching = on
      window[on ? 'addEventListener' : 'removeEventListener']('scroll', onScroll, { capture: true, passive: true })
    }

    const stopGlance = () => {
      clearTimeout(glance)
      glance = 0
    }
    /* A glass that touch raised is up for GLANCE from when the finger landed,
       so a tap gets a look, and so does a touch that was only just long
       enough to count as a hold. A long one has had its look already. */
    const look = () => {
      stopGlance()
      const left = GLANCE - (performance.now() - landed)
      if (left > 0) glance = setTimeout(() => { glance = 0; wake() }, left)
    }

    /* The finger has said it is here for the glass. Called from the frame
       loop as well as from a move, so waking the loop is left to the caller. */
    const pick = () => {
      finger = wait.id
      wait = null
      stale = true
      hop = 1                       // if it is up somewhere, it is brought over, not snatched
      stopGlance()
      above = true
      try { root.setPointerCapture(finger) } catch { /* capture is a nicety */ }
      aim(); watch()
    }
    // Every finger is off the glass, and it gets no parting look.
    const drop = () => {
      wait = null
      finger = null
      stopGlance()
      watch(); wake()
    }

    const onDown = (e) => {
      if (e.pointerType === 'touch') {
        // A second finger makes it a pinch, and that is the page's.
        if (!e.isPrimary) { drop(); return }
        if (!(size() > 0)) return
        cx = e.clientX
        cy = e.clientY
        landed = performance.now()
        wait = { id: e.pointerId, x: cx, y: cy, t: landed }
        if (glance) look()          // a glass still up from the last touch waits to hear what this one is
        loop.kick()                 // the frame loop is what times the hold; there is nothing yet to paint
        return
      }
      if (e.button !== 0) return
      down = true
      try { root.setPointerCapture(e.pointerId) } catch { /* capture is a nicety */ }
      onMove(e)
    }

    const onMove = (e) => {
      if (e.pointerType === 'touch') {
        if (wait && e.pointerId === wait.id) {
          cx = e.clientX
          cy = e.clientY
          const dx = Math.abs(cx - wait.x)
          const dy = Math.abs(cy - wait.y)
          // Held long enough already, if no frame has come round to say so.
          if (performance.now() - wait.t >= HOLD || (dx > SLOP && dx > dy)) { pick(); wake() }
          else if (dy > SLOP) wait = null            // a scroll: the browser is about to say so
        } else if (e.pointerId === finger) {
          cx = e.clientX
          cy = e.clientY
          aim(); wake()
        }
        return
      }
      cx = e.clientX
      cy = e.clientY
      above = false
      if (!hover) hop = 1           // a new hand: a glass still up elsewhere is brought to it
      hover = true
      stopGlance()
      aim(); watch(); wake()
    }

    /* A hand lets go. A finger lifting leaves the glass where it was, to be
       lowered there; one that lifts before it has said anything was a tap,
       and the glass comes up at the place it tapped, since nothing is in
       the way of it there now. A mouse button coming up only ends the lean. */
    const onUp = (e) => {
      /* A finger is captured by whatever it landed on, which is the canvas.
         Taking the capture here makes the canvas lose it, and that bubbles:
         it is the capture moving, not the finger leaving. */
      if (e.type === 'lostpointercapture' && e.target !== root) return
      if (e.pointerType === 'touch') {
        const lifted = e.type === 'pointerup'   // or the page took it, to scroll or to pinch with
        if (wait && e.pointerId === wait.id) {
          wait = null
          if (!lifted) return
          above = false
          aim()
          hop = 1
          look(); wake()
        } else if (e.pointerId === finger) {
          finger = null
          if (lifted) look()
          watch(); wake()
        }
        return
      }
      if (!down) return
      down = false
      // A pen that the page took to scroll with is no longer over anything.
      if (e.type === 'pointercancel') { hover = false; watch() }
      wake()
    }

    /* It is set down at the edge the pointer left by, not wherever it last
       reported from. One the keyboard still has is not being set down at
       all, and stays on the picture where the pointer had it. */
    const onLeave = (e) => {
      if (e.pointerType === 'touch' || !hover) return   // fires after every lift; not a leave
      if (!keyed) {
        cx = e.clientX
        cy = e.clientY
        aim()
      }
      hover = false
      down = false
      watch(); wake()
    }

    // Once a finger holds the glass every direction is the glass's; two are still a pinch.
    const onTouchMove = (e) => {
      if (finger !== null && e.cancelable && e.touches.length < 2) e.preventDefault()
    }
    /* To be able to say that, the listener cannot be passive, and then the
       browser has to ask it before any scroll that starts on the picture. So
       it is only there while there is a glass to carry. */
    const guard = () => {
      const on = size() > 0
      if (on === guarded) return
      guarded = on
      root[on ? 'addEventListener' : 'removeEventListener']('touchmove', onTouchMove, { passive: false })
    }
    // A long press is how the glass is picked up, not a request for a menu.
    const onMenu = (e) => { if (wait || finger !== null) e.preventDefault() }

    const steer = () => {
      ax = (arrows.has('ArrowRight') ? 1 : 0) - (arrows.has('ArrowLeft') ? 1 : 0)
      ay = (arrows.has('ArrowDown') ? 1 : 0) - (arrows.has('ArrowUp') ? 1 : 0)
      if (!ax && !ay) pace = 0
    }

    /* The keyboard takes the glass. One a hand is on, or one still up, is
       taken where it is. One lying flat comes up where the keyboard last had
       it, mid-picture the first time, and not at whichever edge a pointer
       happened to leave by, half off the picture. */
    const take = () => {
      if (keyed) return
      keyed = true
      if (hover || finger !== null || glance !== 0 || D.x >= SEEN) return
      const [x, y] = kept ?? [W / 2, H / 2]
      tx = clamp(x, 0, W)
      ty = clamp(y, 0, H)
    }
    // And lets it go, remembering where.
    const letGo = () => {
      if (keyed) kept = [tx, ty]
      keyed = leaning = false
      arrows.clear()
      steer(); wake()
    }
    const onKeyDown = (e) => {
      if (e.target !== root || e.altKey || e.ctrlKey || e.metaKey || !(size() > 0)) return
      stride = e.shiftKey ? 3 : 1
      const dir = ARROWS[e.key]
      if (dir) {
        /* An arrow is the glass's only while the keyboard has the glass and
           there is somewhere left to carry it. Put down, or already against
           that edge of the picture, the key is the page's to scroll with. A
           held key stays whose it was when it went down: the frame loop is
           carrying the glass, and neither reaching the edge nor Escape starts
           the page moving under the same press. */
        if (e.repeat) {
          if (owned.has(e.key)) e.preventDefault()
          return
        }
        if (!keyed) return
        const nx = clamp(tx + dir[0] * NUDGE * stride, 0, W)
        const ny = clamp(ty + dir[1] * NUDGE * stride, 0, H)
        if (nx === tx && ny === ty) return
        e.preventDefault()
        hop = 0
        tx = nx
        ty = ny
        arrows.add(e.key)
        owned.add(e.key)
        steer(); wake()
      } else if (e.key === ' ' || e.key === 'Enter') {
        // These pick the glass up as well as lean on it, but only for a
        // keyboard that is on the picture: a click leaves focus here too.
        if (!keyed && !keyboard(root)) return
        e.preventDefault()
        if (e.repeat) return
        take()
        leaning = true
        wake()
      } else if (e.key === 'Escape' && keyed) {
        letGo()
      }
    }
    const onKeyUp = (e) => {
      stride = e.shiftKey ? 3 : 1
      owned.delete(e.key)
      if (e.key === ' ' || e.key === 'Enter') leaning = false
      else if (!arrows.delete(e.key)) return
      steer(); wake()
    }
    const onFocus = () => {
      if (!keyboard(root)) return
      take(); wake()
    }
    // A key still down when focus goes is let up somewhere else.
    const onBlur = () => { owned.clear(); letGo() }

    const onMotion = () => { still = motion.matches; wake() }

    const ro = new ResizeObserver(() => {
      const b = root.getBoundingClientRect()
      W = Math.max(1, b.width)
      H = Math.max(1, b.height)
      glx.resize(W, H, resolution)
      if (hover || finger !== null) aim()
      else { tx = clamp(tx, 0, W); ty = clamp(ty, 0, H) }
      wake()
    })
    ro.observe(root)
    root.addEventListener('pointerenter', onMove, { passive: true })
    root.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerdown', onDown, { passive: true })
    root.addEventListener('pointerup', onUp, { passive: true })
    root.addEventListener('pointercancel', onUp, { passive: true })
    root.addEventListener('lostpointercapture', onUp, { passive: true })
    root.addEventListener('pointerleave', onLeave, { passive: true })
    root.addEventListener('contextmenu', onMenu)
    root.addEventListener('keydown', onKeyDown)
    root.addEventListener('keyup', onKeyUp)
    root.addEventListener('focus', onFocus)
    root.addEventListener('blur', onBlur)
    motion.addEventListener?.('change', onMotion)

    return () => {
      api.current = null
      ro.disconnect()
      loop.stop()
      stopGlance()
      wait = null
      hover = false
      finger = null
      watch()
      root.removeEventListener('pointerenter', onMove)
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerdown', onDown)
      root.removeEventListener('pointerup', onUp)
      root.removeEventListener('pointercancel', onUp)
      root.removeEventListener('lostpointercapture', onUp)
      root.removeEventListener('pointerleave', onLeave)
      root.removeEventListener('touchmove', onTouchMove)
      root.removeEventListener('contextmenu', onMenu)
      root.removeEventListener('keydown', onKeyDown)
      root.removeEventListener('keyup', onKeyUp)
      root.removeEventListener('focus', onFocus)
      root.removeEventListener('blur', onBlur)
      motion.removeEventListener?.('change', onMotion)
      glx.dispose()
    }
  }, [resolution])

  /* Without WebGL2 the plain image stands in, and there is no glass to carry,
     so nothing to focus. Marked after every render and not once: React writes
     class and tabindex afresh whenever a prop that feeds them changes, and
     would take the mark off with it. And before the browser paints, or a
     frame of bare paper shows between. */
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current
    if (!plain.current || !root) return
    root.classList.add('is-fallback')
    root.removeAttribute('tabindex')
  })

  // The image loads on its own, and a stale load must never land on a newer src.
  useEffect(() => loadImage(src, (img) => api.current?.setImage(img)), [src, resolution])

  const angleKey = Array.isArray(angles) ? angles.join(',') : ''
  const inkKey = Array.isArray(inks) ? inks.join(',') : ''
  useEffect(() => {
    api.current?.kick()
  }, [cell, angleKey, gcr, paper, inkKey, fit, focusX, focusY, loupe, magnification, press, rise, trail])

  const glass = loupe > 0
  return (
    <div
      ref={rootRef}
      className={[
        'halftone-screen',
        glass && 'halftone-screen--loupe',
        glass && press > 1 && 'halftone-screen--lean',
        className,
      ].filter(Boolean).join(' ')}
      /* Same contract as <img>: a description names the picture; an empty alt
         marks it decorative. A named picture with a loupe is also a tab stop,
         because the glass can be carried from the keyboard; tabIndex={-1}
         takes it back out of the order. */
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : 'true'}
      tabIndex={alt && glass ? 0 : undefined}
      style={{
        '--halftone-src': src ? `url("${String(src).replace(/"/g, '%22')}")` : 'none',
        '--halftone-paper': paper,
        '--halftone-key': Array.isArray(inks) ? inks[3] : undefined,
        ...style,
      }}
      {...rest}
    >
      <canvas ref={canvasRef} className="halftone-screen__canvas" aria-hidden="true" />
    </div>
  )
}
