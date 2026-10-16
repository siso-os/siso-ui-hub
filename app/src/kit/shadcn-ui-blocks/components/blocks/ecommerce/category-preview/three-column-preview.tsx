import { Button } from '../../../ui/button';
import { ArrowRight } from 'lucide-react';

interface Category {
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export default function ThreeColumnPreview() {
  const categories: Category[] = [
    {
      name: 'Analog Watches',
      description: 'Timeless classics with precision mechanics',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      productCount: 48,
    },
    {
      name: 'Smart Watches',
      description: 'Advanced technology on your wrist',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      productCount: 32,
    },
    {
      name: 'Sport Watches',
      description: 'Durable timepieces for active lifestyles',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      productCount: 24,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.name}
            className="group bg-card relative overflow-hidden rounded-xl border"
          >
            {/* Image */}
            <div className="bg-muted relative aspect-[4/3]">
              <img
                src={category.image}
                alt={category.name}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="from-background/80 to-background/0 absolute inset-0 bg-gradient-to-t" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="mb-2 text-xl font-semibold tracking-tight">
                {category.name}
              </h3>
              <p className="text-accent-foreground/80 mb-4 text-sm">
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-accent-foreground/80 text-sm">
                  {category.productCount} products
                </span>
                <Button
                  variant="ghost"
                  className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                >
                  Shop now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="bg-primary/5 absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
