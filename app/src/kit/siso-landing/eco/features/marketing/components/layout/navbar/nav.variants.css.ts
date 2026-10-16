// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/layout/navbar/nav.variants.css.ts)
// ═══════════════════════════════════════════════════════════════════════════════
// The three variations, as CSS over the bar NavBar.tsx already draws.
//
// Everything is scoped to .nav-container[data-nav="N"] (and, for the open panel, to html[data-nav="N"] — the panel is
// `position:fixed` and portalled out of the bar, so it cannot be a descendant selector). Nothing here touches a menu's
// contents: the product tiles, the Agent Base modules row, the video slot and the All projects notch are untouched in all
// three, and each keeps the glow hand-off and the product-coloured glow. Only density, spacing, glow strength, panel width,
// panel attachment and typography move.
//
// Merging with the lane that redesigns the dropdowns' insides: that lane edits ProductDropdown / AgencyDropdown /
// ResourcesDropdown and nav.icons; this file edits none of them.
// ═══════════════════════════════════════════════════════════════════════════════

// ── 1. Tight ───────────────────────────────────────────────────────────────────
// The complaint a dense bar answers: the capsule is tall and the panel floats away from it, so the two read as two objects.
// So: 54px bar, links closer together, the ring turned down to a slow hold at idle (it still turns, just dimmer and
// slower, which is the "calmer idle" without losing the thing he likes), and the panel docked 2px under the bar with its
// top corners square, so bar and panel are one piece. The hand-off is unchanged — open a menu and the bar still goes quiet
// while the panel takes the neon.
const V1 = `
/* The side padding matches the panel's (DROPDOWN.sidePadding, 40px): a docked panel whose edges miss the bar's by 8px
   reads as a mistake, not as one piece. */
.nav-container[data-nav="1"]{padding:8px 40px}
.nav-container[data-nav="1"] .nav-inner{height:54px;gap:26px;border-radius:16px;padding:0 10px 0 14px;
  box-shadow:0 0 0 1px #ffffff08,0 12px 34px -18px color-mix(in srgb,var(--nav-ember) 42%,transparent),
    0 0 28px -14px color-mix(in srgb,var(--nav-rose) 28%,transparent)}
/* Calmer idle: the ring is thinner, dimmer and takes twice as long to come round. */
.nav-container[data-nav="1"] .nav-inner::before{padding:1.25px;opacity:.62;animation-duration:12s}
.nav-container[data-nav="1"] .nav-inner>.nav-neon{inset:-2px;filter:blur(7px);opacity:.5}
.nav-container[data-nav="1"] .nav-inner>.nav-neon>i{border-radius:19px;padding:4px;animation-duration:12s}
/* Hover on the bar brings the glow back up, so the quiet idle still reacts to the pointer. */
.nav-container[data-nav="1"] .nav-inner:hover::before{opacity:1}
.nav-container[data-nav="1"] .nav-inner:hover>.nav-neon{opacity:.85}
.nav-container[data-nav="1"] .nav-links{gap:4px}
.nav-container[data-nav="1"] .nav-link-btn,.nav-container[data-nav="1"] .nav-simple-link,
.nav-container[data-nav="1"] .nav-signin{font-size:14px;letter-spacing:-.005em}
.nav-container[data-nav="1"] .nav-link-btn{padding:5px 4px 5px 8px}
.nav-container[data-nav="1"] .nav-icon{width:17px;height:17px}
.nav-container[data-nav="1"] .nav-trial-btn{font-size:14px;padding:6px;border-radius:9px}
.nav-container[data-nav="1"] .nav-right{gap:4px}
/* Docked panel: square top corners and a tighter radius, so it grows out of the bar instead of hovering under it. */
html[data-nav="1"] .siso-nav-dropdown-inner{border-radius:0 0 22px 22px!important}
html[data-nav="1"] .siso-nav-dropdown>.nav-panel-bloom>i{border-radius:0 0 26px 26px}
html[data-nav="1"] .siso-nav-dropdown>.nav-panel-bloom{inset:-3px -4px -4px;filter:blur(10px);opacity:.6}
/* The notch rail is the panel's floor; keep it clear of the tighter padding. */
html[data-nav="1"] .ne-main{padding:16px 20px 0}
html[data-nav="1"] .ne .nv-rail{margin:4px -20px 0}
@media (max-width:991px){
  .nav-container[data-nav="1"]{padding:6px 12px}
  .nav-container[data-nav="1"] .nav-inner{height:50px;gap:12px}
}
`;

