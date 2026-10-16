// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/home-hero/HeroCards.tsx)
import STATS from '../../../data/siso-stats.json';
import ACTIVITY from '../../../data/agent-base-activity.json';
import HERO from './hero-v2.json';

// Hero v2 stat cards: the four numbers Shaan liked as pills, now each with a small coded visual drawn from the same data
// and its credit printed on the card (the full source shows on hover). Every mark is real: the city is commits per day,
// the sites bar is the registry's own split, the skills row has one tick per skill.

const stat = (key: string) => STATS.stats.find(s => s.key === key)!;
const day = (iso: string) => new Date(`${iso}T00:00:00Z`).getUTCDate();
const MONTH = new Date(`${ACTIVITY.last}T00:00:00Z`).toLocaleString('en-GB', { month: 'short', timeZone: 'UTC' });
const CREDIT = HERO.credits as Record<string, string>;

// A contributions city: one isometric tower per day, height by commits.
function City() {
  const max = Math.max(...ACTIVITY.days.map(d => d.commits));
  return (
    <svg viewBox="0 0 132 56" className="v2-viz v2-city" preserveAspectRatio="xMinYMax meet" role="img" aria-label="Commits per day">
      {ACTIVITY.days.map((d, i) => {
        const cx = 10 + i * 16, by = 50 - i * 1.5, h = 3 + (d.commits / max) * 36, a = 0.45 + 0.55 * (d.commits / max);
        const t = by - h;
        return (
          <g key={d.date} className="v2-tower" style={{ ['--i' as string]: i, opacity: a }}>
            <title>{`${day(d.date)} ${MONTH}: ${d.commits} commits`}</title>
            <path d={`M${cx - 6} ${t}L${cx} ${t + 3.5}L${cx} ${by + 3.5}L${cx - 6} ${by}Z`} fill="#FF6A1A" />
            <path d={`M${cx} ${t + 3.5}L${cx + 6} ${t}L${cx + 6} ${by}L${cx} ${by + 3.5}Z`} fill="#9c3a0e" />
            <path d={`M${cx - 6} ${t}L${cx} ${t - 3.5}L${cx + 6} ${t}L${cx} ${t + 3.5}Z`} fill="#FFC24B" />
          </g>
        );
      })}
    </svg>
  );
}

// The sites registry's own split: Corner Café, its 7 looks, 205 previews.
const SPLIT = [{ n: 1, label: 'Corner Café' }, { n: 7, label: 'looks' }, { n: 205, label: 'previews' }];
function SitesBar() {
  return (
    <div className="v2-viz v2-split" aria-hidden="true">
      <div className="v2-split-bar">{SPLIT.map(s => <i key={s.label} style={{ flexGrow: s.n }} />)}</div>
      <div className="v2-split-key">{SPLIT.map(s => <span key={s.label}><b>{s.n}</b> {s.label}</span>)}</div>
    </div>
  );
}

function SkillTicks({ n }: { n: number }) {
  return (
    <svg viewBox={`0 0 ${n * 4} 24`} className="v2-viz v2-ticks" preserveAspectRatio="none" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => <rect key={i} x={i * 4} y={i % 5 === 4 ? 0 : 8} width="2.6" height={i % 5 === 4 ? 24 : 16} rx="1.3" fill={i % 5 === 4 ? "#FFC24B" : "#FF6A1A"} />)}
    </svg>
  );
}

function IndexQuery() {
  return (
    <code className="v2-viz v2-query" aria-hidden="true">
      <span><em>where</em> public</span><span><em>and</em> stars &gt; 10</span>
    </code>
  );
}

const CARDS = [
  { ...stat('repos'), viz: <IndexQuery /> },
  { ...stat('sites'), viz: <SitesBar /> },
  { ...stat('skills'), viz: <SkillTicks n={Number(stat('skills').n)} /> },
  {
    key: 'commits', n: ACTIVITY.total.toLocaleString('en-US'), label: `commits, ${day(ACTIVITY.first)}–${day(ACTIVITY.last)} ${MONTH}`,
    href: '/agent-base/', source: `Agent Base: ${ACTIVITY._source}`, viz: <City />,
  },
];

export default function HeroCards() {
  return (
    <ul className="v2-cards" aria-label="What we have counted">
      {CARDS.map((c, i) => (
        <li key={c.key} style={{ ['--i' as string]: i }}>
          <a href={c.href} data-src={`Source: ${c.source}`}>
            <div className="v2-card-viz">{c.viz}</div>
            <b>{c.n}</b>
            <span className="v2-card-label">{c.label}</span>
            <span className="v2-credit">{CREDIT[c.key]}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
