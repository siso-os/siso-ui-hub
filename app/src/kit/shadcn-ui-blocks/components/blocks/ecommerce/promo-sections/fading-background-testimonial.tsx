import { Button } from '../../../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';

export default function FadingBackgroundTestimonialPromo() {
  return (
    <div className="bg-background relative">
      {/* Background with fading effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2400&auto=format&fit=crop"
          alt="Premium headphones on a minimalist background"
          className="h-full w-full object-cover object-center"
        />
        <div
          className="from-background via-background/80 absolute inset-0 bg-gradient-to-t to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16">
          {/* Promo Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Immersive Audio Experience
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Discover crystal-clear sound and unparalleled comfort with our
              latest range of premium headphones. Designed for audiophiles and
              everyday listeners alike.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <a href="#">Shop Headphones</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#">Explore Features</a>
              </Button>
            </div>
            <div className="border-border/50 mt-10 border-t pt-10">
              <h3 className="text-primary text-sm font-medium">
                Featured Collection
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Noise-Cancelling Series
              </p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="space-y-8">
            <blockquote className="border-border/50 bg-card/50 rounded-lg border p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-muted-foreground text-xs">
                    Verified Buyer
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mt-4">
                &quot;These headphones are incredible! The noise cancellation is
                top-notch, and they&apos;re so comfortable I forget I&apos;m
                wearing them. Worth every penny.&quot;
              </p>
            </blockquote>

            <blockquote className="border-border/50 bg-card/50 rounded-lg border p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src="https://randomuser.me/api/portraits/men/75.jpg"
                    alt="User 2"
                  />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Michael Davis</p>
                  <p className="text-muted-foreground text-xs">
                    Audio Engineer
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mt-4">
                &quot;As an audio professional, I&apos;m picky about sound
                quality. These headphones deliver a balanced and detailed audio
                profile that rivals much more expensive models.&quot;
              </p>
            </blockquote>

            <blockquote className="border-border/50 bg-card/50 rounded-lg border p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="User 3"
                  />
                  <AvatarFallback>LP</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Linda Park</p>
                  <p className="text-muted-foreground text-xs">
                    Frequent Traveler
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mt-4">
                &quot;Perfect for flights! They block out engine noise
                completely, and the battery lasts forever. My new essential
                travel companion.&quot;
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
