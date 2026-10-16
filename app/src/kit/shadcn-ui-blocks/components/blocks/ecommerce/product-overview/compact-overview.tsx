import { Button } from '../../../ui/button';
import { Heart, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

export default function CompactOverview() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
  ];

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      {/* Image Carousel */}
      <div className="bg-muted relative aspect-square">
        <img
          src={images[currentImageIndex]}
          alt={`Product view ${currentImageIndex + 1}`}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1536px) 50vw, 33vw"
          fetchPriority={currentImageIndex === 0 ? 'high' : 'auto'}
        />

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            size="icon"
            variant="outline"
            className="bg-background/80 rounded-full backdrop-blur-sm"
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
              )
            }
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="bg-background/80 rounded-full backdrop-blur-sm"
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
              )
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 w-1.5 rounded-full transition-all ${
                index === currentImageIndex ? 'w-3 bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>

        {/* Wishlist Button */}
        <Button
          size="icon"
          variant="outline"
          className="bg-background/80 absolute top-4 right-4 rounded-full backdrop-blur-sm"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      {/* Product Info */}
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Classic Leather Watch</h1>
            <div className="mt-1 flex items-center gap-1">
              <Star className="fill-primary text-primary h-3.5 w-3.5" />
              <span className="text-sm font-medium">4.9</span>
              <span className="text-muted-foreground text-sm">(128)</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold">$299.00</div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-muted-foreground line-through">$399</span>
              <span className="font-medium text-green-600">-25%</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Color</label>
            <div className="flex gap-2">
              <button className="h-8 w-8 rounded-full bg-black ring-2 ring-black ring-offset-2"></button>
              <button className="bg-brown-500 h-8 w-8 rounded-full"></button>
              <button className="h-8 w-8 rounded-full bg-slate-200"></button>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Size</label>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm">
                38mm
              </Button>
              <Button variant="outline" size="sm">
                42mm
              </Button>
              <Button variant="outline" size="sm">
                44mm
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-4">
          <Button className="w-full">Add to Cart</Button>
          <Button variant="outline" className="w-full">
            Buy Now
          </Button>
        </div>

        <div className="border-t pt-4">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <span className="block font-medium">Free Shipping</span>
              <span className="text-muted-foreground block">
                2-3 business days
              </span>
            </div>
            <div>
              <span className="block font-medium">Free Returns</span>
              <span className="text-muted-foreground block">
                Within 30 days
              </span>
            </div>
            <div>
              <span className="block font-medium">Warranty</span>
              <span className="text-muted-foreground block">
                2 years coverage
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
