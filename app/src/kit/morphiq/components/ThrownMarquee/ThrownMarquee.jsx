'use client'

import { useEffect, useRef, useState } from 'react'
import './ThrownMarquee.css'

/* =========================================================
   ThrownMarquee
   A marquee you can grab and throw. It takes your momentum,
   bleeds it off to friction, and settles back to its own
   idle drift.

   The usual marquee is `animation: scroll linear infinite`,
   which cannot be interrupted, cannot be thrown, and has no
   opinion about where it is. This one integrates two terms:
   a drive d, which is the idle drift, and a momentum p on
   top of it, which is whatever your hand left behind.

     v = d + p
     p ← p·e^(−λ·dt)

   The exponential is the point. Friction is proportional to
   speed, so the decay is exponential rather than linear,
   which is why a hard throw slows dramatically at first and
   then creeps, instead of ramping down at a constant rate.
   With the drive at speed, v − v_idle = p, so the band
   decays toward its resting drift rather than toward zero,
   with no separate case for "stopped". Position takes the
   exact integral, x += p·(1 − e^(−λ·dt))/λ, not p·dt, so a
   throw travels the same p₀/λ on a 60 Hz and a 120 Hz screen.

   The drive is a motor, not a constant. Grabbing the band
   declutches it: whatever holds the band (a pointer, a
   wheel) stops it dead, drive and all, and when it is let
   go the drive re-engages from rest as a critically damped
   response. So the band starts gently (zero initial
   acceleration) and arrives at its drift with no overshoot,
   rather than jerking to full speed. A pause (`paused`,
   hover with `pauseOnHover`, or keyboard focus) brakes the
   drive quickly, and only the drive: a throw released under
   a hovering pointer still glides out on its own friction,
   and a paused band can still be dragged, scrubbed and
   stepped. Something that moves by itself owes its reader a
   way to stop it, and a finger cannot hover. So under
   `pauseOnHover` a touch that ends on the band counts as a
   pointer that stayed: the drift holds until a pointer comes
   down somewhere else, the way a tapped link keeps its
   :hover. A touch the page took for a scroll does not count.
   `paused` is where your own pause control plugs in.

   A throw is only as good as the velocity measured for it.
   The last pointer event is a poor estimate: it is noisy,
   and if the hand stopped before letting go it still reports
   the speed from before it stopped. A straight line through
   the last 80 ms is steady but late: its slope is the average
   over the window, so a hand easing off to set an item down
   hands over the speed it had 40 ms earlier, and the band
   slides on past where it was put. So the release velocity is
   the slope, at the last sample, of a least-squares parabola
   through the last 80 ms, coalesced events included, which
   follows a hand that is speeding up or easing off. The line
   keeps it honest: the parabola must agree with it in sign
   and go at most half as fast again, or it is extrapolating
   noise. A hand that has not moved for 40 ms hands over
   nothing.

   The handover is timed as well as measured. A hand lets go
   between two frames, so the first frame of the throw owes
   only the time since the release. Give it a whole frame and
   it shows the hand's last move and a frame of flight in one
   picture: the band lurches at up to twice its speed at the
   moment you let go. Two smaller debts are settled with it,
   so the pictures either side of the release are evenly
   spaced. A drag is shown a few milliseconds late, each frame
   painting the newest sample it has, and the throw keeps that
   same lateness. And a lifted finger reports that it lifted,
   not where it had got to, so the throw is owed the travel
   since its last sample, up to one sample's worth.

   Catching is the reverse, and it is a press, not a click. A
   press that stops a band still flying, 150 px/s or more above
   its drift, is the catch: the click it would have made on
   whatever link was passing under it is swallowed, the same as
   the click at the end of a drag.

   A horizontal wheel or trackpad scrubs the band 1:1, through
   a 40 ms glide that turns a mouse's 100 px notch into a slide
   instead of a jump. It holds the band while it moves, and the
   platform's own momentum carries it, so there is no second
   throw on top. A wheel gesture keeps one axis, and it is
   chosen over the gesture's first 8 px, not by its first
   event: a trackpad opens with a pixel or two that can point
   either way, and a gesture locked on that would let a page
   scroll seize the band, or a scrub scroll the page. Once
   chosen it holds, so a page scroll that strays sideways never
   catches the band and a scrub that strays never scrolls the
   page.

   Keyboard focus pauses the drift, and each arrow key brings
   the next item in that direction to rest just inside the
   edge. The step is a critically damped seek that starts at
   whatever speed the band has, so a second press mid-step, or
   a press the other way, bends the motion instead of
   restarting it, and a step asked of a band in flight lands on
   the nearest item it can reach without braking harder than a
   step does. A step of 100 px lands in a quarter of a second.
   A longer one is given longer, as distance^0.35 (1.3× the
   time for twice the distance), because the same quarter
   second would send a wide item past at a speed nobody can
   read. It is aimed at a whole device pixel from the start, so
   nothing is left to correct once it lands. A held key takes
   its next step as the last one lands, five a second at most,
   not the thirty a keyboard repeats at.

   Content is repeated as many times as it takes to cover the
   box plus a copy either side, so the seam is always off
   screen and there is no jump to hide. Only the second copy is
   real; the rest are hidden from assistive tech and from Tab.
   It starts exactly where the markup alone drew the first, so
   mounting, or hydrating a server render, moves nothing.
   A wrap moves the offset by one whole pitch, which leaves the
   picture unchanged but carries the real copy, and any focus
   ring on it, a pitch away. So the band wraps only when a copy
   would stop covering an edge, never on a fixed modulo, and
   that range is at least two copies wide. The wrap has
   hysteresis: after one, the band must travel a whole copy
   before the next, so the real copy cannot flicker back and
   forth, and a band that settles anywhere inside the range
   stays put. Tab to a link inside and the band works out where
   it would have stopped anyway, the drive braking and any throw
   still gliding, and adds only the short glide that brings the
   real link into view there, as little as it can, clear of
   either end of the range. Nothing stops dead for it.

   Where the line runs right to left the band is its own
   mirror image: the copies stack leftward and the drift still
   runs toward the start of the line, so the text passes in
   reading order. The hand, the wheel and the arrow keys stay
   physical.

   In motion the offset keeps its fraction, which is what makes
   a 40 px/s drift smooth instead of a stutter of whole pixels.
   Left to rest, the band takes the last half pixel or less
   onto a whole device pixel, so type that has stopped is not
   left resampled between two.
   ========================================================= */

