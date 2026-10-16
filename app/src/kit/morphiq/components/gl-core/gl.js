/* =========================================================
   gl-core
   The WebGL2 layer under Caustic Surface, Halftone Screen,
   Focus Peaking and Brushed Metal. Each of those is one
   fragment shader over a rectangle; everything that is not
   the shader lives here, once.

   It is deliberately not a renderer. It owns the four places
   raw WebGL goes quietly wrong, and nothing else.

   1  Geometry. The picture is one triangle, (−1,−1) (3,−1)
      (−1,3), clipped to the viewport — not a two-triangle
      quad, whose diagonal seam is shaded twice. vUv runs
      0..1 over the visible part, (0,0) bottom-left.

   2  Uniforms. Which gl.uniform* call a value needs is decided
      by the shader, not the value: [1,0] is a vec2 or an ivec2
      depending on the declaration. So types come from the
      linked program's own active-uniform table, and set(name,
      value) cannot pick the wrong call. Samplers get fixed
      texture units at link time; left alone they all default
      to unit 0 and read whichever texture was bound last.

   3  Size. A drawing buffer is device pixels, a layout box is
      CSS pixels, and on a very large canvas the browser may
      allocate less than was asked for without saying so.
      resize() caps the density and takes the viewport from
      what was actually allocated.

   4  Context loss. The GPU can be taken away at any moment —
      a driver reset, memory pressure on a phone, too many
      contexts on one page. The browser only offers the context
      back if the loss event was preventDefault()ed. Here it is,
      and every handle keeps what it needs to rebuild itself,
      so a component's references survive a loss and all it
      does is draw again.

   dispose() frees what was created but does not force the
   context lost: StrictMode remounts an effect on the same
   canvas, and getContext() hands back the same context — lose
   it on the first unmount and the second mount inherits a
   dead one.
   ========================================================= */

/* Clip-space triangle in, vUv out. */
export const FULLSCREEN_VERTEX = `#version 300 es
layout(location = 0) in vec2 position;
out vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`

const EMPTY = new Uint8Array(4)

