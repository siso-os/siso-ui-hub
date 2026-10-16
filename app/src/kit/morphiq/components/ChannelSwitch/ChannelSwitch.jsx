'use client'

import { useEffect, useRef, useState } from 'react'
import './ChannelSwitch.css'

/* =========================================================
   ChannelSwitch
   Content changes the way a cathode-ray set changes channel:
   the picture collapses to a bright line, the line to a dot,
   the dot glows and fades; then the new picture opens out of
   a line and rolls vertically until the set locks on to it.

   Each stage is what the tube physically did.

   The collapse is the deflection failing. The beam is swept
   by two magnetic fields; the vertical one goes first, so
   every row lands on the same line, and all the picture's
   energy lands there with it — the line is brighter than any
   part of the picture was. The horizontal one holds a beat
   longer, then goes too, and the line becomes a dot, brighter
   again. Each scan is a coil and its amplifier, a second-
   order system, x″ = −ω²(x − target) − 2ω·x′, critically
   damped so the picture never swings past the bezel. It is
   stepped exactly, so it draws the same curve at 60 Hz and
   120 Hz, and it has a velocity: nothing about a switch is a
   timeline that could be restarted.

   That is what makes a second change of channel cheap. While
   the picture is going, or the tube is dark, there is nothing
   to do — whatever channel is newest when the tube goes dark
   is the one that goes in. If the picture is already opening
   on the new one, the scans are simply driven off again from
   where they are, at the speed they have: a half-open picture
   folds from half open, never from the full one, and a line
   caught still growing turns round at once. And if the
   channel goes back to what is still on show before the tube
   is dark, nothing is owed any more; the picture opens again
   from wherever it got to, with nothing swapped and no roll.

   The dot is the beam left undeflected. It lingers while the
   EHT drains, about a fifth of the duration, and as the next
   channel comes in the beam returns first: the dot flares,
   then streaks out into a line, then opens into the picture.
   Coming on takes a little longer than going off — the eye
   wants time with what arrives, not with what leaves — and
   the new picture is not shown until it is actually in the
   document, however long its render takes.

   The glow is phosphor persistence. The screen keeps emitting
   after the beam has gone, decaying exponentially. All of the
   overlay's light lies on the one line the beam is confined
   to, so the overlay is a feedback buffer along that line:
   every frame the glow left from before is kept at e^(−Δt/τ),
   and wherever the beam is now the phosphor shines at least as
   brightly as it drives it. A dot does not blink out; it
   fades, and a shrinking line leaves a trail. The buffer is
   held in floats, so a long τ fades all the way to black
   instead of stalling a few levels above it, and it is light,
   so it is screened over the picture rather than painted on.

   The roll is the vertical hold. A new signal's sync pulses
   arrive at an arbitrary phase, and once the vertical scan is
   running again the set's oscillator pulls toward them like a
   damped spring, y″ = −ω²y − 2ζω·y′, with ζ ≈ 0.7 — where a
   sync loop is usually set, locking quickly with one small
   overshoot. The offset is a phase of the vertical scan, so it
   is scaled with it: the line always sits where the beam is,
   and the roll grows as the picture opens. While it is out of
   lock the vertical blanking interval shows as the black bar
   it always was. Every rate in the switch, the hold's
   included, is a multiple of 1/duration, so a slow switch
   is the same switch slowed; only the phosphor keeps its own
   τ.

   The browser gives no access to DOM pixels, so the picture
   itself is only ever transformed, never re-rendered; the
   light — the line, the dot, the glow — is drawn on the
   overlay. Children stay real, accessible DOM throughout. The
   picture refuses the pointer only while it is not there to
   be pointed at: from the moment it starts to fold until it
   is open again. The roll is already the new channel, live.

   Under reduced motion, in a hidden tab, or with the box off
   screen, the content is swapped at once and onSwitched still
   fires; a switch already under way finishes on the spot.
   ========================================================= */

