// uihub: siso:landing (copied from the SISO landing, eco/app/clerk-provider.tsx)
'use client';
import type { ReactNode } from 'react';
import { ClerkProvider } from '../../shims/clerk';
import { useRouter } from '../../shims/next-navigation';
import { CLERK_APPEARANCE, clerkPublishableKey } from '../lib/clerk';

// The site is a static export (Cloudflare Pages), and @clerk/nextjs needs server actions, which a static export cannot have.
// So Clerk runs in the browser through @clerk/clerk-react, with Next's router for its redirects.
export default function SisoClerkProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey()}
      appearance={CLERK_APPEARANCE}
      routerPush={(to) => router.push(to)}
      routerReplace={(to) => router.replace(to)}
      signInUrl="/sign-in/"
      signUpUrl="/sign-up/"
      signInFallbackRedirectUrl="/welcome/"
      signUpFallbackRedirectUrl="/welcome/"
      afterSignOutUrl="/"
    >
      {children}
    </ClerkProvider>
  );
}
