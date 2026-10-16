'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { createGL, createLoop, linearRGB } from '../gl-core/gl.js'
import './BrushedMetal.css'

// Layout effects warn during server rendering; there is nothing to mark there.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/* =========================================================
   BrushedMetal
   A panel of brushed aluminium lit by a light that follows
   the pointer. The highlight is a streak, and the streak runs
   across the grain, not along it.

   That is the tell of real brushed metal and the thing a
   gradient overlay gets backwards. Brushing cuts grooves in
   one direction. Along a groove the surface is smooth; across
   it the facet normals rock from side to side. Reflection
   spreads in the direction the normals spread, so the light
   smears perpendicular to the brush lines.

   Microfacet theory says exactly how much. The anisotropic
   GGX distribution of facet normals h, with roughness αt
   along the grain tangent t and αb across it, is

     D(h) = 1 / (π·αt·αb·((h·t/αt)² + (h·b/αb)² + (h·n)²)²)

   and the specular response is D·G·F / (4·(n·l)(n·v)), with
   Smith's height-correlated masking G and Schlick's Fresnel
   F = F0 + (1 − F0)(1 − v·h)⁵, F0 being the metal's colour —
   metals have no diffuse term, all their colour is in F0.
   With αb several times αt the lobe is an ellipse stretched
   across the grain; with them equal it is a round spot, and
   the surface reads as polished rather than brushed.

   The grooves themselves are noise stretched along the grain,
   perturbing the normal toward b, so the streak breaks into
   the fine parallel scratches it has on a real laptop lid.

   The light is a lamp on an arm, and it moves like one. It
   follows the hand on a critically damped spring, solved
   exactly over the real time since the last frame, so it
   glides the same at 60 Hz and 120 Hz and never overshoots —
   a lamp does not wobble on its arm. It trails a hand moving
   steadily by 70 ms, enough to read as something with weight
   being carried and not enough to read as lag. A hand that
   has only just arrived is not snatched at: the light is
   brought over at a heavier weight and the grip closes as it
   comes, so it never streaks across from where it rested.
   Let go, it drifts home, up and to the left where a room's
   light usually is, following a hand that eases off rather
   than one that lets go all at once, so the drift starts as
   gently as it ends and carries on from whatever speed the
   light already had. Nothing teleports: a hand arriving
   mid-drift turns the light round from where it is.

   A press lowers the lamp toward the metal by `press` of its
   height, and the inverse-square law does the rest. The
   brightness is set at the lamp's resting height, so brought
   closer it lights the metal under it (h/h′)² as brightly,
   and the streak, whose reach goes with the light's height,
   draws in under the press. It goes down in about 150 ms and
   comes back up in about a quarter of a second. A press on
   bare metal keeps hold of the light through a drag past the
   panel's edge, where it rakes across from outside; one on
   anything placed on the metal leaves that thing its click.

   Touch has no hover, so a finger brings the light: it comes
   to where the finger lands, follows a finger dragged
   sideways, and stays where it was left for a second before
   it drifts home. A finger dragged up or down scrolls the
   page as it would anywhere (touch-action: pan-y), and two
   still zoom it.

   The panel takes no focus itself — there is nothing on bare
   metal to operate — but keyboard focus on anything placed on
   it brings the light over, as a hand hovering there would,
   and a key that presses it — Enter, or Space on anything but
   a link — lowers the lamp as a click does, and lets it up
   when the key comes up, even if what it pressed has gone
   from the page by then. Focus a click left behind was
   answered by the click, and is not answered twice, until a
   key shows its ring; a text field shows its ring for a click
   too, and the light goes to it only once the hand has left.

   A changed prop — grain, finish, colour, the light's
   height — eases to its new value in about a quarter of a
   second instead of cutting, the grain turning the short way
   round. The loop runs only while something is moving and
   the panel is on screen. Under reduced motion the light is
   simply where it is wanted — at the pointer, the focus, or
   home — and a press lowers it at once.
   ========================================================= */

const FRAGMENT = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;

uniform vec2 uSize;          // CSS px
uniform float uAngle;        // grain direction, radians
uniform float uAlphaT;       // roughness along the grain
uniform float uAlphaB;       // roughness across it
uniform float uGrain;
uniform vec3 uF0;            // linear
uniform vec3 uLight;         // x, y (px), height (px)
uniform float uRest;         // the height its brightness is set at, px
uniform float uIntensity;

const float PI = 3.14159265;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// Value noise, stretched along the grain by the caller.
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}

