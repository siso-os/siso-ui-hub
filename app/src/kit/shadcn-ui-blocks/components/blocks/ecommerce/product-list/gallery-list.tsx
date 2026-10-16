import { Button } from '../../../ui/button';
import { Heart, Star, ZoomIn, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  images: string[];
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
}

export default function GalleryList() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const products: Product[] = [
    {
      id: 1,
      name: 'Classic Leather Watch',
      images: Array(4).fill(
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30'
      ),
      price: 299,
      originalPrice: 399,
      rating: 4.9,
      reviews: 128,
      isNew: true,
    },
    {
      id: 2,
      name: 'Premium Steel Watch',
      images: Array(4).fill(
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30'
      ),
      price: 499,
      originalPrice: 599,
      rating: 4.8,
      reviews: 96,
    },
    {
      id: 3,
      name: 'Smart Watch Pro',
      images: Array(4).fill(
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30'
      ),
      price: 399,
      originalPrice: 449,
      rating: 4.7,
      reviews: 256,
      isNew: true,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-card relative overflow-hidden rounded-xl border shadow-sm"
            onMouseEnter={() => setSelectedProduct(product.id)}
            onMouseLeave={() => setSelectedProduct(null)}
          >
            {/* Main Image */}
            <div className="bg-muted relative aspect-[4/5]">
              <img
                src={product.images[0]}
                alt={product.name}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-10 w-10 rounded-full"
                  >
                    <ZoomIn className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              {/* New Badge */}
              {product.isNew && (
                <div className="bg-primary text-primary-foreground absolute top-2 left-2 rounded-md px-2 py-1 text-xs font-medium">
                  New Arrival
                </div>
              )}
              {/* Quick Actions */}
              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-background/80 hover:bg-background h-8 w-8 rounded-full backdrop-blur-sm"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-background/80 hover:bg-background h-8 w-8 rounded-full backdrop-blur-sm"
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {selectedProduct === product.id && (
              <div className="bg-background/80 absolute inset-x-0 bottom-[72px] p-2 backdrop-blur-sm">
                <div className="flex justify-center gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className="bg-muted ring-background hover:ring-primary relative h-12 w-12 overflow-hidden rounded-md ring-2 ring-offset-2 transition-all"
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="object-cover"
                        sizes="48px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Product Info */}
            <div className="p-4">
              <h3 className="truncate font-medium">{product.name}</h3>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="fill-primary text-primary h-3.5 w-3.5" />
                  <span className="text-sm">{product.rating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({product.reviews})
                  </span>
                </div>
                <div className="text-sm font-medium">${product.price}</div>
                <div className="text-muted-foreground text-sm line-through">
                  ${product.originalPrice}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
