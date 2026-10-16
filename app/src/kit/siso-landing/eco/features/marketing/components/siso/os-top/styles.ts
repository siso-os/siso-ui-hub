// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/os-top/styles.ts)
import { homeHeroStyles } from '../home-hero/styles';

// Reuse the read-only demo's existing styles; all new rules are sot- scoped.
export const osTopStyles = `${homeHeroStyles}
@property --sot-angle{syntax:'<angle>';initial-value:0deg;inherits:false}
.sot-hero{color:#fff;background:#020308;isolation:isolate}
.sot-hero .product-hero{gap:0}
.sot-copy{position:relative;z-index:1;align-items:center;text-align:center;max-width:940px;margin:0 auto;padding:88px 0 48px;display:flex;flex-direction:column;gap:24px}
.sot-copy .hero-text{display:flex;flex-direction:column;align-items:center;gap:24px}
.sot-copy .max-w-lg{max-width:720px}.sot-copy .text-overline{color:#ffffff80}
.sot-actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap}.sot-actions a{gap:10px}
.sot-proof{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 24px;padding:0;margin:4px 0 0;list-style:none;color:#ffffffa8;font-size:13px}
.sot-proof li{display:flex;align-items:center;gap:9px}.sot-proof li:before{content:'';width:4px;height:4px;background:#eeebe4;border-radius:50%}
.sot-preview.product-hero-preview{position:relative;width:100%;max-width:1440px;aspect-ratio:1440/900;display:grid;place-items:center;isolation:isolate;overflow:visible}
.sot-backdrop{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.32;z-index:-1;mask-image:linear-gradient(transparent,#000 25%,#000 65%,transparent)}
.sot-rim{position:relative;width:94%;aspect-ratio:1400/730;padding:2px;border-radius:18px;background:#171716;box-shadow:0 24px 100px #000b}
.sot-rim:before{content:'';position:absolute;inset:-1px;border-radius:inherit;padding:1px;background:conic-gradient(from var(--sot-angle),transparent 55%,#ff6a1a70 75%,#ffb547aa 83%,transparent 95%);mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask-composite:exclude;pointer-events:none;animation:sot-rim-spin 24s linear infinite}
.sot-rim:hover:before,.sot-rim:focus-within:before{animation-play-state:paused}
.sot-preview[data-running=false] .sot-rim:before{animation-play-state:paused}
.sot-rim .hh-demo{border-radius:16px}
.sot-caption{display:flex;align-items:center;justify-content:space-between;gap:20px;width:94%;margin:-36px auto 32px;position:relative;color:#ffffff80;font-size:13px}.sot-caption p{margin:0}
.sot-explore{border:1px solid #ffffff24;border-radius:9px;color:#fff;background:#111113;padding:10px 15px;font:inherit;cursor:pointer;display:flex;align-items:center;gap:12px}
.sot-explore:hover{background:#232326;border-color:#ffffff55}
.sot-dialog{position:fixed;inset:0;width:100vw;height:100dvh;max-width:none;max-height:none;margin:0;padding:20px 28px;border:0;background:#020308;color:#fff;overflow:auto}
.sot-dialog::backdrop{background:#020308e8}.sot-dialog header{display:flex;justify-content:space-between;align-items:center;gap:16px}.sot-dialog h2{margin:0}
.sot-dialog-demo{width:min(100%,calc((100dvh - 160px)*1400/730));margin:22px auto}.sot-dialog>p{text-align:center;color:#ffffff80;font-size:13px}
.sot-marquee{padding:32px 0 64px;color:#fff;background:#020308}.sot-marquee-line{text-align:center;margin:0 0 28px;color:#ffffffa8}
.sot-logo-row{display:grid;grid-template-columns:120px minmax(0,1fr);align-items:center;gap:24px;margin:12px 0}.sot-row-label{color:#ffffff80;font-size:11px}
.sot-logo-window{overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
.sot-logo-track{display:flex;width:max-content;animation:sot-marquee 65s linear infinite}.sot-logo-track.sot-reverse{animation-direction:reverse;animation-duration:80s}
.sot-logo-row:hover .sot-logo-track,.sot-logo-row:focus-within .sot-logo-track{animation-play-state:paused!important}
.sot-logo-group{display:flex;gap:12px;padding-right:12px;flex-shrink:0}.sot-logo{display:flex;align-items:center;gap:12px;min-width:174px;min-height:62px;padding:14px 20px;border:1px solid #ffffff12;border-radius:12px;background:#0b0a09;text-decoration:none;color:#ffffffa8;font-size:14px}
.sot-logo img{border-radius:7px;object-fit:contain;filter:grayscale(1)}.sot-logo:hover{border-color:#ffffff38;color:#fff}.sot-logo:hover img{filter:none}.sot-credit-arrow{color:#ffffff50;margin-left:auto}
.sot-dark-block.section-white-block{background:#0b0a09;color:#fff;border:1px solid #ffffff0c}
.sot-solution.product-page-solution{display:grid;grid-template-columns:1fr 1.15fr;gap:72px;align-items:start}
.sot-missed-head.section-head{position:sticky;top:110px;text-align:left;align-items:flex-start}.sot-missed-head h2{max-width:430px;color:#fff}.sot-missed-head .section-head-wrapper{align-items:flex-start;text-align:left}
.sot-beats{min-width:0}.sot-beat{border-top:1px solid #ffffff20;padding:20px 0}.sot-beat:last-child{border-bottom:1px solid #ffffff20}.sot-beat h3{margin:0}
.sot-beat-trigger{display:flex;gap:20px;align-items:center;width:100%;border:0;background:none;color:#fff;text-align:left;padding:4px 0;font:inherit;cursor:pointer}.sot-number{font:12px ui-monospace,monospace;color:#ff6a1a}.sot-toggle{margin-left:auto;color:#ffffff80;font-size:24px}
.sot-beat-copy{color:#ffffffa8;margin:16px 0 20px;line-height:1.6}.sot-beat [hidden]{display:none!important}
.sot-stage-box{position:relative;width:100%;aspect-ratio:576/262;overflow:hidden;border:1px solid #ffffff16;border-radius:14px;background:radial-gradient(ellipse at 80% 50%,#ff6a1a08,transparent 65%),#020308}
.sot-stage{position:absolute;width:576px;height:262px;transform-origin:0 0;color:#eeebe4;font:12px/1.4 Inter,sans-serif}.sot-stage *{box-sizing:border-box}.sot-stage button{font:inherit;color:inherit;cursor:pointer}
.sot-scene-top{position:absolute;top:14px;left:18px;right:18px;display:flex;justify-content:space-between;color:#ffffffa8;font-size:11px}.sot-scene-top small{color:#ffffff65;font-size:10px}
.sot-need-tabs{position:absolute;left:18px;top:43px;display:flex;gap:7px}.sot-need-tabs button{width:25px;height:25px;border:1px solid #ffffff20;border-radius:7px;background:#151515}
.sot-stage button[aria-pressed=true]{background:#ff6a1a14;border-color:#ff6a1a70;color:#fff}.sot-need-name{position:absolute;left:225px;right:18px;top:45px;margin:0;text-align:right;font-size:11px}
.sot-app-grid{position:absolute;left:18px;right:18px;top:83px;display:grid;grid-template-columns:repeat(5,1fr);gap:5px}.sot-app-card{height:29px;padding:4px 7px;border:1px solid #ffffff12;border-radius:5px;display:flex;align-items:center;justify-content:space-between;font-size:9px;background:#111112}
.sot-app-card>div{display:flex;gap:3px}.sot-app-card i{width:4px;height:9px;border-radius:1px;background:#ffffff16;transition:background .25s}.sot-app-card i[data-selected=true]{background:#eeebe4}
.sot-branches{position:absolute;inset:0;width:576px;height:262px}.sot-branches path{stroke:#ffffff16;stroke-width:1}.sot-branches path.sot-selected-path{stroke:#ff6a1a;stroke-dasharray:5 6;animation:sot-flow 3s linear infinite}
.sot-repos{position:absolute;left:18px;top:52px;display:flex;flex-direction:column;gap:7px}.sot-repos button{width:132px;height:28px;padding:5px 10px;background:#121213;border:1px solid #ffffff20;border-radius:6px;display:flex;justify-content:space-between}
.sot-findings,.sot-themes{position:absolute;top:67px;padding:12px;background:#101011;border:1px solid #ffffff20;border-radius:12px;text-align:center}.sot-findings{left:259px;width:112px}.sot-themes{left:410px;width:143px;top:76px}
.sot-findings strong,.sot-themes strong{display:block;font-size:32px;letter-spacing:-1px;line-height:1.1}.sot-findings>span,.sot-themes>span{font-size:11px;color:#ffffff80}.sot-finding-grid{margin-top:10px;display:grid;grid-template-columns:repeat(10,1fr);gap:2px}.sot-finding-grid i{height:4px;background:#eeebe459;border-radius:1px}.sot-themes>div{margin-top:12px;display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.sot-themes i{height:10px;background:#ff6a1a40;border:1px solid #ff6a1a33;border-radius:2px}
.sot-lead{position:absolute;left:185px;top:48px;width:206px;border:1px solid #ff6a1a55;border-radius:9px;padding:10px 14px;display:flex;align-items:center;gap:9px;background:#1a110e}.sot-lead small{margin-left:auto;color:#ffffff80;font-size:10px}.sot-status-dot{width:6px;height:6px;background:#eeebe4;border-radius:50%}
.sot-handoff-line{position:absolute;left:288px;top:87px;width:1px;height:26px;background:#ffffff40}.sot-workers{position:absolute;top:110px;left:70px;right:70px;display:flex;gap:18px}.sot-workers button{flex:1;background:#111112;border:1px solid #ffffff20;border-radius:8px;text-align:left;padding:9px 12px}.sot-workers span{display:block;color:#ffffff80;font-size:10px;margin-top:2px}
.sot-written{position:absolute;top:179px;left:70px;right:70px;border:1px solid #ffffff20;border-radius:7px;padding:8px 12px;display:flex;align-items:center;gap:12px;background:#111112}.sot-written>span{font:10px ui-monospace,monospace;color:#ffffff80}.sot-written p{font-size:11px;margin:0}
.sot-company-tools{position:absolute;bottom:13px;left:70px;right:70px;display:flex;justify-content:center;gap:24px;font-size:10px;color:#ffffff80}
.sot-stage-box[data-running=false] *, .sot-stage-box:hover *, .sot-stage-box:focus-within *{animation-play-state:paused!important}
.sot-hero button:focus-visible,.sot-dialog button:focus-visible,.sot-hero a:focus-visible,.sot-logo:focus-visible,.sot-beats button:focus-visible{outline:2px solid #eeebe4;outline-offset:3px}
@keyframes sot-marquee{to{transform:translateX(-50%)}}@keyframes sot-flow{to{stroke-dashoffset:-44}}@keyframes sot-rim-spin{to{--sot-angle:360deg}}
@media(max-width:991px){.sot-solution.product-page-solution{grid-template-columns:1fr;gap:28px}.sot-missed-head.section-head{position:static}.sot-missed-head h2{max-width:none}.sot-copy{padding-top:64px}.sot-caption{margin-top:-18px}.sot-logo-row{grid-template-columns:1fr;gap:8px}}
@media(max-width:479px){.sot-copy{padding-top:48px;gap:20px}.sot-actions{flex-direction:column;width:100%}.sot-actions a{justify-content:center}.sot-caption{margin:0 auto 24px;font-size:11px;gap:12px}.sot-rim{width:100%;border-radius:10px}.sot-dialog{padding:12px}.sot-dialog header h2{font-size:13px}.sot-proof{font-size:11px;gap:8px 16px}.sot-beat-trigger{gap:12px}}
@media(prefers-reduced-motion:reduce){.sot-rim:before,.sot-logo-track,.sot-branches path.sot-selected-path{animation:none!important}.sot-app-card i{transition:none}.sot-logo-window{overflow-x:auto;mask-image:none}.sot-logo-track{width:100%}.sot-logo-group{flex-wrap:wrap;padding-right:0}.sot-logo-group[aria-hidden=true],.sot-logo[aria-hidden=true]{display:none}.sot-logo{min-width:0}}

/* owner fix 8 Oct: the preview grid's auto column sized to the demo, which sizes to its parent: 0x0. Give the column a width. */
.sot-preview{grid-template-columns:minmax(0,1fr)}.sot-rim{justify-self:center}
.sot-app-card{gap:6px}.sot-app-card>span{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sot-app-card>div{flex:none}
`;
