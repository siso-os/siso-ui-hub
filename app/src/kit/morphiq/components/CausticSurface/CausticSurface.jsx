'use client'

import { useEffect, useRef } from 'react'
import { createGL, createLoop, linearRGB } from '../gl-core/gl.js'
import './CausticSurface.css'

/* =========================================================
   CausticSurface
   The net of light on the floor of a swimming pool, as a
   backdrop. Moving the pointer drops ripples into the water
   and the net reorganises around them.

   The usual caustic is a scrolling noise texture, and it
   reads wrong because nothing about it is light: it does not
   sharpen as the water deepens, and a ripple cannot bend it.
   The bright lines are not painted; they are where refraction
   crowds light together.

   Sunlight comes straight down and bends at the surface by
   Snell's law. For slopes this small the bend linearises, and
   a ray entering at surface point p lands on a floor D below at

     q = p + D·(1 − 1/n)·∇h(p),    n = 1.333

   Light is conserved, so the brightness at q is the area a
   patch of surface had over the area it lands on:

     E = 1 / |det(∂q/∂p)| = 1 / |det(I + D·(1 − 1/n)·H)|

   with H the Hessian of the height field. Where the surface
   focuses, the patch collapses, det → 0 and E spikes — those
   spikes are the lines. The shader works backwards from each
   floor pixel: a few fixed-point steps of p = q − D·(1−1/n)·∇h
   find the surface point that lights it, then E is evaluated
   there. Deeper water means a larger D, which is why pools
   show sharper, busier nets in the deep end.

   The surface is a sum of travelling waves with deep-water
   dispersion ω = √(g·k), so long waves outrun short ones.
   Gerstner waves would also displace the surface sideways,
   which matters for drawing the water itself; the floor only
   sees slopes, and to first order in amplitude the two agree.
   A ripple is a circular packet that spreads its energy over a
   growing ring, so its height falls as 1/√r and with age.

   Only ∇h and H are ever needed, and for sines and ring
   packets both can be written down, so the shader does: no
   finite differences, which would sample the whole surface
   four times per step and nine more for the Hessian. That is
   what lets a dozen ripples cost less than the bare water did,
   so the frame rate does not sag the moment the water is
   touched. Each wave carries its own phase, advanced by ω·dt:
   computed as ω·t, a wavelength change would multiply against
   all the time that has passed and scramble the net; this way
   it only changes how fast the phase turns from here on.

   What the pointer gives the water follows the hand. A pointer
   that starts to move is answered within a few pixels; after
   that it sheds a ripple every so often along its path, and
   how hard depends on how fast it is going — measured over the
   last 70 ms of travel, not one event — so a slow drag barely
   stirs the net and a flick tears a wake through it. A press
   drops the full thing: the primary button, a pen's tip, each
   finger that lands. On a touch screen that press is the tap;
   a finger that drags is scrolling the page, and the water
   does not take the gesture from it.

   The keyboard reaches the water where the pointer would
   have. Focus that a key brings onto something on the surface
   stirs the water under it, as a pointer coming onto it does,
   and a key that activates it drops what a press drops.
   Focus that a click brought, and the click itself, were
   answered when the pointer went down, and are not answered
   twice.

   No ripple appears from nothing, and none ends in a cut. The
   push that raises one takes a few hundredths of a second, so
   the first frame already answers but the light never jumps.
   The faintness at which one is let go is taken off the whole
   of its life, so it arrives at nothing: stopped just short, a
   twentieth of a pixel of height still shifts every line the
   ring crosses by a quarter of a pixel, all in one frame, and
   that shows as a tick. There are only so many ripples, and
   under a scribbling hand the oldest must make room: a few
   places are kept empty or emptying, and a ripple asked to
   leave bows out over a quarter of a second, which is over
   before its place is needed at the pace a pointer sheds them.
   Presses are not paced: drummed faster than about ten a
   second for a second on end, they do cut the oldest short.

   Ripples and eases run on elapsed time, capped per frame, so
   they are the same at 60 Hz and 120 Hz and nothing leaps
   after the tab was away. A changed prop — depth, colour, even
   speed — eases to its new value instead of cutting, and a
   changed wavelength rescales the net about the middle of the
   surface, not out of its corner. When nothing can change
   (speed, amplitude or depth at 0, or reduced motion, with no
   ripple left) the loop stops, and wakes for the next ripple
   or prop. Under reduced
   motion the water holds one still frame, and neither pointer
   nor key disturbs it.
   ========================================================= */

