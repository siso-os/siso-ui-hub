/** Sample posts for the blog grid. Photos and portraits live in public/media (credits in public/media/CREDITS.md). */

export type BlogAuthor = { name: string; avatar?: string; role?: string };

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date, used for sorting and the visible date. */
  date: string;
  /** Minutes to read. */
  readTime: number;
  author: BlogAuthor;
  image?: { src: string; alt: string };
  /** Paragraphs for the in-place reader. Leave out when every post links out through getHref. */
  body?: string[];
  featured?: boolean;
};

const emma: BlogAuthor = { name: "Emma Collins", role: "Product designer", avatar: new URL("../../media/media/people/emma-collins.jpg", import.meta.url).href };
const marcus: BlogAuthor = { name: "Marcus Johnson", role: "Frontend engineer", avatar: new URL("../../media/media/people/marcus-johnson.jpg", import.meta.url).href };
const jasmine: BlogAuthor = { name: "Jasmine Brooks", role: "Design lead", avatar: new URL("../../media/media/people/jasmine-brooks.jpg", import.meta.url).href };
const daniel: BlogAuthor = { name: "Daniel Kim", role: "Backend engineer", avatar: new URL("../../media/media/people/daniel-kim.jpg", import.meta.url).href };
const sofia: BlogAuthor = { name: "Sofia Ramirez", role: "Operations lead", avatar: new URL("../../media/media/people/sofia-ramirez.jpg", import.meta.url).href };
const chloe: BlogAuthor = { name: "Chloe Nguyen", role: "Data analyst", avatar: new URL("../../media/media/people/chloe-nguyen.jpg", import.meta.url).href };
const nathan: BlogAuthor = { name: "Nathan Cole", role: "Engineering manager", avatar: new URL("../../media/media/people/nathan-cole.jpg", import.meta.url).href };

export const blogCategories = ["Product", "Design", "Engineering", "Company"];

