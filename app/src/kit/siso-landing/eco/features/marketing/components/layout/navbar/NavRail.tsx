// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/layout/navbar/NavRail.tsx)
// The footer's partition (Footer/Lights.tsx `Rail`), carried into the nav's menus (Shaan, 9 Oct: "that weird line you know how
// like the footer's got a line which isn't straight ... have all projects there like you do on the footer"). Same geometry:
// Agent Base's rail-edge hairline that burns in the middle, stepped down into a chamfered tab that holds a link, a spark running
// along it and a soft bloom under the notch. Copied under the nav's own prefix (the footer's CSS only loads with the footer) and
// drawn in the nav's glow colours, so it takes the colour of the product under the pointer like the rim does.
// It only exists while a menu is open, so its spark never runs behind a closed panel.

const tab = (flat: number) => `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${flat + 160}' height='30'%3E%3Cpath d='M0 .5H52l28 28h${flat}l28-28h52' fill='none' stroke='%23000'/%3E%3C/svg%3E")`;
const TAB = tab(160);
// The notch's floor is 160 px, enough for "All projects" and "Work with us". A longer label gets a wider floor, sized to the
// Geist Mono label (11 px, .16em tracking: ~8.4 px a character, plus padding and the arrow), so "All 3,665 industries" no
// longer runs into the chamfers (Shaan, 9 Oct: "all industries thing just seems cramped").
const floorFor = (label: string) => Math.max(160, Math.round(label.length * 8.4 + 64));
const maskFor = (flat: number) => {
  const half = (flat + 160) / 2;
  return `linear-gradient(#000 0 0) left top/calc(50% - ${half}px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - ${half}px) 1px no-repeat,${tab(flat)} center top/${flat + 160}px 30px no-repeat`;
};

export const NAV_RAIL_CSS = `
.nv-rail{position:relative;height:30px;flex:none}
.nv-rail>i{position:absolute;inset:0;filter:drop-shadow(0 0 5px color-mix(in srgb,var(--nav-ember) 60%,transparent))}
.nv-rail::after{content:"";position:absolute;left:50%;top:0;width:min(560px,90%);height:70px;transform:translateX(-50%);pointer-events:none;
  background:radial-gradient(50% 55% at 50% 0,color-mix(in srgb,var(--nav-ember) 12%,transparent),color-mix(in srgb,var(--nav-rose) 5%,transparent) 55%,transparent 80%)}
.nv-rail>i>span{position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,#fff7e8,transparent) -30% 0/16% 100% no-repeat,
    linear-gradient(90deg,transparent,color-mix(in srgb,var(--nav-ember) 25%,transparent) 16%,color-mix(in srgb,var(--nav-gold) 60%,transparent) 38%,#fff3d6 50%,color-mix(in srgb,var(--nav-rose) 60%,transparent) 62%,color-mix(in srgb,var(--nav-ember) 25%,transparent) 84%,transparent);
  -webkit-mask:linear-gradient(#000 0 0) left top/calc(50% - 160px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 160px) 1px no-repeat,${TAB} center top/320px 30px no-repeat;
  mask:linear-gradient(#000 0 0) left top/calc(50% - 160px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 160px) 1px no-repeat,${TAB} center top/320px 30px no-repeat;
  animation:nv-spark 7s cubic-bezier(.45,0,.55,1) infinite}
.nv-rail-tab{position:absolute;left:50%;top:3px;transform:translateX(-50%);display:flex;align-items:center;gap:8px;height:22px;padding:0 10px;border-radius:8px;
  font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:var(--nav-gold);white-space:nowrap;text-decoration:none;
  transition:color .25s,text-shadow .25s,background .25s}
.nv-rail-tab b{font-weight:500;transition:transform .3s cubic-bezier(.19,1,.22,1)}
.nv-rail-tab:hover,.nv-rail-tab:focus-visible{color:#fff;background:color-mix(in srgb,var(--nav-ember) 10%,transparent);text-shadow:0 0 12px var(--nav-ember)}
.nv-rail-tab:hover b,.nv-rail-tab:focus-visible b{transform:translateX(4px)}
.nv-rail-tab:focus-visible{outline:2px solid #ffffffad;outline-offset:2px}
@keyframes nv-spark{to{background-position:130% 0,0 0}}
@media (prefers-reduced-motion:reduce){.nv-rail>i>span{animation:none}.nv-rail-tab,.nv-rail-tab b{transition:none}}
`;

export function NavRail({ label, href, onNavigate }: { label: string; href: string; onNavigate?: () => void }) {
  return (
    <div className="nv-rail">
      <i aria-hidden="true"><span style={floorFor(label) > 160 ? { WebkitMask: maskFor(floorFor(label)), mask: maskFor(floorFor(label)) } : undefined} /></i>
      <a className="nv-rail-tab" href={href} onClick={onNavigate}>{label}<b aria-hidden="true">→</b></a>
    </div>
  );
}