const WAVE_COUNT = 5
const MAX_RIPPLES = 12

const G = 380               // px/s²: the longest default wave drifts at a calm ~110px/s
const TAU = Math.PI * 2

/* Wavelength ratio, heading (rad), amplitude ratio. Headings spread across the
   half-circle so the cells come out round rather than combed one way. Amplitude
   goes as λ², because curvature — what focuses light — grows as A·k²: this way
   every component focuses equally and no single heading dominates the net. */
const WAVES = [
  [1.00, 0.35, 1.000],
  [0.74, 1.58, 0.548],
  [0.55, 2.71, 0.303],
  [0.43, -1.92, 0.185],
  [0.33, -0.66, 0.109],
]

const RING_SPEED = 150      // px/s, how fast a ripple's ring opens
const RISE = 0.06           // s, the push that raises a ripple
const LIFE = 1.4            // s, e-folding of a ripple's height
const FAINT = 0.006         // of a press: a ripple this faint is past seeing, and ends there

const WINDOW = 70           // ms of travel the pointer's speed is measured over
const START = 8             // px a pointer that was at rest moves before the water answers
const SPACING = 48          // px of travel between the ripples it sheds after that
const GAP = 90              // ms, and never more often than this
const FLICK = 1600          // px/s at which a moving pointer gives all it can…
const WAKE = 0.75           // …which is this much of a press
const ARRIVE = 0.5          // of a press: what focus arriving by key stirs, a pointer coming in briskly

const SPARE = 3             // places kept empty, or emptying, for the ripples about to come
const HANDOVER = 0.24       // s a ripple takes to bow out of one: just inside SPARE × GAP

const GLIDE = 0.12          // s, time constant a changed prop eases in over
const STILL_TIME = 14       // s, the moment reduced motion holds

const FRAGMENT = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;

uniform vec2 uSize;               // CSS px
uniform float uDepth;             // px of water between surface and floor
uniform float uIntensity;
uniform vec3 uLight;              // linear
uniform vec3 uFloor;              // linear
uniform vec4 uWaves[${WAVE_COUNT}];            // wave vector x, y (rad/px), phase (rad), height (px)
uniform vec4 uRipples[${MAX_RIPPLES}];         // centre x, y (px), ring radius (px), height (px)

const float BEND = 1.0 - 1.0 / 1.333;
const float KAPPA = 0.075;        // rad/px: an 84px ripple…
const float RING = 900.0;         // …in a packet 30px wide across the ring (σ², px²)
const float CORE = 100.0;         // px²: rounds the centre, where a bare ring profile is a cone

/* A ripple's profile across its ring, h = A·exp(−x²/2σ²)·cos(κx) with x the
   distance outside the ring, as its first and second derivative in x. */
vec2 ring(float x, float height) {
  float c = cos(KAPPA * x);
  float s = sin(KAPPA * x);
  return height * exp(-x * x / (2.0 * RING)) * vec2(
    -x / RING * c - KAPPA * s,
    (x * x / (RING * RING) - 1.0 / RING - KAPPA * KAPPA) * c + 2.0 * KAPPA * x / RING * s);
}

