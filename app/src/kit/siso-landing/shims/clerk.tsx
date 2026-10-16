// uihub: siso:landing (a stand-in for @clerk/clerk-react, which the landing runs on and the hub does not)
export const useUser = () => ({ isLoaded: true, isSignedIn: false, user: null })
export const useAuth = () => ({ isLoaded: true, isSignedIn: false, userId: null, getToken: async () => null })
export const UserButton = () => null
export const SignedIn = (_: { children?: unknown }) => null
export const SignedOut = ({ children }: { children?: React.ReactNode }) => <>{children}</>
export const ClerkProvider = ({ children }: { children?: React.ReactNode; [k: string]: unknown }) => <>{children}</>
