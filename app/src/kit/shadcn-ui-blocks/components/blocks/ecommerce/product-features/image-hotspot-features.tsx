import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { PlusCircle, ChevronRight } from 'lucide-react';

export default function ImageHotspotFeatures() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const hotspots = [
    {
      id: 1,
      x: 25, // percentage from left
      y: 20, // percentage from top
      title: 'Full-Grain Leather',
      description: 'Premium Italian leather for durability and classic look',
    },
    {
      id: 2,
      x: 60,
      y: 30,
      title: 'Lightweight Construction',
      description:
        'Advanced materials reduce weight without compromising durability',
    },
    {
      id: 3,
      x: 75,
      y: 60,
      title: 'Breathable Mesh',
      description: 'Strategic ventilation keeps feet cool and comfortable',
    },
    {
      id: 4,
      x: 40,
      y: 70,
      title: 'Carbon Fiber Plate',
      description: 'Enhanced stability and energy return with every step',
    },
    {
      id: 5,
      x: 15,
      y: 55,
      title: 'Responsive Cushioning',
      description: 'Proprietary foam provides superior comfort and rebound',
    },
  ];

  const additionalFeatures = [
    {
      title: 'Water-Resistant Coating',
      description: 'Repels light moisture while maintaining breathability',
    },
    {
      title: 'Reinforced Lace System',
      description: 'Provides custom fit and secure lockdown during movement',
    },
    {
      title: 'Grippy Outsole',
      description:
        'Multi-directional traction pattern for reliable grip on various surfaces',
    },
  ];

  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left side - Interactive image */}
          <div className="relative">
            <div className="bg-muted/50 relative aspect-square overflow-hidden rounded-lg border">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
                alt="Premium athletic shoe with feature highlights"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Hotspots */}
              {hotspots.map((hotspot) => (
                <div
                  key={hotspot.id}
                  className="absolute"
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  onMouseEnter={() => setActiveHotspot(hotspot.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <button
                    className={`z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                      activeHotspot === hotspot.id
                        ? 'bg-primary text-primary-foreground scale-125'
                        : 'text-primary bg-white'
                    }`}
                    aria-label={`Feature: ${hotspot.title}`}
                  >
                    <PlusCircle className="h-6 w-6" />
                  </button>

                  {/* Feature tooltip */}
                  <div
                    className={`absolute z-20 w-48 rounded-lg border bg-white/95 p-3 shadow-lg backdrop-blur-sm transition-all duration-200 ${
                      activeHotspot === hotspot.id
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-2 opacity-0'
                    } ${
                      hotspot.x > 50 ? 'right-full mr-2' : 'left-full ml-2'
                    } ${hotspot.y > 50 ? 'bottom-0' : 'top-0'}`}
                  >
                    <h4 className="font-medium">{hotspot.title}</h4>
                    <p className="text-muted-foreground text-xs">
                      {hotspot.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Accent decorative elements */}
              <div className="bg-primary/20 absolute top-0 right-0 h-16 w-16 rounded-full blur-2xl"></div>
              <div className="bg-primary/20 absolute bottom-0 left-0 h-16 w-16 rounded-full blur-2xl"></div>
            </div>

            <div className="text-muted-foreground mt-4 text-center text-sm">
              <p>Hover over the markers to explore features</p>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-2">
              <Badge className="px-3.5 py-1.5">Engineered Performance</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Advanced features in every detail
              </h2>
              <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed">
                Our premium athletic footwear combines cutting-edge technology
                with performance-driven design.
              </p>
            </div>

            <div className="space-y-4">
              {additionalFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-card text-card-foreground hover:bg-muted/50 flex rounded-lg border p-4 transition-colors"
                >
                  <div className="bg-primary/10 text-primary mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-4 overflow-hidden">
                  <div className="border-background z-30 inline-block h-10 w-10 rounded-full border-2">
                    <img
                      src="https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?q=80&w=2072&auto=format&fit=crop"
                      alt="Running on track"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="border-background z-20 inline-block h-10 w-10 rounded-full border-2">
                    <img
                      src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=2070&auto=format&fit=crop"
                      alt="Road running"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="border-background z-10 inline-block h-10 w-10 rounded-full border-2">
                    <img
                      src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=2070&auto=format&fit=crop"
                      alt="Trail running"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Tested by professional athletes</p>
                  <p className="text-muted-foreground">
                    Trusted by runners worldwide
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <a href="#">Shop Collection</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#">Product Details</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
