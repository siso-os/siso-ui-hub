import { Button } from "../../../../../../shadcn/ui/button";
import { Field, FieldDescription, FieldGroup } from "../../../../../../shadcn/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../../../../../shadcn/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../../shadcn/ui/card";

export default function OTPForm() {
  return (
    <section className="w-full p-6 flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="justify-items-center text-center gap-6!">
          <a href="#" className="cursor-pointer">
            <img src="https://images.shadcnspace.com/assets/shadcn-dashboard/logo/white-logo.svg" alt="logo" width={32} height={32} />
          </a>

          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl!  whitespace-nowrap">Verify your email</CardTitle>
            <CardDescription className="text-sm!">
              We sent a verification code to your mobile. Enter the code below
              to verify your identity.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>

          <form>
            <FieldGroup className="gap-6!">
              <div className="flex flex-col items-center gap-4">
                <InputOTP maxLength={6} id="otp" className="w-full!" >
                  <InputOTPGroup className='gap-2 w-full *:data-[slot=input-otp-slot]:flex-1  *:data-[slot=input-otp-slot]:border! *:data-[slot=input-otp-slot]:items-center *:data-[slot=input-otp-slot]:justify-center *:data-[slot=input-otp-slot]:text-center'>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                <Field className="gap-6!">
                  <FieldDescription className="text-center! text-sm text-muted-foreground">
                    Didn't get the code?{" "}
                    <a
                      href="#"
                      className="text-sm font-normal text-primary no-underline!"
                    >
                      Resend code
                    </a>
                  </FieldDescription>
                  <Button type="submit" className="cursor-pointer no-underline!">
                    Verify Now
                  </Button>
                </Field>
              </div>
            </FieldGroup>
          </form>
        </CardContent>

      </Card>
    </section>
  );
}