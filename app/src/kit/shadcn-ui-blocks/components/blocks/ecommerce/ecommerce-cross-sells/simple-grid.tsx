import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';

const relatedProducts = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium sound quality with noise cancellation',
    price: '$89.99',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 2,
    name: 'Portable Phone Charger',
    description: 'Fast charging power bank with USB-C',
    price: '$34.99',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 3,
    name: 'Smart Watch Band',
    description: 'Comfortable silicone band in multiple colors',
    price: '$19.99',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 4,
    name: 'Phone Case with Stand',
    description: 'Protective case with built-in kickstand',
    price: '$24.99',
    image: '/placeholder.svg?height=200&width=200',
  },
];

export default function CrossSellSimpleGrid() {
  return (
    <section className="px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">
          You May Also Like
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {relatedProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 p-0 shadow-sm transition-shadow hover:shadow-md"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <a href="#" className="block">
                    <img
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </a>
                </div>

                <div className="space-y-3 p-4">
                  <div className="space-y-1">
                    <a href="#" className="block">
                      <h3 className="hover:text-primary line-clamp-2 text-sm leading-tight font-semibold transition-colors">
                        {product.name}
                      </h3>
                    </a>
                    <p className="text-muted-foreground line-clamp-2 text-xs">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">{product.price}</span>
                    <Button size="sm" variant="outline" className="text-xs">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
