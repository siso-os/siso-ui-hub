// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/welcome/WelcomePage.tsx)
'use client';

import Link from '../../../../../../shims/next-link';
import { useUser } from '../../../../../../shims/clerk';
import SisoClerkProvider from '../../../../../app/clerk-provider';
import { Footer } from '../../../_public/layout';
import { LivingIcon } from '../living/LivingIcon';
import { ProductGlyph } from '../ProductGlyph';
import type { LivingIconName } from '../living/living-assets';
import STATS from '../../../data/siso-stats.json';

// The page after sign-in (t-0587; Shaan, 10 Oct: "stuff's not been fully connected so people can't use it"). It says what
// signing in got them, early access to Agent Base, and puts what works today one click away. Signed out, the same page
// asks them to sign in for the list. Lines and colours are the nav's (layout/navbar/nav.data.ts).
const VOICE_REPO = `https://github.com/siso-os/${STATS.repos.voice.repo}`;

type Item = { label: string; desc: string; cta: string; href: string; external?: boolean; color: string; icon: { living: LivingIconName } | { glyph: 'ui-hub' } };
const TODAY: Item[] = [
  { label: 'Voice', desc: 'Talk to your agents, in any app.', cta: 'Install from GitHub', href: VOICE_REPO, external: true, color: '#e0336a', icon: { living: 'siso-voice' } },
  { label: 'UI Hub', desc: 'Every UI worth reusing, in one hub.', cta: 'Open the hub', href: 'https://hub.sisolabs.space', external: true, color: '#1f69ff', icon: { glyph: 'ui-hub' } },
  { label: 'Skills Hub', desc: 'Our skills, one line to install.', cta: 'Install a skill', href: '/skills/#ski-title', color: '#f5a524', icon: { living: 'skills-hub' } },
  { label: 'Great Library', desc: 'The open-source code we read first.', cta: 'Browse it', href: '/great-library/', color: '#a46bff', icon: { living: 'library' } },
];

export default function WelcomePage() {
  return (
    <SisoClerkProvider>
      <div className="wl">
        <style>{CSS}</style>
        <Access />
        <section className="wl-today" aria-labelledby="wl-today">
          <h2 id="wl-today">Use today</h2>
          <ul>
            {TODAY.map(t => (
              <li key={t.label} style={{ '--c': t.color } as React.CSSProperties}>
                <Link href={t.href} {...(t.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <span className="wl-ico">{'living' in t.icon ? <LivingIcon name={t.icon.living} size={44} /> : <ProductGlyph product={t.icon.glyph} size={44} />}</span>
                  <b>{t.label}</b>
                  <span>{t.desc}</span>
                  <em>{t.cta}{t.external ? ' ↗' : ' →'}</em>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <Footer />
    </SisoClerkProvider>
  );
}

function Access() {
  const { isLoaded, isSignedIn, user } = useUser();
  const name = user?.firstName;
  const email = user?.primaryEmailAddress?.emailAddress;
  const signedOut = isLoaded && !isSignedIn;
  return (
    <section className="wl-head" aria-labelledby="wl-title">
      <h1 id="wl-title">{isSignedIn ? (name ? `You're in, ${name}.` : "You're in.") : 'What signing in gets you'}</h1>
      <div className="wl-ab">
        <span className="wl-ico"><LivingIcon name="agent-base" size={56} /></span>
        <div>
          <small>Agent Base · early access</small>
          {isSignedIn ? (
            <p>You&rsquo;re on the list. We&rsquo;ll email {email ? <b>{email}</b> : 'you'} when it opens.</p>
          ) : (
            <p>Sign in to get on the list. We&rsquo;ll email you when it opens.</p>
          )}
          <div className="wl-acts">
            {signedOut && <Link className="wl-go" href="/sign-in/">Sign in</Link>}
            <Link href="/agent-base/">See what&rsquo;s in it →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const CSS = `
.wl{max-width:1040px;margin:0 auto;padding:clamp(120px,14vw,168px) 24px 120px;color:#f4f1ea}
.wl-head h1{margin:0 0 28px;font-size:clamp(40px,6vw,68px);line-height:1.02;letter-spacing:-.035em;font-weight:600}
.wl-ab{display:flex;gap:22px;align-items:flex-start;padding:26px 28px;border-radius:24px;background:#120c0b;
  border:1px solid #ed615a59;box-shadow:0 0 0 1px #ed615a14,0 30px 80px -40px #ed615a66}
.wl-ab small{display:block;font:500 11px/1 ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#ed615a;margin:4px 0 10px}
.wl-ab p{margin:0;font-size:18px;line-height:1.5;color:#e9e4da}
.wl-ab p b{font-weight:500;color:#fff}
.wl-acts{display:flex;flex-wrap:wrap;gap:18px;align-items:center;margin-top:18px;font-size:15px}
.wl-acts a{color:#ffc0b8;text-decoration:none}
.wl-acts a:hover{color:#fff}
.wl-acts .wl-go{padding:10px 18px;border-radius:12px;background:#fff;color:#0b0b0c;font-weight:500}
.wl-ico{flex:none;display:grid;place-items:center}
.wl-today{margin-top:72px}
.wl-today h2{margin:0 0 18px;font:500 12px/1 ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#a49d92}
.wl-today ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.wl-today a{display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto auto;column-gap:18px;row-gap:4px;align-items:center;
  height:100%;padding:22px 24px;border-radius:20px;background:#0d0d0f;border:1px solid #ffffff14;color:inherit;text-decoration:none;
  transition:border-color .25s,background .25s}
.wl-today a:hover,.wl-today a:focus-visible{border-color:color-mix(in srgb,var(--c) 70%,transparent);background:color-mix(in srgb,var(--c) 7%,#0d0d0f)}
.wl-today .wl-ico{grid-row:1 / 4}
.wl-today b{font-size:19px;font-weight:600;letter-spacing:-.01em}
.wl-today span:not(.wl-ico){font-size:15px;color:#b9b2a6}
.wl-today em{font-style:normal;font-size:14px;color:color-mix(in srgb,var(--c) 55%,#fff);margin-top:6px}
@media (max-width:640px){
  .wl{padding:112px 16px 88px}
  .wl-ab{flex-direction:column;gap:14px;padding:22px}
  .wl-today{margin-top:52px}
  .wl-today ul{grid-template-columns:1fr}
}
`;