const clamp = (n, lo, hi) => (n < lo ? lo : n > hi ? hi : n)
const finite = (n, fallback) => (Number.isFinite(n) ? n : fallback)

// The drive's responses, as critically damped natural frequencies in rad/s.
// Settling to 95% takes about 4.74/ω: ~0.95 s to re-engage, ~0.4 s to pause.
const ENGAGE = 5
const BRAKE = 12
const STEP = 20 // rad/s, an arrow-key step of NEAR or less, also critically damped: 95% in 0.24 s
const NEAR = 100 // px, the step STEP is tuned for: a longer one takes longer
const REPEAT = 200 // ms, the least time between the steps of a held arrow key
const LANDED = 0.08 // of a step still to go when a held key may take the next
const GLIDE = 0.04 // s, time constant a wheel delta is spent over
const WHEEL_HOLD = 90 // ms without a wheel event before the band is let go
const AXIS = 8 // px a wheel gesture travels before its axis is settled
const FIT = 80 // ms of pointer history the release velocity is fitted to
const STOPPED = 40 // ms without movement that means the hand had stopped
const SLOP = 4 // px a press may wander and still be a click
const CATCH = 150 // px/s of throw above which a still press is a catch, not a click
const INSET = 12 // px inside the edge a revealed or stepped-to item comes to rest
const MIN_STEP = 24 // px, the least an arrow key moves the band, so every press shows
const MAX_COPIES = 64

// An arrow-key step's natural frequency, rad/s. Its time grows as
// distance^0.35 (1.3× at twice NEAR, 1.6× at four times) and stops at 1.8×.
const stepRate = (dist) => STEP * clamp((NEAR / Math.max(1, Math.abs(dist))) ** 0.35, 1 / 1.8, 1)

const FOCUSABLE = ['a[href]', 'button', 'input', 'select', 'textarea', 'summary', 'iframe', '[tabindex]', '[contenteditable]']
  .map((s) => `.thrown-marquee__copy[aria-hidden] ${s}`)
  .join(',')

