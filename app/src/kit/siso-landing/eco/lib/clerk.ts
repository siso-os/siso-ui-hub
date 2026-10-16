// uihub: siso:landing (copied from the SISO landing, eco/lib/clerk.ts)
// Clerk for the SISO Labs site (app_placeholder). The publishable key is public by design (it ships in the
// page); the secret key never enters this repo. The site is a static export, so there is no middleware: sign-in, sign-up and
// the user button all run in the browser, on our own pages rather than Clerk's hosted ones.
// Production (pk_live) only answers on sisolabs.space, so every other host (the
// pages.dev previews, localhost) keeps the development instance (Agent Zero, 9 Oct).
const CLERK_LIVE_KEY = 'pk_live_placeholder';
const CLERK_DEV_KEY = undefined || 'pk_test_placeholder';

export function clerkPublishableKey(host?: string): string {
  const h = host ?? (typeof window === 'undefined' ? '' : window.location.hostname);
  return h === 'sisolabs.space' || h.endsWith('.sisolabs.space') ? CLERK_LIVE_KEY : CLERK_DEV_KEY;
}

export const CLERK_APPEARANCE = {
  variables: {
    colorPrimary: '#FF6A1A',
    colorBackground: '#110e0c',
    colorInputBackground: '#1a1512',
    colorText: '#ececf1',
    colorTextSecondary: '#a8a3a0',
    colorInputText: '#ececf1',
    colorNeutral: '#ececf1',
    borderRadius: '11px',
    fontFamily: 'Inter, sans-serif',
  },
} as const;
