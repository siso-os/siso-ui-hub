// uihub: siso:site
// Where the docs link out to. SITE is the current SISO Labs landing: the siso-ecosystem preview alias until Shaan approves going live. siso.agency is
// not used: on 9 Oct 2026 it redirected to a domain-parking page. Change SITE here when the custom domain is live.
export const SITE = 'https://siso-ecosystem.siso-agency-showcase.pages.dev';
export const GITHUB = 'https://github.com/sisodias';

export const LINKS_OUT = [
  { label: 'SISO Labs', href: `${SITE}/`, hint: 'The main site' },
  { label: 'GitHub', href: GITHUB, hint: 'github.com/sisodias' },
  { label: 'Blog', href: `${SITE}/blog/`, hint: 'Notes and launches' },
  { label: 'Talk to us', href: `${SITE}/book-demo/`, hint: 'Book a call' },
] as const;
