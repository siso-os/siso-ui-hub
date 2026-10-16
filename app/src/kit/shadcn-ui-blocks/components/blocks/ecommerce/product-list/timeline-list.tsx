import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Bell, Clock, Star } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  releaseDate: string;
  status: 'available' | 'coming_soon' | 'pre_order';
  description: string;
  rating?: number;
  reviews?: number;
  estimatedShipping?: string;
}

export default function TimelineList() {
  const [notifyProducts, setNotifyProducts] = useState<number[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: 'Classic Leather Watch',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      price: 299,
      releaseDate: '2024-02-15',
      status: 'available',
      description: 'Timeless design meets modern functionality',
      rating: 4.9,
      reviews: 128,
    },
    {
      id: 2,
      name: 'Smart Watch Pro',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      price: 499,
      releaseDate: '2024-03-01',
      status: 'pre_order',
      description: 'Next-generation smartwatch with advanced health tracking',
      estimatedShipping: 'Ships in 2-3 weeks',
    },
    {
      id: 3,
      name: 'Sport Watch Elite',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      price: 399,
      releaseDate: '2024-04-15',
      status: 'coming_soon',
      description: 'Professional sports watch with advanced training features',
    },
  ];

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'available':
        return (
          <Badge variant="default" className="bg-primary">
            Available Now
          </Badge>
        );
      case 'pre_order':
        return (
          <Badge variant="secondary" className="bg-orange-500">
            Pre-Order
          </Badge>
        );
      case 'coming_soon':
        return <Badge variant="outline">Coming Soon</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const toggleNotify = (id: number) => {
    setNotifyProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <div className="space-y-8">
        {products.map((product) => (
          <div key={product.id} className="relative flex items-stretch gap-8">
            {/* Timeline Line */}
            <div className="absolute inset-0 flex justify-center">
              <div className="bg-border w-px" />
            </div>

            {/* Timeline Content */}
            <div className="bg-background relative flex flex-1 gap-8 rounded-xl border p-6">
              {/* Date Marker */}
              <div className="bg-primary text-primary-foreground absolute top-8 -left-3 flex h-6 w-6 items-center justify-center rounded-full">
                <Clock className="h-3 w-3" />
              </div>

              {/* Product Image */}
              <div className="bg-muted relative h-32 w-32 shrink-0 overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover"
                  sizes="128px"
                />
              </div>

              {/* Product Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="text-muted-foreground mt-1 text-sm">
                      Release Date: {formatDate(product.releaseDate)}
                    </div>
                  </div>
                  <div>{getStatusBadge(product.status)}</div>
                </div>

                <p className="text-muted-foreground mt-2 text-sm">
                  {product.description}
                </p>

                <div className="mt-4 flex items-center gap-4">
                  <div className="text-lg font-medium">${product.price}</div>
                  {product.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="fill-primary text-primary h-4 w-4" />
                      <span>{product.rating}</span>
                      <span className="text-muted-foreground text-sm">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-3">
                  {product.status === 'available' ? (
                    <Button className="w-full sm:w-auto">Add to Cart</Button>
                  ) : (
                    <Button
                      variant={
                        notifyProducts.includes(product.id)
                          ? 'default'
                          : 'outline'
                      }
                      className="w-full sm:w-auto"
                      onClick={() => toggleNotify(product.id)}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      {notifyProducts.includes(product.id)
                        ? 'Notification Set'
                        : 'Notify Me'}
                    </Button>
                  )}
                  {product.estimatedShipping && (
                    <span className="text-muted-foreground text-sm">
                      {product.estimatedShipping}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
