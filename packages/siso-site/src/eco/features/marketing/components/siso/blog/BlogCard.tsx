// uihub: siso:site
'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { readingMinutes, type SisoBlogPost } from './posts';
import { formatDate, postTopic, topicStyle } from './topics';
import BlogHeader from './BlogHeader';

// uihub: card/blog — glass-blog-card-shadcnui, with SISO's footer neon rim in the topic's colour. Hover (or keyboard focus)
// lifts the card, zooms the header slowly, plays the product glyph and slides up an info strip.
export function PostMeta({ post }: { post: SisoBlogPost }) {
  return <div className="sb-meta"><span>{post.author}</span><i /><time dateTime={post.date}>{formatDate(post.date)}</time><i /><span>{readingMinutes(post)} min read</span></div>;
}
export default function BlogCard({ post, featured = false, href }: { post: SisoBlogPost; featured?: boolean; href?: string }) {
  const topic = postTopic(post);
  const ref = useRef<HTMLAnchorElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => ref.current?.toggleAttribute('data-live', e.isIntersecting));
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const minutes = readingMinutes(post);
  return <a ref={ref} href={href ?? `/blog/${post.slug}/`} className={`sb-card sb-neon${featured ? ' sb-featured' : ''}`} style={topicStyle(topic)}
    onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)} onFocus={() => setOn(true)} onBlur={() => setOn(false)}>
    <div className="sb-card-art">
      <BlogHeader {...post} topic={topic} eager={featured} playing={on} />
      <div className="sb-card-strip" aria-hidden="true"><span>{minutes} min read · {topic.name}</span><time dateTime={post.date}>{formatDate(post.date)}</time><span>Read <ArrowUpRight size={14} /></span></div>
    </div>
    {featured ? <div className="sb-card-copy">
      <div className="sb-feat-main">
        <div className="sb-card-kicker"><span><i className="sb-dot" />Featured · {topic.name}</span><time dateTime={post.date}>{formatDate(post.date)}</time></div>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
      </div>
      <div className="sb-feat-side">
        <span className="sb-eyebrow">In this post</span>
        <ol className="sb-card-inside">
          {post.sections.map((s, i) => <li key={s.id} style={{ transitionDelay: `${i * 60}ms` }}><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</li>)}
        </ol>
        <div className="sb-card-footer"><span>SISO Labs <span aria-hidden="true">/</span> {minutes} min read</span><span className="sb-card-cta">Read the post <ArrowUpRight size={16} /></span></div>
      </div>
    </div> : <div className="sb-card-copy">
      <div className="sb-card-kicker"><span><i className="sb-dot" />{topic.name}</span><time dateTime={post.date}>{formatDate(post.date)}</time></div>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <div className="sb-card-footer"><span>SISO Labs <span aria-hidden="true">/</span> {minutes} min read</span><span className="sb-card-arrow" aria-hidden="true"><ArrowUpRight size={18} /></span></div>
    </div>}
  </a>;
}
