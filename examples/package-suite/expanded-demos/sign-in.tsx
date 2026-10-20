// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { SignIn } from "@siso/ui/blocks/source";
import { useRouter } from "./preview-host";

export function SignInPage() {
  const router = useRouter();

  return <SignIn onSignIn={() => router.push("/dashboard")} />;
}