export const blogPosts: BlogPost[] = [
  {
    id: "quiet-software", featured: true, category: "Design", date: "2026-09-18", readTime: 7, author: jasmine,
    title: "The case for quiet software",
    excerpt: "Why we removed half the colors from our interface and people started finishing work faster.",
    image: { src: new URL("../../media/media/photos/living-room.jpg", import.meta.url).href, alt: "A bright living room with timber beams, arched windows, and cream sofas" },
    body: [
      "Last spring we ran an experiment. We took the busiest screen in the product and removed every color that did not carry meaning. Status stayed. Selection stayed. Everything else went neutral.",
      "Nobody asked for it, and almost nobody noticed the change directly. What they noticed was that the screen felt easier. Task completion went up eleven percent in the first month.",
      "Quiet does not mean empty. It means every element has a job, and the loud moments are saved for the things that need attention.",
    ],
  },
  {
    id: "offline-sync", category: "Engineering", date: "2026-09-12", readTime: 9, author: daniel,
    title: "How offline sync actually works",
    excerpt: "Conflict free replicated data, explained with the bugs we hit on the way to shipping it.",
    image: { src: new URL("../../media/media/photos/curved-facade.jpg", import.meta.url).href, alt: "A white tiled building facade with curved balconies" },
    body: ["Every edit you make is stored locally first and sent to the server when a connection is available. The hard part is what happens when two people change the same thing while apart.", "We use a sequence CRDT for text and last writer wins for simple fields, with a few careful exceptions we cover here."],
  },
  {
    id: "lisbon-offsite", category: "Company", date: "2026-09-04", readTime: 4, author: sofia,
    title: "What we learned from a week in Lisbon",
    excerpt: "Forty people, one shared roadmap, and no slides allowed. Notes from our autumn offsite.",
    image: { src: new URL("../../media/media/photos/lisbon-rooftops.jpg", import.meta.url).href, alt: "Terracotta rooftops of Lisbon running down to the river" },
    body: ["We banned slides for the week. Every session started with a written memo and ten minutes of silent reading.", "It was the most productive offsite we have run, and the roadmap we left with has held up better than any before it."],
  },
  {
    id: "shared-views", category: "Product", date: "2026-08-28", readTime: 3, author: emma,
    title: "Shared views are here",
    excerpt: "Save a filter, name it, and share it with your team. Everyone sees the same thing, always current.",
    image: { src: new URL("../../media/media/photos/home-office.jpg", import.meta.url).href, alt: "A home office with a wooden desk and deep green walls" },
    body: ["Saved filters were the most requested feature of the year. Today they become shared views: name a view, pick who sees it, and it stays in sync as the data changes."],
  },
  {
    id: "type-scale", category: "Design", date: "2026-08-21", readTime: 6, author: jasmine,
    title: "Choosing a type scale you will not regret",
    excerpt: "Seven sizes, two weights, and the rules we use to keep them that way as the product grows.",
    image: { src: new URL("../../media/media/photos/concert-hall.jpg", import.meta.url).href, alt: "Curved stainless steel panels of the Walt Disney Concert Hall against a blue sky" },
    body: ["A type scale is a promise. Every new size you add makes the next decision harder.", "We settled on seven sizes and two weights, and wrote down when each one is allowed."],
  },
  {
    id: "query-planner", category: "Engineering", date: "2026-08-14", readTime: 11, author: marcus,
    title: "Making search ten times faster",
    excerpt: "A new query planner, a smarter index, and one very embarrassing N plus one we found along the way.",
    image: { src: new URL("../../media/media/photos/mountain-ridges.jpg", import.meta.url).href, alt: "Layered mountain ridges under a warm evening sky" },
    body: ["Search used to take around 400 milliseconds at the ninety fifth percentile. It now takes 38.", "Most of the gain came from the planner. The rest came from deleting code we should never have written."],
  },
  {
    id: "remote-rituals", category: "Company", date: "2026-08-06", readTime: 5, author: nathan,
    title: "The rituals that keep a remote team close",
    excerpt: "Written standups, demo Fridays and the one meeting we will never cancel.",
    image: { src: new URL("../../media/media/photos/sunroom.jpg", import.meta.url).href, alt: "A sunroom with a round dining table, plants, and windows on three sides" },
    body: ["We work across nine time zones. The rituals that survive are the ones that respect that."],
  },
  {
    id: "usage-insights", category: "Product", date: "2026-07-30", readTime: 4, author: chloe,
    title: "Usage insights for every workspace",
    excerpt: "See which features your team relies on, where people get stuck, and what changed this week.",
    image: { src: new URL("../../media/media/photos/alpine-lake.jpg", import.meta.url).href, alt: "A calm alpine lake reflecting a rocky peak at golden hour" },
    body: ["Admins can now open Insights from workspace settings. It shows adoption per feature, trends over time and a weekly summary by email."],
  },
  {
    id: "motion-rules", category: "Design", date: "2026-07-22", readTime: 8, author: emma,
    title: "Motion should explain, not decorate",
    excerpt: "Our rules for animation: every movement answers where something came from or where it went.",
    image: { src: new URL("../../media/media/photos/terracotta-waves.jpg", import.meta.url).href, alt: "Wavy terracotta walls rising toward a blue sky" },
    body: ["If you cannot say what an animation explains, remove it. That single rule removed a third of our motion code."],
  },
  {
    id: "postgres-upgrade", category: "Engineering", date: "2026-07-15", readTime: 10, author: daniel,
    title: "Upgrading Postgres with zero downtime",
    excerpt: "Logical replication, a dry run on a copy of production, and a cutover that took four seconds.",
    image: { src: new URL("../../media/media/photos/coastline.jpg", import.meta.url).href, alt: "A long coastline with waves rolling onto a beach below green cliffs" },
    body: ["We moved two terabytes to a new major version while customers kept working. Here is the runbook."],
  },
  {
    id: "series-b", category: "Company", date: "2026-07-08", readTime: 3, author: sofia,
    title: "Our next chapter",
    excerpt: "We raised a Series B to build the calmest tool for teams. Here is what changes and what does not.",
    image: { src: new URL("../../media/media/photos/sea-at-dusk.jpg", import.meta.url).href, alt: "A calm sea at dusk with a low island on the horizon" },
    body: ["The product stays the same price. The team doubles. The roadmap gets faster."],
  },
  {
    id: "keyboard-first", category: "Product", date: "2026-06-30", readTime: 5, author: marcus,
    title: "A keyboard shortcut for everything",
    excerpt: "Press question mark anywhere to see every shortcut, then make your own.",
    image: { src: new URL("../../media/media/photos/reading-chair.jpg", import.meta.url).href, alt: "A grey armchair and ottoman with a knit throw in a dark green room" },
    body: ["Every action in the product now has a shortcut, and you can remap any of them from settings."],
  },
  {
    id: "color-tokens", category: "Design", date: "2026-06-24", readTime: 6, author: jasmine,
    title: "Naming color tokens by job, not by hue",
    excerpt: "Why surface and border beat gray-100 and gray-200, and how we migrated four hundred files.",
    image: { src: new URL("../../media/media/photos/pool-house.jpg", import.meta.url).href, alt: "A modern glass house beside a long pool under a clear sky" },
    body: ["Semantic tokens let dark mode, high contrast and brand themes share one component codebase."],
  },
];
