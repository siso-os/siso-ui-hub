// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/changelog-page/ChangelogPage.tsx)
'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import Footer from '../../Footer/index';
import GitHubButton from '../ui/GitHubButton';
import { ProductGlyph } from '../ProductGlyph';
import LOG from '../../../data/changelog.json';
import { TAGS, TAG_ORDER, type Tag } from './products';
import { CHANGELOG_CSS } from './styles';

// /changelog/: what we shipped, newest first (spec docs/specs/finish-lanes.md, lane changelog-contact). Every entry is a
// commit from this repo's git log (data/changelog.json, written by scripts/changelog-data.mjs; never typed by hand).
// A commit wall up top (one tile per commit, coloured by the product it touched most), a product filter, then the days.

type Entry = { hash: string; date: string; time: string; subject: string; products: Tag[]; files: number };
const ENTRIES = LOG.entries as Entry[];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// Fixed formatting (no locale), so the static export and the browser render the same text.
function day(date: string) {
  const [y, m, d] = date.split('-').map(Number);
  return { weekday: DAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()], short: `${d} ${MONTHS[m - 1]}`, long: `${d} ${MONTHS[m - 1]} ${y}` };
}

function groupByDay(list: Entry[]) {
  const out: { date: string; items: Entry[] }[] = [];
  for (const e of list) {
    const last = out[out.length - 1];
    if (last?.date === e.date) last.items.push(e);
    else out.push({ date: e.date, items: [e] });
  }
  return out;
}

const ALL_DAYS = groupByDay(ENTRIES);
const COUNTS = TAG_ORDER.map(tag => ({ tag, n: ENTRIES.filter(e => e.products.includes(tag)).length })).filter(c => c.n > 0);

function Chip({ tag, n, pressed, onPick }: { tag: Tag | 'all'; n: number; pressed: boolean; onPick: (t: Tag | 'all') => void }) {
  const [on, setOn] = useState(false);
  const t = tag === 'all' ? { label: 'Everything', color: '#ff6a1a', tint: '#ffd59a', glyph: 'all' as const } : TAGS[tag];
  return (
    <button type="button" className="scl-chip scl-neon" aria-pressed={pressed} aria-controls="scl-days" onClick={() => onPick(tag)}
      style={{ '--tag': t.color, '--tint': t.tint } as CSSProperties}
      onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)} onFocus={() => setOn(true)} onBlur={() => setOn(false)}>
      <ProductGlyph product={t.glyph} size={26} playing={on || pressed ? true : undefined} />
      <span>{t.label}</span><b>{n}</b>
    </button>
  );
}

function TagPill({ tag }: { tag: Tag }) {
  const t = TAGS[tag];
  return <span className="scl-tag" style={{ '--tag': t.color, '--tint': t.tint } as CSSProperties}><i />{t.label}</span>;
}

