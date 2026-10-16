'use client'

import { useEffect, useRef } from 'react'
import './WetInk.css'

/* =========================================================
   WetInk
   A word that writes itself in ink on paper. The ink is laid
   down wet behind a moving pen, creeps outward along the
   fibres of the paper, and dries where it stops.

   Faking this with a blurred stroke gives an even halo, and
   real bleed is nothing like even: paper is a mat of fibres,
   and liquid wicks along a fibre far faster than across one.
   So the ink here is a quantity on a grid that moves by
   anisotropic diffusion,

     ∂u/∂t = ∇·(D ∇u) − k·u

   where D is a tensor aligned with the local fibre direction
   — conductance a along the fibre, b across it — taken from a
   smooth orientation field with a dominant grain, as machine-
   made paper has. Split onto the grid's axes, an edge along x
   conducts b + (a − b)·cos²θ and one along y b + (a − b)·sin²θ.

   The −k·u term is the paper drinking: wet ink is absorbed
   into the fibres at rate k, becomes pigment, and stops moving.
   It is absorbed a little faster where the film is thin, so
   pigment gathers at the drying edge — the darker rim of every
   ink blot, and of every coffee ring.

   The update is explicit, which is only stable while
   Δt ≤ h² / (4·Dmax); the step is subdivided to stay under
   that limit, since breaking it does not blur the ink but
   explodes it into checkerboard noise.

   The pen is a slanted front sweeping the word left to right,
   and every cell of the word takes the same load of ink as
   the tip crosses it — measured by how far the tip moved over
   that cell, not by which frames happened to land there.
   Dosing per frame stripes the word: at 60 Hz a cell sits
   under the tip for one frame or two, a 120 Hz screen lays it
   down differently, and a fast pen skips cells outright.

   A pen at an even pace reads as a scanner. A hand leans into
   the heavy strokes and quickens across the gaps between
   letters, so the tip takes its pace from the ink just ahead
   of it — the word's ink summed along the slant and smoothed
   over about a stroke — and slows where there is more to lay
   down. Under that sits a ceiling that rises from a third of
   the usual pace as the pen touches down and sinks again into
   the last stroke, so it starts from rest and lands rather
   than sweeping on and off. The pace is normalised so the
   word takes exactly as long as an even sweep at `speed`;
   `rhythm` 0 is that even sweep. Everything runs on elapsed
   time, clamped after a stall, so a 120 Hz screen writes the
   same word in the same time as a 60 Hz one.

   Writing again starts a fresh sheet. What is on the paper,
   wet or dry, clears over a fifth of a second — at an even
   rate, so the first frame already shows it going and none of
   it lingers faint — and the new pen touches down as the last
   of it goes. The same word again is a command and is answered
   that fast. A different word waits a beat longer, until the
   old one has gone, and so does any request that follows hard
   on another: each sets the wait again, so a run of them —
   typing, a dragged control — is one word written when the
   hand stops, not a row of false starts.

   A new size keeps the word: once the size has held for a
   moment it is laid out again and run forward to the point it
   had reached — dry, drying or half-written — in slices
   between frames, rather than written over from the start.
   The old picture is held meanwhile, whole and at its own
   proportions, and crosses into the new one over the same
   fifth of a second: ink bleeds a set distance into the
   paper, not a share of the letter, so a smaller word is a
   softer one and a cut between the two would show. A box
   with no area at all — hidden, or collapsed — is not a new
   size: the sheet keeps what it has until the box is back,
   and one that has never had a size waits for one. Colours
   are not ink; changing them repaints what is there.

   The pen waits to be watched. It touches down once half the
   sheet is in view — or after a second in view at all, for a
   sheet cropped or larger than its window — so a word below
   the fold is written as the reader arrives at it, not as its
   top edge does. Offscreen nothing runs, and the loop stops
   once the last of the ink has soaked in.

   Under reduced motion nothing is seen to move: the word is
   worked out of sight — in view or not, so it is there on
   arrival — and shown dry, the old picture standing until
   the new one is ready.
   ========================================================= */