const V_OFF = 44        // ω × duration (s) of the vertical scan failing
const H_OFF = 60        // ω × duration of the horizontal following it
const H_ON = 42         // ω × duration of the line growing out of the dot
const V_ON = 20         // ω × duration of the picture opening out of the line
const HOLD = 8.5        // ω × duration of the vertical hold
const HOLD_ZETA = 0.7   // its damping
const LINE_HOLD = 0.06  // of duration: the line holds this long before the horizontal goes
const DWELL = 0.2       // of duration: the tube dark between channels, the dot lingering
const BEAM_ON = 0.028   // of duration: τ of the beam coming back
const EHT = 0.08        // of duration: τ of the beam fading as the EHT drains
const ROLL = 0.62       // of the height: how far out of hold the picture arrives at roll = 1
const LINE_PX = 4       // a band this thin is a line
const OPEN = 0.75       // of the width: how far the line has grown before the picture opens
const DARK = 0.01       // of the width: a line this short is only the dot
const BEAM_PX = 2       // the line is never thinner than the beam
const STEP = 1 / 240    // s: a frame is taken in steps no longer than this

const clamp = (n, lo, hi) => (n < lo ? lo : n > hi ? hi : n)
// A number, or a string that is one — a range input hands its value over as text.
const finite = (n, d) => {
  const x = typeof n === 'string' ? Number(n) : n
  return Number.isFinite(x) ? x : d
}
const ramp = (n, lo, hi) => clamp((n - lo) / (hi - lo), 0, 1)
const smooth = (n, lo, hi) => {
  const t = ramp(n, lo, hi)
  return t * t * (3 - 2 * t)
}

/* One exact step of x″ = −ω²(x − to) − 2ζω·x′, from whatever x and x′ are.
   ζ = 1 (critically damped) or ζ < 1. Exact, so the frame rate changes
   nothing; continuous, so a new target bends the motion instead of
   restarting it. */
function spring(s, to, w, zeta, dt) {
  const e = s.x - to
  const k = Math.exp(-zeta * w * dt)
  if (zeta >= 1) {
    const c = s.v + w * e
    s.x = to + (e + c * dt) * k
    s.v = (s.v - w * c * dt) * k
    return
  }
  const wd = w * Math.sqrt(1 - zeta * zeta)
  const cos = Math.cos(wd * dt), sin = Math.sin(wd * dt)
  const b = (s.v + zeta * w * e) / wd
  s.x = to + k * (e * cos + b * sin)
  s.v = k * ((b * wd - zeta * w * e) * cos - (e * wd + zeta * w * b) * sin)
}

// The phosphor as r, g, b. A colour that does not parse falls back instead of throwing mid-frame.
function rgbOf(color) {
  const c = document.createElement('canvas')
  c.width = c.height = 1
  const x = c.getContext('2d', { willReadFrequently: true })
  if (!x) return [217, 241, 255]
  x.fillStyle = '#d9f1ff'
  x.fillStyle = typeof color === 'string' ? color : '#d9f1ff'
  x.fillRect(0, 0, 1, 1)
  const d = x.getImageData(0, 0, 1, 1).data
  return [d[0], d[1], d[2]]
}

