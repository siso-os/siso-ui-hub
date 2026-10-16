import { Button } from '../../../ui/button';
import { Heart, Star } from 'lucide-react';

export default function CompactList() {
  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="group bg-card hover:bg-accent/50 flex items-center gap-4 rounded-lg border p-2 transition-colors"
          >
            {/* Product Image */}
            <div className="bg-muted relative aspect-square h-24 shrink-0 overflow-hidden rounded-md">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                alt="Product image"
                className="object-cover"
                sizes="(max-width: 768px) 96px, 96px"
              />
            </div>

            {/* Product Info */}
            <div className="grid min-w-0 flex-1 items-center gap-4 sm:grid-cols-3">
              <div className="min-w-0">
                <h3 className="truncate font-medium">Classic Leather Watch</h3>
                <div className="mt-1 flex items-center gap-1">
                  <Star className="fill-primary text-primary h-3.5 w-3.5" />
                  <span className="text-sm">4.9</span>
                  <span className="text-muted-foreground text-sm">(128)</span>
                </div>
              </div>

              <div className="sm:text-center">
                <div className="text-muted-foreground text-sm">Price</div>
                <div className="font-medium">$299</div>
                <div className="text-muted-foreground text-sm line-through">
                  $399
                </div>
              </div>

              <div className="flex items-center gap-2 sm:justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Add to Cart
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 shrink-0"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
