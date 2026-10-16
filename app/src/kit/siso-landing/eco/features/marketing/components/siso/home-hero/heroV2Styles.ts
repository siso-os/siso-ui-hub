// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/home-hero/heroV2Styles.ts)
// Hero v2. All v2- scoped; tokens from docs/specs/SISO-UI-STANDARD.md §3. Only transform and opacity animate: the ring and the
// embers are CSS animations that pause unless the dial is on screen ([data-run]); nothing is blurred.
export const heroV2Styles = `
.v2{--ease:cubic-bezier(.19,1,.22,1);--mono:'Geist Mono',ui-monospace,SFMono-Regular,monospace;--rw:1180px;--dh:244px;--fs:clamp(40px,6vw,86px);
  position:relative;overflow:hidden;overflow:clip;background:#00030a;color:#fff;padding:92px 24px 48px;font-family:Inter,system-ui,sans-serif;text-align:center}
.v2 *{box-sizing:border-box}
.v2-copy{position:relative;z-index:5;max-width:980px;margin:0 auto;display:flex;flex-direction:column;align-items:center}
.v2-copy>*{animation:v2-up .9s var(--ease) both}
.v2-copy>:nth-child(2){animation-delay:.08s}.v2-copy>:nth-child(3){animation-delay:.16s}
@keyframes v2-up{from{opacity:0;transform:translateY(14px)}}
.v2 h1{font:600 58px/1.04 'Inter Display',Inter,sans-serif;letter-spacing:-.045em;margin:0;color:#fff;text-wrap:balance}
.v2-sub{font-size:17px;line-height:1.65;color:rgba(255,255,255,.6);max-width:620px;margin:18px 0 0;text-wrap:pretty}
.v2-cta{display:flex;gap:12px;justify-content:center;margin-top:26px}
.v2-cta .button-ghost{background:#ffffff0a;box-shadow:inset 0 0 0 1px #ffffff2e;transition:background-color .3s,box-shadow .3s}
.v2-cta .button-ghost:hover,.v2-cta .button-ghost:focus-visible{background:#ffffff14;box-shadow:inset 0 0 0 1px #ffffff52}

/* the dial */
.v2-dial{position:relative;height:var(--dh);margin:16px auto 0;max-width:1240px}
.v2-glow{position:absolute;left:50%;top:50%;width:calc(var(--rw) * 1.1);height:calc(var(--rw) * .4);transform:translate(-50%,-50%);pointer-events:none;
  background:radial-gradient(closest-side,#ff6a1a26,#ff6a1a0a 55%,transparent)}
.v2-half{position:absolute;left:50%;width:calc(var(--rw) + 240px);margin-left:calc((var(--rw) + 240px) / -2);overflow:hidden;pointer-events:none}
.v2-back{top:-25%;height:75%;z-index:0;opacity:.6}
.v2-front{top:50%;height:75%;z-index:3}
.v2-ring{position:absolute;left:50%;width:var(--rw);height:var(--rw);margin-left:calc(var(--rw) / -2);transform:perspective(3000px) rotateX(76deg)}
.v2-back .v2-ring{top:calc(100% - var(--rw) / 2)}
.v2-front .v2-ring{top:calc(var(--rw) / -2)}
.v2-spin{width:100%;height:100%;will-change:transform;animation:v2-spin 96s linear infinite paused}
@keyframes v2-spin{to{transform:rotate(360deg)}}
.v2-ring-svg{display:block;width:100%;height:100%;overflow:visible}
.v2-ring-text{font:500 15px var(--mono);letter-spacing:.32em;fill:rgba(255,255,255,.55)}
.v2-pull{position:absolute;left:50%;top:50%;width:0;height:0;z-index:1;transform:scaleY(.24);pointer-events:none}
.v2-orbit{position:absolute;left:0;top:0;--a:calc(var(--e) * 25.7deg);animation:v2-orbit 11s linear infinite paused;animation-delay:calc(var(--e) * -.786s)}
.v2-orbit i{position:absolute;width:10px;height:10px;margin:-5px;border-radius:50%;background:radial-gradient(closest-side,#fff3d6,#FFC24B 45%,#FF6A1A00);
  animation:v2-fall 11s cubic-bezier(.45,0,.85,.55) infinite paused;animation-delay:inherit}
@keyframes v2-orbit{from{transform:rotate(var(--a))}to{transform:rotate(calc(var(--a) + 600deg))}}
@keyframes v2-fall{0%{transform:translateX(calc(var(--rw) * .47)) scale(1);opacity:0}12%{opacity:.85}80%{opacity:.6}100%{transform:translateX(40px) scale(.35);opacity:0}}
.v2-dial[data-run] .v2-spin,.v2-dial[data-run] .v2-orbit,.v2-dial[data-run] .v2-orbit i,.v2-dial[data-run] .v2-label i{animation-play-state:running}
.v2-lion{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);opacity:.035;z-index:1;pointer-events:none}

/* the count */
.v2-count{position:absolute;left:0;right:0;top:50%;z-index:2;display:flex;flex-direction:column;align-items:center;transform:translateY(-50%);outline:none}
.v2-label{display:flex;align-items:center;gap:9px;font:500 11px/1 var(--mono);letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.55)}
.v2-label i{width:6px;height:6px;border-radius:50%;background:#FF6A1A;box-shadow:0 0 10px #FF6A1A;animation:v2-blink 2.4s ease-in-out infinite paused}
@keyframes v2-blink{50%{opacity:.25}}
.v2-odo{display:flex;align-items:center;justify-content:center;padding:.06em 0;margin:10px 0 8px;font:600 var(--fs)/1 'Inter Display',Inter,sans-serif;letter-spacing:0;color:#fff;
  font-variant-numeric:tabular-nums;-webkit-mask-image:linear-gradient(transparent,#000 20%,#000 80%,transparent);mask-image:linear-gradient(transparent,#000 20%,#000 80%,transparent)}
.v2-drum{--h:1.1em;--r:1.693em;position:relative;width:.6em;height:var(--h);perspective:7em}
.v2-drum-roll{position:absolute;inset:0;transform-style:preserve-3d;will-change:transform;transition:transform 1.1s var(--ease);transition-delay:calc(var(--i) * 20ms)}
.v2-face{position:absolute;inset:0;display:grid;place-items:center;backface-visibility:hidden;transform:rotateX(calc(var(--f) * -36deg)) translateZ(var(--r))}
.v2-drum[data-dim] .v2-face{color:rgba(255,255,255,.5)}
.v2-sep{width:.26em;text-align:center;color:rgba(255,255,255,.35)}
.v2-rate{display:flex;align-items:center;gap:7px;font-size:13px;color:rgba(255,255,255,.5);font-variant-numeric:tabular-nums}
.v2-rate::before{content:'';width:5px;height:5px;border-radius:50%;background:#FF6A1A;flex:none}
.v2-since{white-space:pre}
.v2-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}

/* tooltips: data-src, as Footer/AskAI.tsx */
.v2-count::after,.v2-cards a::after{content:attr(data-src);position:absolute;z-index:9;width:max-content;max-width:300px;padding:8px 11px;border-radius:10px;
  background:#0a0b0f;border:1px solid #ffffff1f;box-shadow:0 12px 30px #000c;color:rgba(255,255,255,.72);font:400 12px/1.45 Inter,sans-serif;letter-spacing:0;
  text-transform:none;text-align:left;opacity:0;pointer-events:none;transition:opacity .25s,transform .25s var(--ease)}
.v2-count::after{left:50%;top:calc(100% + 12px);translate:-50% 0;transform:translateY(-4px)}
.v2-count:hover::after,.v2-count:focus-visible::after{opacity:1;transform:none}

/* the cards */
.v2-cards{position:relative;z-index:4;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;max-width:1120px;margin:30px auto 0;padding:0;list-style:none;text-align:left}
.v2-cards li{animation:v2-up .9s var(--ease) both;animation-delay:calc(.3s + var(--i) * 70ms)}
.v2-cards a{position:relative;display:flex;flex-direction:column;align-items:stretch;text-align:left;min-width:0;height:100%;padding:16px 18px 14px;border-radius:18px;
  background:linear-gradient(180deg,#0e0f14,#08090c);box-shadow:inset 0 0 0 1px #ffffff17;color:#fff;text-decoration:none;outline:none;transition:transform .35s var(--ease)}
.v2-cards a::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1.5px;pointer-events:none;opacity:0;transition:opacity .35s;
  background:linear-gradient(110deg,#FF6A1A,#FFC24B 45%,#FF2D55);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;
  mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0)}
.v2-cards a:hover,.v2-cards a:focus-visible{transform:translateY(-3px)}
.v2-cards a:hover::before,.v2-cards a:focus-visible::before{opacity:1}
.v2-card-viz{height:48px;min-width:0;display:flex;flex-direction:column;justify-content:flex-end;align-items:flex-end;margin-bottom:12px}
.v2-viz{display:block;width:100%;max-height:56px}
.v2-city{height:56px}
.v2-tower{transform-box:fill-box;transform-origin:50% 100%;animation:v2-rise 1s var(--ease) both;animation-delay:calc(.5s + var(--i) * 60ms)}
@keyframes v2-rise{from{transform:scaleY(.05)}}
.v2-split-bar{display:flex;gap:3px;height:10px}
.v2-split-bar i{min-width:6px;border-radius:3px;background:#FFC24B}
.v2-split-bar i:nth-child(2){min-width:16px;background:#FF6A1A}.v2-split-bar i:nth-child(3){background:linear-gradient(90deg,#FF6A1A55,#FF2D5555)}
.v2-split-key{display:flex;gap:10px;margin-top:9px;font:500 10px/1 var(--mono);color:rgba(255,255,255,.45);white-space:nowrap}
.v2-split-key b{color:rgba(255,255,255,.8);font-weight:500}
.v2-ticks{height:24px}
.v2-query{font:500 11px/1.6 var(--mono);color:rgba(255,255,255,.4);padding:7px 10px;border-radius:8px;background:#ffffff08;box-shadow:inset 0 0 0 1px #ffffff12;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.v2-query span{display:block;color:#FFC24B}.v2-query em{font-style:normal;color:rgba(255,255,255,.4)}
.v2-cards a>b{font:600 30px/1 'Inter Display',Inter,sans-serif;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.v2-card-label{margin:7px 0 14px;font:500 10.5px/1.3 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.6)}
.v2-credit{display:flex;align-items:center;gap:6px;margin-top:auto;padding-top:12px;border-top:1px solid #ffffff0f;font:400 11.5px/1.3 Inter,sans-serif;color:rgba(255,255,255,.4)}
.v2-credit::before{content:'';width:5px;height:5px;border-radius:50%;background:#FF6A1A;flex:none}
.v2-cards a::after{left:50%;bottom:calc(100% + 10px);translate:-50% 0;transform:translateY(4px)}
.v2-cards a:hover::after,.v2-cards a:focus-visible::after{opacity:1;transform:none}

/* desktop: pill-like cards, number left and visual right, credit along the foot */
@media(min-width:768px){
  .v2-cards a{display:grid;grid-template-columns:minmax(0,1fr) 104px;grid-template-areas:"n v" "l v" "c c";column-gap:12px;padding:14px 16px 11px;border-radius:16px}
  .v2-cards a>b{grid-area:n;align-self:end;font-size:25px}
  .v2-card-label{grid-area:l;align-self:start;margin:7px 0 0;white-space:nowrap;letter-spacing:.1em}
  .v2-card-viz{grid-area:v;height:48px;margin:0;align-self:center}
  .v2-credit{grid-area:c;margin-top:12px;padding-top:9px}
  .v2-split-key{flex-direction:column;gap:3px;margin-top:7px;font-size:9.5px}
  .v2-query{padding:6px 9px;font-size:10.5px;line-height:1.5}
}
@media(max-width:1100px){.v2 h1{font-size:54px}.v2{--rw:940px;--dh:280px}}
@media(max-width:767px){
  .v2{--rw:640px;--dh:250px;--fs:clamp(28px,9vw,42px);padding:72px 16px 40px}
  .v2 h1{font-size:36px;line-height:1.06;letter-spacing:-.04em}
  .v2-sub{font-size:15px;line-height:1.6;margin-top:14px}
  .v2-cta{margin-top:22px}
  .v2-dial{margin-top:10px}
  .v2-lion{width:120px;height:120px}
  .v2-ring-text{display:none}
  .v2-credit{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block}
  .v2-credit::before{display:inline-block;margin-right:6px;vertical-align:middle}
  .v2-label{font-size:10px}.v2-rate{font-size:12px}.v2-since{display:none}
  .v2-cards{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:14px}
  .v2-cards a{padding:13px 13px 11px;border-radius:14px}
  .v2-card-viz{height:40px;margin-bottom:10px}.v2-viz{max-height:40px}.v2-city{height:40px}
  .v2-split-key span:first-child{display:none}
  .v2-cards a>b{font-size:22px}
  .v2-card-label{font-size:9.5px;letter-spacing:.1em}
  .v2-credit{font-size:10.5px;padding-top:9px}
  .v2-split-key{gap:6px;font-size:9px}.v2-query{font-size:9.5px;padding:6px 8px}
  .v2-cards a::after{max-width:240px;translate:none;left:0}
  .v2-cards li:nth-child(even) a::after{left:auto;right:0}
  .v2-count::after{max-width:300px}
}
@media(prefers-reduced-motion:reduce){
  .v2-copy>*,.v2-cards li,.v2-tower,.v2-spin,.v2-orbit,.v2-orbit i,.v2-label i{animation:none}
  .v2-pull{display:none}
  .v2-drum-roll,.v2-cards a,.v2-cards a::before,.v2-cards a::after,.v2-count::after{transition:none}
  .v2-since{display:none}
}
`;
