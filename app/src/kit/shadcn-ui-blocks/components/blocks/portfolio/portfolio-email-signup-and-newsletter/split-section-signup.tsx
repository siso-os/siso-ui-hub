import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Checkbox } from '../../../ui/checkbox';
import { ArrowRight, Mail } from 'lucide-react';

export default function PortfolioSplitSectionSignup() {
  return (
    <div className="w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="bg-muted/20 border-border overflow-hidden rounded-xl border shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left column - Benefits */}
            <div className="bg-muted/30 relative p-6 md:p-8 lg:p-10">
              <div className="relative z-10">
                <div className="flex items-center">
                  <div className="bg-primary/10 text-primary mr-3 flex h-10 w-10 items-center justify-center rounded-full">
                    <Mail className="h-5 w-5" />
                  </div>
                  <h3 className="text-primary text-sm font-semibold tracking-wider uppercase">
                    Designer&apos;s Digest
                  </h3>
                </div>

                <h2 className="mt-4 text-2xl font-bold md:text-3xl">
                  Subscribe for free tips, case studies, and templates
                </h2>

                <p className="text-muted-foreground mt-3">
                  Join my newsletter and get exclusive insights into my design
                  process, along with resources to help you improve your own
                  creative work.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary mt-0.5 mr-3 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full">
                      <span className="text-sm font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Weekly Design Insights</h4>
                      <p className="text-muted-foreground text-sm">
                        Learn about the latest design trends and techniques
                        I&apos;m exploring
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary mt-0.5 mr-3 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full">
                      <span className="text-sm font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Exclusive Resources</h4>
                      <p className="text-muted-foreground text-sm">
                        Get access to templates, checklists, and guides not
                        available anywhere else
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary mt-0.5 mr-3 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full">
                      <span className="text-sm font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Project Breakdowns</h4>
                      <p className="text-muted-foreground text-sm">
                        Behind-the-scenes looks at my process for real client
                        projects
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 hidden md:block">
                  <div className="flex h-32 gap-3">
                    <div>
                      <img
                        src="https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3"
                        alt="Newsletter preview"
                        width={500}
                        height={120}
                        className="h-32 rounded-md object-cover"
                      />
                    </div>
                    <div>
                      <img
                        src="https://images.unsplash.com/photo-1593642532744-d377ab507dc8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3"
                        alt="Newsletter preview"
                        width={500}
                        height={120}
                        className="h-32 rounded-md object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative background element */}
              <div className="bg-primary/5 absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl"></div>
            </div>

            {/* Right column - Form */}
            <div className="bg-background p-6 md:p-8 lg:p-10">
              <form className="mx-auto max-w-md">
                <h3 className="text-xl font-semibold">Join the newsletter</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  Sign up to receive my newsletter with design insights and
                  resources.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" placeholder="Your name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-address">Email Address</Label>
                    <Input
                      id="email-address"
                      type="email"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>I&apos;m interested in</Label>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-1 lg:grid-cols-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="ui-design" />
                        <label
                          htmlFor="ui-design"
                          className="cursor-pointer text-sm"
                        >
                          UI Design
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="ux-research" />
                        <label
                          htmlFor="ux-research"
                          className="cursor-pointer text-sm"
                        >
                          UX Research
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="web-development" />
                        <label
                          htmlFor="web-development"
                          className="cursor-pointer text-sm"
                        >
                          Web Development
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="case-studies" />
                        <label
                          htmlFor="case-studies"
                          className="cursor-pointer text-sm"
                        >
                          Case Studies
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="group w-full">
                    Subscribe to Newsletter
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>

                  <p className="text-muted-foreground text-center text-xs">
                    I respect your privacy. Unsubscribe at any time. No spam,
                    ever.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