/* ∇h. */
vec2 slope(vec2 p) {
  vec2 g = vec2(0.0);
  for (int i = 0; i < ${WAVE_COUNT}; i++) {
    vec4 w = uWaves[i];
    g += w.w * cos(dot(w.xy, p) - w.z) * w.xy;
  }
  for (int i = 0; i < ${MAX_RIPPLES}; i++) {
    vec4 r = uRipples[i];
    if (r.w == 0.0) continue;
    vec2 v = p - r.xy;
    float d = sqrt(dot(v, v) + CORE);
    float x = d - r.z;
    if (abs(x) > 120.0) continue;                         // four σ out: nothing left of the packet
    g += ring(x, r.w).x * v / d;
  }
  return g;
}

/* The Hessian of h, as (hxx, hyy, hxy). */
vec3 curvature(vec2 p) {
  vec3 H = vec3(0.0);
  for (int i = 0; i < ${WAVE_COUNT}; i++) {
    vec4 w = uWaves[i];
    H -= w.w * sin(dot(w.xy, p) - w.z) * vec3(w.x * w.x, w.y * w.y, w.x * w.y);
  }
  for (int i = 0; i < ${MAX_RIPPLES}; i++) {
    vec4 r = uRipples[i];
    if (r.w == 0.0) continue;
    vec2 v = p - r.xy;
    float d = sqrt(dot(v, v) + CORE);
    float x = d - r.z;
    if (abs(x) > 120.0) continue;
    vec2 f = ring(x, r.w);
    vec2 n = v / d;
    float around = f.x / d;                               // a ring also curves around its centre
    H += vec3(around, around, 0.0) + (f.y - around) * vec3(n.x * n.x, n.y * n.y, n.x * n.y);
  }
  return H;
}

