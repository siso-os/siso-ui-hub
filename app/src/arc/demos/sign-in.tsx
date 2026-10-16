// From Arc's docs page (Usage), imports pointed at the copied source
import { SignIn } from "../blocks/sign-in/sign-in";
import { useRouter } from "next/navigation";

export function SignInPage() {
  const router = useRouter();

  return <SignIn onSignIn={() => router.push("/dashboard")} />;
}
