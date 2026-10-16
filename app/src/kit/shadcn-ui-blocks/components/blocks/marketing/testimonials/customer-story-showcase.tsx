import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../../../ui/avatar';
import { ArrowRightIcon, QuoteIcon, StarIcon } from 'lucide-react';

export default function HeroSectionCustomerStoryShowcase() {
  return (
    <>
      {/* Hero */}
      <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
        {/* Announcement */}
        <div className="mb-8 flex justify-center">
          <Badge variant="outline" className="text-sm">
            Featured Customer Story
          </Badge>
        </div>

        {/* Title */}
        <div className="mb-12 text-center">
          <h1 className="text-primary mx-auto mb-4 max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
            See how we're transforming businesses
          </h1>
          <p className="text-foreground mx-auto max-w-4xl text-base text-balance sm:text-lg">
            Real stories from real customers. Discover how our platform is
            driving measurable results for companies like yours.
          </p>
        </div>

        {/* Customer Story Card */}
        <div className="bg-card mx-auto max-w-4xl rounded-xl border shadow-xl">
          <div className="grid md:grid-cols-2">
            {/* Left Side - Image/Photo */}
            <div className="relative h-64 md:h-auto">
              <img
                src="https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_960_720.jpg?w=960&h=720&q=85"
                alt="Customer workspace"
                className="h-full w-full object-cover md:rounded-l-xl"
              />
              <div className="bg-background/80 absolute right-4 bottom-4 left-4 rounded-lg p-4 md:hidden">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Customer"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-muted-foreground text-sm">
                      CEO, TechStart
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="p-8">
              <QuoteIcon className="text-primary mb-4 h-8 w-8" />

              <blockquote className="mb-6 text-xl leading-relaxed font-medium">
                "Since implementing this platform, we've seen a 300% increase in
                team productivity and cut our operational costs by half. It's
                been a game-changer for our business."
              </blockquote>

              {/* Metrics */}
              <div className="mb-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-primary text-2xl font-bold">300%</p>
                  <p className="text-muted-foreground text-sm">
                    Productivity Boost
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-primary text-2xl font-bold">50%</p>
                  <p className="text-muted-foreground text-sm">
                    Cost Reduction
                  </p>
                </div>
                <div className="text-center">
                  <div className="mb-1 flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <StarIcon
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Customer Rating
                  </p>
                </div>
              </div>

              {/* Attribution */}
              <div className="mb-8 flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="John Doe"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-muted-foreground text-sm">
                    CEO, TechStart Inc.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <Button size="lg" className="w-full md:w-auto">
                Read Full Story <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6 text-lg">
            Ready to create your success story?
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="outline">
              View All Stories
            </Button>
            <Button size="lg">Get Started Free</Button>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