// ── 2. Hairline ────────────────────────────────────────────────────────────────
// The cleanest of the three, and the biggest bet: at rest the bar is a hairline capsule with no ring at all, so the hero
// is the only lit thing on the page. Point at it (or open a menu) and the neon arrives over .45s. The glow hand-off reads
// stronger here, because the bar was never competing: the panel is the only lit object.
// It also goes the other way on space — a wider panel (1440) with more air inside it, since the bar gives none away.
const V2 = `
.nav-container[data-nav="2"]{padding:12px 40px;background:linear-gradient(rgba(2,3,8,0.88) 60%,rgba(2,3,8,0))}
.nav-container[data-nav="2"] .nav-inner{height:60px;border-radius:999px;padding:0 8px 0 18px;gap:32px;
  box-shadow:0 0 0 1px #ffffff12,0 10px 30px -20px #000a;transition:box-shadow .45s cubic-bezier(.19,1,.22,1)}
/* Idle: no ring, no bloom — just the hairline the box-shadow above draws. */
.nav-container[data-nav="2"] .nav-inner::before{padding:1.5px;opacity:0;animation-duration:9s}
.nav-container[data-nav="2"] .nav-inner>.nav-neon{inset:-2px;filter:blur(11px);opacity:0}
.nav-container[data-nav="2"] .nav-inner>.nav-neon>i{border-radius:999px;padding:5px;animation-duration:9s}
.nav-container[data-nav="2"] .nav-inner>.nav-glass{background:rgba(10,11,15,0.72)}
/* The neon arrives on the pointer or on keyboard focus inside the bar. */
.nav-container[data-nav="2"] .nav-inner:hover::before,
.nav-container[data-nav="2"] .nav-inner:focus-within::before{opacity:1}
.nav-container[data-nav="2"] .nav-inner:hover>.nav-neon,
.nav-container[data-nav="2"] .nav-inner:focus-within>.nav-neon{opacity:.9}
.nav-container[data-nav="2"] .nav-inner:hover,.nav-container[data-nav="2"] .nav-inner:focus-within{
  box-shadow:0 0 0 1px #ffffff08,0 16px 48px -18px color-mix(in srgb,var(--nav-ember) 55%,transparent),
    0 0 40px -14px color-mix(in srgb,var(--nav-rose) 40%,transparent)}
/* While a menu is open the bar stays the hairline it already was, which is the hand-off with nothing to undo. */
.nav-container[data-nav="2"][data-menu] .nav-inner{box-shadow:0 0 0 1px #ffffff12,0 10px 30px -20px #000a}
.nav-container[data-nav="2"][data-menu] .nav-inner:hover::before{opacity:0}
.nav-container[data-nav="2"][data-menu] .nav-inner:hover>.nav-neon{opacity:0}
.nav-container[data-nav="2"] .nav-links{gap:18px}
.nav-container[data-nav="2"] .nav-link-btn{padding:7px 6px 7px 10px}
.nav-container[data-nav="2"] .nav-link-btn,.nav-container[data-nav="2"] .nav-simple-link,
.nav-container[data-nav="2"] .nav-signin{font-size:15px;color:#ffffff9c}
.nav-container[data-nav="2"] .nav-trial-btn{border-radius:999px;padding:8px 6px 8px 12px}
.nav-container[data-nav="2"] .nav-signin{border-radius:999px}
/* The airier panel: a softer rim, a deeper radius and more room around the tiles. */
html[data-nav="2"] .siso-nav-dropdown-inner{border-radius:30px!important}
html[data-nav="2"] .siso-nav-dropdown-inner::after{padding:1px;animation-duration:10s}
html[data-nav="2"] .siso-nav-dropdown>.nav-panel-bloom{inset:-5px;filter:blur(16px);opacity:.55}
html[data-nav="2"] .siso-nav-dropdown>.nav-panel-bloom>i{border-radius:34px}
html[data-nav="2"] .ne{grid-template-columns:minmax(0,1fr) 372px}
html[data-nav="2"] .ne-main{padding:28px 32px 0;gap:18px}
html[data-nav="2"] .ne-grid{gap:14px}
html[data-nav="2"] .ne-tile{padding:20px 18px 18px;border-radius:18px;gap:14px}
html[data-nav="2"] .ne-mods{padding:10px 14px}
html[data-nav="2"] .ne-side{padding:28px 30px}
html[data-nav="2"] .ne .nv-rail{margin:10px -32px 0}
@media (max-width:991px){
  .nav-container[data-nav="2"]{padding:8px 12px}
  .nav-container[data-nav="2"] .nav-inner{height:52px;gap:12px;padding:0 8px 0 14px}
  /* No pointer on a phone: the hairline would never light, so give it its ring back. */
  .nav-container[data-nav="2"] .nav-inner::before{opacity:.8}
  .nav-container[data-nav="2"] .nav-inner>.nav-neon{opacity:.6}
  html[data-nav="2"] .ne-main{padding:8px 0 4px!important}
}
`;

