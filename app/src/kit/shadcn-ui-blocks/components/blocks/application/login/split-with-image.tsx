import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Switch } from '../../../ui/switch';

export default function Component() {
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <div className="bg-muted/20 flex min-h-screen">
      {/* Left side - Testimonial */}
      <div className="relative hidden lg:flex lg:w-1/2">
        <div className="relative h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1734336056841-8f4dd3ca6e32?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Sarah Chen testimonial"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />

          {/* Zenflow logo */}
          <div className="absolute top-8 left-8 flex items-center gap-2 text-white">
            <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-white">
              <div className="bg-primary h-2 w-2 rounded-full" />
            </div>
            <span className="text-xl font-semibold">Zenflow</span>
          </div>

          {/* Testimonial */}
          <div className="absolute right-8 bottom-8 left-8 text-white">
            <blockquote className="mb-4 text-2xl font-medium">
              &quot;Zenflow transformed our workflow and boosted productivity by
              40%.&quot;
            </blockquote>
            <div>
              <div className="font-medium">Sarah Chen</div>
              <div className="text-sm opacity-90">
                Head of Operations, TechFlow Solutions
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
            <div className="bg-primary flex h-6 w-6 items-center justify-center rounded-sm">
              <div className="bg-primary-foreground h-2 w-2 rounded-full" />
            </div>
            <span className="text-xl font-semibold">Zenflow</span>
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-foreground text-2xl font-bold">
              Welcome back to Zenflow
            </h1>
            <p className="text-muted-foreground">
              Streamline your project management and collaboration with our
              intuitive workflow platform.
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-foreground text-sm font-medium"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="alex.jordan@gmail.com"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-foreground text-sm font-medium"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                defaultValue="password123"
                className="w-full"
              />
              <div className="text-right">
                <a
                  href="#"
                  className="text-primary hover:text-primary/80 text-sm"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="remember"
                className="text-foreground text-sm font-medium"
              >
                Remember sign in details
              </Label>
              <Switch
                id="remember"
                checked={rememberMe}
                onCheckedChange={setRememberMe}
                className="data-[state=checked]:bg-primary"
              />
            </div>

            <Button className="w-full py-3">Log In</Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="border-border w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background text-muted-foreground px-2">
                  OR
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full py-3">
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <p className="text-muted-foreground text-center text-sm">
              Don&apos;t have an account?{' '}
              <a
                href="#"
                className="text-primary hover:text-primary/80 font-medium"
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
