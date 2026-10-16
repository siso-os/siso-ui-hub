import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { Mail } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { Twitter } from '../../../ui/brand-icons';

export default function HeroFormFloatingCardWithGradient() {
  return (
    <>
      {/* Hero */}
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
          <div className="absolute inset-0 bg-[url(/noise.png)] opacity-20 mix-blend-soft-light"></div>
          <div className="absolute h-full w-full bg-[radial-gradient(circle_800px_at_100%_200px,rgba(120,119,198,0.3),transparent)]"></div>
        </div>

        {/* Background Shapes */}
        <div className="absolute top-1/4 -left-16 h-64 w-64 rounded-full bg-purple-400/30 blur-3xl dark:bg-purple-900/20"></div>
        <div className="absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-indigo-400/30 blur-3xl dark:bg-indigo-900/20"></div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:px-6 2xl:max-w-[1400px]">
          <div className="mx-auto max-w-md">
            {/* Card */}
            <div className="bg-background/80 border-border/50 rounded-xl border p-6 shadow-xl backdrop-blur-xl md:p-8">
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold">Welcome Back</h1>
                <p className="text-muted-foreground mt-2">
                  Sign in to continue to the platform
                </p>
              </div>

              <Tabs defaultValue="email" className="w-full">
                <TabsList className="mb-6 grid w-full grid-cols-2">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="mb-2">
                      Email address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label htmlFor="password" className="mb-2">
                        Password
                      </Label>
                      <a
                        href="#"
                        className="text-primary text-xs hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                  <Button className="w-full">Sign in with Email</Button>
                </TabsContent>

                <TabsContent value="phone" className="space-y-4">
                  <div>
                    <Label htmlFor="phone" className="mb-2">
                      Phone number
                    </Label>
                    <Input id="phone" placeholder="+1 (555) 000-0000" />
                  </div>
                  <Button className="w-full">Send verification code</Button>
                </TabsContent>
              </Tabs>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background text-muted-foreground px-2">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 justify-items-center gap-3">
                <Button variant="outline" size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <SiGithub className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-muted-foreground mt-6 text-center text-sm">
                Don&apos;t have an account?{' '}
                <a href="#" className="text-primary hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