const SLANT = 0.3   // the pen's lean: a cell's turn comes at x + (rows − y)·SLANT
const BAND = 5      // cells behind the tip still taking ink
const LOAD = 1.8    // ink each cell of the word takes as the tip crosses it
const SOAK = 1.9    // absorption, 1/s
const DAMP = 0.01   // wet ink thinner than this reads as dry
const WICK = 8      // bleed past this has long left the letters, and only costs steps
const SWAY = 4      // rhythm past this is a pen that stalls on every stem
const FADE = 0.2    // s, the old picture leaving
const LEAD = 0.14   // s after a request for the same word when the new pen touches down
const LULL = 0.3    // s it waits instead to write a different one, or one of a run
const HOLD = 120    // ms a new size must hold before the word is laid out again
const PEEK = 1000   // ms a sheet less than half in view waits before it is written anyway
const INK = [26, 35, 64]        // what a colour that is not #rrggbb falls back to
const PAPER = [243, 238, 227]

const hash = (x, y) => {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return s - Math.floor(s)
}
const smooth = (x, y) => {
  const xi = Math.floor(x), yi = Math.floor(y)
  const fx = x - xi, fy = y - yi
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy)
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}
const ease = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t))
const num = (v, fallback) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}
const rgb = (hex, fallback) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim())
  if (!m) return fallback
  const n = parseInt(m[1], 16)
  return [n >> 16, (n >> 8) & 255, n & 255]
}
// Beer–Lambert: pigment darkens multiplicatively; wet ink reads a touch darker.
const cover = (dry, wet) => (dry || wet ? 1 - Math.exp(-(dry * 1.6 + wet * 1.1)) : 0)

// The old picture carried onto a grid of another size: whole, centred and
// undistorted, as the canvas holds it while the box is changing.
const resample = (src, sw, sh, dw, dh) => {
  const out = new Float32Array(dw * dh)
  const k = Math.max(sw / dw, sh / dh)                  // old cells to a new one
  for (let y = 0; y < dh; y++) {
    const fy = (y + 0.5 - dh / 2) * k + sh / 2 - 0.5
    if (fy < -0.5 || fy > sh - 0.5) continue            // past the old sheet: bare paper
    const y0 = Math.min(sh - 1, Math.max(0, Math.floor(fy))), y1 = Math.min(sh - 1, y0 + 1)
    const ty = Math.min(1, Math.max(0, fy - y0))
    for (let x = 0; x < dw; x++) {
      const fx = (x + 0.5 - dw / 2) * k + sw / 2 - 0.5
      if (fx < -0.5 || fx > sw - 0.5) continue
      const x0 = Math.min(sw - 1, Math.max(0, Math.floor(fx))), x1 = Math.min(sw - 1, x0 + 1)
      const tx = Math.min(1, Math.max(0, fx - x0))
      const top = src[y0 * sw + x0] + (src[y0 * sw + x1] - src[y0 * sw + x0]) * tx
      const bot = src[y1 * sw + x0] + (src[y1 * sw + x1] - src[y1 * sw + x0]) * tx
      out[y * dw + x] = top + (bot - top) * ty
    }
  }
  return out
}