/** Returns null when WebGL2 is unavailable, so the caller can render a fallback. */
export function createGL(canvas, { onLost, onRestore, ...attributes } = {}) {
  let gl = null
  try {
    gl = canvas.getContext('webgl2', {
      alpha: true, antialias: false, depth: false, stencil: false,
      premultipliedAlpha: true, ...attributes,
    })
  } catch {
    gl = null
  }
  if (!gl) return null

  const resources = new Set()     // { build, free } behind every handle handed out
  let lost = gl.isContextLost()
  let dead = false
  let vao = null
  let vbo = null

  const live = () => !lost && !dead

  const SETTERS = new Map([
    [gl.FLOAT, '1f'], [gl.FLOAT_VEC2, '2f'], [gl.FLOAT_VEC3, '3f'], [gl.FLOAT_VEC4, '4f'],
    [gl.INT, '1i'], [gl.BOOL, '1i'], [gl.INT_VEC2, '2i'], [gl.INT_VEC3, '3i'],
    [gl.FLOAT_MAT3, 'Matrix3f'], [gl.FLOAT_MAT4, 'Matrix4f'],
  ])

  const buildShared = () => {
    vao = gl.createVertexArray()
    vbo = gl.createBuffer()
    gl.bindVertexArray(vao)
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    gl.bindVertexArray(null)
  }

  const onContextLost = (e) => {
    e.preventDefault()            // the only thing that makes 'restored' ever fire
    lost = true
    onLost?.()
  }
  const onContextRestored = () => {
    if (dead) return
    lost = false
    buildShared()
    for (const r of resources) r.build()
    onRestore?.()
  }
  canvas.addEventListener('webglcontextlost', onContextLost)
  canvas.addEventListener('webglcontextrestored', onContextRestored)
  if (!lost) buildShared()

  // Registers a handle's GL side: built now, or on restore if the context is down.
  const own = (entry) => {
    resources.add(entry)
    if (live()) entry.build()
    return () => {
      if (resources.delete(entry) && !dead) entry.free()
    }
  }

  /* ---------------- programs ---------------- */

  const compileError = (shader, label) =>
    gl.getShaderParameter(shader, gl.COMPILE_STATUS)
      ? ''
      : `${label} shader: ${(gl.getShaderInfoLog(shader) || '').trim()}`

  function program(fragment, vertex = FULLSCREEN_VERTEX) {
    // '#version' must be the very first characters, and template literals rarely start there.
    const fs = fragment.trimStart()
    const vs = vertex.trimStart()
    const uniforms = new Map()

    const h = {
      program: null,
      /** Sets one uniform, or several from an object. Unknown names are ignored:
          a uniform the linker optimised away is not an error. */
      set(name, value) {
        if (!live() || !h.program) return h
        gl.useProgram(h.program)
        if (typeof name === 'object') {
          for (const k in name) uniforms.get(k)?.(name[k])
        } else {
          uniforms.get(name)?.(value)
        }
        return h
      },
      dispose: () => release(),
    }

    const build = () => {
      const p = gl.createProgram()
      const v = gl.createShader(gl.VERTEX_SHADER)
      const f = gl.createShader(gl.FRAGMENT_SHADER)
      gl.shaderSource(v, vs)
      gl.shaderSource(f, fs)
      gl.compileShader(v)
      gl.compileShader(f)
      gl.attachShader(p, v)
      gl.attachShader(p, f)
      gl.linkProgram(p)
      // Status is only queried after a failed link; asking up front forces a
      // synchronous driver round-trip per shader even when nothing is wrong.
      const why = gl.getProgramParameter(p, gl.LINK_STATUS) || gl.isContextLost()
        ? ''
        : compileError(v, 'vertex') || compileError(f, 'fragment') || gl.getProgramInfoLog(p)
      gl.deleteShader(v)            // the program keeps them alive while attached
      gl.deleteShader(f)
      if (why) {
        gl.deleteProgram(p)
        throw new Error(`gl-core: ${why}`)
      }

      h.program = p
      uniforms.clear()
      gl.useProgram(p)
      let unit = 0
      const count = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS) || 0
      for (let i = 0; i < count; i++) {
        const info = gl.getActiveUniform(p, i)
        const loc = info && gl.getUniformLocation(p, info.name)
        if (!loc) continue

        const name = info.name.replace(/\[0\]$/, '')
        if (info.type === gl.SAMPLER_2D) {
          const u = unit++
          gl.uniform1i(loc, u)
          uniforms.set(name, (tex) => {
            gl.activeTexture(gl.TEXTURE0 + u)
            gl.bindTexture(gl.TEXTURE_2D, tex?.texture ?? null)
          })
          continue
        }
        const suffix = SETTERS.get(info.type)
        if (!suffix) continue
        const vec = gl[`uniform${suffix}v`].bind(gl)
        if (suffix.startsWith('Matrix')) uniforms.set(name, (m) => vec(loc, false, m))
        else if (suffix[0] === '1' && info.size === 1) uniforms.set(name, (n) => gl[`uniform${suffix}`](loc, +n))
        else uniforms.set(name, (list) => vec(loc, list))
      }
    }

    const release = own({
      build,
      free: () => { gl.deleteProgram(h.program); h.program = null; uniforms.clear() },
    })
    return h
  }

  /* ---------------- textures ---------------- */

  /* An image, canvas, bitmap or video frame. Until the source has pixels — or
     if it is cross-origin without CORS, and so not ours to read — a transparent
     1×1 stands in, so a sampler never reads an incomplete texture, which GL
     defines as black and some drivers as garbage. */
  function texture(source = null, { flipY = true, repeat = false } = {}) {
    let src = source
    const h = {
      texture: null,
      width: 0,
      height: 0,
      ready: false,
      update(next) {
        if (next !== undefined) src = next
        if (live() && h.texture) upload()
        return h.ready
      },
      dispose: () => release(),
    }

    const upload = () => {
      // On a unit no sampler uses: binding to upload replaces what the active
      // unit held, which would silently swap out a texture a sampler reads.
      gl.activeTexture(gl.TEXTURE0 + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS) - 1)
      gl.bindTexture(gl.TEXTURE_2D, h.texture)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY)
      const w = src ? src.naturalWidth || src.videoWidth || src.width || 0 : 0
      const ht = src ? src.naturalHeight || src.videoHeight || src.height || 0 : 0
      let ok = false
      if (w > 0 && ht > 0 && src.complete !== false) {
        try {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, src)
          ok = true
        } catch {
          ok = false
        }
      }
      if (!ok) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, EMPTY)

      const wrap = repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap)
      h.width = ok ? w : 1
      h.height = ok ? ht : 1
      h.ready = ok
    }

    const release = own({
      build: () => { h.texture = gl.createTexture(); upload() },
      free: () => { gl.deleteTexture(h.texture); h.texture = null; h.ready = false },
    })
    return h
  }

  return {
    gl,
    get lost() { return lost || dead },
    program,
    texture,

    /** Draws the triangle with the program whose set() ran last. */
    draw() {
      if (!live() || !vao) return
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
      gl.bindVertexArray(vao)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      gl.bindVertexArray(null)
    },

    /* CSS size in, device-pixel size out. Assigning canvas.width clears the
       buffer even to the same value, so it is only written on a change. */
    resize(width, height, dprCap = 2) {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap > 0 ? dprCap : 2)
      const px = (n) => Math.max(1, Math.round((Number.isFinite(n) && n > 0 ? n : 0) * dpr))
      const w = px(width)
      const ht = px(height)
      if (canvas.width !== w) canvas.width = w
      if (canvas.height !== ht) canvas.height = ht
      // Lost, the buffer reports 0×0; the requested size is the best answer then.
      return { width: gl.drawingBufferWidth || w, height: gl.drawingBufferHeight || ht, dpr }
    },

    dispose() {
      if (dead) return
      for (const r of resources) r.free()
      resources.clear()
      gl.deleteVertexArray(vao)
      gl.deleteBuffer(vbo)
      vao = vbo = null
      canvas.removeEventListener('webglcontextlost', onContextLost)
      canvas.removeEventListener('webglcontextrestored', onContextRestored)
      dead = true
    },
  }
}

