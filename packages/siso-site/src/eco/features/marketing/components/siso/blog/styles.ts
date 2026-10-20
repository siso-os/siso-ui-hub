// uihub: siso:site
import { HEADER_CSS } from './BlogHeader';

// uihub: card/blog — the blog's scoped system, built to the footer's bar (SISO-UI-STANDARD.md): one warm palette on black,
// product colours only on their own topic, every pointable thing reacts, loops pause off screen, reduced motion respected.
export const blogStyles = `
@property --sb-ang{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes sb-rim{to{--sb-ang:360deg}}
@keyframes sb-enter{from{opacity:0;filter:blur(6px);transform:translateY(12px)}to{opacity:1;filter:blur(0);transform:translateY(0)}}
@keyframes sb-pulse{50%{opacity:.45}}
${HEADER_CSS}
.siso-blog{--ember:#ff6a1a;--topic:#ff6a1a;--ease:cubic-bezier(.19,1,.22,1);background:#00030a;color:#fff;font:400 16px/1.65 Inter,sans-serif;isolation:isolate;min-height:100vh}
.siso-blog *{box-sizing:border-box}
.siso-blog h1,.siso-blog h2,.siso-blog h3,.siso-blog p,.siso-blog figure{margin:0}
.siso-blog h1,.siso-blog h2,.siso-blog h3{font-family:'Inter Display',Inter,sans-serif;font-weight:600;color:#fff;letter-spacing:-.035em}
.siso-blog a{color:inherit;text-decoration:none}
:where(.siso-blog) a{justify-content:flex-start;align-items:normal;text-align:left}
.siso-blog button,.siso-blog input{font:inherit}
.siso-blog button{cursor:pointer}
.siso-blog a:focus-visible,.siso-blog button:focus-visible,.siso-blog input:focus-visible{outline:2px solid #ffc24b;outline-offset:4px}
.sb-shell{max-width:1360px;padding:0 40px;margin:0 auto}
.sb-eyebrow{font:500 10.5px/1.5 'Geist Mono',ui-monospace,monospace!important;letter-spacing:.16em!important;text-transform:uppercase;color:#ffffff8c}
.sb-orange{color:#ffb547}
.sb-status-dot,.sb-dot{display:inline-block;width:5px;height:5px;border-radius:50%;background:#ffb547;box-shadow:0 0 12px #ff6a1a;flex-shrink:0}
.sb-dot{background:var(--topic);box-shadow:0 0 10px var(--topic);margin-right:9px;vertical-align:2px}
.sb-status-dot{animation:sb-pulse 2.4s ease-in-out infinite}

/* ── Index hero ─────────────────────────────────────────────── */
.sb-index-hero{position:relative;display:flex;align-items:flex-end;justify-content:space-between;gap:56px;padding:84px 0 64px;margin-bottom:44px}
.sb-index-hero::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:linear-gradient(90deg,transparent,#ff6a1a55 22%,#ffc24b99 50%,#ff2d5544 78%,transparent);opacity:.7}
.sb-index-hero>.sb-hero-ambient{position:absolute;z-index:-1;inset:-40px -40px -10px;background:radial-gradient(42% 60% at 78% 40%,#ff6a1a14,transparent 70%),radial-gradient(30% 50% at 12% 10%,#ffc24b0a,transparent 70%);filter:blur(30px);pointer-events:none}
.sb-index-hero .sb-eyebrow{display:flex;align-items:center;gap:10px}
.sb-index-hero h1{font-size:clamp(42px,4.4vw,66px);line-height:1.03;letter-spacing:-.045em;margin:22px 0 22px;max-width:820px;animation:sb-enter .9s var(--ease) backwards}
.sb-index-hero h1>span{color:#fff3d6;background:linear-gradient(92deg,#fff3d6 10%,#ffc24b 55%,#ff8a3d);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.sb-index-hero p{font-size:16px;line-height:1.65;color:#ffffff99;max-width:46ch;animation:sb-enter .9s .08s var(--ease) backwards}
.sb-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px;flex:0 0 360px;padding-bottom:4px}
.sb-stats .stc-label{font-size:9.5px;letter-spacing:.14em;line-height:1.6;min-height:32px}
.sb-stats .stc-n{font-size:42px;letter-spacing:-.03em;animation:sb-enter .8s var(--ease) backwards}
.sb-stats .sb-roll:nth-child(2) .stc-n{animation-delay:.1s}.sb-stats .sb-roll:nth-child(3) .stc-n{animation-delay:.2s}
.sb-index-hero:not([data-live]) .stc *{animation-play-state:paused!important}

/* ── Index layout, rail, search, topics ─────────────────────── */
.sb-index-layout{display:grid;grid-template-columns:228px minmax(0,1fr);gap:52px;align-items:start;padding-bottom:110px}
.sb-index-rail{position:sticky;top:112px;min-width:0}
.sb-search{display:flex;align-items:center;gap:9px;min-height:46px;border:1px solid #ffffff1f;background:#0a0b0f;border-radius:12px;padding:0 12px;color:#ffffff70;transition:border-color .3s,box-shadow .3s,background .3s}
.sb-search:hover{border-color:#ffffff33;background:#0d0e13}
.sb-search:focus-within{border-color:#ff6a1a88;box-shadow:0 0 0 3px #ff6a1a14,0 0 28px -10px #ff6a1a77;color:#ffb547}
.sb-search input{width:100%;min-width:0;font-size:13.5px;background:transparent;border:0;outline:0;color:white;padding:12px 0}
.sb-search input::placeholder{color:#ffffff66}
.sb-search input:focus-visible{outline:0}
.sb-search input::-webkit-search-cancel-button{display:none}
.sb-search kbd{font:11px 'Geist Mono',ui-monospace,monospace;color:#ffffff8c;border:1px solid #ffffff24;border-bottom-width:2px;border-radius:5px;padding:1px 6px}
.sb-search button{background:none;border:0;color:#fff;display:flex;padding:5px;border-radius:6px}.sb-search button:hover{background:#ffffff12}
.sb-topic-heading{margin:30px 0 12px}
.sb-topics{display:flex;flex-direction:column;gap:6px}
.sb-topic{position:relative;display:flex;align-items:center;gap:11px;border:1px solid transparent;border-radius:12px;padding:7px 12px 7px 8px;color:#ffffffa6!important;background:transparent;font-size:13.5px!important;line-height:1.4;min-height:46px;text-align:left;transition:color .3s,background .35s var(--ease),border-color .35s,box-shadow .35s,transform .35s var(--ease)}
.sb-topic .pg{flex-shrink:0;transition:transform .45s var(--ease)}
.sb-topic b{margin-left:auto;font:11px 'Geist Mono',ui-monospace,monospace;color:#ffffff59;font-weight:400;transition:color .3s}
.sb-topic:hover,.sb-topic.is-hover,.sb-topic:focus-visible,.sb-topic[aria-pressed=true]{color:#fff!important;background:linear-gradient(90deg,color-mix(in srgb,var(--topic) 26%,#0a0b0f),color-mix(in srgb,var(--topic) 8%,#0a0b0f));border-color:color-mix(in srgb,var(--topic) 60%,transparent);box-shadow:0 0 28px -12px var(--topic),inset 0 1px 0 #ffffff12}
.sb-topic:hover{transform:translateX(2px)}
.sb-topic:hover .pg,.sb-topic.is-hover .pg,.sb-topic:focus-visible .pg{transform:scale(1.1) rotate(-7deg)}
.sb-topic:hover b,.sb-topic.is-hover b,.sb-topic[aria-pressed=true] b{color:color-mix(in srgb,var(--topic) 45%,white)}
.sb-recents{margin-top:34px;padding-top:24px;border-top:1px solid #ffffff14}
.sb-recents h2{margin-bottom:8px}
.sb-recents a{display:flex;justify-content:flex-start;align-items:flex-start;text-align:left;gap:10px;padding:11px 8px;margin:0 -8px;border-radius:9px;font-size:12.5px;line-height:1.55;color:#ffffff99;transition:color .25s,background .25s}
.sb-recents a>span:first-child{font:10px/1.9 'Geist Mono',ui-monospace,monospace;color:#ffb54799}
.sb-recents a svg{flex-shrink:0;margin-top:3px;opacity:0;transition:opacity .25s,transform .35s var(--ease)}
.sb-recents a:hover,.sb-recents a:focus-visible{color:#fff;background:#ffffff07}.sb-recents a:hover svg,.sb-recents a:focus-visible svg{opacity:1;transform:translate(2px,-2px);color:#ffb547}
.sb-lab-link{display:flex;align-items:center;justify-content:space-between;font-size:11.5px;color:#ffffff73!important;margin-top:22px;border-top:1px solid #ffffff14;padding-top:18px;transition:color .25s}.sb-lab-link:hover,.sb-lab-link:focus-visible{color:#ffc24b!important}
.sb-lab-link svg{transition:transform .35s var(--ease)}.sb-lab-link:hover svg{transform:translate(2px,-2px)}
.sb-results{min-width:0}
.sb-results-heading{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}
.sb-results-heading>span{font:11px 'Geist Mono',ui-monospace,monospace;color:#ffffff70}

/* ── Cards ──────────────────────────────────────────────────── */
.sb-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:26px}
.sb-card{display:flex;flex-direction:column;align-items:stretch;min-width:0;height:100%;border:1px solid #ffffff14;background:#0a0b0f;border-radius:16px;position:relative;isolation:isolate;transition:transform .5s var(--ease),box-shadow .5s var(--ease),border-color .4s,background .4s;animation:sb-enter .7s var(--ease) backwards}
.sb-neon::before{content:"";position:absolute;z-index:3;inset:-1px;padding:1.5px;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .35s;background:conic-gradient(from var(--sb-ang),var(--topic),#ffc24b,#fff3d6 18%,var(--topic) 30%,#ff6a1a 46%,var(--topic) 56%,#ff2d55 72%,var(--topic));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);animation:sb-rim 5s linear infinite;animation-play-state:paused}
.sb-card:hover,.sb-card:focus-visible,.sb-card.is-hover{transform:translateY(-3px);background:#0c0d12;border-color:transparent;box-shadow:0 22px 60px -30px var(--topic),0 0 44px -18px color-mix(in srgb,var(--topic) 70%,transparent)}
.sb-neon:hover::before,.sb-neon:focus-visible::before,.sb-neon.is-hover::before{opacity:1;animation-play-state:running}
.sb-neon:not([data-live])::before{animation-play-state:paused!important}
.sb-card:focus-visible{outline-offset:6px}
.sb-card-art{position:relative;width:100%;flex-shrink:0;overflow:hidden;border-radius:15px 15px 0 0}
.sb-card-art .sb-header{border-radius:inherit}
.sb-card:hover .sb-header-bg,.sb-card:focus-visible .sb-header-bg,.sb-card.is-hover .sb-header-bg{transform:scale(1.06)}
.sb-card:hover .sb-header-lines,.sb-card:focus-visible .sb-header-lines,.sb-card.is-hover .sb-header-lines{transform:scale(1.08) translateX(-1.5%);opacity:1}
.sb-card:hover .sb-header-glyph,.sb-card:focus-visible .sb-header-glyph,.sb-card.is-hover .sb-header-glyph{transform:rotate(-2deg) translateY(-4px) scale(1.04)}
.sb-card:hover .sb-header-bottom,.sb-card:focus-visible .sb-header-bottom,.sb-card.is-hover .sb-header-bottom{opacity:0}
.sb-card-strip{position:absolute;z-index:2;inset:auto 0 0;display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;background:linear-gradient(180deg,#07090fcc,#07090ff2);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-top:1px solid color-mix(in srgb,var(--topic) 45%,transparent);padding:12px 22px;font:10.5px/1.5 'Geist Mono',ui-monospace,monospace;letter-spacing:.06em;color:#ffffffd9;transform:translateY(101%);transition:transform .5s var(--ease)}
.sb-card-strip>span:last-child{display:flex;gap:7px;align-items:center;color:#ffc24b}
.sb-card:hover .sb-card-strip,.sb-card:focus-visible .sb-card-strip,.sb-card.is-hover .sb-card-strip{transform:translateY(0)}
.sb-card-copy{width:100%;padding:24px 26px 24px;display:flex;flex-direction:column;flex:1}
.sb-card-kicker{display:flex;align-items:center;justify-content:space-between;gap:12px;font:10.5px/1.5 'Geist Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#ffffff73;margin-bottom:14px}
.sb-card-kicker>span{color:color-mix(in srgb,var(--topic) 40%,white)}
.sb-card h2{font-size:24px;line-height:1.18;margin-bottom:12px;text-wrap:balance;transition:color .3s}
.sb-card-copy>p{font-size:14.5px;line-height:1.65;color:#ffffff99;margin-bottom:24px}
.sb-card-footer{display:flex;align-items:center;justify-content:space-between;margin-top:auto;color:#ffffff73;font-size:11.5px}
.sb-card-footer>span>span{padding:0 7px;color:#ffffff30}
.sb-card-arrow{display:grid;place-items:center;width:34px;height:34px;border:1px solid #ffffff1a;border-radius:50%;color:#ffffff9e;transition:background .35s,color .3s,transform .45s var(--ease),border-color .3s,box-shadow .35s}
.sb-card:hover .sb-card-arrow,.sb-card:focus-visible .sb-card-arrow,.sb-card.is-hover .sb-card-arrow{background:var(--topic);border-color:transparent;color:#fff;transform:rotate(-8deg) scale(1.08);box-shadow:0 0 20px -4px var(--topic)}
.sb-featured{margin-bottom:28px;height:auto}
.sb-featured .sb-header{aspect-ratio:2.15/1}
.sb-featured .sb-header-title{font-size:clamp(22px,5.6cqw,60px)}
.sb-featured .sb-card-copy{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:48px;padding:30px 32px 30px}
.sb-featured h2{font-size:34px;line-height:1.1;letter-spacing:-.04em}
.sb-featured .sb-feat-main>p{max-width:56ch;margin:0;font-size:15.5px;line-height:1.65;color:#ffffff99}
.sb-feat-side{display:flex;flex-direction:column;padding-left:32px;border-left:1px solid #ffffff12}
.sb-card-inside{list-style:none;margin:10px 0 22px;padding:0;display:grid;gap:0}
.sb-card-inside li{display:flex;gap:12px;align-items:baseline;padding:7px 0;font-size:13.5px;color:#ffffff99;border-bottom:1px solid #ffffff0a;transition:color .35s,transform .45s var(--ease)}
.sb-card-inside li>span{font:10px 'Geist Mono',ui-monospace,monospace;color:#ffffff4d;transition:color .35s}
.sb-card:hover .sb-card-inside li,.sb-card.is-hover .sb-card-inside li,.sb-card:focus-visible .sb-card-inside li{color:#ffffffd9;transform:translateX(4px)}
.sb-card:hover .sb-card-inside li>span,.sb-card.is-hover .sb-card-inside li>span,.sb-card:focus-visible .sb-card-inside li>span{color:color-mix(in srgb,var(--topic) 45%,#ffc24b)}
.sb-card-cta{display:inline-flex;align-items:center;gap:8px;padding:9px 14px;border-radius:10px;border:1px solid color-mix(in srgb,var(--topic) 45%,transparent);background:color-mix(in srgb,var(--topic) 12%,transparent);color:#fff;font-size:12.5px;transition:background .35s,box-shadow .35s,gap .35s var(--ease)}
.sb-card:hover .sb-card-cta,.sb-card.is-hover .sb-card-cta,.sb-card:focus-visible .sb-card-cta{background:var(--topic);box-shadow:0 0 26px -6px var(--topic);gap:12px}
.sb-endnote{display:flex;align-items:center;justify-content:center;gap:10px;padding:40px 0 0;font-size:12px;color:#ffffff66;text-align:center}
.sb-empty{display:flex;align-items:center;flex-direction:column;justify-content:center;gap:16px;min-height:340px;border:1px dashed #ffffff20;border-radius:16px;color:#ffffff88;padding:30px;text-align:center}
.sb-empty h2{font-size:24px}
.sb-button{display:inline-flex;align-items:center;justify-content:center;gap:9px;border:1px solid #ffffff26;border-radius:10px;background:#ffffff05;color:#ffffffbf!important;padding:10px 14px;font-size:12.5px!important;line-height:1.5;transition:color .25s,background .3s,border-color .3s,box-shadow .3s,transform .35s var(--ease);white-space:nowrap}
.sb-button:hover,.sb-button:focus-visible{background:#ff6a1a18;border-color:#ff6a1a80;color:#fff!important;box-shadow:0 0 24px -10px #ff6a1a;transform:translateY(-1px)}
.sb-button svg{transition:transform .35s var(--ease)}.sb-button:hover svg{transform:scale(1.1) rotate(-6deg)}

/* ── Article hero ───────────────────────────────────────────── */
.sb-breadcrumb{display:flex;gap:12px;align-items:center;padding:34px 0;color:#ffffff70;font:11px 'Geist Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase}.sb-breadcrumb a{transition:color .25s}.sb-breadcrumb a:hover{color:#ffb547}.sb-breadcrumb span{color:#ffffff33}
.sb-article-hero{max-width:1080px;margin:8px auto 0}
.sb-article-heading{max-width:840px;margin:0 auto 40px;text-align:center}
.sb-pill{display:inline-flex;align-items:center;gap:8px;border:1px solid color-mix(in srgb,var(--topic) 50%,transparent);background:color-mix(in srgb,var(--topic) 14%,#0a0b0f);border-radius:999px;padding:4px 12px 4px 5px;font-size:12px;color:#fff!important;transition:background .35s,box-shadow .35s,transform .35s var(--ease)}
.sb-pill .pg{transition:transform .45s var(--ease)}
.sb-pill:hover,.sb-pill.is-hover,.sb-pill:focus-visible{background:color-mix(in srgb,var(--topic) 34%,#0a0b0f);box-shadow:0 0 26px -8px var(--topic);transform:translateY(-1px)}
.sb-pill:hover .pg{transform:scale(1.1) rotate(-7deg)}
.sb-article-heading h1{font-size:clamp(38px,4.6vw,64px);line-height:1.06;letter-spacing:-.045em;margin:22px 0 20px;text-wrap:balance;animation:sb-enter .8s var(--ease) backwards}
.sb-article-heading>p{color:#ffffffa6;font-size:18px;line-height:1.65;max-width:62ch;margin:auto;animation:sb-enter .8s .08s var(--ease) backwards}
.sb-article-meta{display:flex;align-items:center;justify-content:center;gap:22px;margin-top:26px;flex-wrap:wrap}
.sb-meta{display:flex;align-items:center;flex-wrap:wrap;gap:10px;font:11px 'Geist Mono',ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase;color:#ffffff80}.sb-meta i{display:block;width:3px;height:3px;background:#ffb54788;border-radius:50%}
.sb-article-hero>.sb-header{border:1px solid #ffffff1f;border-radius:20px;box-shadow:0 40px 120px -60px var(--topic),0 0 0 1px #00000060}
.sb-figures{max-width:1080px;margin:28px auto 0;display:flex;flex-direction:column;gap:14px}
.sb-figures-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.sb-figure{position:relative;display:flex;flex-direction:column;gap:8px;padding:18px 18px 16px;border:1px solid #ffffff14;border-radius:14px;background:linear-gradient(180deg,#0c0d12,#08090d);overflow:hidden;animation:sb-enter .8s var(--ease) backwards;transition:border-color .35s,transform .45s var(--ease),box-shadow .45s}
.sb-figure::after{content:"";position:absolute;inset:auto 0 0;height:60%;background:radial-gradient(60% 100% at 50% 100%,#ff6a1a1f,transparent);opacity:0;transition:opacity .45s}
.sb-figure-n{font:600 34px/1 'Inter Display',Inter,sans-serif;letter-spacing:-.03em;color:#fff;font-variant-numeric:tabular-nums}
.sb-figure-label{font:500 10px/1.5 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#ffffff8c}
.sb-figure-marks{display:flex;align-items:flex-end;justify-content:space-between;height:22px;margin-top:6px}
.sb-figure-marks i{width:2px;border-radius:2px;background:#ffffff2e;transform-origin:bottom;transition:transform .5s var(--ease),background .3s}
.sb-figure-marks i:last-child{background:#ff6a1a;box-shadow:0 0 8px #ff6a1a;height:90%!important;animation:sb-pulse 1.8s ease-in-out infinite}
.sb-figure-go{position:absolute;right:14px;top:14px;display:grid;place-items:center;width:24px;height:24px;border-radius:50%;border:1px solid #ff6a1a66;font-size:12px;color:#ffc24b;opacity:0;transform:translateY(-4px);transition:opacity .3s,transform .4s var(--ease)}
.sb-figure:hover,.sb-figure.is-hover,.sb-figure:focus-visible{border-color:#ff6a1a66;transform:translateY(-2px);box-shadow:0 0 36px -16px #ff6a1a}
.sb-figure:hover::after,.sb-figure.is-hover::after,.sb-figure:focus-visible::after{opacity:1}
.sb-figure:hover .sb-figure-marks i:not(:last-child),.sb-figure.is-hover .sb-figure-marks i:not(:last-child){background:#ffffff59;transform:scaleY(1.15)}
.sb-figure:hover .sb-figure-go,.sb-figure.is-hover .sb-figure-go,.sb-figure:focus-visible .sb-figure-go{opacity:1;transform:none}
.sb-figures:not([data-live]) .sb-figure-marks i:last-child{animation-play-state:paused}

/* ── Article layout, rail, prose ────────────────────────────── */
.sb-article-layout{display:grid;grid-template-columns:236px minmax(0,720px);gap:76px;justify-content:center;align-items:start;margin-top:72px}
.sb-article-rail{position:sticky;top:112px;display:flex;flex-direction:column;gap:22px}
.sb-back{display:inline-flex;justify-content:flex-start;gap:10px;align-items:center;color:#ffffff99!important;font-size:12.5px;transition:color .25s}.sb-back svg{transition:transform .35s var(--ease)}.sb-back:hover{color:#ffb547!important}.sb-back:hover svg{transform:translateX(-3px)}
.sb-rail-card{display:flex;flex-direction:column;gap:14px;padding:16px;border:1px solid #ffffff14;border-radius:14px;background:linear-gradient(160deg,color-mix(in srgb,var(--topic) 12%,#0a0b0f),#0a0b0f 60%)}
.sb-rail-topic{display:flex;align-items:center;justify-content:flex-start;gap:11px;font-size:13.5px;color:#fff;transition:color .25s}
.sb-rail-topic .pg{transition:transform .45s var(--ease)}
.sb-rail-topic small{display:block;font:10px 'Geist Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:color-mix(in srgb,var(--topic) 45%,white);margin-top:2px}
.sb-rail-topic:hover .pg,.sb-rail-topic:focus-visible .pg{transform:scale(1.1) rotate(-7deg)}
.sb-rail-facts{display:grid;grid-template-columns:repeat(3,auto);justify-content:space-between;gap:8px;margin:0;padding-top:12px;border-top:1px solid #ffffff12}
.sb-rail-facts div{display:flex;flex-direction:column;gap:3px}
.sb-rail-facts dt{font:9.5px 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#ffffff66}
.sb-rail-facts dd{margin:0;font:600 15px/1.2 'Inter Display',Inter,sans-serif;color:#fff;font-variant-numeric:tabular-nums}
.sb-toc{position:relative;list-style:none;padding:0;margin:12px 0 0}
.sb-toc::before{content:"";position:absolute;left:0;top:6px;bottom:6px;width:1px;background:#ffffff17}
.sb-toc-fill{position:absolute;left:0;top:6px;width:1px;height:calc((100% - 12px) * var(--p, 0));background:linear-gradient(#ffc24b,#ff6a1a);box-shadow:0 0 10px #ff6a1a;transition:height .2s linear}
.sb-toc-fill::after{content:"";position:absolute;left:-3px;bottom:-3px;width:7px;height:7px;border-radius:50%;background:#fff3d6;box-shadow:0 0 0 3px #ff6a1a33,0 0 12px #ff6a1a}
.sb-toc a{position:relative;display:flex;align-items:flex-start;gap:12px;padding:9px 10px 9px 18px;font-size:12.5px;line-height:1.5;color:#ffffff80;border-radius:0 8px 8px 0;transition:color .25s,background .3s}
.sb-toc a>span{font:10px/1.9 'Geist Mono',ui-monospace,monospace;color:#ffffff4d;transition:color .25s}
.sb-toc a:hover,.sb-toc a:focus-visible{color:#fff;background:#ffffff07}
.sb-toc a[aria-current]{color:#fff;background:linear-gradient(90deg,#ff6a1a1c,transparent 85%)}
.sb-toc a[aria-current]>span,.sb-toc a:hover>span{color:#ffb547}
.sb-rail-progress{display:flex;justify-content:space-between;align-items:center;font:10px 'Geist Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#ffffff66}
.sb-rail-progress b{font-weight:500;color:#ffc24b;font-variant-numeric:tabular-nums}
.sb-rail-actions{display:flex;gap:8px}
.sb-prose{min-width:0;max-width:68ch;font-size:17px;line-height:1.7;color:#ffffffb8}
.sb-prose section+section{margin-top:52px}
.sb-prose h2{font-size:30px;line-height:1.18;margin:0 0 24px;padding-bottom:18px;position:relative;scroll-margin-top:124px;color:#fff}
.sb-prose h2::after{content:"";position:absolute;left:0;bottom:0;width:40px;height:2px;border-radius:2px;background:linear-gradient(90deg,#ff6a1a,#ffc24b);box-shadow:0 0 12px #ff6a1a66;transition:width .6s var(--ease)}
.sb-prose section:hover h2::after,.sb-prose h2:target::after{width:72px}
.sb-prose p+p{margin-top:22px}
.sb-prose p{font-size:17px;line-height:1.7;color:#ffffffb8}
.sb-prose>section:first-child>p:first-of-type{font-size:19.5px;line-height:1.62;color:#ffffffe0;letter-spacing:-.005em}
.sb-prose .sb-anchor{display:inline-block;font:400 20px Inter,sans-serif;color:#ffb547;opacity:0;padding-left:12px;transform:translateX(-4px);transition:opacity .25s,transform .35s var(--ease)}
.sb-prose h2:hover .sb-anchor,.sb-prose .sb-anchor:focus-visible{opacity:1;transform:none}
.sb-prose a:not(.sb-button):not(.sb-anchor){color:#ffca94;background:linear-gradient(#ff6a1a,#ff6a1a) left bottom/0 1px no-repeat;transition:background-size .35s var(--ease),color .25s}.sb-prose a:not(.sb-button):not(.sb-anchor):hover{background-size:100% 1px;color:#fff}
.sb-prose ul,.sb-prose ol{list-style:none;padding:0;margin:22px 0}
.sb-prose li{position:relative;padding-left:26px;margin:12px 0}
.sb-prose ul>li::before{content:"";position:absolute;left:4px;top:.68em;width:7px;height:7px;border-radius:2px;transform:rotate(45deg);background:linear-gradient(135deg,#ffc24b,#ff6a1a);box-shadow:0 0 10px #ff6a1a99}
.sb-prose ol{counter-reset:sb}.sb-prose ol>li{counter-increment:sb}.sb-prose ol>li::before{content:counter(sb,decimal-leading-zero);position:absolute;left:0;top:.3em;font:11px 'Geist Mono',ui-monospace,monospace;color:#ff8c4a}
.sb-prose blockquote{margin:32px 0;padding:20px 24px;border-left:2px solid #ff6a1a;background:#ff6a1a08;color:#fff3d6;border-radius:0 12px 12px 0}
.sb-prose code{font:13.5px/1.7 'Geist Mono',monospace;background:#ffffff0a;border:1px solid #ffffff17;border-radius:5px;padding:2px 6px;color:#fff3d6}
.sb-prose pre{overflow:auto;padding:22px;border-radius:12px;background:#0a0b0f;border:1px solid #ffffff14}.sb-prose pre code{padding:0;border:0;background:none}
.sb-prose table{display:block;overflow:auto;border-collapse:collapse;width:100%;margin:28px 0;font-size:14px}.sb-prose th,.sb-prose td{padding:12px 16px;border:1px solid #ffffff1f;text-align:left}.sb-prose th{color:#fff;background:#ffffff05;font-weight:500}
.sb-prose figure{margin:30px 0}.sb-prose figure img{border-radius:12px;max-width:100%}.sb-prose figcaption{font:11px 'Geist Mono',ui-monospace,monospace;letter-spacing:.06em;color:#ffffff80;padding:10px 0}
.sb-sources{position:relative;padding:30px 30px 26px;margin-top:56px;border:1px solid #ff6a1a2e;border-radius:16px;background:radial-gradient(80% 120% at 0 0,#ff6a1a12,transparent 60%),#0a0b0f;overflow:hidden}
.sb-sources::before{content:"";position:absolute;left:30px;right:30px;top:0;height:1px;background:linear-gradient(90deg,transparent,#ffc24b,transparent);opacity:.6}
.sb-sources h2{margin-top:10px;font-size:24px}.sb-sources li{font-size:14.5px;line-height:1.6;color:#ffffffb3}.sb-sources ul{margin-bottom:0}
.sb-sources .sb-button{margin-top:22px}
.sb-article-end{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:36px;padding-top:24px;border-top:1px solid #ffffff14;font:10.5px 'Geist Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#ffffff66}
.sb-toast{position:fixed;bottom:28px;left:50%;z-index:210;display:flex;align-items:center;gap:10px;transform:translate(-50%,12px);opacity:0;pointer-events:none;padding:13px 20px;width:max-content;max-width:calc(100vw - 40px);border:1px solid #ff6a1a77;border-radius:12px;background:#13100efa;color:#fff3d6;font-size:13px;box-shadow:0 12px 40px #0009,0 0 30px -10px #ff6a1a;transition:opacity .25s,transform .35s var(--ease)}.sb-toast:not(.is-visible){visibility:hidden}.sb-toast.is-visible{opacity:1;transform:translate(-50%,0)}

/* ── More from SISO Labs ───────────────────────────────────── */
.sb-related{padding:0 0 110px;margin-top:110px}
.sb-related:not([data-live]) .sf-rail>i>span{animation-play-state:paused}
.sb-related-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;padding:56px 0 30px}
.sb-related-heading h2{font-size:40px;line-height:1.1;letter-spacing:-.04em;margin:12px 0 10px}
.sb-related-heading p{font-size:15px;color:#ffffff8c}
.sb-related .sb-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
.sb-related .sb-card-copy{padding:22px 24px}
.sb-related .sb-card h2{font-size:22px}

/* ── Header lab ─────────────────────────────────────────────── */
.sb-lab-hero{padding:56px 0 38px}.sb-lab-hero h1{font-size:clamp(36px,5vw,62px);line-height:1.06;letter-spacing:-.045em;margin:18px 0}.sb-lab-hero p{max-width:64ch;color:#ffffff99}
.sb-lab-section{padding:32px 0 56px;border-top:1px solid #ffffff14}.sb-lab-section>h2{font-size:24px;margin-bottom:24px}.sb-lab-note{color:#ffffff88;font-size:14px;margin:-8px 0 24px}
.sb-lab-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}.sb-lab-tile{min-width:0}
.sb-lab-tile .sb-header{border-radius:12px;border:1px solid #ffffff1f}
.sb-lab-tile figcaption{display:flex;justify-content:space-between;gap:12px;padding:12px 2px;color:#ffffff80;font:10px/1.5 'Geist Mono',ui-monospace,monospace}
.sb-lab-tile>a,.sb-lab-tile>div{display:block;border-radius:12px;transition:transform .45s var(--ease),box-shadow .45s}
.sb-lab-tile>a:hover,.sb-lab-tile>div:hover{transform:translateY(-3px);box-shadow:0 24px 50px -30px var(--topic,#ff6a1a)}
.sb-lab-tile>a:hover .sb-header-bg,.sb-lab-tile>div:hover .sb-header-bg{transform:scale(1.05)}
.sb-lab-tile>a:hover .sb-header-glyph,.sb-lab-tile>div:hover .sb-header-glyph{transform:rotate(-2deg) translateY(-3px)}
.sb-sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}

/* ── Widths ─────────────────────────────────────────────────── */
@media(min-width:1600px){.sb-shell{max-width:1480px}.sb-index-layout{grid-template-columns:248px minmax(0,1fr);gap:64px}.sb-index-hero{padding-top:96px;padding-bottom:72px}.sb-grid{gap:30px}.sb-article-hero,.sb-figures{max-width:1160px}.sb-article-layout{grid-template-columns:250px minmax(0,740px);gap:96px}}
@media(max-width:1100px){.sb-featured .sb-card-copy{grid-template-columns:minmax(0,1fr);gap:22px}.sb-feat-side{padding-left:0;border-left:0}.sb-featured .sb-header{aspect-ratio:1200/630}.sb-index-hero{align-items:flex-start;gap:28px}.sb-stats{flex-basis:280px;gap:18px}.sb-index-layout{gap:28px;grid-template-columns:200px minmax(0,1fr)}.sb-article-layout{gap:40px;grid-template-columns:212px minmax(0,1fr)}.sb-card h2{font-size:21px}.sb-related .sb-grid{gap:18px}.sb-figures-row{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:800px){.sb-shell{padding:0 24px}.sb-index-hero{flex-direction:column;padding:46px 0 38px;margin-bottom:28px;gap:34px}.sb-index-hero h1{font-size:46px}.sb-stats{flex-basis:auto;width:100%;max-width:460px;gap:30px}.sb-stats .stc-label{min-height:0}.sb-stats .stc-n{font-size:34px}.sb-stats svg{height:24px}.sb-index-layout{display:block;padding-bottom:64px}.sb-index-rail{position:static;margin-bottom:26px}.sb-topic-heading{margin:20px 0 10px}.sb-topics{flex-direction:row;overflow-x:auto;padding:3px 2px 12px;gap:8px;scrollbar-width:none;-webkit-mask:linear-gradient(90deg,#000 88%,transparent);mask:linear-gradient(90deg,#000 88%,transparent)}.sb-topics::-webkit-scrollbar{display:none}.sb-topic{flex-shrink:0;white-space:nowrap;border-color:#ffffff17;border-radius:999px;padding:5px 14px 5px 5px;gap:8px;min-height:40px}.sb-topic:hover{transform:none}.sb-topic b{margin-left:6px}.sb-topics .pg{width:28px;height:28px}.sb-recents,.sb-lab-link{display:none}.sb-article-layout{display:block;margin-top:44px}.sb-article-rail{position:static;margin-bottom:40px}.sb-article-rail>.sb-back,.sb-rail-actions{display:none}.sb-toc{display:grid;grid-template-columns:1fr 1fr}.sb-toc::before,.sb-toc-fill,.sb-rail-progress{display:none}.sb-article-heading h1{font-size:42px}.sb-related .sb-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.sb-related-heading{flex-direction:column;align-items:flex-start}.sb-lab-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:520px){.sb-shell{padding:0 20px}.sb-index-hero{padding-top:36px}.sb-index-hero h1{font-size:40px;line-height:1.04}.sb-index-hero p{font-size:15px}.sb-stats{gap:20px}.sb-stats .stc-label{font-size:8.5px;letter-spacing:.1em}.sb-stats .stc-n{font-size:32px}.sb-grid{grid-template-columns:minmax(0,1fr);gap:22px}.sb-card-copy,.sb-featured .sb-card-copy{padding:22px}.sb-card h2,.sb-featured h2{font-size:24px}.sb-card-copy>p,.sb-featured .sb-card-copy>p{font-size:14px}.sb-card-kicker{font-size:9.5px}.sb-featured{margin-bottom:22px}.sb-feat-side>.sb-eyebrow,.sb-card-inside{display:none}.sb-card-strip{padding:10px 16px;font-size:9.5px}.sb-breadcrumb{padding:22px 0}.sb-article-heading{text-align:left;margin-bottom:28px}.sb-article-heading h1{font-size:36px;line-height:1.1}.sb-article-heading>p{font-size:16.5px}.sb-article-meta{justify-content:flex-start;gap:16px}.sb-meta{font-size:10px;gap:8px}.sb-article-hero>.sb-header{border-radius:14px}.sb-figures{margin-top:18px}.sb-figures-row{gap:10px}.sb-figure{padding:14px}.sb-figure-n{font-size:26px}.sb-figure-label{font-size:9px}.sb-figure-go{display:none}.sb-toc{display:block}.sb-toc a{padding:8px 10px}.sb-prose h2{font-size:26px}.sb-prose>section:first-child>p:first-of-type{font-size:18px}.sb-sources{padding:22px}.sb-article-end{align-items:flex-start}.sb-related{margin-top:72px;padding-bottom:56px}.sb-related .sb-grid{grid-template-columns:minmax(0,1fr)}.sb-related-heading h2{font-size:31px}.sb-lab-grid{grid-template-columns:minmax(0,1fr)}.sb-lab-hero{padding-top:36px}.sb-endnote{font-size:11px;align-items:flex-start}.sb-endnote .sb-status-dot{margin-top:7px}}
@media(prefers-reduced-motion:reduce){.siso-blog *,.siso-blog *::before,.siso-blog *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}.sb-card:hover,.sb-card:focus-visible,.sb-figure:hover,.sb-topic:hover{transform:none}.sb-card:hover .sb-header-bg,.sb-card:hover .sb-header-lines{transform:none}}
`;
