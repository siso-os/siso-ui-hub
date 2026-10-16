// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/home-products/ui-hub/UiHubDemo.tsx)
'use client';

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { ProductGlyph } from '../../ProductGlyph';
import { GitHubMark } from '../../ui/GitHubButton';
import { UI_HUB } from '../productData';

// A working miniature of the UI Hub, the way Agent Base's card is a miniature of Agent Base. Shaan, 9 Oct: "one of the views is
// going to ... show our 21st.dev clone with all of our extra stuff", "one which shows all of the icons of the different
// companies ... we've indexed them", "one with ... the skills ... make that one actually decent", "one maybe show some preview
// URLs", "show the different categories of like components You can click through and then the side nav changes all the
// component types or you can do themes or you can do images 3d assets".
// Everything shown is real and counted in productData.ts (UI_HUB): the bank's own previews, real names and authors, real
// theme tokens, CC0 Poly Haven and ambientCG thumbnails, a real ui-pick run, and live URLs we built.
// The stage is drawn at 752x640 and scaled to fit, so every position below is in stage pixels.

export const UH_TABS = [
  { key: 'catalogue', label: 'The catalogue', desc: '8,538 components, plus themes, images and 3D. Click a category and the grid changes.' },
  { key: 'sources', label: 'Indexed from everywhere', desc: '53,843 open UI resources from 21st.dev, GitHub, shadcn, Iconify and more.' },
  { key: 'skills', label: 'Skills that use it', desc: 'Your agent opens a skill, reads it and runs it. Here ui-pick ranks 138 picks.' },
  { key: 'previews', label: 'Live previews', desc: 'Sites built with the hub’s site kit, live now. Flip through them.' },
] as const;
export const UH_DUR = 10000;

const IMG = '/siso-img/ui-hub/';
const fmt = (n: number) => n.toLocaleString('en-US');
const KINDS = UI_HUB.kinds;

// The catalogue's story: each step is one click, and its target is on screen before the click lands.
type Step = { at: number; k: number; g: number; s: number | null; target: string };
const STEPS: Step[] = [
  { at: 0, k: 0, g: 0, s: null, target: 'k0' },
  { at: 1500, k: 0, g: 0, s: 1, target: 'c1' },
  { at: 3000, k: 0, g: 1, s: null, target: 'g1' },
  { at: 4000, k: 0, g: 1, s: 2, target: 'c2' },
  { at: 5200, k: 1, g: 0, s: null, target: 'k1' },
  { at: 6200, k: 1, g: 0, s: 2, target: 'c2' },
  { at: 7300, k: 2, g: 0, s: null, target: 'k2' },
  { at: 8200, k: 2, g: 1, s: null, target: 'g1' },
  { at: 9100, k: 3, g: 0, s: null, target: 'k3' },
];

