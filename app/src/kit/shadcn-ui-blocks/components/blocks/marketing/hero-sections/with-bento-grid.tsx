import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Card } from '../../../ui/card';

export default function HeroSectionWithBentoGrid() {
  return (
    <>
      {/* Hero */}
      <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
        <div className="relative">
          {/* Background gradient */}
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>

          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Badge variant="outline" className="mb-4">
              Introducing Bento UI
            </Badge>
            <h1 className="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Beautiful components, crafted with precision
            </h1>
            <p className="text-muted-foreground mb-8 text-xl">
              Build stunning interfaces with our modular design system. Mix and
              match components to create unique layouts.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg">
                Get Started
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
                Live Preview
              </Button>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-4">
            {/* Feature Card 1 - Large */}
            <Card className="row-span-2 p-6 transition-shadow hover:shadow-lg md:col-span-2">
              <div className="flex h-full flex-col">
                <div className="bg-primary/10 mb-4 h-10 w-10 rounded-lg p-3">
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
                    className="text-primary"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Accessible Components
                </h3>
                <p className="text-muted-foreground mb-4">
                  Built with accessibility in mind. Every component follows
                  WAI-ARIA standards.
                </p>
                <img
                  src="https://placehold.co/600x400.jpeg"
                  alt="Accessibility Features"
                  width={600}
                  height={400}
                  className="mt-auto rounded-lg"
                />
              </div>
            </Card>

            {/* Feature Card 2 */}
            <Card className="p-6 transition-shadow hover:shadow-lg">
              <div className="bg-primary/10 mb-4 h-10 w-10 rounded-lg p-3">
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
                  className="text-primary"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Modular Design</h3>
              <p className="text-muted-foreground">
                Mix and match components to create unique layouts.
              </p>
            </Card>

            {/* Feature Card 3 */}
            <Card className="p-6 transition-shadow hover:shadow-lg">
              <div className="bg-primary/10 mb-4 h-10 w-10 rounded-lg p-3">
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
                  className="text-primary"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Customizable</h3>
              <p className="text-muted-foreground">
                Easily customize components to match your brand.
              </p>
            </Card>

            {/* Feature Card 4 - Wide */}
            <Card className="p-6 transition-shadow hover:shadow-lg md:col-span-2">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 h-10 w-10 rounded-lg p-3">
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
                    className="text-primary"
                  >
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    <path d="M5 3v4" />
                    <path d="M19 17v4" />
                    <path d="M3 5h4" />
                    <path d="M17 19h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Dark Mode Support</h3>
                  <p className="text-muted-foreground">
                    Seamless dark mode integration out of the box.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
