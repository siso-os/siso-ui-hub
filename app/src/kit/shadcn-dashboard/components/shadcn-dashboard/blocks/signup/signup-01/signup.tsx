import { Button } from "../../../../../../shadcn/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../../../../shadcn/ui/card";
import { Field, FieldGroup, FieldLabel } from "../../../../../../shadcn/ui/field";
import { Input } from "../../../../../../shadcn/ui/input";

export default function SignupForm() {
  return (
    <section className="w-full p-6 flex items-center justify-center">
      <Card className="w-full max-w-md">
        {/* Logo */}
        <CardHeader className="justify-items-center text-center gap-6!">
          <a href="#" className="cursor-pointer">
            <img src="https://images.shadcnspace.com/assets/shadcn-dashboard/logo/white-logo.svg" alt="logo" width={32} height={32} />
          </a>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl! whitespace-nowrap">Signup to Shadcn Dashboard</CardTitle>
            <CardDescription className="text-sm!">Signup to your account now</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">

          <div className="flex items-center justify-center gap-3 w-full flex-col sm:flex-row">
            <Button
              variant="outline"
              className="cursor-pointer flex-1 py-2"
            >
              <img
                src="https://images.shadcnspace.com/assets/shadcn-dashboard/social-icon/google-color.svg"
                alt="Google"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              Sign in with Google
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer flex-1 py-2"
            >
              <img
                src="https://images.shadcnspace.com/assets/svgs/icon-github-white.svg"
                alt="Github"
                width={16}
                height={16}
                className="w-5 h-5 hidden  dark:block"
              />
              <img
                src="https://images.shadcnspace.com/assets/shadcn-dashboard/social-icon/github-icon.svg"
                alt="Github"
                width={16}
                height={16}
                className="w-5 h-5  block dark:hidden"
              />
              Sign in with Github
            </Button>
          </div>
          {/* Divider */}

          <div className="w-full flex items-center gap-3 text-sm font-normal text-muted-foreground before:content-[''] before:h-px before:flex-1 before:bg-border after:content-[''] after:h-px after:flex-1 after:bg-border">
            or sign in with
          </div>
          <form className="w-full">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name" className="text-foreground text-sm font-medium">
                  Name<span className="text-destructive">*</span>
                </FieldLabel>
                <Input id="name" type="text" placeholder="Enter your name" required className="text-base" />
              </Field>
              <Field>
                <FieldLabel htmlFor="email" className="text-foreground text-sm font-medium">
                  Email<span className="text-destructive">*</span>
                </FieldLabel>
                <Input id="email" type="email" placeholder="Enter Your Email" required className="text-base" />
              </Field>
              <Field>
                <FieldLabel htmlFor="password" className="text-foreground text-sm font-medium">
                  Password<span className="text-destructive">*</span>
                </FieldLabel>
                <Input id="password" type="password" placeholder="Enter your password" required className="text-base" />
              </Field>
              <Field>
                <Button className="w-full">Sign Up</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        {/* Footer */}

        <CardFooter className="justify-center gap-2 bg-card! border-t-0!">
          <p className="text-sm! text-muted-foreground ">Already have an Account?</p>
          <a
            href={"#"}
            className="text-sm! font-normal text-primary"
          >
            Sign in
          </a>
        </CardFooter>
      </Card>
    </section>
  );
}
