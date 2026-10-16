import { Button } from '../../../ui/button';
import { Heart, Star, Sparkles } from 'lucide-react';

interface ProductItem {
  aspect: string;
  badge: string | null;
  size: 'sm' | 'md' | 'lg';
}

interface CardStyles {
  title: string;
  description: string;
  price: string;
}

export default function MasonryList() {
  // More varied aspect ratios and dynamic content
  const items: ProductItem[] = [
    { aspect: 'aspect-[2/3]', badge: 'New', size: 'lg' },
    { aspect: 'aspect-square', badge: 'Sale', size: 'sm' },
    { aspect: 'aspect-[3/4]', badge: null, size: 'md' },
    { aspect: 'aspect-[4/5]', badge: 'Trending', size: 'lg' },
    { aspect: 'aspect-[3/4]', badge: null, size: 'sm' },
    { aspect: 'aspect-[1/1]', badge: 'Limited', size: 'md' },
    { aspect: 'aspect-[4/3]', badge: null, size: 'lg' },
    { aspect: 'aspect-[3/4]', badge: 'Sale', size: 'sm' },
    { aspect: 'aspect-[2/3]', badge: null, size: 'md' },
    { aspect: 'aspect-[1/1]', badge: 'New', size: 'lg' },
    { aspect: 'aspect-[3/4]', badge: null, size: 'sm' },
    { aspect: 'aspect-[4/5]', badge: 'Trending', size: 'md' },
  ];

  const getBadgeStyles = (badge: string | null): string => {
    switch (badge) {
      case 'New':
        return 'bg-primary text-primary-foreground';
      case 'Sale':
        return 'bg-destructive text-destructive-foreground';
      case 'Trending':
        return 'bg-secondary text-secondary-foreground';
      case 'Limited':
        return 'bg-accent text-accent-foreground';
      default:
        return '';
    }
  };

  const getCardStyles = (size: 'sm' | 'md' | 'lg'): CardStyles => {
    switch (size) {
      case 'lg':
        return {
          title: 'text-lg font-semibold',
          description: 'block',
          price: 'text-xl',
        };
      case 'md':
        return {
          title: 'font-medium',
          description: 'hidden sm:block',
          price: 'text-lg',
        };
      case 'sm':
        return {
          title: 'text-sm font-medium',
          description: 'hidden',
          price: 'text-base',
        };
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="columns-1 gap-6 space-y-6 [column-fill:_balance] sm:columns-2 lg:columns-3 xl:columns-4">
        {items.map((item, i) => (
          <div key={i} className="break-inside-avoid">
            <div className="group bg-card overflow-hidden rounded-xl border shadow-sm transition-shadow duration-300 hover:shadow-lg">
              <div className={`relative ${item.aspect} bg-muted`}>
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                  alt="Product image"
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-background/80 absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                {item.badge && (
                  <div
                    className={`absolute top-2 left-2 px-2 py-1 ${getBadgeStyles(
                      item.badge
                    )} flex items-center gap-1 rounded-md text-sm font-medium`}
                  >
                    {item.badge === 'Trending' && (
                      <Sparkles className="h-3.5 w-3.5" />
                    )}
                    {item.badge}
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  <div className="min-w-0">
                    <h3 className={getCardStyles(item.size).title}>
                      Classic Leather Watch
                    </h3>
                    <p
                      className={`text-muted-foreground mt-1 text-sm ${
                        getCardStyles(item.size).description
                      }`}
                    >
                      Premium crafted timepiece with genuine leather strap
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      <Star className="fill-primary text-primary h-3.5 w-3.5" />
                      <span className="text-sm">4.9</span>
                      <span className="text-muted-foreground text-sm">
                        (128)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <div
                      className={`font-medium ${
                        getCardStyles(item.size).price
                      }`}
                    >
                      $299
                    </div>
                    <div className="text-muted-foreground text-sm line-through">
                      $399
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button size="sm" className="w-full">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