void main() {
  vec2 q = vec2(vUv.x, 1.0 - vUv.y) * uSize;
  float k = uDepth * BEND;

  /* The surface point whose refracted ray lands here. Relaxed, because past a
     fold several surface points light the same floor pixel and a bare
     iteration flips between them, which shows as hairline stripes. */
  vec2 p = q;
  for (int i = 0; i < 7; i++) p = mix(p, q - k * slope(p), 0.55);

  vec3 H = curvature(p);
  float det = (1.0 + k * H.x) * (1.0 + k * H.y) - k * k * H.z * H.z;
  float E = 1.0 / max(abs(det), 0.06);

  // The floor keeps its own colour; light is added where it is focused past
  // the mean, so the unfocused water between the lines stays dark.
  float focus = max(E - 0.75, 0.0);
  vec3 c = uFloor * (0.7 + 0.3 * min(E, 1.5)) + uLight * uIntensity * 0.2 * focus * sqrt(focus);
  c = c / (1.0 + c * 0.6);
  outColor = vec4(pow(c, vec3(1.0 / 2.2)), 1.0);
}`

const finite = (v, fallback) => (Number.isFinite(v) ? v : fallback)

export default function CausticSurface({
  depth = 260,          // px of water above the floor; deeper is a sharper, busier net
  amplitude = 11,       // px, height of the longest wave
  wavelength = 200,     // px, of the longest wave
  speed = 1,            // time scale of the waves; 0 stills them
  ripple = 1,           // strength of a press's ripple, and the scale of a moving pointer's or arriving focus's; 0 turns them off
  intensity = 1,        // brightness of the focused light
  color = '#d6f3ff',    // the light
  background = '#03202a', // the pool floor
  resolution = 1.5,     // device-pixel-ratio cap
  children,
  className = '',
  style,
  ...rest
}) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)

  const live = useRef(null)
  const wake = useRef(null)
  // Synced after every render and before the effect below, so the loop reads
  // current props without the GL context being rebuilt — and is woken for
  // them, since it sleeps whenever the picture has nothing left to change.
  useEffect(() => {
    live.current = { depth, amplitude, wavelength, speed, ripple, intensity, color, background, resolution }
    wake.current?.()
  })

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const glx = root && canvas && createGL(canvas, { onRestore: () => loop.kick() })
    if (!glx) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let still = motion.matches
    const program = glx.program(FRAGMENT)

    const waves = new Float32Array(WAVE_COUNT * 4)
    const phase = new Float64Array(WAVE_COUNT)      // ω·t so far, per wave
    const wavenumber = new Float64Array(WAVE_COUNT) // k as last drawn, per wave
    const ripples = new Float32Array(MAX_RIPPLES * 4)
    // strength 0 is an empty place; `left` is how much of a ripple remains.
    const pool = Array.from({ length: MAX_RIPPLES }, () => (
      { x: 0, y: 0, age: 0, strength: 0, left: 0, fade: 1, leaving: false }
    ))

    // depth, amplitude, wavelength, speed, intensity, then light and floor as linear RGB
    const target = new Float64Array(11)
    const shown = new Float64Array(11)
    let started = false
    let lightKey, floorKey
    let size = { w: 1, h: 1 }
    let density = live.current.resolution
    let last = 0

    const paint = (dt) => {
      const p = live.current
      if (p.resolution !== density) {
        density = p.resolution
        glx.resize(size.w, size.h, density)
      }

      target[0] = Math.max(0, finite(p.depth, 260))
      target[1] = Math.max(0, finite(p.amplitude, 11))
      target[2] = Math.max(8, finite(p.wavelength, 200))
      target[3] = finite(p.speed, 1)
      target[4] = Math.max(0, finite(p.intensity, 1))
      if (p.color !== lightKey) target.set(linearRGB(lightKey = p.color, [0.7, 0.9, 1]), 5)
      if (p.background !== floorKey) target.set(linearRGB(floorKey = p.background, [0, 0.02, 0.03]), 8)

      // Every setting eases to where it was put, and lands exactly. The last
      // step is a thousandth of the value — or, for a colour headed to black,
      // a ten-thousandth of white, which is below one step of an 8-bit screen.
      const ease = 1 - Math.exp(-dt / GLIDE)
      let gliding = false
      for (let i = 0; i < target.length; i++) {
        const gap = target[i] - shown[i]
        if (!started || still || Math.abs(gap) < 1e-4 + 1e-3 * Math.abs(target[i])) {
          shown[i] = target[i]
        } else {
          shown[i] += gap * ease
          gliding = true
        }
      }
      const [depthNow, height, length, rate, glow] = shown

      for (let i = 0; i < WAVE_COUNT; i++) {
        const [ratio, heading, share] = WAVES[i]
        const k = TAU / (length * ratio)
        const omega = Math.sqrt(G * k)
        const cos = Math.cos(heading)
        const sin = Math.sin(heading)
        if (still) {
          phase[i] = omega * STILL_TIME
        } else {
          // A wavelength on its way to a new value also turns each phase by what
          // the change does at the middle of the surface, which holds the net
          // still there: it grows or tightens about the centre, not a corner.
          const pivot = started ? (k - wavenumber[i]) * (cos * size.w + sin * size.h) / 2 : 0
          phase[i] = (phase[i] + omega * rate * dt + pivot) % TAU
        }
        wavenumber[i] = k
        waves[i * 4] = k * cos
        waves[i * 4 + 1] = k * sin
        waves[i * 4 + 2] = phase[i] - i * 1.7
        waves[i * 4 + 3] = height * share
      }
      started = true

      let rippling = false
      const corner = Math.hypot(size.w, size.h)
      for (let i = 0; i < MAX_RIPPLES; i++) {
        const r = pool[i]
        if (r.strength > 0) {
          r.age += dt
          if (r.leaving) r.fade = Math.max(0, r.fade - dt / HANDOVER)
          const radius = RING_SPEED * r.age
          const bow = r.fade * r.fade * (3 - 2 * r.fade)
          // FAINT comes off the whole of its life, so a ripple arrives at
          // nothing instead of being cut off just short of it.
          r.left = r.strength * bow * Math.exp(-r.age / LIFE) / Math.sqrt(1 + radius / 30) - FAINT
          // Spent once it has faded past seeing or its ring has left the surface.
          if (r.left <= 0 || radius > corner + 120) r.strength = r.left = 0
        }
        rippling ||= r.strength > 0
        ripples[i * 4] = r.x
        ripples[i * 4 + 1] = r.y
        ripples[i * 4 + 2] = RING_SPEED * r.age
        ripples[i * 4 + 3] = r.strength > 0 ? 0.8 * height * r.left * (1 - Math.exp(-r.age / RISE)) : 0
      }

      program.set({
        uSize: [size.w, size.h],
        uDepth: depthNow,
        uIntensity: glow,
        uLight: shown.subarray(5, 8),
        uFloor: shown.subarray(8, 11),
        uWaves: waves,
        uRipples: ripples,
      })
      glx.draw()
      // Still water, flat water, and water with no depth to focus through all
      // draw the same frame again; only a glide or a ripple needs another.
      return gliding || rippling || (!still && rate !== 0 && height > 0 && depthNow > 0)
    }

    // Elapsed time, capped so a frame after a stall is one long step, not a
    // leap. The frame that wakes a sleeping loop counts as an ordinary one, so
    // what woke it shows at once.
    const tick = (now) => {
      const dt = last ? Math.min(0.05, Math.max(0, (now - last) / 1000)) : 1 / 60
      const busy = paint(dt)
      last = busy ? now : 0
      return busy
    }

    const loop = createLoop(root, tick)
    wake.current = loop.kick

    /* Takes the place with the least left in it — an empty one while there is
       one. Then, if fewer than SPARE places are empty or emptying, the faintest
       of the rest start bowing out now, so that a place is silent by the time
       a ripple needs it. */
    const drop = (x, y, strength) => {
      // Past seeing from the start, or on water too flat or too shallow to
      // show it: not worth a place, nor waking the loop for.
      if (!(strength > FAINT) || !(shown[0] > 0 && shown[1] > 0)) return
      let place = pool[0]
      for (const r of pool) if (r.left < place.left) place = r
      Object.assign(place, { x, y, age: 0, strength, left: strength, fade: 1, leaving: false })

      let spare = 0
      for (const r of pool) if (r.strength === 0 || r.leaving) spare++
      for (; spare < SPARE; spare++) {
        let faintest = null
        for (const r of pool) {
          if (r !== place && !r.leaving && r.strength > 0 && (!faintest || r.left < faintest.left)) faintest = r
        }
        if (!faintest) break
        faintest.leaving = true
      }
      loop.kick()
    }

    const local = (e) => {
      const b = root.getBoundingClientRect()
      return [e.clientX - b.left, e.clientY - b.top]
    }

    const trail = []                // the last WINDOW ms of the pointer: [ms, x, y]
    let holder = -1                 // the pointer the trail belongs to
    let travel = 0                  // px moved since the last ripple
    let fresh = true                // the pointer was at rest, or away, and has shed nothing since
    let shedAt = -Infinity

    const onMove = (e) => {
      const share = finite(live.current.ripple, 1)
      if (still || !e.isPrimary || !(share > 0)) return
      if (e.pointerId !== holder) {
        holder = e.pointerId
        trail.length = 0
      }
      const t = e.timeStamp
      const prev = trail[trail.length - 1]
      trail.push([t, e.clientX, e.clientY])
      while (t - trail[0][0] > WINDOW) trail.shift()
      if (trail.length < 2) {       // first sample after a pause: no speed to speak of yet
        travel = 0
        fresh = true
        return
      }
      travel += Math.hypot(e.clientX - prev[1], e.clientY - prev[2])
      if (travel < (fresh ? START : SPACING) || t - shedAt < GAP) return

      let path = 0
      for (let i = 1; i < trail.length; i++) {
        path += Math.hypot(trail[i][1] - trail[i - 1][1], trail[i][2] - trail[i - 1][2])
      }
      const pace = path / (Math.max(16, t - trail[0][0]) / 1000)    // px/s
      travel = 0
      fresh = false
      shedAt = t
      drop(...local(e), share * WAKE * Math.min(1, pace / FLICK) ** 0.6)
    }

    // A press is its own ripple, and the wake after it starts from there. Any
    // finger may press; the button that opens a menu is not pressing the water.
    const onDown = (e) => {
      const share = finite(live.current.ripple, 1)
      if (still || e.button !== 0 || !(share > 0)) return
      if (e.isPrimary) {
        holder = e.pointerId
        trail.length = 0
        trail.push([e.timeStamp, e.clientX, e.clientY])
        travel = 0
        fresh = false
        shedAt = e.timeStamp
      }
      drop(...local(e), share)
    }

    // Where it comes back in is no measure of how fast it was going.
    const onLeave = () => {
      trail.length = 0
    }

    /* The keyboard, at the centre of what it acts on. Which hand moved last is
       asked of the whole document: the Tab that brings focus in is pressed
       while focus is still outside. A held key repeats faster than any hand
       presses, so it keeps the wake's pace — which also answers once a key
       that both moves focus and activates, as an arrow in a radio group does. */
    let keyed = false
    const onKey = () => { keyed = true }
    const onPointer = () => { keyed = false }

    const under = (e, part) => {
      const share = finite(live.current.ripple, 1)
      if (still || !keyed || e.timeStamp - shedAt < GAP || !(share > 0)) return
      shedAt = e.timeStamp
      const b = root.getBoundingClientRect()
      const at = e.target.getBoundingClientRect()
      drop(at.left + at.width / 2 - b.left, at.top + at.height / 2 - b.top, share * part)
    }

    const onFocus = (e) => under(e, ARRIVE)

    // A pointer's click counts its presses; a key's counts none. Heard at the
    // document: a click listener on the surface itself would make all of it a
    // tap target to a phone's browser, which flashes its highlight over one.
    const onClick = (e) => {
      if (e.detail === 0 && root.contains(e.target)) under(e, 1)
    }

    const onMotion = () => {
      still = motion.matches
      for (const r of pool) r.strength = r.left = 0
      loop.kick()
    }

    // Sizing the canvas clears it, and this runs after the frame's draw: paint
    // again here, or every step of a resize shows one blank frame.
    const ro = new ResizeObserver(() => {
      const b = root.getBoundingClientRect()
      size = { w: Math.max(1, b.width), h: Math.max(1, b.height) }
      glx.resize(size.w, size.h, density)
      paint(0)
      loop.kick()
    })
    ro.observe(root)

    root.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerdown', onDown, { passive: true })
    root.addEventListener('pointerleave', onLeave)
    root.addEventListener('focusin', onFocus)
    const page = root.ownerDocument
    page.addEventListener('keydown', onKey, { capture: true, passive: true })
    page.addEventListener('pointerdown', onPointer, { capture: true, passive: true })
    page.addEventListener('click', onClick, { capture: true, passive: true })
    motion.addEventListener('change', onMotion)

    return () => {
      wake.current = null
      ro.disconnect()
      loop.stop()
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerdown', onDown)
      root.removeEventListener('pointerleave', onLeave)
      root.removeEventListener('focusin', onFocus)
      page.removeEventListener('keydown', onKey, { capture: true })
      page.removeEventListener('pointerdown', onPointer, { capture: true })
      page.removeEventListener('click', onClick, { capture: true })
      motion.removeEventListener('change', onMotion)
      glx.dispose()
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className={`caustic-surface ${className}`.trim()}
      style={{ '--caustic-floor': background, ...style }}
      {...rest}
    >
      <canvas ref={canvasRef} className="caustic-surface__canvas" aria-hidden="true" />
      <div className="caustic-surface__content">{children}</div>
    </div>
  )
}
