'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { createGL, createLoop, linearRGB, loadImage } from '../gl-core/gl.js'
import './FocusPeaking.css'

// Before paint in the browser; on the server, where a layout effect only warns, a plain one.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/* =========================================================
   FocusPeaking
   Hover an image and its sharp edges light up in a signal
   colour — what a camera's focus peaking shows an operator
   pulling focus by eye.

   A lens renders the plane of focus with steep transitions
   and everything else with soft ones; defocus is a low-pass
   filter. So "in focus" can be measured locally as the size
   of the brightness gradient, and peaking is just that
   gradient, thresholded and painted over the picture. It is
   honest about what it shows: a sharp edge lights whether or
   not it is the subject, exactly as it does on a monitor.

   The gradient is the Sobel operator on luma,

     Gx = [−1 0 1; −2 0 2; −1 0 1] ∗ Y,   Gy = Gxᵀ ∗ Y,
     |∇Y| = √(Gx² + Gy²)

   taken on gamma-encoded Rec. 709 luma, which is what a
   camera's peaking circuit sees — its thresholds are set in
   perceptual steps, and on linear light the same edge in a
   shadow would barely register. The step between taps is one
   displayed pixel, so peaking lines keep one weight whatever
   the image is scaled to. A soft knee above the threshold
   keeps them from crawling as the image moves.

   Peaking is a mode the monitor is put into, so it comes on
   as one thing: the picture dims and the edges light on a
   single amount. A fade that closes a fixed share of the gap
   each frame runs twice as fast on a 120 Hz display, and
   starts at its fastest, so it lands as a flash. This one is
   a critically damped spring solved over the real time since
   the last frame. It comes on in `fade`, softly at first, and
   goes off in seven tenths of that: the picture is what the
   viewer came for, and it is given back sooner than it was
   taken. A hand that leaves mid-fade turns it round at the
   speed it had, so a pointer brushing across leaves a
   glimmer that comes and goes, never a blink. Nothing is
   painted once it is still.

   With `reach` the peaking is a disc around the pointer,
   feathered over its outer three tenths so it has no rim.
   The disc is carried, not pinned: it trails the hand by
   `trail`, enough to read as a thing following and not enough
   to read as lag, and nothing overshoots. Only a disc that can
   be seen has to travel. Faded out it is wherever it is next
   wanted, so it comes up under the hand and never streaks in
   from where it was last left; one still showing when a hand
   arrives somewhere else is brought over at the pace of the
   fade, and the hand's grip tightens as it comes. A new reach
   is grown or shrunk into, and reach 0 is a disc wide enough
   to cover the picture from anywhere, so going between the
   two is a disc opening out, not a cut. Held by `active`
   with nobody pointing, it sits mid-picture until a hand has
   put it somewhere, and stays where it was left after that;
   the keyboard, which has no place of its own, takes one
   still showing where it is and brings a faded one up
   mid-picture.

   Touch has no hover, and a finger that lands has not yet
   said whether it is the start of a scroll, so for the first
   fifth of a second nothing shows. A finger still resting
   then peaks the picture under it, while the page can still
   be scrolled out from under it. With no reach that is all a
   finger does: there is nothing for it to carry, so every
   drag stays the page's, sideways ones too, and a picture in
   a carousel does not stop the carousel being swiped. With a
   reach there is a disc to carry. Rested as long as a long
   press, or slid sideways, the finger has the picture: it
   peaks for as long as it is held and carries the disc in
   every direction. Dragged up or down first, it scrolls the
   page (touch-action: pan-y), and two fingers still zoom. A
   tap peaks for a glance, counted from when it landed, which
   is how anyone finds out it is there. A long press on a
   picture inside a link is still the link's, and raises the
   menu it always did.

   Keyboard focus counts as hover: the picture peaks while the
   link or button it sits in has focus from the keyboard, or
   while it does itself, given a tabIndex. Focus a click left
   behind is the pointer's business, until a key is pressed and
   the browser starts to ring it. The picture takes no tab
   stop of its own — it is not a control, and one in a card
   link would otherwise be two stops for one thing. Given one,
   and a reach, the arrow keys carry the disc, further with
   Shift; against an edge of the picture they are the page's
   to scroll with again. `active` holds it on or off instead
   of following any of this.

   Under reduced motion it comes on and goes off at once, and
   the disc sits at the pointer.
   ========================================================= */

