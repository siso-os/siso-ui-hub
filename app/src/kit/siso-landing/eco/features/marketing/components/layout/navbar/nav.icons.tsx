// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/layout/navbar/nav.icons.tsx)
// ═══════════════════════════════════════════════════════════════════════════════
// Line icons - the nav's small icons, drawn here in one hand (24px grid, 1.6 stroke, round caps). They replace Foreplay's
// scraped paths. Each stroke has pathLength 1, so pointing at its parent (any element with .nvi-host) redraws it once
// (NAV_ICON_CSS). The bigger glass icons are NavGlyph (nav.glyphs.tsx); products keep ProductGlyph and the living kit.
// ═══════════════════════════════════════════════════════════════════════════════

export const NAV_ICON_CSS = `
.nvi{display:block;flex-shrink:0;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;overflow:visible}
.nvi path,.nvi rect,.nvi circle{stroke-dasharray:1;stroke-dashoffset:0}
.nvi-host:hover .nvi path,.nvi-host:hover .nvi rect,.nvi-host:hover .nvi circle,
.nvi-host:focus-visible .nvi path,.nvi-host:focus-visible .nvi rect,.nvi-host:focus-visible .nvi circle{animation:nvi-draw .7s cubic-bezier(.65,0,.35,1) both}
.nvi-host:hover .nvi :nth-child(2),.nvi-host:focus-visible .nvi :nth-child(2){animation-delay:.08s}
.nvi-host:hover .nvi :nth-child(3),.nvi-host:focus-visible .nvi :nth-child(3){animation-delay:.16s}
.nvi-host:hover .nvi :nth-child(n+4),.nvi-host:focus-visible .nvi :nth-child(n+4){animation-delay:.24s}
@keyframes nvi-draw{from{stroke-dashoffset:1}}
@media (prefers-reduced-motion:reduce){.nvi *{animation:none!important}}
`;

type Shape = { d?: string; rect?: [x: number, y: number, w: number, h: number, r: number]; circle?: [cx: number, cy: number, r: number] };

function Line({ shapes, size = 20 }: { shapes: Shape[]; size?: number }) {
  return (
    <svg className="nvi" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {shapes.map((s, i) => s.rect
        ? <rect key={i} pathLength={1} x={s.rect[0]} y={s.rect[1]} width={s.rect[2]} height={s.rect[3]} rx={s.rect[4]} />
        : s.circle
          ? <circle key={i} pathLength={1} cx={s.circle[0]} cy={s.circle[1]} r={s.circle[2]} />
          : <path key={i} pathLength={1} d={s.d} />)}
    </svg>
  );
}

const SHAPES = {
  cup: [{ d: 'M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z' }, { d: 'M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16' }, { d: 'M8.5 3.5v2.5M12 3.5v2.5' }],
  cloche: [{ d: 'M4.5 17a7.5 7.5 0 0 1 15 0z' }, { d: 'M3 20h18' }, { d: 'M12 9.5V7M10.5 7h3' }],
  scissors: [{ circle: [6.5, 6.5, 2.5] }, { circle: [6.5, 17.5, 2.5] }, { d: 'M8.6 8 20 18M8.6 16 20 6' }],
  comb: [{ rect: [3.5, 6, 17, 4, 1.5] }, { d: 'M6 10v7M9 10v7M12 10v7M15 10v7M18 10v7' }],
  lotus: [{ d: 'M12 20c-4.5 0-8-3.5-8-8 4.5 0 8 3.5 8 8z' }, { d: 'M12 20c4.5 0 8-3.5 8-8-4.5 0-8 3.5-8 8z' }, { d: 'M12 20c-2.4-4.4-2.4-9.4 0-15 2.4 5.6 2.4 10.6 0 15z' }],
  dumbbell: [{ d: 'M6.5 7v10M17.5 7v10' }, { d: 'M3.5 9.5v5M20.5 9.5v5' }, { d: 'M6.5 12h11' }],
  calendar: [{ rect: [4, 5, 16, 15, 2.5] }, { d: 'M4 9.5h16' }, { d: 'M8.5 3v4M15.5 3v4' }, { d: 'M9 14.5l2 2 4-4' }],
  tag: [{ d: 'M3.5 11.6V4.5a1 1 0 0 1 1-1h7.1l8.9 8.9-8.1 8.1z' }, { circle: [8, 8, 1.6] }],
  receipt: [{ d: 'M6 3h12v18l-3-2-3 2-3-2-3 2z' }, { d: 'M9 8h6M9 12h6' }, { d: 'M9 16h3' }],
  chat: [{ d: 'M4 5.5h16v11H9.5L4 20.5z' }, { d: 'M8.5 11h.01M12 11h.01M15.5 11h.01' }],
  bed: [{ d: 'M3 18.5v-12' }, { d: 'M3 14h18v4.5' }, { d: 'M21 14v-2.5a3 3 0 0 0-3-3h-7V14' }, { circle: [7, 11, 1.6] }],
  briefcase: [{ rect: [3, 7.5, 18, 12.5, 2.5] }, { d: 'M9 7.5V5.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5.5v2' }, { d: 'M3 12.5h18' }],
  spark: [{ d: 'M12 3.5v4M12 16.5v4M3.5 12h4M16.5 12h4' }, { circle: [12, 12, 2.5] }],
} satisfies Record<string, Shape[]>;

export type LineIconName = keyof typeof SHAPES;

export function LineIcon({ name, size }: { name: LineIconName; size?: number }) {
  return <Line shapes={SHAPES[name]} size={size} />;
}

// The Agency menu's industry families (data/agency-industries.json modules), one icon each for the kind of site it needs.
export const FAMILY_ICON: Record<string, LineIconName> = {
  'Menu (food & drink)': 'cloche',
  'Services + booking (appointments)': 'calendar',
  'Catalogue (retail)': 'tag',
  'Schedule + membership (classes)': 'dumbbell',
  'Services + quote (trades)': 'receipt',
  'Offers + WhatsApp (rentals, tours)': 'chat',
  'Rooms (stays)': 'bed',
  'Services + consult (professional)': 'briefcase',
  'Core only (other)': 'spark',
};

// The six verticals we build for now (SOLUTIONS in nav.data.ts), keyed by label; IndustriesPanel shows them under each photo.
export const SOLUTIONS_ICONS: Record<string, React.ReactNode> = {
  'Cafés & Coffee': <LineIcon name="cup" size={24} />,
  Restaurants: <LineIcon name="cloche" size={24} />,
  'Beauty & Hair Salons': <LineIcon name="scissors" size={24} />,
  'Barbers & Nail Salons': <LineIcon name="comb" size={24} />,
  'Spas & Clinics': <LineIcon name="lotus" size={24} />,
  'Yoga & Fitness': <LineIcon name="dumbbell" size={24} />,
};

export function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6.5 4.6v10.8a.9.9 0 0 0 1.37.77l8.4-5.4a.9.9 0 0 0 0-1.54l-8.4-5.4A.9.9 0 0 0 6.5 4.6z" fill="#fff" />
    </svg>
  );
}

export function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M10.5 4.5 15 9l-4.5 4.5M14.25 9H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
