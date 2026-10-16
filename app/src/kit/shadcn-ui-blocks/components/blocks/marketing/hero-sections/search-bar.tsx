import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Search } from 'lucide-react';

export default function HeroSectionWithSearchBar() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
          {/* Announcement Banner */}
          <div className="flex justify-center">
            <a
              className="inline-flex items-center gap-x-2 rounded-full border p-1 ps-3 text-sm transition"
              href="#"
            >
              New Feature: Advanced Search
              <span className="bg-muted-foreground/15 inline-flex items-center justify-center gap-x-2 rounded-full px-2.5 py-1.5 text-sm font-semibold">
                <svg
                  className="h-4 w-4 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </a>
          </div>
          {/* End Announcement Banner */}

          {/* Title */}
          <div className="mx-auto mt-5 max-w-2xl text-center">
            <h1 className="text-primary max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
              Discover Everything You Need in Seconds
            </h1>
          </div>
          {/* End Title */}

          {/* Description */}
          <div className="mx-auto mt-5 max-w-3xl text-center">
            <p className="text-foreground max-w-4xl text-base text-balance sm:text-lg">
              Our powerful search engine helps you find exactly what you're
              looking for from millions of resources. Start exploring now!
            </p>
          </div>

          {/* Search Bar */}
          <div className="mx-auto mt-8 max-w-3xl">
            <form className="relative">
              <Input
                className="w-full rounded-full py-6 pr-16 pl-6 text-lg"
                placeholder="Search for articles, tutorials, or resources..."
                type="search"
              />
              <Button
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full"
                size="icon"
                type="submit"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Popular Searches */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {[
              'React Tutorials',
              'UI Design',
              'Shadcn Components',
              'Web Development',
            ].map((term) => (
              <Button key={term} variant="outline" className="rounded-full">
                {term}
              </Button>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-primary text-3xl font-bold">10M+</div>
              <div className="text-muted-foreground text-sm">Resources</div>
            </div>
            <div>
              <div className="text-primary text-3xl font-bold">1M+</div>
              <div className="text-muted-foreground text-sm">
                Daily Searches
              </div>
            </div>
            <div>
              <div className="text-primary text-3xl font-bold">99%</div>
              <div className="text-muted-foreground text-sm">
                Satisfaction Rate
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="from-primary/20 to-secondary/20 absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br opacity-30 blur-3xl" />
          <div className="from-accent/20 to-primary/20 absolute right-0 bottom-0 h-[500px] w-[500px] translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tl opacity-30 blur-3xl" />
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