const FRAGMENT = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;

uniform sampler2D uImage;
uniform vec2 uSize;          // CSS px
uniform vec4 uRect;          // drawn image: x, y, w, h in CSS px
uniform float uPixel;        // one device pixel, in CSS px
uniform float uThreshold;
uniform float uAmount;       // 0..1, eased in and out
uniform float uDim;
uniform vec3 uColor;         // linear
uniform vec3 uReach;         // disc x, y and radius in px; radius 0 is the whole image

float luma(vec2 p) {
  vec2 uv = clamp((p - uRect.xy) / uRect.zw, 0.0, 1.0);
  vec3 c = texture(uImage, vec2(uv.x, 1.0 - uv.y)).rgb;
  return dot(c, vec3(0.2126, 0.7152, 0.0722));
}

void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uSize;
  vec2 uv = (p - uRect.xy) / uRect.zw;
  if (any(lessThan(uv, vec2(0.0))) || any(greaterThan(uv, vec2(1.0)))) {
    outColor = vec4(0.0);
    return;
  }

  float s = uPixel;
  float tl = luma(p + vec2(-s, -s)), t = luma(p + vec2(0.0, -s)), tr = luma(p + vec2(s, -s));
  float l = luma(p + vec2(-s, 0.0)),                               r = luma(p + vec2(s, 0.0));
  float bl = luma(p + vec2(-s, s)),  b = luma(p + vec2(0.0, s)),  br = luma(p + vec2(s, s));
  float gx = (tr + 2.0 * r + br) - (tl + 2.0 * l + bl);
  float gy = (bl + 2.0 * b + br) - (tl + 2.0 * t + tr);
  float g = sqrt(gx * gx + gy * gy);

  float edge = smoothstep(uThreshold, uThreshold * 1.6 + 0.02, g);
  float reach = uReach.z > 0.0 ? 1.0 - smoothstep(uReach.z * 0.7, uReach.z, distance(p, uReach.xy)) : 1.0;
  float amount = uAmount * reach;

  vec3 image = texture(uImage, vec2(uv.x, 1.0 - uv.y)).rgb;
  vec3 lin = pow(image, vec3(2.2)) * (1.0 - uDim * amount);
  vec3 c = mix(lin, uColor, edge * amount);
  outColor = vec4(pow(c, vec3(1.0 / 2.2)), 1.0);
}`

const clamp = (n, lo, hi) => (n < lo ? lo : n > hi ? hi : n)
const clamp01 = (n) => (n > 0 ? (n < 1 ? n : 1) : 0)
// A finite number, or the fallback: one NaN in a uniform blanks the whole frame.
const num = (v, d) => (typeof v === 'number' && Number.isFinite(v) ? v : d)

const SETTLE = 6.64   // ωt at which a critically damped spring is within 1% of home
const OFF = 0.7       // going off takes this share of the time coming on does
const SEEN = 0.004    // peaking amount below which the disc cannot be seen
const FEATHER = 0.7   // share of the radius the disc is at full strength out to, as in the shader
const RESIZE = 0.06   // s — how quickly the disc takes up a new reach
const DWELL = 200     // ms a finger rests before the picture peaks under it
const HOLD = 400      // ms a finger rests before it has the picture: a long press
const SLOP = 8        // px a finger may wander and still be resting
const GLANCE = 1200   // ms a tap peaks for, counted from when it landed
const NUDGE = 16      // px an arrow key carries the disc; four times that with Shift
const ARROWS = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }

/* One exact step of a critically damped spring, ẍ = −ω²(x − to) − 2ω·ẋ, whose
   solution is (a + b·t)·e^(−ωt). Exact for any dt, so the frame rate is not in
   it, and it starts from the speed it had. */
function glide(s, to, w, dt) {
  if (!(w < 1e5)) { s.x = to; s.v = 0; return }
  const a = s.x - to
  const b = s.v + w * a
  const e = Math.exp(-w * dt)
  const x = (a + b * dt) * e
  s.x = to + x
  s.v = b * e - w * x
}

// Focus the browser would ring, from the keyboard; a click's focus is the pointer's business.
const keyboard = (el) => {
  try { return el.matches(':focus-visible') } catch { return false }
}

/* What keyboard focus has to be on for the picture to count as hovered: the
   picture itself, once it has been given a tabIndex, or else the link or
   button it sits in. Never just any focused ancestor — a region focused to
   move the reading position holds every picture on the page. */
const CONTROL = 'a[href], button, summary, [role="link"], [role="button"]'
const owner = (root) => (root.hasAttribute('tabindex') ? root : root.parentElement?.closest(CONTROL) ?? null)

export default function FocusPeaking({
  src,
  alt = '',
  active,                  // undefined follows hover, a resting finger and keyboard focus; true or false holds it
  color = '#ff3b30',       // peaking colour
  threshold = 0.22,        // gradient magnitude an edge must clear, 0..~1.4
  dim = 0.35,              // how far the picture dims while peaking, 0..1
  reach = 0,               // px around the pointer that peaks; 0 is the whole image
  fade = 240,              // ms for peaking to come on; it goes off in 70% of that; 0 is at once
  trail = 30,              // ms the reach disc trails a moving hand by; 0 pins it to the pointer
  fit = 'cover',           // 'cover' | 'contain'
  focusX = 0.5,
  focusY = 0.5,
  resolution = 2,          // device-pixel-ratio cap
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
    live.current = { active, color, threshold, dim, reach, fade, trail, fit, focusX, focusY }
  })

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const glx = root && canvas && createGL(canvas, { onRestore: () => wake() })
    if (!glx) {                      // the plain image stands in; the effect after this one keeps it there
      plain.current = true
      root?.classList.add('is-fallback')
      return
    }

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let still = motion.matches

    const program = glx.program(FRAGMENT)
    const image = glx.texture()
    let W = 1, H = 1, dpr = 1

    const A = { x: 0, v: 0 }         // how far peaking is on, 0..1
    const X = { x: 0, v: 0 }         // where the reach disc is
    const Y = { x: 0, v: 0 }
    let rad = 0                      // and its radius, px
    // Where the disc is wanted, and the client point of the hand that put it there.
    let tx = 0, ty = 0, cx = 0, cy = 0
    let placed = false               // a hand has put it somewhere; until then it is mid-picture
    let hop = 0                      // 1 while it is being brought from somewhere else, 0 once in hand

    let hover = false                // a mouse or pen is over the picture
    let touch = null                 // the finger on it: { id, x, y, t, seen, owned }
    let glance = 0                   // timer holding peaking up after a tap
    let focused = false              // the keyboard is on the picture, or on the control it sits in
    let guarded = false              // touchmove is being listened for

    let last = 0                     // time of the last frame; 0 while the loop is stopped
    let period = 1 / 60              // s between this display's frames, as last measured
    let stale = true                 // something has changed since the picture was last painted
    let lit = false                  // peaking is showing, or on its way: a moving disc is worth a frame
    let seen = null                  // the props the colour below was worked out for
    let tint = [1, 0.05, 0.03]

    const reachOf = () => Math.max(0, num(live.current?.reach, 0))
    // A radius whose full-strength core reaches every corner from anywhere on the picture.
    const cover = () => Math.hypot(W, H) / FEATHER + 1
    // A finger counts as a hand once it has rested long enough to show, or has the picture.
    const fingered = () => touch !== null && (touch.seen || touch.owned)
    // Only a disc gives a finger something to carry, and so a reason to take the picture from the page.
    const carries = () => reachOf() > 0
    // While a finger is resting the loop runs to time it, painting nothing.
    const timing = () => touch !== null && (!touch.seen || (!touch.owned && carries()))

    const draw = (now) => {
      /* Timed here and not by setTimeout: a browser may hold timers back for as
         long as a touch it could still scroll with is down. */
      if (timing()) {
        const held = now - touch.t
        if (held >= HOLD && carries()) own()
        else if (!touch.seen && held >= DWELL) { touch.seen = true; arrive() }
      }
      if (!stale) return timing()

      const p = live.current
      /* A stopped loop has no last frame, so its first step is one frame of
         this display — the same on 60 Hz and 120 Hz. The display's period is
         the shortest gap it shows, so a shorter one is believed at once and a
         longer one, which is as likely a dropped frame, only a little. A tab
         left in the background resumes by a capped step, not a jump. */
      const gap = last ? Math.max(now - last, 0) / 1000 : period
      if (last && gap > 1 / 250 && gap < 1 / 20) period = gap < period ? gap : period + (gap - period) * 0.1
      const dt = Math.min(gap, 1 / 30)
      last = now

      // Colours go through a 2D context to be parsed: once per render, not per frame.
      if (p !== seen) {
        seen = p
        tint = linearRGB(p.color, [1, 0.05, 0.03])
        guard()
      }

      const iw = image.ready ? image.width : 1
      const ih = image.ready ? image.height : 1
      const scale = p.fit === 'contain' ? Math.min(W / iw, H / ih) : Math.max(W / iw, H / ih)
      const dw = iw * scale
      const dh = ih * scale

      // How far peaking is on. Up in `fade`, down in OFF of it, from the speed it had.
      const shown = hover || focused || glance !== 0 || fingered()
      const want = (p.active ?? shown) ? 1 : 0
      const on = Math.max(0, num(p.fade, 240)) / 1000
      const time = want > A.x ? on : on * OFF
      const flat = still || A.x < SEEN        // asked before it comes on this frame
      if (still || !(time > 0)) {
        A.x = want; A.v = 0
      } else {
        glide(A, want, SETTLE / time, dt)
        if (Math.abs(want - A.x) < 2e-3 && Math.abs(A.v) < 0.1) { A.x = want; A.v = 0 }
      }
      const amount = clamp01(A.x)
      lit = want > 0 || amount > 0

      /* The disc. Unseen until now, or covering the whole picture, its place
         cannot be told, so it is simply where it is wanted; otherwise it has
         to travel there. */
      const whole = cover()
      const R = Math.min(reachOf() || whole, whole)
      if (flat) rad = R
      else if (rad !== R) {
        rad += (R - rad) * (1 - Math.exp(-dt / RESIZE))
        if (Math.abs(R - rad) < 0.25) rad = R
      }
      if (flat || rad >= whole) {
        X.x = tx; X.v = 0
        Y.x = ty; Y.v = 0
        hop = 0
      } else {
        /* Led by a hand it keeps close: at a steady speed this spring sits
           2/ω behind, which is `trail`. Wanted somewhere else while it shows,
           it is brought there at the pace of the fade, and a hand that takes
           it over tightens its grip as it comes, so there is no moment at
           which one spring becomes the other. */
        const lag = Math.max(0, num(p.trail, 30)) / 1000
        const close = lag > 0 ? 2 / lag : Infinity
        const grip = Math.min(close, 1e4)   // pinned, as far as one frame can tell, and finite to blend toward
        const heft = on > 0 ? SETTLE / on : Infinity
        if (hop > 0 && (hover || fingered())) {
          hop = on > 0 ? hop * Math.exp(-3 * dt / on) : 0
          if (hop < 0.01) hop = 0
        }
        const w = hop > 0 && heft < grip ? heft * (grip / heft) ** (1 - hop) : close
        glide(X, tx, w, dt)
        glide(Y, ty, w, dt)
        if (Math.hypot(tx - X.x, ty - Y.x) < 0.05 && Math.hypot(X.v, Y.v) < 2) {
          X.x = tx; X.v = 0
          Y.x = ty; Y.v = 0
          hop = 0
        }
      }

      program.set({
        uImage: image,
        uSize: [W, H],
        uRect: [(W - dw) * clamp01(num(p.focusX, 0.5)), (H - dh) * clamp01(num(p.focusY, 0.5)), dw, dh],
        uPixel: 1 / dpr,
        uThreshold: Math.max(0, num(p.threshold, 0.22)),
        uAmount: amount,
        uDim: clamp01(num(p.dim, 0.35)),
        uColor: tint,
        uReach: [X.x, Y.x, rad >= whole ? 0 : rad],
      })
      glx.draw()

      stale = A.x !== want || A.v !== 0 || rad !== R || X.x !== tx || Y.x !== ty
      if (!stale) last = 0
      return stale || timing()
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

    /* Put the place the disc is wanted under the hand at (cx, cy). It stays on
       the picture, so one dragged past an edge waits there. */
    const aim = () => {
      const b = root.getBoundingClientRect()
      tx = clamp(cx - b.left, 0, W)
      ty = clamp(cy - b.top, 0, H)
      placed = true
    }
    /* A hand moving. With no reach its place shows nothing, and neither does a
       disc held dark by `active`, so nothing is painted for either. */
    const follow = () => {
      const ox = tx
      const oy = ty
      aim()
      if (lit && reachOf() > 0 && (tx !== ox || ty !== oy)) wake()
    }

    // The page scrolling under a still hand moves the picture, not the hand.
    const onScroll = () => follow()
    let watching = false
    const watch = () => {
      const on = hover || fingered()
      if (on === watching) return
      watching = on
      window[on ? 'addEventListener' : 'removeEventListener']('scroll', onScroll, { capture: true, passive: true })
    }

    /* A hand has arrived: a disc still showing elsewhere is brought to it, not
       snatched. These two are called from the frame loop as well as from
       events, so they only mark the picture stale; waking the loop is left to
       the caller, since a loop kicked from inside its own frame runs twice. */
    const arrive = () => {
      hop = 1
      aim(); watch()
      stale = true
    }

    // The finger has said it is here for the picture.
    const own = () => {
      const first = !touch.seen
      touch.owned = touch.seen = true
      try { root.setPointerCapture(touch.id) } catch { /* capture is a nicety */ }
      if (first) arrive()
      stale = true
    }

    const stopGlance = () => {
      clearTimeout(glance)
      glance = 0
    }
    /* Every finger is off, and none of them gets a parting look. A finger that
       never showed anything leaves nothing to repaint: this is every scroll
       that happens to start on the picture. */
    const drop = () => {
      const showing = fingered() || glance !== 0
      touch = null
      stopGlance()
      watch()
      if (showing) wake()
    }

    const steers = () => {
      const p = live.current
      return p != null && (p.active == null || (p.active === true && reachOf() > 0))
    }

    const onDown = (e) => {
      if (e.pointerType !== 'touch') return
      // A second finger makes it a pinch, and that is the page's.
      if (!e.isPrimary) { drop(); return }
      if (!steers()) return
      cx = e.clientX
      cy = e.clientY
      touch = { id: e.pointerId, x: cx, y: cy, t: performance.now(), seen: false, owned: false }
      loop.kick()                    // the frame loop is what times the rest; there is nothing yet to paint
    }

    const onMove = (e) => {
      if (e.pointerType === 'touch') {
        if (!touch || e.pointerId !== touch.id) return
        cx = e.clientX
        cy = e.clientY
        if (!touch.owned) {
          const dx = Math.abs(cx - touch.x)
          const dy = Math.abs(cy - touch.y)
          if (carries()) {
            // Held long enough already, if no frame has come round to say so; or slid sideways.
            if (performance.now() - touch.t >= HOLD || (dx > SLOP && dx > dy)) { own(); wake(); return }
            if (dy > SLOP) { drop(); return }        // a scroll: the browser is about to say so
          } else if (!touch.seen && (dx > SLOP || dy > SLOP)) {
            /* Nothing to carry, so a drag either way is the page's, and one
               that starts before anything shows should show nothing. A finger
               already resting may shift; whether that has become a scroll is
               the browser's to say, with a pointercancel. */
            drop()
            return
          }
        }
        if (touch.seen) follow()
        return
      }
      cx = e.clientX
      cy = e.clientY
      if (!hover) {
        hover = true
        stopGlance()
        arrive(); wake()
      } else {
        follow()
      }
    }

    /* A finger lets go. One that lifts before it had the picture was a tap,
       and it gets its glance where it tapped; one that had it has had its
       look. A finger the page took, to scroll or to pinch with, gets nothing. */
    const onUp = (e) => {
      /* A finger is captured by whatever it landed on, which is the canvas.
         Taking the capture makes the canvas lose it, and that bubbles: it is
         the capture moving, not the finger leaving. */
      if (e.type === 'lostpointercapture' && e.target !== root) return
      if (e.pointerType !== 'touch' || !touch || e.pointerId !== touch.id) return
      const { t, seen: was, owned } = touch
      touch = null
      if (e.type === 'pointerup' && !owned) {
        stopGlance()
        const left = GLANCE - (performance.now() - t)
        if (left > 0) {
          glance = setTimeout(() => { glance = 0; wake() }, left)
          if (!was) arrive()
        }
      }
      watch()
      if (was || glance !== 0) wake()
    }

    // It fades where the pointer left by, not wherever it last reported from.
    const onLeave = (e) => {
      if (e.pointerType === 'touch' || !hover) return   // fires after every lift; not a leave
      cx = e.clientX
      cy = e.clientY
      aim()
      hover = false
      watch(); wake()
    }

    // Once a finger has the picture every direction is its; two are still a pinch.
    const onTouchMove = (e) => {
      if (touch?.owned && e.cancelable && e.touches.length < 2) e.preventDefault()
    }
    /* To be able to say that, the listener cannot be passive, and then the
       browser has to ask it before any scroll that starts on the picture. So
       it is only there while a finger can have the picture: never, with no
       reach. */
    const guard = () => {
      const on = steers() && carries()
      if (on === guarded) return
      guarded = on
      root[on ? 'addEventListener' : 'removeEventListener']('touchmove', onTouchMove, { passive: false })
    }
    /* A long press is how the picture is held, not a request for a menu —
       unless the picture is a link, whose menu (open in a new tab, copy the
       address) is worth more to whoever asked for it than a longer look. */
    const onMenu = (e) => { if (touch && !root.closest('a[href]')) e.preventDefault() }

    /* The keyboard carries the disc when it is on the picture itself, which
       it only can be once the picture has a tabIndex. An arrow against the
       edge it points at has nowhere to take the disc, and is left to scroll
       the page. Each press is a step, and the disc glides to it on `trail`. */
    const onKey = (e) => {
      if (e.target !== root) return
      const dir = ARROWS[e.key]
      if (!dir || !focused || e.altKey || e.ctrlKey || e.metaKey) return
      if (!steers() || !carries()) return
      const step = NUDGE * (e.shiftKey ? 4 : 1)
      const nx = clamp(tx + dir[0] * step, 0, W)
      const ny = clamp(ty + dir[1] * step, 0, H)
      if (nx === tx && ny === ty) return
      e.preventDefault()
      tx = nx
      ty = ny
      placed = true
      hop = 0
      wake()
    }

    /* Focus moving anywhere on the page is checked against the one control
       this picture belongs to. Something losing focus means nothing has it
       until a focusin says otherwise, so the element on its way out is not
       asked whether it still matches. A key going down asks too: a click's
       focus becomes the keyboard's at the first key pressed, and the browser
       starts ringing it without any focus event to say so. With nobody
       pointing, a disc that has faded out comes up mid-picture for the
       keyboard. */
    const onFocus = (e) => {
      const o = owner(root)
      const now = !!o && e?.type !== 'focusout' && keyboard(o)
      if (now === focused) return
      focused = now
      if (focused && !hover && !fingered() && A.x < SEEN) {
        tx = W / 2
        ty = H / 2
      }
      wake()
    }

    const onMotion = () => { still = motion.matches; wake() }

    const ro = new ResizeObserver(() => {
      const b = root.getBoundingClientRect()
      const covering = rad >= cover() - 0.5
      W = Math.max(1, b.width)
      H = Math.max(1, b.height)
      dpr = glx.resize(W, H, resolution).dpr
      if (covering) rad = cover()
      if (hover || fingered()) aim()
      else if (!placed) { tx = W / 2; ty = H / 2 }
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
    root.addEventListener('keydown', onKey)
    document.addEventListener('focusin', onFocus)
    document.addEventListener('focusout', onFocus)
    // On the way down, so the picture's own key handler finds it already settled.
    document.addEventListener('keydown', onFocus, true)
    motion.addEventListener?.('change', onMotion)
    onFocus()

    return () => {
      api.current = null
      ro.disconnect()
      loop.stop()
      stopGlance()
      touch = null
      hover = false
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
      root.removeEventListener('keydown', onKey)
      document.removeEventListener('focusin', onFocus)
      document.removeEventListener('focusout', onFocus)
      document.removeEventListener('keydown', onFocus, true)
      motion.removeEventListener?.('change', onMotion)
      glx.dispose()
    }
  }, [resolution])

  /* Without WebGL2 the plain image stands in. Marked after every render and
     not once: React writes the class attribute afresh whenever className
     changes, and would take the mark off with it, leaving an empty box. And
     before the browser paints, or a frame of that empty box shows between. */
  useIsomorphicLayoutEffect(() => {
    if (plain.current) rootRef.current?.classList.add('is-fallback')
  })

  // The image loads on its own, and a stale load must never land on a newer src.
  useEffect(() => loadImage(src, (img) => api.current?.setImage(img)), [src, resolution])

  useEffect(() => {
    api.current?.kick()
  }, [active, color, threshold, dim, reach, fade, trail, fit, focusX, focusY])

  const aims = num(reach, 0) > 0
  // The pointer does something here: it peaks the picture, or carries a disc that shows.
  const steers = active == null || (active === true && aims)
  return (
    <div
      ref={rootRef}
      className={[
        'focus-peaking',
        steers && 'focus-peaking--live',
        steers && aims && 'focus-peaking--aim',
        className,
      ].filter(Boolean).join(' ')}
      /* Same contract as <img>: a description names the picture; an empty alt
         marks it decorative — unless it has been given a tabIndex, since a
         thing focus can land on must not be hidden from whoever landed there. */
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt || rest.tabIndex != null ? undefined : 'true'}
      style={{
        '--peaking-src': src ? `url("${String(src).replace(/"/g, '%22')}")` : 'none',
        '--peaking-fit': fit === 'contain' ? 'contain' : 'cover',
        '--peaking-position': `${clamp01(num(focusX, 0.5)) * 100}% ${clamp01(num(focusY, 0.5)) * 100}%`,
        '--peaking-color': typeof color === 'string' ? color : undefined,
        ...style,
      }}
      {...rest}
    >
      <canvas ref={canvasRef} className="focus-peaking__canvas" aria-hidden="true" />
    </div>
  )
}
