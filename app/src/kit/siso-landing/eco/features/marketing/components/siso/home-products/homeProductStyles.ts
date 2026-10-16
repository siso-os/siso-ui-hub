// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/home-products/homeProductStyles.ts)
// The top nav's neon takes the colour of the product under the pointer (Shaan, 9 Oct: "when you're hovering over the blue page
// the UI Hub it can go blue ... red ... purple ... anywhere else it's just a red and orange"). NavBar.tsx draws its ring, and
// the open dropdown's rim, from these three variables; registering them lets them ease between colours. The nav renders this
// block itself (so it works on every page, not only home); the home cards and the nav's own menus set html[data-glow].
export const NAV_GLOW_CSS = `
@property --nav-ember{syntax:'<color>';inherits:true;initial-value:#FF6A1A}
@property --nav-gold{syntax:'<color>';inherits:true;initial-value:#FFC24B}
@property --nav-rose{syntax:'<color>';inherits:true;initial-value:#FF2D55}
.nav-container{transition:--nav-ember .7s cubic-bezier(.19,1,.22,1),--nav-gold .7s cubic-bezier(.19,1,.22,1),--nav-rose .7s cubic-bezier(.19,1,.22,1)}
html[data-glow="ui-hub"] .nav-container{--nav-ember:#1f69ff;--nav-gold:#9cc0ff;--nav-rose:#4f8dff}
html[data-glow="os"] .nav-container{--nav-ember:#ed615a;--nav-gold:#ffc0b8;--nav-rose:#FF2D55}
html[data-glow="library"] .nav-container{--nav-ember:#7540b7;--nav-gold:#d2b6ff;--nav-rose:#a46bff}
html[data-glow="agency"] .nav-container{--nav-ember:#00a879;--nav-gold:#9ff0cf;--nav-rose:#00d69a}
html[data-glow="skills"] .nav-container{--nav-ember:#f5a524;--nav-gold:#ffe1a1;--nav-rose:#ff8a1c}
html[data-glow="voice"] .nav-container{--nav-ember:#e0336a;--nav-gold:#ffb3cb;--nav-rose:#ff5c8a}
html[data-glow="research"] .nav-container{--nav-ember:#5a77a8;--nav-gold:#bfe6ff;--nav-rose:#8fb4ff}
`;

