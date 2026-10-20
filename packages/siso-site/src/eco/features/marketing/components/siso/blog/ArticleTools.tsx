// uihub: siso:site
'use client';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { ArrowLeft, Check, Copy } from 'lucide-react';
import { ProductGlyph } from '../ProductGlyph';
import type { SisoBlogPost } from './posts';
import { readingMinutes } from './posts';
import { formatDate, postTopic, topicStyle } from './topics';

export function markdownForPost(post: SisoBlogPost) {
  return `# ${post.title}\n\n${post.description}\n\n${post.author} · ${post.date} · ${readingMinutes(post)} min read\n\n${post.sections.map(s => `## ${s.title}\n\n${s.paragraphs.join('\n\n')}`).join('\n\n')}\n\n## Sources and scope\n\n${post.sources.map(s => `- ${s}`).join('\n')}\n`;
}
export function CopyPage({ post }: { post: SisoBlogPost }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  useEffect(() => { if (state === 'idle') return; const timer = setTimeout(() => setState('idle'), 3200); return () => clearTimeout(timer); }, [state]);
  async function copy() {
    try { await navigator.clipboard.writeText(markdownForPost(post)); setState('copied'); }
    catch { setState('failed'); }
  }
  return <><button className="sb-button sb-copy" onClick={copy}>{state === 'copied' ? <Check size={15} /> : <Copy size={15} />}{state === 'copied' ? 'Copied' : 'Copy page'}</button>
    <span className={`sb-toast${state !== 'idle' ? ' is-visible' : ''}`} role="status">{state === 'copied' ? <><Check size={15} color="#ffc24b" />Copied the post as Markdown</> : state === 'failed' ? 'Copy unavailable. Allow clipboard access and try again.' : ''}</span></>;
}

// The topic pill with its glyph, which plays while the pill is hovered.
export function TopicPill({ post }: { post: SisoBlogPost }) {
  const topic = postTopic(post);
  const [on, setOn] = useState(false);
  return <a className="sb-pill" style={topicStyle(topic)} href={`/blog/?topic=${topic.id}`} onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)} onFocus={() => setOn(true)} onBlur={() => setOn(false)}>
    <ProductGlyph product={topic.glyph} size={22} playing={on ? true : undefined} />{topic.name}
  </a>;
}

// Sets data-live on its section while it is on screen, so loops inside it (the Rail's spark) pause off screen.
export function LiveSection({ className, labelledBy, children }: { className: string; labelledBy?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => ref.current?.toggleAttribute('data-live', e.isIntersecting));
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <aside ref={ref} className={className} aria-labelledby={labelledBy}>{children}</aside>;
}

// uihub: nav/sidebar — the article rail: back, the topic card with the post's facts, a TOC whose rail line fills in ember as
// you read (the head of the line is where you are), the active section lit, and Copy page.
export function ArticleRail({ post, relatedPosts = [], articleId = "article-body", blogHref = "/blog/" }: { post: SisoBlogPost; relatedPosts?: readonly SisoBlogPost[]; articleId?: string; blogHref?: string }) {
  const [active, setActive] = useState(post.sections[0]?.id || 'sources');
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const article = document.getElementById(articleId);
      if (!article) return;
      const heads = [...article.querySelectorAll<HTMLElement>('h2[id]')];
      let current = heads[0]?.id;
      for (const h of heads) if (h.getBoundingClientRect().top <= 200) current = h.id;
      if (current) setActive(current);
      const box = article.getBoundingClientRect();
      const travel = Math.max(1, box.height - window.innerHeight * 0.6);
      setProgress(Math.min(1, Math.max(0, (window.innerHeight * 0.4 - box.top) / travel)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [post, articleId]);
  const topic = postTopic(post);
  const [on, setOn] = useState(false);
  const inTopic = relatedPosts.filter(p => postTopic(p).id === topic.id).length;
  const items = [...post.sections, { id: 'sources', title: 'Sources and scope' }];
  const pct = Math.round(progress * 100);
  return <aside className="sb-article-rail" style={topicStyle(topic)} aria-label="Article tools">
    <a className="sb-back" href={blogHref}><ArrowLeft size={16} />All posts</a>
    <div className="sb-rail-card">
      <a className="sb-rail-topic" href={`/blog/?topic=${topic.id}`} onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)} onFocus={() => setOn(true)} onBlur={() => setOn(false)}>
        <ProductGlyph product={topic.glyph} size={38} playing={on ? true : undefined} /><span>{topic.name}{relatedPosts.length > 0 && <small>{inTopic} {inTopic === 1 ? 'post' : 'posts'}</small>}</span>
      </a>
      <dl className="sb-rail-facts">
        <div><dt>Published</dt><dd>{formatDate(post.date).replace(/ \d{4}$/, '')}</dd></div>
        <div><dt>Read</dt><dd>{readingMinutes(post)} min</dd></div>
        <div><dt>Parts</dt><dd>{post.sections.length}</dd></div>
      </dl>
    </div>
    <nav aria-label="On this page"><h2 className="sb-eyebrow">On this page</h2>
      <ol className="sb-toc" style={{ '--p': progress } as CSSProperties}>
        <i className="sb-toc-fill" aria-hidden="true" />
        {items.map((s, i) => <li key={s.id}><a href={`#${s.id}`} aria-current={active === s.id ? 'location' : undefined}><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</a></li>)}
      </ol>
    </nav>
    <div className="sb-rail-progress" role="progressbar" aria-label="Reading progress" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><span>Read so far</span><b>{pct}%</b></div>
    <div className="sb-rail-actions"><CopyPage post={post} /></div>
  </aside>;
}
