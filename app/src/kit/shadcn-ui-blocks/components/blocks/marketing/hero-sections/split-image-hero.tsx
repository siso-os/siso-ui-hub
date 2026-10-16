import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';

export default function SplitImageHero() {
  return (
    <div className="bg-background relative">
      <div className="container mx-auto px-4 py-24 md:px-6 md:py-28 lg:py-32 2xl:max-w-[1400px]">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_720px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge
                variant="outline"
                className="border-primary/20 bg-primary/10 text-primary"
              >
                New Release
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl">
                Powerful design system for your next project
              </h1>
              <p className="text-muted-foreground max-w-[600px] md:text-xl">
                Create beautiful, responsive interfaces with ease using our
                comprehensive UI kit and design system.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <a href="#">Get Started</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#">View Components</a>
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
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
                  <path d="M7 10v12" />
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
                <span>5k+ Stars</span>
              </div>
              <div className="flex items-center gap-1">
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>10k+ Users</span>
              </div>
              <div className="flex items-center gap-1">
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
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <span>MIT Licensed</span>
              </div>
            </div>
          </div>
          <div className="bg-muted/50 relative aspect-square overflow-hidden rounded-xl md:aspect-[4/3] lg:aspect-square">
            <div className="from-muted absolute inset-0 z-10 bg-gradient-to-tr via-transparent to-transparent"></div>
            <img
              src="https://images.unsplash.com/photo-1519558260268-cde7e03a0152?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="UI components and design system preview"
              className="object-cover"
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset"></div>

            {/* Feature callouts */}
            <div className="absolute right-4 bottom-4 left-4 z-20 grid grid-cols-3 gap-2">
              <div className="bg-background/80 flex flex-col items-center justify-center rounded-lg p-3 text-center backdrop-blur-sm">
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
                  className="text-primary mb-2 h-10 w-10"
                >
                  <rect width="18" height="10" x="3" y="11" rx="2" />
                  <circle cx="12" cy="5" r="2" />
                  <path d="M12 7v4" />
                  <line x1="8" x2="8" y1="16" y2="16" />
                  <line x1="16" x2="16" y1="16" y2="16" />
                </svg>
                <span className="text-xs font-medium">Customizable</span>
              </div>
              <div className="bg-background/80 flex flex-col items-center justify-center rounded-lg p-3 text-center backdrop-blur-sm">
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
                  className="text-primary mb-2 h-10 w-10"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m16 10-4 4-4-4" />
                </svg>
                <span className="text-xs font-medium">Accessible</span>
              </div>
              <div className="bg-background/80 flex flex-col items-center justify-center rounded-lg p-3 text-center backdrop-blur-sm">
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
                  className="text-primary mb-2 h-10 w-10"
                >
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                </svg>
                <span className="text-xs font-medium">Beautiful</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
