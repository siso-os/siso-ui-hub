// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/changelog-page/styles.ts)
// /changelog/ styles. The footer's neon rim and rail partition (UI standard §2) copied under the `scl-` prefix, the Agent
// Base page's type scale, and product colours only on each product's own tags (--tag / --tint set per element).

const NOTCH = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='12'%3E%3Cpath d='M0 .5H40l10 10h160l10-10h40' fill='none' stroke='%23000'/%3E%3C/svg%3E")`;
const EASE = 'cubic-bezier(.19,1,.22,1)';

export const CHANGELOG_CSS = `
.scl{background:#00030a;color:#fff;font-family:Inter,sans-serif;overflow-x:clip}
.scl *,.scl *::before,.scl *::after{box-sizing:border-box}
.scl a{text-decoration:none;color:inherit}
.scl button{font:inherit;color:inherit}
.scl :focus-visible{outline:2px solid #FFC24B;outline-offset:3px}
.scl-wrap{position:relative;max-width:1216px;margin:0 auto;padding:0 40px}
.scl-over{font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#FFC24B}

/* hero */
.scl-hero{position:relative;isolation:isolate;padding:140px 0 72px}
.scl-glow{position:absolute;left:50%;top:-120px;width:min(1100px,120vw);height:560px;transform:translateX(-50%);z-index:-1;pointer-events:none;filter:blur(40px);
  background:radial-gradient(45% 50% at 50% 30%,#FF6A1A2e,#FF2D5512 55%,transparent 80%)}
.scl-hero h1{margin:22px 0 0;font:600 clamp(48px,7.4vw,104px)/.96 'Inter Display',Inter,sans-serif;letter-spacing:-.05em;color:#fff}
.scl-hero h1 span{background:linear-gradient(100deg,#fff3d6 5%,#FFC24B 45%,#FF6A1A 90%);-webkit-background-clip:text;background-clip:text;color:transparent}
.scl-line{margin:24px 0 0;max-width:560px;font:400 18px/1.65 Inter,sans-serif;color:rgba(255,255,255,.62)}
.scl-stats{display:flex;flex-wrap:wrap;gap:10px 44px;margin:44px 0 0;padding:0;list-style:none}
.scl-stats li{display:flex;flex-direction:column;gap:8px;animation:scl-rise .9s ${EASE} both}
.scl-stats li:nth-child(2){animation-delay:.08s}.scl-stats li:nth-child(3){animation-delay:.16s}.scl-stats li:nth-child(4){animation-delay:.24s}
.scl-stats b{font:600 44px/1 'Inter Display',Inter,sans-serif;letter-spacing:-.04em;font-variant-numeric:tabular-nums;color:#fff;transition:color .3s,transform .4s ${EASE}}
.scl-stats li:hover b{color:#FFC24B;transform:translateY(-2px)}
.scl-stats span{font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.48)}
@keyframes scl-rise{from{opacity:0;filter:blur(8px);transform:translateY(12px)}to{opacity:1;filter:none;transform:none}}

/* the commit wall: one tile per commit, oldest day left */
.scl-wall{position:relative;display:flex;align-items:flex-end;justify-content:space-between;gap:28px;margin-top:56px;padding:28px 40px 22px;border-radius:22px;background:#0a0b0f;box-shadow:inset 0 0 0 1px #ffffff14;overflow-x:auto;scrollbar-width:thin}
.scl-wall-day{display:flex;flex-direction:column;gap:10px;flex:none}
.scl-wall::after{content:"";position:absolute;left:40px;right:40px;bottom:42px;height:1px;pointer-events:none;
  background:linear-gradient(90deg,transparent,#FF6A1A55 15%,#FFC24B88 50%,#FF6A1A55 85%,transparent)}
.scl-wall-tiles{display:grid;grid-template-rows:repeat(6,var(--t,22px));grid-auto-flow:column;grid-auto-columns:var(--t,22px);gap:5px;padding-bottom:12px}
.scl-tile{width:var(--t,22px);height:var(--t,22px);padding:0;border:0;border-radius:4px;cursor:pointer;background:var(--tag);opacity:.78;
  box-shadow:inset 0 1px 0 #ffffff40,0 0 0 0 var(--tag);transition:opacity .3s,transform .35s ${EASE},box-shadow .35s,filter .3s}
.scl-tile:hover,.scl-tile:focus-visible,.scl-tile.is-lit{opacity:1;transform:translateY(-2px) scale(1.25);box-shadow:inset 0 1px 0 #ffffff66,0 0 14px 1px var(--tag);outline:none;z-index:1}
.scl-tile.is-dim{opacity:.14;filter:saturate(.3)}
.scl-wall-label{display:flex;gap:7px;align-items:baseline;font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.45);white-space:nowrap}
.scl-wall-label b{color:#fff;font-weight:500}
.scl-wall-hint{display:flex;gap:10px;align-items:baseline;min-height:22px;margin:14px 4px 0;font:400 14px/1.5 Inter,sans-serif;color:rgba(255,255,255,.55);
  overflow:hidden;white-space:nowrap;text-overflow:ellipsis;transition:color .3s}
.scl-wall-hint code{flex:none;font:500 11px/1 'Geist Mono',ui-monospace,monospace;color:#FFC24B}

/* rail partition (Footer/Lights.tsx Rail) */
.scl-rail{position:relative;height:12px;max-width:1136px;margin:0 40px}
@media (min-width:1217px){.scl-rail{margin:0 auto}}
.scl-rail>i{position:absolute;inset:0;filter:drop-shadow(0 0 5px #FF6A1A99)}
.scl-rail::after{content:"";position:absolute;left:50%;top:0;width:min(640px,90%);height:110px;transform:translateX(-50%);pointer-events:none;
  background:radial-gradient(50% 55% at 50% 0,#FF6A1A1c,#FF2D550a 55%,transparent 80%)}
.scl-rail>i>span{position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,#fff7e8,transparent) -30% 0/16% 100% no-repeat,
    linear-gradient(90deg,transparent,#FF6A1A40 16%,#FFC24B99 38%,#fff3d6 50%,#FF2D5599 62%,#FF6A1A40 84%,transparent);
  -webkit-mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  animation:scl-spark 7s cubic-bezier(.45,0,.55,1) infinite}
@keyframes scl-spark{to{background-position:130% 0,0 0}}

/* neon rim (Footer/index.tsx .sf-neon) */
@property --scl-ang{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes scl-ang{to{--scl-ang:360deg}}
.scl-neon{position:relative;transition:background .3s,box-shadow .3s,transform .4s ${EASE}}
.scl-neon::before{content:"";position:absolute;inset:0;padding:1.5px;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;z-index:2;
  background:conic-gradient(from var(--scl-ang),#FF6A1A,#FFC24B,#fff3d6 18%,#FF2D55 30%,#FF6A1A 46%,#FF6A1A 56%,#FF2D55 72%,#FF6A1A);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);
  animation:scl-ang 5s linear infinite;animation-play-state:paused}
.scl-neon:hover,.scl-neon:focus-visible{box-shadow:0 0 30px -10px #FF6A1A99;transform:translateY(-3px)}
.scl-neon:hover::before,.scl-neon:focus-visible::before{opacity:1;animation-play-state:running}

/* body */
.scl-body{padding:72px 0 140px}
.scl-filter{display:flex;flex-wrap:wrap;gap:8px}
.scl-chip{display:inline-flex;align-items:center;gap:9px;height:44px;padding:0 14px 0 9px;border:0;border-radius:13px;cursor:pointer;background:#0a0b0f;
  box-shadow:inset 0 0 0 1px #ffffff14;color:rgba(255,255,255,.72);font:500 14px/1 Inter,sans-serif}
.scl-chip b{font:500 11px/1 'Geist Mono',ui-monospace,monospace;color:rgba(255,255,255,.45);padding-left:2px}
.scl-chip:hover{color:#fff}
.scl-chip[aria-pressed=true]{color:#fff;background:color-mix(in srgb,var(--tag) 16%,#0a0b0f);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--tag) 60%,transparent),0 0 22px -8px var(--tag)}
.scl-chip[aria-pressed=true] b{color:var(--tint)}
.scl-showing{margin:22px 0 0;font:500 11px/1.5 'Geist Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.45)}
.scl-showing b{color:#fff;font-weight:500}

.scl-days{list-style:none;margin:40px 0 0;padding:0;display:flex;flex-direction:column}
.scl-day{display:grid;grid-template-columns:200px 1fr;gap:40px;padding:36px 0;border-top:1px solid #ffffff12;animation:scl-rise .6s ${EASE} both}
.scl-day-head{position:sticky;top:112px;align-self:start;display:flex;flex-direction:column;align-items:flex-start;gap:12px}
.scl-day-head time{display:flex;flex-direction:column;gap:8px}
.scl-day-head time b{font:600 34px/1 'Inter Display',Inter,sans-serif;letter-spacing:-.035em;color:#fff}
.scl-day-head time span,.scl-day-n{font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.48)}
.scl-day-n{color:#FFC24B}
.scl-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}
.scl-entry{display:flex;flex-direction:column;align-items:stretch;text-align:left;gap:12px;padding:18px 20px 16px 22px;border-radius:16px;background:#0a0b0f;box-shadow:inset 0 0 0 1px #ffffff12;outline:none;overflow:hidden}
.scl-entry::after{content:"";position:absolute;left:0;top:16px;bottom:16px;width:2px;border-radius:2px;background:var(--tag);opacity:.7;box-shadow:0 0 10px var(--tag);transition:opacity .3s,top .4s ${EASE},bottom .4s ${EASE}}
.scl-entry:hover::after,.scl-entry.is-lit::after,.scl-entry:focus-visible::after{opacity:1;top:8px;bottom:8px}
.scl-entry.is-lit{box-shadow:inset 0 0 0 1px #ffffff26}
.scl-entry.is-flash{animation:scl-flash 1.4s ${EASE}}
@keyframes scl-flash{0%,30%{box-shadow:inset 0 0 0 1px #FFC24B,0 0 40px -8px #FF6A1A}100%{box-shadow:inset 0 0 0 1px #ffffff12}}
.scl-tags{display:flex;flex-wrap:wrap;gap:6px}
.scl-tag,.scl-more{display:inline-flex;align-items:center;gap:7px;height:24px;padding:0 10px;border-radius:99px;
  font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase}
.scl-tag{color:var(--tint);background:color-mix(in srgb,var(--tag) 14%,transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--tag) 45%,transparent)}
.scl-tag i{width:6px;height:6px;border-radius:50%;background:var(--tag);box-shadow:0 0 8px var(--tag)}
.scl-more{color:rgba(255,255,255,.55);box-shadow:inset 0 0 0 1px #ffffff1f;cursor:help}
.scl-subject{margin:0;font:400 16px/1.6 Inter,sans-serif;color:rgba(255,255,255,.86);text-wrap:pretty;overflow-wrap:anywhere}
.scl-entry:hover .scl-subject{color:#fff}
.scl-meta{display:flex;flex-wrap:wrap;gap:16px;font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.08em;color:rgba(255,255,255,.4)}
.scl-meta code{font:inherit;color:rgba(255,255,255,.62)}
.scl-end{display:flex;flex-direction:column;align-items:flex-start;gap:20px;margin-top:48px;padding-top:40px;border-top:1px solid #ffffff12}
.scl-src{margin:0;max-width:760px;font:500 10.5px/1.7 'Geist Mono',ui-monospace,monospace;letter-spacing:.04em;color:rgba(255,255,255,.4)}

@media (max-width:860px){
  .scl-wrap{padding:0 16px}.scl-rail{margin:0 16px}
  .scl-hero{padding:104px 0 56px}.scl-line{font-size:16px}
  .scl-stats{gap:24px 32px}.scl-stats b{font-size:34px}
  .scl-wall{--t:13px;margin-top:40px;padding:18px 16px 14px;gap:16px;justify-content:flex-start}
  .scl-wall::after{left:16px;right:16px;bottom:33px}
  .scl-wall-tiles{gap:3px;padding-bottom:10px}
  .scl-wall-hint{white-space:normal;min-height:44px;font-size:13.5px}
  .scl-body{padding:56px 0 96px}
  .scl-day{grid-template-columns:1fr;gap:18px;padding:28px 0}
  .scl-day-head{position:static;flex-direction:row;align-items:baseline;justify-content:space-between}
  .scl-day-head time{flex-direction:row;align-items:baseline;gap:12px}
  .scl-day-head time b{font-size:26px}
  .scl-entry{padding:16px 16px 14px 18px}.scl-subject{font-size:15px}
}
@media (prefers-reduced-motion:reduce){.scl-neon::before,.scl-rail>i>span{animation:none}.scl *{animation:none!important;transition-duration:0s!important}}
`;