export default function ThrownMarquee({
  speed = 40, // idle drift, px/s, toward the start of the line — negative runs the other way
  friction = 1.6, // λ, per second — how fast a throw bleeds back to the drift
  throwScale = 1, // how much of a flick's velocity is taken
  maxSpeed = 4000, // px/s, the fastest a throw can go
  gap = 48, // px between items, and between copies
  paused = false, // hold the drift at rest: the hook for your own pause control
  pauseOnHover = false, // brake the drift to rest under a hovering pointer
  wheel = true, // a horizontal wheel or trackpad scrubs the band
  children,
  className = '',
  style,
  ...rest
}) {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const [copies, setCopies] = useState(3)

  const live = useRef({})
  const wake = useRef(null)
  // Synced after every render and before the effects below, so the loop reads
  // current props without being torn down and restarted. The loop may have
  // stopped at rest, so a new prop (a speed, say) has to wake it.
  useEffect(() => {
    live.current = { speed, friction, throwScale, maxSpeed, paused, pauseOnHover, wheel }
    wake.current?.()
  })

  // The copies are decoration: aria-hidden takes them out of the reading
  // order, and this takes their links and buttons out of the tab order.
  useEffect(() => {
    trackRef.current?.querySelectorAll(FOCUSABLE).forEach((el) => el.setAttribute('tabindex', '-1'))
  })

  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    if (!root || !track) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let still = motion.matches

    let span = 1 // pitch of one copy, including the gap after it, local px
    let view = 0 // the box's width, local px
    let count = 3 // copies the box calls for: enough to cover it, and one either side
    let measured = false
    let scale = 1 // screen px per local px, in case an ancestor is transformed
    let flip = 1 // −1 where the line runs right to left, and the band is its own mirror image
    let pos = 0 // the track's offset, local px, kept in [low(), 0] by wrap()
    let x = 0 // distance travelled, local px, never wrapped: what a throw is fitted to
    let p = 0 // momentum above the drive, px/s
    let d = 0 // the drive's speed, px/s
    let dd = 0 // and its rate of change, px/s²
    let pend = 0 // displacement still to glide off (wheel deltas)
    let sr = 0 // a seek's distance still to go (a key step, a reveal), px
    let sv = 0 // and its speed, px/s
    let sw = BRAKE // and its natural frequency, rad/s
    let raf = 0
    let last = 0
    let onScreen = true
    let painted = ''
    let hovering = false // a mouse or a pen is over the band
    let touched = false // a touch ended on the band, and no pointer has come down elsewhere since
    let keyed = false
    let stepAt = 0 // when the last arrow-key step was taken
    let stepLen = 0 // and how far it had to go, px

    let hand = null // pointerId of the pointer holding the band
    let handX = 0
    let travel = 0
    let captured = false
    let dragging = false // the press has wandered past SLOP: it is a drag, not a click
    let caught = false // the press stopped a throw
    let samples = [] // [timeStamp, x]
    let fresh = false // a sample no frame has shown yet
    let late = 0 // ms from a sample to the frame that shows it
    let wheelUntil = 0 // while a sideways wheel gesture holds the band
    let wheelAxis = 0 // the current wheel gesture's axis, once settled: 1 is ours, −1 the page's
    let wheelX = 0 // until then, how far the gesture has gone sideways, px
    let wheelY = 0 // and up or down
    let wheelLast = 0
    let eatClickUntil = 0

    const readBox = () => {
      const w = root.offsetWidth
      scale = w ? root.getBoundingClientRect().width / w || 1 : 1
      flip = getComputedStyle(root).direction === 'rtl' ? -1 : 1
    }

    // How far along the line one box starts after another, local px: left
    // edge to left edge, or right to right where the line runs right to left.
    const along = (a, from) => (flip > 0 ? a.left - from.left : from.right - a.right) / scale

    // The lowest offset at which the last copy still reaches the trailing
    // edge. Offset 0 is where the first copy just reaches the leading one.
    // It counts the copies the box calls for, not the ones React has rendered
    // so far, so it is at least two pitches below 0 from the first frame and
    // the band's first offset, one pitch down, is not sitting on a boundary
    // that a rounding could tip it over.
    const low = () => Math.min(-span, view - count * span)

    // Wrap by whole copies, and only on leaving [low, 0], never on a fixed
    // modulo: after a wrap the band must travel a whole copy before the next,
    // so the real copy (and a focus ring on it) cannot flicker between two.
    const fold = (at) => {
      if (!Number.isFinite(at)) at = -span
      if (at > 0) at -= Math.ceil(at / span) * span
      const lo = low()
      if (at < lo) at += Math.ceil((lo - at) / span) * span
      return at
    }
    const wrap = () => {
      pos = fold(pos)
    }

    // Every motion comes through here: x keeps the whole distance for the
    // velocity fit, pos the picture.
    const move = (dist) => {
      x += dist
      pos -= dist
      wrap()
    }

    const measure = () => {
      const a = track.children[0]
      const b = track.children[1]
      if (!a || !b || !root.offsetWidth) return
      readBox()
      view = root.clientWidth
      // The distance between two copies' left edges is the exact pitch,
      // sub-pixel and gap included, which scrollWidth / n rounds away.
      const next = along(b.getBoundingClientRect(), a.getBoundingClientRect())
      if (next > 0.5 && Math.abs(next - span) > 0.01) {
        // Keep the phase, so a new gap or new content does not jump a whole
        // copy. At first the real copy takes the place the first one was drawn
        // in before there was a transform: the same picture, so nothing jumps.
        pos = measured ? (pos / span) * next : -next
        span = next
        measured = true
      }
      count = a.offsetWidth < 1 ? 3 : clamp(2 + Math.ceil(view / span), 3, MAX_COPIES)
      wrap()
      setCopies(count)
    }

    const paint = () => {
      const t = `translate3d(${(flip * pos).toFixed(2)}px,0,0)`
      if (t !== painted) {
        track.style.transform = t
        painted = t
      }
    }

    const braked = () => live.current.paused || (live.current.pauseOnHover && (hovering || touched)) || keyed

    // Whatever takes hold of the band stops it, drive included.
    const hold = () => {
      p = 0
      d = 0
      dd = 0
      sr = 0
      sv = 0
    }

    // The band's velocity, every term of it. A glide moves at what is left
    // of it over its time constant.
    const velocity = () => d + p + sv + pend / GLIDE

    const frame = (now) => {
      // `last` is a frame's time, or a release's (see release), which the
      // next frame can fall a hair short of: so the step is held at both ends.
      const dt = last ? clamp((now - last) / 1000, 0, 1 / 30) : 1 / 60
      last = now
      const idle = finite(live.current.speed, 0)
      const lam = Math.max(0, finite(live.current.friction, 0))

      if (wheelUntil && now > wheelUntil) wheelUntil = 0

      // How late this frame shows the hand: the throw is handed the same.
      if (fresh && hand !== null) late = now - samples[samples.length - 1][0]
      fresh = false

      // A glide spends its displacement exponentially: it answers at once and
      // lands softly, and a second notch just adds to what is left.
      if (pend) {
        let step = still ? pend : pend * (1 - Math.exp(-dt / GLIDE))
        if (Math.abs(pend - step) < 0.3) step = pend
        move(step)
        pend -= step
      }

      if (hand === null && !wheelUntil) {
        // A seek: critically damped onto its rest, from the speed it took
        // over, integrated exactly. r = (r₀ + (ω·r₀ − v₀)·t)·e^(−ωt).
        if (sr || sv) {
          const k = Math.exp(-sw * dt)
          const b = sw * sr - sv
          const r = (sr + b * dt) * k
          sv = (sv + sw * b * dt) * k
          move(sr - r)
          sr = r
          if (Math.abs(sr) < 0.1 && Math.abs(sv) < 2) {
            move(sr)
            sr = 0
            sv = 0
          }
        }

        const stopped = still || braked()
        const target = stopped ? 0 : idle
        if (still) {
          d = 0
          dd = 0
        } else if (d !== target || dd) {
          // Critically damped drive, integrated exactly: e is the error, dd its rate.
          const w = stopped ? BRAKE : ENGAGE
          const e = d - target
          const k = Math.exp(-w * dt)
          const q = (dd + w * e) * dt
          const d0 = d
          d = target + (e + q) * k
          dd = (dd - w * q) * k
          if (Math.abs(d - target) < 0.5 && Math.abs(dd) < 5) {
            d = target
            dd = 0
          }
          move(((d0 + d) / 2) * dt)
        } else if (d) {
          move(d * dt)
        }

        if (p) {
          const k = Math.exp(-lam * dt)
          move(lam > 0 ? (p * (1 - k)) / lam : p * dt)
          p *= k
          // Below 2 px/s (a thirtieth of a pixel a frame) the throw is over:
          // stop it there rather than let a sub-pixel tail keep the loop alive.
          if (Math.abs(p) < 2) p = 0
        }
      }

      const busy = pend || wheelUntil || (hand === null && (p || d || dd || sr || sv))
      // In motion the offset keeps its fraction. Left to rest, the band takes
      // the last half pixel or less onto a whole device pixel, so its type is
      // not left resampled between two. A hand holds it exactly where it is.
      if (!busy && hand === null) {
        const dpr = window.devicePixelRatio || 1
        move(pos - Math.round(pos * dpr) / dpr)
      }
      paint()
      if (!busy) {
        raf = 0
        last = 0
        return
      }
      raf = requestAnimationFrame(frame)
    }

    const kick = () => {
      if (raf || !onScreen) return
      last = 0
      raf = requestAnimationFrame(frame)
    }
    wake.current = kick

    /* ---------- the hand ---------- */

    const follow = (ev) => {
      const dx = ev.clientX - handX
      handX = ev.clientX
      if (!dx) return
      travel += Math.abs(dx)
      move((-flip * dx) / scale)
      samples.push([ev.timeStamp, x])
      fresh = true
    }

    // The hand's velocity at the last sample, px/s: the slope there of a
    // least-squares parabola through the last FIT ms, held to the straight
    // line's sign and to half as fast again. A hand that had stopped before
    // letting go hands over nothing.
    const releaseVelocity = (t) => {
      const n = samples.length
      if (n < 2 || t - samples[n - 1][0] > STOPPED) return 0
      const [t0, x0] = samples[n - 1]
      const pts = samples.filter(([st]) => st >= t0 - FIT)
      if (pts.length < 2 || t0 - pts[0][0] < 4) return 0
      // Moments in u = time before the last sample (ms), y = travel since it.
      let s0 = 0
      let s1 = 0
      let s2 = 0
      let s3 = 0
      let s4 = 0
      let y0 = 0
      let y1 = 0
      let y2 = 0
      for (const [st, sx] of pts) {
        const u = st - t0
        const y = sx - x0
        s0 += 1
        s1 += u
        s2 += u * u
        s3 += u * u * u
        s4 += u * u * u * u
        y0 += y
        y1 += y * u
        y2 += y * u * u
      }
      const flat = s0 * s2 - s1 * s1
      if (!(flat > 0)) return 0
      const line = (s0 * y1 - s1 * y0) / flat
      // y = a + b·u + c·u², solved for b by Cramer's rule.
      const det = s0 * (s2 * s4 - s3 * s3) - s1 * (s1 * s4 - s3 * s2) + s2 * (s1 * s3 - s2 * s2)
      if (pts.length < 3 || !(det > 1e-6 * s0 * s2 * s4)) return line * 1000
      const b = (s0 * (y1 * s4 - s3 * y2) - y0 * (s1 * s4 - s3 * s2) + s2 * (s1 * y2 - y1 * s2)) / det
      if (!(b * line > 0)) return 0
      return Math.sign(b) * Math.min(Math.abs(b), 1.5 * Math.abs(line)) * 1000
    }

    const onDown = (e) => {
      // A second pointer cannot take the band from the first. The same one
      // pressing again means its release never arrived, so it starts over.
      if ((hand !== null && e.pointerId !== hand) || (e.pointerType === 'mouse' && e.button !== 0)) return
      hand = e.pointerId
      handX = e.clientX
      travel = 0
      captured = false
      dragging = false
      caught = Math.abs(p + sv + pend / GLIDE) > CATCH
      eatClickUntil = 0
      readBox()
      hold()
      pend = 0
      samples = [[e.timeStamp, x]]
      fresh = false
      root.classList.add('is-held')
    }

    const onMove = (e) => {
      if (e.pointerId !== hand) return
      // No button down: the release was missed (it happened over another
      // window, say). Let go, not follow a pointer that is only hovering.
      if (!e.buttons) {
        release(e, false)
        return
      }
      const list = e.getCoalescedEvents?.()
      if (list && list.length) for (const ev of list) follow(ev)
      else follow(e)
      const cut = e.timeStamp - 2 * FIT
      while (samples.length > 2 && samples[0][0] < cut) samples.shift()
      // Capture only once it is a drag, so a plain click still reaches a link.
      // Until then a link under the pointer keeps its own cursor; from here on
      // the hand is dragging, whatever it is over.
      if (!dragging && travel > SLOP) {
        dragging = true
        captured = true
        root.classList.add('is-dragging')
        try {
          root.setPointerCapture(e.pointerId)
        } catch {
          // the pointer is already gone; pointerup will still arrive on window
        }
      }
      kick()
    }

    const release = (e, thrown) => {
      if (e.pointerId !== hand) return
      if (thrown) follow(e)
      const { throwScale, maxSpeed } = live.current
      const cap = Math.abs(finite(maxSpeed, 4000))
      const v = thrown && !still ? releaseVelocity(e.timeStamp) * finite(throwScale, 1) : 0
      p = clamp(v, -cap, cap)
      hand = null
      // A finger lifted off the band stands for a pointer left hovering over
      // it. One the browser took away (a page scroll, a pinch) does not, and
      // neither does one that was dragged off the band before it lifted.
      if (thrown && e.pointerType === 'touch') {
        const r = root.getBoundingClientRect()
        touched = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
      }
      // A drag is not a click, and neither is the press that caught a throw.
      if (travel > SLOP || caught) eatClickUntil = e.timeStamp + 300
      if (captured) {
        try {
          root.releasePointerCapture(e.pointerId)
        } catch {
          // already released
        }
      }
      captured = false
      dragging = false
      root.classList.remove('is-held', 'is-dragging')
      kick()
      if (p) {
        // The throw starts when the hand let go, shown as late as the drag
        // was, so its first frame steps only the time since then and not a
        // whole one. A lifted finger says that it lifted, not where it had
        // got to, so the throw is also owed the travel since the last sample,
        // up to one sample's worth: `every` is the time between samples.
        const n = samples.length - 1
        const t1 = samples[n][0]
        const k = samples.findIndex(([st]) => st >= t1 - FIT)
        const every = n > k ? (t1 - samples[k][0]) / (n - k) : 0
        last = Math.max(t1, e.timeStamp - every) + late
      }
    }

    const onUp = (e) => release(e, true)
    const onCancel = (e) => release(e, false)
    // A touch is captured by whatever it landed on, so when the band takes
    // the capture that element loses it, and its lostpointercapture bubbles
    // up through here. Only the band losing its own capture ends the hold.
    const onLost = (e) => {
      if (e.target === root) release(e, false)
    }

    // A drag that ends over a link must not also follow it.
    const onClick = (e) => {
      if (e.timeStamp < eatClickUntil) {
        e.preventDefault()
        e.stopPropagation()
      }
      eatClickUntil = 0
    }
    const onDragStart = (e) => e.preventDefault()

    // A touch enters as it lands and leaves as it lifts, which says nothing
    // about hovering: `touched` answers for it. A mouse or a pen is the real
    // thing, and takes over from a touch when it arrives.
    const onEnter = (e) => {
      if (e.pointerType === 'touch') return
      hovering = true
      touched = false
      kick()
    }
    const onLeave = (e) => {
      if (e.pointerType === 'touch') return
      hovering = false
      kick()
    }
    // A touch's hover ends when a pointer comes down anywhere off the band.
    const onElsewhere = (e) => {
      if (!touched || (e.target instanceof Node && root.contains(e.target))) return
      touched = false
      kick()
    }

    /* ---------- wheel ---------- */

    const onWheel = (e) => {
      if (!live.current.wheel || e.ctrlKey || hand !== null) return
      let dx = e.deltaX
      let dy = e.deltaY
      if (e.shiftKey && !dx) {
        dx = dy
        dy = 0
      }
      const box = view || span
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? box : 1
      // One gesture, one axis: mostly vertical is the page's scroll, mostly
      // sideways ours, and once settled it holds until the wheel has been
      // quiet for WHEEL_HOLD, platform momentum included. A per-event test
      // would let a stray sideways event in a page scroll stop the drift, and
      // a stray vertical one in a scrub scroll the page. It is settled over
      // the gesture's first AXIS px, not by its first event, which on a
      // trackpad is a pixel or two that can point either way. Until then each
      // event goes wherever the travel so far says, so a scrub still answers
      // on its first event.
      if (e.timeStamp - wheelLast > WHEEL_HOLD) {
        wheelAxis = 0
        wheelX = 0
        wheelY = 0
      }
      wheelLast = e.timeStamp
      let ours = wheelAxis > 0
      if (!wheelAxis) {
        wheelX += Math.abs(dx) * unit
        wheelY += Math.abs(dy) * unit
        ours = wheelX > wheelY
        if (wheelX + wheelY >= AXIS) wheelAxis = ours ? 1 : -1
      }
      if (!ours) return
      e.preventDefault()
      pend = clamp(pend + flip * dx * unit, -box, box)
      // Only a gesture settled on the band takes hold of it. Before that the
      // band is nudged and no more, so the stray first pixel of a page scroll
      // does not stop the drift.
      if (wheelAxis) {
        hold()
        wheelUntil = e.timeStamp + WHEEL_HOLD
      }
      kick()
    }

    /* ---------- keyboard ---------- */

    // Hand the band's whole remaining motion to one critically damped seek
    // that comes to rest `go` further on, at natural frequency w, starting at
    // the speed the band already has. So nothing stops dead for it, and a
    // seek asked for in the middle of another bends it instead of restarting.
    // The rest is aimed at a whole device pixel here, wraps on the way
    // counted, so the landing has no half pixel left to hop.
    const seek = (go, w) => {
      const v = velocity()
      const dpr = window.devicePixelRatio || 1
      const rest = fold(pos - go)
      go += rest - Math.round(rest * dpr) / dpr
      hold()
      pend = 0
      wheelUntil = 0
      if (still) {
        pend = go
      } else {
        sr = go
        sv = v
        sw = w
      }
      kick()
    }

    // How far past where the band is already headed the next item in
    // direction dir comes to rest INSET inside the leading edge. At least
    // `least`, so a press never lands on an item a hair away and looks
    // ignored; at most three quarters of the box, which is also the step for
    // text with no items to step between.
    const stepFrom = (dir, least) => {
      const a = track.children[0]
      const n = track.children.length
      const from = pos - pend - sr
      const first = a.getBoundingClientRect()
      let best = dir * Math.max((view || span) * 0.75, least)
      for (const el of a.children) {
        const s = along(el.getBoundingClientRect(), first)
        // The same item in every copy: whichever is next along.
        for (let k = 0; k < n; k++) {
          const dist = from + k * span + s - INSET
          if (dir > 0 ? dist >= least && dist < best : dist <= -least && dist > best) best = dist
        }
      }
      return best
    }

    const onKey = (e) => {
      // The keys are physical: right brings on what lies to the right.
      const dir = flip * (e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0)
      // Only the band itself steps: moving it under a focused link inside
      // would carry the focus out of view. Tab reaches those, and reveals them.
      if (!dir || e.target !== root || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || hand !== null) return
      e.preventDefault()
      keyed = true
      // A held key repeats some thirty times a second, faster than a step
      // can be read: it takes its next step as the last one lands instead.
      if (e.repeat && (e.timeStamp - stepAt < REPEAT || Math.abs(sr) > LANDED * stepLen)) return
      stepAt = e.timeStamp
      readBox()
      // The step goes on from where the band is already headed. A band in
      // flight needs v/ω of road to stop on without braking harder than a
      // step does, so it steps to the first item at least that far ahead.
      const v = velocity()
      const owed = pend + sr
      const least = Math.max(MIN_STEP, dir * (v / STEP - owed))
      const reach = 1.5 * (view || span)
      const go = clamp(owed + stepFrom(dir, least), -reach, reach)
      stepLen = Math.abs(go)
      // The longer the step the softer the seek, but never so soft that the
      // speed the band already has would carry it past its rest (see reveal).
      seek(go, clamp(go * v > 0 ? v / go : 0, stepRate(go), 60))
    }

    // Tabbing to a link inside makes the browser scroll this overflow box to
    // reveal it, which the transform knows nothing about. Undo that, and glide
    // the band instead until the real (first-copy) element is in view.
    const onScroll = () => {
      if (root.scrollLeft) root.scrollLeft = 0
      if (root.scrollTop) root.scrollTop = 0
    }

    // Bring the real element into view where the band comes to rest, moving
    // it as little as possible, and keep that rest inside [low, 0] so no wrap
    // can carry the element off afterwards. The band's own rest comes first:
    // the glide still owed, the drive braking to its pause (a critically
    // damped stop from d runs on 2d/ω + d′/ω²) and the throw's remaining p/λ.
    // If the element is in view there, nothing changes. If not, the band's
    // whole remaining motion becomes one seek to the new rest, stiff enough
    // not to sail past a rest that is close ahead. No dead stop, no swing.
    const reveal = (el) => {
      readBox()
      const lam = Math.max(0, finite(live.current.friction, 0))
      if (!lam) p = 0 // a frictionless throw would never land, so focus catches it
      const ahead = pend + (2 * d) / BRAKE + dd / (BRAKE * BRAKE) + (lam ? p / lam : 0) + sr
      const r = root.getBoundingClientRect()
      const b = el.getBoundingClientRect()
      const w = b.width / scale
      const at = along(b, r) - ahead // where it would rest
      const want = clamp(at, INSET, Math.max(INSET, (view || span) - INSET - w))
      const rest = pos - ahead
      const aim = clamp(rest + want - at, low() + 1, -1)
      if (Math.abs(rest - aim) < 0.5) return
      const v = velocity()
      const go = pos - aim
      // Critically damped sails past its rest when v > ω·r, so a close rest
      // gets a stiffer seek: at ω = v/r it is a plain exponential glide that
      // starts at exactly the speed the band had.
      seek(go, clamp(go * v > 0 ? v / go : 0, BRAKE, 60))
    }

    const onFocusIn = (e) => {
      let visible = true
      try {
        visible = e.target.matches(':focus-visible')
      } catch {
        // an engine without :focus-visible: treat every focus as keyboard focus
      }
      onScroll()
      // Keyboard focus pauses the drift and brings a focused item into view.
      // A click that focuses a link does neither: the hand is already there.
      if (visible && hand === null) {
        keyed = true
        if (e.target !== root) reveal(e.target)
      }
      kick()
    }

    const onFocusOut = (e) => {
      if (root.contains(e.relatedTarget)) return
      keyed = false
      kick()
    }

    const onMotion = () => {
      still = motion.matches
      if (still) {
        // Settle at once: a glide or a step under way lands now.
        const owed = pend + sr
        hold()
        pend = 0
        move(owed)
        paint()
      }
      kick()
    }

    const io = new IntersectionObserver((entries) => {
      onScreen = entries[entries.length - 1].isIntersecting
      if (onScreen) kick()
      else if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    })
    io.observe(root)

    const ro = new ResizeObserver(() => {
      measure()
      paint()
      kick()
    })
    ro.observe(track)
    ro.observe(root)

    measure()
    paint()
    kick()

    root.addEventListener('pointerdown', onDown)
    root.addEventListener('pointermove', onMove)
    root.addEventListener('lostpointercapture', onLost)
    window.addEventListener('pointerup', onUp, true)
    window.addEventListener('pointercancel', onCancel, true)
    window.addEventListener('pointerdown', onElsewhere, true)
    root.addEventListener('click', onClick, true)
    root.addEventListener('dragstart', onDragStart)
    root.addEventListener('pointerenter', onEnter)
    root.addEventListener('pointerleave', onLeave)
    root.addEventListener('wheel', onWheel, { passive: false })
    root.addEventListener('keydown', onKey)
    root.addEventListener('focusin', onFocusIn)
    root.addEventListener('focusout', onFocusOut)
    root.addEventListener('scroll', onScroll)
    motion.addEventListener?.('change', onMotion)

    let dead = false
    document.fonts?.ready?.then(() => {
      if (!dead) {
        measure()
        paint()
        kick()
      }
    })

    return () => {
      dead = true
      wake.current = null
      io.disconnect()
      ro.disconnect()
      root.removeEventListener('pointerdown', onDown)
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('lostpointercapture', onLost)
      window.removeEventListener('pointerup', onUp, true)
      window.removeEventListener('pointercancel', onCancel, true)
      window.removeEventListener('pointerdown', onElsewhere, true)
      root.removeEventListener('click', onClick, true)
      root.removeEventListener('dragstart', onDragStart)
      root.removeEventListener('pointerenter', onEnter)
      root.removeEventListener('pointerleave', onLeave)
      root.removeEventListener('wheel', onWheel)
      root.removeEventListener('keydown', onKey)
      root.removeEventListener('focusin', onFocusIn)
      root.removeEventListener('focusout', onFocusOut)
      root.removeEventListener('scroll', onScroll)
      motion.removeEventListener?.('change', onMotion)
      root.classList.remove('is-held', 'is-dragging')
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const gapPx = `${finite(gap, 0)}px`

  return (
    <div
      ref={rootRef}
      className={`thrown-marquee ${className}`.trim()}
      style={style}
      tabIndex={0}
      role="group"
      aria-roledescription="marquee"
      {...rest}
    >
      <div ref={trackRef} className="thrown-marquee__track" style={{ gap: gapPx }}>
        {Array.from({ length: copies }, (_, i) => (
          // Every copy but the second is decoration: that one already carries
          // the content for anyone reading the page rather than looking at it.
          <div key={i} className="thrown-marquee__copy" style={{ gap: gapPx }} aria-hidden={i === 1 ? undefined : 'true'}>
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}