float lambda(vec3 w, float at, float ab) {
  float n2 = max(w.z * w.z, 1e-6);
  return 0.5 * (-1.0 + sqrt(1.0 + (at * at * w.x * w.x + ab * ab * w.y * w.y) / n2));
}

void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uSize;
  vec2 t2 = vec2(cos(uAngle), sin(uAngle));
  vec2 b2 = vec2(-t2.y, t2.x);

  // Grooves: fine across the grain, long along it.
  float along = dot(p, t2), across = dot(p, b2);
  float scratch = noise(vec2(along * 0.012, across * 1.1)) * 0.65
                + noise(vec2(along * 0.004, across * 0.23)) * 0.35;
  float tilt = (scratch - 0.5) * 0.55 * uGrain;

  vec3 n = normalize(vec3(b2 * tilt, 1.0));
  vec3 t = normalize(vec3(t2, 0.0) - n * dot(vec3(t2, 0.0), n));
  vec3 b = cross(n, t);

  // An eye far above the panel's centre, and the pointer's light above p.
  vec3 V = normalize(vec3(uSize * 0.5 - p, max(uSize.x, uSize.y) * 1.6));
  vec3 Lv = vec3(uLight.xy - p, uLight.z);
  float dist2 = dot(Lv, Lv);
  vec3 L = Lv / sqrt(dist2);
  vec3 H = normalize(L + V);

  // To the tangent frame.
  vec3 l = vec3(dot(L, t), dot(L, b), dot(L, n));
  vec3 v = vec3(dot(V, t), dot(V, b), dot(V, n));
  vec3 h = vec3(dot(H, t), dot(H, b), dot(H, n));
  float nl = max(l.z, 0.0), nv = max(v.z, 1e-4);

  float at = uAlphaT, ab = uAlphaB;
  float e = (h.x * h.x) / (at * at) + (h.y * h.y) / (ab * ab) + h.z * h.z;
  float D = 1.0 / (PI * at * ab * e * e);
  float G = 1.0 / (1.0 + lambda(l, at, ab) + lambda(v, at, ab));
  vec3 F = uF0 + (1.0 - uF0) * pow(1.0 - max(dot(V, H), 0.0), 5.0);
  vec3 spec = D * G * F / (4.0 * max(nl, 1e-4) * nv);

  // A light at the pointer, falling off with the square of its distance, over a
  // dim sky the metal reflects everywhere so nothing is ever black. Its
  // brightness is set at its resting height: lowered by a press, it is closer.
  float falloff = uRest * uRest / dist2;
  vec3 sky = uF0 * (0.10 + 0.08 * (1.0 - vUv.y)) * (0.8 + 0.4 * scratch);
  vec3 c = sky + spec * nl * falloff * uIntensity * 0.9;

  c = c / (1.0 + c);
  outColor = vec4(pow(c, vec3(1.0 / 2.2)), 1.0);
}`

const DEG = Math.PI / 180
const clamp = (n, lo, hi) => (n < lo ? lo : n > hi ? hi : n)
// A finite number, or the fallback: one NaN in a uniform blanks the whole frame.
const num = (v, d) => (v != null && v !== '' && Number.isFinite(+v) ? +v : d)

const SETTLE = 6.64   // ωt at which a critically damped spring is within 1% of home
const EASED = 8.41    // the same for one following an easing hand: three lags, not two
const FOLLOW = 0.07   // s the light trails a hand moving steadily: weight, not lag
const BRING = 0.45    // s to bring the light over to a hand that has just arrived
const GRIP = 0.2      // s, time constant of that hand's grip closing to FOLLOW's
const HOME = 0.8      // s for a light let go to drift home
const DIP = 0.15      // s for a press to lower the lamp
const RISE = 0.26     // s for it to come back up
const GLIDE = 0.08    // s, time constant a changed prop eases in over
const LINGER = 1000   // ms a light stays where a finger left it
const REST_X = 0.28   // home, as a share of the panel: up and to the left
const REST_Y = 0.22

// ω of the springs above.
const W_FOLLOW = 2 / FOLLOW          // a critically damped spring at a steady speed sits 2/ω behind
const W_BRING = EASED / BRING        // both of these follow a hand that eases in, so three lags
const W_HOME = EASED / HOME

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

// Somewhere a key types rather than presses.
const typing = (el) =>
  el.isContentEditable || /^(TEXTAREA|SELECT)$/.test(el.tagName)
  || (el.tagName === 'INPUT' && !/^(button|submit|reset|checkbox|radio|image|color|file)$/.test(el.type))

const isPress = (e) => e.key === 'Enter' || e.key === ' '
// Space presses a button; on a link it scrolls the page, and the lamp stays up.
const presses = (el, e) => isPress(e) && !typing(el) && !(e.key === ' ' && el.tagName === 'A')

// Props that ease, and how close counts as arrived.
const NEAR = { angle: 1e-4, at: 1e-4, ab: 1e-4, grain: 1e-3, intensity: 1e-3, height: 0.02, press: 1e-4 }

export default function BrushedMetal({
  angle = 0,               // grain direction, degrees clockwise — 0 brushes left to right
  roughness = 0.42,        // across the grain, 0..1
  anisotropy = 0.88,       // how much smoother it is along the grain, 0..1
  grain = 1,               // depth of the scratches
  color = '#c9cdd3',       // the metal's reflectance, F0 — aluminium by default
  intensity = 1,           // brightness of the light at its resting height
  height = 240,            // the light's height above the panel, px
  press = 0.3,             // how far a press lowers the light, as a share of its height; 0 turns it off
  resolution = 1.5,        // device-pixel-ratio cap
  children,
  className = '',
  style,
  ...rest
}) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const api = useRef(null)
  const flat = useRef(false)         // no WebGL2 here: the gradient stands in

  const live = useRef(null)
  // Synced after every render and before the effects below, so a redraw reads
  // current props without the GL context being rebuilt.
  useEffect(() => {
    live.current = { angle, roughness, anisotropy, grain, color, intensity, height, press, resolution }
  })

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const glx = root && canvas && createGL(canvas, { onRestore: () => loop.kick() })
    if (!glx) {                      // a plain gradient stands in; the effect after this one keeps it there
      flat.current = true
      root?.classList.add('is-fallback')
      return
    }

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let still = motion.matches

    const program = glx.program(FRAGMENT)
    let W = 0, H = 0                 // 0 until the panel has been measured
    let cap = live.current.resolution // the pixel density the canvas was last sized at

    // The light over the panel, px, and how far a press has it lowered, 0..1.
    const X = { x: 0, v: 0 }
    const Y = { x: 0, v: 0 }
    const Z = { x: 0, v: 0 }
    let holder = null                // 'pointer' | 'finger' | 'focus' while something has the light
    let tx = 0, ty = 0               // where that hand is
    let held = 0                     // s it has had the light, which its grip closes over
    let wx = 0, wy = 0               // where the light was wanted as of the last frame
    let hx = 0, hy = 0               // how far short of there the hand carrying it still is

    let cx = 0, cy = 0               // client point of the last pointer or finger
    let hover = false                // a mouse or pen is over the panel
    let finger = null                // pointerId of the finger on it
    let linger = 0                   // timer keeping the light where a finger left it
    let focused = null               // the thing on it the keyboard has focused
    let pressing = false             // the primary button or a pen's tip is down
    let touching = false             // the finger is down
    let keying = false               // Enter or Space is down on the focused thing

    let last = 0                     // time of the last frame; 0 while the loop is stopped
    let seen = null                  // the props `goal` was worked out for
    let fresh = true                 // the first frame takes the props as they are
    const goal = { angle: 0, at: 0.05, ab: 0.42, grain: 1, intensity: 1, height: 240, press: 0.3, f0: [0.6, 0.62, 0.65] }
    const cur = { ...goal, f0: [...goal.f0] }

    // Eases every prop toward its goal by k; true while any is still on its way.
    const ease = (k) => {
      let moving = false
      for (const key in NEAR) {
        const c = cur[key] + (goal[key] - cur[key]) * k
        if (Math.abs(goal[key] - c) <= NEAR[key]) cur[key] = goal[key]
        else { cur[key] = c; moving = true }
      }
      for (let i = 0; i < 3; i++) {
        const c = cur.f0[i] + (goal.f0[i] - cur.f0[i]) * k
        if (Math.abs(goal.f0[i] - c) <= 1e-4) cur.f0[i] = goal.f0[i]
        else { cur.f0[i] = c; moving = true }
      }
      return moving
    }

    const draw = (now) => {
      if (!W) return false
      const p = live.current
      /* A stopped loop has no last frame: its first step is one nominal frame,
         about how long the event that woke it has been waiting, so a press is
         already visibly under way on the first frame after it. A tab that was
         away comes back one short step on, not a leap. */
      const dt = last ? Math.min(Math.max(now - last, 0) / 1000, 1 / 30) : 1 / 60
      last = now

      // Colours go through a 2D context to be parsed: once per render, not per frame.
      if (p !== seen) {
        seen = p
        // A new density cap resizes the canvas where it stands; the light is not disturbed.
        if (p.resolution !== cap) {
          cap = p.resolution
          glx.resize(W, H, cap)
        }
        const ab = clamp(num(p.roughness, 0.42), 0.02, 1)
        // The grain turns the short way round: 350° is ten degrees back from 0°, not a whole turn on.
        const turn = num(p.angle, 0) * DEG
        goal.angle = fresh ? turn : turn + Math.round((cur.angle - turn) / (2 * Math.PI)) * 2 * Math.PI
        goal.ab = ab
        goal.at = Math.max(0.01, ab * (1 - clamp(num(p.anisotropy, 0.88), 0, 0.98)))
        goal.grain = Math.max(0, num(p.grain, 1))
        goal.intensity = Math.max(0, num(p.intensity, 1))
        goal.height = Math.max(10, num(p.height, 240))
        goal.press = clamp(num(p.press, 0.3), 0, 0.9)
        goal.f0 = linearRGB(p.color, [0.6, 0.62, 0.65])
      }
      const easing = ease(fresh || still ? 1 : 1 - Math.exp(-dt / GLIDE))
      fresh = false

      // The press: down quickly, up a little slower, never past either end.
      const down = pressing || touching || keying ? 1 : 0
      if (still) {
        Z.x = down; Z.v = 0
      } else {
        glide(Z, down, SETTLE / (down ? DIP : RISE), dt)
        if (Math.abs(down - Z.x) < 1e-3 && Math.abs(Z.v) < 1e-2) { Z.x = down; Z.v = 0 }
      }

      /* The light: carried by whatever holds it, or eased home. Either way it
         hangs from a hand that is still closing on where it is wanted, (hx, hy)
         short of it, so a new destination never yanks it: the hand sets off
         from where it already was and the pull builds as it goes. A light
         already moving is turned round, or carried on, not jerked. A hand
         that holds it tightens its grip from the weight it was brought over
         at to the one it is carried at. */
      const gx = holder ? tx : W * REST_X
      const gy = holder ? ty : H * REST_Y
      wx = gx
      wy = gy
      if (still) {
        X.x = gx; Y.x = gy
        X.v = Y.v = hx = hy = 0
      } else {
        // The grip at the middle of the step, on the clock the springs run on, so
        // the weight it is brought over at does not depend on how often it is drawn.
        const grip = holder ? 1 - Math.exp(-(held + dt / 2) / GRIP) : 0
        held += dt
        const w = holder ? W_BRING * (W_FOLLOW / W_BRING) ** grip : W_HOME
        glide(X, gx, w, dt, hx)
        glide(Y, gy, w, dt, hy)
        const e = Math.exp(-w * dt)
        hx *= e
        hy *= e
      }
      // Within a fifth of a pixel of a highlight this broad is there.
      if (Math.hypot(gx - X.x, gy - Y.x) < 0.2 && Math.hypot(X.v, Y.v) < 4 && Math.hypot(hx, hy) < 0.2) {
        X.x = gx; Y.x = gy
        X.v = Y.v = hx = hy = 0
      }

      program.set({
        uSize: [W, H],
        uAngle: cur.angle % (2 * Math.PI),
        uAlphaT: cur.at,
        uAlphaB: cur.ab,
        uGrain: cur.grain,
        uF0: cur.f0,
        uLight: [X.x, Y.x, cur.height * (1 - cur.press * clamp(Z.x, 0, 1))],
        uRest: cur.height,
        uIntensity: cur.intensity,
      })
      glx.draw()

      const moving = easing || X.x !== gx || Y.x !== gy || X.v !== 0 || Y.v !== 0 || hx !== 0 || hy !== 0
        || Z.x !== down || Z.v !== 0
      if (!moving) {
        last = 0
        held = Infinity              // a light brought to rest under a hand is held as firmly as it will be
      }
      return moving
    }

    const loop = createLoop(root, draw)
    const wake = () => loop.kick()
    api.current = { kick: wake }

    // The hand at client (cx, cy), over the panel.
    const aim = () => {
      const b = root.getBoundingClientRect()
      tx = cx - b.left
      ty = cy - b.top
    }
    // Or the middle of the thing the keyboard is on, kept on the panel.
    const aimAt = (el) => {
      const b = root.getBoundingClientRect()
      const r = el.getBoundingClientRect()
      tx = clamp(r.left + r.width / 2 - b.left, 0, W)
      ty = clamp(r.top + r.height / 2 - b.top, 0, H)
    }

    /* Something takes the light, (tx, ty) already set to where it is wanted.
       A hand that has only just arrived, or that has jumped somewhere else,
       sets off from where the last one had got to and brings it over; one
       that already has it keeps the grip it has. */
    const take = (who, jump = false) => {
      if (jump || holder !== who) {
        held = 0
        hx += wx - tx
        hy += wy - ty
        wx = tx
        wy = ty
      }
      holder = who
    }
    // Nothing has it now: it is eased home from there, at the speed it has.
    const letGo = () => {
      if (!holder) return
      holder = null
      hx += wx - W * REST_X
      hy += wy - H * REST_Y
      wx = W * REST_X
      wy = H * REST_Y
    }
    // Whatever had it has let go. Something else that wants it takes it, or it goes home.
    const reconsider = () => {
      if (finger !== null || linger) return
      // A focused thing taken out of the page loses focus without a word.
      if (focused && document.activeElement !== focused) focused = null
      if (hover) { aim(); take('pointer') }
      else if (focused) { aimAt(focused); take('focus') }
      else letGo()
      wake()
    }

    // The page scrolling under a still hand moves the metal, not the hand.
    const onScroll = () => {
      if (holder !== 'pointer' && holder !== 'finger') return
      aim(); wake()
    }
    /* And a finger's lift is heard wherever it happens. Its events go to what
       it landed on, but if that takes itself off the page mid-touch they go to
       whatever lies under the finger from then on, and past the panel's edge
       that is not the panel: the lamp would stay down for good. So the lift is
       listened for on the window as well, and only while the finger is down. */
    let watching = false
    let lifting = false
    const watch = () => {
      const down = finger !== null
      if (down !== lifting) {
        lifting = down
        const listen = down ? 'addEventListener' : 'removeEventListener'
        window[listen]('pointerup', onUp, true)
        window[listen]('pointercancel', onUp, true)
      }
      const on = hover || down
      if (on === watching) return
      watching = on
      window[on ? 'addEventListener' : 'removeEventListener']('scroll', onScroll, { capture: true, passive: true })
    }

    const onMove = (e) => {
      if (e.pointerType === 'touch') {
        if (e.pointerId !== finger) return
        cx = e.clientX
        cy = e.clientY
        aim(); wake()
        return
      }
      cx = e.clientX
      cy = e.clientY
      // A release that never reached the panel — a context menu took it, or something
      // on the metal kept it to itself — shows in the next move: the button is up.
      if (pressing && e.type !== 'pointerdown' && !(e.buttons & 1)) pressing = false
      if (!hover) { hover = true; watch() }
      aim(); take('pointer'); wake()
    }

    const onDown = (e) => {
      if (e.pointerType === 'touch') {
        if (!e.isPrimary) return     // a second finger makes it a pinch, and that is the page's
        clearTimeout(linger)
        linger = 0
        finger = e.pointerId
        touching = true
        cx = e.clientX
        cy = e.clientY
        aim(); take('finger', true); watch(); wake()
        return
      }
      if (e.button !== 0) return
      pressing = true
      // Bare metal is held through a drag past its edge. Anything placed on it
      // keeps the pointer, or its click would land on the panel instead.
      if (e.target === root || e.target.parentNode === root) {
        try { root.setPointerCapture(e.pointerId) } catch { /* capture is a nicety */ }
      }
      onMove(e)
    }

    const onUp = (e) => {
      if (e.pointerType === 'touch') {
        if (e.type === 'lostpointercapture' || e.pointerId !== finger) return
        finger = null
        touching = false
        // Lifted, or taken by the page to scroll with: the light stays a moment, then goes home.
        linger = setTimeout(() => { linger = 0; reconsider() }, LINGER)
        watch(); wake()
        return
      }
      if (e.type === 'lostpointercapture' && e.target !== root) return
      if (!pressing) return
      pressing = false
      // Let go past the edge of the panel, or taken by the page, it is no longer over it.
      // A capture lost says nothing of where the pointer is; the last move did.
      const b = root.getBoundingClientRect()
      const x = e.type === 'lostpointercapture' ? cx : e.clientX
      const y = e.type === 'lostpointercapture' ? cy : e.clientY
      const out = x < b.left || x >= b.right || y < b.top || y >= b.bottom
      if (out || e.type === 'pointercancel') {
        hover = false
        watch(); reconsider()
      }
      wake()
    }

    const onLeave = (e) => {
      if (e.pointerType === 'touch' || !hover) return   // follows every lift; not a leave
      hover = false
      pressing = false
      watch(); reconsider()
    }

    const onFocusIn = (e) => {
      const el = e.target
      if (el === root || !keyboard(el)) return
      focused = el
      // A text field rings for a click as well. That focus is the press's doing: the
      // light stays under the hand, and comes here when the hand has gone.
      if (pressing || touching) return
      aimAt(el); take('focus', true); wake()
    }
    /* The key that pressed comes up wherever focus is by then. What it pressed
       may have taken itself off the page — a close button, a row's delete — and
       the keyup then goes to the body, past the panel; nor does every browser
       tell a thing removed that it lost focus. So it is listened for on the
       window, and only while a key is down. */
    const key = (on) => {
      if (on === keying) return
      keying = on
      window[on ? 'addEventListener' : 'removeEventListener']('keyup', onKeyUp, true)
    }
    const onKeyUp = (e) => {
      if (!isPress(e)) return
      key(false)
      if (focused && document.activeElement !== focused) {
        focused = null
        if (holder === 'focus') reconsider()
      }
      wake()
    }
    const onFocusOut = (e) => {
      if (e.target !== focused) return
      focused = null
      key(false)
      if (holder === 'focus') reconsider()
      wake()
    }
    const onKeyDown = (e) => {
      const el = e.target
      // A key shows the ring on something a click had focused. The light goes where the ring is.
      if (el !== focused && el !== root && keyboard(el)) {
        focused = el
        if (!pressing && !touching) { aimAt(el); take('focus', true) }
        wake()
      }
      if (e.repeat || el !== focused || !presses(el, e)) return
      key(true)
      wake()
    }

    const onMotion = () => { still = motion.matches; wake() }

    const ro = new ResizeObserver(() => {
      const b = root.getBoundingClientRect()
      // A light at rest stays at rest: it does not slide to a home the layout moved.
      const home = !W || (!holder && X.x === W * REST_X && Y.x === H * REST_Y && !X.v && !Y.v)
      W = Math.max(1, b.width)
      H = Math.max(1, b.height)
      glx.resize(W, H, cap)
      if (home) {
        X.x = wx = W * REST_X
        Y.x = wy = H * REST_Y
        X.v = Y.v = hx = hy = 0
      }
      // The metal has moved under a still hand, and the thing the keyboard is on with the layout.
      if (holder === 'pointer' || holder === 'finger') {
        tx = cx - b.left
        ty = cy - b.top
      } else if (holder === 'focus') {
        if (focused && document.activeElement === focused) aimAt(focused)
        else reconsider()
      }
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
    root.addEventListener('focusin', onFocusIn)
    root.addEventListener('focusout', onFocusOut)
    root.addEventListener('keydown', onKeyDown, { passive: true })
    motion.addEventListener?.('change', onMotion)

    return () => {
      api.current = null
      ro.disconnect()
      loop.stop()
      clearTimeout(linger)
      hover = false
      finger = null
      watch()
      key(false)
      root.removeEventListener('pointerenter', onMove)
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerdown', onDown)
      root.removeEventListener('pointerup', onUp)
      root.removeEventListener('pointercancel', onUp)
      root.removeEventListener('lostpointercapture', onUp)
      root.removeEventListener('pointerleave', onLeave)
      root.removeEventListener('focusin', onFocusIn)
      root.removeEventListener('focusout', onFocusOut)
      root.removeEventListener('keydown', onKeyDown)
      motion.removeEventListener?.('change', onMotion)
      glx.dispose()
    }
  }, [])

  /* Without WebGL2 a plain gradient stands in, and there is no light to carry.
     Marked again after every render and not once: React writes the class
     afresh whenever className changes, and would take the mark off with it.
     And before the browser paints, or a frame of flat colour shows between. */
  useIsomorphicLayoutEffect(() => {
    if (flat.current) rootRef.current?.classList.add('is-fallback')
  })

  useEffect(() => {
    api.current?.kick()
  }, [angle, roughness, anisotropy, grain, color, intensity, height, press, resolution])

  return (
    <div
      ref={rootRef}
      className={`brushed-metal ${className}`.trim()}
      style={{ '--metal-color': color, ...style }}
      {...rest}
    >
      <canvas ref={canvasRef} className="brushed-metal__canvas" aria-hidden="true" />
      <div className="brushed-metal__content">{children}</div>
    </div>
  )
}