export default function WetInk({
  text = 'Morphiq',
  fontFamily = 'Georgia, "Times New Roman", serif',
  fontWeight = 400,
  fontSize = 'auto',       // px, or 'auto' to fit the box
  ink = '#1a2340',         // hex
  paper = '#f3eee3',       // hex
  speed = 360,             // mean pen speed, px/s
  bleed = 0.4,             // how far ink wicks before it dries
  grain = 0,               // the paper's machine direction, degrees
  cell = 2,                // px per simulation cell; smaller is finer and costlier
  rhythm = 1,              // how much the pen keeps a hand's pace; 0 sweeps evenly
  replay,                  // change to write the word again
  className = '',
  style,
  ...rest
}) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const engine = useRef(null)
  const word = text == null ? '' : String(text)

  const live = useRef(null)
  // Synced after every render and before the effects below, so the simulation
  // reads colours and pace without restarting the word.
  useEffect(() => {
    live.current = { ink, paper, speed, bleed, rhythm }
  })

  // The sheet: one simulation for the life of the element. What it writes
  // arrives through write(), so a new word continues from what is on the paper
  // instead of tearing the page down.
  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!root || !ctx) return

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const off = document.createElement('canvas')
    const o = off.getContext('2d', { willReadFrequently: true })

    let px = 2, cols = 0, rows = 0
    let mask, wet, dry, next, cx, cy, image
    // The previous picture, leaving: cleared from under a new word, or — `swap` —
    // crossed into the same word at a new size. Held whole while fadeAt is
    // Infinity. `kept` is the same picture on the grid it was taken from.
    let ghost = null, kept = null, kw = 0, kh = 0, swap = false, fadeAt = 0
    let woven = NaN                            // the grain the sheet's fibres were laid at
    let heavy = null, o0 = 0, o1 = 0, end = 0  // ink ahead of the tip, and its run
    let rampIn = 1, rampOut = 1, typical = 1, norm = 1, normFor = NaN
    let pen = 0, sim = 0, doneAt = -1, inked = false
    let spec = null, wanted = null, ticket = 0, pending = false
    let clock = 0, penAt = 0, asked = -Infinity
    let forward = null                         // work done out of sight, in slices
    let aim = null                             // where that work stops; null is dry
    let raf = 0, last = 0, timer = 0, peek = 0, dead = false
    let seen = typeof IntersectionObserver !== 'function'   // any of the sheet in view
    let shown = seen                                        // enough of it to watch
    let sized = false                                       // the box has had an area

    // The laid-out box, not the painted one: a transform on the way in — a card
    // scaling up as it enters — must not lay the word on a smaller sheet. A box
    // with no area — not rendered, or collapsed — is not a new size: the sheet
    // keeps the grid it has, picture and all, until the box is back.
    const dims = () => {
      const w = root.clientWidth, h = root.clientHeight
      if (!w || !h) return [cols || 8, rows || 8]
      sized = true
      return [Math.max(8, Math.round(w / px)), Math.max(8, Math.round(h / px))]
    }

    const alloc = (c, r) => {
      if (ghost) ghost = resample(kept, kw, kh, c, r)
      cols = c
      rows = r
      const n = c * r
      mask = new Float32Array(n)
      wet = new Float32Array(n)
      dry = new Float32Array(n)
      next = new Float32Array(n)
      cx = new Float32Array(n)            // conductance to the right-hand neighbour
      cy = new Float32Array(n)            // and to the one below
      woven = NaN
    }

    // The word, its paper and the pen's run, at the current size.
    const lay = (s) => {
      spec = s
      px = Math.min(64, Math.max(1, num(s.cell, 0) || 2))
      const [c, r] = dims()
      if (c !== cols || r !== rows) alloc(c, r)

      off.width = cols
      off.height = rows
      // A face the canvas cannot parse is ignored, and what was set before it
      // stands: a plain serif at the size asked, not the canvas's own 10px.
      const typeset = (size) => {
        o.font = `400 ${size}px serif`
        o.font = `${s.fontWeight} ${size}px ${s.fontFamily}`
      }
      const fit = () => {
        typeset(100)
        const w = o.measureText(s.text).width || 1
        return Math.min((cols * 0.88 * 100) / w, rows * 0.72)
      }
      // 'auto', or any size that is not one, fits the box.
      const size = num(s.fontSize, 0)
      const em = size > 0 ? Math.max(1, size / px) : fit()
      typeset(em)
      o.textAlign = 'center'
      o.textBaseline = 'middle'
      o.fillStyle = '#fff'
      o.fillText(s.text, cols / 2, rows / 2)
      const alpha = o.getImageData(0, 0, cols, rows).data

      // Fibres: a smooth orientation field around the grain, and a density that
      // mottles how readily each patch of paper takes ink. Measured from the
      // middle of the sheet, where the word sits, so a box that only widens
      // keeps the same paper under the same letters. A new word on the same
      // sheet is written on the same paper: the fibres are the costly half of
      // laying a word out, and are only woven again for a new size or grain.
      const g = num(s.grain, 0) * (Math.PI / 180)
      const weave = woven !== g
      woven = g
      const mx = Math.round(cols / 2), my = Math.round(rows / 2)
      const span = cols + Math.ceil(rows * SLANT) + BAND + 2
      const along = new Float32Array(span)
      let lo = span, hi = -1
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x
          const m = alpha[i * 4 + 3] / 255
          mask[i] = m
          if (m > 0.05) {
            const k = (x + (rows - y) * SLANT) | 0
            along[k] += m
            if (k < lo) lo = k
            if (k > hi) hi = k
          }
          if (!weave) continue
          const fx = x - mx, fy = y - my
          const theta = g + (smooth(fx / 9 + 500, fy / 9 + 500) - 0.5) * 1.6
          const density = 0.55 + 0.9 * smooth(fx / 3.1 + 540, fy / 3.1 + 500)
          const cc = Math.cos(theta) ** 2
          cx[i] = density * (0.12 + 0.88 * cc)
          cy[i] = density * (0.12 + 0.88 * (1 - cc))
        }
      }

      // The pen's run, from the first cell of ink until the tip has carried a
      // full band past the last, and how heavy the word is along it.
      wet.fill(0)
      dry.fill(0)
      inked = false
      sim = 0
      if (hi < 0) {
        heavy = null
        o0 = o1 = end = pen = 0
        doneAt = 0
        return
      }
      o0 = lo
      end = hi + 1
      o1 = end + BAND
      pen = o0
      doneAt = -1
      rampIn = Math.max(2, em * 0.5)
      rampOut = Math.max(2, em * 0.55)
      const sigma = Math.max(1.5, em * 0.13), reach = Math.ceil(sigma * 2.5)
      heavy = new Float32Array(span)
      let peak = 0
      for (let k = o0; k < o1; k++) {
        let acc = 0, wsum = 0
        for (let j = -reach; j <= reach; j++) {
          const q = k + j
          if (q < 0 || q >= span) continue
          const wgt = Math.exp((-j * j) / (2 * sigma * sigma))
          acc += along[q] * wgt
          wsum += wgt
        }
        heavy[k] = acc / wsum
        if (heavy[k] > peak) peak = heavy[k]
      }
      // Squared, so the heavy strokes stand out from the ordinary run of the word.
      if (peak > 0) for (let k = o0; k < o1; k++) heavy[k] = (heavy[k] / peak) ** 2
      normFor = NaN
    }

    // The tip's pace at one cell of its run, before normalising: slower where
    // the word is heavy, and held under a ceiling that rises as it touches down
    // and falls again into its last stroke, so it starts and stops like a hand.
    const hand = (k, r) => 1 / (1 + 1.2 * r * heavy[k])
    const rawPace = (k, r) => {
      const w = Math.min(1, r)
      const down = 1 - 0.65 * w, up = 1 - 0.45 * w
      const touch = down + (3 - down) * ease((k - o0) / rampIn)
      const lift = up + (3 - up) * ease((end - k) / rampOut)
      return Math.min(hand(k, r), typical * touch, typical * lift)
    }
    // Scaled so the run takes exactly as long as an even sweep at `speed`.
    const paceAt = (q, r) => {
      if (!heavy) return 1
      if (r !== normFor) {
        let t = 0
        for (let k = o0; k < o1; k++) t += 1 / hand(k, r)
        typical = (o1 - o0) / t
        t = 0
        for (let k = o0; k < o1; k++) t += 1 / rawPace(k, r)
        norm = t / (o1 - o0)
        normFor = r
      }
      const p = Math.min(o1 - 1, Math.max(o0, q))
      const k = Math.floor(p), f = p - k
      const a = rawPace(k, r), b = k + 1 < o1 ? rawPace(k + 1, r) : a
      return (a + (b - a) * f) * norm
    }

    const step = (dt, floor = 0) => {
      const { speed: v, bleed: bl, rhythm: rh } = live.current
      // Each held to a range: unbounded bleed is unbounded sub-steps, and a pace
      // that is not a number is a pen that never arrives.
      const D = 26 * Math.min(WICK, Math.max(0, Number(bl) || 0))   // cells²/s at full conductance
      const vc = Math.max(floor, Math.max(1, num(v, 360)) / px)     // cells/s
      const r = Math.min(SWAY, Math.max(0, Number(rh) || 0))

      const from = pen
      if (pen < o1) {
        const mid = pen + 0.5 * vc * paceAt(pen, r) * dt
        pen = Math.min(o1, pen + vc * paceAt(mid, r) * dt)
        if (pen > o0) inked = true
      }
      sim += dt
      if (doneAt < 0 && pen >= o1) doneAt = sim

      // Explicit diffusion is stable only for Δt ≤ h²/(4·Dmax); h is one cell.
      const limit = D > 0 ? 0.9 / (4 * D * 1.45) : dt
      const subs = Math.max(1, Math.ceil(dt / limit))
      const h = dt / subs
      const dose = LOAD / BAND
      for (let s = 0; s < subs; s++) {
        // The stretch of the run the tip crossed in this slice.
        const pa = from + ((pen - from) * s) / subs
        const pb = from + ((pen - from) * (s + 1)) / subs
        const moving = pb > pa
        for (let y = 0; y < rows; y++) {
          const lean = (rows - y) * SLANT
          for (let x = 0; x < cols; x++) {
            const i = y * cols + x
            let u = wet[i]
            // Fresh ink, in proportion to how much of this cell's band the tip crossed.
            if (moving && mask[i] > 0) {
              const at = x + lean
              const crossed = Math.min(pb, at + BAND) - Math.max(pa, at)
              if (crossed > 0) u += mask[i] * dose * crossed
            }
            // Dry paper among dry paper stays dry: most of the sheet, skipped.
            if (u === 0 &&
                (x === 0 || wet[i - 1] === 0) && (x === cols - 1 || wet[i + 1] === 0) &&
                (y === 0 || wet[i - cols] === 0) && (y === rows - 1 || wet[i + cols] === 0)) {
              next[i] = 0
              continue
            }
            // Flux to each neighbour through the shared edge's conductance.
            let flux = 0
            if (x > 0) flux += cx[i - 1] * (wet[i - 1] - wet[i])
            if (x < cols - 1) flux += cx[i] * (wet[i + 1] - wet[i])
            if (y > 0) flux += cy[i - cols] * (wet[i - cols] - wet[i])
            if (y < rows - 1) flux += cy[i] * (wet[i + cols] - wet[i])
            // Thin film soaks in faster: pigment gathers at the drying rim.
            const soak = SOAK * (1 + 1.4 * Math.exp(-u * 6)) * u
            let w = u + (D * flux - soak) * h
            dry[i] += soak * h
            // A film too thin to see soaks in at once, rather than spread forever.
            if (w < 1e-5) {
              if (w > 0) dry[i] += w
              w = 0
            }
            next[i] = w
          }
        }
        const t = wet; wet = next; next = t
      }
    }

    const wetAnywhere = () => {
      for (let i = 0; i < wet.length; i++) if (wet[i] > DAMP) return true
      return false
    }
    // The last of the wet soaks in where it lies; the sheet is now only pigment.
    const settle = () => {
      for (let i = 0; i < wet.length; i++) {
        dry[i] += wet[i]
        wet[i] = 0
      }
    }
    const moving = () => pen < o1 || wetAnywhere()
    // Work done out of sight, a step at a time: the word run forward to where
    // it had got to — the tip's share of its run, then its time drying — or,
    // with nowhere to stop, written out and dried.
    const reaching = function* (to) {
      const hurry = (o1 - o0) / 8
      const tip = to ? o0 + to.share * (o1 - o0) : o1
      for (let i = 0; i < 2400 && pen < tip; i++) {
        step(1 / 30, hurry)
        yield
      }
      const until = to ? (doneAt < 0 ? 0 : doneAt + to.drying) : Infinity
      for (let i = 0; i < 2400 && sim < until && wetAnywhere(); i++) {
        step(1 / 30)
        yield
      }
      if (!to) settle()
    }
    // It runs in slices between frames, the old picture held meanwhile, so a
    // new size never stalls the page for the length of a word.
    const slice = (budget) => {
      const t0 = performance.now()
      while (forward) {
        if (forward.next().done) forward = null
        else if (performance.now() - t0 > budget) break
      }
      return !forward
    }

    const fading = () => (ghost ? Math.min(1, Math.max(0, 1 - (clock - fadeAt) / FADE)) : 0)
    // One cell of the picture: the ink on the paper, and the old picture over
    // it — crossing into the same word, or clearing from under a new one.
    const shade = (i, g) => {
      const a = cover(dry[i], wet[i])
      if (g <= 0) return a
      return swap ? a + (ghost[i] - a) * g : 1 - (1 - g * ghost[i]) * (1 - a)
    }

    const paint = () => {
      const { ink: inkHex, paper: paperHex } = live.current
      const [ir, ig, ib] = rgb(inkHex, INK)
      const [pr, pg, pb] = rgb(paperHex, PAPER)
      const g = fading()
      if (!image || image.width !== cols || image.height !== rows) {
        canvas.width = cols
        canvas.height = rows
        image = ctx.createImageData(cols, rows)
      }
      const d = image.data
      for (let i = 0, n = cols * rows; i < n; i++) {
        const a = shade(i, g)
        d[i * 4] = pr + (ir - pr) * a
        d[i * 4 + 1] = pg + (ig - pg) * a
        d[i * 4 + 2] = pb + (ib - pb) * a
        d[i * 4 + 3] = 255
      }
      ctx.putImageData(image, 0, 0)
    }

    // What is on the paper now becomes the old picture: held, to cross into
    // the same word at a new size, or leaving at once from under a new word.
    // Nothing fades under reduced motion, nor where nobody is looking.
    const keep = (crossing) => {
      const g = fading()
      const old = new Float32Array(cols * rows)
      let any = false
      for (let i = 0; i < old.length; i++) {
        old[i] = shade(i, g)
        if (old[i] > 0.004) any = true
      }
      ghost = kept = any && !calm.matches && (crossing || seen) ? old : null
      kw = cols
      kh = rows
      swap = crossing
      fadeAt = crossing ? Infinity : clock
    }

    // A fresh sheet: the old one clears from where it stands.
    const clear = () => {
      keep(false)
      penAt = ghost ? clock + LEAD : clock
      wet.fill(0)
      dry.fill(0)
      heavy = null
      o0 = o1 = end = pen = 0
      doneAt = 0
      inked = false
    }

    // The pen's first touch waits to be watched; once down, it only needs to be seen.
    const busy = () => !!ghost || (!pending && (inked || shown) && moving())

    const frame = (now) => {
      raf = 0
      // Reduced motion: whatever was moving is finished out of sight instead,
      // and the old picture stays up until there is a new one to show.
      if (calm.matches && !forward) {
        if (pending) return
        if (ghost || (mask && moving())) {
          ghost = kept = null
          aim = null
          forward = reaching(aim)
        }
      }
      if (forward) {
        if (slice(seen ? 8 : 3)) {
          fadeAt = clock                           // the held picture starts to leave
          paint()
        }
        last = 0
        raf = requestAnimationFrame(frame)
        return
      }
      const dt = last ? Math.min(1 / 30, (now - last) / 1000) : 1 / 60
      last = now
      const was = clock
      clock += dt
      if (ghost && clock - fadeAt >= FADE) ghost = kept = null
      if (!pending && mask && (inked || shown) && clock > penAt) {
        step(Math.min(dt, clock - Math.max(was, penAt)))
      }
      if (mask) paint()
      if (busy()) {
        raf = requestAnimationFrame(frame)
      } else {
        settle()
        if (mask) paint()
        last = 0
      }
    }

    // Out of view nothing runs — except a word to be shown dry, which is
    // worked out all the same, to be there on arrival. Nor does anything run
    // on a sheet that has never had a size: there is nothing yet to write on.
    const wake = () => {
      if (raf || dead || !sized || !(seen || (forward && calm.matches))) return
      last = 0
      raf = requestAnimationFrame(frame)
    }

    const write = (s) => {
      const t = ++ticket
      const now = performance.now()
      // The same word again is a command, and answered at once. A different
      // one, or one request of several in quick succession, is likely not the
      // last: the pen waits a longer beat after each.
      const patient =
        wanted && (now - asked < LULL * 1000 || Object.keys(s).some((k) => s[k] !== wanted[k]))
      asked = now
      wanted = s
      // Once the pen has touched the paper, a new word needs a fresh sheet;
      // before that, it only changes what the waiting pen will write. Work
      // still catching up to a new size is dropped: the picture held for it is
      // the one on screen, and the one to clear from.
      if (inked || forward) {
        forward = null
        clear()
      }
      if (patient) penAt = clock + LULL
      const go = () => {
        if (dead || t !== ticket) return
        pending = false
        lay(s)
        if (calm.matches) {
          ghost = kept = null
          aim = null
          forward = reaching(aim)
        } else {
          paint()
        }
        wake()
      }
      // Written once the face has arrived, or the fallback font is what dries.
      const face = `${s.fontWeight} 100px ${s.fontFamily}`
      let ready
      try {
        ready = !document.fonts?.check || document.fonts.check(face, s.text || ' ')
      } catch {
        ready = true                                 // a font string the browser cannot parse
      }
      if (ready) return go()
      pending = true
      document.fonts.load(face, s.text || ' ').then(go, go)
      wake()                                         // the old sheet clears meanwhile
    }

    // A new size: lay the word out again and run it forward, out of sight, to
    // where it had got to, the picture as it stood held until it is there.
    const refit = () => {
      timer = 0
      if (dead || !spec || pending) return
      const [c, r] = dims()
      if (c === cols && r === rows) return
      // Work this interrupts was not yet the picture: its aim, and the picture
      // held for it, still stand.
      if (!forward) {
        // Nothing on the paper yet: only the sheet changes under the waiting pen.
        if (!inked && !calm.matches) {
          lay(spec)
          paint()
          return wake()
        }
        aim = moving()
          ? { share: (pen - o0) / (o1 - o0), drying: doneAt < 0 ? 0 : sim - doneAt }
          : null
        keep(true)
      }
      lay(spec)
      forward = reaching(calm.matches ? null : aim)
      wake()
    }

    const ro = new ResizeObserver(() => {
      if (!spec || pending) return
      const first = !sized
      const [c, r] = dims()
      if (c === cols && r === rows) return
      clearTimeout(timer)
      // Nothing on the paper yet, or no paper until now: lay it out at once.
      // Otherwise the picture there rides along with the box until the size
      // holds, and the word is then rebuilt once.
      if (first || (!inked && !ghost && !forward)) refit()
      else timer = setTimeout(refit, HOLD)
    })
    ro.observe(root)

    const io = seen
      ? null
      : new IntersectionObserver(
          (entries) => {
            const e = entries[entries.length - 1]
            seen = e.isIntersecting
            if (!seen || e.intersectionRatio >= 0.5) {
              shown = seen
              clearTimeout(peek)
              peek = 0
            } else if (!shown && !peek) {
              peek = setTimeout(() => {
                peek = 0
                shown = true
                wake()
              }, PEEK)
            }
            if (seen) wake()
            else if (raf && !(forward && calm.matches)) {
              cancelAnimationFrame(raf)
              raf = 0
            }
          },
          { threshold: [0, 0.5] },
        )
    io?.observe(root)

    engine.current = {
      write,
      // Not while a picture is being held for work still out of sight — a word
      // on its way under reduced motion, or its face: the new colours arrive with it.
      repaint: () => {
        if (mask && !dead && !forward && !(pending && calm.matches)) paint()
      },
    }

    return () => {
      dead = true
      engine.current = null
      ro.disconnect()
      io?.disconnect()
      clearTimeout(timer)
      clearTimeout(peek)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // What is written. Any change writes it again, on a fresh sheet.
  useEffect(() => {
    engine.current?.write({
      text: word,
      fontFamily,
      fontWeight,
      fontSize,
      grain,
      cell,
    })
  }, [word, fontFamily, fontWeight, fontSize, grain, cell, replay])

  // Colours are not ink: a new one repaints the word as it stands.
  useEffect(() => {
    engine.current?.repaint()
  }, [ink, paper])

  // The word is the picture's name; a sheet with nothing on it is only decoration.
  const named = word.trim() !== ''
  // The box behind the canvas is the paper the canvas paints, fallback and all:
  // it shows beside a picture held at its own proportions.
  const sheet = `rgb(${rgb(paper, PAPER).join(', ')})`
  return (
    <div
      ref={rootRef}
      className={`wet-ink ${className}`.trim()}
      role={named ? 'img' : undefined}
      aria-label={named ? word : undefined}
      aria-hidden={named ? undefined : true}
      style={{ '--wet-ink-paper': sheet, ...style }}
      {...rest}
    >
      <canvas ref={canvasRef} className="wet-ink__canvas" aria-hidden="true" />
    </div>
  )
}
