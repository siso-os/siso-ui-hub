// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/blog/SisoBlogIndex.tsx)
'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Search, ArrowUpRight, X } from 'lucide-react';
import Footer from '../../Footer/index';
import { ProductGlyph, type Product } from '../ProductGlyph';
import BlogCard from './BlogCard';
import { RollingStat } from './Figures';
import { posts, readingMinutes } from './posts';
import { activeTopics, postTopic } from './topics';
import { blogStyles } from './styles';

// uihub: card/blog — OpenAI's developer blog layout (search, Topics and Recent on the left; a big featured post, then a
// grid) in the footer's language. Stats are computed from posts.ts, never typed.
function TopicButton({ id, name, glyph, count, color, pressed, onPick }: { id: string; name: string; glyph: Product; count: number; color?: string; pressed: boolean; onPick: (id: string) => void }) {
  const [on, setOn] = useState(false);
  return <button className="sb-topic" style={color ? { '--topic': color } as CSSProperties : undefined} aria-pressed={pressed} aria-controls="siso-blog-posts" onClick={() => onPick(id)}
    onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)} onFocus={() => setOn(true)} onBlur={() => setOn(false)}>
    <ProductGlyph product={glyph} size={32} playing={on || pressed ? true : undefined} /><span>{name}</span><b>{count}</b>
  </button>;
}

export default function SisoBlogIndex() {
  const [topic, setTopic] = useState('all');
  const [query, setQuery] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    const sync = () => {
      const id = new URLSearchParams(location.search).get('topic');
      setTopic(activeTopics.some(t => t.id === id) ? id! : 'all');
    };
    sync(); window.addEventListener('popstate', sync);
    const keyboard = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey && !target.closest('input,textarea,select,[contenteditable="true"]')) { e.preventDefault(); input.current?.focus(); }
    };
    document.addEventListener('keydown', keyboard);
    const observer = new IntersectionObserver(([entry]) => hero.current?.toggleAttribute('data-live', entry.isIntersecting));
    if (hero.current) observer.observe(hero.current);
    return () => { window.removeEventListener('popstate', sync); document.removeEventListener('keydown', keyboard); observer.disconnect(); };
  }, []);
  function choose(id: string) {
    setTopic(id);
    const url = new URL(location.href);
    if (id === 'all') url.searchParams.delete('topic'); else url.searchParams.set('topic', id);
    history.pushState(null, '', url);
  }
  const q = query.trim().toLocaleLowerCase();
  const visible = posts.filter(p => (topic === 'all' || postTopic(p).id === topic) && `${p.title} ${p.description} ${postTopic(p).name}`.toLocaleLowerCase().includes(q));
  const featured = !q && topic === 'all' ? visible[0] : null;
  const grid = featured ? visible.slice(1) : visible;
  const minutes = posts.reduce((n, p) => n + readingMinutes(p), 0);
  return <div className="siso-blog">
    <style>{blogStyles}</style>
    <div className="sb-shell">
      <section className="sb-index-hero" ref={hero} aria-labelledby="blog-title">
        <div className="sb-hero-ambient" aria-hidden="true" />
        <div>
          <span className="sb-eyebrow sb-orange"><i className="sb-status-dot" /> The SISO Labs blog</span>
          <h1 id="blog-title">How we build SISO,<br /><span>and the numbers behind it.</span></h1>
          <p>Research, tools and builds from across the SISO ecosystem. Every post ends with the sources for its numbers.</p>
        </div>
        <div className="sb-stats" aria-label="Blog in numbers">
          <RollingStat label="Posts" n={String(posts.length)} />
          <RollingStat label="Topics" n={String(activeTopics.length)} />
          <RollingStat label="Minutes to read" n={String(minutes)} />
        </div>
      </section>
      <div className="sb-index-layout">
        <aside className="sb-index-rail" aria-label="Explore the blog">
          <label className="sb-search"><Search size={16} /><span className="sb-sr-only">Search posts</span><input ref={input} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search posts" type="search" />{query ? <button onClick={() => { setQuery(''); input.current?.focus(); }} aria-label="Clear search"><X size={14} /></button> : <kbd aria-hidden="true">/</kbd>}</label>
          <div className="sb-topic-heading sb-eyebrow">Topics</div>
          <div className="sb-topics" role="group" aria-label="Filter posts by topic">
            <TopicButton id="all" name="All posts" glyph="all" count={posts.length} pressed={topic === 'all'} onPick={choose} />
            {activeTopics.map(t => <TopicButton key={t.id} id={t.id} name={t.name} glyph={t.glyph} color={t.color} count={posts.filter(p => postTopic(p).id === t.id).length} pressed={topic === t.id} onPick={choose} />)}
          </div>
          <div className="sb-recents"><h2 className="sb-eyebrow">Recent</h2>{posts.slice(0, 3).map((p, i) => <a key={p.slug} href={`/blog/${p.slug}/`}><span>0{i + 1}</span><span>{p.title}</span><ArrowUpRight size={15} /></a>)}</div>
          <a className="sb-lab-link" href="/blog/headers/">How the headers are made <ArrowUpRight size={15} /></a>
        </aside>
        <section className="sb-results" aria-label="Posts">
          <div className="sb-results-heading"><h2 className="sb-eyebrow">{topic === 'all' ? (q ? 'Search results' : 'Latest') : activeTopics.find(t => t.id === topic)?.name}</h2><span role="status" aria-live="polite">{visible.length} of {posts.length} posts</span></div>
          <div id="siso-blog-posts">
            {featured && <BlogCard post={featured} featured />}
            {!!grid.length && <div className="sb-grid">{grid.map(p => <BlogCard key={`${topic}-${q}-${p.slug}`} post={p} />)}</div>}
            {!visible.length && <div className="sb-empty"><Search size={28} /><h2>No posts match “{query.trim()}”.</h2><p>Try another word, or look through every topic.</p><button className="sb-button" onClick={() => { setQuery(''); choose('all'); input.current?.focus(); }}>Show all posts <ArrowUpRight size={16} /></button></div>}
          </div>
          {visible.length > 0 && <div className="sb-endnote"><span className="sb-status-dot" /><span>That is every post so far. More as we build.</span></div>}
        </section>
      </div>
    </div><Footer />
  </div>;
}
