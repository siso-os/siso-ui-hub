import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { ArrowRight } from 'lucide-react';

export default function PortfolioFooterIntegratedSignup() {
  return (
    <div className="border-border bg-muted/10 w-full border-t py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          {/* Brand & Navigation column */}
          <div className="md:col-span-7 lg:col-span-8">
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold">Sarah Johnson</h3>
                  <p className="text-muted-foreground mt-1">
                    UX Designer & Digital Consultant
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Navigation</p>
                    <nav className="flex flex-col space-y-2 text-sm">
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Portfolio
                      </a>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Services
                      </a>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        About
                      </a>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Contact
                      </a>
                    </nav>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium">Resources</p>
                    <nav className="flex flex-col space-y-2 text-sm">
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Case Studies
                      </a>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Blog
                      </a>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Free Resources
                      </a>
                    </nav>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium">Connect</p>
                    <nav className="flex flex-col space-y-2 text-sm">
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Twitter
                      </a>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Instagram
                      </a>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        LinkedIn
                      </a>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Dribbble
                      </a>
                    </nav>
                  </div>
                </div>
              </div>

              <div className="text-muted-foreground mt-8 text-sm">
                &copy; {new Date().getFullYear()} Sarah Johnson. All rights
                reserved.
              </div>
            </div>
          </div>

          {/* Newsletter column */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="border-border bg-background/50 rounded-lg border p-5 backdrop-blur-sm">
              <h3 className="text-base font-medium">Stay in the loop</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Subscribe to receive design insights and resources straight to
                your inbox.
              </p>

              <form className="mt-4">
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Your email"
                      aria-label="Your email"
                      className="w-full"
                    />
                  </div>
                  <Button type="submit" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-muted-foreground mt-2 text-xs">
                  I send one newsletter per week. No spam, just valuable
                  content.
                </p>
              </form>

              <div className="mt-5 flex flex-col space-y-2">
                <div className="text-sm font-medium">Contact</div>
                <p className="text-muted-foreground text-sm">
                  hello@sarahjohnson.com
                </p>
                <p className="text-muted-foreground text-sm">
                  San Francisco, CA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