export default function ChangelogPage() {
  const [filter, setFilter] = useState<Tag | 'all'>('all');
  const [lit, setLit] = useState<string | null>(null);
  const hero = useRef<HTMLElement>(null);
  const wall = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => {
      const p = new URLSearchParams(location.search).get('product') as Tag | null;
      setFilter(p && COUNTS.some(c => c.tag === p) ? p : 'all');
    };
    sync();
    window.addEventListener('popstate', sync);
    // On a narrow screen the wall scrolls: start at its newest end.
    if (wall.current) wall.current.scrollLeft = wall.current.scrollWidth;
    const el = hero.current;
    const io = new IntersectionObserver(([e]) => el?.toggleAttribute('data-live', e.isIntersecting));
    if (el) io.observe(el);
    return () => { window.removeEventListener('popstate', sync); io.disconnect(); };
  }, []);

  const pick = (t: Tag | 'all') => {
    const next = t === filter ? 'all' : t;
    setFilter(next);
    const url = new URL(location.href);
    if (next === 'all') url.searchParams.delete('product'); else url.searchParams.set('product', next);
    history.replaceState(null, '', url);
  };

  const days = useMemo(() => filter === 'all' ? ALL_DAYS
    : groupByDay(ENTRIES.filter(e => e.products.includes(filter))), [filter]);
  const shown = days.reduce((n, d) => n + d.items.length, 0);

  const jump = (hash: string) => {
    if (filter !== 'all' && !ENTRIES.find(e => e.hash === hash)?.products.includes(filter)) pick('all');
    requestAnimationFrame(() => {
      const el = document.getElementById(`c-${hash}`);
      if (!el) return;
      el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
      el.classList.remove('is-flash'); void el.offsetWidth; el.classList.add('is-flash');
    });
  };

  return (
    <div className="scl">
      <style>{CHANGELOG_CSS}</style>
      <section ref={hero} className="scl-hero" aria-labelledby="scl-title">
        <div className="scl-glow" aria-hidden="true" />
        <div className="scl-wrap">
          <span className="scl-over">Changelog</span>
          <h1 id="scl-title">What we <span>shipped.</span></h1>
          <p className="scl-line">Every line here is a commit to this site, read from its git log. Newest first, tagged by the product it touched.</p>
          <ul className="scl-stats">
            <li><b>{ENTRIES.length}</b><span>commits</span></li>
            <li><b>{ALL_DAYS.length}</b><span>days with a ship</span></li>
            <li><b>{COUNTS.filter(c => c.tag !== 'site' && c.tag !== 'docs').length}</b><span>products touched</span></li>
            <li><b>{day(ALL_DAYS[0].date).short}</b><span>last ship</span></li>
          </ul>

          <div ref={wall} className="scl-wall" role="group" aria-label="Every commit, one tile each, grouped by day">
            {[...ALL_DAYS].reverse().map(d => (
              <div key={d.date} className="scl-wall-day">
                <div className="scl-wall-tiles">
                  {[...d.items].reverse().map(e => {
                    const dim = filter !== 'all' && !e.products.includes(filter);
                    // Filtered: matching tiles take the filter's colour, so the wall shows where that product moved.
                    const t = TAGS[filter !== 'all' && !dim ? filter : e.products[0]];
                    return (
                      <button key={e.hash} type="button" className={`scl-tile${dim ? ' is-dim' : ''}${lit === e.hash ? ' is-lit' : ''}`}
                        style={{ '--tag': t.color, '--tint': t.tint } as CSSProperties}
                        aria-label={`${day(e.date).short}: ${e.subject}`} onClick={() => jump(e.hash)}
                        onMouseEnter={() => setLit(e.hash)} onMouseLeave={() => setLit(null)} onFocus={() => setLit(e.hash)} onBlur={() => setLit(null)} />
                    );
                  })}
                </div>
                <span className="scl-wall-label"><b>{d.items.length}</b>{day(d.date).short}</span>
              </div>
            ))}
          </div>
          <p className="scl-wall-hint" aria-live="polite">
            {lit ? (() => { const e = ENTRIES.find(x => x.hash === lit)!; return <><code>{e.hash}</code>{e.subject}</>; })()
              : <>One tile per commit. Point at one to read it; click to jump to it.</>}
          </p>
        </div>
      </section>

      <div className="scl-rail" aria-hidden="true"><i><span /></i></div>

      <section className="scl-body" aria-label="Changes">
        <div className="scl-wrap">
          <div className="scl-filter" role="toolbar" aria-label="Filter by product">
            <Chip tag="all" n={ENTRIES.length} pressed={filter === 'all'} onPick={pick} />
            {COUNTS.map(c => <Chip key={c.tag} tag={c.tag} n={c.n} pressed={filter === c.tag} onPick={pick} />)}
          </div>
          <p className="scl-showing" aria-live="polite">
            Showing <b>{shown}</b> of {ENTRIES.length} commits{filter !== 'all' && <> touching <b style={{ color: TAGS[filter].tint }}>{TAGS[filter].label}</b></>}
          </p>

          <ol id="scl-days" className="scl-days">
            {days.map(d => {
              const f = day(d.date);
              return (
                <li key={d.date} className="scl-day">
                  <div className="scl-day-head">
                    <time dateTime={d.date}><b>{f.short}</b><span>{f.weekday} · {d.date.slice(0, 4)}</span></time>
                    <span className="scl-day-n">{d.items.length} {d.items.length === 1 ? 'commit' : 'commits'}</span>
                  </div>
                  <ul className="scl-list">
                    {d.items.map(e => (
                      <li key={e.hash} id={`c-${e.hash}`} className={`scl-entry scl-neon${lit === e.hash ? ' is-lit' : ''}`}
                        style={{ '--tag': TAGS[e.products[0]].color } as CSSProperties} tabIndex={0}
                        onMouseEnter={() => setLit(e.hash)} onMouseLeave={() => setLit(null)}>
                        <div className="scl-tags">
                          {e.products.slice(0, 3).map(p => <TagPill key={p} tag={p} />)}
                          {e.products.length > 3 && <span className="scl-more" title={e.products.slice(3).map(p => TAGS[p].label).join(', ')}>+{e.products.length - 3}</span>}
                        </div>
                        <p className="scl-subject">{e.subject}</p>
                        <div className="scl-meta"><code>{e.hash}</code><span>{e.time}</span><span>{e.files} {e.files === 1 ? 'file' : 'files'}</span></div>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>

          <div className="scl-end">
            <GitHubButton label="See our repos on GitHub" />
            <p className="scl-src">Source: {LOG._source} Generated {LOG.generated}.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
