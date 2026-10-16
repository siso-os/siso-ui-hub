import { Button } from "../../../../../../shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../../shadcn/ui/card";
import { Field, FieldGroup, FieldLabel } from "../../../../../../shadcn/ui/field";
import { Input } from "../../../../../../shadcn/ui/input";

export default function ForgotPasswordOneCode() {
  return (
    <section className="w-full p-6 flex items-center justify-center">
      <Card className="w-full max-w-sm gap-8">
        {/* Logo */}

        <CardHeader className="justify-items-center text-center gap-6!">
          <a href="#" className="cursor-pointer">
            <img src="https://images.shadcnspace.com/assets/shadcn-dashboard/logo/white-logo.svg" alt="logo" width={32} height={32} />
          </a>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl! whitespace-nowrap">Forgot your password?</CardTitle>
            <CardDescription className="text-sm!">
              Enter your email to reset your password.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form className="w-full">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email" className="text-foreground text-sm font-medium">
                  Email<span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@shadcndashboard.com"
                  required
                  className="text-base"
                />
              </Field>
              <Field>
                <Button className={"w-full"}>Forgot password</Button>
                <Button className={"w-full"} variant={"outline"}>
                  Back to Login
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