const CSS = `
.uhd{position:relative;width:100%;height:100%;overflow:hidden;isolation:isolate;color:#e8eefc;font-family:Inter,sans-serif;
  background:radial-gradient(55% 40% at 50% -4%,#9cc0ff80,transparent 70%),radial-gradient(60% 50% at 80% 110%,#5b95ff66,transparent 70%),
    linear-gradient(160deg,#06123a 0%,#0f3aa6 30%,#1f69ff 58%,#2f78ff 72%,#1546c4 88%,#06123a 100%)}
.uhd-stage{position:absolute;left:50%;top:50%;width:752px;height:640px;transform-origin:50% 50%}
.uhd-stage *{box-sizing:border-box}
:where(.uhd) button{font:inherit;color:inherit;border:0;background:none;padding:0;cursor:pointer;text-align:inherit}
.uhd-crumb{position:absolute;top:18px;left:26px;display:flex;align-items:center;gap:9px;font-size:13px;font-weight:600;color:#fff;text-shadow:0 1px 12px #0006}
.uhd-crumb span{font-weight:400;color:#ffffffa6}
.uhd-crumb a{margin-left:auto}
.uhd-win{position:absolute;left:24px;top:54px;width:704px;height:566px;border-radius:16px;background:#0d0f16;overflow:hidden;
  box-shadow:0 0 0 1px #ffffff1f,0 40px 90px -20px #020a2a,0 10px 30px -10px #0009}
.uhd-bar{position:absolute;inset:0 0 auto 0;height:38px;display:flex;align-items:center;gap:10px;padding:0 12px;border-bottom:1px solid #ffffff0f;background:#12141c}
.uhd-lights{display:flex;gap:6px}.uhd-lights i{width:9px;height:9px;border-radius:50%;background:#ffffff24}
.uhd-brand{display:flex;align-items:center;gap:7px;margin-left:8px;font-size:11.5px;font-weight:600;color:#fff}
.uhd-search{margin:0 auto;width:300px;height:26px;border-radius:8px;background:#ffffff0a;box-shadow:inset 0 0 0 1px #ffffff14;display:flex;align-items:center;gap:7px;padding:0 9px;
  font-size:11px;color:#e8eefc80}
.uhd-search kbd{margin-left:auto;font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;padding:3px 5px;border-radius:5px;background:#ffffff0f;color:#e8eefc99}
.uhd-gh{display:flex;align-items:center;gap:6px;height:26px;padding:0 9px;border-radius:8px;font-size:11px;color:#e8eefccc;background:#ffffff0a;box-shadow:inset 0 0 0 1px #ffffff14;
  text-decoration:none;transition:all .35s cubic-bezier(.19,1,.22,1)}
.uhd-gh:hover{color:#fff;transform:translateY(-1px);box-shadow:inset 0 0 0 1px #1f69ff,0 6px 18px -8px #1f69ff}
.uhd-body{position:absolute;inset:38px 0 0 0;display:flex}
.uhd-rail{width:50px;flex:none;border-right:1px solid #ffffff0d;display:flex;flex-direction:column;align-items:center;gap:6px;padding-top:12px;background:#0b0d13}
.uhd-ri{position:relative;width:36px;height:36px;border-radius:11px;display:grid;place-items:center;color:#e8eefc8c;transition:background .35s,box-shadow .35s,color .35s,transform .35s cubic-bezier(.19,1,.22,1)}
.uhd-ri:hover{background:#ffffff0d;color:#fff;transform:translateY(-1px)}
.uhd-ri svg{transition:transform .4s cubic-bezier(.19,1,.22,1)}.uhd-ri:hover svg{transform:scale(1.1) rotate(-6deg)}
.uhd-ri[aria-pressed=true]{background:#1f69ff26;color:#cfe0ff;box-shadow:inset 0 0 0 1px #1f69ff99,0 0 18px -6px #1f69ff}
.uhd-ri[data-name]:hover::after{content:attr(data-name);position:absolute;left:44px;top:50%;transform:translateY(-50%);z-index:9;white-space:nowrap;padding:5px 8px;border-radius:7px;
  background:#1a1d27;box-shadow:0 0 0 1px #ffffff1f;font-size:10px;color:#fff}
.uhd-main{flex:1;min-width:0;position:relative;animation:uhd-in .5s cubic-bezier(.19,1,.22,1)}
.uhd-lbl{font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#e8eefc73}
/* catalogue */
.uhd-kinds{height:46px;display:flex;align-items:center;gap:6px;padding:0 14px;border-bottom:1px solid #ffffff0b}
.uhd-kind{height:28px;padding:0 12px;border-radius:9px;font-size:11.5px;color:#e8eefca6;transition:all .35s cubic-bezier(.19,1,.22,1)}
.uhd-kind:hover{color:#fff;background:#ffffff0a}
.uhd-kind[aria-pressed=true]{color:#fff;background:#1f69ff;box-shadow:0 6px 18px -8px #1f69ff,inset 0 1px 0 #ffffff40}
.uhd-kinds .tot{margin-left:auto;font:500 10px/1 'Geist Mono',ui-monospace,monospace;color:#e8eefc80}
.uhd-kinds .tot b{color:#cfe0ff;font-weight:500}
.uhd-cat{position:absolute;inset:46px 0 0 0;display:flex}
.uhd-side{width:164px;flex:none;border-right:1px solid #ffffff0b;padding:12px 8px;background:#0f1119}
.uhd-side .uhd-lbl{display:block;padding:0 8px 9px}
.uhd-grp{position:relative;display:flex;align-items:center;width:100%;height:29px;padding:0 9px;border-radius:8px;font-size:11.5px;color:#e8eefcbf;transition:background .3s,color .3s}
.uhd-grp:hover{background:#ffffff0a;color:#fff}
.uhd-grp[aria-current=true]{background:#1f69ff1f;color:#fff;box-shadow:inset 0 0 0 1px #1f69ff59}
.uhd-grp[aria-current=true]::before{content:'';position:absolute;left:0;top:7px;bottom:7px;width:2px;border-radius:2px;background:#5b95ff;box-shadow:0 0 8px #1f69ff}
.uhd-grp span{margin-left:auto;font:500 10px/1 'Geist Mono',ui-monospace,monospace;color:#e8eefc73}
.uhd-grp[aria-current=true] span{color:#9cc0ff}
.uhd-side-in{animation:uhd-in .45s cubic-bezier(.19,1,.22,1)}
.uhd-grid-wrap{flex:1;min-width:0;position:relative;padding:12px 14px}
.uhd-ghead{display:flex;align-items:baseline;gap:8px;margin-bottom:10px}
.uhd-ghead b{font:600 15px/1 Inter,sans-serif;letter-spacing:-.02em;color:#fff}
.uhd-ghead span{font:500 10px/1 'Geist Mono',ui-monospace,monospace;color:#e8eefc80}
.uhd-ghead em{margin-left:auto;font-style:normal;font-size:10px;color:#e8eefc80;display:flex;align-items:center;gap:5px}
.uhd-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.uhd-card{position:relative;display:block;width:100%;border-radius:11px;overflow:hidden;background:#151823;box-shadow:inset 0 0 0 1px #ffffff12;
  transition:transform .4s cubic-bezier(.19,1,.22,1),box-shadow .4s;animation:uhd-up .5s cubic-bezier(.19,1,.22,1) both;animation-delay:calc(var(--i) * 45ms)}
.uhd-card:hover{transform:translateY(-2px);box-shadow:inset 0 0 0 1px #5b95ff80,0 12px 26px -14px #1f69ff}
.uhd-card[aria-pressed=true]{box-shadow:inset 0 0 0 1.5px #5b95ff,0 0 0 3px #1f69ff40,0 12px 26px -12px #1f69ff}
.uhd-thumb{position:relative;aspect-ratio:16/10;overflow:hidden;background:#0a0b10}
.uhd-thumb img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.19,1,.22,1)}
.uhd-card:hover .uhd-thumb img{transform:scale(1.05)}
.uhd-cap{display:flex;flex-direction:column;gap:3px;padding:7px 9px 8px}
.uhd-cap b{font-size:11px;font-weight:500;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.uhd-cap span{font:400 9.5px/1.1 'Geist Mono',ui-monospace,monospace;color:#e8eefc73;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.uhd-code{position:absolute;top:6px;right:6px;padding:3px 6px;border-radius:6px;background:#0b0d14cc;backdrop-filter:blur(6px);font:600 8.5px/1 'Geist Mono',ui-monospace,monospace;color:#9cc0ff;letter-spacing:.06em}
/* a theme, drawn from its own tokens */
.uhd-theme{position:absolute;inset:0;padding:10px 11px;display:flex;flex-direction:column;gap:6px}
.uhd-theme .aa{font-size:18px;font-weight:600;letter-spacing:-.02em;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.uhd-theme .ln{height:3px;border-radius:2px;opacity:.35}
.uhd-theme .row{display:flex;gap:5px;margin-top:auto;align-items:center}
.uhd-theme .btn{height:15px;padding:0 8px;border-radius:5px;font-size:8px;font-weight:600;display:grid;place-items:center}
.uhd-theme .sw{display:flex;margin-left:auto}.uhd-theme .sw i{width:11px;height:11px;border-radius:50%;margin-left:-3px;box-shadow:0 0 0 1.5px #ffffffcc}
/* the extras drawer */
.uhd-drawer{position:absolute;left:14px;right:14px;bottom:12px;height:96px;border-radius:13px;display:flex;gap:12px;padding:10px;
  background:#141826f2;backdrop-filter:blur(10px);box-shadow:inset 0 0 0 1px #5b95ff4d,0 -12px 30px -12px #000,0 0 30px -14px #1f69ff;animation:uhd-drawer .5s cubic-bezier(.19,1,.22,1) both}
.uhd-drawer .pic{width:122px;flex:none;border-radius:8px;overflow:hidden;background:#0a0b10;position:relative}
.uhd-drawer .pic img{width:100%;height:100%;object-fit:cover}
.uhd-drawer .info{flex:1;min-width:0;display:flex;flex-direction:column;gap:6px}
.uhd-drawer .t{display:flex;align-items:baseline;gap:8px}
.uhd-drawer .t b{font-size:12.5px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.uhd-drawer .t span{font:400 10px/1 'Geist Mono',ui-monospace,monospace;color:#e8eefc80;white-space:nowrap}
.uhd-chips{display:flex;flex-wrap:wrap;gap:4px}
.uhd-chips i{font-style:normal;font-size:9.5px;padding:3px 7px;border-radius:99px;background:#ffffff0d;color:#e8eefcbf;box-shadow:inset 0 0 0 1px #ffffff14}
.uhd-chips i.ok{background:#1f69ff26;color:#cfe0ff;box-shadow:inset 0 0 0 1px #1f69ff80}
.uhd-cmd{margin-top:auto;display:flex;align-items:center;gap:7px;height:24px;padding:0 9px;border-radius:7px;background:#0a0c12;box-shadow:inset 0 0 0 1px #ffffff12;
  font:400 10px/1 'Geist Mono',ui-monospace,monospace;color:#e8eefccc;white-space:nowrap;overflow:hidden}
.uhd-cmd s{text-decoration:none;color:#5b95ff}
/* the pointer glides by transform (left/top transitions re-laid out the window every frame of the glide) */
.uhd-cur{position:absolute;left:0;top:0;z-index:20;width:18px;height:18px;pointer-events:none;transition:transform .7s cubic-bezier(.65,0,.35,1),opacity .4s;
  filter:drop-shadow(0 3px 6px #0009)}
.uhd-cur::after{content:'';position:absolute;left:-9px;top:-9px;width:18px;height:18px;border-radius:50%;box-shadow:0 0 0 2px #9cc0ff;opacity:0}
.uhd-cur[data-click]::after{animation:uhd-click .5s ease-out}
/* sources */
.uhd-src{position:absolute;inset:0;padding:16px 14px;display:flex;flex-direction:column;gap:12px}
.uhd-big{display:flex;align-items:flex-end;gap:16px}
.uhd-big b{font:600 46px/0.9 Inter,sans-serif;letter-spacing:-.045em;color:#fff;font-variant-numeric:tabular-nums;text-shadow:0 0 30px #1f69ff80}
.uhd-big div{display:flex;flex-direction:column;gap:5px;padding-bottom:3px}
.uhd-big div span:first-child{font-size:13px;color:#fff;font-weight:500}
.uhd-big div span+span{font-size:10.5px;color:#e8eefc8c}
.uhd-big .live{margin-left:auto;align-self:flex-start;display:flex;align-items:center;gap:6px;font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#9cc0ff}
.uhd-big .live i{width:6px;height:6px;border-radius:50%;background:#5b95ff;box-shadow:0 0 8px #5b95ff;animation:uhd-blink 1.4s ease-in-out infinite}
.uhd-wall{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.uhd-tile{position:relative;display:flex;align-items:center;gap:8px;height:56px;padding:0 8px;border-radius:11px;background:#141722;box-shadow:inset 0 0 0 1px #ffffff10;
  transition:transform .4s cubic-bezier(.19,1,.22,1),box-shadow .5s,background .5s;cursor:default}
.uhd-tile:hover{transform:translateY(-2px);box-shadow:inset 0 0 0 1px #5b95ff,0 10px 24px -12px #1f69ff}
.uhd-tile .lg{width:28px;height:28px;flex:none;border-radius:8px;overflow:hidden;display:grid;place-items:center;background:#0b0c10;box-shadow:0 0 0 1px #ffffff1a;
  filter:grayscale(1) brightness(.75);transition:filter .6s,transform .4s cubic-bezier(.19,1,.22,1)}
.uhd-tile .lg img{width:100%;height:100%;object-fit:cover}
.uhd-tile:hover .lg{transform:scale(1.1) rotate(-6deg)}
.uhd-tile .tx{display:flex;flex-direction:column;gap:3px;min-width:0}
.uhd-tile .tx>span{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.uhd-tile .tx b{font:600 13px/1 Inter,sans-serif;letter-spacing:-.03em;color:#ffffff80;font-variant-numeric:tabular-nums;transition:color .5s}
.uhd-tile .tx em{font-style:normal;font-size:9px;letter-spacing:-.01em;color:#e8eefc8c;margin-left:3px}
.uhd-tile .tx>span+span{font-size:10px;color:#e8eefc73}
.uhd-tile .ck{position:absolute;top:-5px;right:-5px;width:14px;height:14px;border-radius:50%;display:grid;place-items:center;background:#1f69ff;color:#fff;font-size:8px;box-shadow:0 0 0 2px #0d0f16;
  transform:scale(0);transition:transform .45s cubic-bezier(.34,1.56,.64,1)}
.uhd-tile[data-lit]{background:#161c2e;box-shadow:inset 0 0 0 1px #1f69ff59}
.uhd-tile[data-lit] .lg{filter:none}
.uhd-tile[data-lit] .tx b{color:#fff}
.uhd-tile[data-lit] .ck{transform:scale(1)}
.uhd-tile[data-now]{box-shadow:inset 0 0 0 1px #9cc0ff,0 0 24px -6px #1f69ff}
.uhd-bars{display:grid;grid-template-columns:1fr 1fr;gap:5px 22px;margin-top:2px}
.uhd-bars .uhd-lbl{grid-column:1/-1;margin-bottom:3px}
.uhd-bar-row{display:grid;grid-template-columns:104px 1fr 42px;align-items:center;gap:8px;font-size:10px;color:#e8eefcb3}
.uhd-bar-row i{height:6px;border-radius:3px;background:#ffffff0d;overflow:hidden;position:relative}
.uhd-bar-row i::after{content:'';position:absolute;inset:0;transform-origin:0 50%;transform:scaleX(var(--w));background:linear-gradient(90deg,#1f69ff,#9cc0ff);
  transition:transform 1.2s cubic-bezier(.19,1,.22,1)}
.uhd-bar-row span{text-align:right;font:500 10px/1 'Geist Mono',ui-monospace,monospace;color:#cfe0ff}
/* skills */
.uhd-sk{position:absolute;inset:0;display:flex}
.uhd-sklist{width:196px;flex:none;border-right:1px solid #ffffff0b;padding:12px 8px;background:#0f1119;display:flex;flex-direction:column;gap:3px}
.uhd-sklist .head{display:flex;align-items:baseline;justify-content:space-between;padding:0 8px 8px}
.uhd-sklist .head b{font:600 10px/1 'Geist Mono',ui-monospace,monospace;color:#9cc0ff}
.uhd-skrow{display:flex;gap:9px;align-items:flex-start;width:100%;padding:8px;border-radius:10px;transition:background .3s,box-shadow .3s}
.uhd-skrow:hover{background:#ffffff0a}
.uhd-skrow[aria-current=true]{background:#1f69ff1f;box-shadow:inset 0 0 0 1px #1f69ff73}
.uhd-skrow .ic{width:24px;height:24px;flex:none;border-radius:7px;display:grid;place-items:center;background:#ffffff0a;color:#9cc0ff;box-shadow:inset 0 0 0 1px #ffffff14;transition:all .35s}
.uhd-skrow[aria-current=true] .ic{background:#1f69ff;color:#fff;box-shadow:0 0 14px -3px #1f69ff}
.uhd-skrow .tx{display:flex;flex-direction:column;gap:3px;min-width:0}
.uhd-skrow .tx b{font:500 10.5px/1.2 'Geist Mono',ui-monospace,monospace;color:#fff}
.uhd-skrow .tx span{font-size:9.5px;line-height:1.35;color:#e8eefc80;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.uhd-skmain{flex:1;min-width:0;padding:12px 14px;display:flex;flex-direction:column;gap:10px}
.uhd-file{border-radius:12px;background:#11131b;box-shadow:inset 0 0 0 1px #ffffff12;overflow:hidden;animation:uhd-up .45s cubic-bezier(.19,1,.22,1) both}
.uhd-file .fh{display:flex;align-items:center;gap:8px;height:32px;padding:0 10px;border-bottom:1px solid #ffffff0b;font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;color:#e8eefcb3}
.uhd-file .fh b{color:#fff;font-weight:500}
.uhd-run{margin-left:auto;display:flex;align-items:center;gap:6px;height:22px;padding:0 9px;border-radius:7px;background:#1f69ff;color:#fff;font:600 10px/1 Inter,sans-serif;
  box-shadow:0 6px 16px -8px #1f69ff;transition:transform .35s cubic-bezier(.19,1,.22,1),box-shadow .35s}
.uhd-run:hover{transform:translateY(-1px);box-shadow:0 8px 20px -6px #1f69ff}
.uhd-run[data-press]{animation:uhd-press .5s ease-out}
.uhd-md{padding:10px 12px;font:400 10.5px/1.65 'Geist Mono',ui-monospace,monospace;color:#c9d4ee}
.uhd-md p{margin:0}
.uhd-md .fm{color:#e8eefc59}
.uhd-md .k{color:#9cc0ff}
.uhd-md h4{margin:6px 0 2px;font:600 13px/1.3 Inter,sans-serif;color:#fff;letter-spacing:-.01em}
.uhd-md .body{font-family:Inter,sans-serif;font-size:11px;line-height:1.55;color:#e8eefcb3}
.uhd-term{flex:1;min-height:0;border-radius:12px;background:#07080c;box-shadow:inset 0 0 0 1px #ffffff14,0 -10px 30px -16px #1f69ff;padding:12px 14px;
  font:400 10.5px/1.75 'Geist Mono',ui-monospace,monospace;color:#d6dcea;overflow:hidden;animation:uhd-up .5s cubic-bezier(.19,1,.22,1) both}
.uhd-term .th{display:flex;align-items:center;gap:7px;margin-bottom:8px;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:#e8eefc66}
.uhd-term .th i{width:6px;height:6px;border-radius:50%;background:#5b95ff;box-shadow:0 0 8px #5b95ff}
.uhd-term p{margin:0;white-space:pre;overflow:hidden;text-overflow:ellipsis;animation:uhd-up .35s cubic-bezier(.19,1,.22,1) both}
.uhd-term .pr{color:#5b95ff}.uhd-term .dim{color:#8790a8}.uhd-term .ok{color:#6fdc95}
.uhd-term .rk{display:grid;grid-template-columns:34px 1fr 82px;align-items:center;gap:8px;white-space:nowrap}
.uhd-term .rk i{height:5px;border-radius:3px;background:linear-gradient(90deg,#1f69ff,#9cc0ff);transform-origin:0 50%;animation:uhd-grow .8s cubic-bezier(.19,1,.22,1) both}
.uhd-term .rk em{font-style:normal;color:#e8eefc80;overflow:hidden;text-overflow:ellipsis}
.uhd-term .nm{display:block;color:#fff}
.uhd-spin{display:inline-block;width:9px;height:9px;margin-right:6px;border-radius:50%;border:1.5px solid #5b95ff;border-top-color:transparent;vertical-align:-1px;animation:uhd-spin .8s linear infinite}
.uhd-caret{display:inline-block;width:6px;height:12px;margin-left:1px;vertical-align:-2px;background:#9cc0ff;animation:uhd-blink 1s steps(1) infinite}
/* previews */
.uhd-pv{position:absolute;inset:0;display:flex}
.uhd-pvlist{width:186px;flex:none;border-right:1px solid #ffffff0b;padding:12px 8px;background:#0f1119;display:flex;flex-direction:column;gap:3px}
.uhd-pvlist .uhd-lbl{padding:0 8px 8px}
.uhd-pvrow{display:flex;align-items:center;gap:9px;width:100%;padding:6px 8px;border-radius:9px;transition:background .3s,box-shadow .3s}
.uhd-pvrow:hover{background:#ffffff0a}
.uhd-pvrow[aria-current=true]{background:#1f69ff1f;box-shadow:inset 0 0 0 1px #1f69ff73}
.uhd-pvrow .mini{width:34px;height:24px;flex:none;border-radius:5px;overflow:hidden;box-shadow:0 0 0 1px #ffffff1f;background:#0a0b10}
.uhd-pvrow .mini img{width:100%;height:auto;display:block}
.uhd-pvrow .tx{display:flex;flex-direction:column;gap:3px;min-width:0}
.uhd-pvrow .tx b{font-size:11px;font-weight:500;color:#fff}
.uhd-pvrow .tx span{font-size:9.5px;color:#e8eefc80;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.uhd-pvmain{flex:1;min-width:0;position:relative}
.uhd-deck{position:absolute;left:50%;top:44px;width:384px;height:388px;margin-left:-192px}
.uhd-bc{position:absolute;inset:0;border-radius:14px;overflow:hidden;background:#12141c;box-shadow:0 0 0 1px #ffffff1f,0 24px 50px -18px #000;
  transition:transform .7s cubic-bezier(.19,1,.22,1),opacity .6s,filter .6s;transform-origin:50% 0}
.uhd-bc[data-pos='0']{z-index:4;transform:none}
.uhd-bc[data-pos='1']{z-index:3;transform:translateY(-16px) scale(.94);filter:brightness(.55)}
.uhd-bc[data-pos='2']{z-index:2;transform:translateY(-30px) scale(.88);filter:brightness(.35)}
.uhd-bc[data-pos='out']{z-index:5;transform:translate(-118%,30px) rotate(-9deg);opacity:0}
.uhd-bc[data-pos='hide']{z-index:1;transform:translateY(-40px) scale(.82);opacity:0}
.uhd-bc .chrome{display:flex;align-items:center;gap:8px;height:34px;padding:0 10px;background:#171a24;border-bottom:1px solid #ffffff0d}
.uhd-bc .chrome .uhd-lights i{width:8px;height:8px}
.uhd-bc .url{flex:1;min-width:0;height:22px;border-radius:7px;background:#ffffff0a;display:flex;align-items:center;gap:6px;padding:0 8px;font:400 9.5px/1 'Geist Mono',ui-monospace,monospace;color:#e8eefcbf;white-space:nowrap;overflow:hidden}
.uhd-bc .url i{width:6px;height:6px;flex:none;border-radius:50%;background:#6fdc95;box-shadow:0 0 6px #6fdc95}
.uhd-bc .view{position:absolute;inset:34px 0 0 0;overflow:hidden;background:#fff}
.uhd-bc .view img{display:block;width:100%;height:auto}
.uhd-bc[data-pos='0'] .view img{animation:uhd-pan var(--pan) cubic-bezier(.45,0,.25,1) both}
.uhd-pvctl{position:absolute;left:0;right:0;bottom:22px;display:flex;align-items:center;justify-content:center;gap:10px}
.uhd-pvctl button{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:#ffffff0d;box-shadow:inset 0 0 0 1px #ffffff1a;color:#e8eefccc;
  transition:all .35s cubic-bezier(.19,1,.22,1)}
.uhd-pvctl button:hover{color:#fff;transform:translateY(-1px);box-shadow:inset 0 0 0 1px #5b95ff,0 6px 16px -8px #1f69ff}
.uhd-pvctl span{font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;color:#e8eefc99;min-width:36px;text-align:center}
.uhd-pvctl a{display:flex;align-items:center;gap:6px;height:30px;padding:0 13px;border-radius:9px;background:#fff;color:#0b0d14;font:600 11px/1 Inter,sans-serif;text-decoration:none;
  transition:transform .35s cubic-bezier(.19,1,.22,1),box-shadow .35s}
.uhd-pvctl a:hover{transform:translateY(-2px);box-shadow:0 10px 24px -10px #1f69ff}
@keyframes uhd-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes uhd-up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes uhd-drawer{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes uhd-click{0%{opacity:.9;transform:scale(.4)}100%{opacity:0;transform:scale(1.6)}}
@keyframes uhd-press{0%{transform:scale(1)}30%{transform:scale(.92)}100%{transform:scale(1)}}
@keyframes uhd-blink{50%{opacity:.25}}
@keyframes uhd-spin{to{transform:rotate(360deg)}}
@keyframes uhd-grow{from{transform:scaleX(0)}to{transform:scaleX(var(--w))}}
@keyframes uhd-pan{0%,12%{transform:translateY(0)}100%{transform:translateY(var(--dy))}}
.uhd:not([data-live]) *{animation-play-state:paused!important}
@media (max-width:991px){.uhd{height:auto;aspect-ratio:752/640}}
@media (prefers-reduced-motion:reduce){.uhd *{animation:none!important;transition:none!important}}
`;

