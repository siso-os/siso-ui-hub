// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/home-hero/styles.ts)
// All additions are hh- scoped. The original hero window is 1400:730.
export const homeHeroStyles = `
.hh-source{text-decoration:none;min-width:0}
.hh-source-content{display:flex;align-items:center;gap:8px;justify-content:center;white-space:nowrap}
.hh-source-content img{width:26px;height:26px;border-radius:7px;object-fit:cover;filter:grayscale(1) brightness(1.3);opacity:.7;transition:filter .2s,opacity .2s}
.hh-source:hover img,.hh-source:focus-visible img{filter:none;opacity:1}
.hh-source-content span{font-size:12px}
.hh-overlay{pointer-events:none}
.hh-demo{position:relative;width:100%;aspect-ratio:1400/730;overflow:hidden;isolation:isolate;background:#070707;color:#eeebe4}
.hh-stage{position:absolute;left:0;top:0;width:1200px;height:750px;transform-origin:0 0;font-family:inherit;color:#eeebe4;font-size:14px;line-height:1.5}
.hh-stage *{box-sizing:border-box}
.hh-stage button{font:inherit;color:inherit;cursor:pointer;border:0;background:transparent;padding:0;text-align:left;line-height:inherit}
.hh-stage button:focus-visible,.hh-stage a:focus-visible,.hh-stage input:focus-visible{outline:2px solid #eeebe4;outline-offset:3px}
.hh-demo-heading{position:absolute;top:0;left:12px;right:12px;height:34px;display:flex;align-items:center;justify-content:space-between;color:#92928e;font-size:13px}
.hh-demo-heading span{display:flex;align-items:center;gap:8px}
.hh-demo-heading i{width:6px;height:6px;border-radius:50%;background:#ed615a}
.hh-demo-heading button{font-size:13px;color:#aaa9a3;padding:4px 10px}
.hh-window{position:absolute;left:0;top:38px;width:1200px;height:700px;border:1px solid #343432;border-radius:14px;background:#151514;overflow:hidden;box-shadow:0 0 0 1px #ffffff08,0 24px 70px #0009}
.hh-titlebar{position:absolute;left:0;right:0;top:0;height:43px;border-bottom:1px solid #2a2a2a;background:#0d0d0c;display:flex;align-items:center;gap:8px;padding:0 13px}
.hh-traffic{display:flex;gap:7px;margin-right:12px}
.hh-traffic i{width:10px;height:10px;border:1px solid #eeebe428;border-radius:50%;background:#ed615a}
.hh-traffic i:nth-child(2){background:#a7a49c}.hh-traffic i:nth-child(3){background:#686862}
.hh-stage .hh-tab{padding:7px 13px;border-radius:7px;color:#777772;font-size:13px;white-space:nowrap}
.hh-stage .hh-tab.hh-active{background:#252524;color:#eeebe4}
.hh-title-spacer{flex:1}
.hh-stage .hh-modules-button{border:1px solid #383835;border-radius:7px;padding:5px 12px;font-size:13px;background:#1b1b1b}
.hh-rail{position:absolute;top:43px;bottom:0;left:0;width:44px;background:#0e0e0d;border-right:1px solid #2a2a2a;display:flex;flex-direction:column;align-items:center;gap:14px;padding-top:15px}
.hh-stage .hh-rail-button{display:grid;place-items:center;width:34px;height:35px;color:#777772;border-radius:8px;flex-shrink:0}
.hh-stage .hh-rail-button:hover{color:#eeebe4;background:#222220}
.hh-stage .hh-rail-button.hh-active{color:#ed615a;background:#ed615a10;box-shadow:inset 0 0 0 1px #ed615a42}
.hh-rail-bottom{margin-top:auto;padding-bottom:16px}.hh-rail-bottom img{border-radius:50%}
.hh-sidebar{position:absolute;top:43px;bottom:0;left:44px;width:231px;background:#191918;border-right:1px solid #2a2a2a;padding:18px 13px}
.hh-brand{display:flex;align-items:center;gap:10px;font-size:20px;font-weight:600;margin:0 0 21px 3px;letter-spacing:-.5px}
.hh-brand img{border:1px solid #ed615a;border-radius:50%;padding:2px}.hh-brand span{font-size:15px;color:#81817a;margin-left:auto}
.hh-stage .hh-lead{display:flex;align-items:center;gap:10px;width:100%;background:#2a2a29;border-radius:9px;padding:10px;margin-bottom:24px}
.hh-lead small{display:block;color:#91918b;font-size:10px}.hh-agent-mark{display:grid;place-items:center;width:29px;height:29px;border:1px solid #4c4b48;border-radius:8px;background:linear-gradient(145deg,#383738,#151515);color:#b2b0b4;flex-shrink:0}
.hh-group{font-size:12px;font-weight:500;color:#85857f;margin:22px 0 8px 5px}
.hh-sidebar>button:not(.hh-lead){display:block;padding:8px 13px;width:100%;font-size:14px;color:#aaa9a3;border-radius:7px}
.hh-sidebar>button:hover{background:#242423;color:#eeebe4}
.hh-sidebar-foot{position:absolute;bottom:14px;left:14px;font-size:11px;color:#aaa9a3;display:flex;align-items:center;gap:7px}
.hh-sidebar-foot i{width:5px;height:5px;background:#eeebe4;border-radius:50%}
.hh-main{position:absolute;top:43px;bottom:0;left:275px;right:0;background:#171716}
.hh-pane-heading{height:48px;display:flex;align-items:center;gap:10px;padding:0 20px;border-bottom:1px solid #2a2a2a;font-size:14px;background:#191918}
.hh-pane-heading>span:not(.hh-agent-mark){color:#72726c;font-size:12px}
.hh-pane-heading small{margin-left:auto;font-size:10px;letter-spacing:.05em;text-transform:uppercase;color:#81817a;border:1px solid #33332f;border-radius:4px;padding:1px 6px}
.hh-pane{position:absolute;inset:48px 0 116px;overflow:auto;scrollbar-width:thin;scrollbar-color:#444440 transparent}
.hh-chat{padding:27px 47px}
.hh-user-label{font-size:11px;color:#81817a;margin-bottom:8px}
.hh-user-message{font-size:17px;line-height:1.5;min-height:51px;max-width:690px;margin:0 0 20px;color:#eeebe4}
.hh-caret{display:inline-block;width:2px;height:15px;background:#eeebe4;margin-left:3px;vertical-align:-1px;animation:hh-caret 1s steps(1) infinite}
.hh-demo:hover .hh-caret{animation-play-state:paused}
@keyframes hh-caret{50%{opacity:0}}
.hh-work-step{display:flex;align-items:center;gap:10px;min-height:40px;border-top:1px solid #ffffff08;color:#bbb9b3;font-size:13px}
.hh-work-step i{width:6px;height:6px;border-radius:50%;background:#6e6e68}.hh-work-step small{font-size:10px;color:#777770;margin-left:auto}
.hh-pick{margin:12px 0 15px;border:1px solid #363631;background:#1b1b1b;border-radius:10px;padding:15px 18px}
.hh-eyebrow{color:#96948d;font-size:10px;text-transform:uppercase;letter-spacing:.12em}
.hh-pick h3{font-size:19px;font-weight:500;margin:6px 0 7px;color:#eeebe4}.hh-pick p{font-size:12px;color:#99978f;line-height:1.5;margin:0 0 12px}
.hh-pick code,.hh-catalogue-detail code{display:block;background:#101010;border:1px solid #2a2a2a;border-radius:5px;padding:9px 10px;font-size:12px;color:#cccac2;font-family:ui-monospace,SFMono-Regular,monospace}
.hh-pick a{font-size:11px;color:#eeebe4;display:inline-block;margin-top:9px;text-decoration:none}
.hh-complete{font-size:15px;color:#eeebe4}.hh-complete span{font-size:10px;color:#73736c;margin-left:9px}
.hh-composer{position:absolute;left:35px;right:35px;bottom:49px;height:52px;display:flex;align-items:center;gap:11px;padding:0 15px;border:1px solid #45453e;border-radius:16px;background:#232321;color:#83837a;font-size:14px}
.hh-composer>span:first-child{font-size:22px}.hh-stage .hh-composer button{display:grid;place-items:center;margin-left:auto;width:30px;height:30px;background:#4c4c46;border-radius:50%;color:#171716;font-size:23px}
.hh-status{position:absolute;left:0;right:0;bottom:0;height:31px;border-top:1px solid #2a2a2a;display:flex;align-items:center;gap:12px;padding:0 17px;font-size:10px;color:#73736c}
.hh-status>span:first-child{color:#b8b5ac}.hh-status>span:last-child{margin-left:auto}
.hh-ctx{width:60px;height:4px;border-radius:2px;background:#353530;overflow:hidden}.hh-ctx i{display:block;width:43%;height:100%;background:#eeebe4}
.hh-center{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:12px;text-align:center}
.hh-stage h2{font-size:29px;letter-spacing:-.7px;font-weight:500;line-height:1.2;margin:5px 0 10px;color:#eeebe4}
.hh-center small{font-size:10px;color:#77776e}
.hh-wave{height:100px;display:flex;align-items:center;gap:5px;margin:12px 0;width:330px;justify-content:center}
.hh-wave span{display:block;width:5px;border-radius:3px;background:#ed615a;transform-origin:center;animation:hh-wave .85s ease-in-out infinite alternate}
@keyframes hh-wave{from{transform:scaleY(.3);opacity:.4}to{transform:scaleY(1);opacity:1}}
.hh-stage .hh-action{display:flex;align-items:center;gap:14px;padding:10px 17px;border:1px solid #55534c;border-radius:9px;background:#242422;font-size:13px}
.hh-stage .hh-action:hover{border-color:#eeebe4}.hh-transcript{font-size:19px;color:#bbb8af;min-height:30px;margin:12px 0}
.hh-qr{width:155px;height:155px;position:relative;margin:10px;border-radius:14px;background:#eeebe4;padding:14px;color:#171716}
.hh-qr-pixels{display:grid;grid-template-columns:repeat(13,1fr);height:100%;gap:2px}.hh-qr-pixels i{background:#171716}
.hh-qr b{position:absolute;left:14px;top:14px;width:35px;height:35px;border:5px solid #171716;box-shadow:0 0 0 4px #eeebe4;background:#171716;outline:5px solid #eeebe4;outline-offset:-10px}
.hh-qr b:nth-last-child(2){left:auto;right:14px}.hh-qr b:last-child{top:auto;bottom:14px}
.hh-connected{display:grid;place-items:center;background:#1b1b1b;border:1px solid #48483e;color:#eeebe4;font-size:80px}
.hh-browser{height:100%}.hh-address{height:35px;display:flex;align-items:center;gap:13px;padding:0 18px;font-size:12px;background:#111110;color:#77776f;border-bottom:1px solid #2a2a2a}
.hh-address span:first-of-type{flex:1;background:#252523;border-radius:5px;padding:2px 12px;color:#aaa79f}.hh-address span:last-child{font-size:10px;color:#eeebe4}
.hh-browser-body{padding:20px 27px}.hh-browser-body h2{margin-bottom:3px}.hh-browser-body>p,.hh-estate>p,.hh-library>p{font-size:12px;color:#929087;margin:4px 0 17px}
.hh-catalogue{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.hh-stage .hh-catalogue button{background:#1f1f1d;border:1px solid #33332f;border-radius:9px;padding:10px;overflow:hidden}
.hh-stage .hh-catalogue button:hover,.hh-stage .hh-catalogue button.hh-selected{border-color:#eeebe4}
.hh-catalogue strong{display:block;font-size:12px;font-weight:500}.hh-catalogue small{display:block;font-size:9px;color:#86847b}
.hh-mini-preview{height:65px;position:relative;background:#141413;border-radius:5px;margin-bottom:9px;overflow:hidden;padding:15px 17px}
.hh-mini-preview span{display:block;height:5px;border-radius:2px;background:#4a4842;margin:0 0 5px;width:65%}.hh-mini-preview span:nth-child(2){width:45%;background:#6c6860}.hh-mini-preview span:nth-child(3){width:55%}
.hh-mini-preview b{position:absolute;right:14px;top:19px;border:1px solid #444139;color:#eeebe4;border-radius:6px;padding:2px 6px;font-size:16px}
.hh-catalogue-detail{margin-top:12px;font-size:11px;border-top:1px solid #33332e;padding-top:10px;display:flex;flex-direction:column;gap:6px;color:#aaa69c}.hh-catalogue-detail code{font-size:10px}.hh-catalogue-detail p{margin:0}
.hh-estate,.hh-library{padding:33px 43px}
.hh-repos{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:35px}
.hh-repos>div{min-height:172px;border:1px solid #37372f;border-radius:11px;background:#1b1b1b;padding:16px;display:flex;flex-direction:column;align-items:flex-start;gap:9px}
.hh-repos strong{font-size:12px;overflow-wrap:anywhere;font-weight:500}.hh-repos small{font-size:10px;color:#858278}.hh-pin{font-size:11px;border:1px solid #454338;border-radius:5px;padding:3px 7px;margin-top:auto;color:#eeebe4}
.hh-search{display:flex;align-items:center;gap:9px;margin:20px 0 10px;border:1px solid #454339;border-radius:9px;padding:11px 13px;background:#20201d;color:#969185;font-size:20px}
.hh-search input{color:#eeebe4;background:transparent;border:0;outline:none;flex:1;min-width:0;font:inherit;font-size:15px}
.hh-result{border-top:1px solid #33332c;display:flex;align-items:center;gap:15px;padding:15px 0;font-size:11px;color:#aaa597}
.hh-result>span:first-child{flex:1}.hh-result strong{display:block;font-weight:500;font-size:14px;color:#eeebe4}.hh-result small{display:block;font-size:10px;color:#8b8679}
.hh-rating{width:82px;height:4px;background:#34332a;border-radius:3px;overflow:hidden}.hh-rating i{display:block;height:100%;width:100%;background:#eeebe4}
.hh-library-pick{font-size:11px;color:#929087;margin-top:14px}.hh-library-pick strong{font-weight:500;color:#eeebe4;margin-left:10px}
.hh-tray{position:absolute;right:12px;top:49px;z-index:8;width:288px;background:#20201e;border:1px solid #4b4941;border-radius:12px;padding:16px;box-shadow:0 25px 75px #000b}
.hh-tray-heading{display:flex;align-items:center;justify-content:space-between;font-size:14px}.hh-stage .hh-tray-heading button{font-size:24px;color:#99958c;padding:0 3px}
.hh-tray>p{font-size:11px;color:#8d887e;margin:4px 0 15px}
.hh-module-row{display:flex;align-items:center;gap:11px;padding:12px 0;border-top:1px solid #35332d;font-size:13px}.hh-module-row>span:first-of-type{flex:1}.hh-module-row small{display:block;font-size:10px;color:#928c7f}.hh-locked{color:#8d887e;font-size:21px;padding-right:10px}
.hh-stage .hh-toggle{width:35px;height:20px;border:1px solid #59564c;border-radius:99px;background:#2e2d28;padding:3px;display:flex;align-items:center}
.hh-toggle i{width:12px;height:12px;border-radius:50%;background:#999487;transition:transform .2s,background .2s}.hh-stage .hh-toggle.hh-on{background:#ed615a;border-color:#ed615a}.hh-toggle.hh-on i{transform:translateX(14px);background:#070707}
.hh-tray-note{font-size:10px;color:#8c8577;display:block;padding-top:10px}
.hh-try{position:absolute;top:167px;left:54px;z-index:4;background:#eeebe4;color:#171716;border-radius:8px;padding:8px 11px;font-size:11px;pointer-events:none;box-shadow:0 5px 20px #0008}
@media(max-width:767px){.hh-source-content{flex-direction:column;gap:6px}.hh-source-content span{font-size:10px}.hh-hero .home-hero-cta{flex-wrap:wrap}}
@media(prefers-reduced-motion:reduce){.hh-wave span,.hh-caret{animation:none}.hh-source-content img,.hh-toggle i{transition:none}}
.hh-proof{display:flex;flex-wrap:wrap;gap:6px 18px;margin:14px 0 0;padding:0;list-style:none;color:#ffffff8c;font-size:14px}.hh-proof li{display:flex;align-items:baseline;gap:6px}.hh-proof li+li:before{content:'';width:4px;height:4px;border-radius:50%;background:#FF6A1A;margin-right:12px;align-self:center}.hh-proof b{color:#fff;font-weight:600;font-variant-numeric:tabular-nums}
`;
