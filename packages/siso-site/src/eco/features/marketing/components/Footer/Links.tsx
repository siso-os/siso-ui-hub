// uihub: siso:site
'use client';
import { useSiteConfig } from '../../../../../config';
import CategorySection from './ui/CategorySection';
import Numbers from './Numbers';
import { SISO_GITHUB } from '../siso/ui/GitHubButton';

// Agency on the left, our numbers in the middle, Resources on the right (Shaan, 9 Oct: "that's centred and then you could
// have text either side"). The Ecosystem column is gone: the looping badges above and the "All projects" tab in the divider's
// notch carry it ("you can put the all projects up above that notch ... that takes care of the ecosystem"). About, Privacy and
// Terms sit to the left of Agency (Shaan, 9 Oct: "move about privacy and terms into the left hand side of agency"); Docs and
// Merch are live now, so they lost their SOON tags ("dox is no longer coming soon, neither merch").
const CSS = `
.sf-links{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:start;gap:32px 24px}
.sf-links>div:not(.sf-num){align-items:flex-start}
.sf-left{display:flex;gap:48px}
.sf-left>div{align-items:flex-start}
.sf-links>div:last-child{justify-self:end;min-width:180px}
.sf-links ul{padding:0!important}
@media (max-width:860px){.sf-links{grid-template-columns:1fr 1fr}.sf-left{gap:32px}.sf-num{grid-column:1 / -1;grid-row:1;justify-self:center}.sf-links>div:last-child{justify-self:start}}
/* Phones (t-0582): the three groups in two columns, labels never wrapping mid-word, and the live number below them, so its
   "Updated" line is never under the fixed header. */
@media (max-width:560px){.sf-links{gap:28px 16px}.sf-left{display:contents}.sf-links a{white-space:nowrap}
  .sf-num{grid-column:1 / -1;grid-row:3;justify-self:center}}
`;

export default function Links() {
  const config = useSiteConfig();
  return (
    <div className="sf-links">
      <style>{CSS}</style>
      <div className="sf-left">
        <CategorySection label="Company" links={config.companyLinks ?? [
          { href: '/about/', children: 'About' },
          { href: '/privacy/', children: 'Privacy' },
          { href: '/terms/', children: 'Terms' },
        ]} />
        <CategorySection label="Agency" links={config.agencyLinks ?? [
          { href: '/pricing/', children: 'Work with us' },
          { href: '/industries/', children: 'Industries' },
          { href: 'https://cafe-89.pages.dev', children: 'Café 89 ↗', external: true },
          { href: '/book-demo/', children: 'Talk to us' },
        ]} />
      </div>
      <Numbers />
      <CategorySection label="Resources" links={config.resourceLinks ?? [
        { href: '/blog/', children: 'Blog' },
        { href: '/research/', children: 'Research' },
        { href: 'https://docs.sisolabs.space', children: 'Docs ↗', external: true },
        { href: '/merch/', children: 'Merch' },
        { href: SISO_GITHUB, children: 'GitHub ↗', external: true },
      ]} />
    </div>
  );
}
