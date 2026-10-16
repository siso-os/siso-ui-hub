import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { ArrowRight, Star } from 'lucide-react';

interface Category {
  name: string;
  description: string;
  image: string;
  productCount: number;
  rating: number;
  reviewCount: number;
  topBrands: string[];
  priceRange: string;
}

export default function SplitPreview() {
  const categories: Category[] = [
    {
      name: 'Premium Collection',
      description:
        'Experience luxury at its finest with our handpicked selection of premium timepieces. Each watch is a masterpiece of precision engineering and sophisticated design.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      productCount: 124,
      rating: 4.9,
      reviewCount: 856,
      topBrands: ['Rolex', 'Patek Philippe', 'Audemars Piguet'],
      priceRange: '$5,000 - $50,000+',
    },
    {
      name: 'Professional Series',
      description:
        'Designed for the modern professional, these watches combine elegant aesthetics with practical functionality. Perfect for both business and casual occasions.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      productCount: 96,
      rating: 4.8,
      reviewCount: 642,
      topBrands: ['Omega', 'TAG Heuer', 'IWC'],
      priceRange: '$2,000 - $10,000',
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-12 p-6">
      {categories.map((category, index) => (
        <div
          key={category.name}
          className={`bg-card flex flex-col gap-8 overflow-hidden rounded-xl border lg:flex-row ${
            index % 2 === 1 ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Image Section */}
          <div className="relative lg:w-1/2">
            <div className="relative aspect-[4/3] lg:absolute lg:inset-0 lg:aspect-auto">
              <img
                src={category.image}
                alt={category.name}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="from-background/80 via-background/20 absolute inset-0 bg-gradient-to-r to-transparent lg:hidden" />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center p-8 lg:w-1/2 lg:p-12">
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-3xl font-semibold tracking-tight">
                  {category.name}
                </h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                <div>
                  <div className="mb-1 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(category.rating)
                            ? 'fill-primary text-primary'
                            : 'fill-muted text-muted'
                        }`}
                      />
                    ))}
                    <span className="ml-2 font-medium">{category.rating}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {category.reviewCount} reviews
                  </p>
                </div>
                <div>
                  <div className="mb-1 font-medium">Price Range</div>
                  <p className="text-muted-foreground text-sm">
                    {category.priceRange}
                  </p>
                </div>
                <div>
                  <div className="mb-1 font-medium">Available Items</div>
                  <p className="text-muted-foreground text-sm">
                    {category.productCount} products
                  </p>
                </div>
              </div>

              {/* Top Brands */}
              <div>
                <div className="mb-2 font-medium">Featured Brands</div>
                <div className="flex flex-wrap gap-2">
                  {category.topBrands.map((brand) => (
                    <Badge
                      key={brand}
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {brand}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4">
                <Button className="group">
                  Explore Collection
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
