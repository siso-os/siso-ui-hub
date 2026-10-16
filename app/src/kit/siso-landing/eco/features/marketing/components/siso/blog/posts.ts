// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/blog/posts.ts)
export interface SisoBlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  topic?: string;
  bg?: string;
  glyph?: import('../ProductGlyph').Product;
  kicker?: string;
  /** Up to four numbers shown as a band under the article hero. Copy each one verbatim from the post's own text and point
   *  `at` to the section that states it, so every figure is a link to its source paragraph. */
  figures?: { n: string; label: string; at: string }[];
  cover: string;
  coverAlt: string;
  author: 'SISO Labs';
  date: string;
  sections: { id: string; title: string; paragraphs: string[] }[];
  sources: string[];
}

// Editorial sources: research/showcase/plan.py C (OBS only) and DNA.md,
// including DNA's 8 October corrections. Covers are generated illustrations.
export const posts: SisoBlogPost[] = [
  {
    slug: 'we-counted-1356183-github-repos',
    title: 'We counted 1,356,183 GitHub repos',
    description: 'What the repository count includes, how the smaller banks fit together, and what an index can actually tell us.',
    category: 'The Library',
    cover: '05-blog-repos',
    coverAlt: 'Illustration of a dark archive with an illuminated card drawer',
    author: 'SISO Labs', date: '2026-10-08',
    figures: [{ n: '1,356,183', label: 'Repos over 10 stars', at: 'what-we-counted' }, { n: '120,378', label: 'In the GitHub farm', at: 'from-index-to-bank' }, { n: '210,991', label: 'Placed in 264 categories', at: 'from-index-to-bank' }, { n: '23,778', label: 'In the rated bank', at: 'from-index-to-bank' }],
    sections: [
      { id: 'what-we-counted', title: 'What we counted', paragraphs: [
        'On 8 October, we counted 1,356,183 public GitHub repositories over 10 stars in the identity database behind our repository index. The count came directly from the repo_card table. That table holds 1,358,200 repository cards, built between 23 and 25 June 2026. Those are two different totals. The number of cards should not be presented as the number of repositories.',
        'The date matters too. This is a count of the records in that database, checked in October. It is not a live counter of everything on GitHub today. We can say what we counted and where we counted it. We cannot turn an index assembled in June into a claim that every repository is current, maintained or suitable for a particular build.',
      ] },
      { id: 'from-index-to-bank', title: 'From an index to a bank', paragraphs: [
        'The large index is one part of the Library. The GitHub farm contains 120,378 repositories: every repository over 1,000 stars, plus samples from the 100 to 1,000 star bands. Separately, 210,991 repositories have been placed into a 264-category taxonomy. These figures describe different collections and stages of work. Adding them together would give a number without a useful meaning.',
        'The rated bank is smaller again. It contains 23,778 repositories with a category, capability, reuse value, licence and a line explaining why the repository is there. The taxonomy also uses 105 capability tags. That is the detail we want beside a result: what it does, where it fits, what its licence allows, and why we might use it.',
      ] },
      { id: 'the-work-around-the-code', title: 'The work around the code', paragraphs: [
        'The Library also includes a component bank with 8,538 components. Our UI index records 53,843 open UI resources across 19 categories. These are separate counts with separate scopes. A component, a UI resource and a repository are not interchangeable units. We keep their names attached to their numbers so someone reading the site can tell which collection we mean.',
        'There is a people layer as well: 339,217 people, 535,811 works and about 2.05 million person-topic links. Earlier figures mixed an older people count with a person-to-work link count. The corrected ledger separates people, works and links. That distinction is useful for the same reason as separating repositories from cards: it keeps the shape of the data visible.',
      ] },
      { id: 'what-the-count-does-not-prove', title: 'What the count does not prove', paragraphs: [
        'A large index tells us how much material is recorded. It does not establish the quality of a tool, the state of its dependencies or how well it will work in our application. Our reason for building the Library is to give agents somewhere to start with context. The rated bank supplies more context than a bare repository count.',
        'The point is to carry useful work forward. In the landing page DNA, a section that works on one site becomes an atom in the Library for future sites. The repository index sits behind that same approach: start with existing work, keep its source visible, and make the next choice from evidence. The count is the starting point, not the conclusion.',
      ] },
    ],
    sources: ['Identity database, repo_card table; counted 8 October 2026, cards built 23–25 June.', 'Claim ledger: million, farm, placed, taxo, rated, comps, uiindex, people (OBS).', 'DNA.md: shared library approach and corrected People Graph figures.'],
  },
  {
    slug: '3665-industries-ranked-by-who-has-no-website',
    title: '3,665 industries, ranked by who has no website',
    description: 'An industry map, eight site offer modules, and the limits of what a missing website field tells us.',
    category: 'Research',
    cover: '06-blog-industries',
    coverAlt: 'Illustration of illuminated shopfronts along a dark street',
    author: 'SISO Labs', date: '2026-10-08',
    figures: [{ n: '3,665', label: 'Industries ranked', at: 'count-the-rows' }, { n: '8', label: 'Site offer modules', at: 'count-the-rows' }, { n: '26', label: 'In the research queue', at: 'a-ranking-is-a-start' }, { n: '2', label: 'Research packs complete', at: 'a-ranking-is-a-start' }],
    sections: [
      { id: 'count-the-rows', title: 'Count the rows', paragraphs: [
        'Our ranked industry file contains 3,665 industries. An earlier version of the landing page said 3,666 because the CSV header had been counted as an industry. The corrected number comes from counting the data rows. It is a small correction, but it changes what we can say on the page. A heading is not an extra business category.',
        'The industries are mapped to eight site offer modules. That is a map of offers, not a finished Business OS. The claim ledger says explicitly that the Business OS itself is not built. We can describe the structure we have and the software we intend to build around it without making the map stand in for a working product.',
      ] },
      { id: 'start-with-one-city', title: 'Start with one city', paragraphs: [
        'The local starting point is Đà Nẵng. In the Overture snapshot dated 23 September 2026, 39,746 of 67,507 places have an empty websites field. We recounted that on 8 October. This is evidence about a field in a particular dataset. It gives the project a concrete place to begin, rather than a general statement about every business everywhere.',
        'The café and juice bar research uses a different definition. It records 5,453 of 5,848 places without a working website, including dead links and social-only links. In the broader Overture count, a Facebook-only listing counts as a site. Those definitions must travel with the figures. Comparing the two totals without that context would suggest they measured the same thing.',
      ] },
      { id: 'a-ranking-is-a-start', title: 'A ranking is a start', paragraphs: [
        'We use the industry map to organise the work ahead. The title describes the question behind it: who has no website? It does not mean we have completed a website audit of every business in all 3,665 industries. The evidence here establishes the size of the industry map and the local counts. It does not supply a verified global league table.',
        'Research depth is another separate measure. There are 26 industries in the research queue, with two packs complete. Calling those 26 completed research packs would hide most of the work still to do. We would rather keep the queue visible. A registered industry gives research a place to go; a completed pack means that a different stage has been reached.',
      ] },
      { id: 'from-map-to-software', title: 'From the map to software', paragraphs: [
        'The DNA sets out the plan: build a site before approaching its owner, then let the owner grow into software for menus, booking, ordering and loyalty. The wider Business OS is the intended direction. The observed café work is narrower: 213 built sites, including Corner Café, its seven looks and 205 previews. One city and one vertical are a beginning.',
        'That boundary is also part of the map animation. Hollow dots fill with light, but the caption says “The plan · one site per dark dot”. It describes an intention, not completed delivery. We want the industry page to work the same way: show the field, show what has been built, and leave the remaining work visible. The map should help us choose the next task.',
      ] },
    ],
    sources: ['Ranked industry CSV: 3,665 data rows; modules.csv: eight site offer modules.', 'Claim ledger: inds, places, cafes, packs, sites (OBS).', 'DNA.md: Overture definitions, business software plan and map caption.'],
  },
  {
    slug: '213-cafe-sites-in-da-nang',
    title: '213 café sites in Đà Nẵng',
    description: 'One public site, seven looks and 205 previews. A record of what has been built, with the delivery limits left visible.',
    category: 'Agency',
    cover: '07-blog-cafes',
    coverAlt: 'Illustration of a coffee, phone and notebook on a dark café table',
    author: 'SISO Labs', date: '2026-10-08',
    figures: [{ n: '213', label: 'Café sites built', at: 'what-213-means' }, { n: '205', label: 'Previews, all noindex', at: 'what-213-means' }, { n: '7', label: 'Looks of Corner Café', at: 'one-system-several-looks' }, { n: '1', label: 'Live public site', at: 'what-213-means' }],
    sections: [
      { id: 'what-213-means', title: 'What 213 means', paragraphs: [
        'We have built 213 café sites in Đà Nẵng. That total includes Corner Café’s own site, its seven looks and 205 previews. It is a count of built sites, not a count of businesses using our software. The distinction belongs beside the headline because those are very different outcomes. A preview exists before we can say anything about its adoption.',
        'The ledger records one live, public site: corner-cafe.pages.dev. It has Vietnamese and English content. The seven looks include Vietnamese, English and Korean. Every preview is marked noindex. We should not describe that collection as 213 public launches, or imply that all the businesses have claimed a site. The source does not establish either of those statements.',
      ] },
      { id: 'why-cafes', title: 'Why cafés', paragraphs: [
        'The café and juice bar research records 5,453 of 5,848 places in Đà Nẵng without a working website. Its definition includes dead links and social-only links. The wider city count records 39,746 of 67,507 places with an empty websites field in Overture. These give us a local starting point, but the two definitions should not be collapsed into one.',
        'The DNA describes a build-first approach. A business gets a site with its name, menu, street and language before the owner hears from us. That is the direction of the agency work. The café collection gives the plan something concrete to point at: one city, one vertical and a set of built previews. It leaves the owner handoff as a separate step.',
      ] },
      { id: 'one-system-several-looks', title: 'One system, several looks', paragraphs: [
        'Corner Café is shown in seven looks from one design system. The site kit contains 22 atom families with 115 styles, eight genome anchors, 26 sections and 50 blocks. The point of listing those parts is to show the structure behind the variations. Seven looks are not seven unrelated accounts of how a café site should be built.',
        'The DNA describes the sequence as atoms, genome, recipe and looks. Colours and type form the atoms; the genome supplies a layout skeleton; sections make up the recipe; and the looks show the result. It also describes carrying a useful section into the Library as an atom for future sites. That is the reuse we want from the shared system.',
      ] },
      { id: 'what-comes-after-a-site', title: 'What comes after a site', paragraphs: [
        'There is a games layer too: 136 playable games, made from 20 mechanics in six styles plus four seasonal packs of four mechanics each. That count is separate from the café site total. It shows another part of the work that exists. It does not tell us how many café owners have chosen to use the games or how often customers play them.',
        'The longer plan is software for menus, booking, ordering, loyalty and a Business OS across eight modules. The industry map exists; the Business OS itself is not built. For this article, the useful next step is to look at the public Corner Café site and the design variations. They show what the work looks like today, while the previews and the plan show what remains ahead.',
      ] },
    ],
    sources: ['Café site registry and r200 deploys, 29 September–8 October: 213 built sites.', 'Claim ledger: sites, live1, looks, cafes, places, kit, games, inds (OBS).', 'DNA.md: build-first approach and atoms → genome → recipe → looks.'],
  },
  {
    slug: 'why-we-give-the-tools-away',
    title: 'Why we give the tools away',
    description: 'The reason for a shared library, the work it contains, and why a plan to publish is different from a public repository.',
    category: 'The Library',
    cover: '08-blog-open-source',
    coverAlt: 'Illustration of a disassembled keyboard with its parts laid out on a workbench',
    author: 'SISO Labs', date: '2026-10-08',
    figures: [{ n: '23,778', label: 'Rated repos', at: 'what-we-have-to-share' }, { n: '53,843', label: 'Open UI resources', at: 'what-we-have-to-share' }, { n: '8,538', label: 'Components', at: 'what-we-have-to-share' }, { n: '28', label: 'Best-in-category picks', at: 'what-we-have-to-share' }],
    sections: [
      { id: 'the-reason-for-the-library', title: 'The reason for the Library', paragraphs: [
        'The landing page DNA starts with a simple aim: every business on the map gets software. The Library is part of how we intend to do that. It holds work that can be used again rather than treating every new site as a separate beginning. Giving the tools away fits that aim. The useful part is the work people can inspect and carry forward.',
        'The DNA describes a section that works on one site becoming an atom in the Library for future sites. That is the reason for sharing the system: a piece of useful work should have a life beyond the page where it first appeared. It is a direction for the project, not a measured claim about how much time every builder will save.',
      ] },
      { id: 'what-we-have-to-share', title: 'What we have to share', paragraphs: [
        'There is already material behind that direction. The rated repository bank holds 23,778 entries with categories, capabilities, reuse value, licences and a line explaining why each is included. The component bank contains 8,538 components. Our UI index records 53,843 open resources in 19 categories. These counts describe the collections; they do not turn every entry into a recommendation for every project.',
        'The UI Hub catalogue has 28 best-in-category picks from five libraries, alongside 15 UI rules with checks. Eleven UI libraries have been indexed, covering 1,182 items. That is a more specific layer than the broad index. It gives the project a way to keep the field, the selected tools and the rules for using them in view at the same time.',
      ] },
      { id: 'sharing-includes-credit', title: 'Sharing includes credit', paragraphs: [
        'The source ledger records where parts of Agent Base came from. T3 Code contributed ideas and code for the sidebar row, chat minimap, steering and delivery queue. Question cards also draw on OpenCode. The top tabs draw on cmux, and the shell layout draws on the Codex app. The ledger describes this as credited file by file, rather than a wholesale fork.',
        'Voice has its own lineage: zachlatta/freeflow is the base, mbailey/voicemode supplied the talk-back idea, and live captions were rebuilt from FluidVoice’s idea. The first two sources use MIT licences. Keeping those names attached to the work is part of giving it away responsibly. Our reasons for sharing should include where we started, rather than making the inherited parts disappear.',
      ] },
      { id: 'say-what-is-open-today', title: 'Say what is open today', paragraphs: [
        'An intention to publish is not the same as evidence of public availability. The observed counts in this article establish the size of collections and the sources of particular features. They do not establish that every SISO tool is publicly installable. That is a separate claim, and one that needs its own evidence. We keep the reason for sharing separate from a promise about access.',
        'So the title states our reason for sharing, not a blanket availability claim for every product. The broader direction remains the one in the DNA: build useful software for local businesses and carry the useful parts into a shared library. A collection can be counted, a source can be credited, and a future direction can be described without pretending those are the same step. Each deserves a clear account.',
      ] },
    ],
    sources: ['DNA.md: library thesis and reuse across sites.', 'Claim ledger: rated, comps, uiindex, picks, uirules, uilibs, lineage, voicelin (OBS).', 'Collection counts and credited sources do not establish public product availability.'],
  },
  {
    slug: 'what-we-took-from-25-voice-apps',
    title: 'What we took from 25 voice apps',
    description: 'The repositories we checked, the sources we built on, and what eight weeks of our own dictation history can tell us.',
    category: 'Voice',
    cover: '09-blog-voice',
    coverAlt: 'Illustration of a studio microphone framed by an orange light ring',
    author: 'SISO Labs', date: '2026-10-08',
    figures: [{ n: '25', label: 'Voice repos checked', at: 'what-we-compared' }, { n: '8,590', label: 'Recorded dictations', at: 'what-our-history-shows' }, { n: '6,805', label: 'Straight into an agent', at: 'what-we-took' }, { n: '97.6', label: 'Hours of audio', at: 'what-our-history-shows' }],
    sections: [
      { id: 'what-we-compared', title: 'What we compared', paragraphs: [
        'We chose our voice base after checking 25 open-source voice repositories on GitHub. Sixteen were dictation projects and nine were voice-to-agent projects. The research also included a teardown of Aqua Voice. Those are the boundaries of the comparison. “25 voice apps” is a short title; the work behind it was a repository review with those two groups, not a benchmark of every commercial voice product.',
        'The distinction matters when we describe the result. A repository review can tell us what is available to study and build on. It does not establish that our application is faster or better than another application. Checking the sources does not establish head-to-head speed or quality against a competitor. We should not write the conclusion as though that test had happened.',
      ] },
      { id: 'what-we-took', title: 'What we took', paragraphs: [
        'The base is zachlatta/freeflow, licensed under MIT. The talk-back idea came from mbailey/voicemode, also MIT. Live captions were rebuilt from FluidVoice’s idea. This is the useful account of the work: which source supplied the base, which supplied an interaction idea, and which idea we rebuilt. It is more precise than presenting everything in the app as an invention of our own.',
        'These parts belong to the same intended workflow: speaking to the agents we use for work. The research separated dictation from voice-to-agent projects because those are different roles. Our own usage history makes the connection concrete. Of 8,590 recorded dictations, 6,805 went straight into an agent terminal. The ledger rounds that to 79% of dictations going into an agent workspace.',
      ] },
      { id: 'what-our-history-shows', title: 'What our history shows', paragraphs: [
        'The history covers 13 August to 6 October: eight weeks, 97.6 hours of audio and about 792,000 words. It records 8,590 real dictations, with 99.8% transcribed. These are figures from our own pipeline history. They describe use of this system over that period. They are not a survey of other users or a promise about the result someone else will get.',
        'There were 18 failed dictations, and their audio was kept. Keeping that line beside the success rate makes the record easier to read. A percentage can hide the actual number of failures, especially when it is rounded. Here we can say both what completed and what did not. The preserved audio is part of the recorded failure state; the ledger does not claim every failure was later recovered.',
      ] },
      { id: 'what-we-can-say-today', title: 'What we can say today', paragraphs: [
        'The current record supports a simple account: we checked the field, selected a base, credited the sources of the ideas we used, and have a history of using the result in agent work. That is enough to explain why voice belongs in the workspace. It does not need a claim about winning against another product or replacing every other way of entering text.',
        'The publication boundary still matters. The MIT licences of the sources tell us about those sources. The usage history tells us about our recorded dictations. Neither is evidence that a SISO product is publicly available to install. We can explain what we built on and what our own history shows without making that extra claim. A public installation promise needs a separate check, just as a comparison needs a separate test.',
      ] },
    ],
    sources: ['Voice repository research, 23 September: 16 dictation and nine voice-to-agent projects; Aqua Voice teardown.', 'Claim ledger: voicecmp, voicelin, voiceuse, voiceagt (OBS).', 'PipelineHistory.sqlite counts cover 13 August–6 October; these are internal usage figures.'],
  },
];

export function getPost(slug: string) {
  return posts.find(post => post.slug === slug);
}

export function coverSrc(post: SisoBlogPost, size: 'web' | 'thumb' = 'web') {
  return `/siso-img/home/${size}/${post.cover}.webp`;
}

export function readingMinutes(post: SisoBlogPost) {
  const words = post.sections.flatMap(section => section.paragraphs).join(' ').split(/\s+/).length;
  return Math.ceil(words / 200);
}
