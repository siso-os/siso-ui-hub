import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';

export default function CrossSellWithBadges() {
  const products = [
    {
      id: 1,
      title: 'Wireless Bluetooth Headphones',
      price: '$89.99',
      originalPrice: '$129.99',
      image: '/placeholder.svg?height=200&width=200',
      badge: 'Bestseller',
      badgeVariant: 'default' as const,
    },
    {
      id: 2,
      title: 'Smart Fitness Tracker',
      price: '$149.99',
      originalPrice: null,
      image: '/placeholder.svg?height=200&width=200',
      badge: 'Limited Time',
      badgeVariant: 'destructive' as const,
    },
    {
      id: 3,
      title: 'Portable Phone Charger',
      price: '$24.99',
      originalPrice: '$34.99',
      image: '/placeholder.svg?height=200&width=200',
      badge: 'New Arrival',
      badgeVariant: 'secondary' as const,
    },
  ];

  return (
    <section className="px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            You might also like
          </h2>
          <p className="text-muted-foreground mt-2">
            Complete your purchase with these popular items
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group relative overflow-hidden p-0"
            >
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden">
                  <Badge
                    variant={product.badgeVariant}
                    className="absolute top-3 left-3 z-10 text-xs font-medium"
                  >
                    {product.badge}
                  </Badge>
                  <img
                    src={product.image || '/placeholder.svg'}
                    alt={product.title}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-3 p-4">
                  <h3 className="line-clamp-2 leading-tight font-semibold">
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-muted-foreground text-sm line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  <Button size="sm" className="w-full" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="ghost" className="text-sm">
            View all products
          </Button>
        </div>
      </div>
    </section>
  );
}
