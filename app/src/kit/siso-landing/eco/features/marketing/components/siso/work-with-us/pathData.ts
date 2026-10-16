// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/work-with-us/pathData.ts)
import STATS from '../../../data/siso-stats.json';
import OPEN_SOURCE from '../../../data/siso-open-source.json';
import INDUSTRIES from '../../../data/agency-industries.json';

// The five ways in (docs/specs/work-with-us.md §1), from Shaan's own words (9 Oct): open-source builders, the partner
// programme, business owners on the business OS, enterprise and custom, and claiming a site we already built. One entry per
// path: its colour (the product colour of whatever it touches), the next step, and the receipts under it. Every number
// resolves from siso-stats.json / siso-open-source.json / agency-industries.json, so it stays true when those change.

export const CONTACT = 'hello@sisolabs.space';
export const MAILTO = (subject: string) => `mailto:${CONTACT}?subject=${encodeURIComponent(subject)}`;
export const GITHUB_ORG = 'https://github.com/siso-os';
export const CAFE_89 = 'https://sisolabs.space/';

const stat = (key: string) => STATS.stats.find(s => s.key === key)!;
export const SITES = stat('sites');
export const INDUSTRY_STAT = stat('industries');
export const GITHUB_STAT = stat('github');
export const REPOS_STAT = stat('repos');
export const SKILLS_STAT = stat('skills');
export const PUBLIC_REPOS = OPEN_SOURCE.publicRepos;
export const MODULES = INDUSTRIES.modules;
export const NO_SITE = INDUSTRIES.noSite;

export type PathKey = 'builders' | 'partners' | 'owners' | 'enterprise' | 'claim';

export type Path = {
  key: PathKey;
  tab: string;          // the chooser's short label
  who: string;          // who this is for, in one line
  color: string;        // the accent this path carries
  title: string;
  line: string;
  /** The step after reading: what it says, where it goes, and whether it leaves the site. */
  cta: { label: string; href: string; ext?: boolean };
  alt?: { label: string; href: string; ext?: boolean };
  /** Short receipts under the card. Each must be true and traceable to a data file. */
  facts: string[];
  /** Where the number behind this path comes from, shown under the panel. */
  source?: string;
};

export const PATHS: Path[] = [
  {
    key: 'builders',
    tab: 'Open source',
    who: 'You write code and want to ship into something bigger',
    color: '#1f69ff',
    title: 'Build in the open with us.',
    line: `Our tools are opening on GitHub, repo by repo: ${PUBLIC_REPOS} are public today. Pick one, open an issue or send a pull request, and your work ships inside the ecosystem the rest of these paths run on.`,
    cta: { label: 'Explore the ecosystem', href: '/ecosystem/' },
    alt: { label: 'Find us on GitHub', href: GITHUB_ORG, ext: true },
    facts: [`${PUBLIC_REPOS} public repos`, `${SKILLS_STAT.n} skills made`, 'Issues and pull requests welcome'],
    source: `Sources: ${OPEN_SOURCE.source} (read ${OPEN_SOURCE.read}); ${SKILLS_STAT.source}.`,
  },
  {
    key: 'partners',
    tab: 'Partner programme',
    who: 'You can bring us clients, or bring us to yours',
    color: '#FFC24B',
    title: 'The partner programme.',
    line: 'Affiliates who send us business and partners who build alongside us. We are writing the terms now, so there is nothing to sign yet. Register your interest and you are in the first group we talk to.',
    cta: { label: `Register interest`, href: MAILTO('Partner programme — register interest'), ext: true },
    alt: { label: 'Talk it through', href: '/book-demo/' },
    facts: ['Launching soon', 'Affiliates and partners', 'No terms published yet'],
  },
  {
    key: 'owners',
    tab: 'Business owners',
    who: 'You run a business and want software that fits it',
    color: '#00a879',
    title: 'Pick your industry.',
    line: `We ranked ${INDUSTRY_STAT.n} industries by how many businesses in them have no website, and grouped them by the software each one actually needs. Find yours below. If it is not in the list, we will still work with you.`,
    // The search above is the real chooser, so these two are the step after it rather than a link back to it.
    cta: { label: 'Tell us about your business', href: '/book-demo/' },
    alt: { label: 'See every industry', href: '/industries/' },
    facts: [`${INDUSTRY_STAT.n} industries ranked`, `${MODULES.length} software modules`, 'Not listed? We still work with you'],
    source: `Source: ${INDUSTRIES.source} (read ${INDUSTRIES.read}).`,
  },
  {
    key: 'enterprise',
    tab: 'Enterprise',
    who: 'You have a team, a stack and rules of your own',
    color: '#41567a',
    title: 'Enterprise and custom.',
    line: 'Custom work: our agents, our research and our people pointed at your stack. Scoped with you, because no two of these are the same. Tell us what you are trying to build and we will tell you honestly whether we are the right people.',
    cta: { label: 'Scope it with us', href: '/book-demo/' },
    alt: { label: `Email ${CONTACT}`, href: MAILTO('Enterprise and custom'), ext: true },
    facts: ['Scoped per engagement', 'Our agents and our people', `${REPOS_STAT.n} repos indexed to draw on`],
    source: `Source: ${REPOS_STAT.source}.`,
  },
  {
    key: 'claim',
    tab: 'Claim your site',
    who: 'You found a site with your name on it',
    color: '#FF6A1A',
    title: 'We might build yours first.',
    line: `Sometimes we build a business its site before it asks: your name, your menu, your street, in your language. Corner Café is live and real, one of ${SITES.n} sites we have built. If you find yours, claim it and it is yours to change.`,
    cta: { label: 'Claim your site', href: '/book-demo/' },
    alt: { label: 'Visit Corner Café', href: CAFE_89, ext: true },
    facts: [`${SITES.n} sites built`, 'Corner Café is live', 'Yours to change once you claim it'],
    source: `Source: ${SITES.source}.`,
  },
];
