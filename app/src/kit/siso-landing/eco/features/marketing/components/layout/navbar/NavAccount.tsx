// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/layout/navbar/NavAccount.tsx)
'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth, UserButton } from '../../../../../../shims/clerk';
import SisoClerkProvider from '../../../../../app/clerk-provider';

// Clerk for the bar, loaded only when the browser holds a Clerk session cookie (NavBar decides). Clerk's browser script is
// the largest single thing a page can load, and almost every visitor is signed out, so the bar shows Sign in without it.
// When it does load, it says whether the visitor is signed in and puts their account button into the bar's slots.
export default function NavAccount({ onSignedIn, slots }: { onSignedIn: (v: boolean) => void; slots: (HTMLElement | null)[] }) {
  return <SisoClerkProvider><Bridge onSignedIn={onSignedIn} slots={slots} /></SisoClerkProvider>;
}

function Bridge({ onSignedIn, slots }: { onSignedIn: (v: boolean) => void; slots: (HTMLElement | null)[] }) {
  const { isLoaded, isSignedIn } = useAuth();
  useEffect(() => { if (isLoaded) onSignedIn(!!isSignedIn); }, [isLoaded, isSignedIn, onSignedIn]);
  if (!isSignedIn) return null;
  return <>{slots.map((el, i) => el ? createPortal(<AccountButton />, el, `acct-${i}`) : null)}</>;
}

// The account menu keeps a way back to the page sign-in lands on (t-0587).
function AccountButton() {
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link label="Your access" href="/welcome/"
          labelIcon={<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><path d="M8 1.8l1.7 3.6 3.9.5-2.9 2.7.8 3.9L8 10.6l-3.5 1.9.8-3.9L2.4 5.9l3.9-.5L8 1.8z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>} />
      </UserButton.MenuItems>
    </UserButton>
  );
}
