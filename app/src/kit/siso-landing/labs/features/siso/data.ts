// uihub: siso:landing (copied from the SISO landing, labs/features/siso/data.ts)
// Every number on the page lives here, with its source. Rule: the vision can be big; every number is true.
// Sources (checked 8 Oct 2026): _data/siso-landing/DNA.md "Sources for draft 2".

export const BASE = undefined ?? '';
const ASSETS = undefined ?? BASE;
export const asset = (p: string) => `${ASSETS}/siso/${p}`;
// internal page links (static export uses trailing slashes)
export const href = (p: string) => `${BASE}${p}`;

export const LINKS = {
  cornerCafe: 'https://sisolabs.space/',
  games: 'https://games.siso-sites.pages.dev/',
  github: 'https://github.com/sisodias',
  mail: 'mailto:hello@sisolabs.space',
  worldBank: 'https://www.worldbank.org/en/topic/smefinance',
};

export const FACTS = {
  places: 67507, // Overture Đà Nẵng 2026-09-23, counted 8 Oct
  noWebsite: 39746, // same file, empty `websites`
  cafes: 5848, // _data/siso-sites/db/summary-da-nang-cafe-juice.json (7 Oct)
  cafesNoSite: 5453, // same; includes dead and social-only links
  looks: 7, // corner-cafe-six index: cosy, playful, premium, premium-dark, street, street-light, tier0
  games: 136, // 20 mechanics × 6 genome anchors + 4 seasonal packs × 4 mechanics
  industries: 3666,
  modules: 8,
  packs: 26,
  components: 8538,
  repos: 23778,
  people: 280708,
  works: 564486,
};

export type PartTab = { id: string; label: string; img: string; alt: string; illustration?: boolean; note: string };
export type Part = {
  slug: 'agency' | 'labs' | 'library' | 'base' | 'foundry';
  n: string;
  name: string;
  status: 'Live' | 'Building' | 'Open' | 'Soon';
  title: string;
  offer: string;
  stat: { v: string; k: string }[];
  primary: { label: string; href: string };
  tabs: PartTab[];
};

export const PARTS: Part[] = [
  {
    slug: 'agency', n: '01', name: 'Agency', status: 'Live',
    title: 'A free website for every business on the map that has none.',
    offer: 'Then the software it grows into: menus, booking, ordering, loyalty, and a business OS across 8 modules.',
    stat: [{ v: '3,666', k: 'industries mapped' }, { v: '8', k: 'business modules' }],
    primary: { label: 'See Corner Café', href: LINKS.cornerCafe },
    tabs: [
      { id: 'built', label: 'Built first, claimed free', img: 'img/premium-dark.webp', alt: 'Corner Café website, premium dark look', note: 'Corner Café, Đà Nẵng · live' },
      { id: 'looks', label: '7 looks, one design system', img: 'img/cosy.webp', alt: 'Corner Café website, cosy look', note: 'Same café, same kit, another look' },
      { id: 'street', label: 'Vietnamese, English, Korean', img: 'img/street.webp', alt: 'Corner Café website, street look', note: 'Every look ships in VI / EN / KO' },
    ],
  },
  {
    slug: 'labs', n: '02', name: 'Labs', status: 'Building',
    title: 'Where new products begin.',
    offer: 'The fleet invents and tests them here first: the games layer, the showcase layer, and the quality laws every site is checked against.',
    stat: [{ v: '136', k: 'playable games' }],
    primary: { label: 'Play the games', href: LINKS.games },
    tabs: [
      { id: 'games', label: 'The games layer', img: 'shots/games-layer.webp', alt: 'The games layer: spin wheels in six looks, drawn from Corner Café’s menu', note: '20 mechanics × 6 styles + 4 seasonal packs' },
      { id: 'directions', label: 'The showcase layer', img: 'slots/three-directions.webp', alt: '', illustration: true, note: 'Illustration' },
    ],
  },
  {
    slug: 'library', n: '03', name: 'Great Library', status: 'Open',
    title: 'Everything the agents know, open on GitHub.',
    offer: 'A graph of the people and work behind modern software, every repo worth using, rated, and every UI component worth reusing.',
    stat: [{ v: '280,708', k: 'people' }, { v: '23,778', k: 'rated repos' }, { v: '8,538', k: 'components' }],
    primary: { label: 'Open the library', href: LINKS.github },
    tabs: [
      { id: 'graph', label: 'People Graph · 564,486 works', img: 'vis/05-great-library-wide.webp', alt: '', illustration: true, note: 'Illustration' },
      { id: 'packs', label: '26 industry packs', img: 'vis/03-website-city-wide.webp', alt: '', illustration: true, note: 'Illustration' },
    ],
  },
  {
    slug: 'base', n: '04', name: 'Agent Base', status: 'Soon',
    title: 'Where the fleet lives, works and is held to account.',
    offer: 'Our host on the Claude Agent SDK. Opening up soon.',
    stat: [],
    primary: { label: 'Talk to us', href: LINKS.mail },
    tabs: [
      { id: 'fleet', label: 'One fleet, one heartbeat', img: 'slots/agent-base.webp', alt: '', illustration: true, note: 'Illustration · opening soon' },
      { id: 'constellation', label: 'Every agent accountable', img: 'vis/11-agent-constellation-wide.webp', alt: '', illustration: true, note: 'Illustration' },
    ],
  },
  {
    slug: 'foundry', n: '05', name: 'Foundry', status: 'Open',
    title: 'Research and intelligence, distilled so every agent starts smart.',
    offer: 'What the best operators, builders and researchers already know, turned into knowledge the fleet can use.',
    stat: [],
    primary: { label: 'On GitHub', href: LINKS.github },
    tabs: [
      { id: 'forge', label: 'Signal from the noise', img: 'vis/07-research-forge-wide.webp', alt: '', illustration: true, note: 'Illustration' },
      { id: 'flow', label: 'Sources become insights', img: 'slots/foundry-flow.webp', alt: '', illustration: true, note: 'Illustration' },
    ],
  },
];

