import { Button } from '../../../ui/button';
import { Heart, Share2, Star, ZoomIn } from 'lucide-react';

export default function GalleryOverview() {
  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Gallery Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="bg-muted group relative aspect-square overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
              alt="Modern watch with leather strap - Main view"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
              <Button
                size="icon"
                variant="outline"
                className="bg-background/80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
              >
                <ZoomIn className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Masonry Gallery */}
          <div className="grid grid-cols-12 gap-4">
            <div className="bg-muted group relative col-span-8 aspect-[4/3] overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                alt="Product detail view"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="bg-muted group relative col-span-4 aspect-[3/4] overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                alt="Product side view"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="bg-muted group relative col-span-4 aspect-square overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                alt="Product close-up"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="bg-muted group relative col-span-8 aspect-video overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                alt="Product lifestyle"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8 lg:sticky lg:top-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-primary text-sm font-medium">
                Premium Collection
              </span>
              <h1 className="text-3xl font-bold">Classic Leather Watch</h1>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="rounded-full">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-primary text-primary h-4 w-4" />
                ))}
              </div>
              <span className="text-sm font-medium">4.9</span>
              <span className="text-muted-foreground text-sm">
                (128 reviews)
              </span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold">$299.00</span>
              <span className="text-muted-foreground text-lg line-through">
                $399.00
              </span>
              <span className="text-sm font-medium text-green-600">
                Save 25%
              </span>
            </div>
          </div>

          <div className="prose dark:prose-invert">
            <p>
              Elevate your style with our Classic Leather Watch. Featuring
              premium materials, precise movement, and timeless design that
              complements any outfit.
            </p>
            <ul>
              <li>Swiss-made movement for precise timekeeping</li>
              <li>Genuine leather strap with classic buckle</li>
              <li>Sapphire crystal glass for durability</li>
              <li>Water-resistant up to 30 meters</li>
            </ul>
          </div>

          <div className="space-y-6 border-t pt-6">
            <div className="space-y-2">
              <label className="mb-2 text-sm font-medium">Color</label>
              <div className="flex gap-3">
                <button className="relative h-12 w-12 rounded-xl bg-black ring-2 ring-black ring-offset-2">
                  <span className="sr-only">Black</span>
                  <span className="bg-primary absolute -top-1 -right-1 h-3 w-3 rounded-full" />
                </button>
                <button className="bg-brown-500 h-12 w-12 rounded-xl">
                  <span className="sr-only">Brown</span>
                </button>
                <button className="h-12 w-12 rounded-xl bg-slate-200">
                  <span className="sr-only">Silver</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="mb-2 text-sm font-medium">Size</label>
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="h-12">
                  38mm
                </Button>
                <Button variant="outline" className="h-12">
                  42mm
                </Button>
                <Button variant="outline" className="h-12">
                  44mm
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button size="lg" className="flex-1">
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              Buy Now
            </Button>
          </div>

          <div className="border-t pt-6">
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="space-y-1">
                <span className="block font-medium">Free Shipping</span>
                <span className="text-muted-foreground block">
                  On all orders
                </span>
              </div>
              <div className="space-y-1">
                <span className="block font-medium">30-Day Returns</span>
                <span className="text-muted-foreground block">
                  Money-back guarantee
                </span>
              </div>
              <div className="space-y-1">
                <span className="block font-medium">2-Year Warranty</span>
                <span className="text-muted-foreground block">
                  Full coverage
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
