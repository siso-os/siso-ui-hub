import { Button } from '../../../ui/button';
import { Heart, Star } from 'lucide-react';

export default function FeaturedList() {
  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Featured Product */}
        <div className="group bg-card overflow-hidden rounded-xl border md:col-span-2">
          <div className="grid md:grid-cols-2">
            <div className="bg-muted relative aspect-square md:aspect-auto">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                alt="Featured product"
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="bg-primary text-primary-foreground absolute top-2 left-2 rounded-md px-2 py-1 text-sm font-medium">
                Featured
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="bg-background/80 absolute top-2 right-2 h-8 w-8 rounded-full backdrop-blur-sm"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col p-6">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold">
                  Premium Leather Watch
                </h2>
                <div className="mt-2 flex items-center gap-1">
                  <Star className="fill-primary text-primary h-4 w-4" />
                  <span className="font-medium">4.9</span>
                  <span className="text-muted-foreground">(128 reviews)</span>
                </div>
                <p className="text-muted-foreground mt-4">
                  Elevate your style with our premium leather watch. Featuring
                  Swiss-made movement, genuine leather strap, and sapphire
                  crystal glass.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">$299</span>
                    <span className="text-muted-foreground line-through">
                      $399
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      Save 25%
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button size="lg">Buy Now</Button>
                <Button size="lg" variant="outline">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Regular Products */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="group bg-card overflow-hidden rounded-xl border"
          >
            <div className="bg-muted relative aspect-square">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                alt="Product image"
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <Button
                size="icon"
                variant="ghost"
                className="bg-background/80 absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="truncate font-medium">
                    Classic Leather Watch
                  </h3>
                  <div className="mt-1 flex items-center gap-1">
                    <Star className="fill-primary text-primary h-3.5 w-3.5" />
                    <span className="text-sm">4.9</span>
                    <span className="text-muted-foreground text-sm">(128)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$299</div>
                  <div className="text-muted-foreground text-sm line-through">
                    $399
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button size="sm">Buy Now</Button>
                <Button size="sm" variant="outline">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
