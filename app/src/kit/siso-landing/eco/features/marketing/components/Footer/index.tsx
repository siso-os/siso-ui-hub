// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/Footer/index.tsx)
import Products from './Products';
import Signature from './Signature';
import Links from './Links';
import Social from './Social';
import AskAI from './AskAI';
import FooterLights, { Rail } from './Lights';
import { RuixenGradientFooter, type Stop } from '../../../../components/ui/ruixen-gradient-footer';

// Foreplay's footer, kept in shape (product icons, logo row, link columns + live count, Ask AI, socials), made ours
// (Shaan, 9 Oct): the ecosystem on a loop, a big SISO mark over contour lines, less text, the socials with real profiles, a
// black base, and the neon on the three section partitions. The legal row sits right under the Ask AI divider (Shaan, 9 Oct:
// "bump up the 2026 labs all rights reserved and the social media thing to be below the div line ... feels like you split it
// too much"), and BridgeMind's beam falls from that divider's notch, between the copyright and the socials, onto the lion
// (Signature.tsx). Under it all, 21st.dev's RuixenGradientFooter glow rises from the bottom of the screen over the last stretch
// of scroll ("add back that scroll effect ... just a cool extra thing"), in SISO's warm colours, now painted behind the
// footer's content so it can't cover the socials as it passes (the first version did). About, Privacy and Terms left the
// legal row for their own column beside Agency (Links.tsx).
const GLOW = 'min(34vh, 320px)';
const EMBER: Stop[] = [
  { offset: 0, color: '#1a0602' },
  { offset: 0.16, color: '#FF2D55' },
  { offset: 0.32, color: '#FF6A1A' },
  { offset: 0.46, color: '#FFC24Bcc' },
  { offset: 0.58, color: '#FF6A1A99' },
  { offset: 0.76, color: '#FF2D5540' },
  { offset: 1, color: '#FF2D5500' },
];
const FOOTER_CSS = `
.sf{background:#00030a;margin-top:40px;padding:40px 0 28px}
.sf-inner{max-width:1216px;margin:0 auto;padding:0 40px;display:flex;flex-direction:column;gap:36px}
.sf a{text-decoration:none}
.sf a:focus-visible,.sf button:focus-visible{outline:2px solid rgba(255,255,255,.68);outline-offset:3px;border-radius:6px}
.sf-bottom{position:relative;z-index:3;display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:44px}
/* Ruixen's glow is the footer's last child, pinned to the screen; keep it behind everything in the footer. */
.sf>[aria-hidden="true"]:last-child{z-index:-1}
.sf>[aria-hidden="true"]:last-child svg{filter:blur(28px)}
.sf-copy{color:#cacace;font:400 14px/20px Inter,sans-serif}
.sf-legal{display:flex;flex-wrap:wrap;align-items:center;gap:8px 20px}
@media (max-width:767px){.sf-inner{padding:0 20px}.sf-bottom{flex-direction:column-reverse;align-items:flex-start}}
/* The nav's neon rim, on hover, for everything you can point at in the footer (Shaan: "that nice neon border ... when you
   hover over stuff ... so it feels more interactive"). Same colours and spin as layout/navbar/NavBar.tsx. */
@property --sf-ang{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes sf-ang{to{--sf-ang:360deg}}
.sf-neon{position:relative;border-radius:14px;transition:background .3s,box-shadow .3s}
.sf-neon::before{content:"";position:absolute;inset:0;padding:1.5px;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;
  background:conic-gradient(from var(--sf-ang),#FF6A1A,#FFC24B,#fff3d6 18%,#FF2D55 30%,#FF6A1A 46%,#FF6A1A 56%,#FF2D55 72%,#FF6A1A);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);
  animation:sf-ang 5s linear infinite;animation-play-state:paused}
.sf-neon:hover,.sf-neon:focus-visible,.sf-neon:focus-within,.sf-neon.is-open{background:#ffffff07;box-shadow:0 0 30px -10px #FF6A1A99}
.sf-neon:hover::before,.sf-neon:focus-visible::before,.sf-neon:focus-within::before,.sf-neon.is-open::before{opacity:1;animation-play-state:running}
@media (prefers-reduced-motion:reduce){.sf *{transition:none!important}.sf-neon::before{animation:none}}
`;

export default function Footer() {
  return (
    <RuixenGradientFooter className="siso-footer sf" gradientHeight={GLOW} minReveal={0} stops={EMBER} bars={15} blur={40} peak={0.85} valley={0.3}
      style={{ paddingBottom: 28 }}>
      <style>{FOOTER_CSS}</style>
      <FooterLights />
      <div className="sf-inner">
        <Products />
        <Rail label="All projects" href="/ecosystem/" />
        <Links />
        <AskAI />
        <Rail />
        <div className="sf-bottom">
          <div className="sf-legal">
            <span className="sf-copy">© 2026 SISO Labs. All rights reserved.</span>
          </div>
          <Social />
        </div>
      </div>
      <Signature />
    </RuixenGradientFooter>
  );
}
