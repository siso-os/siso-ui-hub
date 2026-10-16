// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/Footer/LazyFooter.tsx)
'use client';

import dynamic from '../../../../../shims/next-dynamic';
import LazySection, { LazyHold, lazySectionStyles } from '../HomePage/LazySection';

// The footer every page imports (marketing/_public/layout): ~920 elements and their effects, mounted only as it nears the
// screen, as the home page already did. On /agent-base/ at 390 it sat 1,700px below where a quick scroll stops and was
// still a sixth of the load-time style and hydration work (10 Oct). Heights are the footer's own at 1440 and 390.
const Footer = dynamic(() => import('./index'), { ssr: false, loading: LazyHold });

export default function LazyFooter() {
  return (
    <>
      <style>{lazySectionStyles}</style>
      <LazySection wide={918} narrow={1271}><Footer /></LazySection>
    </>
  );
}