// ── 3. Sheet ───────────────────────────────────────────────────────────────────
// The other direction entirely: drop the floating capsule. The bar is the page's top edge — full width, one lit hairline
// under it instead of a ring, taller type with more tracking — and the open panel is an edge-to-edge sheet hanging off
// that edge, square-shouldered, its only radius at the bottom. The hand-off becomes the edge itself: closed, the hairline
// burns under the bar; open, it goes quiet and the sheet's rim takes over. Cleanest at 1920, where the capsule's side
// margins start to look like a mistake.
const V3 = `
.nav-container[data-nav="3"]{padding:0;background:linear-gradient(rgba(2,3,8,0.96) 70%,rgba(2,3,8,0))}
.nav-container[data-nav="3"] .nav-inner{max-width:none;height:56px;border-radius:0;padding:0 clamp(20px,4vw,56px);gap:34px;
  box-shadow:none}
/* The ring becomes one lit edge. The bar's conic gradient is wrong on a flat 1px strip — its transparent arcs land as a
   dark half — so the edge gets its own linear ramp in the same glow variables, lit in the middle like the footer's rail,
   with a highlight travelling along it (background-position only, so nothing lays out). */
@keyframes siso-nav-edge{to{background-position:130% 0,0 0}}
.nav-container[data-nav="3"]{--nav-edge:linear-gradient(90deg,transparent,#fff7e8,transparent) -30% 0/14% 100% no-repeat,
  linear-gradient(90deg,transparent,color-mix(in srgb,var(--nav-ember) 30%,transparent) 14%,
    color-mix(in srgb,var(--nav-gold) 70%,transparent) 38%,#fff3d6 50%,
    color-mix(in srgb,var(--nav-rose) 70%,transparent) 62%,color-mix(in srgb,var(--nav-ember) 30%,transparent) 86%,transparent)}
.nav-container[data-nav="3"] .nav-inner::before{inset:auto 0 0;height:1px;padding:0;background:var(--nav-edge);
  -webkit-mask:none;mask:none;animation:siso-nav-edge 7s cubic-bezier(.45,0,.55,1) infinite;opacity:.95}
.nav-container[data-nav="3"] .nav-inner>.nav-neon{inset:auto 0 -6px;height:12px;filter:blur(8px);opacity:.75}
.nav-container[data-nav="3"] .nav-inner>.nav-neon>i{inset:auto 0 6px;height:1px;padding:0;border-radius:0;
  background:var(--nav-edge);-webkit-mask:none;mask:none;animation:siso-nav-edge 7s cubic-bezier(.45,0,.55,1) infinite}
.nav-container[data-nav="3"] .nav-inner>.nav-glass{background:rgba(5,6,10,0.78)}
.nav-container[data-nav="3"] .nav-inner>.nav-quiet{box-shadow:inset 0 -1px 0 0 #ffffff1f}
/* The hand-off on an edge: the lit line and its bloom go out, the hairline holds, the sheet takes the neon. */
.nav-container[data-nav="3"][data-menu] .nav-inner{box-shadow:none}
.nav-container[data-nav="3"] .nav-links{gap:22px}
.nav-container[data-nav="3"] .nav-link-btn,.nav-container[data-nav="3"] .nav-simple-link,
.nav-container[data-nav="3"] .nav-signin{font-size:15.5px;font-weight:450;letter-spacing:-.012em;color:#ffffff94}
.nav-container[data-nav="3"] .nav-link-btn{padding:6px 4px 6px 6px}
.nav-container[data-nav="3"] .nav-trial-btn{font-size:14.5px;border-radius:8px}
/* Any page hero can start at the top again: there is no capsule to clear. */
@media (min-width:992px){.nav-container[data-nav="3"] ~ * .product-hero,html[data-nav="3"] .product-hero{padding-top:0}}
/* The sheet: full width, square shoulders, radius only at the bottom. */
html[data-nav="3"] .siso-nav-dropdown{left:0!important;right:0!important}
html[data-nav="3"] .siso-nav-dropdown.is-narrow{left:auto!important;right:auto!important}
html[data-nav="3"] .siso-nav-dropdown-inner{border-radius:0 0 26px 26px!important}
html[data-nav="3"] .siso-nav-dropdown>.nav-panel-bloom{inset:0 -2px -5px;filter:blur(14px);opacity:.6}
html[data-nav="3"] .siso-nav-dropdown>.nav-panel-bloom>i{border-radius:0 0 30px 30px}
/* Edge-to-edge means the contents need the bar's own side padding, and the notch rail spans the whole sheet. */
html[data-nav="3"] .ne-main{padding:24px clamp(20px,4vw,56px) 0}
html[data-nav="3"] .ne{grid-template-columns:minmax(0,1fr) clamp(300px,26vw,420px)}
html[data-nav="3"] .ne-side{padding:24px clamp(20px,3vw,40px)}
html[data-nav="3"] .ne .nv-rail{margin:8px calc(clamp(20px,4vw,56px) * -1) 0}
html[data-nav="3"] .nv-rail::after{width:min(900px,70%)}
@media (max-width:991px){
  .nav-container[data-nav="3"]{padding:0;background:#020308}
  .nav-container[data-nav="3"] .nav-inner{height:52px;padding:0 14px;gap:12px}
  html[data-nav="3"] .ne-main{padding:8px 0 4px!important}
  html[data-nav="3"] .mobile-menu{padding:16px 14px}
}
`;

