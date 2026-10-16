import { useState } from 'react';

import { Button } from '../../../ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

export default function ProductCarouselHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const products = [
    {
      name: 'Premium Dashboard',
      description:
        'Analytics dashboard with advanced filtering and data visualization',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      color: '#4f46e5',
    },
    {
      name: 'Mobile App',
      description:
        'Cross-platform mobile application with offline capabilities',
      image:
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3',
      color: '#0ea5e9',
    },
    {
      name: 'Design System',
      description: 'Comprehensive UI library with 100+ components and variants',
      image:
        'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3',
      color: '#f59e0b',
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  return (
    <div className="from-background to-muted/30 relative bg-gradient-to-b">
      <div className="container mx-auto px-4 pt-24 pb-20 md:px-6 md:pt-32 md:pb-24 2xl:max-w-[1400px]">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <p className="text-primary text-sm font-medium tracking-widest uppercase">
                Introducing
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Build beautiful products, faster.
              </h1>
              <p className="text-muted-foreground max-w-[600px] md:text-xl">
                Our comprehensive suite of tools helps teams design, develop,
                and deploy exceptional digital experiences.
              </p>
            </div>

            <ul className="space-y-2 pt-4">
              <li className="flex items-center gap-2">
                <Check className="text-primary h-5 w-5" />
                <span>Pre-built components save development time</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-primary h-5 w-5" />
                <span>Intuitive drag-and-drop interface</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-primary h-5 w-5" />
                <span>Regular updates and dedicated support</span>
              </li>
            </ul>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Button size="lg" asChild>
                <a href="#">Start Free Trial</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#">View Demo</a>
              </Button>
            </div>

            <div className="pt-6">
              <p className="text-muted-foreground mb-2 text-sm">
                Trusted by leading companies:
              </p>
              <div className="flex flex-wrap items-center gap-6">
                {['Microsoft', 'Airbnb', 'Spotify', 'Uber'].map(
                  (company, i) => (
                    <div
                      key={i}
                      className="text-muted-foreground/70 font-medium"
                    >
                      {company}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Product showcase */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border shadow-xl">
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: activeIndex === 0 ? 1 : 0,
                  zIndex: activeIndex === 0 ? 10 : 0,
                }}
              >
                <img
                  src={products[0]!.image}
                  alt={products[0]!.name}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute right-0 bottom-0 left-0 p-6">
                  <h3 className="mb-1 text-xl font-bold text-white">
                    {products[0]!.name}
                  </h3>
                  <p className="text-sm text-white/80">
                    {products[0]!.description}
                  </p>
                </div>
              </div>

              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: activeIndex === 1 ? 1 : 0,
                  zIndex: activeIndex === 1 ? 10 : 0,
                }}
              >
                <img
                  src={products[1]!.image}
                  alt={products[1]!.name}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute right-0 bottom-0 left-0 p-6">
                  <h3 className="mb-1 text-xl font-bold text-white">
                    {products[1]!.name}
                  </h3>
                  <p className="text-sm text-white/80">
                    {products[1]!.description}
                  </p>
                </div>
              </div>

              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: activeIndex === 2 ? 1 : 0,
                  zIndex: activeIndex === 2 ? 10 : 0,
                }}
              >
                <img
                  src={products[2]!.image}
                  alt={products[2]!.name}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute right-0 bottom-0 left-0 p-6">
                  <h3 className="mb-1 text-xl font-bold text-white">
                    {products[2]!.name}
                  </h3>
                  <p className="text-sm text-white/80">
                    {products[2]!.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Carousel controls */}
            <div className="absolute right-0 -bottom-10 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="h-10 w-10 rounded-full"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="h-10 w-10 rounded-full"
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Button>
            </div>

            {/* Product indicators */}
            <div className="absolute -bottom-10 left-0 flex items-center gap-2">
              {products.map((product, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeIndex === index ? 'w-8' : 'w-2.5 opacity-50'
                  }`}
                  style={{ backgroundColor: product.color }}
                  aria-label={`View ${product.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
