// uihub: siso:site
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
  author: string;
  date: string;
  sections: { id: string; title: string; paragraphs: string[] }[];
  sources: string[];
}

export function readingMinutes(post: SisoBlogPost) {
  const words = post.sections.flatMap(section => section.paragraphs).join(' ').split(/\s+/).length;
  return Math.ceil(words / 200);
}
