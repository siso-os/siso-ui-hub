import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';

export default function HeroSectionWithProductScreenshots() {
  return (
    <>
      {/* Hero */}
      <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
        <div className="relative">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Badge variant="outline" className="mb-4">
              New Features Released
            </Badge>
            <h1 className="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Design faster than ever
            </h1>
            <p className="text-muted-foreground mb-8 text-xl">
              Our intuitive interface and powerful components help you build
              beautiful websites in record time.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg">
                Try it Free
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
                  className="ml-2 h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
              <Button size="lg" variant="outline">
                View Documentation
              </Button>
            </div>
          </div>

          {/* Screenshots Grid */}
          <div className="relative">
            {/* Main Screenshot */}
            <div className="bg-card rounded-xl border shadow-2xl">
              <img
                src="https://placehold.co/1200x600.jpeg"
                alt="Dashboard Screenshot"
                width={1200}
                height={600}
                className="rounded-xl"
              />
            </div>

            {/* Floating Screenshots */}
            <div className="absolute -top-12 -right-8 w-72 rotate-3 transform transition-transform duration-300 hover:rotate-0">
              <div className="bg-card rounded-lg border shadow-lg">
                <img
                  src="https://placehold.co/300x200.jpeg"
                  alt="Feature Screenshot 1"
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="absolute top-1/4 -left-8 w-64 -rotate-3 transform transition-transform duration-300 hover:rotate-0">
              <div className="bg-card rounded-lg border shadow-lg">
                <img
                  src="https://placehold.co/300x200.jpeg"
                  alt="Feature Screenshot 2"
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <div className="flex items-start">
              <div className="bg-primary/10 mr-4 flex h-10 w-10 items-center justify-center rounded-lg">
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
                  className="text-primary h-6 w-6"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 font-semibold">Easy to Use</h3>
                <p className="text-muted-foreground text-sm">
                  Intuitive interface that anyone can use
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary/10 mr-4 flex h-10 w-10 items-center justify-center rounded-lg">
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
                  className="text-primary h-6 w-6"
                >
                  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 font-semibold">Lightning Fast</h3>
                <p className="text-muted-foreground text-sm">
                  Optimized for speed and performance
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary/10 mr-4 flex h-10 w-10 items-center justify-center rounded-lg">
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
                  className="text-primary h-6 w-6"
                >
                  <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 0 1 9-9" />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 font-semibold">Global CDN</h3>
                <p className="text-muted-foreground text-sm">
                  Deployed worldwide for fast access
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
