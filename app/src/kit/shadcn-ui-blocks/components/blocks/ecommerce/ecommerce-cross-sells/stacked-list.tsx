import { Button } from '../../../ui/button';
import { Card } from '../../../ui/card';

const crossSellProducts = [
  {
    id: 1,
    title: 'Wireless Charging Pad',
    price: '$29.99',
    image: '/placeholder.svg?height=80&width=80',
  },
  {
    id: 2,
    title: 'Premium Phone Case',
    price: '$24.99',
    image: '/placeholder.svg?height=80&width=80',
  },
  {
    id: 3,
    title: 'Screen Protector Kit',
    price: '$12.99',
    image: '/placeholder.svg?height=80&width=80',
  },
];

export default function CrossSellStackedList() {
  return (
    <div className="px-4 py-8 md:py-12">
      <div className="mx-auto max-w-md">
        <h3 className="text-foreground mb-4 text-lg font-semibold">
          You might also like
        </h3>

        <div className="space-y-3">
          {crossSellProducts.map((product) => (
            <Card key={product.id} className="p-3">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <img
                    src={product.image || '/placeholder.svg'}
                    alt={product.title}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-foreground truncate text-sm font-medium">
                    {product.title}
                  </h4>
                  <p className="text-foreground mt-1 text-sm font-semibold">
                    {product.price}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <Button size="sm" className="h-8 px-3 text-xs">
                    Add
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
