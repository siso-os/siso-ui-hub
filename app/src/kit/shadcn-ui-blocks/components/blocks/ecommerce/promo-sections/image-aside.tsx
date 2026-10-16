import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';

export default function ImageAsidePromo() {
  return (
    <div className="bg-background overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
          {/* Image Section */}
          <div className="px-6 md:px-0 lg:pt-4 lg:pr-4">
            <div className="relative mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1000&auto=format&fit=crop"
                  alt="Aerial view from a drone flying above mountains"
                  width={1000}
                  height={800}
                  className="object-cover"
                />
              </div>
              {/* Decorative Shape */}
              <div
                className="ring-primary/10 pointer-events-none absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset"
                aria-hidden="true"
              />
              {/* Background Gradient */}
              <svg
                viewBox="0 0 1090 1090"
                aria-hidden="true"
                className="absolute -top-10 left-1/2 -z-10 h-[68.125rem] w-[68.125rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              >
                <ellipse
                  cx={545}
                  cy={545}
                  rx={545}
                  ry={545}
                  fill="url(#drone-promo-gradient)"
                  fillOpacity="0.3"
                />
                <defs>
                  <radialGradient id="drone-promo-gradient">
                    <stop stopColor="hsl(var(--primary))" />
                    <stop offset={1} stopColor="hsl(var(--accent))" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-6 md:px-0 lg:pt-4 lg:pl-4">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
              <Badge variant="default" className="mb-2">
                New Technology
              </Badge>
              <h2 className="text-primary text-base leading-7 font-semibold">
                Capture Stunning Views
              </h2>
              <p className="text-foreground mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Aerial Photography Drone
              </p>
              <p className="text-muted-foreground mt-6 text-lg leading-8">
                Elevate your content with breathtaking aerial shots. Our latest
                drone features a 4K camera, intelligent flight modes, and
                extended battery life for the ultimate creative freedom.
              </p>
              <dl className="text-muted-foreground mt-10 max-w-xl space-y-8 text-base leading-7 lg:max-w-none">
                <div className="relative">
                  <dt className="text-foreground inline font-semibold">
                    4K HDR Video:
                  </dt>{' '}
                  <dd className="inline">
                    Capture cinematic footage with incredible detail and dynamic
                    range.
                  </dd>
                </div>
                <div className="relative">
                  <dt className="text-foreground inline font-semibold">
                    Obstacle Avoidance:
                  </dt>{' '}
                  <dd className="inline">
                    Fly with confidence thanks to advanced sensors on all sides.
                  </dd>
                </div>
                <div className="relative">
                  <dt className="text-foreground inline font-semibold">
                    30-Min Flight Time:
                  </dt>{' '}
                  <dd className="inline">
                    Spend more time in the air and less time charging.
                  </dd>
                </div>
              </dl>
              <div className="mt-10 flex flex-col items-center gap-x-6 gap-y-3 sm:flex-row">
                <Button size="lg" asChild>
                  <a href="#">Explore the Drone</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#">Watch Demo</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