// The hand-off, restated for every variant. This has to come last and has to out-specify the idle rules above: each
// variant sets its own idle opacity on .nav-inner::before and .nav-neon, which otherwise ties or beats NavBar's
// `.nav-container[data-menu]` rule and leaves the bar lit while a panel is open — the one thing Shaan asked be kept.
// Variant 2 is already dark at idle, so this only ever confirms it.
const HANDOFF = `
.nav-container[data-nav="1"][data-menu] .nav-inner::before,.nav-container[data-nav="1"][data-menu] .nav-inner>.nav-neon,
.nav-container[data-nav="1"][data-menu] .nav-inner:hover::before,.nav-container[data-nav="1"][data-menu] .nav-inner:hover>.nav-neon,
.nav-container[data-nav="2"][data-menu] .nav-inner::before,.nav-container[data-nav="2"][data-menu] .nav-inner>.nav-neon,
.nav-container[data-nav="2"][data-menu] .nav-inner:focus-within::before,.nav-container[data-nav="2"][data-menu] .nav-inner:focus-within>.nav-neon,
.nav-container[data-nav="3"][data-menu] .nav-inner::before,.nav-container[data-nav="3"][data-menu] .nav-inner>.nav-neon{opacity:0}
/* And the quiet hairline holds the bar's edge in its place, in each variant's own shape. */
.nav-container[data-nav="1"][data-menu] .nav-inner>.nav-quiet,
.nav-container[data-nav="2"][data-menu] .nav-inner>.nav-quiet,
.nav-container[data-nav="3"][data-menu] .nav-inner>.nav-quiet{opacity:1}
`;

// Same reduced-motion contract as the bar: nothing that was turning keeps turning.
const REDUCED = `
@media (prefers-reduced-motion:reduce){
  .nav-container[data-nav] .nav-inner,.nav-container[data-nav] .nav-inner::before,
  .nav-container[data-nav] .nav-inner>.nav-neon,.nav-container[data-nav] .nav-inner>.nav-neon>i{animation:none;transition:none}
  html[data-nav] .siso-nav-dropdown-inner::after,html[data-nav] .siso-nav-dropdown>.nav-panel-bloom>i{animation:none}
}
`;

export const NAV_VARIANTS_CSS = `${V1}${V2}${V3}${HANDOFF}${REDUCED}`;