/* Runs `frame(now)` on animation frames while the element is on screen and the
   caller says there is more to draw. `frame` returns true to keep going; kick()
   restarts a settled loop. Shared because all four GL components need exactly
   this, and each hand-rolled copy is another place to forget the observer. */
export function createLoop(element, frame) {
  let raf = 0
  let onScreen = true
  const tick = (now) => {
    raf = 0
    if (onScreen && frame(now)) raf = requestAnimationFrame(tick)
  }
  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting
    if (onScreen) kick()
    else if (raf) { cancelAnimationFrame(raf); raf = 0 }
  })
  io.observe(element)
  function kick() {
    if (!raf && onScreen) raf = requestAnimationFrame(tick)
  }
  return {
    kick,
    stop() {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    },
  }
}

/* Any CSS colour to linear RGB, 0..1. Shaders light in linear space; a hex
   string is sRGB, and lighting it without decoding darkens every midtone. The
   2D context normalises whatever CSS accepts — names, rgb(), hsl() — to hex. */
let probe = null
export function linearRGB(color, fallback = [0, 0, 0]) {
  probe ??= document.createElement('canvas').getContext('2d')
  if (!probe || typeof color !== 'string') return fallback
  probe.fillStyle = '#000'
  probe.fillStyle = color
  const hex = /^#([0-9a-f]{6})$/i.exec(probe.fillStyle)
  if (!hex) return fallback
  const n = parseInt(hex[1], 16)
  return [n >> 16, (n >> 8) & 255, n & 255].map((c) => {
    const v = c / 255
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  })
}

/* Loads an image whose pixels will be uploaded. A cross-origin URL is asked
   for with CORS, because without it the pixels are not the page's to read and
   the upload throws. Returns a cancel function, so a load that finishes after
   the src changed — or after unmount — never lands. */
export function loadImage(src, done) {
  let cancelled = false
  if (!src) {
    done(null)
    return () => {}
  }
  const img = new Image()
  try {
    if (new URL(src, window.location.href).origin !== window.location.origin) img.crossOrigin = 'anonymous'
  } catch {
    // Not a URL the page can resolve; let the browser report it through onerror.
  }
  img.decoding = 'async'
  img.onload = () => { if (!cancelled) done(img) }
  img.onerror = () => { if (!cancelled) done(null) }
  img.src = src
  return () => { cancelled = true }
}
