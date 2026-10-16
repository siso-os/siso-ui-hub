// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/Footer/Signature.tsx)
import Link from '../../../../../shims/next-link';
import Beam from './Beam';

// The footer's signature (Shaan, 9 Oct, on 21st.dev's modem-animated-footer: "I like the icon at the bottom"; on BridgeMind:
// "this is much cooler"). The lion in a glass tile with Agent Base's composer halo (hub.css .cp, a conic rim turning round it)
// stands on the horizon line, and BridgeMind's beam (Beam.tsx) falls onto it from the notch of the divider above. The horizon
// is Agent Base's halo edge (siso-shell shell.css .ab-head, the chat header's bottom edge: a hairline that burns brightest in
// the middle with a blurred glow under it, sweeping while it works). It opens out from the middle once the beam lands.

// Contour rings round one peak, spaced wider as they fall away like real terrain, each wobbled by a few sine waves.
function ring(k: number) {
  const pts: string[] = [];
  for (let i = 0; i < 120; i++) {
    const t = (i / 120) * Math.PI * 2;
    const wob = 1 + 0.07 * Math.sin(3 * t + k * 0.22) + 0.045 * Math.sin(5 * t - k * 0.17 + 1.3) + 0.03 * Math.sin(7 * t + k * 0.09 + 2.1);
    const r = (30 + k * 22 + k * k * 0.6) * wob;
    pts.push(`${(720 + r * 2.1 * Math.cos(t)).toFixed(1)} ${(288 + r * 0.92 * Math.sin(t)).toFixed(1)}`);
  }
  return `M${pts.join('L')}Z`;
}
const RINGS = Array.from({ length: 20 }, (_, k) => ring(k + 1));

const CSS = `
.sf-sig{position:relative;height:380px;margin-top:-92px;pointer-events:none;overflow:hidden}
.sf-contours{position:absolute;inset:0;width:100%;height:100%;fill:none;filter:blur(.6px);opacity:.7;
  -webkit-mask-image:radial-gradient(50% 55% at 50% 80%,#000 20%,transparent 80%);mask-image:radial-gradient(50% 55% at 50% 80%,#000 20%,transparent 80%)}
.sf-contours g{transform-origin:720px 288px;animation:sf-breathe 11s ease-in-out infinite alternate}
.sf-contours path{stroke:#ffffff0a;stroke-width:1}
.sf-contours path:nth-child(-n+3){stroke:#FFB54726}
@keyframes sf-breathe{to{transform:scale(1.05) rotate(1.2deg)}}
.sf-horizon{position:absolute;left:40px;right:40px;top:80%;height:1px;transform:scaleX(calc(.15 + .85 * var(--k,1)));transition:transform .2s linear}
.sf-horizon::after{content:"";position:absolute;inset:0;
  background:linear-gradient(90deg,transparent 0%,#FF6A1A8c 25%,#fff3d6 50%,#FF6A1A40 75%,transparent 100%) 50% 0/200% 100%;
  animation:sf-sweep 6s linear infinite}
.sf-horizon::before{content:"";position:absolute;left:12%;right:12%;top:-6px;height:12px;background:radial-gradient(50% 50% at 50% 50%,#FF8A3D,transparent);
  filter:blur(5px);opacity:.5}
@keyframes sf-sweep{from{background-position:100% 0}to{background-position:-100% 0}}
@property --sf-halo{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes sf-halo{to{--sf-halo:360deg}}
.sf-tile{position:absolute;left:50%;top:80%;transform:translate(-50%,-50%);pointer-events:auto;display:grid;place-items:center;width:104px;height:104px;
  border-radius:28px;border:1.5px solid transparent;
  background:linear-gradient(#07080ccc,#07080ccc) padding-box,
    conic-gradient(from var(--sf-halo),#FF6A1A,#FFC24B,color-mix(in srgb,#FF6A1A 25%,transparent),#FF2D55,#FF6A1A) border-box;
  -webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);
  box-shadow:0 0 0 1px #ffffff08,0 18px 60px -14px #FF6A1A8c,0 0 40px -10px #FF2D5559;
  animation:sf-halo 9s linear infinite;transition:box-shadow .4s,transform .5s cubic-bezier(.19,1,.22,1)}
.sf-tile:hover{transform:translate(-50%,calc(-50% - 4px)) scale(1.04);box-shadow:0 0 0 1px #ffffff12,0 24px 80px -12px #FF6A1Ab3,0 0 56px -8px #FF2D5580}
.sf-tile img{width:76px;height:76px;border-radius:20px;display:block;transition:transform .6s cubic-bezier(.19,1,.22,1)}
.sf-tile:hover img{transform:rotate(-6deg) scale(1.04)}
.sf:not([data-live]) .sf-contours g,.sf:not([data-live]) .sf-tile,.sf:not([data-live]) .sf-horizon::after{animation-play-state:paused}
@media (max-width:560px){.sf-sig{height:200px;margin-top:-24px}}
@media (max-width:767px){.sf-horizon{left:20px;right:20px}.sf-tile{width:88px;height:88px;border-radius:24px}.sf-tile img{width:62px;height:62px;border-radius:16px}}
@media (prefers-reduced-motion:reduce){.sf-contours g,.sf-tile,.sf-horizon::after{animation:none}}
`;

export default function FooterSignature() {
  return (
    <div className="sf-sig">
      <style>{CSS}</style>
      <Beam />
      <svg className="sf-contours" viewBox="0 0 1440 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g>{RINGS.map(d => <path key={d} d={d} vectorEffect="non-scaling-stroke" />)}</g>
      </svg>
      <div className="sf-horizon" aria-hidden="true" />
      <Link href="/" aria-label="SISO Labs home" className="sf-tile">
        <img src="/brand/siso-mark.png" alt="" width={76} height={76} />
      </Link>
    </div>
  );
}
