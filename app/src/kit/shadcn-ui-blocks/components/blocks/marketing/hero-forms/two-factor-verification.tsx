import { useState, useRef, useEffect } from 'react';

import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import {
  ArrowLeftIcon,
  LockIcon,
  KeyIcon,
  SmartphoneIcon,
  MailIcon,
  CheckCircleIcon,
} from 'lucide-react';

export default function HeroFormTwoFactorVerification() {
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }

    // Update verification code
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if code is complete
    if (newCode.every((digit) => digit !== '') && index === 5) {
      // In a real app, you'd validate the code here
      setTimeout(() => {
        setIsVerified(true);
      }, 1000);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && index > 0 && !verificationCode[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <>
      {/* Hero */}
      <div className="relative min-h-screen overflow-hidden">
        <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16 md:px-6 2xl:max-w-[1400px]">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                <LockIcon className="text-primary h-8 w-8" />
              </div>

              {step === 1 && (
                <>
                  <h1 className="mb-2 text-3xl font-bold">
                    Two-factor authentication
                  </h1>
                  <p className="text-muted-foreground">
                    Choose a verification method to secure your account
                  </p>
                </>
              )}

              {step === 2 && !isVerified && (
                <>
                  <h1 className="mb-2 text-3xl font-bold">
                    Enter verification code
                  </h1>
                  <p className="text-muted-foreground">
                    We&apos;ve sent a 6-digit code to your email address or
                    phone
                  </p>
                </>
              )}

              {isVerified && (
                <>
                  <h1 className="mb-2 text-3xl font-bold">
                    Verification successful
                  </h1>
                  <p className="text-muted-foreground">
                    Your account is now secured with two-factor authentication
                  </p>
                </>
              )}
            </div>

            <div className="bg-background rounded-lg border p-8 shadow-lg">
              {/* Step 1: Choose verification method */}
              {step === 1 && (
                <div className="space-y-4">
                  <p className="mb-6 text-sm">
                    Add an extra layer of security to your account by enabling
                    two-factor authentication.
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={() => setStep(2)}
                      className="hover:bg-muted/50 flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-colors"
                    >
                      <div className="bg-primary/10 rounded-full p-2">
                        <SmartphoneIcon className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Text message (SMS)</h3>
                        <p className="text-muted-foreground text-sm">
                          We&apos;ll send a code to your phone
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => setStep(2)}
                      className="hover:bg-muted/50 flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-colors"
                    >
                      <div className="bg-primary/10 rounded-full p-2">
                        <MailIcon className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-muted-foreground text-sm">
                          We&apos;ll email you a verification code
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => setStep(2)}
                      className="hover:bg-muted/50 flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-colors"
                    >
                      <div className="bg-primary/10 rounded-full p-2">
                        <KeyIcon className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Authentication app</h3>
                        <p className="text-muted-foreground text-sm">
                          Use an authentication app like Google Authenticator
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Enter verification code */}
              {step === 2 && !isVerified && (
                <div className="space-y-6">
                  <div className="mb-2 flex justify-center">
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <Input
                          key={index}
                          type="text"
                          maxLength={1}
                          value={verificationCode[index]}
                          onChange={(e) =>
                            handleCodeChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          ref={(el) => {
                            inputRefs.current[index] = el;
                          }}
                          className="h-14 w-12 text-center text-xl font-semibold"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="text-center text-sm">
                    <p className="text-muted-foreground mb-2">
                      Didn&apos;t receive a code?
                    </p>
                    <Button variant="link" className="h-auto p-0">
                      Resend code
                    </Button>
                  </div>

                  <div className="pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="mb-3 w-full"
                    >
                      <ArrowLeftIcon className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      className="w-full"
                      disabled={
                        !verificationCode.every((digit) => digit !== '')
                      }
                    >
                      Verify
                    </Button>
                  </div>
                </div>
              )}

              {/* Success state */}
              {isVerified && (
                <div className="space-y-6 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircleIcon className="h-10 w-10 text-green-600" />
                  </div>

                  <p className="text-sm">
                    You can now sign in using your password and the verification
                    code.
                  </p>

                  <Button className="w-full">Continue to Dashboard</Button>
                </div>
              )}
            </div>

            <p className="text-muted-foreground mt-8 text-center text-sm">
              Need help?{' '}
              <a href="#" className="text-primary hover:underline">
                Contact support
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