export const LIBRARY_NUMBERS = [
  { n: FACTS.people, k: 'People in the graph', s: 'People Graph' },
  { n: FACTS.works, k: 'Works in the graph', s: 'People Graph' },
  { n: FACTS.repos, k: 'Repos, rated', s: 'Repo Bank' },
  { n: FACTS.components, k: 'UI components', s: 'Component Bank' },
  { n: FACTS.industries, k: 'Industries mapped', s: '8 business modules' },
  { n: FACTS.packs, k: 'Industry packs', s: 'Ready to build from' },
];

// What each part offers today, for its own page. Same rule: claims are things that exist; plans are labelled.
export const DETAILS: Record<Part['slug'], { h: string; p: string }[]> = {
  agency: [
    { h: 'Built first, claimed free', p: 'We build the site before we ever call: the owner’s name, menu, street and language. They claim it free.' },
    { h: 'One design system, many looks', p: 'Atoms → genomes → recipes → looks. Corner Café is live in 7 looks from the same kit.' },
    { h: 'Vietnamese, English, Korean', p: 'Every look ships with its menu and about pages in VI / EN / KO.' },
    { h: '3,666 industries, 8 modules', p: 'Industries ranked and mapped into menu, booking, catalogue, classes, quote, rentals, rooms and consult, so the site grows into the business OS.' },
  ],
  labs: [
    { h: 'The games layer', p: '136 playable games: 20 mechanics × 6 genome anchors, plus 4 seasonal packs × 4 mechanics, all drawn from a café’s sourced menu.' },
    { h: 'The showcase layer', p: 'One business shown in several looks side by side, like Corner Café’s seven, so the owner picks the one that feels like theirs.' },
    { h: 'Quality laws', p: 'Every look and every section is judged against written laws before it ships.' },
    { h: 'Invented by the fleet', p: 'New products start here as prototypes, and only ship when they pass the same bar.' },
  ],
  library: [
    { h: 'People Graph', p: '280,708 people, 564,486 works and 2.05M edges: who built modern software, and what they built.' },
    { h: 'Repo Bank', p: '23,778 GitHub repos, rated, so agents start from the best existing code instead of from zero.' },
    { h: 'Component Bank', p: '8,538 UI components worth reusing.' },
    { h: 'Industry packs', p: '26 industry research packs the fleet builds from.' },
  ],
  base: [
    { h: 'Built on the Claude Agent SDK', p: 'The host where our fleet of Claude agents lives and works.' },
    { h: 'Opening soon', p: 'It is the one part we haven’t opened yet. Talk to us if you want in early.' },
  ],
  foundry: [
    { h: 'Research, distilled', p: 'What the best operators, builders and researchers already know, distilled into knowledge the agents can use.' },
    { h: 'Why it exists', p: 'So every agent starts from what is already known, not from zero.' },
  ],
};