export default function ChannelSwitch({
  channel,
  duration = 900,          // ms, off and on again; the hold locks a moment after
  color = '#d9f1ff',       // phosphor
  persistence = 0.18,      // s, phosphor decay constant τ
  roll = 1,                // how far out of vertical hold the new picture arrives; 0 locks at once
  onSwitched,              // () => void, when the new content goes in
  children,
  className = '',
  style,
  ...rest
}) {
  const rootRef = useRef(null)
  const screenRef = useRef(null)
  const canvasRef = useRef(null)
  const api = useRef(null)

  // What is on screen: follows children, but holds the old channel until the tube is dark.
  const [view, setView] = useState({ channel, children })
  const onShow = Object.is(channel, view.channel)    // not ===: a NaN channel must still equal itself
  if (onShow && children !== view.children) {
    setView({ channel, children })
  }

  const live = useRef(null)
  // Synced after every render and before the effects below, so a switch reads
  // current props — and the newest children — without restarting.
  useEffect(() => {
    live.current = { channel, children, duration, color, persistence, roll, onSwitched, shown: view.channel }
  })

  useEffect(() => {
    const root = rootRef.current
    const screen = screenRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const row = document.createElement('canvas')
    const rctx = row.getContext('2d')
    if (!root || !screen || !ctx || !rctx) {
      // Nothing to draw on. The channel still changes, only without the tube.
      api.current = {
        run: () => {
          const p = live.current
          setView({ channel: p.channel, children: p.children })
          p.onSwitched?.()
        },
        land: () => {},
      }
      return () => {
        api.current = null
      }
    }

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    let W = 1, H = 1, dpr = 1
    let raf = 0, last = 0
    let seen = true
    let shown = live.current.shown    // the channel whose content is in the screen
    let landed = true                 // and that content has reached the document
    let phase = 'on'                  // 'on' (scanning, or coming on) | 'off' (folding) | 'dark'
    let lineFor = 0, darkFor = 0      // s spent as a line, and dark
    let beam = 1                      // beam current: 1 driven, falling as the EHT drains
    let dot = 0                       // the spot's glow
    let glow = new Float32Array(1)    // the phosphor along the line, a value per CSS px
    let pixels = rctx.createImageData(1, 1)
    let rgb = null, rgbFor
    let band = null, spot = null      // the line's vertical profile and the dot, at this size and colour
    const sx = { x: 1, v: 0 }         // horizontal scan, of the width
    const sy = { x: 1, v: 0 }         // vertical scan, of the height
    const hold = { x: 0, v: 0 }       // vertical hold, out of lock by this much of the height
    row.height = 1

    const swap = (p) => {
      shown = p.channel
      landed = false
      hold.x = -ROLL * clamp(finite(p.roll, 1), 0, 3)    // a new signal, at its own phase
      hold.v = 0
      setView({ channel: p.channel, children: p.children })
      p.onSwitched?.()
    }

    const sleep = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      last = 0
      root.classList.remove('is-switching', 'is-blanked')
      screen.style.transform = ''
      screen.style.filter = ''
      screen.style.opacity = ''
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    const paints = (p) => {
      if (!rgb || rgbFor !== p.color) {
        rgb = rgbOf(p.color)
        rgbFor = p.color
        spot = null
      }
      const [r, g, b] = rgb
      const half = clamp(H * 0.035, 6, 20)
      if (!band) {
        band = ctx.createLinearGradient(0, H / 2 - half, 0, H / 2 + half)
        ;[[0, 0], [0.3, 0.06], [0.42, 0.25], [0.48, 0.75], [0.5, 1], [0.52, 0.75], [0.58, 0.25], [0.7, 0.06], [1, 0]]
          .forEach(([at, a]) => band.addColorStop(at, `rgba(0,0,0,${a})`))
      }
      const R = clamp(Math.min(W, H) * 0.045, 8, 24)
      if (!spot) {
        spot = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, R)
        spot.addColorStop(0, `rgba(${r},${g},${b},1)`)
        spot.addColorStop(0.3, `rgba(${r},${g},${b},0.55)`)
        spot.addColorStop(1, `rgba(${r},${g},${b},0)`)
      }
      return { r, g, b, half, R }
    }

    const draw = (p, most) => {
      // The picture: squashed by the scans, brightened by the energy they concentrate, rolled by the hold.
      const ax = Math.max(sx.x, Math.min(1, BEAM_PX / W))
      const ay = Math.max(sy.x, Math.min(1, BEAM_PX / H))
      const bright = Math.min(3, (ax * ay) ** -0.175)
      const shade = ramp(sx.x, 0.005, 0.02)              // shorter than this, the line is only the dot
      screen.style.transform =
        `scale(${ax.toFixed(4)}, ${ay.toFixed(4)}) translateY(${(hold.x * H).toFixed(2)}px)`
      screen.style.filter = bright > 1.005 ? `brightness(${bright.toFixed(3)})` : ''
      screen.style.opacity = shade < 1 ? shade.toFixed(3) : ''

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (!most && !dot) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const { r, g, b, half, R } = paints(p)
      if (most) {
        const d = pixels.data
        for (let i = 0; i < glow.length; i++) {
          const o = i * 4
          d[o] = r
          d[o + 1] = g
          d[o + 2] = b
          d[o + 3] = Math.min(255, glow[i] * 255)
        }
        rctx.putImageData(pixels, 0, 0)
        // The line's light along its length, then shaped across it: a hot core and a soft bloom.
        ctx.globalCompositeOperation = 'source-over'
        ctx.drawImage(row, 0, H / 2 - half, W, half * 2)
        ctx.globalCompositeOperation = 'destination-in'
        ctx.fillStyle = band
        ctx.fillRect(0, H / 2 - half, W, half * 2)
      }
      if (dot) {
        ctx.globalCompositeOperation = 'lighter'
        ctx.globalAlpha = Math.min(1, dot)
        ctx.fillStyle = spot
        ctx.fillRect(W / 2 - R, H / 2 - R, R * 2, R * 2)
        ctx.globalAlpha = 1
      }
      ctx.globalCompositeOperation = 'source-over'
    }

    const frame = (now) => {
      // Asked for first: if a consumer's onSwitched throws, it costs this frame, not the picture.
      raf = requestAnimationFrame(frame)
      const p = live.current
      const span = clamp((now - last) / 1000, 0, 1 / 30)
      last = now
      const T = Math.max(0.2, finite(p.duration, 900) / 1000)
      const tau = clamp(finite(p.persistence, 0.18), 0.01, 2.5)

      /* The frame is taken in short steps. The curves are exact at any step,
         but what turns on a threshold — the line's beat, the tube going dark,
         the beam back, the picture opening — can only turn at the edge of
         one, and a 60 Hz frame is four times a 240 Hz one. */
      const steps = Math.max(1, Math.ceil(span / STEP))
      const dt = span / steps
      let owed = false, most = 0
      for (let step = 0; step < steps; step++) {
        // What the set is doing. Nothing restarts: each change only re-aims the scans.
        owed = !Object.is(p.channel, shown)
        if (phase === 'on' && owed) phase = 'off'
        else if (phase === 'off' && !owed) phase = 'on'          // back to what is on show: open again
        if (phase === 'off' && sx.x < DARK) {
          phase = 'dark'
          darkFor = 0
        }
        if (phase === 'dark') {
          if (owed) swap(p)                                      // the newest channel, in the dark
          owed = false
          darkFor += dt
          if (darkFor >= DWELL * T && landed) phase = 'on'
        }

        // The beam comes back with the drive, and fails with the EHT once the tube is dark.
        const to = phase === 'dark' ? 0 : 1
        beam = to + (beam - to) * Math.exp(-dt / ((to ? BEAM_ON : EHT) * T))

        // Off: vertical first, the line holds, then the horizontal. On: the dot flares, the line, the picture.
        // The line's beat is counted both ways, so a line caught still growing has had
        // it already: switched off again, it turns round at once instead of running on.
        if (phase === 'on') {
          spring(sx, beam > 0.7 ? 1 : 0, H_ON / T, 1, dt)
          spring(sy, sx.x > OPEN ? 1 : 0, V_ON / T, 1, dt)
          lineFor = sy.x * H < LINE_PX ? lineFor + dt : 0
        } else {
          spring(sy, 0, V_OFF / T, 1, dt)
          lineFor = sy.x * H < LINE_PX ? lineFor + dt : 0
          spring(sx, lineFor >= LINE_HOLD * T ? 0 : 1, H_OFF / T, 1, dt)
        }
        for (const s of [sx, sy]) {
          if (s.x < 0) {
            s.x = 0
            s.v = Math.max(0, s.v)
          }
        }
        if (phase === 'on' && Math.abs(1 - sx.x) * W < 0.3 && Math.abs(sx.v) * W < 30) {
          sx.x = 1
          sx.v = 0
        }
        if (phase === 'on' && Math.abs(1 - sy.x) * H < 0.3 && Math.abs(sy.v) * H < 30) {
          sy.x = 1
          sy.v = 0
        }

        // The hold pulls only while there is a vertical scan for it to time.
        if (sy.x > 0.003) spring(hold, 0, HOLD / T, HOLD_ZETA, dt)
        if (Math.abs(hold.x) * H < 0.3 && Math.abs(hold.v) * H < 12) {
          hold.x = 0
          hold.v = 0
        }

        /* Phosphor: keep what was glowing at e^(−Δt/τ); where the beam is, at
           least what it drives. Brighter as the line shortens, the same energy
           in less of it; softer towards its ends. */
        const f = Math.exp(-dt / tau)
        const lit = beam * (1 - smooth(sy.x, 0.004, 0.03))    // how much of the light is on the line
        const n = glow.length, mid = n / 2, reach = (sx.x * n) / 2
        const peak = lit * Math.min(1, 0.45 / Math.sqrt(Math.max(sx.x, 1e-3)))
        most = 0
        for (let i = 0; i < n; i++) {
          let g = glow[i] * f
          const u = Math.abs(i + 0.5 - mid) / reach
          if (u < 1 && peak * (1 - u) > g) g = peak * (1 - u)
          if (g < 0.002) g = 0
          glow[i] = g
          if (g > most) most = g
        }
        dot = Math.max(dot * f, lit * (1 - smooth(sx.x, 0, 0.08)))
        if (dot < 0.002) dot = 0
      }

      draw(p, most)
      root.classList.add('is-switching')    // each frame: a new className prop rewrites the attribute
      root.classList.toggle('is-blanked', phase !== 'on' || sy.x < 0.95)

      if (phase === 'on' && !owed && sx.x === 1 && sy.x === 1 && !hold.x && !most && !dot) sleep()
    }

    // Nobody is watching, or nobody wants the motion: make the change and be done.
    const settle = () => {
      const p = live.current
      try {
        if (!Object.is(p.channel, shown)) swap(p)
      } finally {    // whatever a consumer's onSwitched does, the tube is left at rest
        phase = 'on'
        sx.x = sy.x = beam = 1
        sx.v = sy.v = hold.x = hold.v = dot = lineFor = darkFor = 0
        glow.fill(0)
        sleep()
      }
    }

    const run = () => {
      if (calm.matches || !seen || document.hidden) {
        settle()
        return
      }
      root.classList.add('is-switching', 'is-blanked')    // the old channel is going: hands off it now
      if (!raf) {
        last = performance.now()    // the first frame advances by the time really since the change
        raf = requestAnimationFrame(frame)
      }
    }

    /* The canvas is measured rather than the root: it fills the root's padding
       box, and its content box is that size exactly, whatever border the root
       has and whatever transform it sits under. */
    const ro = new ResizeObserver((entries) => {
      const box = entries[entries.length - 1].contentRect
      W = Math.max(1, box.width)
      H = Math.max(1, box.height)
      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      const n = Math.max(1, Math.ceil(W))
      if (n !== glow.length) {
        const was = glow    // the afterglow is on the glass: it is resampled, not lost
        glow = new Float32Array(n)
        for (let i = 0; i < n; i++) glow[i] = was[Math.floor(((i + 0.5) / n) * was.length)]
        row.width = n
        pixels = rctx.createImageData(n, 1)
      }
      band = spot = null
      if (raf) draw(live.current, 1)    // sizing a canvas wipes it; put the light straight back
    })
    ro.observe(canvas)

    const io = new IntersectionObserver((entries) => {
      seen = entries[entries.length - 1].isIntersecting
      if (!seen && raf) settle()
    })
    io.observe(root)

    const onHide = () => {
      if (document.hidden && raf) settle()
    }
    const onCalm = () => {
      if (calm.matches && raf) settle()
    }
    document.addEventListener('visibilitychange', onHide)
    calm.addEventListener?.('change', onCalm)

    api.current = { run, land: () => { landed = true } }

    return () => {
      api.current = null
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onHide)
      calm.removeEventListener?.('change', onCalm)
      sleep()
    }
  }, [])

  // What was swapped in has reached the document: the picture may open on it.
  // Declared before the switch below, so a channel that changes in the same
  // render as a swap lands asks for its own switch after this.
  useEffect(() => {
    api.current?.land()
  }, [view])

  // A new channel starts the switch; the content changes inside it, in the dark.
  // One that returns to the channel on show is noticed by the switch itself.
  useEffect(() => {
    if (!onShow) api.current?.run()
  }, [onShow, channel])

  return (
    <div
      ref={rootRef}
      className={`channel-switch ${className}`.trim()}
      aria-busy={!onShow || undefined}
      style={style}
      {...rest}
    >
      <div ref={screenRef} className="channel-switch__screen">{view.children}</div>
      <canvas ref={canvasRef} className="channel-switch__phosphor" aria-hidden="true" />
    </div>
  )
}
