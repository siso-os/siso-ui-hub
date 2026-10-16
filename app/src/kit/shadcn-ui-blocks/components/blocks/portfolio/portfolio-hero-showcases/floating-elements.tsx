import { useEffect, useRef } from 'react';
import { Button } from '../../../ui/button';
import { ChevronRight, Code, Palette, Layers } from 'lucide-react';

export default function PortfolioHeroFloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.float');
    elements.forEach((element, index) => {
      // Create more intentional, less random animations
      const delay = index * 0.3; // sequential delays for more organized movement
      const duration = 8 + (index % 3) * 2; // 8-12s, varied but not too random

      (element as HTMLElement).style.setProperty('--delay', `${delay}s`);
      (element as HTMLElement).style.setProperty('--duration', `${duration}s`);
    });
  }, []);

  return (
    <div className="from-background via-background/95 to-background/90 relative min-h-screen w-full overflow-hidden bg-gradient-to-br">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9InJnYmEoMTQ0LCAxNDQsIDE0NCwgMC4wMikiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMGgzMHYzMEgweiIgZmlsbD0icmdiYSgxNDQsIDE0NCwgMTQ0LCAwLjA0KSIvPjwvZz48L3N2Zz4=')] opacity-40"></div>

      {/* Content container with constrained width to allow space for floating elements */}
      <div className="relative z-30 flex min-h-screen w-full items-center justify-center px-4 py-16">
        <div className="bg-background/30 border-muted/30 max-w-xl rounded-3xl border p-8 shadow-xl backdrop-blur-xl md:p-12">
          <div className="text-center">
            <div className="border-primary/30 bg-primary/10 text-primary mb-6 inline-flex items-center justify-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium">
              <Layers className="mr-1 h-3.5 w-3.5" />
              DESIGN & DEVELOPMENT
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Bringing <span className="text-primary">Creative Ideas</span> to
              Life
            </h1>

            <p className="text-muted-foreground mt-6 text-lg">
              Award-winning portfolio of digital experiences that combine
              aesthetic excellence with functional design, creating memorable
              interactions for brands and users alike.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="group px-6">
                <span>View Portfolio</span>
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button variant="outline" size="lg" className="px-6">
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements container - positioned on top with z-20 */}
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-0 z-20"
      >
        {/* Left side elements */}
        <div className="float float-1 border-primary/30 bg-primary/5 text-primary absolute top-[25%] left-[8%] flex h-16 w-16 items-center justify-center rounded-xl border shadow-sm backdrop-blur-sm">
          <Palette className="h-6 w-6" />
        </div>

        <div className="float float-3 border-muted-foreground/20 bg-background/70 absolute bottom-[30%] left-[12%] flex h-16 w-16 items-center justify-center rounded-full border shadow-sm backdrop-blur-sm">
          <Code className="text-muted-foreground h-6 w-6" />
        </div>

        <div className="float float-6 border-muted-foreground/10 bg-background/70 absolute top-[60%] left-[5%] flex h-24 w-24 items-center justify-center rounded-2xl border shadow-sm backdrop-blur-sm">
          <Layers className="text-primary/80 h-8 w-8" />
        </div>

        {/* Right side elements */}
        <div className="float float-2 border-primary/20 bg-background/80 absolute top-[20%] right-[10%] flex h-20 w-20 items-center justify-center rounded-2xl border shadow-md backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-1">
            <div className="bg-primary/30 h-4 w-4 rounded-sm"></div>
            <div className="bg-primary/20 h-4 w-4 rounded-sm"></div>
            <div className="bg-primary/10 h-4 w-4 rounded-sm"></div>
            <div className="bg-primary/40 h-4 w-4 rounded-sm"></div>
          </div>
        </div>

        <div className="float float-4 absolute right-[7%] bottom-[35%] h-28 w-28 overflow-hidden rounded-xl shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop"
            alt="Portfolio preview"
            width={800}
            height={800}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>

        <div className="float float-5 border-muted/30 bg-background/80 absolute top-[65%] right-[15%] flex h-16 w-36 flex-col justify-center rounded-lg border p-3 shadow-sm backdrop-blur-sm">
          <div className="bg-primary/40 h-2 w-3/4 rounded-full"></div>
          <div className="bg-muted-foreground/30 mt-2 h-2 w-1/2 rounded-full"></div>
        </div>

        {/* Additional elements positioned further out */}
        <div className="float float-7 absolute top-[15%] left-[22%] h-20 w-20 overflow-hidden rounded-2xl shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
            alt="Design element"
            width={800}
            height={800}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        </div>

        <div className="float float-8 border-primary/20 bg-primary/10 absolute right-[25%] bottom-[15%] flex h-14 w-14 items-center justify-center rounded-full border shadow-sm backdrop-blur-sm">
          <div className="bg-primary/30 h-6 w-6 rounded-sm"></div>
        </div>

        <div className="float float-9 border-muted/20 bg-background/60 absolute top-[40%] right-[2%] flex h-16 w-16 items-center justify-center rounded-lg border shadow-sm backdrop-blur-sm">
          <div className="bg-muted-foreground/20 h-8 w-8 rounded-md"></div>
        </div>

        <div className="float float-10 border-primary/30 bg-primary/5 absolute top-[5%] left-[40%] flex h-12 w-12 items-center justify-center rounded-full border shadow-sm backdrop-blur-sm">
          <div className="bg-primary/50 h-4 w-4 rounded-full"></div>
        </div>
      </div>

      {/* CSS for floating animations */}
      <style jsx>{`
        .float {
          animation: float-animation var(--duration, 10s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
          will-change: transform;
          transform-origin: center center;
        }

        @keyframes float-animation {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(10px, -15px) rotate(2deg);
          }
          50% {
            transform: translate(-5px, 10px) rotate(-1deg);
          }
          75% {
            transform: translate(-12px, -7px) rotate(1deg);
          }
        }

        .float-1 {
          --z-index: 1;
        }
        .float-2 {
          --z-index: 2;
        }
        .float-3 {
          --z-index: 3;
        }
        .float-4 {
          --z-index: 4;
        }
        .float-5 {
          --z-index: 5;
        }
        .float-6 {
          --z-index: 6;
        }
        .float-7 {
          --z-index: 7;
        }
        .float-8 {
          --z-index: 8;
        }
        .float-9 {
          --z-index: 9;
        }
        .float-10 {
          --z-index: 10;
        }
      `}</style>
    </div>
  );
}
