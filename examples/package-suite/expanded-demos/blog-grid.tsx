// uihub: siso:package-workbench
// Hand-wired: Arc's docs example plus the state and sample data it references
// From Arc's docs page (Usage), imports pointed at the copied source
import { BlogGrid } from "@siso/ui/blocks/source";
import type { BlogPost } from "@siso/ui/blocks/source";

export function BlogIndex({ posts }: { posts: BlogPost[] }) {
  return (
    <BlogGrid
      posts={posts}
      categories={["Product", "Design", "Engineering", "Company"]}
      getHref={post => `/blog/${post.id}`}
    />
  );
}

const posts: BlogPost[] = [
  {
    id: "operator-console-rebuild",
    title: "Rebuilding the operator console around three decisions",
    excerpt: "A shift lead only ever asks what is live, what broke, and who is on it. The console now answers those three first.",
    category: "Design",
    date: "2026-10-09",
    readTime: 7,
    author: { name: "Jasmine Brooks", role: "Design lead", avatar: "https://picsum.photos/seed/jasmine-brooks/640/360" },
    image: { src: "https://picsum.photos/seed/operator-console/640/360", alt: "Sketches of the operator console layout" },
    featured: true,
  },
  {
    id: "streaming-cursors",
    title: "Streaming cursors that survive a reconnect",
    excerpt: "We moved resume tokens out of memory and into the event log, so a dropped socket replays instead of restarting.",
    category: "Engineering",
    date: "2026-10-03",
    readTime: 9,
    author: { name: "Theo Park", role: "Backend engineer", avatar: "https://picsum.photos/seed/theo-park/640/360" },
    image: { src: "https://picsum.photos/seed/streaming-cursors/640/360", alt: "A reconnecting stream timeline" },
  },
  {
    id: "pricing-page-rewrite",
    title: "What we learned rewriting the pricing page",
    excerpt: "Four plans, one comparison table, and a billing toggle later: fewer choices converted better than clearer ones.",
    category: "Product",
    date: "2026-09-25",
    readTime: 5,
    author: { name: "Emma Collins", role: "Product designer", avatar: "https://picsum.photos/seed/emma-collins/640/360" },
    image: { src: "https://picsum.photos/seed/pricing-rewrite/640/360", alt: "Pricing page wireframes" },
  },
  {
    id: "hiring-two-engineers",
    title: "Hiring two engineers without slowing the roadmap",
    excerpt: "How we cut the interview loop to four hours and kept every review spend on real work in the repo.",
    category: "Company",
    date: "2026-09-18",
    readTime: 6,
    author: { name: "Nathan Cole", role: "Engineering manager", avatar: "https://picsum.photos/seed/nathan-cole/640/360" },
    image: { src: "https://picsum.photos/seed/hiring-loop/640/360", alt: "An interview loop diagram" },
  },
  {
    id: "design-tokens-v3",
    title: "Design tokens v3: one source for every surface",
    excerpt: "Every colour, radius and duration now flows from one file, and the type scale stops drifting between apps.",
    category: "Design",
    date: "2026-09-11",
    readTime: 4,
    author: { name: "Chloe Nguyen", role: "Data analyst", avatar: "https://picsum.photos/seed/chloe-nguyen/640/360" },
    image: { src: "https://picsum.photos/seed/design-tokens/640/360", alt: "A token table" },
  },
  {
    id: "postgres-to-partitions",
    title: "Moving the events table to monthly partitions",
    excerpt: "A 400 GB table, a maintenance window we did not have, and the two migrations that made the cut.",
    category: "Engineering",
    date: "2026-09-04",
    readTime: 11,
    author: { name: "Daniel Kim", role: "Backend engineer", avatar: "https://picsum.photos/seed/daniel-kim/640/360" },
    image: { src: "https://picsum.photos/seed/partitions/640/360", alt: "A partition range chart" },
  },
];

export default function BlogGridDemo() {
  return <BlogIndex posts={posts} />;
}
