// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/ui/GitHubButton.tsx)
// SISO: the one GitHub call to action, the way good open-source sites do it (Shaan, 8 Oct: "they don't have text there,
// they just got find on GitHub or view on GitHub or a download"). Repos resolve once Shaan flips
// them public. The open-source home is the siso-os org (created 9 Oct; github.com/sisolabs never existed).
import type { CSSProperties } from 'react';

export const SISO_GITHUB = 'https://github.com/siso-os';

export function GitHubMark({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden="true" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

/** "View on GitHub" pill. `repo` is a repo name under SISO_GITHUB; omit it for the org page. */
export default function GitHubButton({ repo, label = 'View on GitHub', dark = false, className, style }: {
  repo?: string; label?: string; dark?: boolean; className?: string; style?: CSSProperties;
}) {
  const href = repo ? `${SISO_GITHUB}/${repo}` : SISO_GITHUB;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 10,
        fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 600, lineHeight: '20px', textDecoration: 'none',
        color: dark ? '#fff' : '#090a0e', background: dark ? '#ffffff14' : '#fff',
        boxShadow: dark ? 'inset 0 0 0 1px #ffffff1f' : '0 1px 0 #ffffff40 inset, 0 6px 20px -8px #FF6A1A66',
        ...style,
      }}>
      <GitHubMark />
      <span>{label}</span>
    </a>
  );
}
