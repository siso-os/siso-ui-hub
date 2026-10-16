import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { StarIcon } from 'lucide-react';

export default function HeroFormNewsletterWithSocialProof() {
  return (
    <>
      {/* Hero */}
      <div className="bg-background/10 relative overflow-hidden">
        <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Join our newsletter to stay updated
            </h1>
            <p className="text-muted-foreground mt-4 text-xl">
              Get the latest industry trends, design inspiration, and exclusive
              tutorials delivered directly to your inbox.
            </p>

            {/* Newsletter Form */}
            <div className="mt-10">
              <form className="mx-auto flex max-w-lg flex-col gap-2 sm:flex-row">
                <div className="flex-1">
                  <Label htmlFor="email" className="sr-only">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-12"
                  />
                </div>
                <Button size="lg">Subscribe</Button>
              </form>
              <p className="text-muted-foreground mt-3 text-xs">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-muted-foreground mt-1 text-sm">
                  Subscribers
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.9/5</div>
                <div className="text-muted-foreground mt-1 text-sm">
                  Average Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-muted-foreground mt-1 text-sm">
                  Satisfaction
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24+</div>
                <div className="text-muted-foreground mt-1 text-sm">
                  Issues per Year
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="mt-16">
              <h2 className="mb-6 text-lg font-semibold">
                What our subscribers say
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-background rounded-lg border p-6">
                  <div className="mb-2 flex text-amber-400">
                    <StarIcon className="h-4 w-4 fill-current" />
                    <StarIcon className="h-4 w-4 fill-current" />
                    <StarIcon className="h-4 w-4 fill-current" />
                    <StarIcon className="h-4 w-4 fill-current" />
                    <StarIcon className="h-4 w-4 fill-current" />
                  </div>
                  <p className="text-sm">
                    &quot;This newsletter has transformed how I approach design
                    projects. The content is always fresh and actionable.&quot;
                  </p>
                  <div className="mt-4 flex items-center">
                    <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
                        alt="Sarah Thompson"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">Sarah Thompson</div>
                      <div className="text-muted-foreground text-xs">
                        Product Designer
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-background rounded-lg border p-6">
                  <div className="mb-2 flex text-amber-400">
                    <StarIcon className="h-4 w-4 fill-current" />
                    <StarIcon className="h-4 w-4 fill-current" />
                    <StarIcon className="h-4 w-4 fill-current" />
                    <StarIcon className="h-4 w-4 fill-current" />
                    <StarIcon className="h-4 w-4 fill-current" />
                  </div>
                  <p className="text-sm">
                    &quot;I look forward to every issue. The insights have
                    helped me stay ahead of trends and improve my skills
                    consistently.&quot;
                  </p>
                  <div className="mt-4 flex items-center">
                    <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
                        alt="David Chen"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">David Chen</div>
                      <div className="text-muted-foreground text-xs">
                        UI Developer
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-background rounded-lg border p-6">
                  <div className="mb-2 flex text-amber-400">
                    <StarIcon className="h-4 w-4 fill-current" />
                    <StarIcon className="h-4 w-4 fill-current" />
                    <StarIcon className="h-4 w-4 fill-current" />
                    <StarIcon className="h-4 w-4 fill-current" />
                    <StarIcon className="h-4 w-4 fill-current" />
                  </div>
                  <p className="text-sm">
                    &quot;Beyond exceptional content, it&apos;s the community
                    that makes this newsletter special. I&apos;ve connected with
                    amazing creatives.&quot;
                  </p>
                  <div className="mt-4 flex items-center">
                    <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full">
                      <img
                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1887&auto=format&fit=crop"
                        alt="Elena Rodriguez"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">Elena Rodriguez</div>
                      <div className="text-muted-foreground text-xs">
                        Creative Director
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Brands */}
            <div className="mt-16">
              <p className="text-muted-foreground mb-6 text-sm">
                Trusted by teams at
              </p>
              <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
                <div className="relative h-8 w-32">
                  <img
                    src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop"
                    alt="Google"
                    className="object-contain"
                  />
                </div>
                <div className="relative h-8 w-32">
                  <img
                    src="https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=2074&auto=format&fit=crop"
                    alt="Meta"
                    className="object-contain"
                  />
                </div>
                <div className="relative h-8 w-32">
                  <img
                    src="https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1974&auto=format&fit=crop"
                    alt="Microsoft"
                    className="object-contain"
                  />
                </div>
                <div className="relative h-8 w-32">
                  <img
                    src="https://images.unsplash.com/photo-1649734926695-1b1664e98842?q=80&w=1935&auto=format&fit=crop"
                    alt="Amazon"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