function Svg({ children, size = 16 }: { children: ReactNode; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
}
// The rail: one icon per view, in the order of the card's clickables.
const RAIL_ICONS = [
  <><rect x="3.5" y="3.5" width="7" height="7" rx="2" /><rect x="13.5" y="3.5" width="7" height="7" rx="2" /><rect x="3.5" y="13.5" width="7" height="7" rx="2" /><rect x="13.5" y="13.5" width="7" height="7" rx="2" /></>,
  <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5a13 13 0 0 1 0 17M12 3.5a13 13 0 0 0 0 17" /></>,
  <><path d="M12 3.5l2.2 5.3 5.3 2.2-5.3 2.2L12 18.5l-2.2-5.3L4.5 11l5.3-2.2z" /><path d="M18.5 16.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" /></>,
  <><rect x="3" y="4.5" width="18" height="15" rx="3" /><path d="M3 9h18M6.5 6.8h.01M9 6.8h.01" /></>,
];
const SKILL_ICON = <Svg size={13}><path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10A.5.5 0 0 1 7 20z" /><path d="M14 3.5V8h4M9.5 12.5h5M9.5 16h3.5" /></Svg>;

type Pick = { k: number; g: number; s: number | null };

/** t: ms since this tab began (held at UH_DUR when reduced motion). running: in view, so loops may play. */
export default function UiHubDemo({ tab, t, running, onTab }: { tab: number; t: number; running: boolean; onTab?: (i: number) => void }) {
  const box = useRef<HTMLDivElement>(null);
  const win = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [pick, setPick] = useState<Pick | null>(null);
  const [skill, setSkill] = useState<number | null>(null);
  const [runFrom, setRunFrom] = useState<number | null>(null);
  const [card, setCard] = useState<number | null>(null);
  const [pointer, setPointer] = useState(false);
  const [cur, setCur] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = box.current; if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(e.contentRect.width / 752, e.contentRect.height / 640)));
    ro.observe(el); return () => ro.disconnect();
  }, []);
  useEffect(() => { setPick(null); setSkill(null); setRunFrom(null); setCard(null); }, [tab]);

  const key = UH_TABS[tab].key;
  const tc = Math.min(t, UH_DUR);

  // Catalogue: where the story is, unless you have clicked.
  const stepIdx = STEPS.reduce((acc, s, i) => (tc >= s.at ? i : acc), 0);
  const step = STEPS[stepIdx];
  const view: Pick = pick ?? step;
  const kind = KINDS[view.k];
  const group = kind.groups[view.g];
  const nextStep = STEPS[stepIdx + 1];
  const auto = key === 'catalogue' && !pick && !pointer && running;
  const curTarget = auto ? (nextStep && nextStep.at - tc < 900 ? nextStep.target : step.target) : null;

  // The pointer glides to whatever the next click lands on (read from the layout, in stage pixels).
  useLayoutEffect(() => {
    if (!curTarget || !win.current) { setCur(null); return; }
    const el = win.current.querySelector<HTMLElement>(`[data-t="${curTarget}"]`);
    if (!el) return;
    const w = win.current.getBoundingClientRect(), r = el.getBoundingClientRect();
    const x = (r.left - w.left + r.width * 0.62) / scale, y = (r.top - w.top + r.height * 0.6) / scale;
    setCur(c => (c && Math.abs(c.x - x) < 0.5 && Math.abs(c.y - y) < 0.5 ? c : { x, y }));
  }, [curTarget, scale, view.k, view.g]);

  // Sources: tiles light in turn; the big number counts up.
  const lit = Math.floor((tc - 400) / 330);
  const counted = Math.round(UI_HUB.indexed * (1 - Math.pow(1 - Math.min(1, tc / 1600), 3)));

  // Skills: ui-pick opens, then runs. Clicking Run replays from the run's start.
  const autoSkill = tc >= 600 ? 0 : null;
  const sk = skill ?? autoSkill;
  const rt = runFrom !== null ? t - runFrom + 2700 : tc;
  const showRun = sk === 0 && (rt >= 2800 || runFrom !== null);
  const cmd = `python3 pick.py "${UI_HUB.pickRun.need}"`;
  const typed = cmd.slice(0, Math.max(0, Math.floor((rt - 2900) / 30)));
  const asking = rt >= 2900 + cmd.length * 30 + 100;
  const answered = rt >= 5600;
  const rows = UI_HUB.pickRun.rows.filter((_, i) => rt >= 5900 + i * 320);
  const next = rt >= 7700;

  // Previews: one card every 1.65s, or wherever you flipped to.
  const pv = card ?? Math.min(UI_HUB.previews.length - 1, Math.floor(tc / 1650));
  const n = UI_HUB.previews.length;
  const flip = (d: number) => setCard(((pv + d) % n + n) % n);

  const crumb = ['Catalogue', 'Sources', 'Skills', 'Previews'][tab];

  return (
    <div ref={box} className="uhd" data-live={running || undefined} onPointerEnter={() => setPointer(true)} onPointerLeave={() => setPointer(false)}>
      <style>{CSS}</style>
      <div className="uhd-stage" style={{ transform: `translate(-50%,-50%) scale(${scale})` }}>
        <div className="uhd-crumb"><ProductGlyph product="ui-hub" size={22} />UI Hub <span>/ {crumb}</span></div>

        <div className="uhd-win" ref={win}>
          <div className="uhd-bar">
            <span className="uhd-lights"><i /><i /><i /></span>
            <span className="uhd-search"><Svg size={12}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></Svg>Search {fmt(UI_HUB.bank.components)} components, themes, skills<kbd>⌘K</kbd></span>
            <a className="uhd-gh" href={UI_HUB.repoUrl} target="_blank" rel="noopener noreferrer"><GitHubMark size={13} />Open source</a>
          </div>

          <div className="uhd-body">
            <div className="uhd-rail">
              {UH_TABS.map((x, i) => <button type="button" key={x.key} className="uhd-ri" data-name={x.label} aria-label={x.label} aria-pressed={tab === i}
                onClick={() => onTab?.(i)}><Svg size={18}>{RAIL_ICONS[i]}</Svg></button>)}
            </div>

            {key === 'catalogue' && <div className="uhd-main" key="cat">
              <div className="uhd-kinds">
                {KINDS.map((k, i) => <button type="button" key={k.key} data-t={`k${i}`} className="uhd-kind" aria-pressed={view.k === i}
                  onClick={() => setPick({ k: i, g: 0, s: null })}>{k.label}</button>)}
                <span className="tot"><b>{fmt(UI_HUB.bank.components)}</b> components · <b>{fmt(UI_HUB.bank.authors)}</b> authors</span>
              </div>
              <div className="uhd-cat">
                <div className="uhd-side"><div className="uhd-side-in" key={kind.key}>
                  <span className="uhd-lbl">{kind.label}</span>
                  {kind.groups.map((g, i) => <button type="button" key={g.key} data-t={`g${i}`} className="uhd-grp" aria-current={view.g === i}
                    onClick={() => setPick({ k: view.k, g: i, s: null })}>{g.label}<span>{fmt(g.n)}</span></button>)}
                </div></div>
                <Grid kindKey={kind.key} groupKey={group.key} label={group.label} n={group.n} sel={view.s}
                  onSel={s => setPick({ k: view.k, g: view.g, s })} />
              </div>
              {cur && <span className="uhd-cur" key="cur" data-click={tc - step.at < 500 && step.at > 0 ? '' : undefined} style={{ transform: `translate(${cur.x}px,${cur.y}px)` }}>
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 8-6 1.5L10 19z" fill="#fff" stroke="#0b0d14" strokeWidth="1.4" strokeLinejoin="round" /></svg>
              </span>}
            </div>}

            {key === 'sources' && <div className="uhd-main" key="src"><div className="uhd-src">
              <div className="uhd-big">
                <b>{fmt(counted)}</b>
                <div><span>open UI resources, indexed</span><span>{UI_HUB.coverage} of all GitHub UI repos over 100 stars</span></div>
                <span className="live"><i />Checked 8 Oct</span>
              </div>
              <div className="uhd-wall">
                {UI_HUB.sources.map((s, i) => <div key={s.name} className="uhd-tile" data-lit={i <= lit || undefined} data-now={i === lit || undefined} title={`${s.name}: ${fmt(s.n)} ${s.unit}`}>
                  <span className="lg">{s.logo === 'github' ? <span style={{ color: '#fff', display: 'grid' }}><GitHubMark size={18} /></span> : <img src={s.logo} alt="" loading="lazy" />}</span>
                  <span className="tx"><span><b>{fmt(s.n)}</b><em>{s.unit}</em></span><span>{s.name}</span></span>
                  <span className="ck">✓</span>
                </div>)}
              </div>
              <div className="uhd-bars">
                <span className="uhd-lbl">The index, by kind</span>
                {UI_HUB.categories.map(([label, v], i) => <div key={label} className="uhd-bar-row">{label}
                  <i style={{ ['--w' as string]: tc > 600 + i * 90 ? v / UI_HUB.categories[0][1] : 0 } as CSSProperties} /><span>{fmt(v)}</span></div>)}
              </div>
            </div></div>}

            {key === 'skills' && <div className="uhd-main" key="sk"><div className="uhd-sk">
              <div className="uhd-sklist">
                <div className="head"><span className="uhd-lbl">Skills</span><b>{UI_HUB.skillsMade} made</b></div>
                {UI_HUB.skills.map((s, i) => <button type="button" key={s.name} className="uhd-skrow" aria-current={sk === i} onClick={() => { setSkill(i); setRunFrom(null); }}>
                  <span className="ic">{SKILL_ICON}</span><span className="tx"><b>{s.name}</b><span>{s.desc}</span></span>
                </button>)}
              </div>
              <div className="uhd-skmain">
                {sk === null ? <div className="uhd-file" key="none"><div className="fh">Pick a skill</div>
                  <div className="uhd-md"><p className="body">Each one is a SKILL.md your agent reads, then follows.</p></div></div>
                  : <SkillFile i={sk} running={showRun} onRun={() => setRunFrom(t)} />}
                {showRun && <div className="uhd-term" key={`run-${runFrom ?? 'auto'}`}>
                  <div className="th"><i />Agent · running ui-pick</div>
                  <p><span className="pr">$</span> {typed}{typed.length < cmd.length && <span className="uhd-caret" />}</p>
                  {asking && !answered && <p className="dim"><span className="uhd-spin" />Asking Jev about every pick in one request…</p>}
                  {answered && <p className="dim">{UI_HUB.pickRun.head}</p>}
                  {rows.map(([score, name, by]) => <p key={name} className="rk"><span className="ok">{score}</span>
                    <span className="nm">{name}</span><em>{by}</em>
                    <i style={{ ['--w' as string]: Number(score), gridColumn: '2 / 4', width: '100%' } as CSSProperties} /></p>)}
                  {next && <p><span className="pr">→</span> Next: <span className="nm" style={{ display: 'inline' }}>design-lab</span> renders the top 3 side by side.</p>}
                </div>}
              </div>
            </div></div>}

            {key === 'previews' && <div className="uhd-main" key="pv"><div className="uhd-pv">
              <div className="uhd-pvlist">
                <span className="uhd-lbl">Live · site kit</span>
                {UI_HUB.previews.map((p, i) => <button type="button" key={p.url} className="uhd-pvrow" aria-current={pv === i} onClick={() => setCard(i)}>
                  <span className="mini"><img src={`${IMG}${p.img}.webp`} alt="" loading="lazy" /></span>
                  <span className="tx"><b>{p.title}</b><span>{p.note}</span></span>
                </button>)}
              </div>
              <div className="uhd-pvmain">
                <div className="uhd-deck">
                  {UI_HUB.previews.map((p, i) => {
                    const d = ((i - pv) % n + n) % n;
                    const pos = d === 0 ? '0' : d === 1 ? '1' : d === 2 ? '2' : d === n - 1 ? 'out' : 'hide';
                    return <div key={p.url} className="uhd-bc" data-pos={pos} aria-hidden={d !== 0}>
                      <div className="chrome"><span className="uhd-lights"><i /><i /><i /></span>
                        <span className="url"><i />{p.url.replace('https://', '')}</span></div>
                      <div className="view"><img src={`${IMG}${p.img}.webp`} alt={d === 0 ? `${p.title}, ${p.url}` : ''} loading="lazy"
                        style={{ ['--pan' as string]: card === null ? '1.65s' : '4s', ['--dy' as string]: '-34%' } as CSSProperties} /></div>
                    </div>;
                  })}
                </div>
                <div className="uhd-pvctl">
                  <button type="button" aria-label="Previous site" onClick={() => flip(-1)}><Svg size={14}><path d="m15 18-6-6 6-6" /></Svg></button>
                  <span>{pv + 1} / {n}</span>
                  <button type="button" aria-label="Next site" onClick={() => flip(1)}><Svg size={14}><path d="m9 18 6-6-6-6" /></Svg></button>
                  <a href={UI_HUB.previews[pv].url} target="_blank" rel="noopener noreferrer">Open it live <Svg size={12}><path d="M7 17 17 7M9 7h8v8" /></Svg></a>
                </div>
              </div>
            </div></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

// The grid for one group: real previews for components, images and 3D; each theme drawn from its own tokens.
function Grid({ kindKey, groupKey, label, n, sel, onSel }: { kindKey: string; groupKey: string; label: string; n: number; sel: number | null; onSel: (i: number) => void }) {
  const themes = kindKey === 'themes';
  const list = themes ? UI_HUB.themes[groupKey] ?? [] : UI_HUB.items[groupKey] ?? [];
  // The extras drawer always shows one item: the one you picked, else the first.
  const on = sel ?? 0;
  const chosen = list[on] ?? null;
  const source = groupKey.startsWith('ph-') ? 'Poly Haven · CC0' : groupKey === 'acg' ? 'ambientCG · CC0' : themes ? 'design themes · MIT' : 'in the bank';
  return (
    <div className="uhd-grid-wrap" key={groupKey}>
      <div className="uhd-ghead"><b>{label}</b><span>{n.toLocaleString('en-US')} {source}</span>
        <em><Svg size={11}><path d="M4 6h16M7 12h10M10 18h4" /></Svg>{themes ? 'By style' : groupKey.startsWith('ph-') || groupKey === 'acg' ? 'Most downloaded' : 'Most used'}</em></div>
      <div className="uhd-grid">
        {list.map((item, i) => <button type="button" key={item.name + i} data-t={`c${i}`} className="uhd-card" aria-pressed={on === i} style={{ ['--i' as string]: i } as CSSProperties}
          onClick={() => onSel(i)}>
          <div className="uhd-thumb">
            {'c' in item ? <Theme c={item.c} name={item.name} /> : <img src={`${IMG}${item.id}.webp`} alt="" loading="lazy" decoding="async" />}
            {'code' in item && item.code && <span className="uhd-code">TSX</span>}
          </div>
          <div className="uhd-cap"><b>{'c' in item ? cap(item.name) : item.name}</b><span>{'c' in item ? item.font : item.by}</span></div>
        </button>)}
      </div>
      {chosen && <div className="uhd-drawer" key={`${groupKey}-${on}`}>
        <div className="pic">{'c' in chosen ? <Theme c={chosen.c} name={chosen.name} /> : <img loading="lazy" decoding="async" src={`${IMG}${chosen.id}.webp`} alt="" />}</div>
        <div className="info">
          <div className="t"><b>{'c' in chosen ? cap(chosen.name) : chosen.name}</b><span>{'c' in chosen ? chosen.font : chosen.by}</span></div>
          <div className="uhd-chips">
            {'c' in chosen ? chosen.c.map(h => <i key={h}>{h.toUpperCase()}</i>)
              : <>{chosen.code && <i className="ok">TSX source</i>}{(chosen.tags ?? []).map(x => <i key={x}>{x}</i>)}{!chosen.tags && <i className="ok">CC0</i>}</>}
          </div>
          <div className="uhd-cmd">{'c' in chosen ? <><s>$</s>node palette.mjs --near &apos;{chosen.c[0]}&apos;</>
            : chosen.tags ? <><s>$</s>node find.mjs &quot;{chosen.name.toLowerCase()}&quot; --limit 1</>
              : <><s>↗</s>{assetUrl(chosen.id)}</>}</div>
        </div>
      </div>}
    </div>
  );
}

// A skill opened: its SKILL.md frontmatter and first lines. Only ui-pick has a Run button here: it is the one we ran.
function SkillFile({ i, running, onRun }: { i: number; running: boolean; onRun: () => void }) {
  const s = UI_HUB.skills[i];
  return (
    <div className="uhd-file" key={s.name}>
      <div className="fh">SKILL.md <span>·</span> <b>{s.name}</b>
        {i === 0 && <button type="button" className="uhd-run" data-press={running || undefined} onClick={onRun}>
          <Svg size={10}><path d="M7 4.5v15l12-7.5z" fill="currentColor" /></Svg>Run</button>}
      </div>
      <div className="uhd-md">
        <p className="fm">---</p>
        <p><span className="k">name:</span> {s.name}</p>
        <p><span className="k">description:</span> {s.desc}</p>
        {s.tags && <p><span className="k">tags:</span> [{s.tags}]</p>}
        <p className="fm">---</p>
        <h4>{s.head.startsWith('## ') ? s.head.slice(3) : `# ${s.head}`}</h4>
        <p className="body">{s.body.startsWith('## ') ? s.body.slice(3) : s.body}</p>
      </div>
    </div>
  );
}

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }
// Is a hex colour light enough to need dark text on it?
function light(hex: string) {
  const v = parseInt(hex.replace('#', '').slice(0, 6), 16);
  return ((v >> 16 & 255) * 299 + (v >> 8 & 255) * 587 + (v & 255) * 114) / 1000 > 160;
}
// Where a CC0 asset lives: Poly Haven's /a/<id> pages and ambientCG's view?id=<id>.
function assetUrl(id: string) { return id.startsWith('ph-') ? `polyhaven.com/a/${id.slice(3)}` : `ambientcg.com/view?id=${id.slice(4)}`; }

function Theme({ c, name }: { c: string[]; name: string }) {
  const [primary, secondary, surface, text] = c;
  return <div className="uhd-theme" style={{ background: surface, color: text }}>
    <span className="aa">Aa {cap(name)}</span>
    <span className="ln" style={{ background: text, width: '80%' }} /><span className="ln" style={{ background: text, width: '55%' }} />
    <span className="row">
      <span className="btn" style={{ background: primary, color: light(primary) ? '#111' : '#fff' }}>Get started</span>
      <span className="sw">{c.map(h => <i key={h} style={{ background: h }} />)}</span>
    </span>
  </div>;
}
