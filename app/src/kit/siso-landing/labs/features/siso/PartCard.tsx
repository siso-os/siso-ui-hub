// uihub: siso:landing (copied from the SISO landing, labs/features/siso/PartCard.tsx)
'use client';
// The skeleton's two-column ProductCard (label pill, title, CTAs, tab list | tab image), re-authored for SISO's five parts.
import { useState } from 'react';
import type { Part } from './data';

export default function PartCard({ part, icon, href, base }: { part: Part; icon: string; href: string; base: string }) {
  const [active, setActive] = useState(part.tabs[0].id);
  const tab = part.tabs.find(t => t.id === active) ?? part.tabs[0];
  return (
    <article className="pc" id={`part-${part.slug}`}>
      <div className="l">
        <div>
          <span className="eyebrow mono"><i style={part.status === 'Soon' ? { background: '#8f8a80', boxShadow: 'none' } : undefined} />{part.n} · {part.name} · {part.status}</span>
          <h3>{part.title}</h3>
        </div>
        <p className="offer">{part.offer}</p>
        {part.stat.length > 0 && (
          <div className="stats">{part.stat.map(s => <div key={s.k}><b>{s.v}</b><span>{s.k}</span></div>)}</div>
        )}
        <div className="ctas">
          <a className="btn" href={part.primary.href}>{part.primary.label}</a>
          <a className="btn ghost" href={href}>More on {part.name}</a>
        </div>
        <div className="tabs" role="tablist" aria-label={`${part.name} views`}>
          {part.tabs.map(t => (
            <button key={t.id} role="tab" aria-selected={t.id === active} aria-controls={`pv-${part.slug}`} onClick={() => setActive(t.id)}>{t.label}</button>
          ))}
        </div>
        <div className="ic" aria-hidden="true" dangerouslySetInnerHTML={{ __html: icon }} />
      </div>
      <div className="r" id={`pv-${part.slug}`} role="tabpanel">
        {part.tabs.map(t => (
          <img key={t.id} src={base + t.img} alt={t.alt} loading="lazy" width={1200} height={750} style={{ opacity: t.id === tab.id ? 1 : 0 }} />
        ))}
        <span className="note mono">{tab.note}</span>
      </div>
    </article>
  );
}
