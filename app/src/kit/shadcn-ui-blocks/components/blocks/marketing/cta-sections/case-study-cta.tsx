import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { ArrowRight, ArrowUpRight, Quote } from 'lucide-react';

export default function CaseStudyCTA() {
  return (
    <>
      {/* Case Study CTA Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          <div className="grid items-center gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="space-y-4">
                <Badge variant="outline" className="text-primary">
                  Case Study
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  How TechNova increased productivity by 200% with our platform
                </h2>
                <div className="text-muted-foreground flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1491349174775-aaafddd81942?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Jennifer Lee"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="text-sm">
                    <p className="text-foreground font-medium">Jennifer Lee</p>
                    <p>CTO, TechNova</p>
                  </div>
                </div>
                <p className="text-muted-foreground md:text-lg">
                  Learn how TechNova, a leading tech startup, transformed their
                  workflow and boosted team productivity with our comprehensive
                  solution.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary h-5 w-5"
                    >
                      <path d="M6.5 6.5h11v11h-11z" />
                      <path d="m21 3-9 9" />
                      <path d="M21 14v7h-7" />
                      <path d="M3 21V10H10" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">The Challenge</h3>
                    <p className="text-muted-foreground">
                      Managing multiple projects across distributed teams with
                      outdated tools led to miscommunication and missed
                      deadlines.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary h-5 w-5"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">The Solution</h3>
                    <p className="text-muted-foreground">
                      Implementing our comprehensive platform unified
                      communication, streamlined workflows, and provided
                      real-time tracking capabilities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary h-5 w-5"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">The Results</h3>
                    <p className="text-muted-foreground">
                      200% increase in productivity, 50% reduction in meeting
                      time, and 30% faster project completion.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-primary/20 text-muted-foreground relative mt-8 border-l-4 pl-6 italic">
                <Quote className="bg-background text-primary absolute -top-2 -left-3 h-6 w-6 rounded-full" />
                <p className="md:text-lg">
                  &ldquo;The platform transformed how our teams collaborate.
                  We&apos;ve eliminated silos and can now deliver projects with
                  unprecedented speed and quality.&rdquo;
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <a href="#">
                    Read Full Case Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#">
                    Schedule a Demo
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border">
                <img
                  src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="TechNova team collaborating on the platform"
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full border-2 border-white bg-white/20 p-2 backdrop-blur-sm transition-transform hover:scale-110">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-white"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-card rounded-lg border p-4 text-center">
                  <div className="text-primary text-3xl font-bold">200%</div>
                  <p className="text-muted-foreground text-sm">
                    Productivity Increase
                  </p>
                </div>
                <div className="bg-card rounded-lg border p-4 text-center">
                  <div className="text-primary text-3xl font-bold">30%</div>
                  <p className="text-muted-foreground text-sm">
                    Faster Project Delivery
                  </p>
                </div>
              </div>
              <div className="bg-muted/40 mt-6 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1560179304-6fc1d8749b23?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3"
                      alt="TechNova company logo"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="font-medium">TechNova</span>
                  </div>
                  <Badge variant="outline" className="bg-card">
                    SaaS
                  </Badge>
                </div>
                <div className="text-muted-foreground mt-2 text-xs">
                  <span className="font-medium">Industry:</span> Technology
                  <span className="mx-2">•</span>
                  <span className="font-medium">Team size:</span> 120+
                  <span className="mx-2">•</span>
                  <span className="font-medium">Region:</span> Global
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Case Study CTA Section */}
    </>
  );
}
