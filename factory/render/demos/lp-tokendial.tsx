/* @css lp:src/shared/styles/color-system.css */
/* @root lp */
// The landing's token tracker (TokenDial), live from siso-stats.json, with the hero's own styles (heroV2Styles).
import TokenDial from "@/features/marketing/components/siso/home-hero/TokenDial";
import { heroV2Styles } from "@/features/marketing/components/siso/home-hero/heroV2Styles";
export default function Demo() {
  return <section className="v2" style={{ minHeight: 560 }}><style>{heroV2Styles}</style><TokenDial /></section>;
}