export const homeProductStyles = `
.hp-panel{width:100%;aspect-ratio:752/640;position:relative;overflow:hidden;isolation:isolate;color:#eeebe4;
  --hp-top:#06123a;--hp-bottom:#1f69ff;--hp-tint:#9cc0ff;background:linear-gradient(155deg,var(--hp-top),var(--hp-bottom) 72%,var(--hp-top))}
.hp-panel[data-product="os"]{--hp-top:#260b0a;--hp-bottom:#ed615a;--hp-tint:#ffc0b8}
.hp-panel[data-product="library"]{--hp-top:#170a2e;--hp-bottom:#7540b7;--hp-tint:#d2b6ff}
.hp-panel[data-product="skills"]{--hp-top:#2a1a02;--hp-bottom:#f5a524;--hp-tint:#ffe0a3}
.hp-stage{position:absolute;left:0;top:0;width:752px;height:640px;transform-origin:0 0;font-family:inherit}
.hp-stage *{box-sizing:border-box}
.hp-glow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 55% 23%,var(--hp-tint),transparent 65%);opacity:.25}
.hp-beam{position:absolute;inset:-40%;pointer-events:none;background:linear-gradient(115deg,transparent 43%,#eeebe420 48%,#eeebe440 50%,transparent 57%);filter:blur(14px)}
.hp-scene-heading{position:absolute;top:36px;left:56px;right:56px;display:flex;align-items:center;justify-content:space-between;font-size:13px;color:#eeebe4c9}
.hp-scene-heading strong{font-weight:500;letter-spacing:.03em}
.hp-status{border:1px solid #eeebe433;border-radius:20px;padding:5px 10px;font-size:10px;letter-spacing:.06em;text-transform:uppercase}
.hp-window{position:absolute;left:56px;top:94px;width:640px;height:440px;border-radius:18px;background:#090e1def;border:1px solid #eeebe42b;overflow:hidden;box-shadow:0 24px 64px #0007;color:#eeebe4}
.hp-window-head{height:46px;border-bottom:1px solid #eeebe41a;display:flex;align-items:center;gap:7px;padding:0 18px;font-size:11px;color:#eeebe48f;background:#eeebe405}
.hp-window-head i{height:6px;width:6px;border-radius:50%;background:#eeebe44d}
.hp-window-head span{margin-left:14px}
.hp-window-body{height:394px;position:relative}
.hp-footer{position:absolute;top:576px;left:30px;right:30px;text-align:center;font-size:13px;letter-spacing:.015em;color:#eeebe4c9}
.hp-footer-label{display:block;font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:#eeebe480;margin-bottom:10px}
.hp-kicker{position:absolute;left:24px;top:20px;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#eeebe488}
.hp-options{position:absolute;left:24px;right:24px;top:66px;display:flex;gap:16px}
.hp-option{position:relative;width:186px;height:234px;border:1px solid #eeebe42b;border-radius:13px;background:#eeebe40a;padding:16px;cursor:pointer;text-align:left;color:#eeebe4;display:flex;flex-direction:column;gap:12px}
.hp-option-title{font-size:10px;color:#eeebe49c;display:flex;justify-content:space-between}
.hp-option-preview{display:block;height:142px;border-radius:8px;background:#eeebe4;color:#151d30;padding:12px;position:relative;overflow:hidden}
.hp-option-preview[data-look="1"]{background:#233053;color:#eeebe4}
.hp-option-preview[data-look="2"]{background:#121a2c;color:#eeebe4;border:1px solid #eeebe433}
.hp-preview-search{display:flex;align-items:center;gap:6px;border-bottom:1px solid currentColor;padding-bottom:8px;opacity:.7;font-size:9px}
.hp-preview-row{display:flex;align-items:center;gap:7px;font-size:8px;margin-top:12px}
.hp-preview-row i{width:14px;height:14px;border-radius:4px;background:currentColor;opacity:.18}
.hp-option-preview[data-look="1"] .hp-preview-row{padding:4px;border-radius:4px;background:#eeebe415;margin-top:6px}
.hp-option-preview[data-look="2"] .hp-preview-row{border-left:2px solid #eeebe4;padding-left:6px}
.hp-option-caption{font-size:11px;font-weight:500}
.hp-check{position:absolute;right:-7px;top:-7px;width:25px;height:25px;border-radius:50%;background:#eeebe4;color:#101626;display:grid;place-items:center;font-size:14px;box-shadow:0 0 0 4px #eeebe41a}
.hp-caption{position:absolute;bottom:22px;left:24px;right:24px;font-size:11px;color:#eeebe46e;display:flex;justify-content:space-between}
.hp-install-card{position:absolute;top:38px;left:30px;right:30px;border:1px solid #eeebe426;border-radius:14px;padding:22px;background:#eeebe407}
.hp-install-card strong{display:block;font-size:24px;font-weight:500;letter-spacing:-.03em;margin:8px 0 13px}
.hp-install-card p{font-size:12px;color:#eeebe499;margin:0}
.hp-label{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#eeebe488}
.hp-terminal{position:absolute;top:214px;left:30px;right:30px;min-height:84px;padding:20px;border-radius:12px;background:#050914;border:1px solid #eeebe41f;font:13px/1.7 ui-monospace,SFMono-Regular,monospace;word-break:break-word}
.hp-terminal code{font:inherit;color:#eeebe4}
.hp-caret{display:inline-block;background:#eeebe4;width:6px;height:13px;vertical-align:-2px;margin-left:2px}
.hp-copy{position:absolute;bottom:35px;right:30px;padding:8px 13px;background:#eeebe4;color:#101626;border:0;border-radius:7px;font-size:11px;cursor:pointer;min-width:112px}
.hp-lib-row{position:absolute;left:30px;right:30px;height:62px;background:#eeebe408;border:1px solid #eeebe420;border-radius:11px;display:flex;gap:14px;align-items:center;padding:12px 16px;font-size:14px}
.hp-logo{width:32px;height:32px;border-radius:8px;object-fit:contain;background:#eeebe4}
.hp-lib-kind{margin-left:auto;border:1px solid #eeebe429;border-radius:6px;padding:5px 8px;font-size:10px;color:#eeebe4a6}
.hp-os-rail{position:absolute;inset:0 auto 0 0;width:150px;border-right:1px solid #eeebe41a;padding:22px 14px;background:#eeebe405}
.hp-os-brand{font-size:13px;margin-bottom:22px;letter-spacing:.05em}
.hp-module{display:flex;width:100%;gap:9px;align-items:center;height:43px;border:1px solid #eeebe421;background:#eeebe408;border-radius:8px;margin-bottom:9px;padding:0 10px;font-size:11px;text-align:left;color:#eeebe4;cursor:pointer}
.hp-module i{width:6px;height:6px;border-radius:2px;background:#eeebe4}
.hp-os-work{position:absolute;left:170px;top:24px;right:24px;bottom:24px}
.hp-os-title{font-size:22px;letter-spacing:-.03em;margin-top:34px;margin-bottom:12px;font-weight:500;line-height:1.3}
.hp-os-copy{font-size:12px;line-height:1.7;color:#eeebe48c;max-width:330px}
.hp-connected{display:inline-flex;gap:8px;align-items:center;border:1px solid #eeebe43b;border-radius:8px;padding:9px 12px;font-size:11px;margin-top:42px}
.hp-browser{position:absolute;left:170px;top:32px;right:24px;height:314px;border:1px solid #eeebe42b;border-radius:11px;overflow:hidden;background:#eeebe4;color:#101626}
.hp-browser-tab{height:35px;background:#d8d7d3;padding:10px 14px;font-size:10px}
.hp-address{margin:9px 12px;background:#faf9f5;border-radius:5px;padding:6px 9px;font-size:9px;color:#535866}
.hp-load-track{height:2px;background:#c5c7cd}
.hp-load-bar{height:2px;background:#303f5c;transform-origin:left}
.hp-browser-page{padding:22px 24px}
.hp-browser-page strong{font-size:21px;line-height:1.2;font-weight:500;display:block;margin:10px 0 16px}
.hp-browser-page p{font-size:10px;color:#585d68;line-height:1.5;margin-bottom:18px}
.hp-browser-pills{display:flex;gap:6px}
.hp-browser-pills span{border:1px solid #c6c8d0;border-radius:5px;padding:5px 6px;font-size:9px}
.hp-lineage{position:absolute;left:170px;right:24px;top:27px}
.hp-lineage-row{height:52px;display:flex;align-items:center;gap:10px;border-bottom:1px solid #eeebe41a;font:11px ui-monospace,SFMono-Regular,monospace;white-space:nowrap}
.hp-lineage-row i{font-style:normal;color:#eeebe4;font-size:14px}
.hp-palette{background:#10101ceF;top:94px}
.hp-query{height:54px;display:flex;gap:12px;align-items:center;padding:0 22px;border-bottom:1px solid #eeebe41f;font-size:15px}
.hp-repo-head{display:flex;justify-content:space-between;padding:13px 22px 7px;font-size:9px;color:#eeebe475;letter-spacing:.06em;text-transform:uppercase}
.hp-repo{height:44px;margin:0 12px;padding:0 10px;display:flex;align-items:center;gap:10px;border-radius:7px;outline:none;cursor:pointer;text-decoration:none;color:#eeebe4}
.hp-repo-name{font-size:11px;flex:1;white-space:nowrap}
.hp-repo-stars{font-size:9px;color:#eeebe48c;width:63px;text-align:right;font-variant-numeric:tabular-nums}
.hp-license{font-size:8px;border:1px solid #eeebe42b;padding:3px 5px;border-radius:4px;width:67px;text-align:center}
.hp-rating{width:64px;height:4px;border-radius:4px;background:#eeebe419;overflow:hidden}
.hp-rating i{display:block;height:100%;background:#eeebe4;border-radius:4px;transform-origin:left}
.hp-repo-note{position:absolute;left:22px;bottom:18px;font-size:10px;color:#eeebe480}
.hp-graph{position:absolute;left:18px;top:46px;width:604px;height:277px;overflow:visible}
.hp-graph circle{cursor:pointer;outline:none}
.hp-graph circle:focus-visible{stroke:#eeebe4;stroke-width:3}
.hp-graph-labels{position:absolute;bottom:30px;left:24px;right:24px;display:flex;justify-content:space-between;align-items:flex-end;font-size:11px;color:#eeebe488}
.hp-graph-labels strong{display:block;color:#eeebe4;font-size:26px;font-weight:500;margin-bottom:7px;letter-spacing:-.03em}
.hp-count{position:absolute;top:29px;left:30px;font-size:46px;line-height:1;letter-spacing:-.05em;font-variant-numeric:tabular-nums;font-weight:500}
.hp-count span{display:block;font-size:11px;letter-spacing:0;color:#eeebe48c;margin-top:10px}
.hp-component-grid{position:absolute;left:30px;right:30px;top:126px;display:grid;grid-template-columns:repeat(6,1fr);gap:12px}
.hp-component-tile{height:68px;border-radius:10px;border:1px solid #eeebe428;background:#eeebe408;display:flex;align-items:center;justify-content:center;padding:13px}
.hp-tile-lines{width:100%;display:grid;gap:6px}
.hp-tile-lines i{display:block;height:4px;background:#eeebe46b;border-radius:3px}
.hp-tile-lines i:last-child{width:65%;opacity:.5}
.hp-tile-switch{height:18px;width:34px;border:1px solid #eeebe44d;border-radius:20px;padding:3px;background:#eeebe416}
.hp-tile-switch i{width:10px;height:10px;background:#eeebe4;border-radius:50%;display:block;margin-left:auto}
.hp-tile-bars{display:flex;align-items:flex-end;gap:4px;height:26px}
.hp-tile-bars i{width:6px;background:#eeebe4aa;border-radius:2px}
.hp-glyph-fallback{flex:none}
.hp-glyph-fallback .pg{width:100%;max-width:200px;height:auto;margin-inline:auto}
.hp-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.hp-panel button:focus-visible,.hp-repo:focus-visible{outline:2px solid #eeebe4;outline-offset:4px}
@media(prefers-reduced-motion:reduce){.hp-panel *{scroll-behavior:auto;transition:none!important}}
`;
