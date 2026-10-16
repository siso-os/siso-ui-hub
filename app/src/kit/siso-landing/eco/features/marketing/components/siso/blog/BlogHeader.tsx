// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/blog/BlogHeader.tsx)
import { ProductGlyph, type Product } from '../ProductGlyph';
import backgrounds from '../../../data/blog-backgrounds.json';
import { type BlogTopic, topicStyle } from './topics';

// uihub: card/blog — CoinGecko's review header in SISO's language: a topic-coloured frame, a dark inner card with the Rail's
// chamfered notch, the title, the SISO mark and a product glyph. The picture is two layers from the pack: a background
// (by topic family) and a line overlay (from the lines pack), both picked by hashing the slug, so headers vary on their own
// and never need hand-picking. `bg` and `lines` pin either layer by manifest id.
// The header's own CSS lives here (not in a 'use client' file) so every place that renders a header can include it: the
// blog pages via styles.ts and the nav's Blog dropdown on every other page.
export const HEADER_CSS = `
.sb-header{width:100%;container-type:inline-size;position:relative;aspect-ratio:1200/630;overflow:hidden;background:#07080d;isolation:isolate}
.sb-header-bg,.sb-header-lines{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;max-width:none}
.sb-header-bg{opacity:.62;transition:transform 1.4s cubic-bezier(.19,1,.22,1)}
.sb-header-lines{mix-blend-mode:screen;opacity:.85;transition:transform 2.2s cubic-bezier(.19,1,.22,1),opacity .6s}
.sb-header-shade{position:absolute;inset:0;background:radial-gradient(120% 90% at 0 0,color-mix(in srgb,var(--topic) 42%,transparent),transparent 58%),radial-gradient(90% 80% at 100% 100%,color-mix(in srgb,var(--topic) 30%,transparent),transparent 62%)}
.sb-header-inner{position:absolute;inset:5.5%;display:flex;flex-direction:column;justify-content:space-between;padding:4%;background:linear-gradient(100deg,#05060deb 18%,#05060da6 62%,#05060d40);border:1px solid #ffffff1f;border-radius:4px;clip-path:polygon(0 0,35% 0,38% 4.5%,62% 4.5%,65% 0,100% 0,100% 100%,0 100%);box-shadow:inset 0 1px 0 #ffffff14}
.sb-header-inner::before{content:"";position:absolute;left:38%;right:38%;top:4.5%;height:1px;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--topic) 70%,#ffc24b),transparent);opacity:.8}
.sb-header-top{display:flex;justify-content:space-between;align-items:center;padding-top:1%;gap:16px}
.sb-header-top>.sb-eyebrow{font:500 clamp(7px,1.3cqw,11px)/1.4 'Geist Mono',ui-monospace,monospace!important;letter-spacing:.14em!important;text-transform:uppercase;color:color-mix(in srgb,var(--topic) 40%,white)}
.sb-header-brand{display:flex;align-items:center;gap:6px;font:500 clamp(7px,1.3cqw,11px)/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.12em;white-space:nowrap;color:#ffffffcc}
.sb-header-brand img{width:3.2cqw;height:3.2cqw;min-width:13px;min-height:13px;border-radius:50%}
.sb-header-middle{display:flex;align-items:center;gap:4%;padding:2% 0}
.sb-header-title{font:600 clamp(16px,5.4cqw,64px)/1.07 'Inter Display',Inter,sans-serif;letter-spacing:-.035em;max-width:74%;text-wrap:balance;color:#fff;text-shadow:0 2px 24px #000a}
.sb-header-glyph{width:25%;flex-shrink:0;margin-left:auto;transform:rotate(-8deg);transition:transform .6s cubic-bezier(.19,1,.22,1);filter:drop-shadow(0 14px 26px #000a) drop-shadow(0 0 30px color-mix(in srgb,var(--topic) 35%,transparent))}
.sb-header-glyph .pg{display:block;width:100%;height:auto}
.sb-header-bottom{display:flex;align-items:center;gap:12px;color:#ffffff8f;font:400 clamp(7px,1.3cqw,11px)/1.4 'Geist Mono',ui-monospace,monospace;letter-spacing:.06em;transition:opacity .3s}
.sb-header-rule{height:1px;background:linear-gradient(90deg,#ffffff30,#ffffff10);flex:1}
@media(prefers-reduced-motion:reduce){.sb-header *{transition:none!important}}
`;
type Layer = (typeof backgrounds)[number];
const LINES = backgrounds.filter(item => item.family === 'lines');
const hash = (text: string) => Array.from(text).reduce((n, char) => (Math.imul(n, 31) + char.charCodeAt(0)) >>> 0, 7);

export function selectBackground(slug: string, topic: BlogTopic, bg?: string): Layer {
  const explicit = backgrounds.find(item => item.id === bg && item.family !== 'lines');
  if (explicit) return explicit;
  const family = backgrounds.filter(item => item.family === topic.family);
  const pool = family.length ? family : backgrounds.filter(item => item.family === 'warm');
  return pool[hash(slug) % pool.length];
}
export function selectLines(slug: string, lines?: string | false): Layer | null {
  if (lines === false || !LINES.length) return null;
  return LINES.find(item => item.id === lines) ?? LINES[hash(`${slug}~lines`) % LINES.length];
}

export default function BlogHeader({ title, topic, slug, bg, lines, glyph, kicker, eager = false, variant = 'card', playing }: {
  title: string; topic: BlogTopic; slug: string; bg?: string; lines?: string | false; glyph?: Product; kicker?: string;
  eager?: boolean; variant?: 'card' | 'hero'; playing?: boolean;
}) {
  const background = selectBackground(slug, topic, bg);
  const overlay = selectLines(slug, lines);
  return <div className={`sb-header sb-header--${variant}`} style={topicStyle(topic)} data-background={background.id} data-lines={overlay?.id}>
    <img className="sb-header-bg" src={background.file} alt="" width={1200} height={630} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    {overlay && <img className="sb-header-lines" src={overlay.file} alt="" width={1200} height={675} loading={eager ? 'eager' : 'lazy'} decoding="async" />}
    <div className="sb-header-shade" />
    <div className="sb-header-inner">
      <div className="sb-header-top"><span className="sb-eyebrow">{kicker || topic.name}</span><span className="sb-header-brand"><img src="/brand/siso-mark.png" width={24} height={24} alt="" /> SISO LABS</span></div>
      <div className="sb-header-middle"><span className="sb-header-title">{title}</span><div className="sb-header-glyph" aria-hidden="true"><ProductGlyph product={glyph || topic.glyph} size={160} playing={playing ? true : undefined} /></div></div>
      <div className="sb-header-bottom"><span>SISO Labs blog</span><span className="sb-header-rule" /><span>Field notes ↗</span></div>
    </div>
  </div>;
}
