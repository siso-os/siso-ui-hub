import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useRef } from 'react';

interface Category {
  name: string;
  description: string;
  image: string;
  productCount: number;
  featured?: string[];
}

export default function ScrollingPreview() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = [
    {
      name: 'Luxury Watches',
      description:
        'Discover our collection of premium timepieces crafted with exceptional materials and precision engineering.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      productCount: 86,
      featured: ['Rolex', 'Omega', 'Cartier'],
    },
    {
      name: 'Smart Watches',
      description:
        'Stay connected with our range of advanced smartwatches featuring health tracking and smart notifications.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      productCount: 42,
      featured: ['Apple Watch', 'Samsung', 'Garmin'],
    },
    {
      name: 'Sport Watches',
      description:
        'Built for performance, our sport watches combine durability with advanced training features.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      productCount: 28,
      featured: ['G-Shock', 'Suunto', 'Polar'],
    },
    {
      name: 'Classic Watches',
      description:
        'Timeless designs that never go out of style, perfect for any occasion.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      productCount: 64,
      featured: ['Seiko', 'Citizen', 'Tissot'],
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount =
        direction === 'left' ? -container.clientWidth : container.clientWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      {/* Navigation */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Shop by Category
          </h2>
          <p className="text-muted-foreground mt-1">
            Browse our curated collection of premium timepieces
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => scroll('left')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => scroll('right')}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Scrolling Cards */}
      <div
        ref={scrollContainerRef}
        className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
      >
        {categories.map((category) => (
          <Card
            key={category.name}
            className="group w-[calc(100%-2rem)] flex-none snap-start p-0 transition-shadow duration-300 hover:shadow-lg sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]"
          >
            <CardContent className="p-0">
              {/* Image */}
              <div className="relative aspect-[16/9]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="rounded-t-xl object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="from-background/80 to-background/0 absolute inset-0 rounded-t-xl bg-gradient-to-t" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold tracking-tight">
                  {category.name}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {category.description}
                </p>

                {/* Featured Brands */}
                {category.featured && (
                  <div className="mb-4">
                    <div className="mb-2 text-sm font-medium">
                      Featured Brands:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.featured.map((brand) => (
                        <div
                          key={brand}
                          className="bg-primary/10 text-primary rounded-md px-2 py-1 text-xs"
                        >
                          {brand}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    {category.productCount} products
                  </span>
                  <Button
                    variant="ghost"
                    className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    View all
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
