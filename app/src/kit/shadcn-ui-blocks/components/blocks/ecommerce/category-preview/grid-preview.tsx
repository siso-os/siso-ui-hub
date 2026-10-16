import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { ArrowRight } from 'lucide-react';

interface Category {
  name: string;
  image: string;
  featured?: boolean;
  productCount: number;
  trending?: boolean;
  new?: boolean;
}

export default function GridPreview() {
  const categories: Category[] = [
    {
      name: 'Luxury Collection',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      featured: true,
      productCount: 86,
      trending: true,
    },
    {
      name: 'Digital Watches',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      productCount: 42,
    },
    {
      name: 'Limited Edition',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      productCount: 12,
      new: true,
    },
    {
      name: 'Classic Collection',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      productCount: 64,
    },
    {
      name: 'Sport Series',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      productCount: 28,
      trending: true,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`group relative overflow-hidden rounded-xl ${
              category.featured ? 'md:col-span-2 md:row-span-2' : ''
            }`}
          >
            {/* Background Image */}
            <div className="relative aspect-square">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                sizes={
                  category.featured
                    ? '(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
                    : '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw'
                }
              />
              <div className="from-background/90 via-background/50 to-background/20 absolute inset-0 bg-gradient-to-t" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col p-6">
              <div className="flex-1">
                <div className="flex gap-2">
                  {category.trending && (
                    <Badge variant="secondary">Trending</Badge>
                  )}
                  {category.new && (
                    <Badge variant="secondary">New Arrival</Badge>
                  )}
                </div>
              </div>
              <div>
                <h3
                  className={`mb-2 font-semibold tracking-tight ${
                    category.featured ? 'text-2xl' : 'text-xl'
                  }`}
                >
                  {category.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-accent-foreground/80 text-sm">
                    {category.productCount} products
                  </span>
                  <Button
                    variant="ghost"
                    className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="bg-primary/5 pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
